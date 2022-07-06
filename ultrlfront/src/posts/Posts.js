import React, { Component } from 'react'
import {list} from './apiPost'
import {Link} from 'react-router-dom'

class Posts extends Component {
  constructor() {
    super()
    this.state = {
      posts: [],
      loading: true
    };
  }

  componentDidMount = () => {
    list().then(data => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({posts: data, loading: false})
      }
    })
  }

  renderPosts = (posts) => (
    <div className='row'>
            {posts.reverse().map((post, i) => (
            <div className="card col-md-3 mx-3" key={i}>
  <div className="card-body">
    <p className="card-text">{post.body}</p>
    <Link to={`/post/${post._id}`} className="btn btn-primary btn-raised btn-sm">Read more</Link>
  </div>
</div>
          ))}
        </div>
  );
  
  render() {
    const {posts, loading} = this.state
    
    return (
      <div className='container'>
        <h2 className="mt-5 mb-5">Recent Posts</h2>
        {loading ? <div className="jumbotron text-center">
          <div className="spinner-border text-primary" role="status">
  <span className="sr-only">Loading...</span>
</div>
        </div> : ""}
        {this.renderPosts(posts)}
      </div>
    )
  }
}

export default Posts