// src/Componentes/MainContent.jsx
import React from 'react';
import SumaComponent from './Suma';  // Asegúrate de importar el componente Suma
import Cambio from '../CuerpoElder/App.jsx';  // Importa con la primera letra en mayúscula

function MainContent({ content }) {
    const renderContent = () => {
        switch (content) {
            case 'section1':
                return <SumaComponent />;
            case 'section2':
                return <Cambio />;  // Uso correcto del componente `Cambio`
            case 'section3':
                return <div>Section 3 content</div>;
            default:
                return <div>Welcome to the default section</div>;
        }
    };

    return (
        <div className="main-content-area" style={{ height: '100%' }}>
            <h2>{content === 'default' ? 'Welcome to the main content!' : `Content for ${content}`}</h2>
            {renderContent()}
        </div>
    );
}

export default MainContent;
