import React, { useEffect } from 'react';

export default function useOutsideClick(
  ref: React.RefObject<HTMLElement>,
  onClick: () => void
) {
  const onClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      onClick?.();
    }
  };
  useEffect(() => {
    document.addEventListener('mouseup', onClickOutside);
    return () => document.removeEventListener('mouseup', onClickOutside);
  }, [ref, onClick]);
}
