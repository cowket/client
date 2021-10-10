import React, { useContext, useState, useEffect, useRef } from 'react';
import Input from '@material-ui/core/Input';
import useDesktopSize from 'hooks/useDesktopSize';
import selectContext from 'context/select';
import Button from '@material-ui/core/Button';
import socketContext from 'context/socket';
import userContext from 'context/user';
import ChatItem from 'components/Chat/ChatItem';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import './style.scss';

const ChatRoom = () => {
  const isDesktopSize = useDesktopSize();
  const [message, setMessage] = useState<string>();
  const { selectedChannel, selectedTeam } = useContext(selectContext);
  const [chatList, setChatList] = useState<DetailChat[]>([]);
  const chatBuffer = useRef<DetailChat[]>([]);
  const { userInfo } = useContext(userContext);
  const { socket } = useContext(socketContext);

  const onAddNewMessage = (chat: DetailChat) => {
    chatBuffer.current = [...chatBuffer.current, chat];
    setChatList(chatBuffer.current);
    setMessage('');
  };

  const onSendMessage = () => {
    const newMessage = {
      teamUuid: selectedTeam?.uuid,
      channelUuid: selectedChannel?.uuid,
      senderUuid: userInfo?.uuid,
      content: message,
    };
    socket?.emit('pushMessage', newMessage);
    console.log(socket);
  };

  useEffect(() => {
    socket?.on('newMessage', (value: any) => onAddNewMessage(value));
  }, [chatBuffer]);

  return (
    <div className="channelRoomContainer">
      <div className="targetInfo">
        {!isDesktopSize && <ArrowBackIosOutlinedIcon fontSize="small" />}
        <p>
          {selectedChannel
            ? `${
                'team_profile' in selectedChannel
                  ? selectedChannel.team_profile?.name ?? selectedChannel.email
                  : selectedChannel.name
              }님과의 채팅방`
            : '채널을 선택해주세요'}
        </p>
      </div>
      <div className="messageBox">
        {chatList.length > 0 ? (
          chatList.map((chat, index, chatArr) => {
            return <ChatItem chat={chat} key={`${chat.uuid}`} />;
          })
        ) : (
          <div className="empty">아직 작성된 메시지가 없습니다.</div>
        )}
      </div>
      <div className="inputBox">
        <Input
          color="primary"
          maxRows={2}
          multiline
          fullWidth
          disableUnderline
          placeholder="메시지를 입력하세요."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div>
          <IconButton
            className="iconButton"
            size="medium"
            color="primary"
            onClick={onSendMessage}
          >
            <Icon fontSize="small" color="primary">
              send
            </Icon>
          </IconButton>
          <IconButton className="iconButton" size="medium" color="primary">
            <PhotoCamera fontSize="small" color="primary" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
