import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const TipoCambioRango = () => {
  const [activeSection, setActiveSection] = useState("rango");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [specificDate, setSpecificDate] = useState("");
  const [chartData, setChartData] = useState(null);

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
            label: "Compra (₡)",
            data: compraValues,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: true,
          },
          {
            label: "Venta (₡)",
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
            label: "Compra (₡)",
            data: compraValues,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: true,
          },
          {
            label: "Venta (₡)",
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
      <h2>Comportamiento del Tipo de Cambio del Dólar</h2>

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
          Consulta por rango
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
          Consulta desde fecha específica
        </button>
      </div>

      {/* Sección activa */}
      {activeSection === "rango" && (
        <div>
          <h3>Consulta por rango de fechas</h3>
          <label>
            Fecha de inicio:{" "}
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label style={{ marginLeft: "1rem" }}>
            Fecha de fin:{" "}
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
            Generar gráfico
          </button>
        </div>
      )}

      {activeSection === "fechaEspecifica" && (
        <div>
          <h3>Consulta desde una fecha específica hasta hoy</h3>
          <label>
            Fecha específica:{" "}
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
            Generar gráfico
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
                  text: "Fecha",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "₡ (Colones)",
                },
              },
            },
          }}
        />
      ) : (
        <p>Selecciona opciones para generar el gráfico.</p>
      )}
    </div>
  );
};

export default TipoCambioRango;
