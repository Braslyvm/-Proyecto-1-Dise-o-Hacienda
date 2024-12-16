import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirigir
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate(); // Inicializa el hook de navegación

  const handleLoginRedirect = () => {
    navigate('/logeo'); // Redirige a la ruta de inicio de sesión
  };

  return (
    <div className="navbar">
      <h1>Índice</h1>
      <button onClick={handleLoginRedirect}>Inicio Sesión</button> {/* Redirige a la página de inicio de sesión */}
    </div>
  );
}

export default Navbar;
