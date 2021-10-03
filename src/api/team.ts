import client from 'api/client';

// 팀 생성
export const postTeam = async (team: {
  name: string;
  description: string;
  is_private: boolean;
  password?: string;
}): Promise<Team> => {
  const response = await client.post<any>('/team/new', team);
  return response.data;
};

// 팀 참여자 리스트 받아오기
export const getTeamParticipants = async (
  teamUuid: string
): Promise<TeamParticipant[]> => {
  const { data: team } = await client.get<TeamParticipant[]>(
    `/team/grant/all/${teamUuid}`
  );
  console.log(team);
  return team;
};

// 유저의 팀 조회
export const getMyTeams = async (): Promise<MyTeam[]> => {
  const { data: team } = await client.get<MyTeam[]>('/users/grant/team');
  console.log(team);
  return team;
};

// 팀 검색
export const searchTeam = async (keyword: string): Promise<Team[]> => {
  if (keyword.length < 2) {
    const { data: team } = await client.get<Team[]>(`/team`);
    return team;
  }
  const { data: team } = await client.get<Team[]>(`/team/search/${keyword}`);
  return team;
};

// 팀 삭제
export const deleteTeam = async (uuid: string): Promise<boolean> => {
  const { data } = await client.delete<boolean>(`/team/${uuid}`);
  return data;
};

// 팀 가입
export const joinTeam = async (
  uuid: string,
  password?: string
): Promise<string> => {
  const { data } = await client.post<string>(`/team/enter`, {
    team_uuid: uuid,
    password,
  });
  return data;
};
