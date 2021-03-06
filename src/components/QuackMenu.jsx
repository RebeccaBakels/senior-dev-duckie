import React from 'react'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';


function QuackMenu() {
    return(
<Dropdown style={{width: '10vh'}}>
  <Dropdown.Toggle >
    <img
     className="menu-duck"
     src="assets\menu.png"
     alt="red rubber duckie with stop symbol"></img>
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item><Link to="/Login">Login</Link></Dropdown.Item>
    <Dropdown.Item ><Link to="/Signup">Sign Up</Link></Dropdown.Item>
    <Dropdown.Item ><Link to="/Logout">Logout</Link></Dropdown.Item>
    <Dropdown.Item ><Link to="/Quacks">My Quacks</Link></Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
    )
}

export default QuackMenu