import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchBar from '../utils/searchBar';


const MainNavbar = () => {
  return (
    <Box sx={{ flexGrow: 1, paddingBottom: "10vh" }}>
      <AppBar sx={{ backgroundColor: "#3E5879" }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            Library
          </Typography>

          <SearchBar />
          
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MainNavbar;
