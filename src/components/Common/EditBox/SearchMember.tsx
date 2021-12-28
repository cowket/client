import selectContext from 'context/select';
import socketContext from 'context/socket';
import React, { useState, useContext, useRef, useEffect } from 'react';
import Tooltip from 'components/Common/Tooltip';
import 'react-quill/dist/quill.snow.css';
import './style.scss';

interface SearchMemberProps {
  tooltipPosition: { x: number; y: number };
  channelId: string;
  onSelect: (value: Mention) => void;
}

const SYSTEM_LIST: Mention[] = [
  {
    type: 'system',
    text: 'here',
    desc: '이 채널의 모든 온라인 멤버에게 알립니다.',
  },
];

export default function SearchMember({
  tooltipPosition,
  channelId,
  onSelect,
}: SearchMemberProps) {
  const [curFocusTarget, setCurFocusTarget] = useState<number>(-1);
  const [mentionList, setMentionList] = useState<Mention[]>([]);
  const { socket } = useContext(socketContext);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (socket) {
      socket.emit('getChannelMembers', { channel_uuid: channelId });
      socket.on('sendChannelMemebrs', (res: ChannelUser[]) => {
        if (res) {
          console.log(res);
          const list: Mention[] = res.map((member) => {
            return {
              type: 'member',
              text: member.team_user_profile?.name ?? member.user.email,
              avatar: member.team_user_profile?.avatar ?? member.user.avatar,
              desc: member.team_user_profile?.name ?? member.user.email,
            };
          });
          setMentionList([...list, ...SYSTEM_LIST]);
        }
      });
    }
  }, [socket]);

  useEffect(() => {
    if (tooltipRef.current) {
      tooltipRef.current.focus();
    }
  }, [tooltipRef.current]);

  // 아직 동작안됨
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    console.log(e);
    if (e.key === 'ArrowDown') {
      if (curFocusTarget >= mentionList.length - 1) {
        setCurFocusTarget(0);
      } else {
        setCurFocusTarget(curFocusTarget + 1);
      }
    }
    if (e.key === 'ArrowUp') {
      if (curFocusTarget === 0) {
        setCurFocusTarget(mentionList.length - 1);
      } else {
        setCurFocusTarget(curFocusTarget - 1);
      }
    }
    if (e.key === 'Enter') {
      // onSelect(mentionList[curFocusTarget].value);
    }
  };

  return (
    <Tooltip
      top={tooltipPosition.y - (mentionList.length - 1) * 30}
      left={tooltipPosition.x}
    >
      <div className="tooltipBox" ref={tooltipRef}>
        {mentionList.map((item, index) => (
          <div
            className={`item ${curFocusTarget === index && 'item--active'}`}
            onMouseEnter={() => setCurFocusTarget(index)}
            onMouseLeave={() => setCurFocusTarget(-1)}
            onClick={() => onSelect(item)}
            onKeyDown={onKeyDown}
            tabIndex={-1}
            key={item.text}
          >
            {item.text}
          </div>
        ))}
      </div>
    </Tooltip>
  );
}
