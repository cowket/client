export {};

declare global {
  type User = {
    avatar: string;
    create_date: string;
    email: string;
    id: number;
    update_date: string;
    uuid: string;
    statusCode: number;
  };
}
