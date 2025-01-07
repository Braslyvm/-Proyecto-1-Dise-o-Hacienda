import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Search.css";
import Modal from './Favoritos'; 
import { getDocumentsByEmail } from '../Logeo/Autentificacion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../Logeo/Lectura';

function Search() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorites, setFavorites] = useState([]); 
  const [results, setResults] = useState([]);
  const [tempJSON, setTempJSON] = useState({});

  const { email } = useAuth(); 
  const userCorreo = email;
  const categorias = [
    "Productos agrícolas y alimenticios",
    "Productos químicos",
    "Productos textiles y prendas de vestir",
    "Productos minerales y metales",
    "Máquinas y aparatos",
    "Vehículos",
    "Productos farmacéuticos",
    "Tecnología e informática",
    "Instrumentos ópticos, médicos y de precisión",
    "Muebles y artículos de decoración",
    "Productos plásticos y caucho",
    "Productos de papel y cartón",
    "Productos de madera",
    "Electrodomésticos y equipos eléctricos",
    "Servicios relacionados (como transporte, seguros, etc.)",
  ];

  const fetchFavorites = async () => {
    const favoritos = await getDocumentsByEmail(userCorreo);
    setFavorites(favoritos);
  };

  useEffect(() => {
    fetchFavorites();
  }, [userCorreo]);

  useEffect(() => {
    if (!isModalOpen) {
      fetchFavorites();
    }
  }, [isModalOpen]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSearch = async (nombreOCodigo) => {
    const esCodigo = /^\d+$/.test(nombreOCodigo);
    const apiUrl = esCodigo
      ? `https://api.hacienda.go.cr/fe/cabys?codigo=${encodeURIComponent(
          nombreOCodigo
        )}`
      : `https://api.hacienda.go.cr/fe/cabys?q=${encodeURIComponent(
          nombreOCodigo
        )}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();
      if (!data.cabys || data.cabys.length === 0) {
        alert("No se encontraron resultados.");
        return;
      }

      setResults(data.cabys);
      setTempJSON({ busqueda: data.cabys });
    } catch (error) {
      alert("Error al realizar la solicitud.");
      console.error(error);
    }
  };

  return (
      <div id="root">
        <h2>Buscador de CABYS de Hacienda</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Ingrese código o nombre"
            id="search-input"
            style={{ marginTop: '20px' }}
            onKeyPress={(e) =>
              e.key === "Enter" && handleSearch(e.target.value.trim())
            }
          />
          <button
            id="search-button"
            onClick={() => {
              const input = document.getElementById("search-input").value.trim();
              if (input) handleSearch(input);
              else alert("Por favor, ingrese un criterio de búsqueda.");
            }}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <button
            id="favorites-button"
            style={{ marginLeft: '10px' }}
            onClick={toggleModal}
          >
            Favoritos
          </button>
          <Modal 
            isOpen={isModalOpen} 
            onClose={toggleModal} 
            favorites={favorites} 
            setFavorites={setFavorites} 
            setResults={setResults} 
          />
        </div>
        <div className="busquedacat">
          <select
            onChange={(e) => handleSearch(e.target.value)}
            className="categoria-dropdown"
          >
            <option value="" disabled selected>
              Categorias
            </option>
            {categorias.map((categoria, index) => (
              <option key={index} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Descripción</th>
              <th>Impuesto</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item) => (
              <tr key={item.codigo}>
                <td>{item.codigo}</td>
                <td>
                  <Link
                    to={`/DetalleCabys/${item.descripcion}/param1/${item.impuesto}/param2/${item.codigo}/param3/${item.categorias}`}
                    className="descripcion"
                  >
                    {item.descripcion || "Descripción no disponible"}
                  </Link>
                </td>
                <td className="text-center">{item.impuesto}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
}

export default Search;
