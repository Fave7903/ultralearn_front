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
import FollowButton from './FollowButton'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
      redirectToSignin: false,
      loading: true,
      following: false,
      error: "",
      posts: []
    }
  }
  checkFollow = user => {
    const jwt = isAuthenticated()
    const match = user.myfollowers.find(follower => {
      // one id has  many other ids (followers) and vice versa
      return follower.id === jwt.user.id
    })
    return match
  }

  clickFollow = callApi => {
    const userId = isAuthenticated().user.id
    const token = isAuthenticated().token
    callApi(userId, token, this.state.user.id)
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
        this.setState({ loading: false})
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


        <div className='w-max'>
          <div className=" w-full flex justify-center" style={{ height: '248px' }}>
            <div className="flex flex-col">
              <div className="w-screen h-80 bg-no-repeat  md:relative sm:mb-0 mb-10 bg-gray-100 md:rounded-bl-lg md:rounded-br-lg" style={{ backgroundImage: `url(${fetchedImgSrc})` }}>
                {/* // cover photo */}
                <div className="">
                  {/* profile photo border-4 border-white*/}
                  {user.imgId ?  <Image cloudName="favoursoar" publicId={user.imgId} className=" rounded-full sm:absolute mt-20 left-36  w-40 h-40"
                    style={{  height: '168px' }} /> :
                    <img src={avatar}alt="Avatar" className="rounded-full sm:absolute mt-40 left-36  w-40 h-40"style={{color: "#460273", width: "178 px",height:"168px"}}/>
                    }

                </div>

                <div className='invisible sm:visible sm:float-right mt-40'>
                  {isAuthenticated().user && isAuthenticated().user.id === user.id ?
                    <button className='border-purple ul-purple bg-white px-2 py-3 text-white md:absolute mt-24 right-0'><Link className="" to={`/edit/${isAuthenticated().user.username}`}>Edit Profile</Link></button>
                  :
                  <div style={{display: user.fullName ? "" : "none"}}>
                  <FollowButton following={this.state.following} onButtonClick={this.clickFollow} />
                 </div>
                }
                    </div>
         
  
              </div>
            </div>
          </div>
          {/* // INFOS
            
            */}

            <div className="mt-18 sm:mt-12 my-20 sm:my-0 pt-15 sm:pt-9  mb-10 sm:mb-4 mx-24 sm:mx-40"> 
           <h1 className="font-bold text-3xl fw-bolder  mt-3" style={{ color: "#460273" }}>{user.fullName}</h1>
              <p className="font-bold" style={{ color: "#460273" }}>{user.bio}</p>
              <div className='flex'><img style={{ width: "25px", height: "25px" }} className=" rounded-full border border-gray-100 shadow-sm image-fluid " src={addLocation} alt="user " /> <p style={{ display: user.location ? "" : "none", color: "#460273" }}> {` ${user.location}, Nigeria`}</p></div>

              <div className='flex'><img src={date } alt=""style={{ width: "25px", height: "21px" }} className="shadow-sm image-fluid " /> <p style={{ display: user.createdAt ? "" : "none", color: "#460273" }}> {`  Joined  ${new Date(user.createdAt).toDateString()}`} </p></div>
              {user.followers_len === 1 ? <p className="fw-bold" style={{color: "#460273" }}>{`${user.followers_len} Follower  ${user.following_len} Following`}</p>

              
                :
                <p className="" style={{color: "#460273" }}>{`${user.followers_len} Followers, ${user.following_len} Following`}</p>
              }
            </div> 
            <hr style={{ height: '10px',width:"100%", backgroundColor: '#460273' }}></hr>

          {/* // END TABS */}

        </div>

        <div className="w-full justify-center px-2 sm:px-8 my-8">

          <div className="row">
            <div className="container col-sm-10 lead mt-2">

              {loading ? <div className="jumbotron mt-5 mx-2">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div> : ""}

              
              </div>
            </div>

          <ProfileTabs posts={posts} />
        </div>
      </div>
    );
  }
}

export default Profile