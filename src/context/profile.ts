import React from 'react';

type ProfileContextType = {
  profileId?: number;
  setProfileId: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const initialValue: ProfileContextType = {
  setProfileId: () => undefined,
  profileId: undefined,
};

const profileContext = React.createContext<ProfileContextType>(initialValue);

export default profileContext;
