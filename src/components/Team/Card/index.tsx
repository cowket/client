import React, { useContext, useMemo, useState } from 'react';
import Button from '@material-ui/core/Button';
import { deleteTeam, joinTeam, getMyTeams } from 'api/team';
import teamContext from 'context/team';
import userContext from 'context/user';
import PasswordModal from '../PasswordModal';
import './style.scss';

type RoomCardProps = {
  teamInfo: Team;
  join: boolean;
};

const RoomItem = ({ teamInfo, join }: RoomCardProps) => {
  const { userInfo } = useContext(userContext);
  const { setTeamList, teamList } = useContext(teamContext);
  const [showModal, setShowModal] = useState<boolean>(false);
  const isTeamOwner = useMemo(() => {
    if (userInfo) {
      return userInfo?.uuid === teamInfo.owner?.uuid;
    }
    return false;
  }, [userInfo]);

  return (
    <>
      {showModal && (
        <PasswordModal
          teamInfo={teamInfo}
          onClose={() => setShowModal(false)}
        />
      )}
      <div className="roomCardContainer">
        <header>
          <div className="imgBox">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Photos_icon_%282020%29.svg/250px-Google_Photos_icon_%282020%29.svg.png" />
          </div>
          <p className="roomName">{teamInfo.name}</p>
        </header>
        <section>
          <p className="desc">
            {teamInfo.description ?? '팀에 대한 설명이 없습니다.'}
          </p>
        </section>
        {join ? (
          isTeamOwner ? (
            <Button
              color="primary"
              fullWidth
              onClick={async () => {
                const response = await deleteTeam(teamInfo.uuid);
                if (response) {
                  setTeamList(
                    teamList.filter((team) => team.uuid !== teamInfo.uuid)
                  );
                }
              }}
            >
              팀 삭제
            </Button>
          ) : (
            <Button
              color="primary"
              fullWidth
              onClick={async () => {
                // const response = await deleteTeam(teamInfo.uuid);
                // if (response) {
                //   setTeamList(
                //     teamList.filter((team) => team.uuid !== teamInfo.uuid)
                //   );
                // }
              }}
            >
              나가기
            </Button>
          )
        ) : (
          <Button
            color="primary"
            fullWidth
            disabled={
              teamList.findIndex((team: Team) => team.uuid === teamInfo.uuid) >=
              0
            }
            onClick={() => {
              if (teamInfo.is_private) {
                setShowModal(true);
              } else {
                joinTeam(teamInfo.uuid).then((res) => {
                  getMyTeams().then((res) => {
                    setTeamList(res.map((grant) => grant.team));
                  });
                });
              }
            }}
          >
            참여 {teamInfo.is_private && `(비공개 방)`}
          </Button>
        )}
      </div>
    </>
  );
};

export default RoomItem;
