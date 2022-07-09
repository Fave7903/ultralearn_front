import React from 'react'
import img26 from '../assets/image 26.png'
import Nav from './Nav'
import '../assets/istyle.css'
import {Link} from 'react-router-dom'

const Interest = () => {
  return (
    <div>
      <Nav />
    <div className="row">
    
        <div className="col no-gutters ">
          <div className="column1 no-gutters">
                <img src={img26} className="img-fluid pt-5 mx-auto" alt="" />
                <p>Select your interests</p>

            </div>
        </div>
        <div className="col no-gutters  col-lg-6 col-sm-12">
          <p className="text-center fw-bolder">Select a maximum of three</p>
          <div    className='column2 no-gutters pt-1 mx-auto'>
          <div className="btn row">
                    <div className="">
                      <button type="submit" className=" px-3" onclick="link">Arts & Crafts</button>
                    <button type="submit" className="bg-green px-2"onclick="link">Personal Development</button>
                    <button type="submit"  className="bg-green px-3"onclick="link">Business & Finance</button>
                  </div>
                  <div>
                    <button type="submit"className="px-3 "onclick="link">Lifestyle</button>
                    <button type="submit" className="px-3"onclick="link">Office Productivity</button>
                    <button type="submit"className="px-3" onclick="link">Health & Fitness</button>
                  </div>
                  <div>
                    <button type="submit" className="px-3"onclick="link">Food</button>
                    <button type="submit"className="px-3" onclick="link">Office IT & Software</button>
                    <button type="submit"className="px-3" onclick="link">Education</button>
                  </div>
                </div>
               
                  <div className="section">
                    <div id="card-body scrollbar-deep-purple bordered-deep-purple thin">
                      <ul>
                            <li><input type="Checkbox" Name='Product Design' value="yes" /> Arts & Crafts </li>
                            <li><input type="Checkbox" Name='Content Creation' value="yes" /> Personal Development</li>
                            <li><input type="Checkbox" Name='Graphic Design' value="yes" /> Business & Finance<br /></li>
                            <li><input type="Checkbox" Name='Backend' value="yes" /> Lifestyle<br /></li>
                            <li><input type="Checkbox" Name='React Js' value="yes" /> Office Productivity<br /></li>
                            <li><input type="Checkbox" Name='Frontend' value="yes" /> Health & Fitness <br /></li>
                            <li><input type="Checkbox" Name='Frontend' value="yes" /> Food <br /></li>
                            <li><input type="Checkbox" Name='Frontend' value="yes" /> IT & Software <br /></li>
                            <li> <input type="Checkbox" Name='Frontend' value="yes" /> Education<br /></li>

                        </ul>
                    </div> 
                
                </div> 

                
            </div>
            <Link to="/" style={{textDecoration: "none", color: "#5F04F0"}}>
              <p style={{textAlign: "center", color: "#5F04F0"}} className="fw-bolder h3">Proceed to Homepage</p>
            </Link>
        </div>
</div>

  
    </div>
  )
}

export default Interest