import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Search.css";

function Search() {
  const [results, setResults] = useState([]);
  const [tempJSON, setTempJSON] = useState({});

  const handleSearch = async (nombreOCodigo) => {
    const esCodigo = /^\d+$/.test(nombreOCodigo);
    const apiUrl = esCodigo
      ? `https://api.hacienda.go.cr/fe/cabys?codigo=${encodeURIComponent(
          nombreOCodigo
        )}`
      : `https://api.hacienda.go.cr/fe/cabys?q=${encodeURIComponent(
          nombreOCodigo
        )}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();
      if (!data.cabys || data.cabys.length === 0) {
        alert("No se encontraron resultados.");
        return;
      }

      setResults(data.cabys);
      setTempJSON({ busqueda: data.cabys });
    } catch (error) {
      alert("Error al realizar la solicitud.");
      console.error(error);
    }
  };

  return (
    <div id="root">
      <h2>Buscador de CABYS de Hacienda</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Ingrese código o nombre"
          id="search-input"
          onKeyPress={(e) =>
            e.key === "Enter" && handleSearch(e.target.value.trim())
          }
        />
        <button
          id="search-button"
          onClick={() => {
            const input = document.getElementById("search-input").value.trim();
            if (input) handleSearch(input);
            else alert("Por favor, ingrese un criterio de búsqueda.");
          }}
        >
          Buscar
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Descripción</th>
            <th>Impuesto</th>
          </tr>
        </thead>
        <tbody>
          {results.map((item) => (
            <tr key={item.codigo}>
              <td>{item.codigo}</td>
              <td>
                <Link
                  to={`/DetalleCabys/${item.descripcion}/param1/${item.impuesto}/param2/${item.codigo}/param3/${item.categorias}`}
                  className="descripcion"
                >
                  {item.descripcion || "Descripción no disponible"}
                </Link>
              </td>
              <td className="text-center">{item.impuesto}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Search;
