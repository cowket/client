import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import useColumnSize from 'hooks/useColumnSize';
import ChannelList from 'components/ChannelList';
import ChatRoom from 'components/ChatRoom';
import './style.scss';

const Chat = (
  props: RouteComponentProps<{
    teamId: string;
    channelId: string;
    chatId: string;
  }>
) => {
  const {
    match: {
      params: { teamId, channelId, chatId },
    },
  } = props;
  const columns = useColumnSize();

  if (columns.chatroom === 1) {
    return (
      <div
        className="chatContainer"
        style={{
          gridTemplateColumns: `${columns.chatroom}fr`,
        }}
      >
        {chatId ? <ChatRoom /> : <ChannelList />}
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
