import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { signin, authenticate } from '../auth'
import { Link } from 'react-router-dom'
import '../assets/style.css'
// import image3 from '../assets/image 3.png'
 import { Authsidebar } from './authsidebar'




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
    this.setState({ error: "" })
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
    event.preventDefault()
    window.scrollTo(0, 0)
    this.setState({ loading: true })
    const { email, password } = this.state
    const user = {
      email,
      password
    }
    signin(user)
      .then(data => {
        if (data.error) {
          this.setState({ error: data.error, loading: false })
        }
        else {
          authenticate(data, () => {
            this.setState({ redirectToReferer: true })
          })
        }
      })
  }



  render() {
    const { email, password, error, redirectToReferer, loading, toggler } = this.state
    if (redirectToReferer) {
      return <Redirect to="/" />
    }
    return (
      <div>

        <div className="container-fluid">
          <div className="row">
          <Authsidebar />
            <div className="col bg-light">
              <br></br>
              <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                {error}
              </div>

              {loading ? <div className="jumbotron text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div> : ""}
              <div className="p-5 mt-5">
                <div className="fs-3 fw-bolder mt-5">Welcome Back!</div>
                <div className="greytext fonts15  my-1">Please enter your details below</div>
                <form class="mt-4">

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
                      <a href="/#" style={{ textDecoration: "none", color: "#888", fontSize: "12px" }} className="" onClick={this.toggle}>
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
 

                  <div className="col-5 mx-auto mt-5 mb-3">
                    <button style={{ height: "50px", borderRadius: "15px", color: "white" }} className="btn col mx-auto" onClick={this.clickSubmit}>Login</button>
                  </div>
                </form>
               
                <div className="text-center">
                  <p className="fonts15">
                    Don't have an account?&nbsp;&nbsp;
                    <Link to="/signup" style={{ color: "#5F0F40" }} className="fw-bold">Signup</Link>
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