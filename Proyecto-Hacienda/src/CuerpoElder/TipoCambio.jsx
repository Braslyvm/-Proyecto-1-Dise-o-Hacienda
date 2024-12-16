import React from "react";

function Inf2({ texto }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        margin: "20px",
        whiteSpace: "pre-wrap",
        fontFamily: "monospace",
      }}
    >
      <h1 style={{ fontSize: "18px" }}> Tipo de cambio </h1>
      <p>{texto}</p>
    </div>
  );
}

export { Inf2 };
