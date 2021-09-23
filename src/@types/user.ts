export {};

declare global {
  type User = {
    id: number;
    uuid: string;
    email: string;
    avatar: string;
  };

  type UserDetail = User & {
    create_date: string;
    update_date: string;
    statusCode: number;
  };
}
