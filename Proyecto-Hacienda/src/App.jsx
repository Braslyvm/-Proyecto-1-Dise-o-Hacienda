import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./CuerpoElder/Home";
import Sidebar from "./Componentes/Sidebar";
import MainContent from "./Componentes/MainContent";
import Navbar from "./Componentes/Navbar";
import Logeo from "./Logeo/Logeo";
import Registro from "./Logeo/Registro";
import DetalleCabys from "./CuerpoElder/DetalleSearch";
import { GlobalProvider } from "./CuerpoElder/GlobalContext";
import { AuthProvider } from "./Logeo/Lectura";
import "./App.css";
import TranslateComponent from "./CuerpoElder/translate";
import Ajustes from "./CuerpoElder/Ajustes";
import Search from "./CuerpoElder/Search";
function App() {
  const [content, setContent] = useState("default");

  const changeContent = (section) => {
    setContent(section);
  };

  return (
    <GlobalProvider>
      <AuthProvider>
        <div className="app-container">
          {useLocation().pathname === "/" ? (
            <Navbar />
          ) : useLocation().pathname !== "/logeo" &&
            useLocation().pathname !== "/Registro" &&
            useLocation().pathname !== "/" ? (
            <Sidebar changeContent={changeContent} />
          ) : null}
          <main className="main-content">
            <Routes>
              <Route
                path="/DetalleCabys/:descripcion/param1/:param1/param2/:param2/param3/:param3"
                element={<DetalleCabys changeContent={changeContent} />}
              />
              <Route path="/" element={<Home />} />
              <Route path="/logeo" element={<Logeo />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/Navbar" element={<Navbar />} />
              <Route path="/translate" element={<TranslateComponent />} />
              <Route path="/ajustes" element={<Ajustes />} />
              <Route path="/app" element={<MainContent content={content} />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </GlobalProvider>
  );
}
const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default App;
