import React, { Component } from 'react';
import { Logotext } from './logotext';
import Bg from '../assets/undraw_authentication_re_svpt.png';
import Check from '../assets/check-symbol-4795.png';
import '../assets/style.css';

class VerificationPass extends Component {
  render() {
    return (
      <div className='flex flex-col md:flex-row justify-between mt-0 '>
        <div className=' color col-xs-12 col-sm-12 col-md-6 h3 '>
          <Logotext />
          <div className=' items-center'>
            <img
              className='text-center w-[429px] h-[504px] '
              src={Bg}
              alt=''
              srcset=''
            />
            <div className='flex justify-center items-center'>
              <span className='text-[#460273] w-[577px] h-[41px] text-center text-3xl'>
                Exploring Growth Conversations
              </span>
            </div>
          </div>
        </div>
        <div className='bg-[#F4F4F4] h-screen w-full flex flex-col items-center justify-center '>
          <div className='flex mb-8 items-center justify-center'>
            <img className='w-[110px] h-[110px]' src={Check} alt='' />
          </div>

          <div className='flex flex-col '>
            <h2 className='text-5xl text-[#333333]'>Congratulations!</h2>
            <p className='text-center p-2'>
              Your account has been successfully verified
            </p>
          </div>
          <button
            className=' w-[304px] bg-[#460273] rounded mt-10 h-[30px] text-[#ffffff]'
            type='submit'
          >
            Done
          </button>
        </div>
      </div>
    );
  }
}

export default VerificationPass;
