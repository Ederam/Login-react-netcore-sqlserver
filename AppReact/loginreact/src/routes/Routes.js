import { React, StrictMode } from 'react';
import {BrowserRouter,  Route,Routes } from 'react-router-dom';
import Menu from '../pages/Menu';
import Login from '../pages/Login';
import Estudiante from '../pages/Estudiante';

function App() {
  return (
    <BrowserRouter>
      {/* <Switch> */}
        <StrictMode>
          <Routes>
          {/* <Route exact path="/" component={Login}/>
          <Route exact path="/menu" component={Menu}/> */}
          <Route exact path="/" element={<Login/>}/>
          {/* <Route exact path="/menu" element={<Menu/>}/> */}
          {/* <Route exact path="/menu" component={Menu} /> */}
          {/* <Redirect to='/menu' /> */}
          <Route path="/menu" element={<Menu />} />
          <Route path="/estudiante" element={<Estudiante />} />
          </Routes>
        </StrictMode>
        
      {/* </Switch> */}
    </BrowserRouter>
  );
}

export default App;