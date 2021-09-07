import React from "react";
import TextField from "@material-ui/core/TextField";
import { postLogin } from "pages/api/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as S from "./styles";

export const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("이메일 형식에맞게 작성해주세요.")
        .matches(
          /[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]/,
          "Is not in correct format"
        )
        .required(""),
      password: Yup.string()
        .matches(
          /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
          "최소 8자 이상, 특수문자, 숫자, 영어 단어 한개 반드시 포함"
        )
        .required(""),
    }),
    onSubmit: (values) => {
      if (values.email && values.password) {
        postLogin({ email: values.email, pw: values.password }).then((res) => {
          if (res.status >= 400) {
            alert(res.status + "이미 존재하는 유저임");
          } else {
            alert("로그인된다");
          }
        });
      }
    },
  });

  return (
    <S.Container>
      <S.Title>로그인</S.Title>
      <S.Form id="LoginForm" onSubmit={formik.handleSubmit}>
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

        <S.SubmitButton
          id="LoginForm"
          type="submit"
          variant="outlined"
          size="medium"
          color="primary"
          disabled={!(formik.dirty && formik.isValid)}
        >
          로그인
        </S.SubmitButton>
      </S.Form>
    </S.Container>
  );
};
