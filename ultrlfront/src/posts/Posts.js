import React, { Component } from 'react'
import { list } from './apiPost'
import { Link } from 'react-router-dom'
import { Image } from 'cloudinary-react'
import avatarImage from "../assets/avatar.jpg"
import Verticalicon from "../components/verticalicon"
import Explore from '../components/Explore'
import { Loading } from '../components/Loading'
import {isAuthenticated} from '../auth'
// import like from '../assets/Like-purple.png'
import comment from '../assets/Comment-purple.png'


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

              <div className='font-poppins post-bgpurple marginals px-2 sm:px-7 py-8 mb-2 gap-5 sm:gap-4' style={{color: '#460273'}}>
                <div className='flex flex-row'>
                  <Link className="d-flex mx-2 mb-0  " to={`/users/${posterUser}`}> {post.user.imgId ? <Image cloudName="favoursoar" className="rounded-full w-20 h-20" publicId={post.user.imgId}  /> :
                    <img className=" rounded-full border border-gray-100 shadow-sm image-fluid mx-1 mt-0 w-20 h-20" src={avatarImage} alt="user " />
                  }
                  </Link>
                  <div className='w-auto ml-3'>
                    <h2 className='font-semibold text-1xl sm:text-2xl'> 
                      <Link  to={`/users/${posterUser}`}> {posterFull}</Link>
                    </h2>
                    <p className='text-sm '>{post.user.bio}</p>
                    <p className='text-sm ' style={{display: post.user.location ? "" : "none",}}>{post.user.location}, Nigeria</p>
                    <h2 className=' text-sm mb-5'>Posted on {new Date(post.createdAt).toDateString()}</h2>
                    {post.body.length > 120 && this.state.more ? <p className="font-poppins font-bold break-all ">{post.body.substring(0, 120)}...<span style={{ cursor: "pointer", color: "/5f0f40" }} onClick={() => this.setState({ more: !this.state.more })}>see more</span></p> : <p className="font-poppins font-bold ">{post.body}</p>}
                  {post.postImgId &&
                    <div className="mt-6" style={{ backgroundColor: "white", width: '100%', height: '350px' }}>
                      <Image cloudName="favoursoar" className="e"publicId={post.postImgId} style={{ objectFit: 'contain', width: "100%", height: "100%" }} />
 
                </div>
                  }
                                    <div className='flex grid grid-cols-2 '>
                  <Link to={`post/${post.id}`} style={{pointer: 'cursor'}}><span className="flex flex-row "><span className='text-xl mt-8 pr '>{obj.length}</span><img className='mt-8 pl-2 w-8' src={comment} alt='comment'/></span></Link>

                    {/* <span>  <img className="float-right" src={like} alt="Like" /></span> */}
                   </div>
                  </div>
                  </div>
                <div className='m'>
                  
                    <p>
                    {/* <div className='-mt-15 float-right '>  <Verticalicon/></div> */}
                    { ( userId === post.user.id)? <div className='-mt-15 float-right '>  <Verticalicon/> </div>:  ""}

                    </p>


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
        <div className='post-back'>
          {loading ? <Loading /> : ""}


          {this.renderPosts(posts)}
        </div>
      </>
    )
  }
}

export default Posts