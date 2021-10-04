import React from 'react';

type SelectContextType = {
  selectedTeam?: Team;
  selectedChannel?: Channel | TeamParticipant;
  setSelectedTeam: React.Dispatch<React.SetStateAction<Team | undefined>>;
  setSelectedChannel: React.Dispatch<
    React.SetStateAction<Channel | TeamParticipant | undefined>
  >;
};

const initialValue: SelectContextType = {
  selectedTeam: undefined,
  selectedChannel: undefined,
  setSelectedTeam: () => undefined,
  setSelectedChannel: () => undefined,
};

const selectContext = React.createContext<SelectContextType>(initialValue);

export default selectContext;
