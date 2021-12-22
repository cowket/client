export {};

declare global {
  type User = {
    id: number;
    uuid: string;
    email: string;
    avatar: string;
    nickname?: string;
    position?: string;
    contact?: string;
  };

  type UserDetail = User & {
    create_date: string;
    update_date: string;
    statusCode: number;
  };

  type TeamProfile = {
    id?: number;
    name?: string;
    position?: string;
    email?: string;
    avatar?: string;
    contact?: string;
    create_date?: string;
    uuid?: string;
    team_uuid?: string;
  };

  type ChannelUser = {
    channel: Channel;
    create_date: string;
    id: number;
    team_user_profile: User;
    team_uuid: string;
    user: User;
  };
}
