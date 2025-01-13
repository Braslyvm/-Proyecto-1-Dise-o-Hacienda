import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Importar hooks adicionales
import "../styles/Search.css";
import Modal from "./Favoritos";
import { getDocumentsByEmail } from "../Logeo/Autentificacion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../Logeo/Lectura";
import { useGlobalContext } from "./GlobalContext";
import translateText from "./translate";

function Search() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [results, setResults] = useState([]);
  const [resultsEspanol, setResultsEspanol] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [dynamicCategories, setDynamicCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { translate, dark } = useGlobalContext();
  const [searchInput, setSearchInput] = useState("");
  const [translatedContent, setTranslatedContent] = useState({
    busquedaCabys: "Buscador de CABYS de Hacienda",
    ingreseCodigoONombre: "Ingrese código o nombre",
    favoritos: "Favoritos",
    codigo: "Código",
    descripcion: "Descripción",
    impuesto: "Impuesto",
  });

  const { email } = useAuth();
  const userCorreo = email;
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const translateContent = async () => {
      if (translate) {
        const busquedaCabys = await translateText(
          "Buscador de CABYS de Hacienda",
          "es",
          "en"
        );
        const ingreseCodigoONombre = await translateText(
          "Ingrese código o nombre",
          "es",
          "en"
        );
        const favoritos = await translateText("Favoritos", "es", "en");
        const codigo = await translateText("Código", "es", "en");
        const descripcion = await translateText("Descripción", "es", "en");
        const impuesto = await translateText("Impuesto", "es", "en");

        setTranslatedContent({
          busquedaCabys,
          ingreseCodigoONombre,
          favoritos,
          codigo,
          descripcion,
          impuesto,
        });

        const translatedResults = await Promise.all(
          results.map(async (item) => {
            const descripcion = await translateText(
              item.descripcion,
              "es",
              "en"
            );
            const codigo = item.codigo;
            const impuesto = item.impuesto;
            return { ...item, descripcion, codigo, impuesto };
          })
        );

        setResults(translatedResults);
      }
    };

    translateContent();
  }, [translate]);

  useEffect(() => {
    if (location.state?.lastSearch) {
      setSearchInput(location.state.lastSearch);
      handleSearch(location.state.lastSearch);
    }
  }, [location.state]);

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

  const extractCategories = (results) => {
    const categories = results.map((item) => item.categorias).flat();
    return Array.from(new Set(categories));
  };

  const handleSearch = async (nombreOCodigo) => {
    setMessage("");
    const esCodigo = /^\d+$/.test(nombreOCodigo);

    if (translate) {
      nombreOCodigo = await translateText(nombreOCodigo, "en", "es");
    }
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
        setMessage("No se encontraron resultados.");
        return;
      }

      setResultsEspanol(data.cabys);
      setResults(data.cabys);
      setFilteredResults(data.cabys);
      setDynamicCategories(extractCategories(data.cabys));

      if (translate) {
        const translatedResults = await Promise.all(
          data.cabys.map(async (item) => {
            const descripcion = await translateText(
              item.descripcion,
              "es",
              "en"
            );
            const codigo = item.codigo;
            const impuesto = item.impuesto;
            return { ...item, descripcion, codigo, impuesto };
          })
        );
        setResults(translatedResults);
      }
    } catch (error) {
      setMessage("Error al realizar la solicitud.");
      console.error(error);
    }
  };

  const handleCategoryChange = (categoria) => {
    setSelectedCategory(categoria);
    if (categoria === "Todas") {
      setFilteredResults(results);
    } else {
      const filtered = results.filter((item) => item.categorias.includes(categoria));
      setFilteredResults(filtered);
    }
  };

  return (
    <div className={`first-container ${dark ? "dark-theme" : "light-theme"}`}>
      <h2>{translatedContent.busquedaCabys}</h2>
      {message && <div className="warning-message">{message}</div>} {/* Mostrar mensaje al usuario */}
      <div className="search-container">
        <input
          type="text"
          placeholder={translatedContent.ingreseCodigoONombre}
          id="search-input"
          style={{ marginTop: "20px" }}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={(e) =>
            e.key === "Enter" && handleSearch(e.target.value.trim())
          }
        />
        <button
          id="search-button"
          onClick={() => {
            setMessage("");
            if (searchInput) handleSearch(searchInput.trim());
            else setMessage("Por favor, ingrese un criterio de búsqueda.");
          }}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
        <button
          id="favorites-button"
          style={{ marginLeft: "10px" }}
          onClick={toggleModal}
        >
          {translatedContent.favoritos}
        </button>
        <Modal
          isOpen={isModalOpen}
          onClose={toggleModal}
          favorites={favorites}
          setFavorites={setFavorites}
          setResults={setResults}
        />
      </div>

      <div className="search-container">
        <select
          onChange={(e) => handleCategoryChange(e.target.value)}
          value={selectedCategory || ""}
          className="categoria-dropdown"
        >
          <option value="Todas">todas</option>
          {dynamicCategories.map((categoria, index) => (
            <option key={index} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>

      <div className="scrooll">
        <table className="table">
          <thead>
            <tr>
              <th className="codigoDisplay">{translatedContent.codigo}</th>
              <th className="descripcionDisplay">
                {translatedContent.descripcion}
              </th>
              <th className="impuestoDisplay">{translatedContent.impuesto}</th>
            </tr>
          </thead>
            <tbody>
            {results.map((item, index) => (
              <tr key={item.codigo}>
                <td>{item.codigo}</td>
                <td>
                  <Link
                    to={`/DetalleCabys/${resultsEspanol[index].descripcion}/param1/${resultsEspanol[index].impuesto}/param2/${resultsEspanol[index].codigo}/param3/${resultsEspanol[index].categorias}`}
                    state={{ lastSearch: searchInput }}
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
    </div>
  );
}

export default Search;
