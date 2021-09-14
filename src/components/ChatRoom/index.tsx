import React from 'react';
import Input from '@material-ui/core/Input';
import useDesktopSize from 'hooks/useDesktopSize';
import Button from '@material-ui/core/Button';
import ChatItem from 'components/ChatItem';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import './style.scss';

const test: Chat[] = [
  { name: '도혜원', date: new Date(), text: '테스트용' },
  { name: '도혜원', date: new Date(), text: '테스트용' },
  { name: '도혜원', date: new Date(), text: '테스트용' },
  { name: '도혜원', date: new Date(), text: '테스트용' },
  {
    name: '도혜원',
    date: new Date(),
    text: 'asld;kfjglwaejklwjelgjlkwasjgljdsgkjaskfjglwaejklwjelgjlkwasjgljdsgkjaskfjglwaejklwjelgjlkwasjgljdsgkjaskfjglwaejklwjelgjlkwasjgljdsgkjas;dlgklsadlgkkjasdg',
  },
  { name: '도혜원', date: new Date(), text: '테스트용' },
  { name: '도혜원', date: new Date(), text: '테스트용' },
  {
    name: '도혜원',
    date: new Date(),
    text: 'asld;kfjglwaejklwjelgjlkwasjgljdsgkjas;dlgklsadlgkkjasdg',
  },
  {
    name: '도혜원',
    date: new Date(),
    text: 'asld;kfjglwaejklwjelgjlkwasjgljdsgkjas;dlgklsadlgkkjasdg',
  },
  { name: '도혜원', date: new Date(), text: '테스트용' },
  { name: '도혜원', date: new Date(), text: '테스트용' },
  {
    name: '도혜원',
    date: new Date(),
    text: 'asld;kfjglwaejklwjelgjlkwasjgljdsgkjas;dlgklsadlgkkjasdg',
  },
  {
    name: '도혜원',
    date: new Date(),
    text: 'asld;kfjglwaejklwjelgjlkwasjgljdsgkjas;dlgklsadlgkkjasdg',
  },
  { name: '도혜원', date: new Date(), text: '테스트용' },
  { name: '도혜원', date: new Date(), text: '테스트용' },
  {
    name: '도혜원',
    date: new Date(),
    text: 'asld;kfjglwaejklwjelgjlkwasjgljdsgkjaskfjglwaejklwjelgjlkwasjgljdsgkjaskfjglwaejklwjelgjlkwasjgljdsgkjas;dlgklsadlgkkjasdg',
  },
  {
    name: '도혜원',
    date: new Date(),
    text: 'asld;kfjglwaejklwjelgjlkwasjgljdsgkjaskfjglwaejklwjelgjlkwasjgljdsgkjaskfjglwaejklwjelgjlkwasjgljdsgkjaskfjglwaejklwjelgjlkwasjgljdsgkjas;dlgklsadlgkkjasdg',
  },
  { name: '도혜원', date: new Date(), text: '테스트용' },
  { name: '도혜원', date: new Date(), text: '테스트용' },
  {
    name: '도혜원',
    date: new Date(),
    text: 'asld;kfjglwaejklwjelgjlkwasjgljdsgkjas;dlgklsadlgkkjasdg',
  },
];

const ChatRoom = () => {
  const isDesktopSize = useDesktopSize();
  return (
    <div className="channelRoomContainer">
      <div className="targetInfo">
        {!isDesktopSize && <ArrowBackIosOutlinedIcon fontSize="small" />}
        <p>누구누구와의 채팅방</p>
      </div>
      <div className="messageBox">
        {test.map((chat) => (
          <ChatItem chat={chat} />
        ))}
      </div>
      <div className="inputBox">
        <Input
          color="primary"
          maxRows={2}
          multiline
          fullWidth
          disableUnderline
          placeholder="메시지를 입력하세요."
        />
        <div>
          <IconButton className="iconButton" size="medium" color="primary">
            <Icon fontSize="small" color="primary">
              send
            </Icon>
          </IconButton>
          <IconButton className="iconButton" size="medium" color="primary">
            <PhotoCamera fontSize="small" color="primary" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
