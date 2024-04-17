import { createContext, useContext, useState } from "react";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setDarkMode] = useState(false);

  function handleDarkMode(isDarkMod) {
    setDarkMode(isDarkMod);
    document.documentElement.classList.toggle("dark-mode");
    document.documentElement.classList.toggle("light-mode");
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, handleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export const useDarkMode = function () {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("Dark mode context not inside a DarkMode Provider");
  }
  return context;
};

export default DarkModeProvider;
