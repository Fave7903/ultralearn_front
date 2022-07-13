import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { signin, authenticate } from '../auth'
import {Link} from 'react-router-dom'
import '../assets/style.css'
// import image3 from '../assets/image 3.png'
import ultralearn from '../assets/ultralearn (1).png'
import logo from '../assets/newLogo.png'




class Signin extends Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password: "",
      error: "",
      redirectToReferer: false,
      loading: false,
      toggler: "password"
    }
  }

  handleChange = name => event => {
    this.setState({error: ""})
    this.setState({ [name]: event.target.value })
  }

  toggle = () => {
    if (this.state.toggler === "password") {
      this.setState({toggler: "text"})
    } else {
      this.setState({toggler: "password"})
    }
 }
  
  
  clickSubmit = event => {
    event.preventDefault()
    window.scrollTo(0, 0)
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
        }
      })
  }
  
  
  
  render() {
    const {email, password, error, redirectToReferer, loading, toggler} = this.state
    if (redirectToReferer) {
      return <Redirect to="/" />
    }
    return (
        <div>
         
        <div className="container-fluid">
            <div className="row">
            <div className="color col h3">
              
                <p className="float-start mt-n3  "><img src={ultralearn} className="image-fluid me-n4 " alt="Student"/>UltraLEARN</p>
                <figure>
                <img src={logo} className="img-fluid mx-auto d-block" alt="Student"/>
                <figcaption style={{color: "#5F0F40"}} className="text-center figure-caption"> Exploring Growth Conversations</figcaption>
                </figure>
            </div>
            <div className="col bg-light">
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
                <p className="fs-3 fw-bolder mb-5">Welcome Back!</p>  
                <p className="greytext lead mt-2">Welcome back, please enter your details</p>
          <form>
                <div className="form-group mb-4">
            <label className="lead fw-bold">Email</label>
            <input 
              style={{height: "50px", borderRadius: "15px"}}
              onChange={this.handleChange("email")} 
              type="email" 
              placeholder="Email"
              className="form-control"
              value={email}>
            </input>
          </div>
          <div className="form-group mb-2">
            <label className="lead fw-bold">Password</label>
            <input 
              style={{height: "50px", borderRadius: "15px"}}
              onChange={this.handleChange("password")} 
              type={toggler} 
              className="form-control"
              placeholder="6+ characters, must contain a number"
              value={password}>
            </input>
            
          </div>
            <div className="mx-4 mt-1 mb-3">
            <input onClick={this.toggle} className="form-check-input" type="checkbox" value="" id="flexCheckChecked"></input>
                    <label className="form-check-label" for="flexCheckChecked">
                      Show password
                    </label>
              </div>
          
                  <div className="form-check lead mx-3">
                    <input className="form-check-input text-dark" type="checkbox" value="" id="flexCheckChecked"></input>
                    <label className="form-check-label text-dark" for="flexCheckChecked">
                      Remember me
                    </label>
                  </div>
                  <div className="col-5 mx-auto mt-5 mb-5">
                    <button style={{height: "50px", borderRadius: "15px", color: "white"}} className="btn col mx-auto" onClick={this.clickSubmit}>Login</button>
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
                <div className="text-center lead">
                    <p>
                        Don't have an account?&nbsp;&nbsp;
                        <Link to="/signup" style={{color: "#5F0F40"}} className="fw-bold">Signup</Link>
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