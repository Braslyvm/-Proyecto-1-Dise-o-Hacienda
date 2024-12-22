import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Logeo.css';
import { app } from './Autentificacion';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

function Registro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('Usuario registrado:', user);
          navigate('/logeo');
        })
        .catch((error) => {
          setError(error.message);
        });
    } else {
      setError('Por favor, ingresa tu correo y contraseña');
    }
  };

  return (
    <div className="l-logeo-container">
      
      {error && <p className="l-error">{error}</p>}
      <form className="l-form" onSubmit={handleSubmit}>
      <h2 className="l-h2">Registro de usuario</h2>
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
        <button type="submit" className="l-button">Registrarse</button>
      </form>
    </div>
  );
}

export default Registro;
