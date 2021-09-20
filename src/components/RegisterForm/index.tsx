import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { postRegister } from 'api/auth';
import './style.scss';

const RegisterForm = () => {
  const [errorMsg, setErrorMsg] = useState<string>();

  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('이메일 형식에맞게 작성해주세요.')
        .matches(
          /[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]/,
          'Is not in correct format'
        )
        .required(''),
      password: Yup.string()
        .matches(
          /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
          '최소 8자 이상, 특수문자, 숫자, 영어 단어 한개 반드시 포함'
        )
        .required(''),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], '비밀번호와 일치하지않습니다.')
        .required(''),
    }),
    onSubmit: (values) => {
      if (values.email && values.password) {
        // 이미 존재하는 이메일에 대한 처리필요
        postRegister({ email: values.email, pw: values.password }).then(
          (res: any) => {
            if (res.status >= 400) {
              setErrorMsg('이미 등록된 이메일입니다.');
            } else {
              history.replace('/login');
            }
          }
        );
      }
    },
  });

  return (
    <div className="registerContainer">
      <p className="title">회원가입</p>
      <form className="form" id="registerForm" onSubmit={formik.handleSubmit}>
        <TextField
          id="email"
          label="이메일을 입력해주세요"
          color="secondary"
          type="email"
          helperText={formik.errors.email}
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <TextField
          id="password"
          label="비밀번호를 입력해주세요"
          type="password"
          color="secondary"
          helperText={formik.errors.password}
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <TextField
          id="confirmPassword"
          label="비밀번호를 다시 입력해주세요"
          type="password"
          color="secondary"
          helperText={formik.errors.confirmPassword}
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
        />
        <Button
          id="registerForm"
          type="submit"
          variant="outlined"
          size="medium"
          color="primary"
          className="button"
          disabled={!(formik.dirty && formik.isValid)}
        >
          회원가입
        </Button>
      </form>
      {errorMsg && <div className="error">{errorMsg}</div>}
      <div className="redirectLink" onClick={() => history.push('/login')}>
        로그인하기
      </div>
    </div>
  );
};

export default RegisterForm;
