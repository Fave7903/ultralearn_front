import React, { Component } from 'react'
import { signup } from '../auth'
import { Link } from 'react-router-dom'
// import image3 from '../assets/image 3.png'
// import logo from '../assets/newLogo.png'
 import '../assets/style.css'
import { Authsidebar } from './authsidebar'
// import { Errormsg } from './errormsg'

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
    const { fullName, username, error, email, password, open, loading, toggler } = this.state
    return (
      <div className="h-full grid grid-cols-2">
          <Authsidebar />
          <div className='col-span-2 md:col-span-1 md:h-full flex flex-col' style={{ backgroundColor: "#f8f9fa" }}>
            <div className='my-auto p-6'>

            <h2 className='font-medium fw-bolder leading-tight text-4xl mt-0 mb-2'>Register</h2>
                { <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                  {error}
                </div> }
              
      

              {loading ? <div className="text-center">
                <div className="text-green" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div> : ""}

              <div className="alert alert-info" style={{ display: open ? "" : "none" }}>
                  New account successfully created. Please <Link to='/signin'>Sign in</Link>
                </div>
              <div className="p-5 mt-5">
              
                <form className="mt-7">

                <div className='grid grid-cols-2'>
                  <div className="my-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                      Full Name
                    </label>
                    <input className="shadow appearance-none border rounded w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={this.handleChange("fullName")}
                      type="text" id="fullName" value={fullName} placeholder="Full Name" />
                  </div>


                  <div className="my-4 ">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                      Username
                    </label>
                    <input className="shadow appearance-none border rounded w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={this.handleChange("username")}
                      type="text" id="username" value={username} placeholder="Your username" />
                  </div>
                </div>

                  <div className="my-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                      Email
                    </label>
                    <input className="shadow appearance-none border rounded w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={this.handleChange("email")}
                      type="email" id="username" value={email} placeholder="Email" />
                  </div>

                  <div className="my-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                      Password
                    </label>
                    <input
                      onChange={this.handleChange("password")}
                      type={toggler}
                      className="shadow appearance-none border rounded w-half py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password"
                      value={password}
                      />
                    <div className="m-0">
                      <button type="button" style={{ textDecoration: "none", color: "#888", fontSize: "12px" }} className="link_button" onClick={this.toggle}>
                        {toggler === "password" ? <span >Show</span> : <span>Hide</span>} Password.
                      </button>
                    
                    </div>

                  <div className="">
                       <input className="form-check-input mr-2" type="checkbox" value="" id="flexCheckChecked"></input>
                      <label className="form-check-label fonts15" for="flexCheckChecked" >
                        Remember me
                      </label>
                   </div>
                   <div className="form-group mb-2">
                <div className="">
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
                </div>
                  </div>


                  <div className="flex items-center mt-6 mb-3 justify-between">
                    <button  className="btn  text-white font-bold py-2 px-4 rounded  " onClick={this.clickSubmit} type="button">
                      Sign Up
                    </button> 
                  </div>

                  <div className="fonts15 mb-3">
                    Already have an account?&nbsp;&nbsp;
                    <Link to="/signin" style={{ color: "#5F0F40" }} className="fw-bold">Signin</Link>
                  </div>


 
                </form>

                 
               </div>



            </div>
          </div>
        </div>
    );
  }
}

export default Signup