import React, { Component } from 'react'
import { signup } from '../auth'
import { Link } from 'react-router-dom'
// import image3 from '../assets/image 3.png'
// import logo from '../assets/newLogo.png'
 import '../assets/style.css'
import { Authsidebar } from './authsidebar'

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
    this.setState({ error: "" })
    this.setState({ open: false })
    this.setState({ [name]: event.target.value })
  }

  toggle = () => {
    if (this.state.toggler === "password") {
      this.setState({ toggler: "text" })
    } else {
      this.setState({ toggler: "password" })
    }
  }

  clickSubmit = event => {
    if (this.state.accept) {
      event.preventDefault()
      window.scrollTo(0, 0)
      this.setState({ loading: true })
      const { fullName, username, email, password } = this.state
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
          if (data.error) this.setState({ error: data.error, loading: false })
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
      this.setState({ error: "Please accept our Terms and Conditions to Sign up" })
    }
  }




  render() {
    const { fullName, username, email, password, error, open, loading, toggler } = this.state
    return (
      <div className='body h-100'>
        <div className="contaner-fluid ">
          <div className="row ">
            <Authsidebar />
            <div className="h-100 bg-light col-xs-12 col-sm-12 col-md-6">
              
              <div className="p-5 mt-5">
                <h2 className=" mb-5 fw-bolder">Register</h2>
                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                  {error}
                </div>
                <div className="alert alert-info" style={{ display: open ? "" : "none" }}>
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
                      <label className="fw-bold signup-ititle">Full Name</label>
                      <input

                        onChange={this.handleChange("fullName")}
                        type="text"
                        className="form-control signup-input"
                        placeholder="Your name"
                        value={fullName}>
                      </input>
                    </div>
                    <div className="form-group mb-4 col-6">
                      <label className="fw-bold signup-ititle">Username</label>
                      <input

                        onChange={this.handleChange("username")}
                        type="text"
                        placeholder="Your username"
                        className="form-control signup-input"
                        value={username}>
                      </input>
                    </div>
                  </div>
                  <div className="form-group mb-4">
                    <label className="fw-bold signup-ititle">Email</label>
                    <input
                      onChange={this.handleChange("email")}
                      type="email"
                      placeholder="Email"
                      className="form-control signup-input"
                      value={email}>
                    </input>
                  </div>
                  <div className="form-group mb-2">
                    <label className="fw-bold signup-ititle">Password</label>


                    <input
                      onChange={this.handleChange("password")}
                      type={toggler}
                      className="form-control signup-input"
                      placeholder="6+ characters, must contain a number"
                      value={password}>
                    </input>
                    <div className="input-group-btn">
                      <a href="#" style={{ textDecoration: "none", color: "#888", fontSize: "12px" }} className="" onClick={this.toggle}>
                        {toggler === "password" ? <span >Show</span> : <span>Hide</span>} Password.
                      </a>
                    </div>
                     </div>
                  <div className="form-group mb-2">
                    <div className="mx-4 mt-3 ">
                      <input className="form-check-input mr-2" type="checkbox" value="" id="flexCheckChecked"></input>
                      <label className="form-check-label fonts15" for="flexCheckChecked" >
                        Remember me
                      </label>
                    </div>
                  </div>  
              <div className="form-group mb-2">
                <div className="mt-1 mx-4">
                    <input onClick={() => {
                      if (this.state.accept === false) {
                        this.setState({ accept: true })
                      } else {
                        this.setState({ accept: false })
                      }
                    }} onChange={() => this.setState({ error: "" })} className="form-check-input mr-2" type="checkbox" value="" id="defaultCheck1" />
                    <label className='fonts15'>
                    Creating an account means you accept our <Link to='/terms' style={{ color: "#5F0F40" }} className="fw-bold">Terms and Conditions</Link>
                    </label>
                  
                </div>
                <div className="col-5 mt-4 mx-auto">
                  <button className="btn col mx-auto my-3" style={{ height: "50px", borderRadius: "15px", color: "white" }} onClick={this.clickSubmit} >Sign Up</button>
                  <p className="fonts15">
                  Already have an account?&nbsp;&nbsp;
                  <Link to="/signin" style={{ color: "#5F0F40" }} className="fw-bold">Login</Link>
                </p>
                </div>
              </div>
              <br></br>
            </form>
          </div>
        </div>
      </div>
        </div >
      </div >
    );
  }
}

export default Signup