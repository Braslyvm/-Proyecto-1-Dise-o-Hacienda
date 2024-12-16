// src/Sidebar.jsx
import React from 'react';
import './Sidebar.css';

function Sidebar({ changeContent }) {
    return (
        <div className="sidebar">
            <h2>Menu</h2>
            <ul>
                <li><a href="#" onClick={() => changeContent('section1')}>Sumar</a></li>
                <li><a href="#" onClick={() => changeContent('section2')}>Section 2</a></li>
                <li><a href="#" onClick={() => changeContent('section3')}>Section 3</a></li>
            </ul>
        </div>
    );
}

export default Sidebar;
