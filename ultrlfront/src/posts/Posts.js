import React, { Component } from 'react'
import {list} from './apiPost'
import {Link} from 'react-router-dom'
import {Image} from 'cloudinary-react'
import Like from './Like'

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
        this.setState({posts: data, loading: false})
      }
    })
  }

  

  renderPosts = (posts) => {
    return (
            <div>
            {posts.map((post, i) => {
            
          
            
              
          const posterFull = post.postedBy ? post.postedBy.fullName : " Unknown"
          const posterUser = post.postedBy ? post.postedBy.username : " Unknown"
        return (
            <div className="card mb-2" style={{boxShadow: "2px 5px #5f0f40"}} key={i}>
  <div className="card-body">
   <div className="card-title"> 
     <Link className="d-flex mx-2 mb-0" to={`/ul/${posterUser}`}>
    
       {post.postedBy.imgId ? <Image cloudName="favoursoar" publicId={post.postedBy.imgId} style={{width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%'}}/> :
          <i className="fa-solid fa-user mx-3" style={{color: "#5f0f40", fontSize: "50px"}}></i>
          }
      <div className="mx-2">
       <p className="fw-bold lead mb-0" style={{color: "#5f0f40"}}>{posterFull}</p><p className="font-italic" style={{color: "#5f0f40"}}>{posterUser}</p>
        </div>
     </Link>
     <p style={{color: "#5f0f40"}} className="mb-1">Posted on {new Date(post.created).toDateString()}</p>
     <hr style={{color: "#5f0f40"}}></hr>
   </div>
            {post.body.length > 150 && this.state.more ? <p className="card-text">{post.body.substring(0, 150)}...<span style={{cursor: "pointer", color: "#5f0f40"}} onClick={() => this.setState({more: !this.state.more})}>see more</span></p> : <p className="card-text">{post.body}</p>}
    {post.postImgId &&
   <div className="container" style={{backgroundColor: "white", width: '100%', height: '350px'}}>
     <Image cloudName="favoursoar" publicId={post.postImgId} style={{objectFit: 'contain', width: "100%", height: "100%"}}/>
   
   </div>
    }
    <Like postId={post._id} likeArr={post.likes} likeCount={post.likes.length}/>
  </div>
          
</div>
          
        )

              
            })}
              </div>
    )
  }
  
  render() {
    const {posts, loading} = this.state
    
    return (
      <div className='container mt-5 bg-light'>
        {loading ? <div className="jumbotron text-center">
          <div className="spinner-border text-primary" role="status">
  <span className="sr-only">Loading...</span>
</div>
        </div> : ""}
        {this.renderPosts(posts)}
      </div>
    )
  }
}

export default Posts