import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importa Link de React Router
import './Logeo.css';
import { app } from './Autentificacion';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

function Logeo() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('Usuario autenticado:', user);
          navigate('/app');
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert(`Error: ${errorMessage}`);
        });
    } else {
      alert('Por favor, ingresa tu correo y contraseña');
    }
  };

  return (
    <div className="l-logeo-container">
      <form className="l-form" onSubmit={handleSubmit}>
        <h2 className="l-h2">Inicio de sesión</h2>
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
        <button type="submit" className="l-button">Iniciar sesión</button>

        <p className="l-register-link">
        <Link to="/Registro">Regístrate aquí</Link>
        </p>
      </form>
    </div>
  );
}

export default Logeo;
