import React, { ReactNode } from 'react';
import './layout.scss';

interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return <div className="baseLayout">{children}</div>;
};

export default BaseLayout;
