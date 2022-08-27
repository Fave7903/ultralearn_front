import React, { Component } from 'react'
import { isAuthenticated } from '../auth'
import { Redirect, Link } from 'react-router-dom'
import { read } from './apiUser'
import addLocation from "../assets/Add Location purple.png"
import ProfileTabs from './ProfileTabs'
import { Image } from 'cloudinary-react'
import { listByUser } from '../posts/apiPost'
import fetchedImgSrc from "../assets/defaultcover.svg"
import date from "../assets/date.png"
import avatar from "../assets/avatar.jpg"

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      user: { following: [], followers: [] },
      redirectToSignin: false,
      loading: true,
      following: false,
      error: "",
      posts: []
    }
  }
  checkFollow = user => {
    const jwt = isAuthenticated()
    const match = user.followers.find(follower => {
      // one id has  many other ids (followers) and vice versa
      return follower._id === jwt.user._id
    })
    return match
  }

  clickFollow = callApi => {
    const userId = isAuthenticated().user._id
    const token = isAuthenticated().token
    callApi(userId, token, this.state.user._id)
      .then(data => {
        if (data.error) {
          this.setState({ error: data.error })
        } else {
          this.setState({ user: data, following: !this.state.following })
        }
      })
  }

  init = (name) => {
    const token = isAuthenticated().token
    read(name, token)
      .then(data => {
        if (data.error) {
          this.setState({ redirectToSignin: true })
        } else {
          let following = this.checkFollow(data)
          this.setState({ user: data, following })
          this.setState({ loading: false })
          this.loadPosts(data.username)
        }
      })
  }

  loadPosts = name => {
    const token = isAuthenticated().token
    listByUser(name, token).then(data => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({ posts: data })
      }
    })
  }


  componentDidMount() {
    const name = this.props.match.params.name
    this.init(name)
  }
  componentWillReceiveProps(props) {
    const name = props.match.params.name
    this.init(name)
  }

  render() {
    const { redirectToSignin, user, loading, posts } = this.state
    if (redirectToSignin) return <Redirect to="/signin" />


    return (
      <div>


        <div className='max-w-80'>
          <div className=" w-full flex justify-center" style={{ height: '248px' }}>
            <div className="flex flex-col">
              <div className="md:relative bg-gray-100 md:rounded-bl-lg md:rounded-br-lg" style={{ width: '995px', height: '248px', backgroundImage: `url(${fetchedImgSrc})` }}>
                {/* // cover photo */}
                <div className="mt-20 ">
                  {/* profile photo border-4 border-white*/}
                  {user.imgId ?  <Image cloudName="favoursoar" publicId={user.imgId} className=" rounded-full md:absolute mt-20 left-36  w-40 h-40"
                    style={{  height: '168px' }} /> :
                    <img src={avatar}alt="Avatar" className="rounded-full md:absolute mt-20 left-36  w-40 h-40"style={{color: "#460273", width: "178 px",height:"168px"}}/>
                    }

                </div>
                <div className='float-right mt-20'>
                    <button className='border-purple ul-purple bg-white px-2 py-3 text-white md:absolute mt-24 right-0'>  <Link className="" to={`/edit/${isAuthenticated().user.username}`}>Edit Profile</Link></button>
                    </div>
         
  
              </div>
            </div>
          </div>
          {/* // INFOS
            
            */}

            <div className="mt-12 pt-9  mx-40"> 
           <h1 className="font-bold text-3xl fw-bolder mt-3" style={{ color: "#460273" }}>{user.fullName}</h1>
              <p className="font-bold" style={{ color: "#460273" }}>{user.bio}</p>
              <div className='flex'><img style={{ width: "25px", height: "25px" }} className="sm:visible invisible rounded-full border border-gray-100 shadow-sm image-fluid mx-1 " src={addLocation} alt="user " /> <p style={{ display: user.location ? "" : "none", color: "#460273" }}> {` ${user.location}, Nigeria`}</p></div>
              <div className='flex'><img src={date } alt=""style={{ width: "25px", height: "21px" }} className="sm:visible invisible shadow-sm image-fluid mx-1 " /> <p style={{ display: user.created ? "" : "none", color: "#460273" }}> {`  Joined  ${new Date(user.created).toDateString()}`} </p></div>
              {user.followers.length === 1 ? <p className="fw-bold" style={{ display: user.followers ? "" : "none", color: "#460273" }}>{`${user.followers.length} Follower  ${user.following.length} Following`}</p>
                :
                <p className="" style={{ display: user.followers ? "" : "none", color: "#460273" }}>{`${user.followers.length} Followers, ${user.following.length} Following`}</p>
              }
            </div> 
            <hr style={{ height: '10px',width:"100%", backgroundColor: '#460273' }}></hr>

          {/* // END TABS */}

        </div>

        <div className="w-full justify-center px-8 my-8">

          <div className="row">
            <div className="container col-sm-10 lead mt-2">

              {loading ? <div className="jumbotron mt-5 mx-2">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div> : ""}

              
              </div>
            </div>

          <ProfileTabs followers={user.followers} following={user.following} posts={posts} />
        </div>
      </div>
    );
  }
}

export default Profile