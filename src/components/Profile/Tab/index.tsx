import React, { useContext, useState, useEffect } from 'react';
import profileContext from 'context/profile';
import Modal from '../EditModal';
import userContext from 'context/user';
import selectContext from 'context/select';
import { getUserDetail } from 'api/user';
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
  const [userProfile, setUserProfile] = useState<TeamUser>();
  const { setProfileId, profileId } = useContext(profileContext);
  const { userInfo } = useContext(userContext);
  const { selectedTeam } = useContext(selectContext);

  useEffect(() => {
    if (selectedTeam?.uuid && profileId) {
      getUserDetail(selectedTeam.uuid, profileId).then((res) =>
        setUserProfile(res)
      );
    }
  }, [profileId]);

  if (!userInfo) {
    return <div>사용자 정보가 없습니다.</div>;
  }
  const onClose = (response: TeamUser) => {
    if (response) {
      setUserProfile(response);
    }
    setShowModal(false);
  };
  return (
    <>
      {showModal && <Modal onClose={onClose} profileInfo={userProfile} />}
      <div className="profileContainer">
        <header>
          <p>프로필</p>
          <div onClick={() => setProfileId(undefined)} className="closeButton">
            <CloseOutlined />
          </div>
        </header>
        <div className="imgBox">
          <img
            src={`https://cowket-api.stackunderflow.xyz/uploads/${userProfile?.avatar}`}
          />
          <div className="name">{userProfile?.name ?? '닉네임이 없습니다'}</div>
          <div className="subBox">
            {profileId && userInfo.uuid === profileId ? (
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
          <li>{userProfile?.position}</li>
          <li>Contact</li>
          <li>{userProfile?.contact}</li>
          <li>Email address</li>
          <li>{userInfo?.email}</li>
        </ul>
      </div>
    </>
  );
};

export default Profile;
