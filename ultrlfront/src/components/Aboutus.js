import React from 'react'
import Footer from '../components/Footer'
import Nav from './Nav'
import Bg from '../assets/rectangleimage.png'
import garfield from '../assets/garfield.jpg'
import Beomafav from '../assets/Beomafav.jpg'
import drey from '../assets/drey.jpg'
import amanda from '../assets/amanda.jpg'
import daniel from '../assets/daniel.jpg'



const Aboutus = () => {
    return ( 
        <div >
            <Nav />
            <div className="h-100 w-full hidden md:flex justify-center py-40 "  style={{ backgroundImage:`url(${Bg})` }}>
          <p class="absolute text-5xl visible md:visible text-purple-900 font-bold">About Us</p>
        </div>


            <div className="p-8 -mt-5 h-full"style={{backgroundColor:"white"}}>
                <div>
                <h4 className=" text-yellow-400 text-left font-bold text-3xl">Our Mission</h4>
                <p className='text-1xl p-0 text-yellow-400'>our reason for existence</p>
                </div>
                <p className=" text-right text-base text-purple-800 font-serif">To create an environment where<br></br> people can become better versions<br></br> of themselves by promoting growth<br></br> conversations.</p>
                <p className='text-purple-800 font-serif'>To change the face of learning across<br></br> Africa and the World at large.</p>
                <div>
                <h4 className='text-yellow-400 text-right font-bold text-3xl'>Our vision</h4>
                <p className='text-yellow-400 text-right'>What we aspire to be.</p>
                </div>
            </div>
            
            <div className=' py-8 px:20 sm:px-20 shadow mx-10">'style={{backgroundColor:"#460273"}}>
            <p className='text-center text-5xl font-bold text-white dark:text-white'>Meet Our Team</p>
            <div className='flex items-center mx-auto flex-col md:flex-row justify evenly'>
            <div className='p-7'>
            <div className='text-center mb-4 opacity-90'>
            <img className='mx-auto object-cover rounded-full h-40 w-40 ' src={garfield} alt='' srcset='' />
            </div>
            <div className='text-center'>
            <p class="text-2xl text-white dark:text-white">Garfield</p>
            <p class="text-xl text-white dark:text-gray-200 font-light">CEO</p>
            </div>
            </div>
            <div className='p-7'>
            <div className='text-center mb-4 opacity-90'>
            <img className='mx-auto object-cover rounded-full h-40 w-40 ' src={Beomafav} alt='' srcset='' />
            </div>
            <div className='text-center'>
            <p class="text-2xl text-white dark:text-white">Beomafav</p>
            <p class="text-xl text-white dark:text-gray-200 font-light">CEO</p>
            </div>
            </div>
            <div className='p-7'>
            <div className='text-center mb-4 opacity-90'>
            <img className='mx-auto object-cover rounded-full h-40 w-40 ' src={drey} alt='' srcset='' />
            </div>
            <div className='text-center'>
            <p class="text-2xl text-white dark:text-white">Drey</p>
            <p class="text-xl text-white dark:text-gray-200 font-light">CEO</p>
            </div>
            </div>
            <div className='p-7'>
            <div className='text-center mb-4 opacity-90'>
            <img className='mx-auto object-cover rounded-full h-40 w-40 ' src={amanda} alt='' srcset='' />
            </div>
            <div className='text-center'>
            <p class="text-2xl text-white dark:text-white">Amanda</p>
            <p class="text-xl text-white dark:text-gray-200 font-light">CEO</p>
            </div>
            </div>
            <div className='p-7'>
            <div className='text-center mb-4 opacity-90'>
            <img className='mx-auto object-cover rounded-full h-40 w-40 ' src={daniel} alt='' srcset='' />
            </div>
            <div className='text-center'>
            <p class="text-2xl text-white dark:text-white">Daniel</p>
            <p class="text-xl text-white dark:text-gray-200 font-light">CEO</p>
            </div>
            </div>
            

            </div>

           <div className='flex items-center mt-6 mb-10 justify-center'>
           <button type="button" class="py-2 px-4 bg-purple-300 text-purple-600 text-center text-base font-semibold shadow-md rounded-sm ">
           View the team</button>
           </div>


            </div>
                
    
            <Footer/>
        </div>
     );
}
 
export default Aboutus;

