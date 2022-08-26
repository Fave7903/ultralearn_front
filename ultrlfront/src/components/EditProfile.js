import React, { Component } from 'react'
import { isAuthenticated } from '../auth'
import { read, update } from './apiUser'
import {Redirect} from 'react-router-dom'
import Nav from './Nav'
import Axios from 'axios'
import avatarImage from "../assets/avatar.jpg"


class EditProfile extends Component {
  constructor() {
    super()
    this.state = {
      fullName: "",
      username: "",
      email: "",
      password: "",
      error: "",
      dateOfBirth: "",
      location: "",
      gender: "",
      bio: "",
      skillInterests: "",
      loading: false,
      redirectToProfile: false,
      imageSelected: "",
      imgId: ""
    }
  }

  init = (name) => {
    const token = isAuthenticated().token
    read(name, token)
    .then(data => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({ 
          id: data._id, 
          fullName: data.fullName, 
          username: data.username,
          email: data.email,
          dateOfBirth: data.dateOfBirth,
          location: data.location,
          gender: data.gender,
          bio: data.bio,
          skillInterests: data.skillInterests,
          imgId: data.imgId
        })
      }
    })
  }

  componentDidMount() {
    const name = this.props.match.params.name
    this.init(name)
  }

  uploadImage = () => {
  const formData = new FormData()
  formData.append('file', this.state.imageSelected)
  formData.append('upload_preset', "favoursoar")

  Axios.post("https://api.cloudinary.com/v1_1/favoursoar/image/upload", formData).then(response => {
    this.setState({imgId: response.data.public_id})
  }).catch(err => {
    console.log(err)
  })
}

 
  handleChange = name => event => {
    this.setState({error: ""})
    this.setState({open: false})
    this.setState({ [name]: event.target.value })
  }
  clickSubmit = event => {
    event.preventDefault()
    window.scrollTo(0, 0)
    this.setState({loading: true})
    const {fullName, username, email, password, dateOfBirth, bio, skillInterests, gender, location, imgId} = this.state
    const user = {
      fullName,
      username,
      email,
      password: password || undefined,
      dateOfBirth,
      bio,
      skillInterests,
      gender,
      location,
      imgId
    }
    //console.log(user)
    const name = this.props.match.params.name
    const token = isAuthenticated().token

    update(name, token, user)
      .then(data => {
        if (data.error) {
          this.setState({error: data.error, loading: false})
          console.log(data.error)
        }
        else {
          
          this.setState({
          error: "",
          fullName: "",
          username: "",
          email: "",
          password: "",
          dateOfBirth: "",
          location: "",
          gender: "",
          bio: "",
          skillInterests: "",
          loading: false,
          redirectToProfile: true
        })
        }
      })
  }
  
  
  
  render() {
    const {fullName, username, email, error, bio, skillInterests, redirectToProfile,  location, loading} = this.state

    if (redirectToProfile) {
      return <Redirect to={`/ul/${isAuthenticated().user.username}`}></Redirect>
    }
    return (
      <div>
        <Nav />
        <div  className='px-16'>
          <div className='grid grid-cols-6 'style={{ backgroundImage:" url(/bg-profile.png)" }} >
            <div className='sm:visible invisible'>
            <img style={{ width: "100px", height: "100px" }} className="sm:visible invisible rounded-full border border-gray-100 shadow-sm image-fluid mx-1 " src={avatarImage} alt="user " />
            </div>
          <div className='col-span-3 '>
          <h1 className="text-2xl sm:ml-0 font-bold ul-purple ">Profile</h1>
          <p className='ul-purple'>Update your photo and personal details</p>
          </div>
          <div className='float-right col-span-2 '>
          <button className="  post-bgpurple text-white mr-5 mb-5 lg:mb-0 px-10 py-2 text-center justify-center text-1xl   " onClick={this.clickSubmit}>Save</button>
          <button className="  md:visible invisible ul-purple  border-purple justify-center  px-8 py-2  text-1xl    " onClick={this.cancel}>Cancel</button>
          </div>
          </div>



        <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
          {error}
        </div>


        {loading ? <div className="jumbotron text-center">
          <div className="spinner-border text-primary" role="status">
  <span className="sr-only">Loading...</span>
</div>
        </div> : ""}

        <form className='mt-8'>
          <div className=''>
            
          <div className='grid grid-cols-6 gap-0'>
          <div className='mt-12'>
            <ul className=''>
              <li><a href='/'className='ul-purple font-bold  py-6'>Edit Profile</a></li>
              <li><a href='/'className='ul-purple sm:visible invisible '>Notifications</a></li>
              <li><a href='/'className='ul-purple  sm:visible invisible '>Social Profiles</a></li>
              <li><a href='/'className='ul-purple  sm:visible invisible'>Privacy Policy</a></li>
              <li><a href='/'className='ul-purple  sm:visible invisible'>Terms of Services</a></li>
              <li><a href='/'className='ul-purple  sm:visible invisible '>Support</a></li>
              <li><a href='/'className='text-red-500  sm:visible invisible'>Log Out</a></li>
            </ul>
          </div>
          <div className='col-span-5'>
            <div className=' grid grid-cols-0 sm:grid grid-cols-2 mb-5  gap-'>
            <div className="mr-2 sm:-mr-70">
                    <label className="block text-sm font-bold mb-2 ul-purple" for="Firstname">
                      First Name
                    </label>
                    <input className=" border-purple   shadow appearance-none h-11 border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={this.handleChange("fullName")}
                      type="text" id="fullName" value={fullName} placeholder="First Name" />
                  </div>
                  <div className="-ml-0 md:-ml-24">
                    <label class="block  text-sm font-bold mb-2 ul-purple" for="username">
                      Last Name
                    </label>
                    <input className="border-purple shadow appearance-none border h-11 rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={this.handleChange("username")}
                      type="text" id="username" value={username} placeholder="Last Name" />
                  </div>
            </div>

            <div className='grid  grid-cols-3 gap-0'>
            <div className="col-span-2 mb-5 -mr-0 md:-mr-40">
                    <label className="block  text-sm font-bold mb-2 ul-purple" for="Email">
                      Email
                    </label>
                    <input className="border-purple  shadow appearance-none  ul-purple h-11 border rounded mb-5 w-3/4 py-2 px-3 ul-purple leading-tight focus:outline-none focus:shadow-outline"
                      onChange={this.handleChange("email")}
                      type="text" id="fullName" value={email} placeholder="Email" />
                                    <div className=" ">
            <label className="block text-sm font-bold mb-2 ul-purple">Phone Number</label>
             <input 
              onChange={this.handleChange("email")} 
              type="number"  className=" border-purple shadow appearance-none h-11 mb-5 border rounded w-3/4 py-2 px-3 ul-purple leading-tight focus:outline-none focus:shadow-outline"value={email}>
            </input>
          </div>
          <div className=" ">
            <label className="block text-sm font-bold mb-2 ul-purple">Location</label>
            <input 
              onChange={this.handleChange("location")} 
              type="number"  className="border-purple shadow appearance-none h-11 border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"value={location}>
            </input>
          </div>
                  </div>
                  <div className="col-span-1 -ml-26">
                    <label className="block text-sm font-bold mb-2 ul-purple">Your Bio</label>
                     <textarea onChange={this.handleChange("bio")}  type="text" className="border-purple  mb-3 h-36 rounded w-3/4 py-2 px-3" value={bio} placeholder="Give a short description about yourself">  </textarea>
                     <div className="form-group mb-3">
                       <label className="block text-sm font-bold mb-1 ul-purple">Skill Interest</label>
            <input 
              onChange={this.handleChange("skillInterests")} 
              type="text" 
              className="border-purple  shadow appearance-none h-11 border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              value={skillInterests}>
            </input>
          </div>
                     </div>
            </div>

          </div>
                </div>
          </div>
          
        </form>
          </div>
      </div>
    );
  }
}

export default EditProfile