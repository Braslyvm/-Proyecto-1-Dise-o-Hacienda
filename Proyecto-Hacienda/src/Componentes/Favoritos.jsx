import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'; 
import { Link } from 'react-router-dom'; 
import '../styles/Favorito.css';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteByEmailAndCode } from '../Logeo/Autentificacion';
import { useAuth } from '../Logeo/Lectura';
import translateText from './translate';
import { useGlobalContext } from './GlobalContext';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const Favorito = ({ isOpen, onClose, favorites, setFavorites, setResults }) => { 
  const { email } = useAuth(); 
  const usuario = email;
  const classes = useStyles(); 
  const [results, setResultsE] = useState([]);

  const { translate,dark  } = useGlobalContext();
  const [translatedFavorites, setTranslatedFavorites] = useState({
    listaFav: 'Lista de Favoritos',
    codigo: 'Código',
    descripcion: 'Descripción',
    accion: 'Acción',
    nofav: 'No hay favoritos',
    cerrar: 'Cerrar'
  });

  useEffect(() => {
    const translateFavorites = async () => {
      if (translate) {
        const listaFav = await translateText("Lista de Favoritos", 'es', 'en');
        const codigo = await translateText('Código', 'es', 'en');
        const descripcion = await translateText('Descripción', 'es', 'en');
        const accion = await translateText('Acción', 'es', 'en');
        const nofav = await translateText('No hay favoritos', 'es', 'en');
        const cerrar = await translateText('Cerrar', 'es', 'en');
        setTranslatedFavorites({
          listaFav,
          codigo,
          descripcion,
          accion,
          nofav,
          cerrar
        });

        const translatedCABYS = await Promise.all(favorites.map(async (item) => {
          const descripcion = await translateText(item.Descripcion, 'es', 'en');
          return { ...item, Descripcion: descripcion };
        }));
        setResultsE(translatedCABYS);
      } else {
        setResultsE(favorites);
      }
    };

    translateFavorites();
  }, [translate, favorites]);

  const borrar = async (codigo) => {
    try {
      await deleteByEmailAndCode(usuario, codigo);
      const updatedFavorites = favorites.filter(item => item.Codigo !== codigo);
      setFavorites(updatedFavorites);
      setResults(prevResults => prevResults.filter(item => item.codigo !== codigo));
    } catch (error) {
      console.error("Error al borrar el favorito:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className={`modal-content ${dark ? 'dark-theme' : ''}`}>
        <h2>{translatedFavorites.listaFav}</h2>
        <div className="favorites-list">
          {results.length > 0 ? (
            <table className={`favorites-table ${dark ? 'dark-theme' : ''}`}>
              <thead>
                <tr>
                  <th>{translatedFavorites.codigo}</th>
                  <th>{translatedFavorites.descripcion}</th>
                  <th>{translatedFavorites.accion}</th>
                </tr>
              </thead>
              <tbody>
                {results.map((item, index) => (
                  <tr key={index}>
                    <td className="code-cell">{item.Codigo || "Sin código"}</td>
                    <td className="description-cell">
                      <Link
                        to={`/DetalleCabys/${item.Descripcion}/param1/${item.Impuesto}/param2/${item.Codigo}/param3/${item.Categoria}`}
                        className="descripcion"
                      >
                        {item.Descripcion}
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
            <div className="no-favorites">{translatedFavorites.nofav}</div>
          )}
        </div>
        <button onClick={onClose} className="close-button">{translatedFavorites.cerrar}</button>
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
  setFavorites: PropTypes.func.isRequired,
  setResults: PropTypes.func.isRequired, // Agregar esta propiedad
};

export default Favorito;