import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Logeo/Lectura";
import "./DetalleSearch.css";
import {
  setData,
  deleteByEmailAndCode,
  exists,
} from "../Logeo/Autentificacion";

function DetalleCabys({ changeContent }) {
  const { email } = useAuth();
  const usuario = email;
  const { descripcion, param1, param2, param3 } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [favorito, setFavorito] = useState(false);

  useEffect(() => {
    const fetchValor = async () => {
      const result = await exists(usuario, param2);
      setFavorito(result);
    };

    fetchValor();
  }, [usuario, param2]);

  const handleFavoriteClick = async () => {
    const nuevoFavorito = !favorito;
    setFavorito(nuevoFavorito);

    if (nuevoFavorito) {
      await setData(usuario, descripcion, param3, param1, param2);
    } else {
      await deleteByEmailAndCode(usuario, param2);
    }
  };

  const back = () => {
    navigate("/search", { state: { lastSearch: location.state?.lastSearch || "" } });
  };

  return (
    <div>
      <h1>{descripcion}</h1>
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
      <button className="back-button" onClick={back}>
        Volver atrás
      </button>
    </div>
  );
}

export default DetalleCabys;
