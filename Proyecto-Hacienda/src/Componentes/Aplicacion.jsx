import React, { useState, useEffect } from "react";
import { SearchBar, Inf2 } from "./TipoCambio";

function Aplicacion() {
  const [dolar, setDolar] = useState(""); // Estado para mostrar el valor del dólar y euro
  const [apiResponse, setApiResponse] = useState(""); // Estado para el resultado de la búsqueda

  // Convierte un objeto en texto legible
  const formatResponse = (data) => {
    if (typeof data === "object" && data !== null) {
      return Object.entries(data)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n");
    }
    return data.toString();
  };

  // Llama a la API utilizando $.ajax para buscar información por identificación
  const handleSearch = (text) => {
    const apiUrl = text.includes("codigo")
      ? `https://api.hacienda.go.cr/fe/cabys?codigo=${text}`
      : `https://api.hacienda.go.cr/fe/cabys?q=${text}`;

    $.ajax({
      url: apiUrl,
      method: "GET",
      success: (response) => {
        setApiResponse(formatResponse(response)); // Guarda la respuesta en formato legible
      },
      error: (xhr) => {
        console.error("Error al buscar:", xhr.statusText);
        setApiResponse("Error al obtener datos de la API.");
      },
    });
  };

  // Llama a la API utilizando $.ajax para obtener el valor del dólar y euro
  const verdolar = () => {
    const dolarUrl = "https://api.hacienda.go.cr/indicadores/tc/dolar";
    const euroUrl = "https://api.hacienda.go.cr/indicadores/tc/euro";

    $.ajax({
      url: dolarUrl,
      method: "GET",
      success: (dolarResponse) => {
        $.ajax({
          url: euroUrl,
          method: "GET",
          success: (euroResponse) => {
            const formattedData = `Dólar\nCompra: ${dolarResponse.compra}\nVenta: ${dolarResponse.venta}\n\nEuro\nCompra: ${euroResponse.compra}\nVenta: ${euroResponse.venta}`;
            setDolar(formattedData); // Almacena los datos formateados
          },
          error: (xhr) => {
            console.error(
              "Error al obtener el valor del euro:",
              xhr.statusText
            );
            setDolar("Error al obtener el valor del euro.");
          },
        });
      },
      error: (xhr) => {
        console.error("Error al obtener el valor del dólar:", xhr.statusText);
        setDolar("Error al obtener el valor del dólar.");
      },
    });
  };

  useEffect(() => {
    verdolar(); // Llama automáticamente a verdolar al montar el componente
  }, []);

  return (
    <div
      className="App"
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        backgroundColor: "#f4f4f4",
        height: "100vh",
        margin: "0",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#333",
          marginBottom: "20px",
        }}
      >
        Aplicación de Búsqueda y Tipo de Cambio
      </h1>
      <SearchBar onSearch={handleSearch} /> {/* Barra de búsqueda */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        {/* Muestra el resultado del tipo de cambio */}
        <Inf2 texto={dolar} />
        {/* Muestra el resultado de la búsqueda */}
        <Inf2 texto={apiResponse} />
      </div>
    </div>
  );
}

export default Aplicacion;
