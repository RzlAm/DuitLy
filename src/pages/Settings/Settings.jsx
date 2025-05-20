import { Box, Stack, Typography, InputLabel, Select, MenuItem, FormControl, TextField, InputAdornment, OutlinedInput, Button, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Switch } from "@mui/material";
import AppLayout from "../../layouts/AppLayout";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import { Backup, CloudUpload, DarkMode, Restore, Save } from "@mui/icons-material";
import logo from "../../assets/logo/logo-bg-white.png";
import { getTheme, setTheme } from "../../helpers/StorageHelper";

function Settings({ toggleTheme, currentTheme }) {
  const [type, setType] = useState("Pemasukan");
  const [dark, setDark] = useState(getTheme() === "dark" && true);
  const [checked, setChecked] = useState(false);

  const handleDarkSwitch = (event) => {
    setDark(event.target.checked);
    toggleTheme();

    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  const handleSwitch = (event) => {
    setChecked(event.target.checked);
  };

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <AppLayout>
      <Box mt={1} p={2}>
        <Stack spacing={2}>
          <Typography variant="h6" mb={0}>
            Pengaturan
          </Typography>
          <List>
            <ListItem sx={{ pl: 0 }}>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent={"space-between"} width="100%">
                <div>
                  <ListItemAvatar sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar sx={{ color: "white", bgcolor: "#888" }}>
                      <DarkMode />
                    </Avatar>
                    <ListItemText primary="Mode gelap" secondary="Aktifkan mode gelap." />
                  </ListItemAvatar>
                </div>
                <div>
                  <Switch checked={dark} onChange={handleDarkSwitch} slotProps={{ "aria-label": "controlled" }} />
                </div>
              </Stack>
            </ListItem>
            <ListItem sx={{ pl: 0 }}>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent={"space-between"} width="100%">
                <div>
                  <ListItemAvatar sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar sx={{ color: "white", bgcolor: "dodgerblue" }}>
                      <Backup />
                    </Avatar>
                    <ListItemText primary="Backup Otomatis" secondary="Cadangkan data setiap diupdate." />
                  </ListItemAvatar>
                </div>
                <div>
                  <Switch checked={checked} onChange={handleSwitch} slotProps={{ "aria-label": "controlled" }} />
                </div>
              </Stack>
            </ListItem>
            <ListItem sx={{ pl: 0 }}>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent={"space-between"} width="100%">
                <div>
                  <ListItemAvatar sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar sx={{ color: "white", bgcolor: "secondary.main" }}>
                      <Restore />
                    </Avatar>
                    <ListItemText primary="Import Data Backup" secondary="Kembalikan data dengan file backup." />
                  </ListItemAvatar>
                </div>
                <div>
                  <Button size="small" component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUpload />}>
                    Upload
                    <VisuallyHiddenInput type="file" onChange={(event) => console.log(event.target.files)} multiple />
                  </Button>
                </div>
              </Stack>
            </ListItem>
          </List>
        </Stack>
        {/* Tentang Aplikasi */}
        <Box display="flex" alignItems="center" justifyContent={"center"} gap={3} mt={6}>
          <img src={logo} alt="DuitLy Logo" width="100" height="100" style={{ borderRadius: "50%" }} />
          <Box>
            <Typography variant="h5" mb={1} fontWeight={700} color="primary.main">
              DuitLy
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Versi 1.0.0
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Kontribusi:{" "}
              <a href="https://github.com/yourusername/DuitLy" target="_blank" rel="noopener noreferrer">
                GitHub DuitLy
              </a>
            </Typography>
          </Box>
        </Box>
      </Box>
    </AppLayout>
  );
}

export default Settings;
