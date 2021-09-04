import styled from "@emotion/styled";

export const Container = styled.div`
  width: 500px;
  background-color: ${(props) => props.theme.palette.green[7]};
  height: 500px;
`;

export const Form = styled.form`
  & > * {
    margin: 30px;
    width: 200px;
  }
`;
