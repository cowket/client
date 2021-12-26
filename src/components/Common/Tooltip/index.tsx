import React, { ReactElement, useState } from 'react';
import { createPortal } from 'react-dom';
import './style.scss';

type TooltipProps = {
  children: ReactElement;
  top: number;
  left: number;
};

function TooltipContainer({ children, top, left }: TooltipProps) {
  return (
    <div className="tooltipContainer" style={{ left, top }}>
      {children}
    </div>
  );
}

function Tooltip(props: TooltipProps) {
  const root = document.getElementById('root');
  return root ? createPortal(<TooltipContainer {...props} />, root) : null;
}

export default Tooltip;
