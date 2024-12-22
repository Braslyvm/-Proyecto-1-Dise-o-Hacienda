import React, { useState } from "react";
import "./Search.css";

function Search() {
  const [results, setResults] = useState([]); // Almacena los resultados de la búsqueda
  const [tempJSON, setTempJSON] = useState({}); // "Archivo JSON temporal" en memoria

  const handleSearch = async (nombreOCodigo) => {
    const esCodigo = /^\d+$/.test(nombreOCodigo); // Verifica si es un número
    const apiUrl = esCodigo
      ? `https://api.hacienda.go.cr/fe/cabys?codigo=${encodeURIComponent(nombreOCodigo)}`
      : `https://api.hacienda.go.cr/fe/cabys?q=${encodeURIComponent(nombreOCodigo)}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      if (!data.cabys || data.cabys.length === 0) {
        alert("No se encontraron resultados.");
        return;
      }

      setResults(data.cabys); // Actualiza los resultados
      setTempJSON({ busqueda: data.cabys }); // Guarda la respuesta completa temporalmente
    } catch (error) {
      alert("Error al realizar la solicitud.");
      console.error(error);
    }
  };

  return (
    <div id="root">
      <h2>Buscador de CABYS de Hacienda</h2>
      <p>(Catálogo de Bienes y Servicios)</p>
      <div className="search-container">
        <input
          type="text"
          placeholder="Ingrese código o nombre"
          id="search-input"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch(e.target.value.trim());
            }
          }}
        />
        <button
          id="search-button"
          onClick={() => {
            const input = document.getElementById("search-input").value.trim();
            if (input) {
              handleSearch(input);
            } else {
              alert("Por favor, ingrese un criterio de búsqueda.");
            }
          }}
        >
          Buscar
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Código</th>
            <th scope="col">Descripción</th>
            <th scope="col">Impuesto</th>
          </tr>
        </thead>
        <tbody>
          {results.map((item) => (
            <tr key={item.codigo}>
              <th scope="row">{item.codigo}</th>
              <td>{item.descripcion}</td>
              <td className="text-center">{item.impuesto}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Search;
