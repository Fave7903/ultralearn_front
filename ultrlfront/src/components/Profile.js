import React, { Component } from 'react'
import { isAuthenticated } from '../auth'
import {Redirect, Link} from 'react-router-dom'
import {read} from './apiUser'
import FollowButton from './FollowButton'
import ProfileTabs from './ProfileTabs'
import Nav from './Nav'
import {Image} from 'cloudinary-react'

class Profile extends Component {
  constructor() {
    super() 
    this.state = {
      user: { following: [], followers: [] },
      redirectToSignin: false,
      loading: true,
      following: false,
      error: ""
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
        this.setState({error: data.error})
      } else {
        this.setState({user: data, following: !this.state.following})
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
    const {redirectToSignin, user, loading} = this.state
    if(redirectToSignin) return <Redirect to="/signin"/>

    
    return (
      <div>
        <Nav />
        <div className="container pt-5 mt-5">
        <div className="mt-5">
          {user.imgId ? <Image cloudName="favoursoar" publicId={user.imgId} style={{width: '180px', height: '180px', objectFit: 'cover', borderRadius: '50%'}}/> :
          <i className="fa-solid fa-user mx-3" style={{color: "#5f0f40", fontSize: "180px"}}></i>
          }
        
        </div>

        <div className="row">
          <div className="container col-sm-10 lead mt-2">

            {loading ? <div className="jumbotron mt-5 mx-2">
          <div className="spinner-border text-primary" role="status">
  <span className="sr-only">Loading...</span>
</div>
        </div> : ""}
            
          <h1 className="fw-bolder" style={{color: "#5f0f40"}}>{user.fullName}</h1>
        <p>{user.username}</p>
            <p className="fw-bold" style={{color: "#5f0f40"}}>{user.bio}</p> 
            <p style={{display: user.location ? "" : "none", color: "#5f0f40"}}><i className='fas fa-map-marker-alt'></i>{` ${user.location}, Nigeria`}</p>
        <p style={{display: user.created ? "" : "none", color: "#5f0f40"}}><i class='far fa-calendar-alt'></i>{` Joined ${new Date(user.created).toDateString()}`}</p>
            {user.followers.length === 1 ? <p className="fw-bold" style={{display: user.followers ? "" : "none", color: "#5f0f40"}}>{`${user.followers.length} Follower, ${user.following.length} Following`}</p>
            :
              <p className="fw-bold" style={{display: user.followers ? "" : "none", color: "#5f0f40"}}>{`${user.followers.length} Followers, ${user.following.length} Following`}</p>
            }
        </div>
          <div className="col-sm-2">
          {isAuthenticated().user && isAuthenticated().user._id === user._id ? (
              <Link className="btn btn-outline btn-lg" to={`/edit/${isAuthenticated().user.username}`}>Edit Profile</Link>
          ) :
            <div style={{display: user.fullName ? "" : "none"}}>
             <FollowButton following={this.state.following} onButtonClick={this.clickFollow} />
            </div>
          }
            </div>
        </div>
        <hr style={{height: '5px', backgroundColor: 'purple'}}></hr>
          <ProfileTabs followers={user.followers} following={user.following}/>
          </div>
          </div>
    );
  }
}

export default Profile