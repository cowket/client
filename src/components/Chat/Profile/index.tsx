import React, { useContext } from 'react';
import profileContext from 'context/profile';
import './style.scss';

const Profile = () => {
  const { setProfileId } = useContext(profileContext);

  return (
    <div className="profileContainer">
      <header>
        <p>프로필</p>
        <div onClick={() => setProfileId(undefined)}>끄기</div>
      </header>
      <div>
        <img />
        <div>
          <div>dd</div>
          <p>메시지</p>
        </div>
        <div>
          <div>dd</div>
          <p>더보기</p>
        </div>
      </div>
      <ul>
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
