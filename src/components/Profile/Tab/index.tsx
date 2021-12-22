import React, { useContext, useState, useEffect } from 'react';
import Modal from '../EditModal';
import userContext from 'context/user';
import profileContext from 'context/profile';
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
  const { setProfile, profile } = useContext(profileContext);
  const { userInfo } = useContext(userContext);

  if (!profile) {
    return <div>사용자 정보가 없습니다.</div>;
  }

  const onClose = (response: TeamProfile) => {
    setProfile(response);
    setShowModal(false);
  };
  console.log(userInfo?.uuid, profile);
  return (
    <>
      {showModal && <Modal onClose={onClose} profileInfo={profile} />}
      <div className="profileContainer">
        <header>
          <p>프로필</p>
          <div onClick={() => setProfile(undefined)} className="closeButton">
            <CloseOutlined />
          </div>
        </header>
        <div className="imgBox">
          <img src={profile?.avatar} />
          <div className="name">
            {profile?.name ?? profile?.email ?? '닉네임이 없습니다'}
          </div>
          <div className="subBox">
            {profile && userInfo?.uuid === profile.uuid ? (
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
          <li>Position</li>
          <li>{profile?.position ?? '내용없음'}</li>
          <li>Contact</li>
          <li>{profile?.contact ?? '내용없음'}</li>
          {/* <li>Email address</li>
          <li>{userInfo?.email}</li> */}
        </ul>
      </div>
    </>
  );
};

export default Profile;
