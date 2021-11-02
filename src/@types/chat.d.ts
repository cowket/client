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
    receiver: UserDetail;
    team: Team;
    team_user_profile: TeamUser;
    sender_team_user_profile: TeamUser;
    update_date: string;
    uuid: string;
  };
}
