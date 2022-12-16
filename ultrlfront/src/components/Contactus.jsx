import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
// import image3 from '../assets/image 3.png'
import Nav from "../components/Nav"
import bgimage from "../assets/contactbgimage.png"





class Contact extends Component {
  constructor() {
    super()
    this.state = {
      email: "",
      fullName: "",
      message:"",
      redirectToReferer: false,
      loading: false,

    }
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }
  render() {
    const { email, fullName,message, redirectToReferer, loading} = this.state
    if (redirectToReferer) {
      return <Redirect to="/" />
    }
    return (
        <div>
            <Nav/>
                    <div className="h-full grid grid-cols-2 ">
                        <div className='col-span-1 hidden md:block flex flex-col bg-no-repeat bg-cover bg-enter
                         w-50'style={{ backgroundImage:`url(${bgimage})` }}>
                        </div>

<div className='col-span-2 md:col-span-1 md:h-full flex flex-col' >
  <div className='mt-5 mb-5 pt-'>

    {loading ?  <div class="flex items-center justify-center space-x-2 animate-bounce">
<div class="w-8 h-8 bg-purple-300 rounded-full"></div>
<div class="w-8 h-8 bg-purple-600 rounded-full"></div>
<div class="w-8 h-8 bg-purple-900 rounded-full"></div>
</div> : ""}
    <div className="p-8 -mt-5 "style={{backgroundColor:"#D9D9D9"}}>
      <h4 style={{color:"#460273"}}className="text-center font-bold text-2xl">Contact Us</h4>
      <form class="mt-7"action='mailto:ultralearnng@gmail.com'>

    <div className='grid g'>
    <div className="my-6">
                    <input className="shadow appearance-none border rounded w-full py-5 px-3  ul-purple2 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={this.handleChange("fullName")}
                      type="text" id="fullName" value={fullName} placeholder="Name" />
                  </div>

        <div class="my-6">

          <input class="shadow appearance-none border rounded w-full py-5 px-3  ul-purple2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={this.handleChange("email")}
            type="email" id="username" value={email} placeholder="Email" />
        </div>
        <div className='my-6'>
        <textarea onChange={this.handleChange("message")}  type="text" className=" mb-3 h-40 rounded w-full py-30 px-3" value={message} placeholder="Your Message">  </textarea>
        </div>
        </div>


        <div class="flex items-center mt-6 mb-12 justify-center">
          <button  class="sgnbut text-white font-bold py-2 px-4 rounded  " onClick={this.clickSubmit}>Submit
          </button> 
        </div>
        <br/>
        <br/>
        <br/>
     </form>

       
     </div>



  </div>
</div>
</div>
        </div>


    );
  }
}

export default Contact