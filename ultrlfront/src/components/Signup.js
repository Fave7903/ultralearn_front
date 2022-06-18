import React, { Component } from 'react'
import { signup } from '../auth'
import {Link} from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import image3 from '../assets/image 3.png'
import '../assets/style.css'
import { CircularProgress } from '@material-ui/core'

class Signup extends Component {
  constructor() {
    super()
    this.state = {
      fullName: "",
      username: "",
      email: "",
      password: "",
      error: "",
      open: false,
      loading: false
    }
  }
  googleSuccess = async (res) => {
    console.log(res)
  }
  // googleFailure = (error) => {
  //   console.log(error)
  //   console.log("Google Sign In was unsuccessful")
  // }
  handleChange = name => event => {
    this.setState({error: ""})
    this.setState({open: false})
    this.setState({ [name]: event.target.value })
  }
  clickSubmit = event => {
    event.preventDefault()
    this.setState({loading: true})
    const {fullName, username, email, password} = this.state
    const user = {
      fullName,
      username,
      email,
      password
    }
    //console.log(user)
    signup(user)
      .then(data => {
        if (data.error) this.setState({error: data.error, loading: false})
        else this.setState({
          error: "",
          fullName: "",
          username: "",
          email: "",
          password: "",
          open: true,
          loading: false
        })
      })
  }
  
  
  
  render() {
    const {fullName, username, email, password, error, open, loading} = this.state
    return (
      <div>
      <div className="contaner-fluid">
      <div className="row"> 

        <div className=" color col">
                <p className="float-start text-light">UltraLEARN</p>
                <figure>
                <img src={image3} className="image text-center" alt="Student"/>
                <figcaption className="text-light text-center caption"> Promoting Growth Conversations</figcaption>
                </figure>
            </div>

        
      <div className="col">
        <br></br>
        <h2 className="mt-5 mb-5">Signup</h2>

        <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
          {error}
        </div>

         <div className="alert alert-info" style={{display: open ? "" : "none"}}>
           New account successfully created. Please <Link to='/signin'>Sign in</Link>
        </div>

        {loading ? <div className="jumbotron text-center">
          <CircularProgress color="secondary"/>
        </div> : ""}
        
        <form>
          <div className="row">
          <div className="form-group mb-4 col">
            <label className="text-muted">Full Name</label>
            <input 
              onChange={this.handleChange("fullName")} 
              type="text" 
              className="form-control" 
              placeholder="Full Name"
              value={fullName}>
            </input>
          </div>

          <div className="form-group mb-4 col">
            <label className="text-muted">Username</label>
            <input 
              onChange={this.handleChange("username")} 
              type="text" 
              placeholder="Username"
              className="form-control" 
              value={username}>
            </input>
          </div>
          </div>
          <div className="form-group mb-4">
            <label className="text-muted">Email</label>
            <input 
              onChange={this.handleChange("email")} 
              type="email" 
              placeholder="Email"
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
              placeholder="6+ characters, must contain a number"
              value={password}>
            </input>
          </div>
          <div className="col-6 btn-lg mx-auto">
              <button className="btn btn-primary btn-raised btn-lg"  onClick={this.clickSubmit} >Signup</button>
          </div>
        <p className="fw-bold mt-2">Or Continue with</p>
          <div className="container mt-3 mx-2">
          <GoogleLogin 
            clientId="141056353686-8dm6cb1216qdaumv029rqiqk7hb0s2sf.apps.googleusercontent.com"
            onSuccess={this.googleSuccess}
            onFailure={this.googleFailure}

            />
            </div>
        </form>
       
        <div className="text-center">
                    <p>
                        Aready have an account?&nbsp;&nbsp;
                        <Link to="/signin" className="txt">SignIn</Link>
                    </p>
                </div>
     
      </div>
        </div>
        </div>
        </div>
    );
  }
}

export default Signup