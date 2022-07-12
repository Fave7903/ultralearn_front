import React, { Component } from 'react'
import { signup } from '../auth'
import {Link} from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import image3 from '../assets/image 3.png'
import ultralearn from '../assets/ultralearn.png'
import logo from '../assets/logo.png'
import '../assets/style.css'

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

      <div className="contaner-fluid ">
      <div className="row "> 
      <div className='color col h3'>
      <p className="float-start mt-n3 "><img src={ultralearn} className="image-fluid me-n4" alt="Student"/>UltraLEARN</p>


                    <figure>
                <img src={logo} className="img-fluid mx-auto d-block" alt="Student"/>
                <figcaption className="  text-center figure-caption text-dark"> Exploring Growth Conversations</figcaption>
                </figure>

                </div>
                    



        <div className="col">
      <div className="p-5 mt-4">
      
        <h2 className=" mb-5 fw-bolder">Register</h2>

        <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
          {error}
        </div>

         <div className="alert alert-info" style={{display: open ? "" : "none"}}>
           New account successfully created. Please <Link to='/signin'>Sign in</Link>
        </div>

        {loading ? <div className="jumbotron text-center">
          <div className="spinner-border text-primary" role="status">
  <span className="sr-only">Loading...</span>
</div>
        </div> : ""}
        
        <form>
          <div className="row">
          <div className="form-group mb-4 col-6">
            <label className="text">Full Name</label>
            <input 
              onChange={this.handleChange("fullName")} 
              type="text" 
              className="form-control" 
              placeholder="Full Name"
              value={fullName}>
            </input>
          </div>

          <div className="form-group mb-4 col-6">
            <label className="text">Username</label>
            <input 
              onChange={this.handleChange("username")} 
              type="text" 
              placeholder="Your Username"
              className="form-control" 
              value={username}>
            </input>
          </div>
          </div>
          <div className="form-group mb-4">
            <label className="text">Email</label>
            <input 
              onChange={this.handleChange("email")} 
              type="email" 
              placeholder="Email"
              className="form-control"
              value={email}>
            </input>
          </div>
          <div className="form-group mb-2">
            <label className="text">Password</label>
            <input 
              onChange={this.handleChange("password")} 
              type="password" 
              className="form-control"
              placeholder="6+ characters, must contain a number"
              value={password}>
            </input>
          </div>
          <div className="form-check mb-5">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"></input>
                    <label className="form-check-label" for="flexCheckChecked">
                      Remember Me
                    </label>
                  </div>
          <div className="">
<p>
<input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>Creating an account means you accept our <a href='https://ultralearn.github.io/Terms-and-Conditions/'className="fw-bold">Terms and Conditions</a>
</p>
                </div>
          <div className="col-5 mx-auto">
              <button className="btn btn-primary  col mx-auto"  onClick={this.clickSubmit} >Signup</button>
          </div>
          {/* <div>
        <p className="fw-bold text-dark">
          Or Continue with</p>
        </div> */}
          {/* <div className="container mt-3 mx-2">
          <GoogleLogin 
            clientId="141056353686-8dm6cb1216qdaumv029rqiqk7hb0s2sf.apps.googleusercontent.com"
            onSuccess={this.googleSuccess}
            onFailure={this.googleFailure}

            />
            </div> */}
            <br></br>
        </form>
        <div className="text-center">
        <p >
                        Already have an account?&nbsp;&nbsp;
                        <Link to="/signin" className=" fw-bold">Login</Link>
                    </p>
                    </div>

     
      </div>
        </div>
        </div>
        </div>
        </div>
    );
  }
}

export default Signup