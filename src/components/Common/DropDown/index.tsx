import React from 'react';
import './style.scss';

interface DropDownProps {
  list: { label: string; onClick: () => void }[];
  top: number;
  left: number;
}

export default function DropDown({ list, top, left }: DropDownProps) {
  return (
    <div className="dropdownContainer" style={{ top, left }}>
      {list.map((each) => (
        <div onClick={each.onClick} key={each.label} className="list">
          <p>{each.label}</p>
        </div>
      ))}
    </div>
  );
}
