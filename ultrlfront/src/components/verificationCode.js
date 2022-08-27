import React, { Component } from 'react';
import { Logotext } from './logotext';
import Bg from '../assets/undraw_secure_login_pdn4.png';
import '../assets/style.css';

const styles = {
  input: 'form-control border-1 outline bg-[#000000] signup-input p-1 rounded-lg w-10 h-10',
};

class VerificationCode extends Component {
  render() {
    return (
      <div className='flex flex-col md:flex-row justify-between mt-0 '>
        <div className='  color col-xs-12 col-sm-12 col-md-6 h3 '>
          <Logotext />
          <div className=''>
            <img className='w-[600px] h-[400px] ' src={Bg} alt='' srcset='' />
            <div className='flex text-4xl justify-center items-center'>
              <span className='text-[#460273] w-[577px] h-[41px] text-center text-3xl'>
                Exploring Growth Conversations
              </span>
            </div>
          </div>
        </div>
        <div className='bg-[#F4F4F4] h-screen w-full '>
          <div className=' w-[309px] h-[80px] mt-[96px] ml-[69px] flex flex-col'>
            <span className='font-semibold text-3xl'>Email Verification</span>
            <span className='text-md text-[#460273]'>
              Kindly enter your email address
            </span>
          </div>
          <div className='flex justify-center items-center'>
            <form
              action=''
              className='flex flex-col w-[464px] h-[103px] mt-[196px] justify-between items-center '
            >
              <div className='flex flex-col'>
                <label className='fw-bold signup-ititle' htmlFor='email'>
                  Code
                </label>
                <div className='flex space-x-2'>
                  <input className={styles.input} type='text' />
                  <input className={styles.input} type='text' />
                  <input className={styles.input} type='text' />
                  <input className={styles.input} type='text' />
                  <input className={styles.input} type='text' />
                  <input className={styles.input} type='text' />
                </div>
              </div>

              <button
                className=' w-[464px] bg-[#460273] rounded mt-10 h-[100px] text-[#ffffff]'
                type='submit'
              >
                Enter
              </button>
              <p>
                Didn't receive code? <span>Resend Code</span>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default VerificationCode;
