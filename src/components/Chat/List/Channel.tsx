import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import { Add } from '@material-ui/icons';
import './style.scss';

type ChannelProps = {
  title: 'Channel' | 'Direct Message';
  channelList: { channel: string; id: number }[];
};

const Channel = ({ title, channelList }: ChannelProps) => {
  const history = useHistory();
  const [showList, setShowList] = useState<boolean>(true);

  return (
    <div className="channelContainer">
      <div className="titleBox">
        <div className="title" onClick={() => setShowList(!showList)}>
          {showList ? <ExpandMoreOutlinedIcon /> : <ExpandLessOutlinedIcon />}
          <p>{title}</p>
        </div>
      </div>
      <div className="channelItems">
        {showList &&
          channelList.map((chan, index) => (
            <div className="channelItem">
              <span>
                {title === 'Channel' && index === channelList.length - 1
                  ? '+'
                  : '#'}
              </span>
              &nbsp;
              {title === 'Channel' && index === channelList.length - 1
                ? '채널 추가하기'
                : chan.channel}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Channel;
