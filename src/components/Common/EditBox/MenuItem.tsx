import React from 'react';
import './style.scss';
// import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg';

export default ({ icon, title, action, isActive = null }: any) => (
  <button
    className={`menu-item${isActive && isActive() ? ' is-active' : ''}`}
    onClick={action}
    title={title}
  >
    <svg className="remix">{icon?.()}</svg>
  </button>
);
