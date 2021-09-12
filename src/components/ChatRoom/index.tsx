import React from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import ChatItem from 'components/ChatItem';
import './style.scss';

const test: Chat[] = [
  { name: '도혜원', date: new Date(), text: '테스트용' },
  { name: '도혜원', date: new Date(), text: '테스트용' },
  { name: '도혜원', date: new Date(), text: '테스트용' },
  { name: '도혜원', date: new Date(), text: '테스트용' },
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
];

const ChatRoom = () => {
  return (
    <div className="channelRoomContainer">
      <div className="messageBox">
        {test.map((chat) => (
          <ChatItem chat={chat} />
        ))}
      </div>
      <div className="inputBox">
        <Input />
        <Button>입력</Button>
      </div>
    </div>
  );
};

export default ChatRoom;
