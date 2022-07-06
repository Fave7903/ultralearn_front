import { Redirect, Link } from 'react-router-dom'
import avatar from '../assets/avatar.png'
import { signout } from '../auth'
import {isAuthenticated} from '../auth'

const Nav = () =>  {
  
return (
  <div>
    <div className="row float-right">
      <div className="col-sm-3">
      <h3><Link className="fw-bolder" to='/'>Home</Link></h3>
      </div>
<div className="col-sm-3">
            <h3><Link className="fw-bolder" to='/findpeople'>Find Learners</Link></h3>
            
          </div>
          <div className='col-sm-2'>
            <Link to={`/ul/${isAuthenticated().user.username}`}><img src={avatar} className="card-img-top" alt='profile' style={{width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%'}}/><p>{isAuthenticated().user.username}</p></Link>
            <Link to="/signin"><span onClick={() => signout(() => <Redirect to="/signin" />)}>Signout</span></Link>
          </div>
      </div>
    </div>
  )
}

export default Nav