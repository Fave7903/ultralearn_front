import React, { Component } from 'react'
import { list } from './apiPost'
import { Link } from 'react-router-dom'
import { Image } from 'cloudinary-react'
import Like from './Like'
// import NewPost from './NewPost'
import avatarImage from "../assets/avatar.jpg"


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

    console.log(posts)
    return (
      <div>
        {posts.map((post, i) => {

          const obj = post.comments
          const newComm = obj[post.comments.length - 1]

          const posterFull = post.postedBy ? post.postedBy.fullName : " Unknown"
          const posterUser = post.postedBy ? post.postedBy.username : " Unknown"
          return (
            <>

              <div className='post-bgpurple w-full px-7 py-8 mb-4 text-white grid grid-cols-5 gap-4'>
                <div className='col-span-2 flex flex-row'>
                  <Link className="d-flex mx-2 mb-0" to={`/ul/${posterUser}`}> {post.postedBy.imgId ? <Image cloudName="favoursoar" className="rounded-full" publicId={post.postedBy.imgId} style={{ width: '100px', height: '100px', objectFit: 'cover', }} /> :
                    <img style={{ width: "100px", height: "100px" }} className="rounded-full border border-gray-100 shadow-sm image-fluid mx-1 mt-0" src={avatarImage} alt="user " />
                  }
                  </Link>
                  <div className='w-auto ml-3'>
                    <h2 className='font-semibold text-2xl'> 
                      <Link  to={`/ul/${posterUser}`}> {posterFull}</Link>
                    </h2>
                    <p className='text-base'>Product Design</p>
                    <p className='text-sm'>Lagos, Nigeria</p><br />
                  </div>

                </div>
                <div className='col-span-3'>
                  <h2 className='font-bold'>Posted recently</h2>
                {post.body.length > 150 && this.state.more ? <p className="card-text">{post.body.substring(0, 150)}...<span style={{ cursor: "pointer", color: "#5f0f40" }} onClick={() => this.setState({ more: !this.state.more })}>see more</span></p> : <p className="card-text">{post.body}</p>}
                  {post.postImgId &&
                    <div className="mt-6" style={{ backgroundColor: "white", width: '100%', height: '350px' }}>
                      <Image cloudName="favoursoar" publicId={post.postImgId} style={{ objectFit: 'contain', width: "100%", height: "100%" }} />

                    </div>
                  }
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
        {/**
         * 
        <div>
          <NewPost updatePosts={this.updatePosts} />
        </div>
         */}
        <div className=''>
          {loading ? <div className="jumbotron text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div> : ""}


          {this.renderPosts(posts)}
        </div>
      </>
    )
  }
}

export default Posts