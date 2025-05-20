import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AppLayout from "../../layouts/AppLayout";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from "@mui/material";

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

function Activity() {
  const [value, setValue] = React.useState(0);

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
      <Box sx={{ marginTop: "55px" }}>
        <CustomTabPanel value={value} index={0}>
          <Typography variant="h3" sx={{ fontSize: 20 }} mb={1}>
            Daftar Pemasukan
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
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Typography variant="h3" sx={{ fontSize: 20 }} mb={1}>
            Daftar Pengeluaran
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
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Typography variant="h3" sx={{ fontSize: 20 }} mb={1}>
            Daftar Pemasukan dan Pengeluaran
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
        </CustomTabPanel>
      </Box>
    </AppLayout>
  );
}

export default Activity;
