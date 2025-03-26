import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Menu from '../pages/Menu';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={<Login />}/>
        <Route path='/menu' component={<Menu />}/>        
      </Switch>
    </BrowserRouter>
  );
}

export default App;
