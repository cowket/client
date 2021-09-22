import React, { useContext, useMemo } from 'react';
import Button from '@material-ui/core/Button';
import userContext from 'context/user';
import './style.scss';

type RoomCardProps = {
  teamInfo: Team;
  join: boolean;
};

const RoomItem = ({ teamInfo, join }: RoomCardProps) => {
  const { userInfo } = useContext(userContext);
  const isTeamOwner = useMemo(() => {
    if (userInfo) {
      return userInfo?.id === teamInfo.owner.id;
    }
    return false;
  }, [userInfo]);

  return (
    <div className="roomCardContainer">
      <div className="imgBox">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Photos_icon_%282020%29.svg/250px-Google_Photos_icon_%282020%29.svg.png" />
      </div>
      <div className="roomName">
        <p>{teamInfo.name}</p>
        {isTeamOwner && <span className="owner">팀장</span>}
      </div>
      <Button color="primary">
        {join ? (isTeamOwner ? '팀 삭제' : '나가기') : '참여'}
      </Button>
    </div>
  );
};

export default RoomItem;
