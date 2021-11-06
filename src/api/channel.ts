import client from 'api/client';

// 채널 생성
export const postChannel = async (channel: NewChannel): Promise<Channel> => {
  const response = await client.post<Channel>('/channel', channel);
  return response.data;
};

// 채널 수정
export const editChannel = async (channel: NewChannel): Promise<Channel> => {
  const response = await client.put<Channel>('/channel', channel);
  return response.data;
};

// 채널 조회
export const getChannel = async (uuid: string): Promise<MyTeam[]> => {
  const response = await client.get<MyTeam[]>(`/channel/all/${uuid}`);
  return response.data;
};

// 채널 삭제
export const deleteChannel = async (channel: NewChannel): Promise<string> => {
  const response = await client.delete<string>('/channel', { data: channel });
  return response.data;
};

// 공개 채널 조회
export const getAllChannelList = async (team_uuid: string): Promise<Team[]> => {
  const response = await client.get<Team[]>(
    `/channel/public?team_uuid=${team_uuid}`
  );
  return response.data;
};

// 공개 채널 참여
export const joinChannel = async (
  team_uuid: string,
  channel_uuid: string
): Promise<boolean> => {
  const response = await client.post<boolean>('/channel/public', {
    team_uuid,
    channel_uuid,
  });
  return response.data;
};

// 비공개 채널에 참여자 추가
export const inviteUserPrivateChan = async (
  team_uuid: string,
  channel_uuid: string,
  user_uuids: string[]
): Promise<boolean> => {
  const response = await client.post<boolean>(`/channel/invite?team_uuid`, {
    team_uuid,
    channel_uuid,
    user_uuids,
  });
  return response.data;
};

// 비공개 채널에서 소유자가 참여자를 추가시킬 때, 유저 리스트를 조회
export const getInviteUserList = async (
  team_uuid: string,
  channel_uuid: string
): Promise<User[]> => {
  const response = await client.get<User[]>(
    `/channel/invite/users?team_uuid=${team_uuid}&channel_uuid=${channel_uuid}`
  );
  return response.data;
};

// 채널에 참여가능한 유저리스트 조회
export const getJoinedUsers = async (
  team_uuid: string,
  channel_uuid: string
): Promise<User[]> => {
  const response = await client.get<User[]>(
    `/channel/invite/users?team_uuid=${team_uuid}&channel_uuid=${channel_uuid}`
  );
  return response.data;
};
