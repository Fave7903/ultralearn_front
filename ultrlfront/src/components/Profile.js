import React, { Component } from 'react'
import { isAuthenticated } from '../auth'
import {Redirect, Link} from 'react-router-dom'
import {read} from './apiUser'
import avatar from '../assets/avatar.png'
import FollowButton from './FollowButton'
import ProfileTabs from './ProfileTabs'
import Nav from './Nav'

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
      <div className='container mt-5'>
        <Nav />
        <div>
          <img src={avatar} className="card-img-top" alt={user.fullName} style={{width: '180px', height: '180px', objectFit: 'cover', borderRadius: '50%'}}/>
        
        </div>

        <div className="row">
          <div className="container col-sm-10 lead mt-2">

            {loading ? <div className="jumbotron mt-5 mx-2">
          <div className="spinner-border text-primary" role="status">
  <span className="sr-only">Loading...</span>
</div>
        </div> : ""}
            
          <h1 className="fw-bolder">{user.fullName}</h1>
        <p>{user.username}</p>
            <p className="fw-bold">{user.bio}</p> 
            <p style={{display: user.location ? "" : "none"}}><i className='fas fa-map-marker-alt'></i>{` ${user.location}, Nigeria`}</p>
        <p style={{display: user.created ? "" : "none"}}><i class='far fa-calendar-alt'></i>{` Joined ${new Date(user.created).toDateString()}`}</p>
        </div>
          <div className="col-sm-2">
          {isAuthenticated().user && isAuthenticated().user._id === user._id ? (
              <Link className="btn btn-outline-primary btn-lg" to={`/edit/${isAuthenticated().user.username}`}>Edit Profile</Link>
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
    );
  }
}

export default Profile