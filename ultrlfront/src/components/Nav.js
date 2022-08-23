// import { Redirect, Link } from 'react-router-dom'
// import ultra from '../assets/ultra.png'
// import { signout } from '../auth'
// import { isAuthenticated } from '../auth'
// import { Image } from 'cloudinary-react'
import { Logotext } from './logotext'
import messages from "../assets/messages.svg"
import notificationImage from "../assets/notification.png"
import notification2Image from "../assets/notification2.png"
import avatarImage from "../assets/avatar.jpg"
import Hamburgermenu from "../components/Hamburgermenu"
import { Menu, Transition } from "@headlessui/react";


const Nav = (hasnotif = true) => {

  return (
    <>



      <nav className="bg-white px-4 py-2.5 rounded ">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <a href="/" className="flex items-center">
            <Logotext small={true} />
          </a>
          < Hamburgermenu />
          <div className="md:block md:w-auto lg:flex hidden" id="navbar-default">
            <ul className="flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a href="/" className="block ul-purple  py-2 pr-4 pl-3 rounded" aria-current="page">Home</a>
              </li>
              <li>
                <a href="/" className="block ul-purple  py-2 pr-4 pl-3  rounded h md:border-0 ">About us</a>
              </li>
              <li>
                <a href="/" className="block ul-purple  py-2 pr-4 pl-3  rounded h md:border-0 ">Contact Us</a>
              </li>
              <li>
                <a href="/" className="block ul-purple  py-2 pr-4 pl-3  rounded h md:border-0 ">Skills</a>
              </li>
            </ul>
          </div>



          <div className='flex flex-row lg:flex hidden'>
            <img style={{ width: "35px", height: "35px" }} src={messages} className="image-fluid mx-1 mt-0" alt="Message Icon" />
            <img style={{ width: "35px", height: "35px" }} src={(hasnotif) ? notification2Image : notificationImage} className="image-fluid mx-1 mt-0" alt="Message Icon" />
            <div className='flex flex-row'>
              <img style={{ width: "35px", height: "35px" }} className="rounded-full border border-gray-100 shadow-sm image-fluid mx-1 mt-0" src={avatarImage} alt="user " />
              <span>Beomafav</span>
              
            </div>
          </div>
        </div>
      </nav>

 




























    </>
  )
}

export default Nav