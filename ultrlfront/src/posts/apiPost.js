export const create = (name, token, post) => {
    return fetch(`http://13.56.11.21:5050/post/new/${name}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(post)
    })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
  }

export const list = () => {
    return fetch(`http://13.56.11.21:5050/posts`, {
      method: "GET",
    })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
  }

export const getPost = postId => {
    return fetch(`http://13.56.11.21:5050/post/${postId}`, {
      method: "GET",
    })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
  }

export const listByUser = (name, token) => {
    return fetch(`http://13.56.11.21:5050/posts/by/${name}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
  }

export const like = (userId, token, postId) => {
    return fetch(`http://13.56.11.21:5050/post/like`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({userId, postId})
    })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
  }

export const unlike = (userId, token, postId) => {
    return fetch(`http://13.56.11.21:5050/post/unlike`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({userId, postId})
    })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
  }

export const comment = (userId, token, postId, text) => {
    return fetch(`http://13.56.11.21:5050/post/comment`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({userId, postId, text}) 
    })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
  }

export const uncomment = (userId, token, postId, comment) => {
    return fetch(`http://13.56.11.21:5050/post/uncomment`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({userId, postId, comment})
    })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
  }

  // export const editPost = (postId, newPost) => {
  //   return fetch(`http://13.56.11.21:5050/post/${postId}`, {
  //     method: "PUT",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`
  //     },
  //     body: JSON.stringify(newPost) 
  //   })
  //   .then(response => {
  //     return response.json()
  //   })
  //   .catch(err => console.log(err))
  // }