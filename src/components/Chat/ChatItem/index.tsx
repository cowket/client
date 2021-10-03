import React, { useContext } from 'react';
import profileContext from 'context/profile';
import { dateToTime } from 'util/dateUtil';
import './style.scss';

type ItemRrops = {
  chat: Chat;
};

const Item = ({ chat }: ItemRrops) => {
  const { setProfileId } = useContext(profileContext);
  return (
    <div className="itemBox">
      <div
        className="imgBox"
        onClick={() => setProfileId('302d64d4-fd1e-4934-a1dc-d484237e9b69')}
      >
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRYqMHzMUsp7gf5ZEQmifMinddKJNovbobVOvNKJsnSPk6TW_oUIOhVqEwpWP4MvS-k8s&usqp=CAU" />
      </div>
      <div className="contentBox">
        <div className="userInfo">
          <p className="nickname">{chat.name}</p>
          <p className="time">{dateToTime(chat.date)}</p>
        </div>
        <div className="content">{chat.text}</div>
      </div>
    </div>
  );
};

export default Item;
