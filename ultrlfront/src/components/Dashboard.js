import React from 'react'
import { isAuthenticated } from '../auth'
import { Redirect } from 'react-router-dom'
import Posts from '../posts/Posts'
import Nav from './Nav'

const Dashboard = () => {
  return (
    <div>
      {isAuthenticated() &&
        <div>
        <Nav />

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