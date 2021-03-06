import React, { useEffect, useState, useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ProfileContext from 'context/profile';
import { getMyTeams } from 'api/team';
import teamContext from 'context/team';
import selectContext from 'context/select';
import userContext from 'context/user';
import useDesktopSize from 'hooks/useDesktopSize';
import SocketContext from 'context/socket';
import ListBox from 'components/Chat/ListBox';
import socketIo from 'socket.io-client';
import ChatRoom from 'components/Chat/ChatRoom';
import Profile from 'components/Profile/Tab';
import './style.scss';

const socket = socketIo('wss://socket.malrang.dev/cowket', {
  transports: ['websocket'],
});

socket.connect();
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
  const [profile, setProfile] = useState<TeamProfile>();
  const { setTeamList } = useContext(teamContext);
  const { userInfo } = useContext(userContext);
  const { setSelectedTeam, selectedTeam, selectedChannel } =
    useContext(selectContext);

  if (!socket) {
    return <div>connecting....</div>;
  }

  useEffect(() => {
    getMyTeams().then((res) => {
      setTeamList(res.map((grant) => grant.team));
      if (res.length > 0) {
        setSelectedTeam(res[0].team);
      }
    });
  }, []);

  useEffect(() => {
    if (socket && selectedChannel) {
      if ('email' in selectedChannel) {
        // console.log('dm 연결됨');
        // socket.emit('cowket:connection', {
        //   user_uuid: userInfo?.uuid,
        //   team_uuid: selectedTeam?.uuid,
        // });
      } else {
        socket.emit('joinRoom', { channel_uuid: selectedChannel.uuid });
      }
    }
  }, [selectedChannel]);

  useEffect(() => {
    if (socket && userInfo) {
      socket.emit('cowket:connection-with-auth-required', {
        user_uuid: userInfo.uuid,
      });

      socket.on('errorPacket', (error) => console.log(error));
    }
  }, [socket]);

  if (isDesktopSize) {
    return (
      <SocketContext.Provider value={{ socket }}>
        <ProfileContext.Provider
          value={{
            profile,
            setProfile,
          }}
        >
          <div className="chatContainer">
            <ListBox />
            {selectedChannel && <ChatRoom />}
            {profile !== undefined && <Profile />}
          </div>
        </ProfileContext.Provider>
      </SocketContext.Provider>
    );
  }

  return (
    <SocketContext.Provider value={{ socket }}>
      <ProfileContext.Provider
        value={{
          profile,
          setProfile,
        }}
      >
        <div
          className="chatContainer"
          style={{
            gridTemplateColumns: '1fr',
          }}
        >
          {/* 조건문을 수정할수있을듯 */}
          {profile && <Profile />}
          {!profile && channelId && <ChatRoom />}
          {!profile && !channelId && <ListBox />}
        </div>
      </ProfileContext.Provider>
    </SocketContext.Provider>
  );
};

export default Chat;
