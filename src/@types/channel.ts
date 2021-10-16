export {};

declare global {
  type NewChannel = {
    team_uuid?: string;
    channel_uuid?: string;
    name?: string;
    description?: string;
    password?: string;
    isPrivate: boolean;
  };

  type Channel = {
    uuid: string;
    owner: UserDetail;
    team: Team & {
      is_private: true;
      password: string;
    };
    name: string;
    create_date: string;
    update_date: string;
  };
}
