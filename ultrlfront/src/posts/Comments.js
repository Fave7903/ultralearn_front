import React, { Component } from 'react'
import {comment} from './apiPost'
import {isAuthenticated} from '../auth'
import {Image} from 'cloudinary-react'
import {Link} from 'react-router-dom'
// import Thumbs from '../assets/Like-purple.png'
// import Dots from '../assets/three-dots.svg'
// import Like from './Like.js'
// import Verticalicon from '../components/verticalicon'


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
          <div className="ml-20">
            {/* {isAuthenticated().user.imgId ? <Image cloudName="favoursoar" publicId={isAuthenticated().user.imgId} style={{width: '70px', height: '70px', objectFit: 'cover', borderRadius: '50%'}} className=""/> :
          <i className="" style={{color: "#460273", fontSize: "40px"}}></i>
          } */}
          <div className="sm:mx-20 rounded-lg border-2 border-purple-600 h-10 ">
          <input type="text" placeholder="Add comment" value={this.state.text} onChange={this.handleChange} className="b w-full h-15 pl-4 font-bold" /*style={{width: "90%", height: "50px", borderRadius: "15px"}}*//>
            </div>
            </div>
            {this.state.text ? <button type="submit" className="btn bg-purple-600 h-10 mb-10 px-4 rounded-lg float-right mr-20" /*style={{backgroundColor: "#460273", height: "60px", width: "100px", borderRadius: "15px"}}*/>Add Comment</button> : ""}
        </form>
        <div className=''>
          {comments.map((comment, i) => {
            
        return (
            <div className="mt-4 mb-7 " key={i}>
  <div className="">
   {/* <div className=" ">  */}

          
        {/* <Link to={`//`}>  <Image  src={Dots} className="w-10 h-10 mt-2 float-right mr-5"/> </Link> */}
        {/* </div> */}
      
    <div className='font-poppins post-bgpurple marginals px-12 sm:px-7 py-8 mb-4 gap-4 sm:gap-4' style={{color: '#460273'}}>
      <div className=' flex flex-row'>
      <Link className="" to={`/users/${comment.user.username}`}>
    
    {comment.user.imgId ? <Image cloudName="favoursoar" publicId={comment.user.imgId} className="w-10 h-10 rounded-full" style={{width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%'}}/> :
       <i className="" style={{color: "#460273", fontSize: "50px"}}></i>
       }</Link>
        <div className="d-flex mx-2 mb-0">
        <Link className=' ' to={`/users/${comment.user.username}`}>
          <p className="font-bold" style={{color: "#460273"}}>{comment.user.fullName}</p>   
        </Link>
      
       <p className="font-italic text-xs text-purple-900 mb-2">{comment.user.username}</p>
       <p className="card-text ml-2 text-gray-500">{comment.text}</p>
        </div>
      </div>
     {/* <p className=" datestamp float-right mb-1 ml-2 text-xs text-gray-400">Commented on {new Date(comment.createdAt).toDateString()}</p> */}
     
   
   <div className=''>
   
   </div >
   <div className='flex '>
    {/* <div className='likee'>
      <Link to={`//`}>  <Image  src={Thumbs} className="w-7 h-7 mt-2 mx-2"/> </Link>
    </div> */}
   
    
    {/* <div className='reply mx-3'>
      <p className='text-gray-400 align-middle p-3'>Reply</p>
    </div> */}
    
   
   </div>
   </div>           
    
   
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