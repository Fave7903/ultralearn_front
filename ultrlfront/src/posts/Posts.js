import React, { Component } from 'react'
import {list} from './apiPost'
import {Link} from 'react-router-dom'
import avatar from '../assets/avatar.png'

class Posts extends Component {
  constructor() {
    super()
    this.state = {
      posts: [],
      loading: true,
      more: true
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

  renderPosts = (posts) => {
    return (
            <div>
            {posts.reverse().map((post, i) => {
          const posterFull = post.postedBy ? post.postedBy.fullName : " Unknown"
          const posterUser = post.postedBy ? post.postedBy.username : " Unknown"
        return (
            <div className="card mb-2" style={{boxShadow: "2px 5px silver"}} key={i}>
  <div className="card-body">
   <div className="card-title"> 
     <Link className="d-flex mx-2 mb-0" to={`/ul/${posterUser}`}>
    
       <img src={avatar} className="card-img-top" alt='profile' style={{width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%'}}/>
      <div className="mx-2">
       <p className="fw-bold lead mb-0">{posterFull}</p><p className="font-italic">{posterUser}</p>
        </div>
     </Link>
     <p className="lead mb-1">Posted on {new Date(post.created).toDateString()}</p>
     <hr></hr>
   </div>
            {post.body.length > 105 && this.state.more ? <p className="card-text">{post.body.substring(0, 150)}...<span className="lead" style={{cursor: "pointer"}} onClick={() => this.setState({more: !this.state.more})}>see more</span></p> : <p className="card-text">{post.body}</p>}
    { /*
    <Link to={`/post/${post._id}`} className="btn btn-primary btn-raised btn-sm">Read more</Link>
              */
    }
  </div>
          
</div>
          
        )

              
            })}
              </div>
    )
  }
  
  render() {
    const {posts, loading} = this.state
    
    return (
      <div className='container bg-light'>
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