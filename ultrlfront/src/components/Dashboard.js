import React from 'react'
import { isAuthenticated } from '../auth'
import Footer from '../components/Footer'
// import { Redirect } from 'react-router-dom'
import Posts from '../posts/Posts'
import Nav from './Nav'
// import Explore from './Explore'

const Dashboard = () => {
  return (
    <div>
      {isAuthenticated() &&
        <div>
          <Nav />
          {/* <Explore/> */}
          <Posts />
          <Footer/>
        </div>
      }
      {!isAuthenticated() &&
        <>
          deisgn this page
        </>
      }
    </div>
  );
}

export default Dashboard