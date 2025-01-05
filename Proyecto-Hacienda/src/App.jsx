import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
//import Navbar from "./Componentes/Navbar";
import Sidebar from "./Componentes/Sidebar";
import MainContent from "./Componentes/MainContent";
import Logeo from "./Logeo/Logeo";
import Registro from "./Logeo/Registro";
import DetalleCabys from "./CuerpoElder/DetalleSearch";
import "./App.css";

function App() {
  const [content, setContent] = useState("default");

  const changeContent = (section) => {
    setContent(section);
  };

  return (
    <div className="app-container">
      <Sidebar changeContent={changeContent} />
      <main className="main-content">
        <Routes>
          <Route
            path="/DetalleCabys/:descripcion/param1/:param1/param2/:param2/param3/:param3"
            element={<DetalleCabys />}
          />
          <Route path="/" element={<Navigate to="/app" />} />
          <Route path="/logeo" element={<Logeo />} />
          <Route path="/registro" element={<Registro />} />
         
          <Route
            path="/app"
            element={<MainContent content={content} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;