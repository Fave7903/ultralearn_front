import React, { Component } from 'react'
import { signup } from '../auth'
import { Link } from 'react-router-dom'
// import image3 from '../assets/image 3.png'
// import logo from '../assets/newLogo.png'
import { Authsidebar } from './authsidebar'
import { Errormsg } from './errormsg'

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
<<<<<<< Updated upstream
      <div className="h-full grid grid-cols-2 ">
        <Authsidebar />
        <div className='col-span-2 md:col-span-1 md:h-full flex flex-col' style={{ backgroundColor: "#f8f9fa" }}>
          <div className='my-auto p-6'>

            <div className="p-5 mt-5">
              <h2 className=" mb-5 fw-bolder">Register</h2>
              <Errormsg error={error} style={{ display: error ? "" : "none" }} />

              <div className="alert alert-info" style={{ display: open ? "" : "none" }}>
                New account successfully created. Please <Link to='/signin'>Sign in</Link>
              </div>
              {loading ? <div className="jumbotron text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div> : ""}
              <form>
                <div class="my-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Full Name
                  </label>
                  <input class="shadow appearance-none border rounded w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={this.handleChange("fullName")}
                    type="text"
                    value={fullName} type="text" placeholder="Your Full Name" />
=======
      <div className='body h-100'>
        <div className="contaner-fluid ">
          <div className="row ">
            <Authsidebar />
            <div className="h-100 bg-light col-xs-12 col-sm-12 col-md-6">
              
              <div className="p-5 mt-5">
                <h2 className=" mb-5 fw-bolder">Register</h2>
                {/* <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                  {error}
                </div> */}
                <div className="alert alert-info" style={{ display: open ? "" : "none" }}>
                  New account successfully created. Please <Link to='/signin'>Sign in</Link>
>>>>>>> Stashed changes
                </div>


                <div class="my-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Username
                  </label>
                  <input class="shadow appearance-none border rounded w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={this.handleChange("username")}
                    type="text"
                    value={username} type="text" placeholder="Your Username" />
                </div>


                <div class="my-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Email
                  </label>
                  <input class="shadow appearance-none border rounded w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={this.handleChange("email")}
                    type="email" id="username" value={email} type="text" placeholder="Email" />
                </div>



                <div className="my-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Password
                  </label>
                  <input
                    onChange={this.handleChange("password")}
                    type={toggler}
                    className="shadow appearance-none border rounded w-half py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    value={password}   >
                  </input>
                  <div className="m-0">
                    <button type="button" style={{ textDecoration: "none", color: "#888", fontSize: "12px" }} className="link_button" onClick={this.toggle}>
                      {toggler === "password" ? <span >Show</span> : <span>Hide</span>} Password.
                    </button>
                  </div>
                </div>


                <div className="">
                  <input className="form-check-input mr-2" type="checkbox" value="" id="flexCheckChecked"></input>
                  <label className="form-check-label fonts15" for="flexCheckChecked" >
                    Remember me
                  </label>
                </div>




                <div className="mb-2">
                  <div className="mt-1">
                    <input onClick={() => {
                      if (this.state.accept === false) {
                        this.setState({ accept: true })
                      } else {
                        this.setState({ accept: false })
                      }
                    }}className="form-check-input mr-2" type="checkbox" value="" id="defaultCheck1" />
                    <label className='fonts15'>
                      Creating an account means you accept our <Link to='/terms' style={{ color: "#5F0F40" }} className="fw-bold">Terms and Conditions</Link>
                    </label>

                  </div>
                </div>



                <div class="flex items-center mt-6 mb-3 justify-between">
                  <button class="hover:bg-blue-700 btn col  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={this.clickSubmit} type="button">
                    Sign Up
                  </button>
                </div>

                <div className="fonts15 mb-3">
                Already have an account?&nbsp;&nbsp;
                  <Link to="/signin" style={{ color: "#5F0F40" }} className="fw-bold">Login</Link>
                </div>
  
              </form>
            </div>
          </div>
        </div >
      </div >
    );
  }
}

export default Signup