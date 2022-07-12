import React, { Component } from 'react'
import { findPeople, follow } from './apiUser'
import {Link} from 'react-router-dom'
import {isAuthenticated} from '../auth'
import Nav from './Nav'
import {Image} from 'cloudinary-react'

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
  {user.imgId ? <Image cloudName="favoursoar" publicId={user.imgId} style={{width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%', borderColor: "purple"}}/> :
          <i className="fa-solid fa-user mx-3" style={{color: "#5f0f40", fontSize: "100px"}}></i>
          }
  <div className="card-body">
    <h5 className="card-title">{user.fullName}</h5>
    <p className="card-text">{user.username}</p>
    <Link to={`/ul/${user.username}`} className="btn btn-raised btn-sm" style={{backgroundColor: "#5f0f40", color: "white"}}>View Profile</Link>
    <button style={{backgroundColor: "#5f0f40", color: "white"}} onClick={() => this.clickFollow(user, i)} className='btn btn-raised btn-info float-right btn-sm mx-3 mt-1'>Follow</button>
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
        <h2 className="d-flex align-items-center justify-content-center mt-5 mb-5">Find People</h2>

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