import React from 'react';

type UserContextType = {
  userInfo?: UserDetail;
  setUserInfo: React.Dispatch<React.SetStateAction<UserDetail | undefined>>;
};

const initialValue: UserContextType = {
  userInfo: undefined,
  setUserInfo: () => undefined,
};

const userContext = React.createContext<UserContextType>(initialValue);

export default userContext;
