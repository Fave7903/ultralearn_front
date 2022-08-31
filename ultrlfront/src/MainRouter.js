import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import EditProfile from './components/EditProfile'
import FindPeople from './components/FindPeople'
import AddFriends from './components/AddFriends'
import Users from './components/Users'
import Terms from './components/Terms'
import Contact from './components/Contactus'
import SingPost from './posts/SingPost'
import Followers from './components/Followers'
import Following from './components/Following'
import VerificationEmail from './components/VerificationEmail'
import VerificationCode from './components/verificationCode';
import VerificationPass from './components/verificationPass';

const MainRouter = () => {
  return (
    <Switch>
      <Route exact path='/verificationemail' component={VerificationEmail}></Route>
      <Route exact path='/verificationcode' component={VerificationCode}></Route>
      <Route exact path='/verificationpass' component={VerificationPass}></Route>
      <Route exact path="/" component={Dashboard}></Route>
      <Route exact path="/post/:postId" component={SingPost}></Route>
      <Route exact path="/users" component={Users}></Route>
      <Route exact path="/signup" component={Signup}></Route>
      <Route exact path="/signin" component={Signin}></Route>
      <Route exact path="/terms" component={Terms}></Route>
      <Route exact path="/contact" component={Contact}></Route>
      <Route exact path="/following" component={Following}></Route>
      <Route exact path="/followers" component={Followers}></Route>
      <Route exact path="/contact" component={Contact}></Route>
      <Route exact path="/users/:name" component={Profile}></Route>
      <Route exact path="/findpeople" component={FindPeople}></Route>
      <Route exact path="/addfriends" component={AddFriends}></Route>
      <Route exact path="/edit/:name" component={EditProfile}></Route>
    </Switch>
  );
}

export default MainRouter