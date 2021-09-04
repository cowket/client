import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import * as S from "./styles";

export const RegisterForm = () => {
  return (
    <S.Container>
      <p>회원가입할사람</p>
      <S.Form noValidate autoComplete="off">
        <TextField
          id="email"
          label="이메일을 입력해주세요"
          color="secondary"
          type="email"
        />
        <TextField
          id="password"
          label="비밀번호를 입력해주세요"
          type="password"
          color="secondary"
        />
        <TextField
          id="password"
          label="비밀번호를 다시 입력해주세요"
          type="password"
          color="secondary"
        />
      </S.Form>
    </S.Container>
  );
};
