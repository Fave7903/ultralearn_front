export const create = (name, token, post) => {
    return fetch(`https://api-ultralearn.herokuapp.com/post/new/${name}`, {
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
    return fetch(`https://api-ultralearn.herokuapp.com/posts`, {
      method: "GET",
    })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
  }