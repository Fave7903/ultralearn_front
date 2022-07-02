import React from 'react'
import { isAuthenticated } from '../auth'
import { Redirect, Link } from 'react-router-dom'
import avatar from '../assets/avatar.png'

const Dashboard = () => {
  return (
    <div>
      {isAuthenticated() &&
        <div className="row">
        <div className="container mt-5 col-9">
        <h1>Home Page</h1>
         </div>
          <div className='mt-5 col-3'>
            <Link to={`/ul/${isAuthenticated().user.username}`}><img src={avatar} className="card-img-top" alt='profile' style={{width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%'}}/><p>{isAuthenticated().user.username}</p></Link>
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