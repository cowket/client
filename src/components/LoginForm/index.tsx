import React, { useContext, useState } from 'react';
import authContext from 'context/auth';
import userContext from 'context/user';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { postLogin } from 'api/auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './style.scss';

const LoginForm = () => {
  const { setIsLoggedIn } = useContext(authContext);
  const { setUserInfo } = useContext(userContext);
  const [errorMsg, setErrorMsg] = useState<string>();
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
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
    }),
    onSubmit: (values) => {
      if (values.email && values.password) {
        postLogin({ email: values.email, pw: values.password }).then((res) => {
          if ('email' in res) {
            setUserInfo(res);
            setIsLoggedIn(true);
          } else if ('message' in res) {
            setErrorMsg('존재하지않는 사용자입니다.');
            setTimeout(() => {
              setErrorMsg(undefined);
            }, 3000);
          }
        });
      }
    },
  });

  return (
    <div className="loginContainer">
      <p className="title">로그인</p>
      <form className="form" id="LoginForm" onSubmit={formik.handleSubmit}>
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
        <Button
          id="LoginForm"
          type="submit"
          variant="outlined"
          size="medium"
          color="primary"
          className="button"
          disabled={!(formik.dirty && formik.isValid)}
        >
          로그인
        </Button>
      </form>
      {errorMsg && <div className="error">{errorMsg}</div>}
      <div className="redirectLink" onClick={() => history.push('/register')}>
        회원가입하기
      </div>
    </div>
  );
};

export default LoginForm;
