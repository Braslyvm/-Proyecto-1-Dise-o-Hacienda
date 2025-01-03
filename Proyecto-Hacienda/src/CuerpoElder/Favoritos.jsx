import React from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes
import './Favorito.css'; // Importa el archivo CSS

// Componente Modal
const Favorito = ({ isOpen, onClose, favorites }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Lista de Favoritos</h2>
        <div>
          {favorites.length > 0 ? (
            favorites.map((item, index) => (
              <div key={index} className="favorite-item">{item}</div>
            ))
          ) : (
            <div>No hay favoritos</div>
          )}
        </div>
        <button onClick={onClose} className="close-button">Cerrar</button>
      </div>
    </div>
  );
};

// Definición de PropTypes
Favorito.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Favorito;
