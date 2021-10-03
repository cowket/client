import React, { useEffect, useState, useContext } from 'react';
import profileContext from 'context/profile';
import userContext from 'context/user';
import selectContext from 'context/select';
import useDesktopSize from 'hooks/useDesktopSize';
import { putUserInfo, postUserInfo } from 'api/user';
import { uploadFile } from 'api/file';
import { CloseOutlined, ArrowBack } from '@material-ui/icons';
import { IconButton, Button, Input, TextField } from '@material-ui/core';
import './style.scss';

type EditModalProps = {
  onClose(): void;
  profileInfo?: TeamUser;
};

const EditModal = ({ onClose, profileInfo }: EditModalProps) => {
  const { userInfo, setUserInfo } = useContext(userContext);
  const { selectedTeam } = useContext(selectContext);
  if (!userInfo || !selectedTeam) {
    return <div>사용자 정보가 없습니다</div>;
  }

  const [edittedInfo, setEdittedInfo] = useState<TeamUser>({
    ...profileInfo,
    avatar: userInfo.avatar,
    team_uuid: selectedTeam.uuid,
  });

  const isDesktopSize = useDesktopSize();
  const [fileUrl, setFileUrl] = useState<string>();

  const onSubmit = async () => {
    let response;
    if (edittedInfo.id) {
      response = await putUserInfo({
        ...edittedInfo,
        ...(fileUrl && { avatar: fileUrl }),
      });
    } else {
      response = await postUserInfo({
        ...edittedInfo,
        ...(fileUrl && { avatar: fileUrl }),
      });
    }

    setUserInfo(response);
    onClose();
  };

  return (
    <div className="modalWrapper">
      <div className="profileModalContainer">
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
            프로필 편집
          </div>
          {isDesktopSize && (
            <IconButton size="small" onClick={onClose}>
              <CloseOutlined fontSize="small" />
            </IconButton>
          )}
        </header>
        <div className="infoBox">
          <section>
            <p className="title">나의 정보</p>
            <TextField
              id="outlined-basic"
              label="이메일"
              defaultValue={userInfo.email}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              size="small"
              margin="normal"
            />
            <TextField
              id="outlined-basic"
              label="닉네임"
              defaultValue={edittedInfo?.name}
              onChange={(e) =>
                setEdittedInfo({ ...edittedInfo, name: e.target.value })
              }
              variant="outlined"
              size="small"
              margin="normal"
            />
            <TextField
              id="outlined-basic"
              label="포지션"
              defaultValue={edittedInfo?.position}
              onChange={(e) =>
                setEdittedInfo({ ...edittedInfo, position: e.target.value })
              }
              variant="outlined"
              size="small"
              margin="normal"
            />
            <TextField
              id="outlined-basic"
              label="연락처"
              defaultValue={edittedInfo?.contact}
              onChange={(e) =>
                setEdittedInfo({ ...edittedInfo, contact: e.target.value })
              }
              variant="outlined"
              size="small"
              margin="normal"
            />
          </section>
          <section className="imgBox">
            <p className="title">프로필 사진</p>
            <img
              src={
                fileUrl
                  ? `https://cowket-api.stackunderflow.xyz/uploads/${fileUrl}`
                  : edittedInfo.avatar
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
