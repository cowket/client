import client from 'api/client';

// 채널 생성
export const postChannel = async (channel: NewChannel): Promise<Channel> => {
  const response = await client.post<Channel>('/channel', channel);
  return response.data;
};
