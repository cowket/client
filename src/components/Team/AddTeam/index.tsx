import React, { useState, useContext } from 'react';
import { postTeam } from 'api/team';
import TeamContext from 'context/team';
import useDesktopSize from 'hooks/useDesktopSize';
import { CloseOutlined, ArrowBack } from '@material-ui/icons';
import { IconButton, Button, TextField, Checkbox } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './style.scss';
import './style.scss';

type AddTeamProps = {
  onClose(): void;
};

const AddTeam = ({ onClose }: AddTeamProps) => {
  const [checked, setChecked] = useState<boolean>(false);
  const { setTeamList, teamList } = useContext(TeamContext);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const formik = useFormik({
    initialValues: {
      teamName: '',
      desc: '',
      isPrivate: false,
      password: '',
    },
    validationSchema: Yup.object({
      teamName: Yup.string().required(''),
      desc: Yup.string().required(''),
      isPrivate: Yup.boolean(),
    }),
    onSubmit: async (values) => {
      if (values.teamName && values.desc) {
        const newTeam = await postTeam({
          name: values.teamName,
          description: values.desc,
          is_private: checked,
          password: values.password,
        });
        setTeamList([...teamList, newTeam]);
        onClose();
      }
    },
  });

  const isDesktopSize = useDesktopSize();

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
            팀 추가하기
          </div>
          {isDesktopSize && (
            <IconButton size="small" onClick={onClose}>
              <CloseOutlined fontSize="small" />
            </IconButton>
          )}
        </header>
        <desc>팀은 하나의 그룹단위로 생성하는것이 좋습니다.</desc>
        <form className="teamForm" id="teamForm" onSubmit={formik.handleSubmit}>
          <section>
            <TextField
              id="teamName"
              label="팀명"
              variant="outlined"
              size="small"
              margin="normal"
              fullWidth
              helperText={formik.errors.teamName}
              onChange={formik.handleChange}
              value={formik.values.teamName}
            />
            <TextField
              id="desc"
              placeholder="팀에대한 설명을 적어주세요"
              fullWidth
              label="설명"
              variant="outlined"
              size="small"
              multiline
              margin="normal"
              minRows={3}
              helperText={formik.errors.desc}
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
              id="LoginForm"
              variant="contained"
              color="primary"
              disabled={!(formik.dirty && formik.isValid)}
            >
              팀 생성
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeam;
