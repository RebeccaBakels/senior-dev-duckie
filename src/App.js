import React, {useState, createContext, useEffect} from 'react'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from 'firebase/app';
import 'firebase/database';

import QuackMenu from './components/QuackMenu'
import Home from './scenes/Home'
import Login from './scenes/Login'
import Signup from './scenes/Signup'
import Quacks from './scenes/Quacks'
import MeetMe from './scenes/MeetMe'

import { firebaseConfig } from "./config";
firebase.initializeApp(firebaseConfig);

export const UserContext = createContext(null)

function App() {
  const [user, setUser] = useState(null)

  useEffect(()=> {
    if(user){
      const newUser = {
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
        photoURL: user.photoURL,
      }
      localStorage.setItem('user', JSON.stringify(newUser))  
    }

  }, [user])

  useEffect(()=> {
    if(!user){
      const localUser = JSON.parse(localStorage.getItem('user'))
      if(localUser){
        setUser(localUser)
      }
    }

  },[])
  
  function SignOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
        localStorage.setItem("user", null);
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
    <UserContext.Provider value={{user, setUser, firebase, SignOut}}>
      <Router>
    <QuackMenu/>
    <div className="App">
        <Switch>
        <Route path="/Login" component={Login}/>
        <Route path="/Signup" component={Signup}/>
        <Route path="/Quacks" component={Quacks}/>
        <Route path="/MeetMe" component={MeetMe}/>
        <Route path="/" component={Home}/>
        </Switch>
    </div>
      </Router>
    </UserContext.Provider>
    </>
  );
}

export default App;
