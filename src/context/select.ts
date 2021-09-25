import React from 'react';

type SelectContextType = {
  selectedTeam?: Team;
  selectedChannel?: string;
  setSelectedTeam: React.Dispatch<React.SetStateAction<Team | undefined>>;
  setSelectedChannel: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const initialValue: SelectContextType = {
  selectedTeam: undefined,
  selectedChannel: undefined,
  setSelectedTeam: () => undefined,
  setSelectedChannel: () => undefined,
};

const selectContext = React.createContext<SelectContextType>(initialValue);

export default selectContext;
