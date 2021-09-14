import React from 'react';

type TeamContextType = {
  teamList: Team[];
};

const initialValue: TeamContextType = {
  teamList: [],
};

const teamContext = React.createContext<TeamContextType>(initialValue);

export default teamContext;
