import { Box, Stack, Typography, InputLabel, Select, MenuItem, FormControl, TextField, InputAdornment, OutlinedInput, Button, Snackbar, IconButton, Alert } from "@mui/material";
import AppLayout from "../../layouts/AppLayout";
import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import DeleteIcon from "@mui/icons-material/Delete";
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

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

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
        amount: parsedAmount,
        date: date.toISOString(),
        description: description.replace(/[\n\r\t]+/g, "").trim(),
      });

      setSuccess("Berhasil menambahkan transaksi");
      resetForm();
      setOpen(true);
      setTimeout(() => setSuccess(""), 3500);
    } catch (error) {
      setOpen(true);
      setError(error.message);
      setTimeout(() => setError(""), 3500);
    }
  };

  const resetForm = () => {
    setType("Income");
    setAmount("");
    setDate(dayjs());
    setDescription("");
  };

  return (
    <AppLayout>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="id">
        <Box mt={1} p={2} pb={20}>
          <Typography variant="h6" color="primary">
            Tambah
          </Typography>
          <Typography variant="h6" fontSize={15} color="#777" mb={5}>
            Pemasukan / Pengeluaran
          </Typography>

          {error && (
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={open} autoHideDuration={3000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error" variant="filled" sx={{ color: "white", width: "100%" }}>
                {error}
              </Alert>
            </Snackbar>
          )}

          {success && (
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={open} autoHideDuration={3000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" variant="filled" sx={{ color: "white", width: "100%", bgcolor: "primary.main" }}>
                {success}
              </Alert>
            </Snackbar>
          )}

          <form onSubmit={handleSubmit} autoComplete="off">
            <input type="hidden" autoComplete="false" />
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
                  onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
                  onKeyDown={(e) => {
                    const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
                    if (!/[0-9]/.test(e.key) && !allowed.includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  id="nominal"
                  startAdornment={<InputAdornment position="start">Rp</InputAdornment>}
                  label="Nominal"
                />
              </FormControl>

              {/* Date Time Picker */}
              <MobileDateTimePicker
                label="Waktu"
                value={date}
                onChange={(newValue) => newValue && setDate(newValue)}
                slotProps={{
                  textField: { fullWidth: true },
                }}
              />

              {/* Keterangan */}
              <TextField required value={description} onChange={(e) => setDescription(e.target.value)} label="Keterangan" fullWidth multiline rows={4} />

              {/* Tombol */}
              <Stack direction="row" justifyContent="end" spacing={1}>
                <Button onClick={resetForm} type="reset" variant="outlined" color="error" startIcon={<DeleteIcon />}>
                  Reset
                </Button>
                <Button type="submit" variant="contained" endIcon={<Save />}>
                  Simpan
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </LocalizationProvider>
    </AppLayout>
  );
}

export default Add;
