import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import * as Style from "./styles";

// 스타일 적용방식 수정하기
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export const RegisterForm = () => {
  const classes = useStyles();

  return (
    <div>
      <p>회원가입할사람</p>
      <form className={classes.root} noValidate autoComplete="off">
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
      </form>
    </div>
  );
};
