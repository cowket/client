import React, { useState, useContext } from 'react';
import socketContext from 'context/socket';
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import './style.scss';

interface EmojiBoxProps {
  onSelectEmoji: (emoji: any) => void;
  messageInfo: DetailChat;
}
export default function EmojiBox({
  onSelectEmoji,
  messageInfo,
}: EmojiBoxProps) {
  const { socket } = useContext(socketContext);

  const onEmojiClick = (event: any, emojiObject: any) => {
    onSelectEmoji(emojiObject);
    if (socket) {
      socket.emit('reactionMessage', {
        message_uuid: messageInfo.uuid,
        team_uuid: messageInfo.team.uuid,
        channel_uuid: messageInfo.channel.uuid,
        reaction: emojiObject.unified.split('-')[0],
      });
    }
  };

  return (
    <div className="emojiBox">
      <Picker
        disableSkinTonePicker
        skinTone="neutral"
        onEmojiClick={onEmojiClick}
        groupNames={{ smileys_people: 'PEOPLE' }}
        native
      />
    </div>
  );
}
