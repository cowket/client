import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import useColumnSize from 'hooks/useColumnSize';
import ChannelList from 'components/ChannelList';
import ChatRoom from 'components/ChatRoom';
import socketIo from 'socket.io-client';
import './style.scss';

const socket = socketIo('http://socket.stackunderflow.xyz');

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
  const columns = useColumnSize();

  useEffect(() => {
    // socket.emit('connect', () => console.log('connected....'));
  }, []);

  if (columns.chatroom === 1) {
    return (
      <div
        className="chatContainer"
        style={{
          gridTemplateColumns: `${columns.chatroom}fr`,
        }}
      >
        {channelId ? <ChatRoom /> : <ChannelList />}
      </div>
    );
  }
  return (
    <div
      className="chatContainer"
      style={{
        gridTemplateColumns: `${columns.channel}fr ${columns.chatroom}fr`,
      }}
    >
      <ChannelList />
      <ChatRoom />
    </div>
  );
};

export default Chat;
