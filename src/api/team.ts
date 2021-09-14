import client from 'api/client';

// 팀 생성
export const postTeam = async (name: string): Promise<any> => {
  const response = await client.post<any>('/team/new', { name });
  console.log(response);
  return response;
};

// 유저의 팀 조회
export const getMyTeams = async (): Promise<Team[]> => {
  const { data: team } = await client.get<Team[]>('/team/all');
  console.log(team);
  return team;
};
