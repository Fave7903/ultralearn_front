import { Redirect, Link } from 'react-router-dom'
import ultra from '../assets/ultra.png'
import { signout } from '../auth'
import { isAuthenticated } from '../auth'
import { Image } from 'cloudinary-react'

const Nav = () => {

  return (
    <div>

      <nav className="navbar fixed-top navbar-expand-lg py-0 navbar-light bg-light">
        <Link className="navbar-brand mx-2" to="/">
          <img src={ultra} style={{ width: "30px", height: "30px" }} className="d-inline-block align-top" alt="" />
          <span className="fw-bolder h4" style={{ color: "#5f0f40" }}>UltraLEARN</span>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
          <ul className="navbar-nav lead">
            <li className="nav-item active mx-5">
              <Link className="nav-link" to="/" style={{ color: "#5f0f40" }}>Home </Link>
            </li>
            <li className="nav-item active mx-5">
              <Link className="nav-link" to="/findpeople" style={{ color: "#5f0f40" }}>Add Friends<span className="sr-only">(current)</span></Link>
            </li>

          </ul>

        </div>
        <span className="dropdown navbar-text mx-4">
          <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {isAuthenticated().user.imgId ? <Image cloudName="favoursoar" publicId={isAuthenticated().user.imgId} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%', borderColor: "purple" }} /> :
              <i className="fa-solid fa-user mx-3" style={{ color: "#5f0f40", fontSize: "35px" }}></i>
            }
            {isAuthenticated().user.username}
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link className="dropdown-item" to={`/ul/${isAuthenticated().user.username}`} style={{ color: "#5f0f40" }}>Profile</Link>
            <div className="dropdown-divider"></div>
            <Link className="dropdown-item" to="/signin"><span style={{ color: "#5f0f40" }} onClick={() => signout(() => <Redirect to={"/signin"} />)}>Signout</span></Link>
          </div>
        </span>
      </nav>


    </div>
  )
}

export default Nav