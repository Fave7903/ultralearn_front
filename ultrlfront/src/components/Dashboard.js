import React from 'react'
import { isAuthenticated } from '../auth'
import { Navigate } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div>
      {isAuthenticated() &&
        <div className="container mt-5 mx-2">
        <h1>{`Welcome to your UltraLearn dashboard, ${isAuthenticated().user.fullName}`}</h1>
          <h5>{`Your username is ${isAuthenticated().user.username}`}</h5>
        </div>
      }
      {!isAuthenticated() &&
        <Navigate to="/signin" />
      }
    </div>
  );
}

export default Dashboard