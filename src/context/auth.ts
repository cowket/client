import React from 'react';

type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (flag: boolean) => void;
};

const initialValue: AuthContextType = {
  isLoggedIn: false,
  setIsLoggedIn: () => undefined,
};

const authContext = React.createContext<AuthContextType>(initialValue);

export default authContext;
