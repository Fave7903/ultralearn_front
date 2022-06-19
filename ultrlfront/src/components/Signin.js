import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'
import { signin, authenticate } from '../auth'
import {Link} from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import '../assets/style.css'
import image3 from '../assets/image 3.png'
import face from '../assets/facebook.png'
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
      return <Navigate to="/" />
    }
    return (
        <div>
         
        <div className="container-fluid">
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
               <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
          {error}
        </div>

        {loading ? <div className="jumbotron text-center">
          <div class="spinner-border text-primary" role="status">
  <span class="sr-only">Loading...</span>
</div>
        </div> : ""}
        <div className="p-5">
                <p className="text-dark fs-3 fw-bolder">Welcome Back!</p>  
                <p>Welcome back,please share your details</p>
          <form>
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
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"></input>
                    <label className="form-check-label" for="flexCheckChecked">
                      Remember Me
                    </label>
                  </div>
                  <div className="col-6 btn-lg mx-auto">
                    <button className="btn btn-primary btn-lg" onClick={this.clickSubmit}>Login</button>
                  </div>
            </form>
                  <div className="p-5 text-center">
                    <p>Or continue with</p>
                    <p>
                      <GoogleLogin 
            clientId="141056353686-8dm6cb1216qdaumv029rqiqk7hb0s2sf.apps.googleusercontent.com"
            onSuccess={this.googleSuccess}
            onFailure={this.googleFailure}

            />
                        <img src={face} className="fb"alt="Facebook"/>
                        <img src={down} className="fluid"alt="Twitter"/>
                      </p>
                </div>
                <div className="text-center">
                    <p>
                        Don't have an account?&nbsp;&nbsp;
                        <Link to="/signup" className="txt">SignUp</Link>
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