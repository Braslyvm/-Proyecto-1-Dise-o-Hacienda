import React from "react";

// Componente Inf2
function Inf2({ texto }) {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        width: "15%",
        fontFamily: "monospace",
        overflow: "hidden",
        maxHeight: "400px",
        whiteSpace: "pre-wrap",
        margin: "10px",
        position: "absolute", // Posicionamiento absoluto
        top: "30px", // Ubicación desde la parte superior
        right: "20px", // Ubicación desde la parte derecha
        zIndex: 10, // Asegura que se superponga a otros elementos si es necesario
      }}
    >
      <h2 style={{ fontSize: "18px", color: "#28a745" }}>Tipo de Cambio:</h2>
      <p style={{ color: "black" }}>{texto}</p> {/* El texto en negro aquí */}
    </div>
  );
}

export { Inf2 };
