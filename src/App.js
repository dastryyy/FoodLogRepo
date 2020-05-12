import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Homepage from './components/Homepage';


const App = () => {
  return (
    <div>
      <Homepage/>
    </div>
  );
}

export default App;
