export {};

declare global {
  type NewChannel = {
    team_uuid?: string;
    channel_uuid?: string;
    name?: string;
    description?: string;
    password?: string;
    is_private: boolean;
  };

  type Channel = {
    uuid: string;
    owner: UserDetail;
    team: Team & {
      is_private: boolean;
      password: string;
    };
    is_private: boolean;
    description?: string;
    name: string;
    create_date: string;
    update_date: string;
  };

  type ChannelDetail = {
    uuid: string;
    owner: User;
    team: Team;
    name: string;
    create_date: string;
    update_date: string;
    description: string;
    unique: boolean;
    is_private: boolean;
    members: ChannelUser[];
  };
}
