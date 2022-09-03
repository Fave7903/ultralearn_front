import Nav from "./Nav3"
import React, { Component } from 'react'
import { isAuthenticated } from '../auth'
import {Redirect} from 'react-router-dom'
import bgimage from "../assets/landingpage.png"




class Landingpage extends Component {
  constructor() {
    super()
    this.state = {
      email: ""
    }
  }
  render() {
    const { redirectToProfile} = this.state

    if (redirectToProfile) {
      return <Redirect to={`/users/${isAuthenticated().user.username}`}></Redirect>
    }
    return (
      <div>
        <Nav/>
        <div className="grid grid-cols-2 p-8">
            <div className="col-span-2 md:col-span-1">
                <div className="pb-4 md:pb-9">
                    <p className="text-3xl md:text-8xl font-bold pb-4 md:pb-9">Exploring Growth</p>
                    <p className="text-3xl md:text-8xl font-bold">Conversations</p>
                </div>
                <div className="ul-purple text-1xl md:text-3xl pb-5 md:pb-10 ">
                    <p>Ultralearn is a social platform where</p>
                    <p>anybody can become better a better version of</p>
                    <p>themselves by promoting growth</p>
                    <p>conversations.</p>
                </div>
                <div>
                <label class="block ul-purple text-2xl font-bold mb-0 md:mb-2" for="Email">Join Waitlist </label>
                <input className="shadow appearance-none border h-16 md:h-28 w-2/4 py-7 md:py-17 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"type="email"id="Email"placeholder="Email"/>
                <button style={{backgroundColor:"#460273"}}className="text-2xl text-white  text-center h-16 md:h-28 px-4 py-3 md:py-17  text-1xl md:text-2xl  border border-gray-300  shadow-sm  " onClick={this.clickSubmit}>Submit</button>
                </div>
            </div>
            <div className="hidden md:block">
        <div className=" h-full pl-10 mr-10 mx-auto col-span-1 bg-no-repeat bg-contain "style={{ backgroundImage:`url(${bgimage})` }}></div>
            </div>

        </div>
      </div>
    );
  }
}

export default Landingpage