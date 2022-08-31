import React, { Component } from 'react'
import { findPeople, follow } from './apiUser'
import {Link} from 'react-router-dom'
import {isAuthenticated} from '../auth'
import Arrow from "../assets/Arrow.svg"
import avatar from "../assets/avatar.jpg"
import {Image} from 'cloudinary-react'

class Following extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      error: "",
      open: false,
      loading: true, 
      searchTerm: ""
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
          {users.filter((val) => {
            if (this.state.searchTerm === "") {
              return val
            } else if (val.fullName.toLowerCase().includes(this.state.searchTerm.toLowerCase()) || val.username.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
              return val
            } else {
              return false
            }
          }).map((user, i) => (
            <div className="px-2 sm:px-16 flex grid grid-cols-2 sm:grid grid-cols-3 mb-8" key={i}>
  <div className="">
  {user.imgId ? <Image cloudName="favoursoar" publicId={user.imgId} style={{width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%', borderColor: "purple"}}/> :
          <img src={avatar}alt="Avatar" className=" invisble sm:visible rounded-full"style={{color: "#460273", width: "100px",height:"100px"}}/>
          }
  </div>
  <Link to={`/users/${user.username}`} className=" text-dark text-1xl sm:text-2xl" ><p className="">{user.fullName}</p></Link>
  <div className=''>
    <button style={{backgroundColor: "#460273", color: "white"}} onClick={() => this.clickFollow(user, i)} className=' float-right py-4 px-8'>Follow</button>
    </div>
</div>
          ))}
        </div>
  );
  
  render() {
    const {users, open, error, followMessage, loading} = this.state
    
    return (
      <div className='container p-4 '>
        <div className='flex ml-6 p-10'>
        <Link to={`/users/`}><img style={{ width: "30px", height: "20px" }} src={Arrow}className="relativemr-20"alt ="Arrow"/></Link>
            <h4 className='text-2xl  mx-auto '>Following</h4>
        </div>
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

export default Following