import React, { useContext } from 'react';
import profileContext from 'context/profile';
import { dateToTime } from 'util/dateUtil';
import './style.scss';

type ItemRrops = {
  chat: DetailChat;
};

const Item = ({ chat }: ItemRrops) => {
  const { setProfileId } = useContext(profileContext);
  if (chat.sender === null) {
    return (
      <div className="itemBox">
        <div className="imgBox">
          <img src="https://cdn.britannica.com/55/174255-050-526314B6/brown-Guernsey-cow.jpg" />
        </div>
        <div className="contentBox">
          <div className="userInfo">
            <p className="nickname">관리자</p>
            <p className="time">{dateToTime(new Date(chat?.create_date))}</p>
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
    <div className="itemBox">
      <div className="imgBox" onClick={() => setProfileId(chat.sender.uuid)}>
        <img
          src={
            chat.team_user_profile?.avatar
              ? chat.team_user_profile.avatar
              : chat.sender?.avatar
          }
        />
      </div>
      <div className="contentBox">
        <div className="userInfo">
          <p className="nickname">
            {chat.team_user_profile?.name ?? chat.sender?.email}
          </p>
          <p className="time">{dateToTime(new Date(chat?.create_date))}</p>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: chat.content }}
          className="content"
        />
      </div>
    </div>
  );
};

export default Item;
