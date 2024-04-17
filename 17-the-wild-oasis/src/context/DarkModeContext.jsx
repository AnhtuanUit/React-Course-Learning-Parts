import { useLocalStorageState } from "@src/hooks/useLocalStorageState";
import { createContext, useContext, useEffect } from "react";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setDarkMode] = useLocalStorageState("theme-mode");

  useEffect(function () {
    if (isDarkMode) {
      document.documentElement.classList.remove("light-mode");
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
      document.documentElement.classList.add("light-mode");
    }
  });

  function toggleMode() {
    setDarkMode((isDark) => !isDark);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleMode }}>
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
