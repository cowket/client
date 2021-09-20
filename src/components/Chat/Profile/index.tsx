import React, { useContext } from 'react';
import profileContext from 'context/profile';
import { CloseOutlined, MoreVert, ChatOutlined } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import './style.scss';

const Profile = () => {
  const { setProfileId } = useContext(profileContext);

  return (
    <div className="profileContainer">
      <header>
        <p>프로필</p>
        <div onClick={() => setProfileId(undefined)} className="closeButton">
          <CloseOutlined />
        </div>
      </header>
      <div className="imgBox">
        <img src="http://img.marieclairekorea.com/2017/01/mck_586f3a834b707-375x375.jpg" />
        <div>이름이름</div>
        <div className="subBox">
          <div className="itemBox">
            <IconButton>
              <ChatOutlined fontSize="small" />
            </IconButton>
            <p>메시지</p>
          </div>
          <div className="itemBox">
            <IconButton>
              <MoreVert fontSize="small" />
            </IconButton>
            <p>더보기</p>
          </div>
        </div>
      </div>
      <ul className="detailBox">
        <li>Display name</li>
        <li>Display name</li>
        <li>Local time</li>
        <li>Display name</li>
        <li>Email address</li>
        <li>Display name</li>
      </ul>
    </div>
  );
};

export default Profile;
