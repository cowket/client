import client from 'api/client';

// 사용자 정보 수정
export const putUserInfo = async (userInfo: User): Promise<UserDetail> => {
  const response = await client.put<UserDetail>('/users', userInfo);
  return response.data;
};
