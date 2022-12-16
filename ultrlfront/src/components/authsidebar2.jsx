import React from 'react'
import { Logotext } from './logotext'
import Bg from '../assets/undraw_secure_login_pdn4.png';


export const Authsidebar = () => {
    return (
        <div className='md:flex md:flex-col col-span-2 md:col-span-1 h-fit md:h-full '>

            <Logotext />
            <div className='my-auto'>
                <div className='hidden md:block'>
            <img className='mx-auto' src={Bg} alt='' srcset='' />
            <div style={{ color: "#460273", margin: "1.5em", fontSize: "20px" }} className="text-center ">Exploring Growth Conversations</div>
            </div>
                </div>
            </div>
)
}
