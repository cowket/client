import React, { useContext } from 'react';
import teamContext from 'context/team';
import selectContext from 'context/select';
import { useHistory } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Settings from '@material-ui/icons/Settings';
import './style.scss';

const Team = () => {
  const history = useHistory();
  const { teamList } = useContext(teamContext);
  const { selectedTeam, setSelectedTeam } = useContext(selectContext);

  return (
    <div className="roomList">
      {selectedTeam && teamList.length > 0 ? (
        <Select
          labelId="demo-simple-select-label"
          className="teamSelect"
          disableUnderline
          autoWidth
          defaultValue={selectedTeam.uuid}
          onChange={(e) => {
            const targetTeam = teamList?.find(
              (item) => e.target.value === item.uuid
            );
            if (targetTeam) {
              setSelectedTeam(targetTeam);
            }
          }}
        >
          {teamList.length > 0
            ? teamList.map((team) => (
                <MenuItem value={team.uuid}>{team.name}</MenuItem>
              ))
            : '팀 없음'}
        </Select>
      ) : (
        <div>소속된 팀이 없습니다</div>
      )}
      <div className="settingButton" onClick={() => history.push('/team')}>
        <Settings htmlColor="white" />
      </div>
    </div>
  );
};

export default Team;
