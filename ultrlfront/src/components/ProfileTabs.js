import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Image} from 'cloudinary-react'

class ProfileTabs extends Component {
  constructor() {
    super()
    this.state = {
      more: true
    }
    
  }
  render() {
    //const {following, followers} = this.props
    const {posts} = this.props
    return ( 
      <div>
        
          

          <div>
            <h3 style={{color: "#5f0f40"}} className='fw-bold d-flex align-items-center justify-content-center'>Posts</h3>
            <hr></hr>
          </div>
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
            {post.body.length > 105 && this.state.more ? <p className="card-text">{post.body.substring(0, 150)}...<span style={{cursor: "pointer", color: "#5f0f40"}} onClick={() => this.setState({more: !this.state.more})}>see more</span></p> : <p className="card-text">{post.body}</p>}
    {post.postImgId &&
   <div className="container" style={{backgroundColor: "white", width: '100%', height: '350px'}}>
     <Image cloudName="favoursoar" publicId={post.postImgId} style={{objectFit: 'contain', width: "100%", height: "100%"}}/>
   
   </div>
    }
  </div>
          
</div>
          
        )

              
            })}
        </div>
    )
  }
}

export default ProfileTabs