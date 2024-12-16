import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Asegúrate de importar Navigate para redirigir
import Navbar from './Componentes/Navbar';
import Sidebar from './Componentes/Sidebar';
import MainContent from './Componentes/MainContent';
import Logeo from './Logeo/Logeo';
import './App.css';

function App() {
    const [content, setContent] = useState('default');

    const changeContent = (section) => {
        setContent(section);
    };

    return (
        <div className="app-container">
            <Routes>
                {/* Redirige de la raíz a la página principal */}
                <Route path="/" element={<Navigate to="/app" />} />

                {/* Página de inicio de sesión */}
                <Route path="/logeo" element={<Logeo />} />

                {/* Página principal de la aplicación */}
                <Route 
                    path="/app" 
                    element={
                        <div className="app-main">
                            <Sidebar changeContent={changeContent} />
                            <main className="main-content">
                                <Navbar />
                                <MainContent content={content} />
                            </main>
                        </div>
                    } 
                />
            </Routes>
        </div>
    );
}

export default App;
