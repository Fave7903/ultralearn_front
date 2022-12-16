import React, { Component } from 'react'
import {list} from './apiUser'
import {Link} from 'react-router-dom'
import avatar from '../assets/avatar.png'

class Users extends Component {
  constructor() {
    super()
    this.state = {
      users: []
    };
  }

  componentDidMount = () => {
    list().then(data => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({users: data})
      }
    })
  }

  renderUsers = (users) => (
    <div className='row'>
          {users.map((user, i) => (
            <div className="card col-md-3 mx-3" key={i}>
  <img src={avatar} className="card-img-top" alt={user.username} style={{width: '180px', height: '180px', objectFit: 'cover', borderRadius: '50%'}}/>
  <div className="card-body">
    <h5 className="text-1xl">{user.fullName}</h5>
    <p className="card-text">{user.username}</p>
    <Link to={`/users/${user.username}`} className="btn btn-primary btn-raised btn-sm">View Profile</Link>
  </div>
</div>
          ))}
        </div>
  );
  
  render() {
    const {users} = this.state
    
    return (
      <div className='container'>
        <h2 className="mt-5 mb-5">Users</h2>

        {this.renderUsers(users)}
      </div>
    )
  }
}

export default Users