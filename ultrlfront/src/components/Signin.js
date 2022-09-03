import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { signin, authenticate } from '../auth'
import { Link } from 'react-router-dom'
// import image3 from '../assets/image 3.png'

import { Errormsg } from './errormsg'
import { Authsidebar } from './authsidebar'
import bgimage from "../assets/signinimage.png"
import google from "../assets/google icon.png"






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
 styles = {
    div: {
        backgroundImage: `url(${bgimage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100%'
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

        <div className="h-full grid grid-cols-2 bg-no-repeat bg-contain"style={{ backgroundImage:`url(${bgimage})` }}>
                    <Authsidebar />
          <div className='col-span-2 md:col-span-1 md:h-full flex flex-col' style={{ backgroundColor: "#f8f9fa" }}>
            <div className='my-auto mt-14 pt- p-6'>


              <Errormsg error={error} style={{ display: error ? "" : "none" }} />
              

              {loading ?  <div class="flex items-center justify-center space-x-2 animate-bounce">
    <div class="w-8 h-8 bg-purple-300 rounded-full"></div>
    <div class="w-8 h-8 bg-purple-600 rounded-full"></div>
    <div class="w-8 h-8 bg-purple-900 rounded-full"></div>
</div> : ""}
              <div className="p-5 mt-0">
                <h4 className="font-medium fw-bolder leading-tight text-2xl -mt-10 mb-2">Welcome Back!</h4>
                <div className="text-dark fonts15  my-1">Welcome Back,please enter your details</div>
                <form class="mt-7">

              <div className='grid g'>
                  <div class="my-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                      Username/Email
                    </label>
                    <input class="shadow appearance-none border rounded h-11 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={this.handleChange("email")}
                      type="email" id="username" value={email} placeholder="Email" />
                  </div>

                  <div class="my-4">
                    <div className=''>
                      <span>
                      <label class="block text-gray-700 text-sm font-bold -mb-5" for="password">
                      Password
                    </label>
                      </span>
                      <span className='float-right'>
                      <p className='forgot-password ul-purple text-sm font-bold float-right mb-2'>
                    <Link to="/forgotpassword" style={{ color: "#460273" }} className="fw-bold">Forgot Password?</Link></p>
                      </span>
                    </div>
                    <input
                      onChange={this.handleChange("password")}
                      type={toggler}
                      class="shadow appearance-none border rounded h-11 w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password"
                      value={password}
                      placeholder="6+ characters & numbers"
                      />
                    <div className="m-0 ">
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


                  <div class="flex items-center mt-6 mb-3 justify-center">
                    <button  class="sgnbut text-white font-bold py-2 px-4 rounded  " onClick={this.clickSubmit}>
                      Log In
                    </button> 
                  </div>
                  <div className="fonts-15 mt-10 mb-5  text-center pt-5 sm:pt-3">
                    Or continue with
                  </div>

                  <div className='flex justify-center mb-10 gap-10 space-x-10'>                    
                  <div className="h-10 w-10 grid grid-cols-4 bg-no-repeat bg-contain" style={{ backgroundImage:`url(${google})` }} ></div>
                  {/* <div className="h-10 w-10 grid grid-cols-4 bg-no-repeat bg-contain" style={{ backgroundImage:`url(${twitterc})` }}></div>
                  <div className="h-20 w-15 grid grid-cols-4 bg-no-repeat bg-contain" style={{ backgroundImage:`url(${facebook})` }}></div> */}

                  </div>

                  <div className="fonts15 mb-3 text-center">
                    Don't have an account?&nbsp;&nbsp;
                    <Link to="/signup" style={{ color: "#460273" }} className="fw-bold">Signup</Link>
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