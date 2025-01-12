import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Logeo/Lectura";
import "../styles/DetalleSearch.css";
import {
  setData,
  deleteByEmailAndCode,
  exists,
} from "../Logeo/Autentificacion";
import translateText from './translate';
import { useGlobalContext } from './GlobalContext';

function DetalleCabys({ changeContent }) {
  const { email } = useAuth();
  const usuario = email;
  const { descripcion, param1, param2, param3 } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [favorito, setFavorito] = useState(false);
  const [translatedContent, setTranslatedContent] = useState({
    impuesto: 'Impuesto',
    codigo: 'Código',
    categorias: 'Categorías',
    volver: 'Volver atrás',
    campo: 'Campo',
    valor: 'Valor'
  });

  const [translatedDescripcion, setTranslatedDescripcion] = useState(descripcion);
  const [translatedParam3, setTranslatedParam3] = useState(param3);

  const { translate, dark } = useGlobalContext();

  useEffect(() => {
      if (dark) {
        document.body.classList.add("dark-theme");
      } else {
        document.body.classList.remove("dark-theme");
      }
    }, [dark]); 

  useEffect(() => {
    const fetchValor = async () => {
      const result = await exists(usuario, param2);
      setFavorito(result);
    };

    fetchValor();
  }, [usuario, param2]);

  useEffect(() => {
    const translateContent = async () => {
      if (translate) {
        const impuesto = await translateText('Impuesto', 'es', 'en');
        const codigo = await translateText('Código', 'es', 'en');
        const categorias = await translateText('Categorías', 'es', 'en');
        const volver = await translateText('Volver atrás', 'es', 'en');
        const campo = 'Field';
        const valor = 'Value';
        const translatedDescripcion = await translateText(descripcion, 'es', 'en');
        const translatedParam3 = await translateText(param3, 'es', 'en');
        setTranslatedContent({
          impuesto,
          codigo,
          categorias,
          volver,
          campo,
          valor
        });
        setTranslatedDescripcion(translatedDescripcion);
        setTranslatedParam3(translatedParam3);
      }
    };

    translateContent();
  }, [translate, descripcion, param3]);

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
    <div className={`detalle-container ${dark ? 'dark-theme' : 'light-theme'}`}>
      <h1>{translatedDescripcion}</h1>
      <table className="detail-table">
        <thead>
          <tr>
            <th>{translatedContent.campo}</th>
            <th>{translatedContent.valor}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{translatedContent.impuesto}</td>
            <td>{param1}%</td>
          </tr>
          <tr>
            <td>{translatedContent.codigo}</td>
            <td>{param2}</td>
          </tr>
          <tr>
            <td>{translatedContent.categorias}</td>
            <td>{translatedParam3}</td>
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
        {translatedContent.volver}
      </button>
    </div>
  );
}

export default DetalleCabys;