import React, { Component } from 'react'
import { isAuthenticated } from '../auth'
import { create } from './apiPost'
import {Redirect} from 'react-router-dom'


class NewPost extends Component {
  constructor() {
    super()
    this.state = {
      body: "",
      error: "",
      user: {},
      loading: false,
      redirectToProfile: false
    }
  }

  componentDidMount() {
    this.setState({user: isAuthenticated().user})
  }

 
  handleChange = name => event => {
    this.setState({error: ""})
    this.setState({open: false})
    this.setState({ [name]: event.target.value })
  }
  clickSubmit = event => {
    event.preventDefault()
    this.setState({loading: true})
    const {body} = this.state
    const post = {
      body
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
          this.setState({loading: false, body: "", redirectToProfile: true})
        }
      })
  }
  
  
  
  render() {
    const {body, user, error, loading, redirectToProfile} = this.state

    if (redirectToProfile) {
      return <Redirect to={`/ul/${user.username}`} />
    }
    return (
      <div className='container'>
        <h2 className="mt-5 mb-5">Create Post</h2>

        <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
          {error}
        </div>


        {loading ? <div className="jumbotron text-center">
          <div className="spinner-border text-primary" role="status">
  <span className="sr-only">Loading...</span>
</div>
        </div> : ""}

        <form>

          
          <div className="form-group mb-4">
            <label className="text-muted">Share your post</label>
            <textarea
              onChange={this.handleChange("body")} 
              type="text" 
              className="form-control" 
              value={body}>
            </textarea>
          </div>

         
          
          <button onClick={this.clickSubmit} className="btn btn-raised btn-lg btn-outline-primary">Create Post</button>
        </form>
      </div>
    );
  }
}

export default NewPost