import React, {useState, createContext} from 'react'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from 'firebase'

import QuackMenu from './components/QuackMenu'
import Home from './scenes/Home'
import Login from './scenes/Login'
import Signup from './scenes/Signup'
import Quacks from './scenes/Quacks'

import { firebaseConfig } from "./config";
firebase.initializeApp(firebaseConfig);

export const UserContext = createContext(null)

function App() {
  const [user, setUser] = useState(null)
  return (
    <>
    <UserContext.Provider value={{user, setUser, firebase}}>
      <Router>
    <QuackMenu/>
    <div className="App">
      <img className="banner"
          src="assets\banner.png"
          alt="white banner that says Senior Dev Duckie">
      </img>
      <br/>
      <div className='subheading'>
      </div>
        <Switch>
        <Route path="/Login" component={Login}/>
        <Route path="/Signup" component={Signup}/>
        <Route path="/Quacks" component={Quacks}/>
        <Route path="/" component={Home}/>
        </Switch>
    </div>
      </Router>
    </UserContext.Provider>
    </>
  );
}

export default App;
