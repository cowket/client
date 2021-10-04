import client from 'api/client';

// 채널 생성
export const postChannel = async (channel: NewChannel): Promise<Channel> => {
  const response = await client.post<Channel>('/channel', channel);
  return response.data;
};

// 채널 조회
export const getChannel = async (uuid: string): Promise<MyTeam[]> => {
  const response = await client.get<MyTeam[]>(`/channel/all/${uuid}`);
  return response.data;
};
