import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/aplicacion/estilos/indice';
import App from '@/aplicacion/entrada/principal';

const rootElement: HTMLElement | null = document.getElementById('root');
const root: ReactDOM.Root = ReactDOM.createRoot(rootElement as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
