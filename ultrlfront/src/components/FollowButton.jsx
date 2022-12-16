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
      <div className='no-scroll'>

        {
          !this.props.following ? (
            <button onClick={this.followClick} className="border-purple  ul-purple2 bg-white px-2 py-3 text-white md:absolute mt-24 right-14">Follow</button>
          ) : (
             <button onClick={this.unfollowClick} className="border-purple ul-purple2 bg-white px-2 py-3 text-white md:absolute mt-24 right-14">Following</button>   
          )
        }
      </div>
    )
  }
}

export default FollowButton