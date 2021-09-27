import client from 'api/client';

// 팀 생성
export const postTeam = async (team: {
  name: string;
  is_private: boolean;
}): Promise<Team> => {
  const response = await client.post<any>('/team/new', team);
  return response.data;
};

// 유저의 팀 조회
export const getMyTeams = async (): Promise<Team[]> => {
  const { data: team } = await client.get<Team[]>('/team/all');
  console.log(team);
  return team;
};

// 팀 검색
export const searchTeam = async (keyword: string): Promise<Team[]> => {
  const { data: team } = await client.get<Team[]>(`/team/search/${keyword}`);
  return team;
};
