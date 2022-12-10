import React, { useContext } from 'react';
import Leftbar from './Leftbar/Leftbar';
import Posts from './Posts';
import Rightbar from './Rightbar/Rightbar';
import Users from './Users';

import { UserAuthContext } from '../context/UserAuthContext';
import Login from './Login/Login';
import Navbar from './Navbar';
import { Grid } from '@mui/material';

function Home() {
  const { currentUser, setCurrentUser } = useContext(UserAuthContext);
  return (
    <div style={{ display: 'flex', backgroundColor: '#f0f2f5' }}>
      {currentUser ? (
        <>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={6}
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              <Leftbar />
            </Grid>
          </Grid>
          <Posts />
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={6}
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              <Rightbar />
            </Grid>
          </Grid>
        </>
      ) : (
        <Login />
      )}

      {/*<Users />*/}
    </div>
  );
}

export default Home;
