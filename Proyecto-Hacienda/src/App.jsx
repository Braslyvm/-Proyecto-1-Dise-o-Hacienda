import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./CuerpoElder/Home";
import Sidebar from "./Componentes/Sidebar";
import MainContent from "./Componentes/MainContent";
import Navbar from "./Componentes/Navbar";
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
      {useLocation().pathname === '/' ? (
        <Navbar />
      ) : (useLocation().pathname !== '/logeo' && useLocation().pathname !== '/registro') ? (
        <Sidebar changeContent={changeContent} />
      ) : null}

      
      <main className="main-content">
        <Routes>
          <Route
            path="/DetalleCabys/:descripcion/param1/:param1/param2/:param2/param3/:param3"
            element={<DetalleCabys />}
          />
          <Route path="/" element={<Home />} />
          <Route path="/logeo" element={<Logeo />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/Navbar" element={<Navbar />} />
         
          <Route
            path="/app"
            element={<MainContent content={content} />}
          />
        </Routes>
      </main>
    </div>
  );
}
const AppWithRouter = () => (
    <Router>
        <App />
    </Router>
);

export default App;