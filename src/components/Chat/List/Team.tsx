import React, { useContext } from 'react';
import teamContext from 'context/team';
import selectContext from 'context/select';
import { useHistory } from 'react-router-dom';
import './style.scss';
import { Avatar } from '@material-ui/core';
import { Add } from '@material-ui/icons';

const Team = () => {
  const history = useHistory();
  const { teamList } = useContext(teamContext);
  const { selectedTeam, setSelectedTeam } = useContext(selectContext);

  return (
    <div className="roomList">
      {selectedTeam &&
        teamList.length > 0 &&
        teamList.map((team) => (
          <Avatar
            key={team.uuid}
            src={team.avatar}
            variant="rounded"
            className="teamAvatar"
            onClick={(e) => setSelectedTeam(team)}
          />
        ))}
      <Avatar
        variant="rounded"
        className="teamAvatar addTeam"
        onClick={() => history.push('/team')}
      >
        <Add />
      </Avatar>
    </div>
  );
};

export default Team;
