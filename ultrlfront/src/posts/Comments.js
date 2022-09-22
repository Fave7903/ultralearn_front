import React, { Component } from 'react'
import {comment} from './apiPost'
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
    const userId = isAuthenticated().user.id
    const token = isAuthenticated().token
    const postId = this.props.postId
    const text = this.state.text
    

    comment(userId, token, postId, text)
    .then(data => {
      console.log(data)
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
          <div className="">
            {/* {isAuthenticated().user.imgId ? <Image cloudName="favoursoar" publicId={isAuthenticated().user.imgId} style={{width: '70px', height: '70px', objectFit: 'cover', borderRadius: '50%'}} className=""/> :
          <i className="" style={{color: "#460273", fontSize: "40px"}}></i>
          } */}
          <div className="">
          <input type="text" placeholder="Add a comment..." value={this.state.text} onChange={this.handleChange} className="" style={{width: "70%", height: "50px", borderRadius: "15px"}}/>
            </div>
            </div>
            {this.state.text ? <button type="submit" className="btn " style={{backgroundColor: "#460273", color: "#fff", height: "60px", width: "100px", borderRadius: "15px"}}>Post</button> : ""}
        </form>
        <div>
          {comments.map((comment, i) => {
            
        return (
            <div className="" key={i}>
  <div className="">
   <div className=""> 
     <Link className="" to={`/users/${comment.user.username}`}>
    
       {comment.user.imgId ? <Image cloudName="favoursoar" publicId={comment.user.imgId} style={{width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%'}}/> :
          <i className="" style={{color: "#460273", fontSize: "50px"}}></i>
          }
      <div className="mx-2">
       <p className="" style={{color: "#460273"}}>{comment.user.fullName}</p><p className="font-italic" style={{color: "#460273"}}>{comment.user.username}</p>
        </div>
     </Link>
     <p style={{color: "#460273"}} className="mb-1">Commented on {new Date(comment.createdAt).toDateString()}</p>
     <hr style={{color: "#460273"}}></hr>
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