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

  type TeamUser = {
    id?: number;
    name?: string;
    position?: string;
    avatar?: string;
    contact?: string;
    create_date?: string;
    team_uuid?: string;
  };
}
