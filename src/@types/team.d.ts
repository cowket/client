export {};

declare global {
  type Team = {
    avatar: string;
    create_date: string;
    name: string;
    owner: UserDetail;
    update_date: string;
    uuid: string;
  };
}
