import firebase from 'firebase'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {firebaseConfig} from './config'

import Home from './scenes/Home'

firebase.initializeApp(firebaseConfig)

function App() {
  return (
    <div className="App">
       <h1 className='heading' >Senior Dev Duckie</h1>
        <h2 className='subheading' >Tell Sarah Tonin your block</h2>
      <Router>
        <Switch>
        <Route path="/" component={Home}/> 
        </Switch>
      </Router>
    </div>
  );
}

export default App;
