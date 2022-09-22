import React, { Component } from 'react'
import {getPost} from './apiPost'
import {Link} from 'react-router-dom'
import {Image} from 'cloudinary-react'
// import Like from './Like'
import Comments from './Comments'
import { Loading } from '../components/Loading'
import avatarImage from "../assets/avatar.jpg"
import { isAuthenticated } from '../auth'
import Verticalicon from "../components/verticalicon"


class SingPost extends Component {
  constructor() {
    super()
    this.state = {
      post: {},
      postedBy: {},
      comments: [],
      likes: 0,
      loading: true
    }
  }



  componentDidMount() {
    const postId = this.props.match.params.postId
    getPost(postId)
    .then(data => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({ post: data, loading: false, postedBy: data.user, likes: data.likes_len, comments: data.comments})
      }
    })
  }

  updateComments = comments => { 
    this.setState({comments})
  }

  render() {
    const {post, loading, postedBy, comments} = this.state
    return(
      <div>
        {loading? <Loading /> : ""}
        <div className='font-poppins post-bgpurple marginals px-2 sm:px-7 py-8 mb-4 gap-5 sm:gap-4' style={{color: '#460273'}}>
                <div className='flex flex-row'>
                  <Link className="d-flex mx-2 mb-0" to={`/users/${postedBy.username}`}> {postedBy.imgId ? <Image cloudName="favoursoar" className="rounded-full" publicId={postedBy.imgId} style={{ width: '100px', height: '100px', objectFit: 'cover', }} /> :
                    <img style={{ width: "100px", height: "100px" }} className="sm:visible invisible rounded-full border border-gray-100 shadow-sm image-fluid mx-1 mt-0" src={avatarImage} alt="user " />
                  }
                  </Link>
                  <div className='w-auto ml-3'>
                    <h2 className='font-poppins text-1xl sm:text-2xl'> 
                      <Link  to={`/users/${postedBy.username}`}> {postedBy.fullName}</Link>
                    </h2>
                    <p className='text-sm sm:text-base'>{postedBy.bio}</p>
                    <p className='text-sm' style={{display: postedBy.location ? "" : "none"}}>{postedBy.location}, Nigeria</p><br />
                  </div>
 
                </div>
                <div className='mt-5'>
                  <div className=''>
                    <span>
                    <h2 className='font-bold mr-74'>Posted on {new Date(post.createdAt).toDateString()}</h2>
                    </span>
                    <span>
                    {/* <div className='-mt-15 float-right '>  <Verticalicon/></div> */}
                    { ( isAuthenticated().user.id === postedBy.id)? <div className='-mt-15 float-right '>  <Verticalicon/> </div>:  ""}

                    </span>

                  </div>
                  
                 <p className="font-poppins">{post.body}</p>
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
     

        <Comments postId={post.id} comments={comments} updateComments={this.updateComments}/>
        
    </div>
    )
  }
}

export default SingPost