import React, { useState } from 'react';
import { postTeam } from 'api/team';
import { Input, Button, Checkbox } from '@material-ui/core';
import './style.scss';

const AddTeam = () => {
  const [teamName, setTeamName] = useState<string>();
  const [checked, setChecked] = useState<boolean>(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const onAddTeam = () => {
    if (teamName) {
      postTeam(teamName);
    }
  };
  return (
    <div className="addTeamContainer">
      <Input
        value={teamName}
        onChange={(e) => setTeamName(e.currentTarget.value)}
        placeholder="팀명을 입력해주세요"
        fullWidth
      />
      <div className="private">
        <Checkbox
          size="small"
          defaultChecked={checked}
          color="primary"
          onChange={onChange}
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
        private team
      </div>
      <Button
        disabled={!teamName}
        onClick={onAddTeam}
        fullWidth
        variant="contained"
      >
        팀 생성
      </Button>
    </div>
  );
};

export default AddTeam;
