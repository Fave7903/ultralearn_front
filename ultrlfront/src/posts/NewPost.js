import React, { Component } from 'react'
import { isAuthenticated } from '../auth'
import { create } from './apiPost'


class NewPost extends Component {
  constructor() {
    super()
    this.state = {
      body: "",
      error: "",
      user: {},
      loading: false
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
    window.scrollTo(0, 0)
    window.location.reload()
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
          this.setState({loading: false, body: ""})
        }
      })
  }
  
  
  
  render() {
    const {body, error, loading} = this.state

   
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
      </div>
    );
  }
}

export default NewPost