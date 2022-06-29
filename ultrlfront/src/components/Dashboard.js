import React from 'react'
import { isAuthenticated } from '../auth'
import { Redirect, Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div>
      {isAuthenticated() &&
        <div className="container mt-5 mx-2">
        <h1>{`Welcome to your UltraLearn dashboard, ${isAuthenticated().user.fullName}`}</h1>
          <h5>{`Your username is ${isAuthenticated().user.username}`}</h5>

          <div className='d-inline-block'>
            <Link className='btn btn-raised btn-success' to={`/edit/${isAuthenticated().user.username}`}>Edit Profile</Link>
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