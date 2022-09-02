import React, {Component} from 'react'
import { Menu} from "@headlessui/react";
import avatarImage from "../assets/avatar.jpg"
import uploadphoto from "../assets/Upload Photo.png"
import uploadfile from "../assets/Upload File.png"
import { isAuthenticated } from '../auth'
import { create, list } from '../posts/apiPost'
import {Image} from 'cloudinary-react'
import Axios from 'axios'



export default class DropdownComponent extends Component {
    constructor() {
        super()
        this.state = {
          body: "",
          error: "",
          user: {},
          loading: false,
          imageSelected: "",
          postImgId: ""
        }
      }

      componentDidMount() {
        this.setState({user: isAuthenticated().user})
      }
    
      uploadImage = () => {
      const formData = new FormData()
      formData.append('file', this.state.imageSelected)
      formData.append('upload_preset', "favoursoar")
    
      Axios.post("https://api.cloudinary.com/v1_1/favoursoar/image/upload", formData).then(response => {
        this.setState({postImgId: response.data.public_id})
        console.log()
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
        if (!this.state.body && !this.state.postImgId) {
            event.preventDefault()
            this.setState({error: "Please fill in the required fields"})
         
        } else {
          event.preventDefault()
          
        // this.setState({loading: true})
        const {body, postImgId} = this.state
        const post = {
          body,
          postImgId
        }
        //console.log(user)
        const name = isAuthenticated().user.username
        const token = isAuthenticated().token
        console.log(post)
        create(name, token, post)
          .then(data => {
            if (data.error) {
              this.setState({error: data.error})
              console.log(data.error)
            }
            else {
              list().then(data => {
          if (data.error) {
            console.log(data.error)
          } else {
            this.props.updatePosts(data)
            this.setState({loading: false, body: "", postImgId: ""})
          }
        })
              
              
            }
          })
          }
        
      }
    render() {
    const {body, postImgId} = this.state
    return (
        <div>
                    <div className="flex mb-4">
             <Menu as="div" className="col-span-4 relative inline-block text-left">
            <div className="">
                <Menu.Button className="invisible sm:visible post-bgpurple text-white sm:ml-12 -ml-0 inline-flex justify-center w-full px-6 py-4 text-sm font-medium text-2xl  border border-gray-300 rounded-md shadow-sm  ">
                    Search
                </Menu.Button>
            </div>

        </Menu>
        <div className="col-span-8 invisible sm:visible">
                <input type="text" style={{ width:"61vw"}} className="invisible sm:visible w-80 sm:w-auto sm:ml-20 -ml-36 px-0 sm:px-4 py-0 sm:py-5 text-1xl bg-neutral-900 border rounded-md" placeholder="What are your interests?"></input>
            </div>
        </div>
        <div className="-mt-24 sm:mt-0 mb-3 ">
                <h1 className="text-3xl ml-4 mt-10 sm:ml-14">{`Welcome back ${isAuthenticated().user.username}!`} </h1>
            </div>
            <div className="flex ml-12">
                {isAuthenticated().user.imgId? <Image cloudName="favoursoar" publicId={isAuthenticated().user.imgId} className="invisible sm:visible rounded-full border border-gray-100 shadow-sm image-fluid mx-1 mt-0"
                    style={{ width: "100px", height: "100px" }} /> : <img style={{ width: "100px", height: "100px" }} className="invisible sm:visible rounded-full border border-gray-100 shadow-sm image-fluid mx-1 mt-0" src ={avatarImage} alt="user"></img>}

                
                <input type="text" 
                style={{ width:"62vw"}}
                className="bg-slate-400 h-16 -ml-36 sm:ml-2 px-6 py-5 text-1xl  border rounded-md" 
                placeholder="Tell us something"
                onChange={this.handleChange("body")}
                value={body}></input>
                 <button className=" w-78 post-bgpurple h-16 text-white ml- inline-flex justify-center  px-6 py-4 text-sm font-medium text-2xl  border border-gray-300 rounded-md shadow-sm  " onClick={this.clickSubmit}>Post</button>
            </div>
            <div className="ml-4 sm:ml-44 flex -mt-6 mb-6">
            <input style={{display: "none"}} ref={fileInput => this.fileInput = fileInput} type="file" onChange={(event) => {this.setState({imageSelected: event.target.files[0]})}}/>
                 <img style={{cursor: 'pointer'}} onClick={() => this.fileInput.click()} src ={uploadphoto} className = "mr-2 w-5 h-5"alt="UploadPhoto"/>
                 <img style={{cursor: 'pointer'}} onClick={this.uploadImage} src={uploadfile} className = "mr-2 w-5 h-5" alt="UploadFile"/>
                 {postImgId &&
      <Image cloudName="favoursoar" publicId={postImgId} style={{width: "300px", height: "350px"}}/>
             }
                 </div>
        </div>



       
    );
}
}