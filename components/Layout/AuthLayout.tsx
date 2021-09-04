import React, { ReactChild } from "react";
import styled from "@emotion/styled";

const Layout = styled.div`
  background-color: peru;
`;

interface AuthLayoutProps {
  children: ReactChild;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <Layout>{children}</Layout>;
};
