import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ProfileContext from 'context/profile';
import useDesktopSize from 'hooks/useDesktopSize';
import ListBox from 'components/Chat/ListBox';
import ChatRoom from 'components/Chat/ChatRoom';
import Profile from 'components/Chat/Profile';
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
  const [profileId, setProfileId] = useState<number>();
  useEffect(() => {
    // socket.emit('connect', () => console.log('connected....'));
  }, []);

  if (isDesktopSize) {
    return (
      <ProfileContext.Provider
        value={{
          profileId,
          setProfileId,
        }}
      >
        <div
          className="chatContainer"
          style={{
            gridTemplateColumns:
              profileId !== undefined ? '1fr 4fr auto' : '1fr 4fr',
          }}
        >
          <ListBox />
          <ChatRoom />
          {profileId !== undefined && <Profile />}
        </div>
      </ProfileContext.Provider>
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
