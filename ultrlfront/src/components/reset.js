import React, { Component } from 'react'
import { isAuthenticated } from '../auth'
import { read, update } from './apiUser'
import {Redirect} from 'react-router-dom'
import Nav2 from './Nav2'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import mailicon from "../assets/mailicon.png"



class Reset extends Component {
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
    const { redirectToProfile} = this.state

    if (redirectToProfile) {
      return <Redirect to={`/users/${isAuthenticated().user.username}`}></Redirect>
    }
    return (
      <div>
        <Nav2 />
        <div className='flex justify-center self-center  lg:pt-20'>
          <div className="  p-4 w-full max-w-sm bg-white m-0 rounded-lg border border-purple-200 shadow-md sm:p-6 bg-gray-100 md:p-8 dark:bg-gray-800 dark:border-purple-900 ">
            <form className=" space-y-7" action="/">
            <div className="items-center justify-center ">
              <img className='mx-auto text-center h-10  w-10  bg-no-repeat bg-contain' src = {mailicon} alt=""/>
            </div>
            <p className="text-sm text-center font-Montserrat font-bold text-purple-900 dark:text-white">We sent a password reset link to<br></br>
                        @berahfavourite@mail.com</p>
              <div className='flex items-center mt-6 mb-3 justify-center'>
                <button type="submit" className="w-30 flex items-center text-white bg-purple-900 hover:bg-white hover:text-purple-900 focus:ring-4 focus:outline-none 
                        focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-indgo-900 dark:hover:bg-purple-900
                        dark:focus:ring-purple-900">Open Email</button>
               
              </div>
              <div className="fonts-15 mb-3 text-center pt-5 sm:pt-3">
                    Didn't receive any mail?
                    <Link to="/verificationemail" style={{ color: "#460273" }} className="fw-bold"> Click to resend</Link>
                  </div>
                  <div className='flex justify-center w-full m-0 p-0'>
                <button class="flex text-black text-purple-900   py-2 px-4 rounded-full" onClick={this.clickSubmit} type="button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.0" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    Back to Login</button>

              </div>
              
              </form>
          </div>
          </div>
      </div>
    );
  }
}

export default Reset