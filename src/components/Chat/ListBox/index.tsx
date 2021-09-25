import React from 'react';
import Team from 'components/Chat/List/Team';
import Channel from 'components/Chat/List/Channel';
import './style.scss';

const ListBox = () => {
  const channelList: { channel: string; id: number }[] = [
    {
      channel: '카카오',
      id: 1,
    },
    {
      channel: '다음',
      id: 2,
    },
    {
      channel: '네이버',
      id: 3,
    },
  ];

  return (
    <div className="channelListContainer">
      <Team />
      <div className="channelList">
        <Channel title="Channel" channelList={channelList} />
        <Channel title="Direct Message" channelList={channelList} />
      </div>
    </div>
  );
};

export default ListBox;
