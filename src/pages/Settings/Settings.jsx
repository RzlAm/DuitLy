import { Box, Stack, Typography, Button, List, ListItem, ListItemAvatar, Avatar, ListItemText, Switch, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import AppLayout from "../../layouts/AppLayout";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Backup, CloudUpload, DarkMode, Download, Restore } from "@mui/icons-material";
import logo from "../../assets/logo/logo-bg-white.png";
import { exportTransactions, importTransactions, getTheme, setTheme } from "../../helpers/StorageHelper";

function Settings({ toggleTheme, currentTheme }) {
  const [dark, setDark] = useState(getTheme() === "dark" && true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openImportDialog, setOpenImportDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [version, setVersion] = useState(null);
  const [versionError, setVersionError] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/RzlAm/DuitLy/releases/latest")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal ambil versi");
        return res.json();
      })
      .then((data) => {
        if (data?.tag_name) {
          setVersion(data.tag_name);
        } else {
          setVersionError("Versi terbaru tidak ditemukan");
        }
      })
      .catch((err) => setVersionError(err.message));
  }, []);

  const handleDarkSwitch = (event) => {
    setDark(event.target.checked);
    toggleTheme();
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSuccess(false);
    setOpenError(false);
  };

  const handleExport = () => {
    try {
      exportTransactions();
      setSuccess("Berhasil export data backup");
      setOpenSuccess(true);
    } catch (error) {
      setError("Gagal export data backup");
      setOpenError(true);
    }

    setTimeout(() => {
      setSuccess("");
      setError("");
      setOpenSuccess(false);
      setOpenError(false);
    }, 3500);
  };

  const handleFileInput = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileName = file.name.toLowerCase();
    const isJson = fileName.endsWith(".json");

    if (!isJson) {
      setError("File harus berekstensi .json");
      setOpenError(true);
      setTimeout(() => {
        setError("");
        setOpenError(false);
      }, 3500);
      return;
    }

    setSelectedFile(file);
    setOpenImportDialog(true);
  };

  const handleImportConfirm = () => {
    setOpenImportDialog(false);
    try {
      if (!selectedFile) return;

      importTransactions(selectedFile);
      setSuccess("Data berhasil di import");
      setOpenSuccess(true);
      setTimeout(() => {
        setSuccess("");
        setOpenSuccess(false);
      }, 3500);
    } catch (err) {
      setError("Gagal import data");
      setOpenError(true);
      setTimeout(() => {
        setError("");
        setOpenError(false);
      }, 3500);
    }
  };

  const handleImportCancel = () => {
    setSelectedFile(null);
    setOpenImportDialog(false);
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

          {error && (
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={openError} autoHideDuration={3000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error" variant="filled" sx={{ color: "white", width: "100%" }}>
                {error}
              </Alert>
            </Snackbar>
          )}
          {success && (
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={openSuccess} autoHideDuration={3000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="success"
                variant="filled"
                sx={{
                  color: "white",
                  width: "100%",
                  bgcolor: "primary.main",
                }}
              >
                {success}
              </Alert>
            </Snackbar>
          )}

          {/* Dialog konfirmasi import */}
          <Dialog open={openImportDialog} onClose={handleImportCancel}>
            <DialogTitle>Import Data?</DialogTitle>
            <DialogContent>
              <DialogContentText>Apakah kamu yakin ingin mengimport data backup dari file ini? Data sebelumnya akan tertimpa.</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleImportCancel}>Batal</Button>
              <Button onClick={handleImportConfirm} color="primary">
                Ya, Import
              </Button>
            </DialogActions>
          </Dialog>

          {/* List Setting */}
          <List>
            {/* Dark Mode */}
            <ListItem sx={{ pl: 0 }}>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" width="100%">
                <ListItemAvatar sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar sx={{ color: "white", bgcolor: "#888" }}>
                    <DarkMode />
                  </Avatar>
                  <ListItemText primary="Mode gelap" secondary="Aktifkan mode gelap." />
                </ListItemAvatar>
                <Switch checked={dark} onChange={handleDarkSwitch} />
              </Stack>
            </ListItem>

            {/* Export */}
            <ListItem sx={{ pl: 0 }}>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" width="100%">
                <ListItemAvatar sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar sx={{ color: "white", bgcolor: "dodgerblue" }}>
                    <Backup />
                  </Avatar>
                  <ListItemText primary="Backup Data" secondary="Unduh file backup." />
                </ListItemAvatar>
                <Button size="small" onClick={handleExport} variant="contained" startIcon={<Download />}>
                  Export
                </Button>
              </Stack>
            </ListItem>

            {/* Import */}
            <ListItem sx={{ pl: 0 }}>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" width="100%">
                <ListItemAvatar sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar sx={{ color: "white", bgcolor: "secondary.main" }}>
                    <Restore />
                  </Avatar>
                  <ListItemText primary="Import Data Backup" secondary="Import file backup." />
                </ListItemAvatar>
                <Button size="small" component="label" variant="contained" startIcon={<CloudUpload />}>
                  Import
                  <VisuallyHiddenInput onChange={handleFileInput} type="file" accept="application/json" />
                </Button>
              </Stack>
            </ListItem>
          </List>

          {/* Tentang Aplikasi */}
          <Box display="flex" alignItems="center" justifyContent="center" gap={3} mt={6}>
            <img src={logo} alt="DuitLy Logo" width="100" height="100" style={{ borderRadius: "50%" }} />
            <Box>
              <Typography variant="h5" fontWeight={700} color="primary.main">
                DuitLy
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {version ? "Version: " + version : versionError ? "Version: err" : "Loading version..."}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Kontribusi:{" "}
                <a href="https://github.com/RzlAm/DuitLy" target="_blank" rel="noopener noreferrer">
                  GitHub DuitLy
                </a>
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Box>
    </AppLayout>
  );
}

export default Settings;
