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
    members: [
      {
        id: number;
        user_uuid: User;
        team_uuid: Team;
        channel_uuid: Channel;
        create_date: string;
        team_user_profile: User;
      }
    ];
  };
}
