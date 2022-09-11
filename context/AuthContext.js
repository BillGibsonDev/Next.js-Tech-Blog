import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthWrapper = ({ children }) => {
  const [ isLoggedIn, setLoggedIn ] = useState(false);
  return (
    <AuthContext.Provider value={{isLoggedIn, setLoggedIn}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  return useContext(AuthContext);
}