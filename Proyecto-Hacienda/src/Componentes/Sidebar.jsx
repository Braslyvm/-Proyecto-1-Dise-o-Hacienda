import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../CuerpoElder/GlobalContext";
import translateText from '../CuerpoElder/translate';

function Sidebar({ changeContent }) {
  const navigate = useNavigate();
  const { translate, dark } = useGlobalContext();
  const [translatedContent, setTranslatedContent] = useState({
    menu: 'Menu',
    buscador: 'Buscador',
    tipoCambio: 'Tipo de cambio',
    comportamientoDolar: 'Comportamiento del dólar',
    ajustes: 'Ajustes',
    cerrarSesion: 'Cerrar Sesión'
  });

  const handleNavigation = (section) => {
    changeContent(section); // Cambia el contenido mostrado.
    navigate("/app"); // Navega de vuelta al contenido principal.
  };

  useEffect(() => {
    const translateContent = async () => {
      if (translate) {
        const menu = await translateText('Menu', 'es', 'en');
        const buscador = await translateText('Buscador', 'es', 'en');
        const tipoCambio = await translateText('Tipo de cambio', 'es', 'en');
        const comportamientoDolar = await translateText('Comportamiento del dólar', 'es', 'en');
        const ajustes = await translateText('Ajustes', 'es', 'en');
        const cerrarSesion = await translateText('Cerrar Sesión', 'es', 'en');

        setTranslatedContent({
          menu,
          buscador,
          tipoCambio,
          comportamientoDolar,
          ajustes,
          cerrarSesion
        });
      } else {
        setTranslatedContent({
          menu: 'Menu',
          buscador: 'Buscador',
          tipoCambio: 'Tipo de cambio',
          comportamientoDolar: 'Comportamiento del dólar',
          ajustes: 'Ajustes',
          cerrarSesion: 'Cerrar Sesión'
        });
      }
    };

    translateContent();
  }, [translate]);

  const handleHomeRedirect = () => {
    navigate("/");
  };

  return (
    <div className={`sidebar ${dark ? 'dark-theme' : 'light-theme'}`}>
      <h2>{translatedContent.menu}</h2>
      <ul>
        <li><a href="#" onClick={() => handleNavigation("section1")}>{translatedContent.buscador}</a></li>
        <li><a href="#" onClick={() => handleNavigation('section2')}>{translatedContent.tipoCambio}</a></li>
        <li><a href="#" onClick={() => handleNavigation('section3')}>{translatedContent.comportamientoDolar}</a></li>
        <li><a href="#" onClick={() => handleNavigation('section4')}>{translatedContent.ajustes}</a></li>
      </ul>
      <button onClick={handleHomeRedirect}>{translatedContent.cerrarSesion}</button>
    </div>
  );
}

export default Sidebar;
