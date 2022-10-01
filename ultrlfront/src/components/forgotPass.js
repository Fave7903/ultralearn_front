import React, { Component } from 'react'
import { Redirect, Link} from 'react-router-dom'
import {resetLinkMail} from './apiUser'
import { Loading } from './Loading'



class ForgotPass extends Component {
  constructor() {
    super() 
    this.state = {
      email: "",
      error: "",
      redirect: false,
      loading: false
    }
  }

  handleChange = name => event => {
    this.setState({ error: "" })
    this.setState({ [name]: event.target.value })
  }

  clickSubmit = (e) => {
    e.preventDefault()
    this.setState({loading: true})
    const {email} = this.state
    const mail = {
      email
    }
    resetLinkMail(mail)
    .then(data => {
      if (data.error) {
        this.setState({ error: data.error, loading: false })
      }
      else {
        this.setState({ redirect: true })
        
      }
    })
  }
  render() {
    const {email, redirect,loading} = this.state
    if (redirect) return <Redirect to="/getmail" />
    return (
      <div>
        {loading? <Loading />: ""}
        <div className='flex justify-center items-center h-screen  py-auto'>
          <div className="  p-4 w-full max-w-sm bg-white m-0 rounded-lg border border-purple-200 shadow-md sm:p-6 bg-gray-100 md:p-8 dark:bg-gray-800 dark:border-purple-900 ">
            <form className=" space-y-7">
            <h2 className="text-3xl font-Montserrat font-bold text-purple-900 dark:text-white">Forgot Password</h2>
            <p className='text-sm text-purple-900 m-0'>No worries, we will send you reset instructions</p>
              <div>
                <label for="email" className="block mb-2 text-purple-900 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                <input  type="email" name="email" id="email" className="bg-gray-100 border border-purple-900 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    onChange={this.handleChange("email")}
                    value={email}    placeholder="Enter your mail here" required=""></input>
              </div>
              <div className='float-right'>
                <button onClick={this.clickSubmit} className="w-30 flex text-white bg-purple-900  
                        focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5" >Next</button>
                <br></br><br></br>
              </div>
              <div className=' flex justify-center w-full m-0 p-0'>
                <Link to='/signin' class="flex text-black text-purple-900  py-2 px-4 rounded-full" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.0" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    Back to Login</Link>

              </div>
              </form>
          </div>
          </div>
      </div>
    );
  }
}

export default ForgotPass