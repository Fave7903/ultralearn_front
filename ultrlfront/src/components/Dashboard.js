import React from 'react'
import { isAuthenticated } from '../auth'
import Footer from '../components/Footer'
import { Redirect } from 'react-router-dom'
import Posts from '../posts/Posts'
import Nav from './Nav'



const Dashboard = () => {
  return (
    
    <div>
      
      {isAuthenticated() ?
        <div className='post-back smallNav'>
          <Nav />
          
          <Posts />
          <Footer/>
        </div>
      : <Redirect to="/signup" />}
    </div>
  );
}

export default Dashboard