import React, { useState, useEffect } from "react";
import "./TipoCambio.css";

function TipoCambio() {
  const [dolar, setDolar] = useState({ venta: null, compra: null });
  const [euro, setEuro] = useState({ dolares: null, colones: null });

  useEffect(() => {
    obtenerTipoCambio();
  }, []);

  const obtenerTipoCambio = async () => {
    try {
      // Obtiene el tipo de cambio del dólar
      const responseDolar = await fetch("https://api.hacienda.go.cr/indicadores/tc/dolar");
      if (!responseDolar.ok) {
        throw new Error("Error al obtener el tipo de cambio del dólar");
      }
      const dataDolar = await responseDolar.json();
      setDolar({
        venta: dataDolar.venta.valor,
        compra: dataDolar.compra.valor,
      });

      // Obtiene el tipo de cambio del euro
      const responseEuro = await fetch("https://api.hacienda.go.cr/indicadores/tc/euro");
      if (!responseEuro.ok) {
        throw new Error("Error al obtener el tipo de cambio del euro");
      }
      const dataEuro = await responseEuro.json();
      setEuro({
        dolares: dataEuro.dolares,
        colones: dataEuro.colones,
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="tipo-cambio-container">
      <div className="tipo-cambio">
        <h3>Tipo de Cambio del Dólar</h3>
        {dolar.venta && dolar.compra ? (
          <>
            <p>
              <b>Venta:</b> {dolar.venta}
            </p>
            <p>
              <b>Compra:</b> {dolar.compra}
            </p>
          </>
        ) : (
          <p>Cargando datos del dólar...</p>
        )}
      </div>
      <div className="tipo-cambio">
        <h3>Tipo de Cambio del Euro</h3>
        {euro.dolares && euro.colones ? (
          <>
            <p>
              <b>Dólares:</b> {euro.dolares}
            </p>
            <p>
              <b>Colones:</b> {euro.colones}
            </p>
          </>
        ) : (
          <p>Cargando datos del euro...</p>
        )}
      </div>
    </div>
  );
}

export default TipoCambio;
