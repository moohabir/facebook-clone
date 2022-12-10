import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { gapi } from 'gapi-script';
//import jsonwebtoken from 'jsonwebtoken';
import { UserAuthContext } from '../context/UserAuthContext';

import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

//console.log(jsonwebtoken);

function Register() {
  const [users, setUsers] = useState({});
  const [isSignedup, setisSignedup] = useState(false);
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const { currentUser, setCurrentUser } = useContext(UserAuthContext);

  useEffect(() => {
    //userRef.current.focus();
  }, []);

  useEffect(() => {
    //errRef.current.focus();
  }, []);

  const Switchmode = () => {
    setisSignedup((prevSignup) => !prevSignup);
  };

  //halkaan hoose sax state as functoional kana dhig  xog sax

  const Register = async (e) => {
    e.preventDefault();
    await axios
      .post(
        'http://localhost:3001/users/register',
        JSON.stringify({
          username,
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

        //const accessToken = response?.data?.accessToken;

        setUsers({
          username,
          email,
          password,
          //accessToken,
        });

        console.log({ username, email, password });
        setUserName('');
        setEmail('');
        setPassword('');
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);

        // setError(true);
      });
  };

  return (
    <>
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
            <TextField
              type="email"
              name="email"
              value={username}
              required
              onChange={(e) => setUserName(e.target.value)}
              label="Username"
              sx={{
                backgroundColor: 'transparent',
                active: 'blue',
                width: '90%',
                margin: '10px',
                borderRadius: '10',
              }}
            />

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
                type="password"
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
            </div>
            <Button
              variant="contained"
              justify="flex-end"
              type="submit"
              onClick={Register}
              component={Link}
              to="/login"
              sx={{
                width: '90%',
                margin: '10px',
                borderRadius: '10',
                textTransform: 'capitalize',
                fontWeight: 'bold',
                fontSize: '20px',
              }}
            >
              Register
              <span
                style={{ textTransform: 'capitalize', paddingLeft: '5px' }}
              ></span>
            </Button>

            <Button
              variant="contained"
              justify="flex-end"
              //type="submit"
              //onClick={Login}
              component={Link}
              to="/login"
              sx={{
                width: '50%',
                backgroundColor: 'green',
                marginTop: '10px',
                marginBottom: '10px',
                borderRadius: '10',
                //textTransform: 'capitalize',
              }}
            >
              L<span style={{ textTransform: 'lowercase' }}>ogin</span>
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
