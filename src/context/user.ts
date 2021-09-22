import React from 'react';

type UserContextType = {
  userInfo?: User;
  setUserInfo: React.Dispatch<React.SetStateAction<User | undefined>>;
};

const initialValue: UserContextType = {
  userInfo: undefined,
  setUserInfo: () => undefined,
};

const userContext = React.createContext<UserContextType>(initialValue);

export default userContext;
