export const create = (name, token, post) => {
    return fetch(`https://ultralearn.xyz/post/new/${name}`, {
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
    return fetch(`https://ultralearn.xyz/posts`, {
      method: "GET",
    })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
  }

export const getPost = postId => {
    return fetch(`https://ultralearn.xyz/post/${postId}`, {
      method: "GET",
    })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
  }

export const listByUser = (name, token) => {
    return fetch(`https://ultralearn.xyz/posts/by/${name}`, {
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
    return fetch(`https://ultralearn.xyz/post/like`, {
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
    return fetch(`https://ultralearn.xyz/post/unlike`, {
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
    return fetch(`https://ultralearn.xyz/post/comment`, {
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
    return fetch(`https://ultralearn.xyz/post/uncomment`, {
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
  //   return fetch(`https://ultralearn.xyz/post/${postId}`, {
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