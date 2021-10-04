import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import AddChannel from 'components/Chat/AddChannel';
import selectContext from 'context/select';
import userContext from 'context/user';
import { Create } from '@material-ui/icons';
import './style.scss';

type ChannelProps = {
  title: 'Channel' | 'Direct Message';
  channelList: TeamParticipant[] | Channel[];
};

const Channel = ({ title, channelList }: ChannelProps) => {
  const history = useHistory();
  const { setSelectedChannel } = useContext(selectContext);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showList, setShowList] = useState<boolean>(true);
  const { userInfo } = useContext(userContext);
  const onClose = () => {
    setShowModal(false);
  };
  console.log(channelList);
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
            channelList.map(
              (chan: TeamParticipant | Channel, index: number) => {
                return (
                  <div
                    className="channelItem"
                    onClick={() => setSelectedChannel(chan)}
                  >
                    <span>#</span>
                    &nbsp;
                    <div>{'email' in chan ? chan.email : chan.name}</div>
                    {/* {chan?.owner?.uuid === userInfo?.uuid && (
                      <div className="editButton">수정하기</div>
                    )} */}
                  </div>
                );
              }
            )}
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
