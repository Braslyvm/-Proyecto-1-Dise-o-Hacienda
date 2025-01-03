import React from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes

// Componente Modal
const Modal = ({ isOpen, onClose, favorites }) => {
  if (!isOpen) return null;

  return (
    <div style={modalStyles}>
      <div style={modalContentStyles}>
        <h2 style={{ color: 'black' }}>Lista de Favoritos</h2>
        <div style={{ color: 'black' }}>
          {favorites.length > 0 ? (
            favorites.map((item, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>{item}</div>
            ))
          ) : (
            <div>No hay favoritos</div>
          )}
        </div>
        <button onClick={onClose} style={closeButtonStyles}>Cerrar</button>
      </div>
    </div>
  );
};

// Estilos para el modal
const modalStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalContentStyles = {
  background: 'white',
  padding: '30px', // Incrementa el padding
  borderRadius: '10px',
  width: '500px', // Incrementa el ancho
  maxHeight: '80%', // Limita la altura para que no sea demasiado grande
  overflowY: 'auto', // Permite scroll si hay demasiados favoritos
};

// Estilo para el botón de cerrar
const closeButtonStyles = {
  marginTop: '20px',
  padding: '10px 20px',
  backgroundColor: '#007BFF',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

// Definición de PropTypes
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Modal;
