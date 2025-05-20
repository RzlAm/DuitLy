import BottomNavigationComponent from "../components/BottomNavigationComponent";
import Box from "@mui/material/Box";

function AppLayout({ children }) {
  return (
    <Box>
      <Box>
        <Box>{children}</Box>
        <BottomNavigationComponent />
      </Box>
    </Box>
  );
}

export default AppLayout;
