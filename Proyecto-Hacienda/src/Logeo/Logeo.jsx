import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Logeo.css'; // Archivo CSS para estilos

const Logeo = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard'); // Cambia '/dashboard' por la ruta deseada
  };

  return (
    <button className="circular-button" onClick={handleLogin}>
      Iniciar Sesión
    </button>
  );
};

export default Logeo;
