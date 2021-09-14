import React from 'react';
import Button from '@material-ui/core/Button';
import './style.scss';

type RoomCardProps = {
  image: string;
  roomName: string;
  join: boolean;
};

const RoomCard = ({ image, roomName, join }: RoomCardProps) => {
  return (
    <div className="roomCardContainer">
      <div className="imgBox">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Photos_icon_%282020%29.svg/250px-Google_Photos_icon_%282020%29.svg.png" />
      </div>
      <p className="roomName"> {roomName}</p>
      <Button color="primary">{join ? '나가기' : '참여'}</Button>
    </div>
  );
};

export default RoomCard;
