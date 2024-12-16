// src/Componentes/Suma.jsx
import React, { useState } from 'react';
import './Suma.css'; // Importa el archivo CSS

const SumaComponent = () => {
  const [numero1, setNumero1] = useState('');
  const [numero2, setNumero2] = useState('');
  const [resultado, setResultado] = useState(null);

  const manejarSuma = (e) => {
    e.preventDefault();
    const suma = parseFloat(numero1) + parseFloat(numero2);
    setResultado(suma);
  };

  return (
    <div className="container">
      <h1>Calculadora de suma</h1>
      <form onSubmit={manejarSuma}>
        <input
          type="number"
          value={numero1}
          onChange={(e) => setNumero1(e.target.value)}
          placeholder="Ingrese el primer número"
        />
        <input
          type="number"
          value={numero2}
          onChange={(e) => setNumero2(e.target.value)}
          placeholder="Ingrese el segundo número"
        />
        <button type="submit">Sumar</button>
      </form>
      {resultado !== null && (
        <h2 className="result">El resultado de la suma es: {resultado}</h2>
      )}
    </div>
  );
};

export default SumaComponent;