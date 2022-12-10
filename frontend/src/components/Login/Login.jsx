import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Avatar } from 'react-chat-engine';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuthContext } from '../../context/UserAuthContext';

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import Footer from '../../Footer';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showpasswortd, setShowpassword] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const { currentUser, setCurrentUser } = useContext(UserAuthContext);

  const toglePassword = () => {
    setShowpassword(!showpasswortd);
  };

  //useEffect(() => {
  //axios.get('http://localhost:3001/users/register').then((response) => {
  // console.log(response);
  // const name = response?.data?.name;
  // console.log(name[0]);
  //setUsers(response.data);
  //console.log(response.data);
  //  });
  //}, []);

  const Login = async (e) => {
    e.preventDefault();
    await axios
      .post(
        'http://localhost:3001/users/login',
        JSON.stringify({
          email,
          password,
        }),
        {
          headers: { 'content-Type': 'application/json' },
        }
      )
      .then((response) => {
        //localStorage.getItem('token');
        //setCurrentUser(response.data);

        const accessToken = response?.data?.accessToken;

        setCurrentUser({
          email,
          password,
          accessToken,
        });

        console.log({ email, password, accessToken });
        setEmail('');
        setPassword('');
        navigate('/');
      })
      .catch((err) => {
        console.log(err);

        setError(true);
      });
  };

  useEffect(() => {
    const timeout = setInterval(() => {
      setError(false);
    }, 3000);
    setTimeout(() => {}, timeout);
  }, []);

  return (
    <>
      {!currentUser && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f0f2f5',
            //minWidth: '500px',
            width: '100%',
            height: '72vh',
            flexDirection: 'row',
            marginTop: '-8px',
            paddingBottom: '112px',
            paddingTop: '72px',
            gap: '50px',

            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: '50px',
              paddingBottom: '50px',
              lineHeight: '1.4px',
              fontSize: '1.2rem',
              //backgroundColor: 'blue',
              marginTop: '-100px',
            }}
          >
            <Typography
              variant="h3"
              color="primary"
              style={{ fontWeight: 'bold' }}
            >
              Facebook
            </Typography>
            <Typography
              variant="h5"
              color="textSecondry"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              Connect with friends and the world<br></br>
              around you on Facebook.
            </Typography>
          </div>

          <div
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: '200px',
              //margin: 'auto',
              height: '350px',
              //backgroundColor: 'blue',
            }}
          >
            <form
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '450px',
                minWidth: '450px',
                borderRadius: '10px',
                border: 'none',
                //marginRight: '200px',
                backgroundColor: 'white',
              }}
            >
              {error && (
                <Typography sx={{ color: 'red', margin: '10px' }}>
                  Password or Email is incorrect or field the fields
                </Typography>
              )}
              <TextField
                type="email"
                name="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                sx={{
                  backgroundColor: 'transparent',
                  active: 'blue',
                  width: '90%',
                  margin: '10px',
                  borderRadius: '10',
                }}
              />
              <div style={{ display: 'flex', width: '90%' }}>
                <TextField
                  type={showpasswortd ? 'text' : 'password'}
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  sx={{
                    backgroundColor: 'transparent',
                    width: '110%',
                    borderRadius: '10',
                  }}
                />
                {/*hoos icon buttonka waa inuu ku dhex jiro password inputka*/}
                <IconButton onClick={toglePassword}>
                  {showpasswortd ? (
                    <VisibilityOffIcon
                      sx={{
                        height: '20px',
                        width: '20px',
                        color: 'black',

                        cursor: 'pointer',
                      }}
                    />
                  ) : (
                    <Visibility
                      sx={{
                        height: '20px',
                        width: '20px',
                        color: 'black',

                        cursor: 'pointer',
                      }}
                    />
                  )}
                </IconButton>
              </div>
              <Button
                variant="contained"
                justify="flex-end"
                type="submit"
                onClick={Login}
                component={Link}
                to="/"
                sx={{
                  width: '90%',
                  margin: '10px',
                  borderRadius: '10',
                  textTransform: 'capitalize',
                  fontWeight: 'bold',
                  fontSize: '20px',
                }}
              >
                Log
                <span
                  style={{ textTransform: 'capitalize', paddingLeft: '5px' }}
                >
                  In
                </span>
              </Button>
              <Button
                style={{
                  marginTop: '10px',
                  fontSize: 'small',

                  backgroundColor: 'white',
                  marginBottom: '20px',
                  variant: 'text',
                  textDecoration: 'none',
                  textTransform: 'capitalize',
                  color: 'blue',
                  '&:hover': {
                    textDecoration: 'underline',
                    color: 'red',
                    //cursor: 'pointer',
                  },
                }}
                component={Link}
                to="/forgetpassword"
              >
                Forgotten
                <span style={{ textTransform: 'lowercase', marginLeft: '5px' }}>
                  password?
                </span>
              </Button>
              <div style={{ display: 'flex', width: '90%' }}>
                <Divider
                  sx={{
                    width: '180px',
                  }}
                />
                <Typography sx={{ color: 'black' }}>or</Typography>
                <Divider
                  sx={{
                    width: '180px',
                  }}
                />
              </div>
              <Button
                variant="contained"
                justify="flex-end"
                //type="submit"
                //onClick={Login}
                component={Link}
                to="/register"
                sx={{
                  width: '50%',
                  //backgroundColor: '#00a400',
                  height: '50px',
                  color: '#fff',
                  marginTop: '10px',

                  fontWeight: 'bold',
                  marginBottom: '50px',
                  backgroundColor: '#42b72a',
                  borderColor: '#42b72a',

                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '17px',

                  lineHeight: '48px',
                  padding: '0 16px',
                  //transition: 200ms cubic-bezier(.08,.52,.52,1) background-color, 200ms cubic-bezier(.08,.52,.52,1) box-shadow, 200ms cubic-bezier(.08,.52,.52,1) transform;
                  textTransform: 'capitalize',
                  ':hover': {
                    background: '#42b74a',
                    cursor: 'pointer',
                  },
                }}
              >
                C
                <span style={{ textTransform: 'lowercase' }}>
                  reate new account
                </span>
              </Button>
            </form>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '2px',
                marginTop: '20px',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: 'black',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                  //marginRight: '200px',
                }}
                component={Link}
                //hadhow badal linkgaan oo ka dhig page samaykiis compoonent ah
                to="/register"
              >
                <strong>Create a Page </strong>
              </Typography>
              <span> for a celebrity, brand or business.</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
