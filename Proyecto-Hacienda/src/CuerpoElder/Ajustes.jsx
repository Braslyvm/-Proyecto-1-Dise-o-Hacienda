import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../CuerpoElder/GlobalContext";
import translateText from '../CuerpoElder/translate';
import "./Ajustes.css";


const Ajustes = () => {
  const { dark, setDark, translate, setTranslate } = useGlobalContext();
  const [translatedContent, setTranslatedContent] = useState({
    ajustes: 'Ajustes',
    temaOscuro: 'Tema Oscuro',
    traducir: 'Traducir a inglés'
  });

  useEffect(() => {
    const translateContent = async () => {
      if (translate) {
        const ajustes = await translateText('Ajustes', 'es', 'en');
        const temaOscuro = await translateText('Tema Oscuro', 'es', 'en');
        const traducir = await translateText('Traducir a español', 'es', 'en');

        setTranslatedContent({
          ajustes,
          temaOscuro,
          traducir
        });
      } else {
        const ajustes = await translateText('Settings', 'en', 'es');
        const temaOscuro = await translateText('Dark Theme', 'en', 'es');
        const traducir = await translateText('Translate to English', 'en', 'es');

        setTranslatedContent({
          ajustes,
          temaOscuro,
          traducir
        });
      }
    };

    translateContent();
  }, [translate]);

  return (
    <div className="ajustes-container" data-theme={dark ? "dark" : "light"}>
      <h2>{translatedContent.ajustes}</h2>
      <div className="ajustes-control">
        <label>
          <input
            type="checkbox"
            checked={dark}
            onChange={(e) => setDark(e.target.checked)}
          />
          {translatedContent.temaOscuro}
        </label>
      </div>
      <div className="ajustes-control">
        <label>
          <input
            type="checkbox"
            checked={translate}
            onChange={(e) => setTranslate(e.target.checked)}
          />
          {translatedContent.traducir}
        </label>
      </div>
    </div>
  );
  
};

export default Ajustes;