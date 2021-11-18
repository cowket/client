import React, { useContext, useState, useEffect, useRef } from 'react';
import useDesktopSize from 'hooks/useDesktopSize';
import selectContext from 'context/select';
import { getPrevChannelChat, getPrevDMChat } from 'api/chat';
import profileContext from 'context/profile';
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
  const { profileId } = useContext(profileContext);
  const chatRoomRef = useRef<HTMLDivElement>(null);
  const { userInfo } = useContext(userContext);
  const { socket } = useContext(socketContext);
  const [joinedUsers, setJoinedUsers] = useState<ChannelUser[]>([]);
  const channelIdRef = useRef<string>();
  const topChatInfo = useRef<DetailChat | undefined>();
  const prevViewportHeight = useRef<number>(0);

  const onAddPrevMessage = (chat: DetailChat[]) => {
    if (chat.length) {
      const reversedList = chat.reverse();
      setChatList((v) => [...reversedList, ...v]);
      chatBuffer.current = [...reversedList, ...chatBuffer.current];
      scrollToPrevChat();
      topChatInfo.current = reversedList[0];
    }
  };

  const onDeleteMessage = (uuid: string) => {
    const filteredList = chatBuffer.current.filter(
      (chat) => chat.uuid !== uuid
    );
    chatBuffer.current = filteredList;
    setChatList(filteredList);
  };

  const onAddNewMessage = (chat: DetailChat) => {
    if (
      (chat.channel
        ? channelIdRef.current === chat.channel.uuid
        : channelIdRef.current === chat.sender.uuid) ||
      userInfo?.uuid === chat.sender.uuid
    ) {
      if (chat.sender.uuid === userInfo?.uuid) {
        console.log('여기가 실행되는겨???');
        scrollToBottom();
      }
      chatBuffer.current = [...chatBuffer.current, chat];
      setChatList(chatBuffer.current);
      chatRoomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToBottom = () => {
    if (chatRoomRef.current) {
      console.log(chatRoomRef.current.scrollHeight);
      chatRoomRef.current.scrollTop = chatRoomRef.current.scrollHeight;
    }
  };

  const scrollToPrevChat = () => {
    if (chatRoomRef.current?.scrollHeight) {
      chatRoomRef.current.scrollTop =
        chatRoomRef.current.scrollHeight - prevViewportHeight.current;
      prevViewportHeight.current = chatRoomRef.current.scrollHeight;
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

  // useEffect(() => {
  //   // scrollToBottom();
  //   if (chatRoomRef.current?.scrollHeight) {
  //     chatRoomRef.current.scrollTop =
  //       chatRoomRef.current.scrollHeight - prevViewportHeight.current;
  //     prevViewportHeight.current = chatRoomRef.current.scrollHeight;
  //   }
  // }, [chatList]);

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
    socket?.on('deletedMessage', (value: { message_uuid: string }) =>
      onDeleteMessage(value.message_uuid)
    );
  }, [chatBuffer]);

  useEffect(() => {
    if (selectedChannel && selectedTeam) {
      scrollToBottom();
      channelIdRef.current = selectedChannel.uuid;
      if ('email' in selectedChannel && userInfo) {
        getPrevDMChat(
          userInfo.uuid,
          selectedChannel.uuid,
          selectedTeam.uuid
        ).then((res) => {
          if (res) {
            const reversed = res.reverse();
            chatBuffer.current = reversed;
            setChatList(reversed);
            topChatInfo.current = res[0];
          } else {
            setChatList([]);
          }
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
    return () => {
      // 채널이 변경되면 초기화해줄것들을 여기서해주기
      chatBuffer.current = [];
      topChatInfo.current = undefined;
      // chatRoomRef.current;
    };
  }, [selectedChannel?.uuid]);

  return (
    <div
      className="channelRoomContainer"
      style={{
        width: profileId ? 'calc(100vw - 600px)' : 'calc(100vw - 300px)',
      }}
    >
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
      <EditBox onSendMessage={onSendMessage} />
    </div>
  );
};

export default ChatRoom;
