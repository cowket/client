import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import AddChannel from 'components/Chat/AddChannel';
import { Add } from '@material-ui/icons';
import './style.scss';

type ChannelProps = {
  title: 'Channel' | 'Direct Message';
  channelList: { channel: string; id: number }[];
};

const Channel = ({ title, channelList }: ChannelProps) => {
  const history = useHistory();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showList, setShowList] = useState<boolean>(true);

  const onClose = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && <AddChannel onClose={onClose} />}
      <div className="channelContainer">
        <div className="titleBox">
          <div className="title" onClick={() => setShowList(!showList)}>
            {showList ? <ExpandMoreOutlinedIcon /> : <ExpandLessOutlinedIcon />}
            <p>{title}</p>
          </div>
        </div>
        <div className="channelItems">
          {showList &&
            channelList.map((chan, index) => {
              const isAddButton =
                title === 'Channel' && index === channelList.length - 1;
              return (
                <div
                  className="channelItem"
                  onClick={() => (isAddButton ? setShowModal(true) : undefined)}
                >
                  <span>{isAddButton ? '+' : '#'}</span>
                  &nbsp;
                  {isAddButton ? (
                    <div className="addButton">채널 추가하기</div>
                  ) : (
                    chan.channel
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Channel;
