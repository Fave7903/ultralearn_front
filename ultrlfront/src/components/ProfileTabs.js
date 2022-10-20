import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Image} from 'cloudinary-react'
import avatarImage from "../assets/avatar.jpg"
import Verticalicon from "../components/verticalicon"
import {isAuthenticated} from '../auth'


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
    const userId = isAuthenticated().user._id

    return ( 
       <div className='post-bgpurple'>     
          <div className='text-center py-2 rounded-lg 'style={{borderBottom: " 8px solid #fff"}}>
          <div>
            <h3 style={{color: "#460273"}} className='mt-6 justfy-center text-2xl'>Posts</h3>
             </div>
            {/* <div className='float-right'>
            <h3 style={{color: "#460273"}} className='float-right mt-6  justfy-center text-2xl'>Media</h3>
            </div> */}
          </div>
        {posts.map((post, i) => {
          const posterFull = post.user ? post.user.fullName : " Unknown"
          const posterUser = post.user ? post.user.username : " Unknown"
        return (

          
        <div className="font-poppins  post-bgpurple marginals px-4 text-purple-900 sm:px-12 sm:px-7 py-8 mb-4 gap-4 sm:gap-4" /*style={{borderBottom: " 8px solid #fff"}}*/ key={i}>
   <div className="col-span-2 flex flex-row"> 
   <div className='flex float-left mt-0 w-28 h-28'>
     <Link className="d-flex mx-2 mb-3" to={`/users/${posterUser}`}>{post.user.imgId ? <Image cloudName="favoursoar" className="rounded-full" publicId={post.user.imgId} style={{ width: '100px', height: '100px', objectFit: 'cover', }} /> :
                    <img style={{ width: "100px", height: "100px" }} className=" rounded-full border border-gray-100 shadow-sm image-fluid mx-1 mt-0" src={avatarImage} alt="user " />
                  }
     </Link>
     </div>
     <div className='w-auto ml-3 '>
                    <h2 className='font-semibold text-1xl sm:text-2xl'> 
                      <Link  to={`/users/${posterUser}`}> {posterFull}</Link>
                    </h2>
                    <p className='text-sm sm:text-base'>{post.user.bio}</p>
                    <p className='text-sm'style={{display: post.user.location ? "" : "Nigeria"}}>{post.user.location}Nigeria</p><br />
                    
                    <h2 className='font-bold mr-74 text-xs my-0 py-0 '>Posted on {new Date(post.createdAt).toDateString()}</h2>
                    
      </div>
      </div>
      <div className='col-span-3 sm:ml-20 sm:pl-10'>
      <div className=''>
                    
                    <span>
                    { ( userId === post.user.id)? <div className='-mt-15 float-right '>  <Verticalicon/> </div>:  ""}
                    </span>

                  </div>
        {post.body.length > 105 && this.state.more ? <p className="card-text">{post.body.substring(0, 150)}...<span style={{cursor: "pointer", color: "#460273"}} onClick={() => this.setState({more: !this.state.more})}>see more</span></p> : <p className="card-text">{post.body}</p>}
    {post.postImgId && 
                        <div className="" style={{ backgroundColor: "white", width: '100%', height: '350px' }}>
                        <Image cloudName="favoursoar" className=""publicId={post.postImgId} style={{ objectFit: 'contain', width: "100%", height: "100%" }} />
                
                      </div>
    }
                      {/* <div className='flex float-right hover:float-left"'>
                    <span>  <img className=" px-3" src={Like} alt="Like " /></span>

                   <span><img className='pt-3' src={comment} alt='comment'/></span>
                   </div> */}
                   
         </div>
          
</div>
          
        )

              
            })}
        </div>
    )
  }
}

export default ProfileTabs