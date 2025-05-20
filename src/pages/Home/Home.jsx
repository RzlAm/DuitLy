import { Box, Stack, Typography, Avatar, Card, CardContent, List, ListItem, ListItemAvatar, ListItemText, Divider } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import AppLayout from "../../layouts/AppLayout";

function Home() {
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
      <Box mt={1} p={2}>
        <Typography variant="h6" gutterBottom>
          Riwayat Terbaru
        </Typography>

        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "primary.main" }}>
                <AttachMoneyIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Pemasukan dari freelance" secondary="Rp150.000 • 19 Mei 2025" />
          </ListItem>
          <Divider variant="inset" component="li" />

          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "secondary.main" }}>
                <MoneyOffIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Beli domain .com" secondary="Rp120.000 • 18 Mei 2025" />
          </ListItem>
        </List>
      </Box>
    </AppLayout>
  );
}

export default Home;
