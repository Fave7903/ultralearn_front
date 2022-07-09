import React, { Component } from 'react'
import { findPeople, follow } from './apiUser'
import {Link} from 'react-router-dom'
import avatar from '../assets/avatar.png'
import {isAuthenticated} from '../auth'
import Nav from './Nav'

class FindPeople extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      error: "",
      open: false,
      loading: true
    };
  }

  componentDidMount = () => {
    const name = isAuthenticated().user.username
    const token = isAuthenticated().token
    findPeople(name, token).then(data => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({users: data, loading: false})
      }
    })
  }

  clickFollow = (user, i) => {
    const userId = isAuthenticated().user._id
    const token = isAuthenticated().token
    window.scrollTo(0, 0)
    follow(userId, token, user._id)
    .then(data => {
      if (data.error) {
          this.setState({error: data.error})
      } else {
        let toFollow = this.state.users
        toFollow.splice(i, 1)
        this.setState({
          users: toFollow,
          open: true,
          followMessage: `You've started following ${user.username}`
        })
      }
    })
  }

  renderUsers = (users) => (
    <div>
          {users.map((user, i) => (
            <div className="card mx-3" key={i}>
  <img src={avatar} className="card-img-top" alt={user.username} style={{width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%'}}/>
  <div className="card-body">
    <h5 className="card-title">{user.fullName}</h5>
    <p className="card-text">{user.username}</p>
    <Link to={`/ul/${user.username}`} className="btn btn-primary btn-raised btn-sm">View Profile</Link>
    <button onClick={() => this.clickFollow(user, i)} className='btn btn-raised btn-info float-right btn-sm mx-3 mt-1'>Follow</button>
  </div>
</div>
          ))}
        </div>
  );
  
  render() {
    const {users, open, error, followMessage, loading} = this.state
    
    return (
      <div className='container pt-5 mt-5'>
        <Nav />
        <h2 className="mt-5 mb-5">Learners you can follow on UltraLearn</h2>

        {error && (
        <div className="alert alert-danger">
           <p>{error}</p>
        </div>
                 )}
        {open && (
        <div className="alert alert-success">
           <p>{followMessage}</p>
        </div>
                 )}

        {loading ? <div className="jumbotron text-center">
          <div className="spinner-border text-primary" role="status">
  <span className="sr-only">Loading...</span>
</div>
        </div> : ""}
        
        {this.renderUsers(users)}
      </div>
    )
  }
}

export default FindPeople