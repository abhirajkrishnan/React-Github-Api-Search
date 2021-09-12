import React from 'react';
import DashBoard from './DashBoard';
import Error from './Error';
import './index.css';
import Login from './Login';
import { BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import Home from './Home';

function App() {
  return (
  <Router>
    <Switch>
      <Route path="/" exact={true}>
      <Home/>
      </Route>

      <Route path="/dashboard">
      <DashBoard />
      </Route>

      <Route path="/login">
       <Login/>
      </Route>

      <Route path="*">
       <Error/>
      </Route>
     
     </Switch>
  </Router>
  );
}

export default App;
