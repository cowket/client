import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import teamContext from 'context/team';
import { Button, Input } from '@material-ui/core';
import useDebounce from 'hooks/useDebounce';
import AddTeam from 'components/Team/AddTeam';
import { searchTeam } from 'api/team';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import Card from 'components/Team/Card';
import './style.scss';

const Team = () => {
  const history = useHistory();
  const [showMyList, setShowMyList] = useState<boolean>(true);
  const [showTeamModal, setShowTeamModal] = useState<boolean>(false);
  const { teamList: myTeamList } = useContext(teamContext);
  const [search, setSearch] = useState<string>('');
  const [searchTeamList, setSearchTeamList] = useState<Team[]>([]);

  const debounceSearch = useDebounce(search, 1000);

  const onSearch = async (search: string) => {
    const result = await searchTeam(search);
    setSearchTeamList(result);
  };

  useEffect(() => {
    if (debounceSearch !== undefined) {
      onSearch(debounceSearch);
    }
  }, [debounceSearch]);

  return (
    <div className="teamContainer">
      <div className="searchBox">
        <div onClick={() => history.goBack()} className="icon">
          <KeyboardBackspaceIcon />
        </div>
        <div className="inputBox">
          <Input
            placeholder="팀 검색하기"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button>검색</Button>
        </div>
        <div className="addTeamBox">
          <Button onClick={() => setShowTeamModal(!showTeamModal)}>
            팀 추가하기
          </Button>
          {showTeamModal && <AddTeam onClose={() => setShowTeamModal(false)} />}
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
            {myTeamList.length ? (
              myTeamList.map((info) => (
                <Card key={info.uuid} teamInfo={info} join />
              ))
            ) : (
              <div>소속된 팀이 없습니다</div>
            )}
          </div>
        )}
      </div>
      <div className="searchList">
        <p className="title">검색결과</p>
        <div className="cardList">
          {searchTeamList.length > 0 ? (
            searchTeamList.map((info) => (
              <Card key={info.uuid} teamInfo={info} join={false} />
            ))
          ) : (
            <div>검색 결과가 없습니다</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Team;
