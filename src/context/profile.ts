import React from 'react';

type ProfileContextType = {
  profileId?: number;
  setProfileId: (value?: number) => void;
};

const initialValue: ProfileContextType = {
  setProfileId: () => undefined,
  profileId: undefined,
};

const profileContext = React.createContext<ProfileContextType>(initialValue);

export default profileContext;
