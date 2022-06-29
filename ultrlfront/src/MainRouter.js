import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Dashboard from './components/Dashboard'
import EditProfile from './components/EditProfile'

const MainRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard}></Route>
      <Route exact path="/signup" component={Signup}></Route>
      <Route exact path="/signin" component={Signin}></Route>
      <Route exact path="/edit/:name" component={EditProfile}></Route>
    </Switch>
  );
}

export default MainRouter