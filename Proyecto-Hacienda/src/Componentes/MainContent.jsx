// src/Componentes/MainContent.jsx
import React from 'react';
import SumaComponent from './Suma';  // Asegúrate de importar el componente Suma
import Buscador from '../CuerpoElder/Search.jsx';  // Importa con la primera letra en mayúscula
import Valor from '../CuerpoElder/TipoCambio.jsx';

function MainContent({ content }) {
    const renderContent = () => {
        switch (content) {
            case 'section1':
                return <SumaComponent />;
            case 'section2':
                return <Buscador />;  // Uso correcto del componente `Cambio`
            case 'section3':
                return <Valor />;
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
