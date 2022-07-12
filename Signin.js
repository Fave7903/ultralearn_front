import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { signin, authenticate } from '../auth'
import {Link} from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import '../assets/style.css'
import image3 from '../assets/image 3.png'
import face from '../assets/facebook.png'
import ultralearn from '../assets/ultralearn.png'
import logo from '../assets/logo.png'
import down from '../assets/download.png'




class Signin extends Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password: "",
      error: "",
      redirectToReferer: false,
      loading: false
    }
  }

  handleChange = name => event => {
    this.setState({error: ""})
    this.setState({ [name]: event.target.value })
  }

  
  
  clickSubmit = event => {
    event.preventDefault()
    this.setState({loading: true})
    const {email, password} = this.state
    const user = {
      email,
      password
    }
    signin(user)
      .then(data => {
        if (data.error) {
          this.setState({error: data.error, loading: false})
        }
        else {
          authenticate(data, () => {
            this.setState({redirectToReferer: true})
          })
          console.log(user)
        }
      })
  }
  
  
  
  render() {
    const {email, password, error, redirectToReferer, loading} = this.state
    if (redirectToReferer) {
      return <Redirect to="/" />
    }
    return (
        <div>
         
        <div className="container-fluid">
            <div className="row">
            <div className=" color col h3">
              
                <p className="float-start mt-n3  "><img src={ultralearn} className="image-fluid me-n4 " alt="Student"/>UltraLEARN</p>
                <figure>
                <img src={logo} className="img-fluid mx-auto d-block" alt="Student"/>
                <figcaption className="text-center figure-caption text-dark"> Exploring Growth Conversations</figcaption>
                </figure>
            </div>
            <div className="col">
            <br></br>
               <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
          {error}
        </div>

        {loading ? <div className="jumbotron text-center">
          <div className="spinner-border text-primary" role="status">
  <span className="sr-only">Loading...</span>
</div>
        </div> : ""}
        <div className="p-5 mt-3">
                <p className="fs-3 fw-bolder">Welcome Back!</p>  
                <p className="greytext">Welcome back, please enter your details</p>
          <form>
                <div className="form-group mb-4">
            <label className="text">Username/Email</label>
            <input 
              onChange={this.handleChange("email")} 
              type="email" 
              placeholder="Your Username"
              className="form-control"
              value={email}>
            </input>
          </div>
          <div className="form-group mb-4">
            <label className="text">Password</label>
            <input 
              onChange={this.handleChange("password")} 
              type="password" 
              className="form-control"
              placeholder="6+ characters, must contain a number"
              value={password}>
                required
            </input>
            <i class="bi bi-eye-slash" 
                    id="togglePassword"></i>
          </div>
          
                  <div className="form-check">
                    <input className="form-check-input text-dark" type="checkbox" value="" id="flexCheckChecked"></input>
                    <label className="form-check-label text-dark" for="flexCheckChecked">
                      Remember Me
                    </label>
                  </div>
                  <div className="col-5 mx-auto">
                    <button className="btn btn-primary col mx-auto" onClick={this.clickSubmit}>Login</button>
                  </div>
            </form>
                  {/* <div className="fw-bold text-dark">
                    <p>Or continue with</p>
                    <p>
                      <GoogleLogin 
            clientId="141056353686-8dm6cb1216qdaumv029rqiqk7hb0s2sf.apps.googleusercontent.com"
            onSuccess={this.googleSuccess}
            onFailure={this.googleFailure}

            /> */}
                        {/* <img src={face} className="fb"alt="Facebook"/> */}
                        {/* <img src={down} className="fluid"alt="Twitter"/> */}
                      {/* </p>
                </div> */}
                <div className="text-center">
                    <p>
                        Don't have an account?&nbsp;&nbsp;
                        <Link to="/signup" className="fw-bold">SignUp</Link>
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

export default Signin