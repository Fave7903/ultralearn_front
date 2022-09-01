import React, { Component } from 'react'
import {getPost} from './apiPost'
import {Link} from 'react-router-dom'
import {Image} from 'cloudinary-react'
import Like from './Like'
import Nav from '../components/Nav'
import Comments from './Comments'

class SingPost extends Component {
  constructor() {
    super()
    this.state = {
      post: {},
      postedBy: {},
      likes: [],
      comments: [],
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
        console.log(data)
        this.setState({ post: data, loading: false, postedBy: data.postedBy, likes: data.likes, comments: data.comments})
      }
    })
  }

  updateComments = comments => {
    this.setState({comments})
  }

  render() {
    const {post, loading, postedBy, likes, comments} = this.state
    return(
      <div>
      <Nav />
        <div className="pt-5">
      <div className='container pt-5 mt-5 bg-light'>
        {loading ? <div className="jumbotron text-center">
          <div className="spinner-border text-primary" role="status">
  <span className="sr-only">Loading...</span>
</div>
        </div> : ""}
        
        <div>
          <div className="card mb-2" style={{boxShadow: "2px 5px #460273"}}>
  <div className="card-body">
   <div className="card-title"> 
     <Link className="d-flex mx-2 mb-0" to={`/users/${postedBy.username}`}>
    
       {postedBy.imgId ? <Image cloudName="favoursoar" publicId={postedBy.imgId} style={{width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%'}}/> :
          <i className="fa-solid fa-user mx-3" style={{color: "#460273", fontSize: "50px"}}></i>
          }
      <div className="mx-2">
       <p className="fw-bold lead mb-0" style={{color: "#460273"}}>{postedBy.fullName}</p><p className="font-italic" style={{color: "#460273"}}>{postedBy.username}</p>
        </div>
     </Link>
     <p style={{color: "#460273", display: post.created ? "" : "none"}} className="mb-1">Posted on {new Date(post.created).toDateString()}</p>
     <hr style={{color: "#460273"}}></hr>
   </div>
             <p className="card-text">{post.body}</p>
    {post.postImgId &&
   <div className="container" style={{backgroundColor: "white", width: '100%', height: '350px'}}>
     <Image cloudName="favoursoar" publicId={post.postImgId} style={{objectFit: 'contain', width: "100%", height: "100%"}}/>
   
   </div>
    }
    {likes.length ? <Like postId={post._id} likeArr={likes} likeCount={likes.length}/> : ""}
     
    
  </div>
          
</div>
        </div>
        <Comments postId={post._id} comments={comments} updateComments={this.updateComments}/>
        
      </div>
          </div>
        
        </div>
    )
  }
}

export default SingPost