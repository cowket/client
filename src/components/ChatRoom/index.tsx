import React from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import './style.scss';

const ChatRoom = () => {
  return (
    <div className="channelRoomContainer">
      <div className="messageBox">chatList</div>
      <div className="inputBox">
        <Input />
        <Button>입력</Button>
      </div>
    </div>
  );
};

export default ChatRoom;
