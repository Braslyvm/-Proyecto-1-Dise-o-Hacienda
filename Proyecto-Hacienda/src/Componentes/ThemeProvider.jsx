import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const ThemeContext = createContext();

// Crear un proveedor de contexto
export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Crear un hook para usar el contexto
export const useTheme = () => useContext(ThemeContext);