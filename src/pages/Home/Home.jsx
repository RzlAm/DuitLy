import { Box, Stack, Typography, Avatar, Card, CardContent, List, ListItem, ListItemAvatar, ListItemText, Divider } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import AppLayout from "../../layouts/AppLayout";
import { getTransactions } from "../../helpers/StorageHelper";
import { useEffect, useState } from "react";
import { ArrowCircleDown, ArrowCircleUp } from "@mui/icons-material";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");

function Home() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    setLoading(true);
    const data = getTransactions();
    if (data.length === 0) {
      setTransactions([]);
      setError("Tidak ada data transaksi");
      setLoading(false);
      return;
    }

    const totalExpense = data.filter((transaction) => transaction.type === "Expense" && dayjs(transaction.date).isSame(dayjs(), "day")).reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalIncome = data.filter((transaction) => transaction.type === "Income" && dayjs(transaction.date).isSame(dayjs(), "day")).reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalExpenseAllTime = data.filter((transaction) => transaction.type === "Expense").reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalIncomeAllTime = data.filter((transaction) => transaction.type === "Income").reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalBalance = totalIncomeAllTime - totalExpenseAllTime;

    setExpense(totalExpense);
    setIncome(totalIncome);
    setBalance(totalBalance);
    setTransactions(data);
    setError(null);
    setLoading(false);
  }, []);
  console.log(dayjs().toISOString());

  return (
    <AppLayout>
      {/* Section Header */}
      <Box sx={{ bgcolor: "primary.main", color: "white", px: 2, pb: 1, pt: 2, borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }}>
        {/* Akun: Foto + Nama */}
        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
          <Avatar alt="Rizal Amin" src="/path-to-your-photo.jpg" sx={{ width: 33, height: 33 }} />
          <Stack direction="row" spacing={0.5} alignItems="center" mb={2}>
            <Typography variant="h6" color="rgba(255,255,255,.6)" fontSize={13}>
              Rp
            </Typography>
            <Typography variant="h6" fontSize={16}>
              {!loading ? balance.toLocaleString("id-ID") : "Loading..."}
            </Typography>
          </Stack>
        </Stack>
        <Divider sx={{ bgcolor: "rgba(255,255,255,.5)" }} />

        <Stack direction="row" justifyContent="center" alignItems="flex-end" spacing={1} mt={2} mb={0}>
          <Box textAlign="center" flex={1}>
            <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="center" mb={0}>
              <ArrowCircleDown sx={{ color: "rgba(255,255,255,.8)" }} />
              <Typography sx={{ color: "rgba(255,255,255,.8)" }} variant="h6" fontSize={16} fontWeight={500}>
                Pemasukan
              </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="center" mb={2}>
              <Typography variant="h6" color="rgba(255,255,255,.6)" fontSize={13}>
                Rp
              </Typography>
              <Typography variant="h6" sx={{ fontSize: 30, color: "primary.contrastText" }}>
                {!loading ? income.toLocaleString("id-ID") : "Loading..."}
              </Typography>
            </Stack>
          </Box>
          <Box textAlign="center" flexShrink={0} minWidth={80}>
            <Typography sx={{ color: "white" }} variant="h6" textAlign="center" fontSize={16} fontWeight={500} mb={2}>
              Hari Ini
            </Typography>
          </Box>
          <Box textAlign="center" flex={1}>
            <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="center" mb={0}>
              <ArrowCircleUp sx={{ color: "rgba(255,255,255,.8)" }} />
              <Typography sx={{ color: "rgba(255,255,255,.8)" }} variant="h6" fontSize={16} fontWeight={500}>
                Pengeluaran
              </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="center" mb={2}>
              <Typography variant="h6" color="rgba(255,255,255,.6)" fontSize={13}>
                Rp
              </Typography>
              <Typography variant="h6" sx={{ fontSize: 30, color: "secondary.contrastText" }}>
                {!loading ? expense.toLocaleString("id-ID") : "Loading..."}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>

      {/* Riwayat Pemasukan dan Pengeluaran */}
      <Box mt={1} p={2} pb={10}>
        <Typography variant="h6" gutterBottom>
          Riwayat Terbaru
        </Typography>

        <List>
          {!loading && transactions.length > 0 ? (
            transactions
              .sort((a, b) => dayjs(b.date).diff(dayjs(a.date)))
              .slice(0, 20)
              .map((transaction) => (
                <>
                  <ListItem key={transaction.id}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: transaction.type === "Expense" ? "secondary.main" : "primary.main" }}>{transaction.type === "Expense" ? <MoneyOffIcon /> : <AttachMoneyIcon />}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={transaction.description} secondary={"Rp" + transaction.amount.toLocaleString("id-ID") + " • " + dayjs(transaction.date).format("D MMMM YYYY")} />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </>
              ))
          ) : loading ? (
            <ListItem>
              <ListItemText primary="Loading..." />
            </ListItem>
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
        {!loading && transactions.length > 20 && (
          <Box mt={2} textAlign="center">
            <Typography variant="body2" color="text.secondary">
              Ini adalah 20 transaksi terbaru, untuk melihat lebih banyak pergi ke{" "}
              <Link to="/transactions" style={{ color: "#1976d2", textDecoration: "underline" }}>
                halaman transaksi
              </Link>
              .
            </Typography>
          </Box>
        )}
      </Box>
    </AppLayout>
  );
}

export default Home;
