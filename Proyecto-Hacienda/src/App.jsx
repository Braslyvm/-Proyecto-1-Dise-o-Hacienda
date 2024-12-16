import React, { useState } from 'react';
import Navbar from './Componentes/Navbar';
import Sidebar from './Componentes/Sidebar';
import MainContent from './Componentes/MainContent';
import './App.css';

function App() {
    const [content, setContent] = useState('default');

    const changeContent = (section) => {
        setContent(section);
    };

    return (
        <div className="app-container">
            <Sidebar changeContent={changeContent} />
            <main className="main-content">
                <Navbar />
                <MainContent content={content} />
            </main>
        </div>
    );
}

export default App;
