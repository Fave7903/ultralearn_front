import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Image} from 'cloudinary-react'
import Like from "../assets/Like-purple.png"
import Comment from "../assets/Comment-purple.png"
import Verticalicon from "../components/verticalicon"
import avatarImage from "../assets/avatar.jpg"

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
        
          

          <div className='grid grid-cols-2 border-b-4 '>
            <div>
            <h3 style={{color: "#460273"}} className='-mt-6 justfy-center text-2xl'>Posts</h3>
            </div>
            <div className='float-right'>
            <h3 style={{color: "#460273"}} className='float-right -mt-6  justfy-center text-2xl'>Media</h3>
            </div>
          </div>
        {posts.map((post, i) => {
          const posterFull = post.postedBy ? post.postedBy.fullName : " Unknown"
          const posterUser = post.postedBy ? post.postedBy.username : " Unknown"
        return (
          
            <div className="ul-purple" >
  <div className="">
   <div className=""> 
   <div className='ul-purple bg-white px-2 sm:px-7 py-8 mb-4  grid grid-cols-5 gap-5 sm:gap-4'>
                <div className='col-span-2 flex flex-row'>
                  <Link className="d-flex mx-2 mb-0" to={`/ul/${posterUser}`}> {post.postedBy.imgId ? <Image cloudName="favoursoar" className="rounded-full" publicId={post.postedBy.imgId} style={{ width: '100px', height: '100px', objectFit: 'cover', }} /> :
                    <img style={{ width: "100px", height: "100px" }} className=" rounded-full border border-gray-100 shadow-sm image-fluid mx-1 mt-0" src={avatarImage} alt="user " />
                  }
                  </Link>
                  <div className='w-auto ml-3'>
                    <h2 className='font-semibold text-1xl sm:text-2xl'> 
                      <Link  to={`/users/${posterUser}`}> {posterFull}</Link>
                    </h2>
                    <p className='text-sm sm:text-base'>Product Design</p>
                    <p className='text-sm'>Lagos, Nigeria</p><br />
                  </div>
 
                </div>
                <div className='col-span-3'>
                  <div className='flex '>
                  <h2 style={{color: "#460273"}} className="mb-1 ul-purple">Posted on {new Date(post.created).toDateString()}</h2>
                  <div className='flex float-right right-0'>  <Verticalicon/></div>

                  </div>


                {post.body.length > 150 && this.state.more ? <p className="card-text">{post.body.substring(0, 150)}...<span style={{ cursor: "pointer", color: "/5f0f40" }} onClick={() => this.setState({ more: !this.state.more })}>see more</span></p> : <p className="card-text">{post.body}</p>}
                  {post.postImgId &&
                    <div className="mt-6" style={{ backgroundColor: "white", width: '100%', height: '350px' }}>
                      <Image cloudName="favoursoar" className="sm:visible invisible"publicId={post.postImgId} style={{ objectFit: 'contain', width: "100%", height: "100%" }} />

                    </div>
                  }
                  <div className='flex float-right hover:float-left"'>
                    <span>  <img className=" px-3" src={Like} alt="Like " /></span>

                   <span><img className='pt-3' src={Comment} alt='comment'/></span>
                   </div>
                </div>
              </div>
   <Link className=" mx-2 mb-0" to={`/ul/${posterUser}`}> {post.postedBy.imgId ? <Image cloudName="favoursoar" className="rounded-full" publicId={post.postedBy.imgId} style={{ width: '100px', height: '100px', objectFit: 'cover', }} /> :
                    <img style={{ width: "100px", height: "100px" }} className="sm:visible invisible rounded-full border border-gray-100 shadow-sm image-fluid mx-1 mt-0" src={avatarImage} alt="user " />
                  }
                  </Link>
                  <div className='w-auto ml-3'>
                    <h2 className='font-semibold text-1xl sm:text-2xl'> 
                      <Link  to={`/users/${posterUser}`}> {posterFull}</Link>
                    </h2>
                    </div>
                    <p style={{color: "#460273"}} className="mb-1">Posted on {new Date(post.created).toDateString()}</p>

      <div className="mx-2">
        
       <p className="fw-bold lead mb-0" style={{color: "#460273"}}>{posterFull}</p><p className="font-italic" style={{color: "#460273"}}>{posterUser}</p>
        </div>
   
     <hr style={{color: "#460273"}}></hr>
   </div>
            {post.body.length > 105 && this.state.more ? <p className="card-text">{post.body.substring(0, 150)}...<span style={{cursor: "pointer", color: "#460273"}} onClick={() => this.setState({more: !this.state.more})}>see more</span></p> : <p className="card-text">{post.body}</p>}
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
}

export default ProfileTabs