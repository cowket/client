import useDesktopSize from 'hooks/useDesktopSize';
import React, { useState, useContext, useEffect, useMemo } from 'react';
import { getAllChannelList } from 'api/channel';
import { postChannel } from 'api/channel';
import selectContext from 'context/select';
import channelContext from 'context/channel';
import { CloseOutlined, ArrowBack } from '@material-ui/icons';
import {
  IconButton,
  Button,
  InputAdornment,
  TextField,
} from '@material-ui/core';
import './style.scss';

type SearchChannelProps = {
  onClose(): void;
};

const SearchChannel = ({ onClose }: SearchChannelProps) => {
  const [publicChanList, setPublicChannelList] = useState<Team[]>([]);
  const isDesktopSize = useDesktopSize();
  const { setChannelList, channelList } = useContext(channelContext);
  const { selectedTeam } = useContext(selectContext);
  const alreadyJoined = useMemo(
    () => channelList.map((chan) => chan.uuid),
    [channelList]
  );

  useEffect(() => {
    if (selectedTeam) {
      getAllChannelList(selectedTeam?.uuid).then((res) => {
        setPublicChannelList(res);
      });
    }
  }, [selectedTeam]);
  const onSubmit = async () => {
    onClose();
  };
  return (
    <div className="modalWrapper">
      <div className="searchModalContainer">
        <header>
          <div className="title">
            {!isDesktopSize && (
              <IconButton
                size="small"
                onClick={onClose}
                style={{ marginRight: '10px' }}
              >
                <ArrowBack fontSize="small" />
              </IconButton>
            )}
            모든 채널 탐색
          </div>
          {isDesktopSize && (
            <IconButton size="small" onClick={onClose}>
              <CloseOutlined fontSize="small" />
            </IconButton>
          )}
        </header>
        <desc>모든 공개채널 중 참여하고 싶은 채널에 가입하세요.</desc>
        <section>
          <div className="channel">
            {publicChanList.map((chan) => (
              <div className="item">
                <p>{chan.name}</p>
                <Button>
                  {alreadyJoined.includes(chan.uuid) ? '탈퇴' : '참여'}
                </Button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SearchChannel;
