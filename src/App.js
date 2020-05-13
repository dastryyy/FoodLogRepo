import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Homepage from './components/Homepage';
import Register from './components/Register';


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
      </Switch>
    </div>
  );
}

export default App;
