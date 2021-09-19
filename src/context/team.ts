import React from 'react';

type TeamContextType = {
  teamList: Team[];
  setTeamList: (teams: Team[]) => void;
};

const initialValue: TeamContextType = {
  teamList: [],
  setTeamList: () => undefined,
};

const teamContext = React.createContext<TeamContextType>(initialValue);

export default teamContext;
