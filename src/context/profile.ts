import React from 'react';

type ProfileContextType = {
  profile?: TeamProfile;
  setProfile: React.Dispatch<React.SetStateAction<TeamProfile | undefined>>;
};

const initialValue: ProfileContextType = {
  setProfile: () => undefined,
  profile: undefined,
};

const profileContext = React.createContext<ProfileContextType>(initialValue);

export default profileContext;
