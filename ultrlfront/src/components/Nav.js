 import { Redirect, Link } from 'react-router-dom'
import avatar from '../assets/avatar.png'
import ultra from '../assets/ultra.png'
import { signout } from '../auth'
import {isAuthenticated} from '../auth'

const Nav = () =>  {
  
return (
  <div>

  <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
  <Link className="navbar-brand mx-2" to="/">
    <img src={ultra} style={{ width: "40px", height: "40px"}} className="d-inline-block align-top" alt=""/>
    <span className="fw-bolder lead">UltraLEARN</span>
  </Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
    <ul className="navbar-nav lead">
      <li className="nav-item active mx-5">
        <Link className="nav-link" to="/">Home </Link>
      </li>
      <li className="nav-item active mx-5">
        <Link className="nav-link" to="/findpeople">Add Friends<span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item active mx-5">
        <Link className="nav-link" to="/interest">Interest<span className="sr-only">(current)</span></Link>
      </li>
       
    </ul>
    
  </div>
    <span className="dropdown navbar-text mx-4"> 
        <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <img src={avatar} className="card-img-top" alt='profile' style={{width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%'}}/> {isAuthenticated().user.username}
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item" to={`/ul/${isAuthenticated().user.username}`}>Profile</Link>
          <div className="dropdown-divider"></div>
          <Link className="dropdown-item" to="/signin"><span onClick={() => signout(() => <Redirect to={"/signin"} />)}>Signout</span></Link>
        </div>
      </span>
</nav>
  
    
</div>
  )
}

export default Nav