import React, { Component } from 'react';
import { Logotext } from './logotext';
import Bg from '../assets/undraw_authentication_re_svpt.png';
import Check from '../assets/check-symbol-4795.png';
import '../assets/style.css';

class VerificationPass extends Component {
  render() {
    return (
      <div className=' h-full grid grid-cols-2 '>
        <div className=' '>
          <Logotext />
          <div className=' items-center hidden md:block'>
            <img
              className='mx-auto '
              src={Bg}
              alt=''
              srcset=''
            />
            <div className='flex justify-center items-center'>
              <span style={{ color: "#460273", margin: "1.5em", fontSize: "20px" }} className="text-center " >
                Exploring Growth Conversations
              </span>
            </div>
          </div>
        </div>
        <div className=' h-screen w-full p-8 mx-auto col-span-2 md:col-span-1 md:h-full flex flex-col 'style={{ backgroundColor: "#f8f9fa" }}>
          <div className='my-12 sm:my-24 items-center justify-center'>
            <img className='mx-auto text-center mb-30' src={Check} alt='' />
          </div>

          <div className=''>
            <h2 className='text-2xl sm:text-5xl text-center mx-auto'>Congratulations!</h2>
            <p className='text-center p-2 mb-10 sm:mb-20'>
              Your account has been successfully verified
            </p>
          </div>
          <button  class="sgnbut text-center mx-auto w-full sm:w-3/4 text-white font-bold rounded  " onClick={this.clickSubmit}>
                    Done
                    </button> 
        </div>
      </div>
    );
  }
}

export default VerificationPass;
