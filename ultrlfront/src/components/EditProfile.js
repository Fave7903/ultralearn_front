import React, { Component } from 'react'
import { isAuthenticated } from '../auth'
import { read, update } from './apiUser'
import {Redirect} from 'react-router-dom'
import Nav from './Nav'
import Axios from 'axios'
import {Image} from 'cloudinary-react'


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
    const {fullName, username, email, password, error, dateOfBirth, bio, skillInterests, redirectToProfile, gender, location, loading, imgId} = this.state

    if (redirectToProfile) {
      return <Redirect to={`/ul/${isAuthenticated().user.username}`}></Redirect>
    }
    return (
      <div>
        <Nav />
        <div  className='container pt-5 mt-5'>
        <h2 className="mt-5 mb-5">Edit Profile</h2>

        <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
          {error}
        </div>


        {loading ? <div className="jumbotron text-center">
          <div className="spinner-border text-primary" role="status">
  <span className="sr-only">Loading...</span>
</div>
        </div> : ""}

          <div>
      <input style={{width: "50%"}} className="form-control mx-3" type="file" onChange={(event) => {this.setState({imageSelected: event.target.files[0]})}}/>
      <button className="btn btn-raised btn-success mt-1 mx-3" onClick={this.uploadImage}>Upload Image</button>
            {imgId &&
      <Image  cloudName="favoursoar" publicId={imgId} style={{width: "180px", height: "180px", objectFit: "cover", borderRadius: "50%"}}/>
            }
    </div>

        <form>

          
          <div className="form-group mb-4">
            <label className="text-muted">Full Name</label>
            <input 
              onChange={this.handleChange("fullName")} 
              type="text" 
              className="form-control" 
              value={fullName}>
            </input>
          </div>

          <div className="form-group mb-4">
            <label className="text-muted">Username</label>
            <input 
              onChange={this.handleChange("username")} 
              type="text" 
              className="form-control" 
              value={username}>
            </input>
          </div>
          
          <div className="form-group mb-4">
            <label className="text-muted">Email</label>
            <input 
              onChange={this.handleChange("email")} 
              type="email" 
              className="form-control"
              value={email}>
            </input>
          </div>
          <div className="form-group mb-4">
            <label className="text-muted">Password</label>
            <input 
              onChange={this.handleChange("password")} 
              type="password" 
              className="form-control"
              value={password}>
            </input>
          </div>

          <div className="form-group mb-4">
            <label className="text-muted">Date of Birth</label>
            <input 
              onChange={this.handleChange("dateOfBirth")} 
              type="date" 
              className="form-control" 
              value={dateOfBirth}>
            </input>
          </div>

          <div className="form-group mb-4">
            <label className="text-muted">Location (State)</label>
            <input 
              onChange={this.handleChange("location")} 
              type="text" 
              className="form-control" 
              value={location}>
            </input>
          </div>

          <div className="form-group mb-4">
            <label className="text-muted">Gender</label>
            <select class="form-select" aria-label="Default select example" value={gender} onChange={this.handleChange("gender")}>
            <option value="" disabled selected>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          </div>
    

          <div className="form-group mb-4">
            <label className="text-muted">Skill Interest</label>
            <input 
              onChange={this.handleChange("skillInterests")} 
              type="text" 
              className="form-control" 
              value={skillInterests}>
            </input>
          </div>

          <div className="form-group mb-4">
            <label className="text-muted">Bio</label>
            <textarea 
              onChange={this.handleChange("bio")} 
              type="text" 
              className="form-control" 
              value={bio}>
            </textarea>
          </div>
          
          <button onClick={this.clickSubmit} className="btn btn-raised btn-lg btn-outline-primary">Update</button>
        </form>
          </div>
      </div>
    );
  }
}

export default EditProfile