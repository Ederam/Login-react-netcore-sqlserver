import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './routes/Routes';
import { createRoot, HTMLElement } from 'react-dom/client';
import { Router } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  // document.getElementById('root')
);

// let container = null;

// document.addEventListener('DOMContentLoaded', function(event) {
//   if (!container) {
//     container = document.getElementById('root1') as HTMLElement;
//     const root = createRoot(container)
//     root.render(
//       <React.StrictMode>
//         <h1>ZOO</h1>
//       </React.StrictMode>
//     );
//   }
// });