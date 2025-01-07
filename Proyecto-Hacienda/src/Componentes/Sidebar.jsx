// src/Sidebar.jsx
import React from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

function Sidebar({ changeContent }) {
  const navigate = useNavigate();

  const handleHomeRedirect = () => {
    navigate("/");
  };

    return (
        <div className="sidebar">
            <h2>Menu</h2>
            <ul>
                <li><a href="#" onClick={() => changeContent('section1')}>Buscador</a></li>
                <li><a href="#" onClick={() => changeContent('section2')}>Tipo de cambio</a></li>
                <li><a href="#" onClick={() => changeContent('section3')}>Comportamiento del dólar</a></li>
            </ul>
            <button onClick={handleHomeRedirect}>Cerrar Sesión</button>
        </div>
    );
}

export default Sidebar;
