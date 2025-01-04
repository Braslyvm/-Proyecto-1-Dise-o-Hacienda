import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./DetalleSearch.css";
function DetalleCabys() {
  const { descripcion, param1, param2, param3 } = useParams();

  if (!descripcion || !param1 || !param2 || !param3) {
    return <div>Parámetros no encontrados.</div>;
  }

  return (
    <div>
      <h1>{descripcion}</h1>

      {/* Tabla para mostrar los detalles */}
      <table className="detail-table">
        <thead>
          <tr>
            <th>Campo</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Impuesto</td>
            <td>{param1}%</td>
          </tr>
          <tr>
            <td>Código</td>
            <td>{param2}</td>
          </tr>
          <tr>
            <td>Categorías</td>
            <td>{param3}</td>
          </tr>
        </tbody>
      </table>

      <button className="star-button">&#10084;</button>
    </div>
  );
}

export default DetalleCabys;
