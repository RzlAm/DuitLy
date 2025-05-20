import { Box, Stack, Typography, InputLabel, Select, MenuItem, FormControl, TextField, InputAdornment, OutlinedInput, Button, Snackbar, IconButton, Alert } from "@mui/material";
import AppLayout from "../../layouts/AppLayout";
import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { Save } from "@mui/icons-material";
import { addTransaction } from "../../helpers/StorageHelper";
import dayjs from "dayjs";

function Add() {
  const [type, setType] = useState("Income");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(dayjs());
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      if (!type || !amount || !date || !description) {
        throw new Error("Semua field harus diisi");
      }

      const parsedAmount = parseInt(amount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        throw new Error("Nominal harus berupa angka positif");
      }

      addTransaction({
        id: dayjs().valueOf(),
        type: type,
        amount: parseInt(amount),
        date: date.toISOString(),
        description: description.replace(/[\n\r\t]+/g, "").trim(),
      });

      setSuccess("Berhasil menambahkan transaksi");
      setOpen(true);
      setTimeout(() => {
        setSuccess("");
      }, 3500);
    } catch (error) {
      setOpen(true);
      setError("Gagal menambahkan transaksi: ");
      setTimeout(() => {
        setError("");
      }, 3500);
      return;
    }
  };

  return (
    <AppLayout>
      <Box mt={1} p={2}>
        <Typography variant="h6">Tambah</Typography>
        <Typography variant="h6" fontSize={15} color="#555" mb={5}>
          Pemasukan / Pengeluaran
        </Typography>

        {error && (
          <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: "100%" }}>
              {error}
            </Alert>
          </Snackbar>
        )}
        {success && (
          <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: "100%", bgcolor: "primary.main" }}>
              {success}
            </Alert>
          </Snackbar>
        )}

        {/* Form Input */}
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            {/* Jenis */}
            <FormControl fullWidth>
              <InputLabel id="type">Jenis</InputLabel>
              <Select required labelId="type" value={type} label="Jenis" onChange={(e) => setType(e.target.value)}>
                <MenuItem value="Income">Pemasukan</MenuItem>
                <MenuItem value="Expense">Pengeluaran</MenuItem>
              </Select>
            </FormControl>

            {/* Nominal */}
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="nominal">Nominal</InputLabel>
              <OutlinedInput
                required
                type="text"
                value={amount}
                onChange={(e) => {
                  const onlyNums = e.target.value.replace(/\D/g, "");
                  setAmount(onlyNums);
                }}
                onKeyDown={(e) => {
                  if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete" && e.key !== "ArrowLeft" && e.key !== "ArrowRight" && e.key !== "Tab") {
                    e.preventDefault();
                  }
                }}
                id="nominal"
                startAdornment={<InputAdornment position="start">Rp</InputAdornment>}
                label="Nominal"
              />
            </FormControl>

            {/* DatePicker */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                type="date"
                required
                label="Tanggal"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                slotProps={{
                  textField: { fullWidth: true },
                }}
              />
            </LocalizationProvider>
            <TextField required value={description} onChange={(e) => setDescription(e.target.value)} label="Keterangan" fullWidth multiline rows={4} />
            <Stack direction="row" justifyContent={"end"} spacing={1}>
              <Button type="reset\" variant="outlined" color="error" startIcon={<DeleteIcon />}>
                Reset
              </Button>
              <Button type="submit" variant="contained" endIcon={<Save />}>
                Simpan
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </AppLayout>
  );
}

export default Add;
