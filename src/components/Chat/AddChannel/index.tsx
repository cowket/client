import useDesktopSize from 'hooks/useDesktopSize';
import React, { useState, useContext } from 'react';
import { postChannel } from 'api/channel';
import selectContext from 'context/select';
import channelContext from 'context/channel';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CloseOutlined, ArrowBack } from '@material-ui/icons';
import {
  IconButton,
  Button,
  InputAdornment,
  TextField,
  Checkbox,
} from '@material-ui/core';
import './style.scss';

type AddChannelProps = {
  onClose(): void;
};

const AddChannel = ({ onClose }: AddChannelProps) => {
  const [channelName, setChannelName] = useState<string>();
  const [checked, setChecked] = useState<boolean>(false);
  const isDesktopSize = useDesktopSize();
  const { setChannelList, channelList } = useContext(channelContext);
  const { selectedTeam } = useContext(selectContext);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const formik = useFormik({
    initialValues: {
      channelName: '',
      desc: '',
      password: '',
    },
    validationSchema: Yup.object({
      channelName: Yup.string().required(''),
      desc: Yup.string().required(''),
      password: Yup.string(),
    }),
    onSubmit: async (values) => {
      if (values.channelName && values.desc && selectedTeam) {
        postChannel({
          team_uuid: selectedTeam.uuid,
          name: values.channelName,
          isPrivate: checked,
          password: values.password,
        }).then((res) => setChannelList([...channelList, res]));
      }
      onClose();
    },
  });

  return (
    <div className="modalWrapper">
      <div className="channelModalContainer">
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
            채널 추가하기
          </div>
          {isDesktopSize && (
            <IconButton size="small" onClick={onClose}>
              <CloseOutlined fontSize="small" />
            </IconButton>
          )}
        </header>
        <desc>
          채널은 팀이 소통하는 공간입니다.
          <br />
          채널은 주제(예: oo프로젝트)를 중심으로 구성하는 것이 가장 좋습니다.
        </desc>
        <form
          className="channelForm"
          id="channelForm"
          onSubmit={formik.handleSubmit}
        >
          <section>
            <TextField
              id="channelName"
              label="이름"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">#</InputAdornment>
                ),
              }}
              onChange={formik.handleChange}
              value={formik.values.channelName}
              variant="outlined"
              size="small"
              margin="normal"
              fullWidth
            />
            <TextField
              id="desc"
              label="설명(optional)"
              placeholder="무엇에 대한 채널인가요?"
              variant="outlined"
              size="small"
              multiline
              fullWidth
              margin="normal"
              minRows={3}
              onChange={formik.handleChange}
              value={formik.values.desc}
            />
            <div className="private">
              <div className="check">
                <Checkbox
                  size="small"
                  defaultChecked={checked}
                  color="primary"
                  onChange={onChange}
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
                private team
              </div>
              {checked && (
                <TextField
                  id="password"
                  placeholder="비밀번호를 설정해주세요"
                  fullWidth
                  label="비밀번호"
                  variant="outlined"
                  size="small"
                  helperText={formik.errors.password}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              )}
            </div>
          </section>
          <div className="buttonBox">
            <Button variant="contained" onClick={() => onClose()}>
              취소
            </Button>
            <Button
              type="submit"
              id="channelForm"
              variant="contained"
              color="primary"
              disabled={!(formik.dirty && formik.isValid)}
            >
              채널 생성
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddChannel;
