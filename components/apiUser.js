export const read = (name, token) => {
    return fetch(`https://api-ultralearn.herokuapp.com/ul/${name}`, {
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
    console.log("User data update ", user)
    console.log("User date of birth update ", user.dateOfBirth)
    return fetch(`https://api-ultralearn.herokuapp.com/ul/${name}`, {
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

// export const list = () => {
//     return fetch(`${process.env.REACT_APP_API_URL}/users`, {
//       method: "GET",
//     })
//     .then(response => {
//       return response.json()
//     })
//     .catch(err => console.log(err))
//   }