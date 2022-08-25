import React, { Component } from 'react'
import { isAuthenticated } from '../auth'
import { Redirect, Link } from 'react-router-dom'
import { read } from './apiUser'
import FollowButton from './FollowButton'
import ProfileTabs from './ProfileTabs'
import { Image } from 'cloudinary-react'
import { listByUser } from '../posts/apiPost'
import fetchedImgSrc from "../assets/defaultcover.svg"

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


        <div>
          <div className=" w-full flex justify-center w-80" style={{ height: '248px' }}>
            <div className="flex flex-col">
              <div
                className="md:relative bg-gray-100 md:rounded-bl-lg md:rounded-br-lg"
                style={{ width: '940px', height: '248px', backgroundImage: `url(${fetchedImgSrc})` }}>
                {/* // cover photo */}
                <div className="mt-20">
                  {/* profile photo border-4 border-white*/}
                  <Image cloudName="favoursoar" publicId={user.imgId} className="rounded-full md:absolute mt-20 left-40  w-40 h-40"
                    style={{ width: '168px', height: '168px' }} />
                </div>
              </div>
            </div>
          </div>
          {/* // INFOS
            
            */}

            <div className="mt-12 pt-9 md:px-40"> 
           <h1 className="font-bold text-3xl fw-bolder mt-3" style={{ color: "#460273" }}>{user.fullName}</h1>
              <p>{user.username}</p>
              <p className="fw-bold" style={{ color: "#460273" }}>{user.bio}</p>
              <p style={{ display: user.location ? "" : "none", color: "#460273" }}><i className='fas fa-map-marker-alt'></i>{` ${user.location}, Nigeria`}</p>
              <p style={{ display: user.created ? "" : "none", color: "#460273" }}><i class='far fa-calendar-alt'></i>{` Joined ${new Date(user.created).toDateString()}`}</p>
              {user.followers.length === 1 ? <p className="fw-bold" style={{ display: user.followers ? "" : "none", color: "#460273" }}>{`${user.followers.length} Follower, ${user.following.length} Following`}</p>
                :
                <p className="" style={{ display: user.followers ? "" : "none", color: "#460273" }}>{`${user.followers.length} Followers, ${user.following.length} Following`}</p>
              }
            </div> 
          {/* // END INFOS */}
          {/* // TABS */}
          <div className="w-full mt-20 flex justify-center">
            <div className="flex justify-between mb-2.5">


            </div>
          </div>
          {/* // END TABS */}

        </div>

        <div className="w-full flex justify-center w-80 container px-10 m-10">

          <div className="row">
            <div className="container col-sm-10 lead mt-2">

              {loading ? <div className="jumbotron mt-5 mx-2">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div> : ""}

              
              </div>
            </div>

            <div className="row">

            <div className="">
              {isAuthenticated().user && isAuthenticated().user._id === user._id ? (
                <Link className="btn btn-outline btn-lg" to={`/edit/${isAuthenticated().user.username}`}>Edit Profile</Link>
              ) :
                <div style={{ display: user.fullName ? "" : "none" }}>
                  <FollowButton following={this.state.following} onButtonClick={this.clickFollow} />
                </div>
              }
            </div>
          </div>
          <hr style={{ height: '5px', backgroundColor: 'purple' }}></hr>
          <ProfileTabs followers={user.followers} following={user.following} posts={posts} />
        </div>
      </div>
    );
  }
}

export default Profile