import React, { useContext, useMemo } from 'react';
import Button from '@material-ui/core/Button';
import { deleteTeam, joinTeam, getMyTeams } from 'api/team';
import teamContext from 'context/team';
import userContext from 'context/user';
import './style.scss';

type RoomCardProps = {
  teamInfo: Team;
  join: boolean;
};

const RoomItem = ({ teamInfo, join }: RoomCardProps) => {
  const { userInfo } = useContext(userContext);
  const { setTeamList, teamList } = useContext(teamContext);
  const isTeamOwner = useMemo(() => {
    if (userInfo) {
      return userInfo?.id === teamInfo.owner?.id;
    }
    return false;
  }, [userInfo]);

  return (
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
      <Button color="primary" fullWidth>
        {join ? (
          isTeamOwner ? (
            <div
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
            </div>
          ) : (
            '나가기'
          )
        ) : (
          <div
            onClick={() => {
              joinTeam(teamInfo.uuid).then((res) => {
                console.log(res);
                getMyTeams().then((res) => {
                  console.log(res);
                  setTeamList(res.map((team) => team.team_uuid));
                });
              });
            }}
          >
            참여
          </div>
        )}
      </Button>
    </div>
  );
};

export default RoomItem;
