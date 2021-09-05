import styled from "@emotion/styled";
import Button from "@material-ui/core/Button";

export const Container = styled.div`
  width: 40%;
  height: 50%;
  min-width: 300px;
  background-color: ${(props) => props.theme.palette.grey[0]};
  border-radius: 6px;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.2);
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  row-gap: 14px;
`;

export const Title = styled.p`
  font-size: 20px;
  font-weight: 500;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 30px;
  & > * {
    margin: 30px;
    width: 200px;
  }
`;

export const SubmitButton = styled(Button)`
  margin-top: 15px;
`;
