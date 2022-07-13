import React, { Component } from 'react'
import { signup } from '../auth'
import {Link} from 'react-router-dom'
// import image3 from '../assets/image 3.png'
import ultralearn from '../assets/ultralearn (1).png'
import logo from '../assets/newLogo.png'
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
      loading: false,
      toggler: "password",
      accept: false
    }
  }
  handleChange = name => event => {
    this.setState({error: ""})
    this.setState({open: false})
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
    if (this.state.accept) { 
    event.preventDefault()
    window.scrollTo(0, 0)
    this.setState({loading: true})
    const {fullName, username, email, password} = this.state
    username.trim()
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
    } else {
      event.preventDefault()
      window.scrollTo(0, 0)
      this.setState({error: "Please accept our Terms and Conditions to Sign up"})
    }
  }
  
  
  
  render() {
    const {fullName, username, email, password, error, open, loading, toggler} = this.state
    return (
      <div>
      <div className="contaner-fluid ">
      <div className="row "> 
      <div className='color col h3'>
      <p className="float-start mt-n3 "><img src={ultralearn} className="image-fluid me-n4" alt="Student"/>UltraLEARN</p>


                    <figure>
                <img src={logo} className="img-fluid mx-auto d-block" alt="Student"/>
                <figcaption style={{color: "#5F0F40"}} className="text-center figure-caption"> Exploring Growth Conversations</figcaption>
                </figure>

                </div>
                    



        <div className="bg-light col">
                  <div className="float-right mt-4 mx-2">
        <p className="lead">
                        Already have an account?&nbsp;&nbsp;
                        <Link to="/signin" style={{color: "#5F0F40"}} className="fw-bold">Login</Link>
                    </p>
                    </div>
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
            <label className="lead fw-bold">Full Name</label>
            <input 
              style={{height: "50px", borderRadius: "15px"}}
              onChange={this.handleChange("fullName")} 
              type="text" 
              className="form-control" 
              placeholder="Your name"
              value={fullName}>
            </input>
          </div>

          <div className="form-group mb-4 col-6">
            <label className="lead fw-bold">Username</label>
            <input 
              style={{height: "50px", borderRadius: "15px"}}
              onChange={this.handleChange("username")} 
              type="text" 
              placeholder="Your username"
              className="form-control" 
              value={username}>
            </input>
          </div>
          </div>
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
            <div className="mx-4 mt-1 mb-3">
            <input onClick={this.toggle} className="form-check-input" type="checkbox" value="" id="flexCheckChecked"></input>
                    <label className="form-check-label" for="flexCheckChecked">
                      Show password
                    </label>
              </div>
            <div className="mx-4 mt-1 lead">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"></input>
                    <label className="form-check-label" for="flexCheckChecked">
                      Remember me
                    </label>
              </div>
          </div>
          
          <div className="mt-5 mx-4 lead">
<p>
<input onClick={() => {
  if (this.state.accept === false) {
    this.setState({accept: true})
  } else {
    this.setState({accept: false})
  }
}} onChange={() => this.setState({error: ""})} className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>Creating an account means you accept our <Link to='/terms' style={{color: "#5F0F40"}} className="fw-bold">Terms and Conditions</Link>
</p>
                </div>
          <div className="col-5 mx-auto">
              <button className="btn col mx-auto" style={{height: "50px", borderRadius: "15px", color: "white"}} onClick={this.clickSubmit} >Sign Up</button>
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


     
      </div>
        </div>
        </div>
        </div>
        </div>
    );
  }
}

export default Signup