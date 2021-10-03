import React, { useEffect, useContext, useState } from 'react';
import Team from 'components/Chat/List/Team';
import Channel from 'components/Chat/List/Channel';
import { getTeamParticipants } from 'api/team';
import selectContext from 'context/select';
import './style.scss';

const ListBox = () => {
  const [teamDMList, setTeamDMList] = useState<TeamParticipant[]>([]);
  const { selectedTeam } = useContext(selectContext);
  useEffect(() => {
    if (selectedTeam) {
      console.log(123);
      getTeamParticipants(selectedTeam.uuid).then((res) => {
        console.log(res);
        setTeamDMList(res);
      });
    }
  }, [selectedTeam]);

  return (
    <div className="channelListContainer">
      <Team />
      <div className="channelList">
        <Channel title="Channel" channelList={[]} />
        <Channel title="Direct Message" channelList={teamDMList} />
      </div>
    </div>
  );
};

export default ListBox;
