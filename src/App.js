import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from './scenes/Home'
import QuackMenu from './components/QuackMenu'



function App() {
  return (
    <>
    <QuackMenu/>
    <div className="App">
      <img className="banner"
          src="assets\banner.png"
          alt="white banner that says Senior Dev Duckie">
      </img>
      <br/>
      <div className='subheading'>
      </div>
      <Router>
        <Switch>
        <Route path="/" component={Home}/> 
        </Switch>
      </Router>
    </div>
    </>
  );
}

export default App;
