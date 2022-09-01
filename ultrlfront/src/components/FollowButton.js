import React, { Component } from 'react'
import {follow, unfollow} from './apiUser'

class FollowButton extends Component {
   followClick = () =>  {
      this.props.onButtonClick(follow)
    }
   unfollowClick = () =>  {
      this.props.onButtonClick(unfollow)
    }
  render() {
    return (
      <div className="d-inline-block mt-5">

        {
          !this.props.following ? (
            <button style={{backgroundColor: "#460273", color: "white"}} onClick={this.followClick} className="btn btn-raised mt-5">Follow</button>
          ) : (
             <button style={{color: "#460273"}} onClick={this.unfollowClick} className="btn btn-raised mt-5 btn-outline">Following</button>   
          )
        }
      </div>
    )
  }
}

export default FollowButton