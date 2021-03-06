import React, { useContext, useState, useEffect } from 'react';
import profileContext from 'context/profile';
import {
  CommentOutlined,
  EditOutlined,
  DeleteForeverOutlined,
  TagFacesOutlined,
} from '@material-ui/icons';
import socketContext from 'context/socket';
import selectContext from 'context/select';
import userContext from 'context/user';
import EmojiBox from 'components/Common/EmojiBox';
import { dateToTime } from 'util/dateUtil';
import './style.scss';
import { getUserDetail } from 'api/user';

type ItemRrops = {
  chat: DetailChat;
};

const Item = ({ chat }: ItemRrops) => {
  const { userInfo } = useContext(userContext);
  const { socket } = useContext(socketContext);
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  // 텍스트에 마우스호버 || 아이콘 박스 클릭시 선택된 상태가 유지되도록 처리하기위한 값
  const [showOptionBox, setShowOptionBox] = useState<boolean>(false);
  const { selectedTeam } = useContext(selectContext);

  const onDeleteMessage = () => {
    if (socket) {
      socket.emit('deleteMessage', {
        message_uuid: chat.uuid,
        channel_uuid: chat.channel.uuid,
      });
    }
  };

  const { setProfile } = useContext(profileContext);

  const onSelectProfile = (profileId: string) => {
    if (selectedTeam) {
      getUserDetail(selectedTeam.uuid, profileId).then((res) => {
        setProfile({ ...res, uuid: profileId });
      });
    }
  };

  if (chat.sender === null) {
    return (
      <div className="itemBox">
        <div className="imgBox">
          <img src="https://cdn.britannica.com/55/174255-050-526314B6/brown-Guernsey-cow.jpg" />
        </div>
        <div className="contentBox">
          <div className="userInfo">
            <p className="nickname">관리자</p>
            <p className="time">{dateToTime(new Date(chat.create_date))}</p>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: chat.content }}
            className="content"
          />
        </div>
      </div>
    );
  }
  return (
    <div
      className={`itemBox ${showOptionBox && 'focused'}`}
      onMouseEnter={() => setShowOptionBox(true)}
      onMouseLeave={() => {
        if (!showEmoji) {
          setShowOptionBox(false);
        }
      }}
    >
      <div
        className="imgBox"
        onClick={() => {
          onSelectProfile(chat.sender.uuid);
        }}
      >
        <img
          src={
            chat?.team_user_profile?.avatar ??
            chat?.sender_team_user_profile?.avatar ??
            chat.sender?.avatar
          }
        />
      </div>

      <div className="contentBox">
        <div className="userInfo">
          <p className="nickname">
            {chat?.team_user_profile?.name ??
              chat?.sender_team_user_profile?.name ??
              chat.sender?.email}
          </p>
          <p className="time">{dateToTime(new Date(chat?.create_date))}</p>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: chat.content }}
          className="content"
        />

        {chat.reactions.length > 0 && (
          <div className="reactionBox">
            {chat.reactions.map((react) => (
              <div
                dangerouslySetInnerHTML={{
                  __html: `<p>&#x${react.reaction_item.content};</p>`,
                }}
                className="reaction"
              />
            ))}
          </div>
        )}

        <ul className="additionalBox">
          <li onClick={() => setShowEmoji(!showEmoji)}>
            <TagFacesOutlined fontSize="small" htmlColor="#80808f" />
          </li>
          <li>
            <CommentOutlined fontSize="small" htmlColor="#80808f" />
          </li>
          {chat.sender.uuid === userInfo?.uuid && (
            <>
              <li>
                <EditOutlined fontSize="small" htmlColor="#80808f" />
              </li>
              <li onClick={onDeleteMessage}>
                <DeleteForeverOutlined fontSize="small" htmlColor="#80808f" />
              </li>
            </>
          )}
          {showEmoji && (
            <EmojiBox
              messageInfo={chat}
              onSelectEmoji={(value) => {
                setShowEmoji(false);
              }}
            />
          )}
        </ul>
      </div>
    </div>
  );
};

export default Item;
