import React, { useContext, useState } from 'react';
import profileContext from 'context/profile';
import Modal from '../EditModal';
import userContext from 'context/user';
import {
  CloseOutlined,
  MoreVert,
  ChatOutlined,
  CreateOutlined,
} from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import './style.scss';

const Profile = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { setProfileId, profileId } = useContext(profileContext);
  const { userInfo } = useContext(userContext);

  if (!userInfo) {
    return <div>사용자 정보가 없습니다.</div>;
  }

  const onClose = () => {
    setShowModal(false);
  };
  return (
    <>
      {showModal && <Modal onClose={onClose} />}
      <div className="profileContainer">
        <header>
          <p>프로필</p>
          <div onClick={() => setProfileId(undefined)} className="closeButton">
            <CloseOutlined />
          </div>
        </header>
        <div className="imgBox">
          <img src={userInfo.avatar} />
          <div className="name">이름이름</div>
          <div className="subBox">
            {/* {profileId && userInfo.id === profileId ? ( */}
            {true ? (
              <div className="itemBox">
                <IconButton onClick={() => setShowModal(true)}>
                  <CreateOutlined fontSize="small" />
                </IconButton>
                <p>수정하기</p>
              </div>
            ) : (
              <div className="itemBox">
                <IconButton>
                  <ChatOutlined fontSize="small" />
                </IconButton>
                <p>메시지</p>
              </div>
            )}
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
    </>
  );
};

export default Profile;
