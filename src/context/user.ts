import React from 'react';

type UserContextType = {
  userInfo?: User;
  setUserInfo: (info: User) => void;
};

const initialValue: UserContextType = {
  userInfo: undefined,
  setUserInfo: (info: User) => undefined,
};

const userContext = React.createContext<UserContextType>(initialValue);

export default userContext;
