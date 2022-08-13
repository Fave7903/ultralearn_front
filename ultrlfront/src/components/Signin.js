import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { signin, authenticate } from '../auth'
import { Link } from 'react-router-dom'
// import image3 from '../assets/image 3.png'
import { Authsidebar } from './authsidebar'
import { Errormsg } from './errormsg'




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

        <div className="h-full grid grid-cols-2">
          <Authsidebar />
          <div className='col-span-2 md:col-span-1 md:h-full flex flex-col' style={{ backgroundColor: "#f8f9fa" }}>
            <div className='my-auto p-6'>


              <Errormsg error={error} style={{ display: error ? "" : "none" }} />
              

              {loading ?  <div class="flex items-center justify-center space-x-2 animate-bounce">
    <div class="w-8 h-8 bg-purple-300 rounded-full"></div>
    <div class="w-8 h-8 bg-purple-600 rounded-full"></div>
    <div class="w-8 h-8 bg-purple-900 rounded-full"></div>
</div> : ""}
              <div className="p-5 mt-5">
                <h4 className="font-medium fw-bolder leading-tight text-2xl mt-0 mb-2">Welcome Back!</h4>
                <div className="greytext fonts15  my-1">Please enter your details below</div>
                <form class="mt-7">

              <div className='grid grid-cols-2'>
                  <div class="my-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                      Email
                    </label>
                    <input class="shadow appearance-none border rounded w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={this.handleChange("email")}
                      type="email" id="username" value={email} placeholder="Email" />
                  </div>

                  <div class="my-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                      Password
                    </label>
                    <input
                      onChange={this.handleChange("password")}
                      type={toggler}
                      class="shadow appearance-none border rounded w-half py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password"
                      value={password}
                      placeholder="6+ characters & numbers"
                      />
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
                  </div>


                  <div class="flex items-center mt-6 mb-3 justify-between">
                    <button  class="sgnbut text-white font-bold py-2 px-4 rounded  " onClick={this.clickSubmit}>
                      Sign In
                    </button> 
                  </div>

                  <div className="fonts15 mb-3">
                    Don't have an account?&nbsp;&nbsp;
                    <Link to="/signup" style={{ color: "#5F0F40" }} className="fw-bold">Signup</Link>
                  </div>


 
                </form>

                 
               </div>



            </div>
          </div>
        </div>

    );
  }
}

export default Signin