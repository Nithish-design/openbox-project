import React, { ReactNode, createContext, useContext } from "react";

const ThemeContext = createContext(undefined);

export const ThemeProvider = ({
  children,
}) => {
  const [theme, setTheme] = React.useState("light");

  const toggleTheme = (val) => {
    setTheme(val);
  };

  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Create a hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useAuth must be used within an ThemeProvider");
  }
  return context;
};
