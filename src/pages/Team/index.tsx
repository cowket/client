import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Input } from '@material-ui/core';
import './style.scss';

const Team = () => {
  const history = useHistory();
  return (
    <div className="teamContainer">
      <div className="searchBox">
        <div onClick={() => history.goBack()}>뒤로가기버튼</div>
        <div className="inputBox">
          <Input placeholder="팀 검색하기" fullWidth />
          <Button>검색</Button>
        </div>
      </div>
      <div className="myList">
        <p className="title">내가속한 팀</p>
      </div>
      <div className="searchList">
        <p className="title">검색결과</p>
      </div>
    </div>
  );
};

export default Team;
