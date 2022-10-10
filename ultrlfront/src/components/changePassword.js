import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import iconlock from "../assets/iconlock.png"
import { Errormsg } from './errormsg'
import { Loading } from './Loading'
import { passwordReset } from './apiUser'



class ChangePassword extends Component {
  constructor() {
    super()
    this.state = {
      password1: "",
      password2: "",
      error: "",
      loading: false,
      open: false
    }
  }

  handleChange = name => event => {
    this.setState({ error: "" })
    this.setState({ [name]: event.target.value })
  }

  clickSubmit = (e) => {
    e.preventDefault()
    this.setState({loading: true})
    const {password1, password2} = this.state
    if (password1 === password2) {
      const password = password1
      const token = this.props.match.params.token
      passwordReset(password, token)
      .then(data => {
        if (data.error) {
          this.setState({ error: data.error, loading: false })
        }
        else {
          this.setState({ open: true, loading: false })
        }
      })

    }
    else  {
      this.setState({error: "Passwords do not match", loading:  false})
    }
  }

  render() {
    const {loading, error, password1, password2, open} = this.state
    return (
      <div>
        <Errormsg error={error} class="mt-2"style={{ display: error ? "" : "none" }} />

{loading ?  <Loading /> : ""} 

<div style={{ display: open ? "" : "none" }}>
              <div class="bg-green-100 border border-green-400 text-green-700 mx-4 px-4 py-3 rounded relative" role="alert">
                <span class="block sm:inline">Your password has been reset. Please <Link style={{color: "blue"}} to='/signin'>Log in</Link></span>
                <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg class="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                </span>
            </div>
                </div>
        <div className='flex justify-center items-center h-screen py-auto'>
          <div className="  p-4 w-full max-w-sm bg-white m-0 rounded-lg border border-purple-200  ">
            <form className=" space-y-7">
            <div className="items-center justify-center ">
              <img className='mx-auto text-center h-10  w-10  bg-no-repeat bg-contain' src = {iconlock} alt=""/>
            </div>
            <h2 className="text-2xl text-center font-Montserrat font-bold text-purple-900 dark:text-white">New Password</h2>
              <div>
              <label for="password" class="block mb-2 text-sm font-medium text-purple-900 dark:text-gray-300">Password</label>
                <input onChange={this.handleChange("password1")}
                    value={password1}  type="password" placeholder="********" className=" border border-purple-700 text-purple-900 placeholder-purple-700  text-sm rounded-lg focus:ring-purple-900 focus:border-blue-500 block w-full p-2.5 dark:bg-purple-900 dark:border-purple-900 dark:placeholder-gray-400" required></input>
              </div>
              <div>
                <label for="password" class="block mb-2 text-sm font-medium text-purple-900 dark:text-gray-300">Confirm Password</label>
                <input onChange={this.handleChange("password2")}
                    value={password2} type="password" placeholder="********" className=" border border-purple-700 text-purple-900 placeholder-purple-700 text-sm rounded-lg focus:ring-purple-900 focus:border-blue-500 block w-full p-2.5 dark:bg-purple-900 dark:border-purple-900 dark:placeholder-gray-400" required></input>
                </div>
              <div className='flex items-center mt-6 mb-3 justify-center'>
               
                <button onClick={this.clickSubmit} className="w-30 text-white bg-purple-900  
                        focus:ring-blue-300 ">Reset Password
                </button>
                

               
              </div>
              
              </form>
          </div>
          </div>
      </div>
    );
  }
}

export default ChangePassword