import React from 'react';
import PropTypes from 'prop-types'; 
import { Link } from 'react-router-dom'; 
import './Favorito.css';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteByEmailAndCode } from '../Logeo/Autentificacion'; // Importa la función

// Definir estilos con makeStyles
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const Favorito = ({ isOpen, onClose, favorites, setFavorites }) => {
  const usuario = "brasly"; // Correo del usuario (puede ser dinámico)
  const classes = useStyles(); // Aplicar estilos

  // Función borrar
  const borrar = async (codigo) => {
    try {
      await deleteByEmailAndCode(usuario, codigo);
      // Actualizar el estado para eliminar el favorito borrado
      setFavorites(favorites.filter(item => item.Codigo !== codigo));
    } catch (error) {
      console.error("Error al borrar el favorito:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Lista de Favoritos</h2>
        <div className="favorites-list">
          {favorites.length > 0 ? (
            <table className="favorites-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Descripción</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {favorites.map((item, index) => (
                  <tr key={index}>
                    <td className="code-cell">{item.Codigo || "Sin código"}</td>
                    <td className="description-cell">
                      <Link
                        to={`/DetalleCabys/${item.Descripcion}/param1/${item.Impuesto}/param2/${item.Codigo}/param3/${item.Categoria}`}
                        className="descripcion"
                      >
                        {item.Descripcion || "Sin descripción"}
                      </Link>
                    </td>
                    <td className="action-cell">
                      <IconButton 
                        aria-label="delete" 
                        className={classes.margin}
                        onClick={() => borrar(item.Codigo)} // Vincula el evento onClick
                      >
                        <DeleteIcon style={{ color: 'red' }} />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-favorites">No hay favoritos</div>
          )}
        </div>
        <button onClick={onClose} className="close-button">Cerrar</button>
      </div>
    </div>
  );
};

Favorito.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      Categoria: PropTypes.string,
      Codigo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      Descripcion: PropTypes.string,
      Impuesto: PropTypes.string, 
    })
  ).isRequired,
  setFavorites: PropTypes.func.isRequired, // Agregar esta propiedad
};

export default Favorito;
