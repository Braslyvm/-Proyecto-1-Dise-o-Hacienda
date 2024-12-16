import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Importa el enrutador
import './index.css';
import App from './App.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router> {/* Envuelve tu aplicación en un Router */}
      <App />
    </Router>
  </StrictMode>,
);
