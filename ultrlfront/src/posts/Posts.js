import React, { Component } from 'react'
import { list } from './apiPost'
import { Link } from 'react-router-dom'
import { Image } from 'cloudinary-react'
import Like from '../assets/Like.png'
import comment from '../assets/comment.png'
// import NewPost from './NewPost'
import avatarImage from "../assets/avatar.jpg"
import Verticalicon from "../components/verticalicon"
import Explore from '../components/Explore'
import { Loading } from '../components/Loading'
import {isAuthenticated} from '../auth'


class Posts extends Component {
  constructor() {
    super()
    this.state = {
      posts: [],
      loading: true,
      more: true,
      likesArr: []
    };
  }

  componentDidMount = () => {
    list().then(data => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({ posts: data, loading: false })
      }
    })
  }


  updatePosts = posts => {
    this.setState({ posts })
  }

  renderPosts = (posts) => {
    const userId = isAuthenticated().user._id

    console.log(posts)
    return (
      <div>
        {posts.map((post, i) => {
 // eslint-disable-next-line

          const obj = post.comments
           // eslint-disable-next-line
          const newComm = obj[0]

          const posterFull = post.user ? post.user.fullName : " Unknown"
          const posterUser = post.user ? post.user.username : " Unknown"
          return (
            <>

              <div className='post-bgpurple w-full px-2 sm:px-7 py-8 mb-4 text-white grid grid-cols-5 gap-5 sm:gap-4'>
                <div className='col-span-2 flex flex-row'>
                  <Link className="d-flex mx-2 mb-0" to={`/users/${posterUser}`}> {post.user.imgId ? <Image cloudName="favoursoar" className="rounded-full" publicId={post.user.imgId} style={{ width: '100px', height: '100px', objectFit: 'cover', }} /> :
                    <img style={{ width: "100px", height: "100px" }} className="sm:visible invisible rounded-full border border-gray-100 shadow-sm image-fluid mx-1 mt-0" src={avatarImage} alt="user " />
                  }
                  </Link>
                  <div className='w-auto ml-3'>
                    <h2 className='font-semibold text-1xl sm:text-2xl'> 
                      <Link  to={`/users/${posterUser}`}> {posterFull}</Link>
                    </h2>
                    <p className='text-sm sm:text-base'>{post.user.bio}</p>
                    <p className='text-sm'>{post.user.location}, Nigeria</p><br />
                  </div>
 
                </div>
                <div className='col-span-3'>
                  <div className=''>
                    <span>
                    <h2 className='font-bold mr-74'>Posted on {new Date(post.createdAt).toDateString()}</h2>
                    </span>
                    <span>
                    {/* <div className='-mt-15 float-right '>  <Verticalicon/></div> */}
                    { ( userId == post.user.id)? <div className='-mt-15 float-right '>  <Verticalicon/> </div>:  ""}

                    </span>

                  </div>
                  
                {post.body.length > 150 && this.state.more ? <p className="card-text">{post.body.substring(0, 150)}...<span style={{ cursor: "pointer", color: "/5f0f40" }} onClick={() => this.setState({ more: !this.state.more })}>see more</span></p> : <p className="card-text">{post.body}</p>}
                  {post.postImgId &&
                    <div className="mt-6" style={{ backgroundColor: "white", width: '100%', height: '350px' }}>
                      <Image cloudName="favoursoar" className="sm:visible invisible"publicId={post.postImgId} style={{ objectFit: 'contain', width: "100%", height: "100%" }} />

                    </div>
                  }
                  {/* <div className='flex float-right hover:float-left"'>
                    <span>  <img className=" px-3" src={Like} alt="Like " /></span>

                   <span><img className='pt-3' src={comment} alt='comment'/></span>
                   </div> */}
                </div>
              </div>


            </>

          )


        })}
      </div>
    )
  }

  render() {
    const { posts, loading } = this.state

    return (
      <>
      <Explore updatePosts={this.updatePosts} />
        {/**
         * 
        <div>
          <NewPost updatePosts={this.updatePosts} />
        </div>
         */}
        <div className=''>
          {loading ? <Loading /> : ""}


          {this.renderPosts(posts)}
        </div>
      </>
    )
  }
}

export default Posts