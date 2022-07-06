import React from 'react'
import { isAuthenticated } from '../auth'
import { Redirect } from 'react-router-dom'
import NewPost from '../posts/NewPost'
import Posts from '../posts/Posts'
import Nav from './Nav'

const Dashboard = () => {
  return (
    <div>
      {isAuthenticated() &&
        <div>
        <div className="row">
        <div className="container mt-5 col-4">
        <h1>Home Page</h1>
         </div>
          <div className="mt-5 col-8 float-right">
         <Nav />
            </div>
       </div>
          <NewPost />

          <div className="container">
            <Posts />
          </div>
          </div>
      }
      {!isAuthenticated() &&
        <Redirect to="/signup" />
      }
    </div>
  );
}

export default Dashboard