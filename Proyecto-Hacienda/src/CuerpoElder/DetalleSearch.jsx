import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./DetalleSearch.css";
import {
  setData,
  deleteByEmailAndCode,
  exists,
} from "../Logeo/Autentificacion";

function DetalleCabys() {
  const usuario = "brasly";
  const { descripcion, param1, param2, param3 } = useParams();

  if (!descripcion || !param1 || !param2 || !param3) {
    return <div>Parámetros no encontrados.</div>;
  }
  //funcion para consultar si existe un producto
  const [valor, setValor] = useState(false);

  useEffect(() => {
    const fetchValor = async () => {
      const result = await exists(usuario, param2);
      setValor(result);
      setFavorito(result);
    };

    fetchValor();
  }, [usuario, param2]);

  /*funcion para agregar a favoritos */
  const [favorito, setFavorito] = useState(false);

  const handleFavoriteClick = async () => {
    const nuevoFavorito = !favorito;
    setFavorito(nuevoFavorito);

    if (nuevoFavorito) {
      console.log("Añadiendo a favoritos.");
      await setData(usuario, descripcion, param3, param1, param2);
    } else {
      console.log("Eliminando de favoritos.");
      await deleteByEmailAndCode(usuario, param2);
    }
    setValor(nuevoFavorito); // Actualiza valor para mantener consistencia
  };

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
      <button
        className={`add-favorite ${favorito ? "favorito" : ""}`}
        onClick={handleFavoriteClick}
      >
        {favorito ? "★" : "☆"}
      </button>
    </div>
  );
}

export default DetalleCabys;
