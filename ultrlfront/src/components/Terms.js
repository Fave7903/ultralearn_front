import React from 'react'
import {Link} from 'react-router-dom'

const Terms = () => {
  return (
    <div >
      <div className=" terms ">
        <div className="content w-screen "style={{backgroundColor:" #EFE9E9"}}>
            <h1 className="text1 text-2xl w">Terms and Conditions</h1>
        </div>
        <div>
            <ul className='list-style-type px-8 text-2xl '>
                <li >You must be 13 years or older to use this site. </li >
                <li >You may not post nude, partially nude, or sexually suggestive photos.</li >
                <li > You are responsible for any activity that occurs under your screen name. </li>
                <li>You are responsible for keeping your password secure. </li>
                <li>You must not abuse, harass, threaten, impersonate or intimidate other Ultralearn users.</li>
                <li>You may not use the ultralearn service for any illegal or unauthorized purpose. International users agree to comply with all local laws regarding online conduct and acceptable content.</li>
                <li>You are solely responsible for your conduct and any data, text, information, screen names, graphics, photos, profiles, audio and video clips, and any links  that you submit, post, and display on the ultralearn service.</li>
                <li>You must not modify, adapt or hack the site or modify another website so as to falsely imply that it is associated with UltraLEARN</li>
                <li>You must not access ULTRALEARN's private API by any other means.</li>
                <li>You must not create or submit unwanted email or comments to any Ultralearn members.</li>
                <li>You must not use web URLs in your name without prior written consent from Ultralearn inc.</li>
                <li>You must not transmit any worms or viruses or any code of a destructive nature.</li>
                <li>You must not, in the use of Ultralearn, violate any laws in your jurisdiction (including but not limited to copyright laws).</li>
                <li>Violation of any of these agreements will result in the termination of your Ultralearn account. While Ultralearn prohibits such conduct and content on its site, you understand and agree that Ultralearn cannot be responsible for the Content posted on its web site and you nonetheless may be exposed to such materials and that you use the ultralearn service at your own risk.</li>
                <li>Ultralearn is an educational learning platform, so all posts made must be educative and not in anyway harmful to other users.</li>
                <li>You must respect and protect the interest of other users on the learning space. </li>
                <li>All community members must be treated with respect. No threat or abusive words will be entertained on the site.</li>
                
            </ul>
        </div>
        
      </div>
      <div className='flex items-center gap-12 mt-6 mb-3 justify-center'> 
      <span>
      <button className='my-2 mx-auto'> <Link className='text-white sgnbut py-3' to='/signup'>Agree</Link></button>
      </span>
      <span>
      <button className='my-2 mx-auto'style={{backgroundColor:"white"}}> <Link className='ul-purple border-purple px-8 py-2.5' to='/signup'>Cancel</Link></button>        
      </span>
     </div>
     
    </div>
  )
}

export default Terms