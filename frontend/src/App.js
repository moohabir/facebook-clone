import {
  BrowserRouter as Router,
  useNavigate,
  Route,
  Routes,
} from 'react-router-dom';

//import './App.css';

import './style.css';
import Posts from './components/Posts';
import Users from './components/Users';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import Login from './components/Login/Login';

import { useContext } from 'react';
import { UserAuthContext } from './context/UserAuthContext';
import { Typography } from '@mui/material';
import Register from './components/Register';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import { DarkModeContext } from './context/DarkModeContext';
import Footer from './Footer';
import Comments from './Comments';
import Singlepost from './components/Singlepost';
//import { UserAuthContext } from './context/UserAuthContext';

function App() {
  const { currentUser } = useContext(UserAuthContext);
  const { darkMode, togle } = useContext(DarkModeContext);
  //const navigate = useNavigate();

  return (
    <div
      className={darkMode ? 'dark' : 'light'}
      style={{
        color: '#1c1e21',
        height: '100vh',

        lineHeight: '1.34px',
        margin: '0',
        padding: '0',
        width: '100%',
      }}
    >
      <Router>
        {currentUser && <Navbar />}

        <Routes>
          <Route
            exact
            path="/login"
            element={<Login />}
          />

          <Route
            exact
            path="/register"
            element={<Register />}
          />
          <Route
            exact
            path="/forgetpassword"
            element={<ForgetPassword />}
          />
          <Route
            path="/posts"
            element={<Posts />}
          />
          <Route
            path="/posts/:id"
            element={<Singlepost />}
          />
          <Route
            path="/comments"
            element={<Comments />}
          />
          <Route
            path="/users"
            element={<Users />}
          />
          <Route
            exact
            path="/"
            element={<Home />}
          />
          <Route
            exact
            path="/posts/create"
            element={<CreatePost />}
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
