import React from 'react';

type TeamContextType = {
  teamList: Team[];
  setTeamList: React.Dispatch<React.SetStateAction<Team[]>>;
};

const initialValue: TeamContextType = {
  teamList: [],
  setTeamList: () => undefined,
};

const teamContext = React.createContext<TeamContextType>(initialValue);

export default teamContext;
