import React from 'react'
import { Logotext } from './logotext'
import signupimg from '../assets/signup.png'

export const Authsidebar = () => {
    return (
        <div className='color col-xs-12 col-sm-12 col-md-6 h3'>
            <Logotext />
            <img src={signupimg} className="img-fluid mx-auto d-block" alt="Student" />
            <div style={{ color: "#5F0F40", margin: "1.5em", fontSize: "20px" }} className="text-center "> Exploring Growth Conversations</div>

        </div>)
}
