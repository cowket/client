import React, { useState } from 'react';
import { CloseOutlined } from '@material-ui/icons';
import {
  IconButton,
  Button,
  InputAdornment,
  TextField,
} from '@material-ui/core';
import './style.scss';

type EditModalProps = {
  onClose(): void;
};

const AddModal = ({ onClose }: EditModalProps) => {
  const [channelName, setChannelName] = useState<string>();

  const onSubmit = async () => {
    onClose();
  };

  return (
    <div className="modalWrapper">
      <div className="channelModalContainer">
        <header>
          <p className="title">채널 추가하기</p>
          <IconButton size="small" onClick={onClose}>
            <CloseOutlined fontSize="small" />
          </IconButton>
        </header>
        <desc>
          채널은 팀이 소통하는 공간입니다.
          <br />
          채널은 주제(예: oo프로젝트)를 중심으로 구성하는 것이 가장 좋습니다.
        </desc>
        <section>
          <TextField
            id="outlined-basic"
            label="이름"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">#</InputAdornment>
              ),
            }}
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="설명(optional)"
            placeholder="무엇에 대한 채널인가요?"
            variant="outlined"
            size="small"
            multiline
            fullWidth
            margin="normal"
            minRows={3}
          />
        </section>
        <div className="buttonBox">
          <Button variant="contained" onClick={() => onClose()}>
            취소
          </Button>
          <Button variant="contained" color="primary" onClick={onSubmit}>
            채널 생성
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
