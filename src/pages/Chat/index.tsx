import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import useDesktopSize from 'hooks/useDesktopSize';
import ChannelList from 'components/Chat/ChannelList';
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
          gridTemplateColumns: '1fr 3fr',
        }}
      >
        <ChannelList />
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
      {channelId ? <ChatRoom /> : <ChannelList />}
    </div>
  );
};

export default Chat;
