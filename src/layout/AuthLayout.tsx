import React, { ReactNode } from 'react';
import './layout.module.scss';

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <div className="authLayout">{children}</div>;
};
