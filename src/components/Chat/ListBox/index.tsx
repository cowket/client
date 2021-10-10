import React, { useEffect, useContext, useState } from 'react';
import Team from 'components/Chat/List/Team';
import Channel from 'components/Chat/List/Channel';
import { getTeamParticipants } from 'api/team';
import { getChannel } from 'api/channel';
import ChannelContext from 'context/channel';
import selectContext from 'context/select';
import './style.scss';

const ListBox = () => {
  const [teamDMList, setTeamDMList] = useState<TeamParticipant[]>([]);
  const [channelList, setChannelList] = useState<Channel[]>([]);
  const { selectedTeam, setSelectedChannel } = useContext(selectContext);
  useEffect(() => {
    if (selectedTeam) {
      getTeamParticipants(selectedTeam.uuid).then((res) => {
        setTeamDMList(res);
      });
      getChannel(selectedTeam.uuid).then((res) => {
        if (res.length > 0) {
          setSelectedChannel(res[0].channel_uuid);
        }
        setChannelList(res.map((value) => value.channel_uuid));
      });
    }
  }, [selectedTeam]);

  return (
    <ChannelContext.Provider value={{ setChannelList, channelList }}>
      <div className="channelListContainer">
        <Team />
        <div className="channelList">
          <Channel title="Channel" channelList={channelList} />
          <Channel title="Direct Message" channelList={teamDMList} />
        </div>
      </div>
    </ChannelContext.Provider>
  );
};

export default ListBox;
