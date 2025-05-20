import { Box, Stack, Typography, InputLabel, Select, MenuItem, FormControl, TextField, InputAdornment, OutlinedInput, Button } from "@mui/material";
import AppLayout from "../../layouts/AppLayout";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import { Save } from "@mui/icons-material";

function Add() {
  const [type, setType] = useState("Pemasukan");

  const handleChange = (event) => {
    setType(event.target.value);
  };

  return (
    <AppLayout>
      <Box mt={1} p={2}>
        <Typography variant="h6">Tambah</Typography>
        <Typography variant="h6" fontSize={15} color="#555" mb={5}>
          Pemasukan / Pengeluaran
        </Typography>

        {/* Form Input */}
        <Stack spacing={2}>
          {/* Jenis */}
          <FormControl fullWidth>
            <InputLabel id="type">Jenis</InputLabel>
            <Select labelId="type" value={type} label="Jenis" onChange={handleChange}>
              <MenuItem value="Pemasukan">Pemasukan</MenuItem>
              <MenuItem value="Pengeluaran">Pengeluaran</MenuItem>
            </Select>
          </FormControl>

          {/* Nominal */}
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="nominal">Nominal</InputLabel>
            <OutlinedInput id="nominal" startAdornment={<InputAdornment position="start">Rp</InputAdornment>} label="Nominal" />
          </FormControl>

          {/* DatePicker */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              label="Tanggal"
              defaultValue={dayjs()}
              slotProps={{
                textField: { fullWidth: true },
              }}
            />
          </LocalizationProvider>
          <TextField label="Keterangan" multiline rows={4} />
          <Stack direction="row" justifyContent={"end"} spacing={1}>
            <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
              Reset
            </Button>
            <Button variant="contained" endIcon={<Save />}>
              Simpan
            </Button>
          </Stack>
        </Stack>
      </Box>
    </AppLayout>
  );
}

export default Add;
