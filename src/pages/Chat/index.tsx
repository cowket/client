import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import useDesktopSize from 'hooks/useDesktopSize';
import ListBox from 'components/Chat/ListBox';
import ChatRoom from 'components/Chat/ChatRoom';
import socketIo from 'socket.io-client';
import './style.scss';

// const socket = socketIo('http://socket.stackunderflow.xyz');

const Chat = (
  props: RouteComponentProps<{
    teamId: string;
    channelId: string;
    chatId: string;
  }>
) => {
  const {
    match: {
      params: { teamId, channelId },
    },
  } = props;
  const isDesktopSize = useDesktopSize();

  useEffect(() => {
    // socket.emit('connect', () => console.log('connected....'));
  }, []);

  if (isDesktopSize) {
    return (
      <div
        className="chatContainer"
        style={{
          gridTemplateColumns: '1fr 4fr',
        }}
      >
        <ListBox />
        <ChatRoom />
      </div>
    );
  }
  return (
    <div
      className="chatContainer"
      style={{
        gridTemplateColumns: '1fr',
      }}
    >
      {channelId ? <ChatRoom /> : <ListBox />}
    </div>
  );
};

export default Chat;
