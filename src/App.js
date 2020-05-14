import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Homepage from './components/Homepage';
import Register from './components/Register';
import Dashboard from './components/Dashboard';


const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path = "/">
          <Homepage/>
        </Route>
        <Route path = "/register">
          <Register/>
        </Route>
        <Route path = "/dashboard">
          <Dashboard/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
