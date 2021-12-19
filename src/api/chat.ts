import client from 'api/client';

// 최근 10개의 채널 메세지를 받아옴
export const getPrevChannelChat = async (
  channel_uuid: string
): Promise<DetailChat[]> => {
  const response = await client.get<DetailChat[]>('/message', {
    params: { channel_uuid: channel_uuid, count: 20 },
  });

  return response.data;
};

// 최근 10개의 DM 메세지를 받아옴
export const getPrevDMChat = async (
  sender: string,
  receiver: string,
  team_uuid: string
): Promise<DetailChat[]> => {
  const response = await client.get<DetailChat[]>('/message', {
    params: {
      sender_uuid: sender,
      receiver_uuid: receiver,
      team_uuid,
      message_type: 'direct_message',
      count: 20,
    },
  });

  return response.data;
};
