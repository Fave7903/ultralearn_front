import React, { Component } from 'react'
import { isAuthenticated } from '../auth'
import { create } from './apiPost'
import Axios from 'axios'
import {Image} from 'cloudinary-react'


class NewPost extends Component {
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
      window.onbeforeunload = () => {
        event.preventDefault()
        this.setState({error: "Please fill in the required fields"})
      }
    } else {
      event.preventDefault()
    window.scrollTo(0, 0)
    window.location.reload()
    this.setState({loading: true})
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
          this.setState({error: data.error, loading: false})
          console.log(data.error)
        }
        else {
          this.setState({loading: false, body: ""})
        }
      })
      }
    
  }
  
  
  
  render() {
    const {body, error, loading, postImgId} = this.state

   
    return (
      <div className='container pt-5'>
        <div className="row pt-5 mt-5">
          <div className="col-sm-2">
        <button className="btn btn-raised btn-lg mx-0" style={{backgroundColor: "#5f0f40", color: "#fff"}}>Explore</button>
            </div>
          <div className="col-sm-10">
        <input className="form-control mx-0" type="text" placeholder="What do you want to learn" style={{height: "50px", color: "grey"}} />
            </div>
          </div>
        <h2 className="mt-5 mb-5">{`Welcome back ${isAuthenticated().user.username}!`}</h2>

        <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
          {error}
        </div>


        {loading ? <div className="jumbotron text-center">
          <div className="spinner-border text-primary" role="status">
  <span className="sr-only">Loading...</span>
</div>
        </div> : ""}

        <form>

          <div className="row">
            <div className="col-sm-8 mb-4 row">
          {isAuthenticated().user.imgId ? <Image cloudName="favoursoar" publicId={isAuthenticated().user.imgId} style={{width: '120px', height: '120px', objectFit: 'cover', borderRadius: '50%'}} className="col-sm-3"/> :
          <i className="fa-solid fa-user col-sm-3" style={{color: "#5f0f40", fontSize: "100px"}}></i>
          }
              <div className="col-sm-9">
            <textarea
              style={{borderRadius: "13px", height: "60px"}}
              onChange={this.handleChange("body")} 
              type="text" 
              placeholder="Tell us something..."
              className="form-control" 
              value={body}>
            </textarea>
              
    </div>
      </div>

         <div className="col-sm-4">
          
          <button onClick={this.clickSubmit} className="btn btn-raised btn-lg" style={{backgroundColor: "#5f0f40", color: "#fff", height: "60px", width: "100px"}}>Post</button>
           </div>
            </div>
        </form>
        <div className="d-flex align-items-center justify-content-center mt-0">
      <input style={{width: "50%"}} className="form-control" type="file" onChange={(event) => {this.setState({imageSelected: event.target.files[0]})}}/>
      <button className="btn btn-raised mt-2" onClick={this.uploadImage} style={{backgroundColor: "#5f0f40", color: "white"}}>Attach photo</button>
             {postImgId &&
      <Image cloudName="favoursoar" publicId={postImgId} style={{width: "300px", height: "350px"}}/>
             }
                </div>
           
      </div>
    );
  }
}

export default NewPost