import React from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes
import { Link } from 'react-router-dom'; // Importa Link
import './Favorito.css'; // Importa el archivo CSS

// Componente Modal
const Favorito = ({ isOpen, onClose, favorites }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Lista de Favoritos</h2>
        <div className="favorites-list">
          {favorites.length > 0 ? (
            favorites.map((item, index) => (
              <div key={index} className="favorite-item">
                <p><strong>Categoría:</strong> {item.Categoria || "Sin categoría"}</p>
                <p><strong>Código:</strong> {item.Codigo || "Sin código"}</p>
                <p><strong>Descripción:</strong> 
                  <Link
                    to={`/DetalleCabys/${item.Descripcion}/param1/${item.Impuesto}/param2/${item.Codigo}/param3/${item.Categoria}`}
                    className="descripcion"
                  >
                    {item.Descripcion || "Sin descripción"}
                  </Link>
                </p>
              </div>
            ))
          ) : (
            <div className="no-favorites">No hay favoritos</div>
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
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      Categoria: PropTypes.string,
      Codigo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      Descripcion: PropTypes.string,
      Impuesto: PropTypes.string, // Asegúrate de que el impuesto está correctamente tipeado
    })
  ).isRequired,
};

export default Favorito;
