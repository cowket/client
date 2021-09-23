import React, { ChangeEvent, useState, useContext } from 'react';
import profileContext from 'context/profile';
import userContext from 'context/user';
import { putUserInfo } from 'api/user';
import { uploadFile } from 'api/file';
import { CloseOutlined } from '@material-ui/icons';
import { IconButton, Button, Input, TextField } from '@material-ui/core';
import './style.scss';

type EditModalProps = {
  onClose(): void;
};

const EditModal = ({ onClose }: EditModalProps) => {
  const { userInfo, setUserInfo } = useContext(userContext);
  const [fileUrl, setFileUrl] = useState<string>();

  if (!userInfo) {
    return <div>사용자 정보가 없습니다.</div>;
  }

  const onSubmit = async () => {
    const response = await putUserInfo({
      ...userInfo,
      ...(fileUrl && { avatar: fileUrl }),
    });
    setUserInfo(response);
    onClose();
  };

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
            <img
              src={
                fileUrl
                  ? `https://cowket-api.stackunderflow.xyz/uploads/${fileUrl}`
                  : userInfo.avatar
              }
            />
            <label htmlFor="contained-button-file">
              <input
                accept="image/*"
                id="contained-button-file"
                type="file"
                // onSelect={(e) => console.log(e)}
                onChange={async (e: any) => {
                  if (e !== null) {
                    const response = await uploadFile(e.currentTarget.files[0]);
                    if (response.uploads) {
                      setFileUrl(response.uploads);
                    }
                  }
                  return undefined;
                }}
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
            <div className="remove" onClick={() => setFileUrl(undefined)}>
              사진제거
            </div>
          </section>
        </div>
        <div className="buttonBox">
          <Button variant="contained" onClick={() => onClose()}>
            취소
          </Button>
          <Button variant="contained" color="primary" onClick={onSubmit}>
            변경사항 저장
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
