import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirigir
import './Logeo.css';

function Logeo() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      navigate('/app'); // Redirige a la ruta principal después de un inicio de sesión exitoso
    } else {
      alert('Por favor, ingresa tu correo y contraseña');
    }
  };

  return (
    <div className="l-logeo-container">
      <h2 className="l-h2">Inicio de sesión</h2>
      <form className="l-form" onSubmit={handleSubmit}>
        <div className="l-input-group">
          <label htmlFor="email" className="l-label">Correo electrónico</label>
          <input
            type="email"
            id="email"
            className="l-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="l-input-group">
          <label htmlFor="password" className="l-label">Contraseña</label>
          <input
            type="password"
            id="password"
            className="l-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="l-button">Inicio sesión</button>
      </form>
    </div>
  );
}

export default Logeo;
