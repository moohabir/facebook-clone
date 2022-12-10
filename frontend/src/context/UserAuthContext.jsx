import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const UserAuthContext = createContext({});

//inaad loacal storage samayso waa riski lagu haakin gareyn karo hadaysan expire time lahyn
export const UserAuthContextProvider = ({ children }) => {
  //const [currentUser, setCurrentUser] = useState({});
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <UserAuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserAuthContext.Provider>
  );
};
