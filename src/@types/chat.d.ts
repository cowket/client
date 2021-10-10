export {};

declare global {
  type Chat = {
    name: string;
    date: Date;
    text: string;
  };
  type DetailChat = {
    channel: Channel;
    content: string;
    create_date: string;
    is_updated: boolean;
    sender: UserDetail;
    team: Team;
    update_date: string;
    uuid: string;
  };
}
