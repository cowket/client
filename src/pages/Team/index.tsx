import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Input } from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import Card from 'components/Team/Card';
import './style.scss';

const Team = () => {
  const history = useHistory();
  const [showMyList, setShowMyList] = useState<boolean>(false);
  const [showTeamModal, setShowTeamModal] = useState<boolean>(false);
  const test = [
    { image: '', roomName: '구글구글' },
    { image: '', roomName: '구글구글' },
    { image: '', roomName: '구글구글' },
    { image: '', roomName: '구글구글' },
    { image: '', roomName: '구글구글' },
  ];

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
        <Button>팀 추가하기</Button>
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
            {test.map((info) => (
              <Card key={info.roomName} {...info} join />
            ))}
          </div>
        )}
      </div>
      <div className="searchList">
        <p className="title">검색결과</p>
        <div className="cardList">
          {test.map((info) => (
            <Card key={info.roomName} {...info} join={false} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
