import React, { Component } from 'react'
import { isAuthenticated } from '../auth'
import { read, update } from './apiUser'


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
      open: false
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
          skillInterests: data.skillInterests
        })
      }
    })
  }

  componentDidMount() {
    const name = this.props.match.params.name
    this.init(name)
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
    const {fullName, username, email, password, dateOfBirth, bio, skillInterests, gender, location} = this.state
    const user = {
      fullName,
      username,
      email,
      password: password || undefined,
      dateOfBirth,
      bio,
      skillInterests,
      gender,
      location
    }
    //console.log(user)
    const name = this.props.match.params.name
    const token = isAuthenticated().token
    console.log(user)
    update(name, token, user)
      .then(data => {
        if (data.error) {
          this.setState({error: data.error, loading: false})
          console.log(data.error)
        }
        else {
          console.log("Data: ", data)
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
          open: true
        })
        }
      })
  }
  
  
  
  render() {
    const {fullName, username, email, password, error, open, dateOfBirth, bio, skillInterests, gender, location, loading} = this.state
    return (
      <div className='container'>
        <h2 className="mt-5 mb-5">Edit Profile</h2>

        <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
          {error}
        </div>

        <div className="alert alert-success" style={{display: open ? "" : "none"}}>
           Update Successful
        </div>

        {loading ? <div className="jumbotron text-center">
          <div className="spinner-border text-primary" role="status">
  <span className="sr-only">Loading...</span>
</div>
        </div> : ""}

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
            <option value="Male" selected>Male</option>
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
          
          <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Update</button>
        </form>
      </div>
    );
  }
}

export default EditProfile