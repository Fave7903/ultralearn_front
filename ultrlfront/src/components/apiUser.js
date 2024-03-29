export const read = (name, token) => {
    return fetch(`https://ultralearn.xyz/ul/${name}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
  }

export const update = (name, token, user) => {
    return fetch(`https://ultralearn.xyz/ul/${name}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(user)
    })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
  }

// export const remove = (userId, token) => {
//     return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
//       method: "DELETE",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//       }
//     })
//     .then(response => {
//       return response.json()
//     })
//     .catch(err => console.log(err))
//   }

export const list = () => {
    return fetch(`https://ultralearn.xyz/users`, {
      method: "GET",
    })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
  }

export const follow = (userId, token, followId) => {
    return fetch(`https://ultralearn.xyz/user/${followId}/follow`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({userId, followId})
    })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
  }

export const unfollow = (userId, token, unfollowId) => {
    return fetch(`https://ultralearn.xyz/user/${unfollowId}/unfollow`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({userId, unfollowId})
    })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
  }

export const findPeople = (name, token) => {
    return fetch(`https://ultralearn.xyz/user/findpeople/${name}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}


export const myfollowers = (name, token) => {
    return fetch(`https://ultralearn.xyz/user/followers/${name}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}


export const myfollowings = (name, token) => {
    return fetch(`https://ultralearn.xyz/user/followings/${name}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}


export const resetLinkMail = (mail) => {
  return fetch(`https://ultralearn.xyz/ul/email`, {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(mail)
  })
  .then(response => {
    return response.json()
  })
  .catch(err => console.log(err))
}


export const passwordReset = (password, token) => {
  console.log(token, password)
  return fetch(`https://ultralearn.xyz/reset-password`, {
    method: 'PUT',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({password, token})
  })
  .then(response => {
    return response.json()
  })
  .catch(err => console.log(err))
}