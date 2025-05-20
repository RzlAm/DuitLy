import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AppLayout from "../../layouts/AppLayout";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Alert, Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, Slide, Snackbar, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { getTransactions, removeTransaction } from "../../helpers/StorageHelper";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
dayjs.locale("id");

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Transactions() {
  const [value, setValue] = React.useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [reload, setReload] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [success, setSuccess] = useState("");
  const [errorDelete, setErrorDelete] = useState("");
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  const navigate = useNavigate();

  const handleClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleEdit = (id) => {
    navigate("/edit/" + id);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const deleteItem = (id) => {
    try {
      removeTransaction(id);
      setReload(!reload);
      handleClose();

      setSuccess("Berhasil menghapus data");
      setOpenSnackbar(true);
      setDeleteId(null);
      setTimeout(() => {
        setSuccess("");
      }, 3500);
    } catch (error) {
      setOpenSnackbar(true);
      setErrorDelete("Gagal menghapus data");
      setDeleteId(null);
      setTimeout(() => {
        setErrorDelete("");
      }, 3500);
      return;
    }
  };

  useEffect(() => {
    setLoading(true);
    const data = getTransactions();
    if (data.length === 0) {
      setTransactions([]);
      setError("Tidak ada data transaksi");
      setLoading(false);
      return;
    }

    const sortedData = [...data].sort((a, b) => dayjs(b.date).diff(dayjs(a.date)));
    const incomeFiltered = sortedData.filter((transaction) => transaction.type === "Income");
    const expenseFiltered = sortedData.filter((transaction) => transaction.type === "Expense");

    setTransactions(data);
    setIncome(incomeFiltered);
    setExpense(expenseFiltered);
    setLoading(false);
  }, [reload]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppLayout>
      <Paper elevation={1} sx={{ position: "fixed", top: "0", left: "0", bgcolor: "white", width: "100%", display: "flex", justifyContent: "center" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="Pemasukan" {...a11yProps(0)} />
          <Tab label="Pengeluaran" {...a11yProps(1)} />
          <Tab label="Semua" {...a11yProps(2)} />
        </Tabs>
      </Paper>

      {errorDelete && (
        <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="error" variant="filled" sx={{ width: "100%" }}>
            {errorDelete}
          </Alert>
        </Snackbar>
      )}
      {success && (
        <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="success" variant="filled" sx={{ width: "100%", bgcolor: "primary.main" }}>
            {success}
          </Alert>
        </Snackbar>
      )}

      <Dialog
        open={openDeleteDialog}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Hapus data ini?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">Data yang dihapus tidak dapat dikembalikan.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Batal</Button>
          <Button onClick={() => deleteItem(deleteId)} color="secondary">
            Hapus
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ marginTop: "55px" }} pb={10}>
        <CustomTabPanel value={value} index={0}>
          <Typography variant="h3" sx={{ fontSize: 20 }} mb={1}>
            Daftar Pemasukan
          </Typography>

          <List>
            {loading ? (
              <ListItem>
                <ListItemText primary="Loading..." />
              </ListItem>
            ) : income.length > 0 ? (
              income.map((transaction) => (
                <ListItem key={transaction.id}>
                  <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="space-between" width="100%">
                    <Stack direction="row" spacing={0} alignItems="center">
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: transaction.type === "Expense" ? "secondary.main" : "primary.main" }}>{transaction.type === "Expense" ? <MoneyOffIcon /> : <AttachMoneyIcon />}</Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={transaction.description} secondary={"Rp" + transaction.amount.toLocaleString("id-ID") + " • " + dayjs(transaction.date).format("D MMMM YYYY")} />
                    </Stack>
                    <div>
                      <IconButton onClick={() => handleDeleteClick(transaction.id)} variant="outlined" aria-label="delete">
                        <Delete fontSize="inherit" color="secondary" />
                      </IconButton>
                      <IconButton aria-label="Edit" onClick={() => handleEdit(transaction.id)}>
                        <Edit fontSize="inherit" color="primary" />
                      </IconButton>
                    </div>
                  </Stack>
                </ListItem>
              ))
            ) : (
              <ListItem sx={{ flexDirection: "column", alignItems: "center", py: 6 }}>
                <Avatar sx={{ bgcolor: "grey.100", color: "grey.500", width: 56, height: 56, mb: 1 }}>
                  <MoneyOffIcon sx={{ fontSize: 32 }} />
                </Avatar>
                <Typography variant="subtitle1" color="text.secondary" align="center">
                  Tidak ada data transaksi
                </Typography>
              </ListItem>
            )}
          </List>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Typography variant="h3" sx={{ fontSize: 20 }} mb={1}>
            Daftar Pengeluaran
          </Typography>

          <List>
            {loading ? (
              <ListItem>
                <ListItemText primary="Loading..." />
              </ListItem>
            ) : expense.length > 0 ? (
              expense.map((transaction) => (
                <ListItem key={transaction.id}>
                  <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="space-between" width="100%">
                    <Stack direction="row" spacing={0} alignItems="center">
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: transaction.type === "Expense" ? "secondary.main" : "primary.main" }}>{transaction.type === "Expense" ? <MoneyOffIcon /> : <AttachMoneyIcon />}</Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={transaction.description} secondary={"Rp" + transaction.amount.toLocaleString("id-ID") + " • " + dayjs(transaction.date).format("D MMMM YYYY")} />
                    </Stack>
                    <div>
                      <IconButton onClick={() => handleDeleteClick(transaction.id)} variant="outlined" aria-label="delete">
                        <Delete fontSize="inherit" color="secondary" />
                      </IconButton>
                      <IconButton aria-label="Edit" onClick={() => handleEdit(transaction.id)}>
                        <Edit fontSize="inherit" color="primary" />
                      </IconButton>
                    </div>
                  </Stack>
                </ListItem>
              ))
            ) : (
              <ListItem sx={{ flexDirection: "column", alignItems: "center", py: 6 }}>
                <Avatar sx={{ bgcolor: "grey.100", color: "grey.500", width: 56, height: 56, mb: 1 }}>
                  <MoneyOffIcon sx={{ fontSize: 32 }} />
                </Avatar>
                <Typography variant="subtitle1" color="text.secondary" align="center">
                  Tidak ada data transaksi
                </Typography>
              </ListItem>
            )}
          </List>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Typography variant="h3" sx={{ fontSize: 20 }} mb={1}>
            Daftar Pemasukan dan Pengeluaran
          </Typography>

          <List>
            {loading ? (
              <ListItem>
                <ListItemText primary="Loading..." />
              </ListItem>
            ) : transactions.length > 0 ? (
              transactions.map((transaction) => (
                <ListItem key={transaction.id}>
                  <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="space-between" width="100%">
                    <Stack direction="row" spacing={0} alignItems="center">
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: transaction.type === "Expense" ? "secondary.main" : "primary.main" }}>{transaction.type === "Expense" ? <MoneyOffIcon /> : <AttachMoneyIcon />}</Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={transaction.description} secondary={"Rp" + transaction.amount.toLocaleString("id-ID") + " • " + dayjs(transaction.date).format("D MMMM YYYY")} />
                    </Stack>
                    <div>
                      <IconButton onClick={() => handleDeleteClick(transaction.id)} variant="outlined" aria-label="delete">
                        <Delete fontSize="inherit" color="secondary" />
                      </IconButton>
                      <IconButton aria-label="Edit" onClick={() => handleEdit(transaction.id)}>
                        <Edit fontSize="inherit" color="primary" />
                      </IconButton>
                    </div>
                  </Stack>
                </ListItem>
              ))
            ) : (
              <ListItem sx={{ flexDirection: "column", alignItems: "center", py: 6 }}>
                <Avatar sx={{ bgcolor: "grey.100", color: "grey.500", width: 56, height: 56, mb: 1 }}>
                  <MoneyOffIcon sx={{ fontSize: 32 }} />
                </Avatar>
                <Typography variant="subtitle1" color="text.secondary" align="center">
                  Tidak ada data transaksi
                </Typography>
              </ListItem>
            )}
          </List>
        </CustomTabPanel>
      </Box>
    </AppLayout>
  );
}

export default Transactions;
