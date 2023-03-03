export const signup = (user) => {
    return fetch('http://13.56.11.21:5050/signup', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        return response.json()
      })
      .catch(err => console.log(err))
  }

export const signin = (user) => {
    return fetch('http://13.56.11.21:5050/login', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        return response.json()
      })
      .catch(err => console.log(err))
  }

export const authenticate = (jwt, next) => {
    if(typeof window !== "undefined") {
      localStorage.setItem("jwt", JSON.stringify(jwt))
      next()
    }
  }

export const signout = (next) => {
  if (typeof window !== "undefined") localStorage.removeItem("jwt")
  next()
  return fetch('http://13.56.11.21:5050/signout', {
    method: "GET"
  }).then(response => {
    return response.json()
  }).catch(err => console.log(err))
}

export const isAuthenticated = () => {
  if (typeof window == "undefined") { 
    return false
  }
  if (localStorage.getItem("jwt")) { 
    return JSON.parse(localStorage.getItem("jwt"));
  }
  else {
    return false
  }
}