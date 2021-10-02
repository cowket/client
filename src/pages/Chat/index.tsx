import React, { useEffect, useState, useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ProfileContext from 'context/profile';
import { getMyTeams } from 'api/team';
import teamContext from 'context/team';
import selectContext from 'context/select';
import useDesktopSize from 'hooks/useDesktopSize';
import ListBox from 'components/Chat/ListBox';
import ChatRoom from 'components/Chat/ChatRoom';
import Profile from 'components/Profile/Tab';
import socketIo from 'socket.io-client';
import './style.scss';

// const socket = socketIo('http://socket.stackunderflow.xyz/', {
//   transports: ['websocket'],
// });

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
  const [profileId, setProfileId] = useState<number>();
  const { setTeamList } = useContext(teamContext);
  const { setSelectedTeam } = useContext(selectContext);

  useEffect(() => {
    getMyTeams().then((res) => {
      setTeamList(res.map((team) => team.team_uuid));
      if (res.length > 0) {
        setSelectedTeam(res[0].team_uuid);
      }
    });
  }, []);

  useEffect(() => {
    // socket.emit('message', { message: '이건 테스트' });
  }, []);
  // socket.on('message', (e) => console.log(e));

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
            gridTemplateColumns: `300px 4fr ${profileId ? 'auto' : ''}`,
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
  );
};

export default Chat;
