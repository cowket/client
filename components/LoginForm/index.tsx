import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
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
      email: Yup.string().email("이메일 형식에맞게 작성해주세요.").required(""),
      password: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required(""),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <S.Container>
      <S.Title>회원가입</S.Title>
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
          회원가입
        </S.SubmitButton>
      </S.Form>
    </S.Container>
  );
};
