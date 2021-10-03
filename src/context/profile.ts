import React from 'react';

type ProfileContextType = {
  profileId?: string;
  setProfileId: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const initialValue: ProfileContextType = {
  setProfileId: () => undefined,
  profileId: undefined,
};

const profileContext = React.createContext<ProfileContextType>(initialValue);

export default profileContext;
