import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { DarkModeContextProvider } from './context/DarkModeContext';
import { UserAuthContextProvider } from './context/UserAuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <UserAuthContextProvider>
        <App />
      </UserAuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);
