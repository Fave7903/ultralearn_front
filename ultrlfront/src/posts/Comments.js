import React, { Component } from 'react'
import {comment} from './apiPost'
import {isAuthenticated} from '../auth'
import {Image} from 'cloudinary-react'
import {Link} from 'react-router-dom'
import Arrow from "../assets/Arrow.svg"
import avatarImage from "../assets/avatar.jpg"
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
    
    if (text === "") {
      // comments won't add if textarea is empty
      return
    }

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
      <div className='mt-10'>
 <Link to={`/`} ><img style={{ width: "30px", height: "20px" }} src={Arrow} className=" mb-40 absolute left-0 top-0  pl-2 my-4 "alt ="Arrow"/></Link>
        <form onSubmit={this.addComment}>
          
          <div className="">
            {/* {isAuthenticated().user.imgId ? <Image cloudName="favoursoar" publicId={isAuthenticated().user.imgId} style={{width: '70px', height: '70px', objectFit: 'cover', borderRadius: '50%'}} className=""/> :
          <i className="" style={{color: "#460273", fontSize: "40px"}}></i>
          } */}
          <div className='marginals2 w-fit'>
          <textarea type="text" placeholder="Add comment" value={this.state.text} onChange={this.handleChange} className="font-normal  w-full rounded-lg border-2 h-35 sm:h-40 "style={{backgroundColor:"#EFEEEE"}}/>
          </div>
            </div>
            
            <div style={{display: this.state.text ? "" : 'none'}}>
              {this.state.text.trim().length ? <button type="submit" className=" h-14  mb-10 px-5 rounded-lg float-right  sm:mr-40 mr-1"style={{backgroundColor:"#460273",color:"#fff"}}>Add Comment</button> : "" }
            </div>
            
        </form>
        <div className=' mt-20'>
          {comments.map((comment, i) => {
            
        return (
            <div className="mt-4 mb-7 " key={i}>
              
    <div className="">
        {/* <div className=" ">  */}

          
        {/* <Link to={`//`}>  <Image  src={Dots} className="w-10 h-10 mt-2 float-right mr-5"/> </Link> */}
        {/* </div> */}
      
    <div className='font-poppins post-bgpurple marginals px-4 sm:px-12 sm:px-7 py-8 mb-4 gap-4 sm:gap-4' style={{color: '#460273'}}>
      
      <div className=' flex flex-row'>
      <Link className="" to={`/users/${comment.user.username}`}>
    
    {comment.user.imgId ? <Image cloudName="favoursoar" publicId={comment.user.imgId} className="w-10 h-10 rounded-full" style={{width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%'}}/> :
    <img className=" rounded-full border border-gray-100 shadow-sm image-fluid mx-1 mt-0 w-20 h-20" src={avatarImage} alt="user " />

       }</Link>
        <div className="d-flex mx-2 mb-0 post-box">
        <Link className=' ' to={`/users/${comment.user.username}`}>
          <p className="font-bold" style={{color: "#460273"}}>{comment.user.fullName}</p>   
        </Link>
      

       <p className="font-italic text-xs mb-2">Posted on {new Date(comment.createdAt).toDateString()}</p>
       
       <p className="post-text">{comment.text}</p>

      

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