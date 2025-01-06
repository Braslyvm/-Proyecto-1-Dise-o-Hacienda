import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Bienvenido a la aplicación de Gestión CABYS</h1>
        <p className="home-description">
          Esta aplicación ofrece herramientas avanzadas para la búsqueda y
          gestión del catálogo CABYS, así como estadísticas del tipo de cambio y
          funcionalidades personalizadas.
        </p>
        <p className="home-footer">
          ¡Explora las funcionalidades y descubre cómo esta herramienta puede
          ayudarte en tu día a día!
        </p>
      </div>
    </div>
  );
};

export default Home;
