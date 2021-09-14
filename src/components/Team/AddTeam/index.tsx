import React, { useState } from 'react';
import { postTeam } from 'api/team';
import { Input, Button } from '@material-ui/core';
import './style.scss';

const AddTeam = () => {
  const [teamName, setTeamName] = useState<string>();
  const onAddTeam = () => {
    if (teamName) {
      postTeam(teamName);
    }
  };
  return (
    <div className="addTeamContainer">
      <p>팀 추가하기</p>
      <div>
        <p>팀 명</p>
        <Input
          value={teamName}
          onChange={(e) => setTeamName(e.currentTarget.value)}
        />
      </div>
      <Button disabled={!teamName} onClick={onAddTeam}>
        팀 생성
      </Button>
    </div>
  );
};

export default AddTeam;
