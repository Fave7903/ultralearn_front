import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Dashboard from './components/Dashboard'

const MainRouter = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Dashboard />}></Route>
      <Route exact path="/signup" element={<Signup />}></Route>
      <Route exact path="/signin" element={<Signin />}></Route>
    </Routes>
  );
}

export default MainRouter