import React, { Component } from 'react';
import { Logotext } from './logotext';
import Bg from '../assets/undraw_secure_login_pdn4.png';
import '../assets/style.css';
import { Authsidebar } from './authsidebar2'

class VerificationEmail extends Component {
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
  render() {

    return (
      <div className='h-full grid grid-cols-2 '>
        <div className=' '>
        <Authsidebar />
        </div>
        <div className='h-screen w-full p-8 col-span-2 md:col-span-1 md:h-full flex flex-col 'style={{ backgroundColor: "#f8f9fa" }}>
          <div className=' sm:mt-8 -mt-10 mb-18'>
            <div className='font-semibold text-3xl mb-2'>Email Verification</div>
            <div className='text-md ul-purple text-1xl'>
              Kindly enter your email address
            </div>
          </div>
          <div className=''>
            <form
              action=''
              className=''
            >
                                <div class="mt-12 sm:mt-44 mb-20">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                      Email
                    </label>
                    <input class="shadow appearance-none border rounded h-11 w-full sm:w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="email" id="username"  placeholder="Email" />
                  </div>
              <button  class="sgnbut  w-full sm:w-3/4 text-white font-bold rounded  " onClick={this.clickSubmit}>
                     Get Code
                    </button> 
            </form>

          </div>
        </div>
      </div>
    );
  }
}

export default VerificationEmail;
