// src/Componentes/MainContent.jsx
import React from 'react';
import Buscador from './Search.jsx';  // Importa con la primera letra en mayúscula
import Valor from './TipoCambio.jsx';
import Comportamiento from './TipoCambioRango.jsx';
import Ajustes from './Ajustes.jsx';

function MainContent({ content }) {
    const renderContent = () => {
        switch (content) {
            case 'section1':
                return <Buscador />;  // Uso correcto del componente `Cambio`
            case 'section2':
                return <Valor />;
            case 'section3':
                return <Comportamiento />;
            case 'section4':
                return <Ajustes />;
            default:
                return <div>Welcome to the default section</div>;
        }
    };

    return (
        <div className="main-content-area" style={{ height: '100%' }}>
            {renderContent()}
        </div>
    );
}

export default MainContent;
