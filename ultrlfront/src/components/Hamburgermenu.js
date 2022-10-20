import { useState } from "react"; 
import {Link} from 'react-router-dom'
import { isAuthenticated } from '../auth'
import { Redirect} from 'react-router-dom'
import { signout } from '../auth'



export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false); // initiate isNavOpen state with false

  return (
    <div className="flex items-center justify-between border-b border-gray-400 py-8">
      <a href="/">
      </a>
      <nav>
        <section className="MOBILE-MENU flex lg:hidden">
          <div
            className="HAMBURGER-ICON space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}> 
            <div
              className="CROSS-ICON absolute top-0 left-0 px-8 py-8"
              onClick={() => setIsNavOpen(false)} 
            >
              <svg
                className="h-8 w-8 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              <ul className="flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a href="/" className="block  ul-purple2  py-2 pr-4 pl-3 rounded" aria-current="page">Home</a>
              </li>
              <li>
              <Link to={`/users/${isAuthenticated().user.username}`}className=' ul-purple2 py-2 pr-4 pl-3 block rounded h md:border-0 '
                >Profile
                </Link>
              </li> 
              <li>
                <a href="/findpeople" className="block  ul-purple2  py-2 pr-4 pl-3  rounded h md:border-0 ">Friends</a>
              </li>                         
              <li>
                <a href="/about" className="block  ul-purple2  py-2 pr-4 pl-3  rounded h md:border-0 ">About Us</a>
              </li>
              <li>
                <a href="/contact" className="block  ul-purple2  py-2 pr-4 pl-3  rounded h md:border-0 ">Contact Us</a>
              </li>
              <li>
              <Link to='/signin' className='ul-purple2 block w-full  py-2 pr-4 pl-3 rounded h md:border-0  'onClick={() => signout(() => <Redirect to={"/signin"} />)}>
                    Log Out  </Link></li>  
              </ul>
        
            </div>
          </div>
        </section>
        </nav>
        <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
        </div>
  )
}