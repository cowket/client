import client from 'api/client';

// 최근 10개의 채널 메세지를 받아옴
export const getPrevChannelChat = async (
  channel_uuid: string
): Promise<DetailChat[]> => {
  const response = await client.get<DetailChat[]>(
    `/message?channel_uuid=${channel_uuid}`
  );

  return response.data;
};

// 최근 10개의 DM 메세지를 받아옴
export const getPrevDMChat = async (
  sender: string,
  receiver: string,
  team_uuid: string
): Promise<DetailChat[]> => {
  const response = await client.get<DetailChat[]>(
    `/message/dm?sender=${sender}&receiver=${receiver}&team_uuid=${team_uuid}`
  );

  return response.data;
};

// 최근 10개의 DM 메세지를 받아옴
export const getChatLog = async (): Promise<any> => {
  const response = await client.get<any>('/health/session');
  console.log(response.data);

  return 'test';
};
