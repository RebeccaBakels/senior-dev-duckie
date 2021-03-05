import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';

function QuackMenu() {
    return(
<Dropdown style={{width: '10vh'}}>
  <Dropdown.Toggle id="dropdown-basic">
    <img
     className="menu-duck"
     src="assets\menu.png"
     alt="red rubber duckie with stop symbol"></img>
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Login</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Sign Up</Dropdown.Item>
    <Dropdown.Item href="#/action-3">My Recordings</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
    )
}

export default QuackMenu