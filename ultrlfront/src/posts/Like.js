import React, { Component } from 'react'
import {like, unlike} from './apiPost'
import { isAuthenticated } from '../auth'

class Like extends Component {
  constructor ()  {
    super() 
    this.state = {
      postId: "",
      like: false,
      likes: 0
    }
  }

  checkLike = (likeArr) => {
    const userId = isAuthenticated().user._id
    let match = likeArr.indexOf(userId) !== -1
    return match
  }

  componentDidMount = () => {
    this.setState({postId: this.props.postId, likes: this.props.likeCount, like: this.checkLike(this.props.likeArr)})

  }

  likeToggle = () => {
    let callApi = this.state.like ? unlike : like
    const userId = isAuthenticated().user._id
    const token = isAuthenticated().token
    const postId = this.state.postId
    callApi(userId, token, postId).then(data => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({like: !this.state.like})
        if (!this.state.like) {
          this.setState({likes: this.state.likes + 1})
        } else if (this.state.likes !== 0) {
          this.setState({likes: this.state.likes - 1})
        }
      }
    })
  }
  
  render () {
    return (
      <div>
        <p onClick={this.likeToggle}>{this.state.likes} <i style={{fontSize: "22px", cursor: "pointer", color: "#5f0f40"}} className="fa fa-thumbs-up" aria-hidden="true"></i></p>
    </div>
    )
  }
}

export default Like