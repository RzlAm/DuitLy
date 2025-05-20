import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import { AddCircleOutline, Home, Settings, SwapVert } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

export default function BottomNavigationComponent() {
  const navigate = useNavigate();
  const location = useLocation();

  // Map path jadi value navigasi
  const pathToValue = {
    "/": "home",
    "/add": "add",
    "/activity": "activity",
    "/settings": "settings",
  };

  const valueToPath = {
    home: "/",
    add: "/add",
    activity: "/activity",
    settings: "/settings",
  };

  const [value, setValue] = React.useState(pathToValue[location.pathname] || "home");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(valueToPath[newValue]);
  };

  return (
    <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={1}>
      <BottomNavigation
        sx={{
          maxWidth: "560px",
          mx: "auto",
          px: 2,
          display: "flex",
          flexDirection: "row",
        }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction value="home" label="Beranda" icon={<Home />} />
        <BottomNavigationAction value="add" label="Tambah" icon={<AddCircleOutline />} />
        <BottomNavigationAction value="activity" label="Aktivitas" icon={<SwapVert />} />
        <BottomNavigationAction value="settings" label="Pengaturan" icon={<Settings />} />
      </BottomNavigation>
    </Paper>
  );
}
