import { Fab } from "@mui/material";
import BottomNavigationComponent from "../components/BottomNavigationComponent";
import Box from "@mui/material/Box";
import { Add } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/next";

function AppLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const fabStyle = {
    position: "fixed",
    bottom: 70,
    left: { xs: "auto", sm: "50%" },
    right: { xs: 18, sm: "auto" },
    transform: { xs: "none", sm: "translate(-50%, 0)" },
  };
  return (
    <Box>
      <Box>
        <Box
          sx={{
            maxWidth: "600px",
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          {children}
        </Box>

        {location?.pathname !== "/add" && (
          <Fab onClick={() => navigate("/add")} sx={fabStyle} aria-label={"Tambah"} color={"primary"}>
            {<Add />}
          </Fab>
        )}
        <SpeedInsights />
        <BottomNavigationComponent />
      </Box>
    </Box>
  );
}

export default AppLayout;
