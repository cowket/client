import React, { ReactChild } from "react";
import styled from "@emotion/styled";

const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e8cbc0; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #96a0cf,
    #c8c9a3
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #96a0cf,
    #e8cbc0
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

interface AuthLayoutProps {
  children: ReactChild;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <Layout>{children}</Layout>;
};