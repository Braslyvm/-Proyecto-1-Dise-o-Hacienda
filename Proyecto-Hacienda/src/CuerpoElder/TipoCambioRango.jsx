import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "./TipoCambioRango.css";
import translateText from '../CuerpoElder/translate';
import { useGlobalContext } from '../CuerpoElder/GlobalContext';

const TipoCambioRango = () => {
  const [activeSection, setActiveSection] = useState("rango");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [specificDate, setSpecificDate] = useState("");
  const [chartData, setChartData] = useState(null);

  const [translatedContent, setTranslatedContent] = useState({
    comportamientoDolar: 'Comportamiento del Tipo de Cambio del Dólar',
    consultaRango: 'Consulta por rango',
    consultaFechaEspecifica: 'Consulta desde fecha específica',
    consultaRangoFechas: 'Consulta por rango de fechas',
    fechaInicio: 'Fecha de inicio',
    fechaFin: 'Fecha de fin',
    generarGrafico: 'Generar gráfico',
    consultaDesdeFecha: 'Consulta desde una fecha específica hasta hoy',
    fechaEspecifica: 'Fecha específica',
    seleccionaOpciones: 'Selecciona opciones para generar el gráfico.',
    compra: 'Compra (₡)',
    venta: 'Venta (₡)',
    fecha: 'Fecha',
    colones: '₡ (Colones)'
  });

  const { translate } = useGlobalContext();

  useEffect(() => {
    const translateContent = async () => {
      if (translate) {
        const comportamientoDolar = await translateText('Comportamiento del Tipo de Cambio del Dólar', 'es', 'en');
        const consultaRango = await translateText('Consulta por rango', 'es', 'en');
        const consultaFechaEspecifica = await translateText('Consulta desde fecha específica', 'es', 'en');
        const consultaRangoFechas = await translateText('Consulta por rango de fechas', 'es', 'en');
        const fechaInicio = await translateText('Fecha de inicio', 'es', 'en');
        const fechaFin = await translateText('Fecha de fin', 'es', 'en');
        const generarGrafico = await translateText('Generar gráfico', 'es', 'en');
        const consultaDesdeFecha = await translateText('Consulta desde una fecha específica hasta hoy', 'es', 'en');
        const fechaEspecifica = await translateText('Fecha específica', 'es', 'en');
        const seleccionaOpciones = await translateText('Selecciona opciones para generar el gráfico.', 'es', 'en');
        const compra = await translateText('Compra (₡)', 'es', 'en');
        const venta = await translateText('Venta (₡)', 'es', 'en');
        const fecha = await translateText('Fecha', 'es', 'en');
        const colones = await translateText('₡ (Colones)', 'es', 'en');
        setTranslatedContent({
          comportamientoDolar,
          consultaRango,
          consultaFechaEspecifica,
          consultaRangoFechas,
          fechaInicio,
          fechaFin,
          generarGrafico,
          consultaDesdeFecha,
          fechaEspecifica,
          seleccionaOpciones,
          compra,
          venta,
          fecha,
          colones
        });
      }
    };

    translateContent();
  }, [translate]);

  const handleFetchDataRange = async () => {
    if (!startDate || !endDate) {
      alert("Por favor selecciona ambas fechas.");
      return;
    }

    try {
      const apiUrl = `https://api.hacienda.go.cr/indicadores/tc/dolar/historico?d=${encodeURIComponent(
        startDate
      )}&h=${encodeURIComponent(endDate)}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`Error al obtener datos: ${response.status}`);
      }

      const data = await response.json();
      const dates = data.map((entry) =>
        new Date(entry.fecha).toLocaleDateString()
      );
      const compraValues = data.map((entry) => entry.compra);
      const ventaValues = data.map((entry) => entry.venta);

      if (data.length === 0) {
        alert("No hay datos disponibles para el rango de fechas seleccionado.");
        setChartData(null);
        return;
      }

      setChartData({
        labels: dates,
        datasets: [
          {
            label: translatedContent.compra,
            data: compraValues,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: true,
          },
          {
            label: translatedContent.venta,
            data: ventaValues,
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            fill: true,
          },
        ],
      });
    } catch (error) {
      console.error("Error al obtener los datos:", error.message);
      alert(`Hubo un error al obtener los datos: ${error.message}`);
    }
  };

  const handleFetchDataFromDate = async () => {
    if (!specificDate) {
      alert("Por favor selecciona una fecha específica.");
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    try {
      const apiUrl = `https://api.hacienda.go.cr/indicadores/tc/dolar/historico?d=${encodeURIComponent(
        specificDate
      )}&h=${encodeURIComponent(today)}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`Error al obtener datos: ${response.status}`);
      }

      const data = await response.json();
      const dates = data.map((entry) =>
        new Date(entry.fecha).toLocaleDateString()
      );
      const compraValues = data.map((entry) => entry.compra);
      const ventaValues = data.map((entry) => entry.venta);

      if (data.length === 0) {
        alert("No hay datos disponibles para el rango de fechas seleccionado.");
        setChartData(null);
        return;
      }

      setChartData({
        labels: dates,
        datasets: [
          {
            label: translatedContent.compra,
            data: compraValues,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: true,
          },
          {
            label: translatedContent.venta,
            data: ventaValues,
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            fill: true,
          },
        ],
      });
    } catch (error) {
      console.error("Error al obtener los datos:", error.message);
      alert(`Hubo un error al obtener los datos: ${error.message}`);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem" }}>
      <h2>{translatedContent.comportamientoDolar}</h2>

      {/* Barra de navegación */}
      <div style={{ display: "flex", marginBottom: "1rem" }}>
        <button
          onClick={() => setActiveSection("rango")}
          style={{
            flex: 1,
            padding: "0.5rem",
            backgroundColor: activeSection === "rango" ? "#4caf50" : "#f1f1f1",
            color: activeSection === "rango" ? "white" : "black",
            border: "none",
            borderRadius: activeSection === "rango" ? "4px 4px 0 0" : "4px",
            cursor: "pointer",
          }}
        >
          {translatedContent.consultaRango}
        </button>
        <button
          onClick={() => setActiveSection("fechaEspecifica")}
          style={{
            flex: 1,
            padding: "0.5rem",
            backgroundColor:
              activeSection === "fechaEspecifica" ? "#2196f3" : "#f1f1f1",
            color: activeSection === "fechaEspecifica" ? "white" : "black",
            border: "none",
            borderRadius:
              activeSection === "fechaEspecifica" ? "4px 4px 0 0" : "4px",
            cursor: "pointer",
          }}
        >
          {translatedContent.consultaFechaEspecifica}
        </button>
      </div>

      {/* Sección activa */}
      {activeSection === "rango" && (
        <div>
          <h3>{translatedContent.consultaRangoFechas}</h3>
          <label>
            {translatedContent.fechaInicio}:{" "}
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label style={{ marginLeft: "1rem" }}>
            {translatedContent.fechaFin}:{" "}
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
          <button
            onClick={handleFetchDataRange}
            style={{
              marginLeft: "1rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {translatedContent.generarGrafico}
          </button>
        </div>
      )}

      {activeSection === "fechaEspecifica" && (
        <div>
          <h3>{translatedContent.consultaDesdeFecha}</h3>
          <label>
            {translatedContent.fechaEspecifica}:{" "}
            <input
              type="date"
              value={specificDate}
              onChange={(e) => setSpecificDate(e.target.value)}
            />
          </label>
          <button
            onClick={handleFetchDataFromDate}
            style={{
              marginLeft: "1rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#2196f3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {translatedContent.generarGrafico}
          </button>
        </div>
      )}

      {chartData ? (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: translatedContent.fecha,
                },
              },
              y: {
                title: {
                  display: true,
                  text: translatedContent.colones,
                },
              },
            },
          }}
        />
      ) : (
        <p>{translatedContent.seleccionaOpciones}</p>
      )}
    </div>
  );
};

export default TipoCambioRango;