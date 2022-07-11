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
  
  
  
  render() {
    const {body, error, loading, postImgId} = this.state

   
    return (
      <div className='container pt-5 mt-5'>
        <h1 className="fw-bolder mt-5 mb-5">{`Welcome back ${isAuthenticated().user.username}!`}</h1>

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
          <div className="form-group mb-4 col-8">
            <textarea
              style={{borderRadius: "13px"}}
              onChange={this.handleChange("body")} 
              type="text" 
              placeholder="Tell us something..."
              className="form-control" 
              value={body}>
            </textarea>
          </div>

         
          <div className="col-4">
          <button onClick={this.clickSubmit} className="btn btn-raised btn-lg btn-outline-primary">Post</button>
            </div>
            </div>
        </form>
           <div>
      <input style={{width: "50%"}} className="form-control mx-3" type="file" onChange={(event) => {this.setState({imageSelected: event.target.files[0]})}}/>
      <button className="btn btn-raised btn-success mt-1 mx-3" onClick={this.uploadImage}>Upload Image</button>
             {postImgId &&
      <Image cloudName="favoursoar" publicId={postImgId} style={{width: "300px", height: "350px"}}/>
             }
    </div>
      </div>
    );
  }
}

export default NewPost