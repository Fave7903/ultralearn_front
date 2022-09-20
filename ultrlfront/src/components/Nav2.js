import { Logotext } from './logotext'
import Hamburgermenu2 from "../components/Hamburgermenu2"
import { Link } from 'react-router-dom'



const Nav2 = (hasnotif = true) => {

  return (
    <>



      <nav className="bg-white px-0 py-2.5 rounded ">
        <div className="container flex flex-wrap ">
          <a href="/" className="flex items-center ">
            <Logotext small={true} />
          </a>
          < Hamburgermenu2 />
          <div className="md:block md:w-auto lg:flex hidden pr-8" id="navbar-default">
            <ul className="flex justify-between  items-center p-8 mt-3 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a href="/" className="block ul-purple text-2xl  mx-24 rounded" aria-current="page">Home</a>
              </li>
              <li>
                <a href="/about" className="block ul-purple text-2xl    mx-24  rounded h md:border-0 ">About us</a>
              </li>
              <li className='mr-10'>
                <a href="/contact" className="block ul-purple text-2xl  mx-24 pr-10  rounded h md:border-0 ">Contact Us</a>
              </li>
              <div className="fonts-15 mb-3 sgnbut text-center pr-20 pt-5 sm:pt-3">
                     <Link to="/signup" style={{ color: "white", background: "#460273", padding: "5px 10px",  }} className="fw-bold text-2xl">Signup</Link>
                  </div>
            </ul>
          </div>
        </div>
      </nav>

    </>
  )
}

export default Nav2