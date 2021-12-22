import client from 'api/client';

// 팀 내 사용자 정보 생성
export const postUserInfo = async (
  userInfo: TeamProfile
): Promise<UserDetail> => {
  const response = await client.post<UserDetail>('/team/profile', userInfo);
  return response.data;
};

// 팀 내 사용자 정보 수정
export const putUserInfo = async (
  userInfo: TeamProfile
): Promise<UserDetail> => {
  const response = await client.put<UserDetail>('/team/profile', userInfo);
  return response.data;
};

// 사용자 프로필 정보 받아오기
export const getUserDetail = async (
  team_uuid: string,
  user_uuid: string
): Promise<TeamProfile> => {
  const response = await client.get<TeamProfile>(
    `/team/profile?team_uuid=${team_uuid}&user_uuid=${user_uuid}`
  );
  return response.data;
};
