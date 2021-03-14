import React, {useContext, useState, useEffect} from 'react'
import { UserContext } from '../App'
import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';


function Quacks() {
    const { user } = useContext(UserContext)
    const [quacks, setQuacks] = useState([])
    const [loading, setLoading] = useState(true)

    function getQuacks(){
      if (user){
        setLoading(true)
        fetch(`https://api-senior-dev-duckie.web.app/quacks/${user.uid}`)
        .then(res => res.json())
        .then(data => {
            setQuacks(data)  
            setLoading(false)
        })
        .catch(err => {
            console.log('error:', err)
            setLoading(false)
        })
        } else {
            setQuacks([])
            setLoading(false)
        }
    }
    useEffect(() => {
        getQuacks()
    }, [user])
  
   function deleteQuack(quackId) {
      fetch(`https://api-senior-dev-duckie.web.app/quacks/${quackId}`, {
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(data => {
        getQuacks()
        setLoading(false)
      })
      .catch(err => {
        console.log('error deleting quack:', err)
        setLoading(false)
      })
    }

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
        {quacks.map((quack) =>(
        <div key={quack.id}>
        <a href={quack.URL} >
        <img
          className="green-duck"
          src="assets\play.png"
          alt="green rubber duckie with play symbol"
          href={quack.URL}
        />
      </a>
      <Button onClick={() => deleteQuack(quack.id)} variant="danger">Delete</Button>
       <h3>Created:{new Date(quack.created._seconds * 1000).toLocaleDateString("en-US")}</h3>
      </div>
      ))}
        </Container>
        </>
    )
}

export default Quacks