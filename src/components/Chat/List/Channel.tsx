import React, { useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import useOutsideClick from 'hooks/useOutsideClick';
import AddChannel from 'components/Chat/AddChannel';
import SearchChannel from 'components/Chat/SearchChannel';
import selectContext from 'context/select';
import userContext from 'context/user';
import DropDown from 'components/Common/DropDown';
import ChannelItem from '../ChannelItem';
import './style.scss';

type ChannelProps = {
  title: 'Channel' | 'Direct Message';
  channelList: TeamParticipant[] | Channel[];
};

const Channel = ({ title, channelList }: ChannelProps) => {
  const history = useHistory();
  const { setSelectedChannel, selectedTeam, selectedChannel } =
    useContext(selectContext);
  const [showModal, setShowModal] = useState<'add' | 'search' | undefined>(
    undefined
  );
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [showList, setShowList] = useState<boolean>(true);
  const { userInfo } = useContext(userContext);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => setShowDropDown(false));
  const onClose = () => {
    setShowModal(undefined);
  };

  return (
    <>
      {showModal === 'add' && <AddChannel onClose={onClose} />}
      {showModal === 'search' && <SearchChannel onClose={onClose} />}
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
                return <ChannelItem channel={chan} />;
              }
            )}
          {title === 'Channel' && selectedTeam && (
            <div
              onClick={() => setShowDropDown(true)}
              className="channelItem"
              ref={dropdownRef}
            >
              <div className="chanName">
                <span>+</span>&nbsp;
                <div className="addButton">채널 추가하기</div>
              </div>
              {showDropDown && (
                <DropDown
                  list={[
                    {
                      label: '새 채널 생성',
                      onClick: () => {
                        setShowModal('add');
                        setShowDropDown(false);
                      },
                    },
                    {
                      label: '모든 채널 탐색',
                      onClick: () => {
                        setShowModal('search');
                        setShowDropDown(false);
                      },
                    },
                  ]}
                  top={30}
                  left={70}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Channel;
