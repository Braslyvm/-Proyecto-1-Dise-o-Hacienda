import React, { useState } from "react";

// Componente Inf
function Inf({ texto }) {
  return (
    <div
      style={{
        margin: "20px",
        whiteSpace: "pre-wrap",
        fontFamily: "monospace",
      }}
    >
      <p>{texto}</p>
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
    // Verifica si la tecla presionada es Enter (código ASCII 13)
    if (event.keyCode === 13 || event.which === 13) {
      handleSearch(); // Llama a la función de búsqueda si es Enter
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      
      <input
        type="text"
        placeholder="Buscar..."
        value={searchText}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress} // Se agrega el evento onKeyDown
        style={{
          padding: "10px",
          width: "300px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          marginLeft: "10px",
          padding: "10px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Buscar
      </button>
      <h1 style={{ fontSize: "18px" }}>Resultados:</h1>
    </div>
  );
}

export { SearchBar, Inf };
