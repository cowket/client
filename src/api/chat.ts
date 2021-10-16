import client from 'api/client';

export const getPrevChat = async (
  channel_uuid: string
): Promise<DetailChat[]> => {
  const response = await client.get<DetailChat[]>(
    `/message?channel_uuid=${channel_uuid}`
  );

  return response.data;
};
