import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import TeamContext from 'context/team';
import { Button, Input } from '@material-ui/core';
import AddTeam from 'components/Team/AddTeam';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import Card from 'components/Team/Card';
import './style.scss';

const Team = () => {
  const history = useHistory();
  const [showMyList, setShowMyList] = useState<boolean>(true);
  const [showTeamModal, setShowTeamModal] = useState<boolean>(false);
  const teamContext = useContext(TeamContext);

  return (
    <div className="teamContainer">
      <div className="searchBox">
        <div onClick={() => history.goBack()} className="icon">
          <KeyboardBackspaceIcon />
        </div>
        <div className="inputBox">
          <Input placeholder="팀 검색하기" fullWidth />
          <Button>검색</Button>
        </div>
        <div className="addTeamBox">
          <Button onClick={() => setShowTeamModal(!showTeamModal)}>
            팀 추가하기
          </Button>
          {showTeamModal && <AddTeam />}
        </div>
      </div>
      <div className="myList">
        <div className="title">
          내가 속한 팀
          <span onClick={() => setShowMyList(!showMyList)}>
            {showMyList ? (
              <ExpandLessOutlinedIcon />
            ) : (
              <ExpandMoreOutlinedIcon />
            )}
          </span>
        </div>
        {showMyList && (
          <div className="cardList">
            {teamContext.teamList.map((info) => (
              <Card key={info.uuid} teamInfo={info} join />
            ))}
          </div>
        )}
      </div>
      <div className="searchList">
        <p className="title">검색결과</p>
        <div className="cardList">
          {teamContext.teamList.map((info) => (
            <Card key={info.uuid} teamInfo={info} join={false} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;