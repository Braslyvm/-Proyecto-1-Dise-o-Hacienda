import "./App.css";

import React, { useState, useEffect } from "react";
import { SearchBar, Inf } from "./mundo"; // Asegúrate de que estos archivos estén correctos
import { Inf2 } from "./TipoCambio";

function App() {
  const [dolar, setDolar] = useState({}); // Estado para el valor del dólar y euro
  const [tempJSON, setTempJSON] = useState({}); // "Archivo JSON temporal" en memoria

  // Llama a la API para buscar información por identificación
  const handleSearch = async (text) => {
    try {
      const apiUrl = text.includes("codigo")
        ? `https://api.hacienda.go.cr/fe/cabys?codigo=${text}`
        : `https://api.hacienda.go.cr/fe/cabys?q=${text}`;

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setTempJSON({ busqueda: data }); // Guarda la respuesta de la búsqueda
    } catch (error) {
      console.error("Error al buscar:", error);
    }
  };

  // Llama a la API para obtener el valor del dólar y euro
  const verdolar = async () => {
    try {
      const dolarurl = "https://api.hacienda.go.cr/indicadores/tc/dolar";
      const eurourl = "https://api.hacienda.go.cr/indicadores/tc/euro";

      const [dolarResponse, euroResponse] = await Promise.all([
        fetch(dolarurl),
        fetch(eurourl),
      ]);

      if (!dolarResponse.ok || !euroResponse.ok) {
        throw new Error("Error al obtener los datos");
      }

      const dolarData = await dolarResponse.json();
      const euroData = await euroResponse.json();

      setDolar({ dolar: dolarData, euro: euroData });
    } catch (error) {
      console.error("Error al obtener los datos del dólar o euro:", error);
    }
  };

  useEffect(() => {
    verdolar(); // Llama automáticamente a verdolar al montar el componente
  }, []);

  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} /> {/* Barra de búsqueda */}
      <Inf texto={JSON.stringify(tempJSON, null, 2)} />{" "}
      {/* Muestra el JSON temporal */}
      <Inf2 texto={JSON.stringify(dolar, null, 2)} />{" "}
      {/* Muestra el valor del dólar y euro */}
    </div>
  );
}

export default App;
