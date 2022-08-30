export const create = (name, token, post) => {
    return fetch(`/post/new/${name}`, {
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
    return fetch(`/posts`, {
      method: "GET",
    })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
  }

export const getPost = postId => {
    return fetch(`/post/${postId}`, {
      method: "GET",
    })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
  }

export const listByUser = (name, token) => {
    return fetch(`/posts/by/${name}`, {
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
    return fetch(`/post/like`, {
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
    return fetch(`/post/unlike`, {
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

export const comment = (userId, token, postId, comment) => {
    return fetch(`/post/comment`, {
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

export const uncomment = (userId, token, postId, comment) => {
    return fetch(`/post/uncomment`, {
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