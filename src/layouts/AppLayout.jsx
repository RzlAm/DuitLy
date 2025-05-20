import { Fab } from "@mui/material";
import BottomNavigationComponent from "../components/BottomNavigationComponent";
import Box from "@mui/material/Box";
import { Add } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

function AppLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const fabStyle = {
    position: "absolute",
    bottom: 80,
    right: 16,
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
        <BottomNavigationComponent />
      </Box>
    </Box>
  );
}

export default AppLayout;
