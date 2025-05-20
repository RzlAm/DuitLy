import { Box, Stack, Typography, Avatar, Card, CardContent, List, ListItem, ListItemAvatar, ListItemText, Divider } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import AppLayout from "../../layouts/AppLayout";
import { getTransactions } from "../../helpers/StorageHelper";
import { useEffect, useState } from "react";

function Home() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const data = getTransactions();
    if (data.length === 0) {
      setTransactions([]);
      setError("Tidak ada data transaksi");
      setLoading(false);
      return;
    }

    setTransactions(data);
    setError(null);
    setLoading(false);
  }, []);

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
              50.000
            </Typography>
          </Stack>
        </Stack>
        <Divider sx={{ bgcolor: "rgba(255,255,255,.5)" }} />
        <Stack direction="row" justifyContent={"center"} spacing={7} alignItems="center" mt={2} mb={0}>
          <div>
            <Typography variant="h6" fontSize={16}>
              Pengeluaran
            </Typography>
            <Stack direction="row" spacing={0.5} alignItems="center" mb={2}>
              <Typography variant="h6" color="rgba(255,255,255,.6)" fontSize={13}>
                Rp
              </Typography>
              <Typography variant="h6" sx={{ fontSize: 30 }}>
                50.000
              </Typography>
            </Stack>
          </div>
          <div>
            <Typography variant="h6" fontSize={16}>
              Pemasukan
            </Typography>
            <Stack direction="row" spacing={0.5} alignItems="center" mb={2}>
              <Typography variant="h6" color="rgba(255,255,255,.6)" fontSize={13}>
                Rp
              </Typography>
              <Typography variant="h6" sx={{ fontSize: 30 }}>
                50.000
              </Typography>
            </Stack>
          </div>
        </Stack>
      </Box>

      {/* Riwayat Pemasukan dan Pengeluaran */}
      <Box mt={1} p={2} pb={10}>
        <Typography variant="h6" gutterBottom>
          Riwayat Terbaru
        </Typography>

        <List>
          {!loading && transactions.length > 0 ? (
            transactions.slice(0, 20).map((transaction) => (
              <>
                <ListItem key={transaction.id}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: transaction.type === "Expense" ? "secondary.main" : "primary.main" }}>{transaction.type === "Expense" ? <MoneyOffIcon /> : <AttachMoneyIcon />}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={transaction.description} secondary={"Rp" + transaction.amount.toLocaleString("id-ID") + " • " + transaction.date} />
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
      </Box>
    </AppLayout>
  );
}

export default Home;
