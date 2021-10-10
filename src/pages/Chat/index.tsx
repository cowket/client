import React, { useEffect, useState, useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ProfileContext from 'context/profile';
import { getMyTeams } from 'api/team';
import teamContext from 'context/team';
import selectContext from 'context/select';
import useDesktopSize from 'hooks/useDesktopSize';
import SocketContext from 'context/socket';
import ListBox from 'components/Chat/ListBox';
import socketIo from 'socket.io-client';
import ChatRoom from 'components/Chat/ChatRoom';
import Profile from 'components/Profile/Tab';
import './style.scss';

const socket = socketIo('http://socket.stackunderflow.xyz/cowket', {
  transports: ['websocket'],
});

const Chat = (
  props: RouteComponentProps<{
    teamId: string;
    channelId: string;
  }>
) => {
  const {
    match: {
      params: { teamId, channelId },
    },
  } = props;
  const isDesktopSize = useDesktopSize();
  const [profileId, setProfileId] = useState<string>();
  const { setTeamList } = useContext(teamContext);
  const { setSelectedTeam, selectedTeam, selectedChannel } =
    useContext(selectContext);

  if (!socket) {
    return <div>connecting....</div>;
  }

  useEffect(() => {
    getMyTeams().then((res) => {
      setTeamList(res.map((team) => team.team_uuid));
      if (res.length > 0) {
        setSelectedTeam(res[0].team_uuid);
      }
    });
  }, []);

  useEffect(() => {
    if (socket && selectedChannel) {
      console.log(selectedChannel);
      socket.emit('joinRoom', { channel_uuid: selectedChannel.uuid });
    }
  }, [selectedChannel]);

  if (isDesktopSize) {
    return (
      <SocketContext.Provider value={{ socket }}>
        <ProfileContext.Provider
          value={{
            profileId,
            setProfileId,
          }}
        >
          <div
            className="chatContainer"
            style={{
              gridTemplateColumns: `300px 4fr ${profileId ? 'auto' : ''}`,
            }}
          >
            <ListBox />
            {selectedChannel && <ChatRoom />}
            {profileId !== undefined && <Profile />}
          </div>
        </ProfileContext.Provider>
      </SocketContext.Provider>
    );
  }

  return (
    <SocketContext.Provider value={{ socket }}>
      <ProfileContext.Provider
        value={{
          profileId,
          setProfileId,
        }}
      >
        <div
          className="chatContainer"
          style={{
            gridTemplateColumns: '1fr',
          }}
        >
          {/* 조건문을 수정할수있을듯 */}
          {profileId && <Profile />}
          {!profileId && channelId && <ChatRoom />}
          {!profileId && !channelId && <ListBox />}
        </div>
      </ProfileContext.Provider>
    </SocketContext.Provider>
  );
};

export default Chat;
