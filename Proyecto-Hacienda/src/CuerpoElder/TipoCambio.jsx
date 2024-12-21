import React, { useState, useEffect } from "react";
import "./TipoCambio.css";

function TipoCambio() {
  const [dolar, setDolar] = useState({ venta: null, compra: null });
  const [euro, setEuro] = useState({ dolares: null, colones: null });

  useEffect(() => {
    obtenerTipoCambio();
  }, []);

  const obtenerTipoCambio = () => {
    // Llama a la API para obtener el tipo de cambio del dólar
    $.ajax({
      url: "https://api.hacienda.go.cr/indicadores/tc/dolar",
      method: "GET",
    })
      .done(function (response) {
        setDolar({ venta: response.venta.valor, compra: response.compra.valor });
      });

    // Llama a la API para obtener el tipo de cambio del euro
    $.ajax({
      url: "https://api.hacienda.go.cr/indicadores/tc/euro",
      method: "GET",
    })
      .done(function (response) {
        setEuro({ dolares: response.dolares.valor, colones: response.colones.valor });
      });
  };

  return (
    <div className="tipo-cambio-container">
      <div className="tipo-cambio">
        <h3>Tipo de Cambio del Dólar</h3>
        {dolar.venta && dolar.compra ? (
          <>
            <p><b>Venta: </b>{dolar.venta}</p>
            <p><b>Compra: </b>{dolar.compra}</p>
          </>
        ) : (
          <p>Cargando datos del dólar...</p>
        )}
      </div>
      <div className="tipo-cambio">
        <h3>Tipo de Cambio del Euro</h3>
        {euro.venta && euro.compra ? (
          <>
            <p><b>Dólares: </b>{euro.dolares}</p>
            <p><b>Colones: </b>{euro.colones}</p>
          </>
        ) : (
          <p>Cargando datos del euro...</p>
        )}
      </div>
    </div>
  );
}

export default TipoCambio;
