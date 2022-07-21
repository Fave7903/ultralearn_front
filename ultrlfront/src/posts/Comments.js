import React, { Component } from 'react'
import {comment, uncomment} from './apiPost'
import {isAuthenticated} from '../auth'
import {Image} from 'cloudinary-react'
import {Link} from 'react-router-dom'

class Comments extends Component {
  constructor() {
    super()
    this.state = {
      text: ""
    }
  }

  handleChange = (event) => {
    this.setState({text: event.target.value})
  }

  addComment = e => {
    e.preventDefault()
    const userId = isAuthenticated().user._id
    const token = isAuthenticated().token
    const postId = this.props.postId
    

    comment(userId, token, postId, {text: this.state.text})
    .then(data => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({text: ""})
        // dispatch new comments
        window.scrollTo(0, document.body.scrollHeight)
        this.props.updateComments(data.comments)
      }
    })
  }

  
  render() { 
    const {comments} = this.props
    return (
      <div>

        <form onSubmit={this.addComment}>
          <div className="row">
            {isAuthenticated().user.imgId ? <Image cloudName="favoursoar" publicId={isAuthenticated().user.imgId} style={{width: '70px', height: '70px', objectFit: 'cover', borderRadius: '50%'}} className="mb-5 mt-5 col-sm-1 d-none d-lg-block d-xl-block"/> :
          <i className="fa-solid fa-user mb-5 mt-5 col-sm-1 d-none d-lg-block d-xl-block" style={{color: "#5f0f40", fontSize: "40px"}}></i>
          }
          <div className="form-group mb-5 mt-5 col-sm-11">
          <input type="text" placeholder="Add a comment..." value={this.state.text} onChange={this.handleChange} className="form-control" style={{width: "70%", height: "50px", borderRadius: "15px"}}/>
            </div>
            </div>
            {this.state.text ? <button type="submit" className="btn btn-raised btn-lg mb-5" style={{backgroundColor: "#5f0f40", color: "#fff", height: "60px", width: "100px", borderRadius: "15px"}}>Post</button> : ""}
        </form>
        <div>
          {comments.map((comment, i) => {
            
        return (
            <div className="card mx-5 mb-5 px-5" key={i}>
  <div className="card-body">
   <div className="card-title"> 
     <Link className="d-flex mx-2 mb-0" to={`/ul/${comment.postedBy.username}`}>
    
       {comment.postedBy.imgId ? <Image cloudName="favoursoar" publicId={comment.postedBy.imgId} style={{width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%'}}/> :
          <i className="fa-solid fa-user mx-3" style={{color: "#5f0f40", fontSize: "50px"}}></i>
          }
      <div className="mx-2">
       <p className="fw-bold lead mb-0" style={{color: "#5f0f40"}}>{comment.postedBy.fullName}</p><p className="font-italic" style={{color: "#5f0f40"}}>{comment.postedBy.username}</p>
        </div>
     </Link>
     <p style={{color: "#5f0f40"}} className="mb-1">Commented on {new Date(comment.created).toDateString()}</p>
     <hr style={{color: "#5f0f40"}}></hr>
   </div>
             <p className="card-text">{comment.text}</p>
    
   
   </div>
  </div>
          

          
        )

              
            })}
        </div>
      </div>
    )
  }
}

export default Comments