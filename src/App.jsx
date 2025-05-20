import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Add from "./pages/Add/Add";
import Edit from "./pages/Edit/Edit";
import Transactions from "./pages/Transactions/Transactions";
import Settings from "./pages/Settings/Settings";
import { useEffect, useMemo, useState } from "react";
import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { getTheme } from "./helpers/StorageHelper";

const getDesignTokens = (mode) => ({
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  palette: {
    mode,
    primary: {
      main: "#009966",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: mode === "dark" ? "#121212" : "#f1f1f1",
      paper: mode === "dark" ? "#1f1f1f" : "#ffffff",
    },
  },
});

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(prefersDarkMode ? "dark" : "light");
  const [storageTheme, setStorageTheme] = useState(getTheme());

  useEffect(() => {
    setMode(storageTheme);
  }, [storageTheme]);

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/settings" element={<Settings toggleTheme={toggleTheme} currentTheme={mode} />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
