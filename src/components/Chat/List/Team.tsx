import React from 'react';
import { useHistory } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Settings from '@material-ui/icons/Settings';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import './style.scss';

type TeamProps = {
  teamList: { teamName: string; id: number; img: string }[];
};

const Team = ({ teamList }: TeamProps) => {
  const history = useHistory();

  return (
    <div className="roomList">
      <Select
        labelId="demo-simple-select-label"
        className="teamSelect"
        disableUnderline
        autoWidth

        // onChange={handleChange}
      >
        {teamList.map((team) => (
          <MenuItem value={team.id}>{team.teamName}</MenuItem>
        ))}
      </Select>
      <div className="settingButton" onClick={() => history.push('/team')}>
        <Settings htmlColor="white" />
      </div>
    </div>
  );
};

export default Team;
