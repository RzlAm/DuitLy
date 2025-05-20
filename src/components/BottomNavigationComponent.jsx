import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import { AddCircleOutline, Home, Settings } from "@mui/icons-material";

export default function BottomNavigationComponent() {
  const [value, setValue] = React.useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        value={value}
        width="100%"
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Beranda" icon={<Home />} />
        <BottomNavigationAction label="Tambah" icon={<AddCircleOutline />} />
        <BottomNavigationAction label="Pengaturan" icon={<Settings />} />
      </BottomNavigation>
    </Paper>
  );
}
