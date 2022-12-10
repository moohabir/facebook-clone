import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Grid,
  Toolbar,
  Typography,
} from '@mui/material';

import { UserAuthContext } from '../context/UserAuthContext';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { DarkModeContext } from '../context/DarkModeContext';
function Navbar() {
  //const [user, setUser] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserAuthContext);
  const { darkMode, togle } = useContext(DarkModeContext);

  //const logout = async (res) => {
  //console.log(res);
  //};
  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: '#f0f2f5',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <AppBar
        position="sticky"
        spacing={3}
        style={{ backgroundColor: 'white', color: 'black', width: '100%' }}
      >
        <Toolbar>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px, 20px',
              height: '50px',
              //backgroundColor: '#f0f2f5',

              //backgroundColor: '#ffff',
            }}
          >
            <>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '10px',
                  //justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {/*hoos avatarka ku badal currentUser.image oo lagusoo daray backendska*/}
                <Avatar
                  component={Link}
                  to="/"
                />
                <input
                  placeholder="Search Facebook"
                  style={{
                    backgroundColor: '#F0F2F5',
                    height: '40px',
                    width: '280px',
                    border: 'none',
                    borderRadius: '20px',
                    textIndent: '16px',
                    color: 'black',
                    '&:active': {
                      border: 'none',
                    },
                  }}
                  iconSart={
                    <SearchIcon
                      sx={{ height: '15px', width: '15px', color: 'black' }}
                    />
                  }
                />
              </div>
              {/*<Link to="/posts/:id">Posts</Link>*/}
              {/*<Link to="/login">Login</Link>*/}
            </>
            <div
              style={{
                display: 'flex',
                gap: '30px',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  sx={{ display: { xs: 'none', sm: 'block' } }}
                >
                  <HomeIcon
                    sx={{
                      color: 'blue',
                      '&:hover': {
                        text: 'Home',
                      },
                    }}
                  />
                  <HomeIcon />
                  <Badge badgeContent={9}>
                    <HomeIcon />
                  </Badge>
                  <HomeIcon />
                  <HomeIcon />
                </Grid>
              </Grid>
              <Button
                onClick={togle}
                sx={{ color: 'black' }}
              >
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </Button>
            </div>
            {currentUser ? (
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <AddIcon />
                <Badge
                  badgeContent={3}
                  sx={{ color: 'danger' }}
                >
                  <NotificationsIcon />
                </Badge>
                <Avatar
                  src=""
                  alt=""
                />
                <Typography> {currentUser.username}</Typography>
                <Button
                  onClick={() => setCurrentUser('')}
                  component={Link}
                  to="/login"
                  sx={{ color: 'black' }}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login"
                >
                  <Badge badgeContent="Offline">
                    <Avatar />
                  </Badge>
                  Sign in
                </Button>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
