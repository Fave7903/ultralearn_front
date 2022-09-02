import React, { Component } from 'react';
import '../assets/style.css';
import { Authsidebar } from './authsidebar2'

class VerificationCode extends Component {
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
            <div className='font-semibold text-3xl mb-2'>Verification Code</div>
            <div className='text-md ul-purple text-1xl'>
            Enter the 6 digit code sent to your email
            </div>
          </div>
          <div className=''>
            <form
              action='mt-0 sm:mt-30'
              className=''
            >
                                <div class="w-80 sm:w-auto mt-12 sm:mt-44 mb-20 sm:mb-40">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                      Enter
                    </label>
                    <div className='flex-gap-7 sm:flex gap-7 -mx- md:mx-4'><input class="shadow appearance-none border rounded h-11 w-10 sm:w-14 text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="number"placeholder="" />
                       <input class="shadow appearance-none border rounded h-11 w-10 sm:w-14  text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="number"placeholder="" />
                      <input class="shadow appearance-none border rounded h-11 w-10 sm:w-14 text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="number"placeholder="" />
                      <input class="shadow appearance-none border rounded h-11 w-10 sm:w-14 text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="number"placeholder="" />
                      <input class="shadow appearance-none border rounded h-11 w-10 sm:w-14 text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="number"placeholder="" />
                      <input class="shadow appearance-none border rounded h-11 w-10 sm:w-14 text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="number"placeholder="" /></div>

                  </div>
              <button  class="sgnbut  w-80 sm:w-3/4 text-white font-bold rounded  " onClick={this.clickSubmit}>
                     Get Code
                    </button> 
                    <p className='ml-0 sm:ml-20 '>
                Didn't receive code? <span className='ul-purple'>Resend Code</span>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default VerificationCode;
