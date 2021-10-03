import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import AddChannel from 'components/Chat/AddChannel';
import selectContext from 'context/select';
import { Add } from '@material-ui/icons';
import './style.scss';

type ChannelProps = {
  title: 'Channel' | 'Direct Message';
  channelList: TeamParticipant[] | any[];
};

const Channel = ({ title, channelList }: ChannelProps) => {
  const history = useHistory();
  const { setSelectedChannel } = useContext(selectContext);
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
            channelList.map((chan: TeamParticipant, index: number) => {
              return (
                <div className="channelItem">
                  <span>#</span>
                  &nbsp;
                  <div onClick={() => setSelectedChannel(chan.uuid)}>
                    {title === 'Channel' ? chan.name : chan.email}
                  </div>
                </div>
              );
            })}
          {title === 'Channel' && (
            <div onClick={() => setShowModal(true)} className="channelItem">
              <span>+</span>&nbsp;
              <div className="addButton">채널 추가하기</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Channel;
