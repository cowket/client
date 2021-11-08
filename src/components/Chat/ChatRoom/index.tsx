import React, { useContext, useState, useEffect, useRef } from 'react';
import useDesktopSize from 'hooks/useDesktopSize';
import selectContext from 'context/select';
import { getPrevChannelChat, getPrevDMChat } from 'api/chat';
import { getChannelDetail } from 'api/channel';
import { isFirstMessage, dateToShortDate } from 'util/dateUtil';
import socketContext from 'context/socket';
import userContext from 'context/user';
import ChatItem from 'components/Chat/ChatItem';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
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
  const [joinedUsers, setJoinedUsers] = useState<ChannelUser[]>([]);
  const channelIdRef = useRef<string>();
  const topChatInfo = useRef<DetailChat | undefined>();
  const prevViewportHeight = useRef<number>(0);

  const onAddPrevMessage = (chat: DetailChat[]) => {
    setChatList((v) => [...chat.reverse(), ...v]);
    topChatInfo.current = chat[0];
  };

  const onAddNewMessage = (chat: DetailChat) => {
    if (
      (chat.channel
        ? channelIdRef.current === chat.channel.uuid
        : channelIdRef.current === chat.sender.uuid) ||
      userInfo?.uuid === chat.sender.uuid
    ) {
      chatBuffer.current = [...chatBuffer.current, chat];
      setChatList(chatBuffer.current);
      chatRoomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToBottom = () => {
    if (chatRoomRef.current) {
      chatRoomRef.current.scrollTop = chatRoomRef.current.scrollHeight;
    }
  };

  const lastScrollTop = useRef<number>(0);

  // 채팅방에서 스크롤이 가장 상단에 닿은경우 데이터 더 받아오기
  useEffect(() => {
    if (chatRoomRef.current) {
      chatRoomRef.current.addEventListener('scroll', () => {
        if (
          chatRoomRef.current &&
          chatRoomRef.current.scrollTop === 0 &&
          chatRoomRef.current.scrollTop < lastScrollTop.current
        ) {
          socket?.emit('loadMessage', { topMessage: topChatInfo.current });
        }
        lastScrollTop.current = chatRoomRef.current?.scrollTop ?? 0;
      });
    }
  }, []);

  useEffect(() => {
    // scrollToBottom();
    if (chatRoomRef.current?.scrollHeight) {
      chatRoomRef.current.scrollTop =
        chatRoomRef.current.scrollHeight - prevViewportHeight.current;
      prevViewportHeight.current = chatRoomRef.current.scrollHeight;
    }
  }, [chatList]);

  const onSendMessage = (message: string) => {
    console.log('나의 uuid', userInfo?.uuid);
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
          team_uuid: selectedTeam?.uuid,
          channel_uuid: selectedChannel?.uuid,
          sender_uuid: userInfo?.uuid,
          content: message,
        };
        socket?.emit('pushMessage', newMessage);
      }
    }
    console.log(socket);
  };

  useEffect(() => {
    socket?.on('newMessage', (value: any) => {
      console.log('newMessage여기여기');
      onAddNewMessage(value);
    });
    socket?.on('newDirectMessage', (value: any) => {
      console.log('newDirectMessage여기여기');
      onAddNewMessage(value);
    });
    socket?.on('loadedScrollMessage', (value: DetailChat[]) => {
      onAddPrevMessage(value);
    });
  }, [chatBuffer]);

  useEffect(() => {
    if (selectedChannel && selectedTeam) {
      channelIdRef.current = selectedChannel.uuid;
      if ('email' in selectedChannel && userInfo) {
        getPrevDMChat(
          userInfo.uuid,
          selectedChannel.uuid,
          selectedTeam.uuid
        ).then((res) => {
          const reversed = res.reverse();
          chatBuffer.current = reversed;
          setChatList(reversed);
          topChatInfo.current = res[0];
        });
      } else {
        getPrevChannelChat(selectedChannel.uuid).then((res) => {
          const reversed = res.reverse();
          chatBuffer.current = reversed;

          topChatInfo.current = res[0];
          setChatList(reversed);
        });
      }
      getChannelDetail(selectedChannel.uuid).then((res) =>
        setJoinedUsers(res.members)
      );
    }

    // 채널이 변경되면 초기화해줄것들을 여기서해주기
    topChatInfo.current = undefined;
  }, [selectedChannel]);

  return (
    <div className="channelRoomContainer">
      <div className="targetInfo">
        {!isDesktopSize && <ArrowBackIosOutlinedIcon fontSize="small" />}
        <p>
          {selectedChannel
            ? 'team_profile' in selectedChannel
              ? selectedChannel.team_profile?.name ?? selectedChannel.email
              : selectedChannel.name
            : '채널을 선택해주세요'}
        </p>
        {/* <div className="memberBox">
          {joinedUsers.map((user) => (
            <div className="member">
              {user.team_user_profile?.avatar && (
                <img src={user.team_user_profile.avatar} />
              )}
              <p>{user.team_user_profile?.nickname ?? user.user_uuid.email}</p>
            </div>
          ))}
        </div> */}
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
