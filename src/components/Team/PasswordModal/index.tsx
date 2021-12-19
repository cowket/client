import React, { useState, useContext } from 'react';
import useDesktopSize from 'hooks/useDesktopSize';
import { joinTeam, getMyTeams } from 'api/team';
import { CloseOutlined, ArrowBack } from '@material-ui/icons';
import { IconButton, Button, TextField, Checkbox } from '@material-ui/core';
import teamContext from 'context/team';
import './style.scss';

type AddTeamProps = {
  onClose(): void;
  teamInfo: Team;
};

const AddTeam = ({ onClose, teamInfo }: AddTeamProps) => {
  const [password, setPassword] = useState<string>();
  const { setTeamList, teamList } = useContext(teamContext);

  const isDesktopSize = useDesktopSize();

  const onJoinTeam = () => {
    joinTeam(teamInfo.uuid, password).then((res) => {
      getMyTeams()
        .then((res) => {
          setTeamList(res.map((grant) => grant.team));
        })
        .catch((error) => console.log(error));
    });
    onClose();
  };

  return (
    <div className="modalWrapper">
      <div className="passwordModalContainer">
        <header>
          <div className="title">
            {!isDesktopSize && (
              <IconButton
                size="small"
                onClick={onClose}
                style={{ marginRight: '10px' }}
              >
                <ArrowBack fontSize="small" />
              </IconButton>
            )}
            팀 참여하기
          </div>
          {isDesktopSize && (
            <IconButton size="small" onClick={onClose}>
              <CloseOutlined fontSize="small" />
            </IconButton>
          )}
        </header>
        <desc>{teamInfo.name}팀의 참여 비밀번호를 입력해주세요.</desc>
        <div className="passwordForm">
          <section>
            <TextField
              label="참여 비밀번호"
              variant="outlined"
              size="small"
              margin="normal"
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </section>
          <div className="buttonBox">
            <Button variant="contained" onClick={() => onClose()}>
              취소
            </Button>
            <Button
              type="submit"
              id="LoginForm"
              variant="contained"
              color="primary"
              disabled={!password}
              onClick={onJoinTeam}
            >
              팀 참여하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTeam;
