import React from 'react'
import { isAuthenticated } from '../auth'
// import { Redirect } from 'react-router-dom'
import Posts from '../posts/Posts'
import Nav from './Nav'
import likeimg from '../assets/like.png'
import commentimg from '../assets/comment.png'

const Dashboard = () => {
  return (
    <div>
      {isAuthenticated() &&
        <div>
          <Nav />
          <Posts />
          <img src={likeimg} className="p-1 space-x-1" />
          <img src={commentimg} className="p-1" />
        </div>
      }
      {!isAuthenticated() &&
        <>
         design this page
        </>
      }
    </div>
  );
}

export default Dashboard