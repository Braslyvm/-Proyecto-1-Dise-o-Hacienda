import React, { useState } from "react";

// Componente Inf
// Componente Inf
function Inf({ texto }) {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        width: "75%",
        fontFamily: "monospace",
        overflowX: "auto",
        maxHeight: "400px",
        whiteSpace: "pre-wrap",
        margin: "10px",
      }}
    >
      <h2 style={{ fontSize: "18px", color: "#007bff" }}>
        Resultados de Búsqueda:
      </h2>
      <p style={{ color: "black" }}>{texto}</p> {/* El texto en negro aquí */}
    </div>
  );
}

// Componente SearchBar
function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchText); // Llama a la función pasada como prop con el texto
  };

  const handleKeyPress = (event) => {
    if (event.keyCode === 13 || event.which === 13) {
      handleSearch(); // Llama a la función de búsqueda si es Enter
    }
  };

  return (
    <div style={{ marginBottom: "20px", textAlign: "center" }}>
      <input
        type="text"
        placeholder="Buscar..."
        value={searchText}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        style={{
          padding: "12px",
          width: "300px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          fontSize: "16px",
          marginRight: "10px",
          overflow: "hidden", // Eliminar barras de desplazamiento
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          padding: "12px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Buscar
      </button>
    </div>
  );
}

export { SearchBar, Inf };
