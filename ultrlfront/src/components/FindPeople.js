import React, { Component } from 'react'
import { findPeople, follow } from './apiUser'
import {Link} from 'react-router-dom'
import {isAuthenticated} from '../auth'
import Nav from './Nav'
import avatar from "../assets/avatar.jpg"
import {Image} from 'cloudinary-react'
import {Errormsg} from './errormsg'

class FindPeople extends Component {
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
    const userId = isAuthenticated().user.id
    const token = isAuthenticated().token
    window.scrollTo(0, 0)
    follow(userId, token, user.id)
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
  <Link to={`/users/${user.username}`} className=" text-dark text-1xl sm:text-2xl" ><h5 className="">{user.fullName}</h5></Link>
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
      <div className='container pt-5 mt-5'>
        <Nav />

        <div className="-mb-10 sm:mb-8  " >
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1"><i className="fas fa-search"></i></span>
          </div>
          <input type="search" style={{ width:"62vw"}}className="w-100 sm:w-auto bg-slate-400 h-16 ml-16 sm:ml-14 px-4 sm:px-6 py-5 text-1xl  border border-black-300  border rounded-md"onChange={ event => {
            this.setState({ searchTerm: event.target.value})}} placeholder="Search Friends"></input>
                 <button className=" invisible sm:visible w-48 post-bgpurple h-16 text-white  justify-center  px-6 py-5 font-medium text-1xl  border border-gray-300 rounded-md shadow-sm  ">Search</button>
        </div>
        <Errormsg error={error} style={{ display: error ? "" : "none" }} />
        {open && (
        <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
        <span class="block sm:inline">{followMessage}</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg class="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
        </span>
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