// src/Componentes/MainContent.jsx
import React from 'react';
import SumaComponent from './Suma';  // Asegúrate de importar el componente Suma

function MainContent({ content }) {
    const renderContent = () => {
        switch (content) {
            case 'section1':
                return <SumaComponent />;  // Renderiza el componente Suma
            case 'section2':
                return <div>Section 2 content</div>;
            case 'section3':
                return <div>Section 3 content</div>;
            default:
                return <div>Welcome to the default section</div>;
        }
    };

    return <SumaComponent />;
}

export default MainContent;
