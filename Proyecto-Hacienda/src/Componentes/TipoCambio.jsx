import React, { useState, useEffect } from "react";
import "../styles/TipoCambio.css";
import translateText from "./translate";
import { useGlobalContext } from "./GlobalContext";

function TipoCambio() {
  const [dolar, setDolar] = useState({});
  const [euro, setEuro] = useState({});
  const [conversion, setConversion] = useState({ dolares: null, colones: null });
  const [translatedContent, setTranslatedContent] = useState({
    tipoCambioDolar: "Tipo de Cambio del Dólar",
    venta: "Venta",
    compra: "Compra",
    cargandoDolar: "Cargando datos del dólar...",
    tipoCambioEuro: "Tipo de Cambio del Euro",
    dolares: "Dólares",
    colones: "Colones",
    cargandoEuro: "Cargando datos del euro...",
  });

  const { translate, dark } = useGlobalContext();

  useEffect(() => {
    obtenerTipoCambio();
  }, []);

  useEffect(() => {
    const translateContent = async () => {
      if (translate) {
        const tipoCambioDolar = await translateText("Tipo de Cambio del Dólar", "es", "en");
        const venta = "Sale";
        const compra = await translateText("Compra", "es", "en");
        const cargandoDolar = await translateText("Cargando datos del dólar...", "es", "en");
        const tipoCambioEuro = await translateText("Tipo de Cambio del Euro", "es", "en");
        const dolares = await translateText("Dólares", "es", "en");
        const colones = await translateText("Colones", "es", "en");
        const cargandoEuro = await translateText("Cargando datos del euro...", "es", "en");
        setTranslatedContent({
          tipoCambioDolar,
          venta,
          compra,
          cargandoDolar,
          tipoCambioEuro,
          dolares,
          colones,
          cargandoEuro,
        });
      }
    };

    translateContent();
  }, [translate]);

  const obtenerTipoCambio = async () => {
    try {
      // Obtiene el tipo de cambio del dólar
      const responseDolar = await fetch("https://api.hacienda.go.cr/indicadores/tc/dolar");
      if (!responseDolar.ok) {
        throw new Error("Error al obtener el tipo de cambio del dólar");
      }
      const dataDolar = await responseDolar.json();
      setDolar(dataDolar);

      // Obtiene el tipo de cambio del euro
      const responseEuro = await fetch("https://api.hacienda.go.cr/indicadores/tc/euro");
      if (!responseEuro.ok) {
        throw new Error("Error al obtener el tipo de cambio del euro");
      }
      const dataEuro = await responseEuro.json();
      setEuro(dataEuro);

      // Calcula la conversión
      if (dataEuro.valor && dataDolar.compra.valor) {
        const conversionColones = dataEuro.valor * dataDolar.compra.valor;
        setConversion({ dolares: dataEuro.valor, colones: conversionColones });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="tipo-cambio-container">
      <div className={`tipo-cambio ${dark ? "dark-theme" : ""}`}>
        <h3>{translatedContent.tipoCambioDolar}</h3>
        {dolar.venta && dolar.compra ? (
          <>
            <p>
              <b>{translatedContent.venta}:</b> {dolar.venta.valor}
            </p>
            <p>
              <b>{translatedContent.compra}:</b> {dolar.compra.valor}
            </p>
          </>
        ) : (
          <p>{translatedContent.cargandoDolar}</p>
        )}
      </div>
      <div className={`tipo-cambio ${dark ? "dark-theme" : ""}`}>
        <h3>{translatedContent.tipoCambioEuro}</h3>
        {conversion.dolares && conversion.colones ? (
          <>
            <p>
              <b>{translatedContent.dolares}:</b> {conversion.dolares}
            </p>
            <p>
              <b>{translatedContent.colones}:</b> {conversion.colones}
            </p>
          </>
        ) : (
          <p>{translatedContent.cargandoEuro}</p>
        )}
      </div>
    </div>
  );
}

export default TipoCambio;