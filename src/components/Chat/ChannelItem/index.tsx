import React, { useState, useContext, useRef } from 'react';
import selectContext from 'context/select';
import userContext from 'context/user';
import LockOutlined from '@material-ui/icons/LockOutlined';
import useOutsideClick from 'hooks/useOutsideClick';
import DropDown from 'components/Common/DropDown';
import AddChannel from '../AddChannel';
import { MoreVert } from '@material-ui/icons';
import './style.scss';

type ChannelProps = {
  channel: TeamParticipant | Channel;
};

const ChannelItem = ({ channel }: ChannelProps) => {
  const { setSelectedChannel, selectedChannel } = useContext(selectContext);
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { userInfo } = useContext(userContext);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => setShowDropDown(false));
  return (
    <>
      {showModal && <AddChannel onClose={() => setShowModal(false)} />}
      <div
        className={`channelItem ${
          selectedChannel?.uuid === channel.uuid && 'selected'
        }`}
        onClick={() => setSelectedChannel(channel)}
      >
        <div className="chanName">
          {channel.is_private ? (
            <div className="lockIcon">
              <LockOutlined fontSize="small" />
            </div>
          ) : (
            <span>#</span>
          )}
          &nbsp;
          <div>{'email' in channel ? channel.email : channel.name}</div>
        </div>
        {channel?.owner?.uuid === userInfo?.uuid && (
          <div className="editButton">
            <div
              className="button"
              onClick={(e) => {
                console.log('여기가 나오냐???');
                e.stopPropagation();
                setShowDropDown(true);
              }}
              ref={dropdownRef}
            >
              <MoreVert fontSize="small" />
            </div>
            {showDropDown && (
              <DropDown
                top={25}
                left={0}
                list={[
                  {
                    label: '수정하기',
                    onClick: (e) => {
                      e.stopPropagation();
                      console.log('여기가 나오냐???');
                      // setShowModal(true);
                    },
                  },
                  {
                    label: '삭제하기',
                    onClick: () => console.log('Dd'),
                  },
                ]}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ChannelItem;
