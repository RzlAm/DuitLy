import BottomNavigationComponent from "../components/BottomNavigationComponent";
import Box from "@mui/material/Box";

function AppLayout({ children }) {
  return (
    <Box>
      <Box>
        <Box
          sx={{
            maxWidth: "560px",
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          {children}
        </Box>

        <BottomNavigationComponent />
      </Box>
    </Box>
  );
}

export default AppLayout;
