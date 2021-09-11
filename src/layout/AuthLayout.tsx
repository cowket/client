import React, { ReactNode } from 'react';
import './layout.scss';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <div className="authLayout">{children}</div>;
};

export default AuthLayout;
