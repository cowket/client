import React, { useState } from 'react';
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import './style.scss';

interface EmojiBoxProps {
  onSelectEmoji: (emoji: any) => void;
}
export default function EmojiBox({ onSelectEmoji }: EmojiBoxProps) {
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event: any, emojiObject: any) => {
    setChosenEmoji(emojiObject);
    onSelectEmoji(emojiObject);
  };

  return (
    <div className="emojiBox">
      <Picker
        onEmojiClick={onEmojiClick}
        skinTone={SKIN_TONE_MEDIUM_DARK}
        groupNames={{ smileys_people: 'PEOPLE' }}
        native
      />
    </div>
  );
}
