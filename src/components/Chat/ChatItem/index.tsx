import React, { useContext } from 'react';
import profileContext from 'context/profile';
import { dateToTime } from 'util/dateUtil';
import './style.scss';

type ItemRrops = {
  chat: DetailChat;
};

const Item = ({ chat }: ItemRrops) => {
  const { setProfileId } = useContext(profileContext);
  return (
    <div className="itemBox">
      <div
        className="imgBox"
        onClick={() => setProfileId('302d64d4-fd1e-4934-a1dc-d484237e9b69')}
      >
        <img
          src={
            chat.team_user_profile?.avatar
              ? `https://cowket-api.stackunderflow.xyz/uploads/${chat.team_user_profile.avatar}`
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRYqMHzMUsp7gf5ZEQmifMinddKJNovbobVOvNKJsnSPk6TW_oUIOhVqEwpWP4MvS-k8s&usqp=CAU'
          }
        />
      </div>
      <div className="contentBox">
        <div className="userInfo">
          <p className="nickname">
            {chat.team_user_profile?.name ?? chat.sender.email}
          </p>
          <p className="time">{dateToTime(new Date(chat.create_date))}</p>
        </div>
        <div dangerouslySetInnerHTML={{ __html: chat.content }} />
      </div>
    </div>
  );
};

export default Item;
