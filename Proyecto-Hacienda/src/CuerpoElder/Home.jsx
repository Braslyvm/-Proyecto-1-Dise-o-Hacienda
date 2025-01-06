import React from "react";

const Home = () => {
  return (
    <div>
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Bienvenido a la aplicación de Gestión CABYS</h1>
        <p>
          Esta aplicación ofrece herramientas avanzadas para la búsqueda y
          gestión del catálogo CABYS, así como estadísticas del tipo de cambio y
          funcionalidades personalizadas como:
        </p>
        <ul style={{ textAlign: "left", margin: "0 auto", maxWidth: "600px" }}>
          <li>Inicio de sesión mediante Google Authentication.</li>
          <li>Búsqueda de CABYS por filtros de nombre o código.</li>
          <li>Conversión de tipo de cambio entre dólar, euro y colón.</li>
          <li>Soporte multilingüe (inglés y español).</li>
          <li>Visualización detallada de elementos CABYS.</li>
          <li>Gráficos comparativos del tipo de cambio.</li>
          <li>Gestión de CABYS favoritos.</li>
          <li>Base de datos en Firebase para almacenar los datos.</li>
        </ul>
        <p>
          ¡Explora las funcionalidades y descubre cómo esta herramienta puede
          ayudarte en tu día a día!
        </p>
      </div>
    </div>
  );
};

export default Home;
