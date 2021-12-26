import selectContext from 'context/select';
import React, { useState, useContext, useRef, useEffect } from 'react';
import Tooltip from 'components/Common/Tooltip';
import 'react-quill/dist/quill.snow.css';
import './style.scss';

interface SearchMemberProps {
  tooltipPosition: { x: number; y: number };
}

const ALERT = [
  {
    type: 'member',
    text: '도혜원',
    avatar: '',
    desc: '도혜원',
  },
  {
    type: 'system',
    text: '@here',
    desc: '이 채널의 모든 온라인 멤버에게 알립니다.',
  },
];

export default function SearchMember({ tooltipPosition }: SearchMemberProps) {
  const [curFocusTarget, setCurFocusTarget] = useState<number>(0);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tooltipRef.current) {
      // tooltipRef.current.addEventListener('mouse')
    }
  }, [tooltipRef.current]);
  return (
    <Tooltip
      top={tooltipPosition.y - (ALERT.length - 1) * 30}
      left={tooltipPosition.x}
    >
      <div className="tooltipBox" ref={tooltipRef}>
        {ALERT.map((item) => (
          <div className="item">{item.text}</div>
        ))}
      </div>
    </Tooltip>
  );
}
