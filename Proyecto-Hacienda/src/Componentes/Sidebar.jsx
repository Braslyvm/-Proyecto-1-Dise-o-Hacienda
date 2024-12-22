// src/Sidebar.jsx
import React from 'react';
import './Sidebar.css';

function Sidebar({ changeContent }) {
    return (
        <div className="sidebar">
            <h2>Menu</h2>
            <ul>
                <li><a href="#" onClick={() => changeContent('section1')}>Buscador</a></li>
                <li><a href="#" onClick={() => changeContent('section2')}>Tipo de cambio</a></li>
            </ul>
        </div>
    );
}

export default Sidebar;
