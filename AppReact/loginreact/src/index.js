import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './routes/Routes';
import { createRoot } from 'react-dom/client';
import { Router } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));
// root.render(<Router />);

root.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);
