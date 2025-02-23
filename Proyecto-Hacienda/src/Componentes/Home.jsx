import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import translateText from './translate';
import { useGlobalContext } from './GlobalContext';

const Home = () => {
  const [translatedContent, setTranslatedContent] = useState({
    title: 'Bienvenido a la aplicación de Gestión de Hacienda',
    description: 'Esta aplicación ofrece herramientas avanzadas para la búsqueda y gestión del catálogo CABYS, así como estadísticas del tipo de cambio y funcionalidades personalizadas.',
    footer: '¡Explora las funcionalidades y descubre cómo esta herramienta puede ayudarte en tu día a día!'
  });

  const { translate, setDark, dark } = useGlobalContext();

  useEffect(() => {
    const translateContent = async () => {
      if (translate) {
        const title = await translateText('Bienvenido a la aplicación de Gestión Hacienda', 'es', 'en');
        const description = await translateText('Esta aplicación ofrece herramientas avanzadas para la búsqueda y gestión del catálogo CABYS, así como estadísticas del tipo de cambio y funcionalidades personalizadas.', 'es', 'en');
        const footer = await translateText('¡Explora las funcionalidades y descubre cómo esta herramienta puede ayudarte en tu día a día!', 'es', 'en');
        setTranslatedContent({
          title,
          description,
          footer
        });
      }
    };

    translateContent();
  }, [translate]);


  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">{translatedContent.title}</h1>
        <p className="home-description">
          {translatedContent.description}
        </p>
        <p className="home-footer">
          {translatedContent.footer}
        </p>
      </div>
    </div>
  );
};

export default Home;