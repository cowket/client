import React, { useEffect, useState, useContext } from 'react';
import userContext from 'context/user';
import selectContext from 'context/select';
import profileContext from 'context/profile';
import useDesktopSize from 'hooks/useDesktopSize';
import { putUserInfo, postUserInfo } from 'api/user';
import { uploadFile } from 'api/file';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CloseOutlined, ArrowBack } from '@material-ui/icons';
import { IconButton, Button, Input, TextField } from '@material-ui/core';
import './style.scss';

type EditModalProps = {
  onClose(info?: TeamProfile): void;
  profileInfo?: TeamProfile;
};

const EditModal = ({ onClose, profileInfo }: EditModalProps) => {
  const { userInfo } = useContext(userContext);
  const { selectedTeam } = useContext(selectContext);

  if (!userInfo || !selectedTeam) {
    return <div>사용자 정보가 없습니다</div>;
  }

  const isDesktopSize = useDesktopSize();
  const [fileUrl, setFileUrl] = useState<string | undefined>(
    profileInfo?.avatar
  );

  const formik = useFormik({
    initialValues: {
      name: profileInfo?.name,
      position: profileInfo?.position,
      contact: profileInfo?.contact,
    },
    validationSchema: Yup.object({
      name: Yup.string().min(2).required(''),
      position: Yup.string().min(2).required(''),
      contact: Yup.string().min(10).max(11),
    }),
    onSubmit: async (values) => {
      if (values.name && values.position) {
        let response: TeamProfile;
        console.log(userInfo);
        if (profileInfo?.name) {
          response = await putUserInfo({
            name: values.name,
            position: values.position,
            team_uuid: selectedTeam.uuid,
            ...(values?.contact && { contact: values.contact }),
            ...(fileUrl && { avatar: fileUrl }),
          });
        } else {
          response = await postUserInfo({
            name: values.name,
            position: values.position,
            team_uuid: selectedTeam.uuid,
            ...(values?.contact && { contact: values.contact }),
            ...(fileUrl && { avatar: fileUrl }),
          });
        }

        onClose({ ...profileInfo, ...response });
      }
    },
  });

  return (
    <div className="modalWrapper">
      <form
        id="profileForm"
        onSubmit={formik.handleSubmit}
        className="profileModalContainer"
      >
        <header>
          <div className="title">
            {!isDesktopSize && (
              <IconButton
                size="small"
                onClick={() => onClose()}
                style={{ marginRight: '10px' }}
              >
                <ArrowBack fontSize="small" />
              </IconButton>
            )}
            프로필 편집
          </div>
          {isDesktopSize && (
            <IconButton size="small" onClick={() => onClose()}>
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
              label="닉네임*"
              id="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              variant="outlined"
              size="small"
              margin="normal"
            />
            <TextField
              label="포지션*"
              id="position"
              onChange={formik.handleChange}
              value={formik.values.position}
              variant="outlined"
              size="small"
              margin="normal"
            />
            <TextField
              label="연락처"
              id="contact"
              onChange={formik.handleChange}
              value={formik.values.contact}
              variant="outlined"
              size="small"
              margin="normal"
            />
          </section>
          <section className="imgBox">
            <p className="title">프로필 사진</p>
            <img src={fileUrl} />
            <label htmlFor="contained-button-file">
              <input
                accept="image/*"
                id="contained-button-file"
                type="file"
                // onSelect={(e) => console.log(e)}
                onChange={async (e: any) => {
                  if (e !== null) {
                    console.log(e.currentTarget.files[0]);
                    const response = await uploadFile(e.currentTarget.files[0]);
                    if (response.uploads) {
                      console.log(response.uploads);
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
          <Button
            variant="contained"
            color="primary"
            id="profileForm"
            type="submit"
            size="medium"
            className="button"
            disabled={
              profileInfo ? !formik.isValid : !(formik.dirty && formik.isValid)
            }
          >
            변경사항 저장
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditModal;
