import React, { Component } from 'react'
import { isAuthenticated } from '../auth'
import { read, update } from './apiUser'
import {Link, Redirect} from 'react-router-dom'
import Axios from 'axios'
import avatarImage from "../assets/avatar.jpg"
import Arrow from "../assets/Arrow 2.png"
import {signout} from '../auth'
import uploadphoto from "../assets/Upload Photo.png"
import uploadfile from "../assets/Upload File.png"
import {Image} from 'cloudinary-react'

class EditProfile extends Component {
  constructor() {
    super()
    this.state = {
      fullName: "",
      users: [],
      username: "",
      email: "",
      password: "",
      error: "",
      dateOfBirth: "",
      location: "",
      gender: "",
      bio: "",
      skillInterests: "",
      redirectToProfile: false,
      imageSelected: "",
      imgId: ""
    }
  }

  init = (name) => {
    const token = isAuthenticated().token
    read(name, token)
    .then(data => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({ 
          id: data._id, 
          fullName: data.fullName, 
          username: data.username,
          email: data.email,
          dateOfBirth: data.dateOfBirth,
          location: data.location,
          gender: data.gender,
          bio: data.bio,
          skillInterests: data.skillInterests,
          imgId: data.imgId
        })
      }
    })
  }

  componentDidMount() {
    const name = this.props.match.params.name
    this.init(name)
  }

  uploadImage = () => {
  const formData = new FormData()
  formData.append('file', this.state.imageSelected)
  formData.append('upload_preset', "favoursoar")

  Axios.post("https://api.cloudinary.com/v1_1/favoursoar/image/upload", formData).then(response => {
    this.setState({imgId: response.data.public_id})
  }).catch(err => {
    console.log(err)
  })
}

 
  handleChange = name => event => {
    this.setState({error: ""})
    this.setState({open: false})
    this.setState({ [name]: event.target.value })
  }
  clickSubmit = event => {
    event.preventDefault()
    window.scrollTo(0, 0)
    this.setState({loading: true})
    const {fullName, username, email, password, dateOfBirth, bio, skillInterests, gender, location, imgId} = this.state
    const user = {
      fullName,
      username,
      email,
      password: password || undefined,
      dateOfBirth,
      bio,
      skillInterests,
      gender,
      location,
      imgId
    }
    //console.log(user)
    const name = this.props.match.params.name
    const token = isAuthenticated().token

    update(name, token, user)
      .then(data => {
        if (data.error) {
          this.setState({error: data.error, loading: false})
          console.log(data.error)
        }
        else {
          
          this.setState({
          error: "",
          fullName: "",
          username: "",
          email: "",
          users: [],
          password: "",
          dateOfBirth: "",
          location: "",
          gender: "",
          bio: "",
          skillInterests: "",
          loading: false,
          redirectToProfile: true
        })
        }
      })
  }
  
  
  
  render() {
    const {fullName, username, email, error, bio, gender, skillInterests, redirectToProfile,  location, imgId} = this.state

    if (redirectToProfile) {
      return <Redirect to={`/users/${isAuthenticated().user.username}`}></Redirect>
    }
    return (
      <div>
        <div  className='px-16'>
       
          <div className='mt-10 sm:mt-20 grid grid-cols-8 sm:grid grid-cols-6 -mb-12 sm:mb-0 ' >
          <Link to={`/users/${isAuthenticated().user.username}`} className=" text-dark text-1xl sm:text-2xl" ><img style={{ width: "30px", height: "20px" }} src={Arrow}className="relative mt-2"alt ="Arrow"/></Link>

            <div className='col-span-4 sm:col-span-2 '>
              <div className='flex flex-col'>
              <span>{imgId ? <Image cloudName="favoursoar" publicId={imgId} className="sm:visible invisble mx-auto rounded-full border border-gray-100 shadow-sm image-fluid mx-1" style={{width: "100px", height: "100px"}}/> :<img style={{ width: "100px", height: "100px" }} className="sm:visible invisble mx-auto rounded-full border border-gray-100 shadow-sm image-fluid mx-1 " src={avatarImage} alt="user " />}</span>
              <span class='mt-25 mx-auto flex'>
              
            <input style={{display: "none"}} ref={fileInput => this.fileInput = fileInput} type="file" onChange={(event) => {this.setState({imageSelected: event.target.files[0]})}}/>
                 <img style={{cursor: 'pointer'}} onClick={() => this.fileInput.click()} src ={uploadphoto} className = "mr-2 w-5 h-5"alt="UploadPhoto"/>
                 <img style={{cursor: 'pointer'}} onClick={this.uploadImage} src={uploadfile} className = "mr-2 w-5 h-5" alt="UploadFile"/>
                
               </span>
              </div>
             
            </div>
          <div className=' col-span-4 sm:col-span-3 mb-4 sm:mb-0'>
          <h1 className="text-2xl -mt-0 sm:-mt-0  sm:ml-0 font-bold  ul-purple2 ">Profile</h1>
          <p className=' ul-purple2 text-sm mb-5 sm:mb-0'>Update your photo and personal details</p>
          </div>
          <div className='float-right block sm:col-span-2 mt-25 sm:mt-0 '>
          <button style={{backgroundColor:"#460273",color:"#fff"}}className="   mr-1 sm:mr-5 mb-5 lg:mb-0 px-10 py-2 text-center justify-center text-1xl   " onClick={this.clickSubmit}>Save</button>
          <button className="  m  ul-purple2  border-purple justify-center  px-8 py-2  text-1xl    " onClick={this.cancel}>Cancel</button>
          </div>
          </div>



        <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
          {error}
        </div>


  

        <form className='mt-8'>
          <div className=''>
            
          <div className='block block md:grid grid-cols-6 gap-0'>
          <div className='mt-2 sm:mt-12 -mb-28 sm:mb-0'>
            <ul className=''>
              <li className=' ul-purple2 font-bold text-2xl lg:font-1xl mb-14 sm:mt-0 w-full py-6'>Edit Profile</li>
              <li><a href='/terms'className=' ul-purple2  sm:visible invisible'>Terms of Services</a></li>
              <li><Link to='/signin'className='text-red-500  sm:visible invisible' onClick={() => signout(() => <Redirect to={"/signin"} />)}>Log Out</Link></li>
            </ul>
          </div>
          <div className=' -mt-30 md:mt-0 col-span-6 md:col-span-5'>
            <div className=' block md:grid grid-cols-2 mb-5 '>
            <div className="mr-2 md:-mr-70">
                    <label className="block text-sm font-bold mb-2  ul-purple2" for="Firstname">
                      Full Name
                    </label>
                    <input className=" border-purple mb-2 shadow appearance-none h-11 border rounded w-full w-3/4 md:w-2/4 py-2 px-3  ul-purple2 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={this.handleChange("fullName")}
                      type="text" id="fullName" value={fullName} placeholder="First Name" />
                  </div>
                  <div className="-ml-0 md:-ml-24">
                    <label class="block  text-sm font-bold mb-2  ul-purple2" for="lastname">
                      Username
                    </label>
                    <input className="border-purple  ul-purple2 shadow appearance-none border h-11 rounded w-full md:w-2/4 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={this.handleChange("username")}
                      type="text" id="username" value={username} placeholder="Last Name" />
                  </div>
            </div>

            <div className='grid  grid-cols-3 gap-0'>
            <div className="col-span-2 mb-5 -mr-0 md:-mr-40">
                    <label className="block  text-sm font-bold mb-2  ul-purple2" for="Email">
                      Email
                    </label>
                    <input className="border-purple  shadow appearance-none   ul-purple2 h-11 border rounded mb-5 w-3/4 lg:w-3/4 md:w-2/4 py-2 px-3  ul-purple2 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={this.handleChange("email")}
                      type="text" id="fullName" value={email} placeholder="Email" />


          <div>
<label for="countries" className="block text-sm font-bold mb-2  ul-purple2">Gender</label>
<select  value={gender} onChange={this.handleChange("gender")}  id="countries" className="border-purple shadow appearance-none h-11 mb-5 border rounded w-3/4 lg:w-3/4 md:w-2/4 py-2 px-3  ul-purple2 leading-tight focus:outline-none focus:shadow-outline">
  <option selected="" disabled>Select Gender</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
</select>

</div>



          <div className=" mt-4 sm:mt-0">


          <label for="countries" className="block text-sm font-bold mb-2  ul-purple2">Location</label>
<select  value={location} onChange={this.handleChange("location")}  id="countries" className="border-purple  ul-purple2 shadow appearance-none h-11 border rounded w-3/4 lg:w-3/4 md:w-2/4 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline">
  <option selected="" disabled>Where do you stay</option>
  <option value="Abia">Abia</option>
    <option value="Adamawa">Adamawa</option>
    <option value="Akwa Ibom">Akwa Ibom</option>
    <option value="Anambra">Anambra</option>
    <option value="Bauchi">Bauchi</option>
    <option value="Bayelsa">Bayelsa</option>
    <option value="Benue">Benue</option>
    <option value="Borno">Borno</option>
    <option value="Cross River">Cross River</option>
    <option value="Delta">Delta</option>
    <option value="Ebonyi">Ebonyi</option>
    <option value="Edo">Edo</option>
    <option value="Ekiti">Ekiti</option>
    <option value="Enugu">Enugu</option>
    <option value="FCT">Federal Capital Territory</option>
    <option value="Gombe">Gombe</option>
    <option value="Imo">Imo</option>
    <option value="Jigawa">Jigawa</option>
    <option value="Kaduna">Kaduna</option>
    <option value="Kano">Kano</option>
    <option value="Katsina">Katsina</option>
    <option value="Kebbi">Kebbi</option>
    <option value="Kogi">Kogi</option>
    <option value="Kwara">Kwara</option>
    <option value="Lagos">Lagos</option>
    <option value="Nasarawa">Nasarawa</option>
    <option value="Niger">Niger</option>
    <option value="Ogun">Ogun</option>
    <option value="Ondo">Ondo</option>
    <option value="Osun">Osun</option>
    <option value="Oyo">Oyo</option>
    <option value="Plateau">Plateau</option>
    <option value="Rivers">Rivers</option>
    <option value="Sokoto">Sokoto</option>
    <option value="Taraba">Taraba</option>
    <option value="Yobe">Yobe</option>
    <option value="Zamfara">Zamfara</option>
</select>

          </div>
                  </div>



                  <div className="col-span-1 -ml-26">
                    <label className="block text-sm font-bold mb-2  ul-purple2">Your Bio</label>
                     <textarea onChange={this.handleChange("bio")}  type="text" className=" ul-purple2 border-purple  mb-3 h-36 rounded w-full sm:w-3/4 py-2 px-3" value={bio} placeholder="Give a short description about yourself">  </textarea>
                     <div className="form-group mt-4 sm:mt-0">
                       <label className="block text-sm font-bold mb-0 sm:mb-1  ul-purple2">Skill Interest</label>
            <input 
              onChange={this.handleChange("skillInterests")} 
              type="text" 
              className="border-purple  ul-purple2  shadow appearance-none h-11 border rounded w-full sm:w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              value={skillInterests}>
            </input>
          </div>
                     </div>
            </div>

          </div>
                </div>
          </div>
          
        </form>
          </div>
      </div>
    );
  }
}

export default EditProfile