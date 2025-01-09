import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importa useNavigate
import { useAuth } from "../Logeo/Lectura";
import "./DetalleSearch.css";
import handleSearch from "../CuerpoElder/Search";
import {
  setData,
  deleteByEmailAndCode,
  exists,
} from "../Logeo/Autentificacion";

function DetalleCabys({ changeContent }) {
  const { email } = useAuth();
  const usuario = email;
  const { descripcion, param1, param2, param3 } = useParams();
  const navigate = useNavigate(); // Hook para navegar

  if (!descripcion || !param1 || !param2 || !param3) {
    return <div>Parámetros no encontrados.</div>;
  }

  const [valor, setValor] = useState(false);

  useEffect(() => {
    const fetchValor = async () => {
      const result = await exists(usuario, param2);
      setValor(result);
      setFavorito(result);
    };

    fetchValor();
  }, [usuario, param2]);

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
    setValor(nuevoFavorito);
  };

  const back = () => {
    navigate(-1); // Navega hacia atrás en el historial
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
      {/* Botón para volver atrás */}
      <button className="back-button" onClick={back}>
        Volver atrás
      </button>
    </div>
  );
}

export default DetalleCabys;
