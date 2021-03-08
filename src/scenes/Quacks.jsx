import React, {useContext} from 'react'
import { UserContext } from '../App'
import { Container } from 'react-bootstrap';


function Quacks() {
    const { user } = useContext(UserContext)
    const greeting = (!user)
    ? 'Guest'
    : user.displayName || 'User!'

    return (
        <>
        <Container className= 'login-container'>
        <img className="banner"
          src="assets\QuackBanner.png"
          alt="white banner that says Your Quack Backs">
        </img> 
        <h1 className='greeting' >Hello, {greeting} </h1>
        </Container>
        </>
    )
}

export default Quacks