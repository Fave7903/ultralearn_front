import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import mailicon from "../assets/mailicon.png"
import { Loading } from './Loading'



class Reset extends Component {
  constructor() {
    super() 
    this.state = {
      resent: false,
      loading: false
    }
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
        this.setState({resent: true, loading: false})
        
      }
    })
  }

  render() {
    return (
      <div>
        {loading ?  <Loading /> : ""} 

<div style={{ display: reset ? "" : "none" }}>
              <div class="bg-green-100 border border-green-400 text-green-700 mx-4 px-4 py-3 rounded relative" role="alert">
                <span class="block sm:inline">Password reset link has been resent to your mail</span>
                <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg class="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                </span>
            </div>
                </div>
        <div className='flex justify-center self-center  lg:pt-20'>
          <div className="  p-4 w-full max-w-sm bg-white m-0 rounded-lg border border-purple-200 shadow-md sm:p-6 bg-gray-100 md:p-8 dark:bg-gray-800 dark:border-purple-900 ">
            <form className=" space-y-7">
            <div className="items-center justify-center ">
              <img className='mx-auto text-center h-10  w-10  bg-no-repeat bg-contain' src = {mailicon} alt=""/>
            </div>
            <p className="text-sm text-center font-Montserrat font-bold text-purple-900 dark:text-white">We sent a password reset link to<br></br>
                        your mail</p>
              <div className='flex items-center mt-6 mb-3 justify-center'>
                <a href="mailto:ultralearnng@gmail.com" type="submit" className="w-30 flex items-center text-white bg-purple-900 hover:bg-white hover:text-purple-900 focus:ring-4 focus:outline-none 
                        focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-indgo-900 dark:hover:bg-purple-900
                        dark:focus:ring-purple-900">Open Email</a>
               
              </div>
              <div className="fonts-15 mb-3 text-center pt-5 sm:pt-3">
                    Didn't receive any mail?
                    <button style={{ color: "#460273" }} className="fw-bold" onClick={this.clickSubmit}> Click to resend</button>
                  </div>
                  <div className='flex justify-center w-full m-0 p-0'>
                <Link to='/signin' class="flex text-black text-purple-900   py-2 px-4 rounded-full" type="button">
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

export default Reset