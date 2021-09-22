import React, { useContext } from 'react';
import profileContext from 'context/profile';
import userContext from 'context/user';
import { CloseOutlined } from '@material-ui/icons';
import { IconButton, Button, Input, TextField } from '@material-ui/core';
import './style.scss';

type EditModalProps = {
  onClose(): void;
};

const EditModal = ({ onClose }: EditModalProps) => {
  const { userInfo } = useContext(userContext);
  return (
    <div className="modalWrapper">
      <div className="profileModalContainer">
        <header>
          <p className="title">프로필 편집</p>
          <IconButton size="small" onClick={onClose}>
            <CloseOutlined fontSize="small" />
          </IconButton>
        </header>
        <div className="infoBox">
          <section>
            <p className="title">나의 정보</p>
            <TextField
              id="outlined-basic"
              label="이메일"
              defaultValue={userInfo?.email}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              size="small"
              margin="normal"
            />
            <TextField
              id="outlined-basic"
              label="상세설명"
              variant="outlined"
              size="small"
              multiline
              margin="normal"
              minRows={3}
            />
            <TextField
              id="outlined-basic"
              label="또뭐하지"
              variant="outlined"
              margin="normal"
              size="small"
            />
          </section>
          <section className="imgBox">
            <p className="title">프로필 사진</p>
            <img src="http://img.marieclairekorea.com/2017/01/mck_586f3a834b707-375x375.jpg" />
            <label htmlFor="contained-button-file">
              <input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
              />
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                component="span"
              >
                이미지 업로드
              </Button>
            </label>
            <div className="remove">사진제거</div>
          </section>
        </div>
        <div className="buttonBox">
          <Button variant="contained">취소</Button>
          <Button variant="contained" color="primary">
            변경사항 저장
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
