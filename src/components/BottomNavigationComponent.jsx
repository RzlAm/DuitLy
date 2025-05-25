import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import { AddCircleOutline, Home, Settings, SwapVert } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { Box } from "@mui/material";

export default function BottomNavigationComponent() {
  const navigate = useNavigate();
  const location = useLocation();

  // Map path jadi value navigasi
  const pathToValue = {
    "/": "home",
    "/transactions": "transactions",
    "/settings": "settings",
  };

  const valueToPath = {
    home: "/",
    transactions: "/transactions",
    settings: "/settings",
  };

  const [value, setValue] = React.useState(pathToValue[location.pathname] || "home");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(valueToPath[newValue]);
  };

  return (
    <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1 }} elevation={1}>
      <BottomNavigation
        sx={{
          maxWidth: "600px",
          mx: "auto",
          px: 2,
          display: "flex",
          flexDirection: "row",
        }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction value="home" label="Beranda" icon={<Home />} />
        <BottomNavigationAction value="transactions" label="Transaksi" icon={<SwapVert />} />
        <BottomNavigationAction value="settings" label="Pengaturan" icon={<Settings />} />
      </BottomNavigation>
    </Paper>
  );
}
