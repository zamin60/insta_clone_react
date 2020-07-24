import React,{useContext} from 'react';

import {Link,useHistory} from 'react-router-dom';
import {UserContext} from '../../App'

const Navbar=()=>{
  const {state,dispatch} = useContext(UserContext)
  const history = useHistory()
  const renderList = ()=>{
    console.log(state)
    console.log("in navbar")
    if(state){
      return [<li><Link to="/profile">Profile</Link></li>,
      <li><Link to="/create">Create Post</Link></li>,
      <li>
           <button className="btn #c62828 red darken-3" type="submit" name="action"
            onClick={()=>{localStorage.clear()
            dispatch({type:"CLEAR"})
            history.push("/signin")
            }}>
                Login
            </button>

      </li>]
    }
    else{
      return [<li><Link to="/signin">Login</Link></li>,
      <li><Link to="/signup">Signup</Link></li>
      ]
    }
  }

return(
    <nav>
    <div className="nav-wrapper white" >
      <Link to={state?"/":"/signin"} className="brand-logo left">picApic</Link>
      <ul id="nav-mobile" className="right ">
      {renderList()}
      </ul>
    </div>
  </nav>
)
}

export default Navbar;