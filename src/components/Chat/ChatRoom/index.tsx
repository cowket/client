import React, { useContext, useState, useEffect, useRef } from 'react';
import Input from '@material-ui/core/Input';
import useDesktopSize from 'hooks/useDesktopSize';
import selectContext from 'context/select';
import { getPrevChannelChat, getPrevDMChat } from 'api/chat';
import { isFirstMessage, dateToShortDate } from 'util/dateUtil';
import Button from '@material-ui/core/Button';
import socketContext from 'context/socket';
import userContext from 'context/user';
import ChatItem from 'components/Chat/ChatItem';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import EditBox from 'components/Common/EditBox';
import './style.scss';

const ChatRoom = () => {
  const isDesktopSize = useDesktopSize();
  // const [message, setMessage] = useState<string>();
  const { selectedChannel, selectedTeam } = useContext(selectContext);
  const [chatList, setChatList] = useState<DetailChat[]>([]);
  const chatBuffer = useRef<DetailChat[]>([]);
  const chatRoomRef = useRef<HTMLDivElement>(null);
  const { userInfo } = useContext(userContext);
  const { socket } = useContext(socketContext);

  const onAddNewMessage = (chat: DetailChat) => {
    chatBuffer.current = [...chatBuffer.current, chat];
    setChatList(chatBuffer.current);
    chatRoomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    if (chatRoomRef.current) {
      chatRoomRef.current.scrollTop = chatRoomRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [chatList]);

  const onSendMessage = (message: string) => {
    console.log(message);
    if (selectedChannel) {
      if ('email' in selectedChannel) {
        const newMessage = {
          team_uuid: selectedTeam?.uuid,
          sender_uuid: userInfo?.uuid,
          receiver_uuid: selectedChannel.uuid,
          content: message,
        };
        socket?.emit('pushDirectMessage', newMessage);
      } else {
        const newMessage = {
          teamUuid: selectedTeam?.uuid,
          channelUuid: selectedChannel?.uuid,
          senderUuid: userInfo?.uuid,
          content: message,
        };
        socket?.emit('pushMessage', newMessage);
      }
    }
    console.log(socket);
  };

  useEffect(() => {
    socket?.on('newMessage', (value: any) => {
      console.log(value);
      onAddNewMessage(value);
    });
    socket?.on('newDirectMessage', (value: any) => {
      console.log(value);
      onAddNewMessage(value);
    });
  }, [chatBuffer]);

  useEffect(() => {
    if (selectedChannel) {
      if ('email' in selectedChannel && userInfo && selectedTeam) {
        getPrevDMChat(
          userInfo.uuid,
          selectedChannel.uuid,
          selectedTeam.uuid
        ).then((res) => {
          const reversed = res.reverse();
          chatBuffer.current = reversed;
          setChatList(reversed);
        });
      } else {
        getPrevChannelChat(selectedChannel.uuid).then((res) => {
          const reversed = res.reverse();
          chatBuffer.current = reversed;
          setChatList(reversed);
        });
      }
    }
  }, [selectedChannel]);

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
      <div className="messageBox" ref={chatRoomRef}>
        {chatList.length > 0 ? (
          chatList.map((chat, index, chatArr) => {
            if (
              index === 0 ||
              (chatArr.length - 1 !== index &&
                isFirstMessage(
                  new Date(chatArr[index - 1].create_date),
                  new Date(chatArr[index].create_date)
                ))
            ) {
              return (
                <>
                  <div className="divideDate">
                    <hr />
                    <p>{dateToShortDate(new Date(chat.create_date))}</p>
                    <hr />
                  </div>
                  <ChatItem chat={chat} key={`${chat.uuid}`} />
                </>
              );
            }
            return <ChatItem chat={chat} key={`${chat.uuid}`} />;
          })
        ) : (
          <div className="empty">아직 작성된 메시지가 없습니다.</div>
        )}
      </div>
      {/* <div className="inputBox">
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
            disabled={!message}
          >
            <Icon fontSize="small" color={!message ? 'disabled' : 'primary'}>
              send
            </Icon>
          </IconButton>
          <IconButton className="iconButton" size="medium" color="primary">
            <PhotoCamera fontSize="small" color="primary" />
          </IconButton>
        </div>
      </div> */}
      <EditBox onSendMessage={onSendMessage} />
    </div>
  );
};

export default ChatRoom;
