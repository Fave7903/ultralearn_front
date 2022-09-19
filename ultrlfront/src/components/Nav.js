import { isAuthenticated } from '../auth'
import { Image } from 'cloudinary-react'
import { Logotext } from './logotext'
import avatarImage from "../assets/avatar.jpg"
import Hamburgermenu from "../components/Hamburgermenu"
import Dropdown from "../components/Dropdown"



const Nav = (hasnotif = true) => {

  return (
    <>



      <nav className="px-4 py-2.5 rounded post-back ">
        <div className="container flex flex-wrap justify-between items-center mx-auto post-back">
          <a href="/" className="flex items-center">
            <Logotext small={true} />
          </a>
          < Hamburgermenu />
          <div className="md:block md:w-auto lg:flex hidden post-back" id="navbar-default">
            <ul className="post-back flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a href="/" className="post-back block ul-purple  py-2 pr-4 pl-3 rounded" aria-current="page">Home</a>
              </li>
              <li>
              <a href="/Aboutus" className="post-back block ul-purple  py-2 pr-4 pl-3 rounded" aria-current="page">About us</a>
              </li>
              <li>
                <a href="/contact" className="block ul-purple  py-2 pr-4 pl-3  rounded h md:border-0 ">Contact Us</a>
              </li>
              <li>
                <a href="/findpeople" className="block ul-purple  py-2 pr-4 pl-3  rounded h md:border-0 ">Friends</a>
              </li>
            </ul>
          </div>



          <div className='flex flex-row lg:flex hidden'>
            {/* <img style={{ width: "35px", height: "35px" }} src={messages} className="image-fluid mx-1 mt-0" alt="Message Icon" />
            <img style={{ width: "35px", height: "35px" }} src={(hasnotif) ? notification2Image : notificationImage} className="image-fluid mx-1 mt-0" alt="Message Icon" /> */}
            <div className='flex flex-row'>
             
              {isAuthenticated().user.imgId? <Image cloudName="favoursoar" publicId={isAuthenticated().user.imgId} className="rounded-full border border-gray-100 shadow-sm image-fluid mx-1 mt-0"
                    style={{ width: "35px", height: "35px" }} /> : <img style={{ width: "35px", height: "35px" }} className="rounded-full border border-gray-100 shadow-sm image-fluid mx-1 mt-0" src={avatarImage} alt="user " /> }
                   
              <span>{isAuthenticated().user.username}</span>
       <span><Dropdown/></span>

              
            </div>
          </div>
        </div>
      </nav>

 




























    </>
  )
}

export default Nav