import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/aplicacion/estilos/indice.css';
import App from '@/aplicacion/entrada/principal';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
