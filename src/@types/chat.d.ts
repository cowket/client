export {};

declare global {
  type Chat = {
    name: string;
    date: Date;
    text: string;
  };

  type Reaction = {
    create_date: string;
    reaction_item: { content: string; create_date: string; id: number };
  };

  type DetailChat = {
    channel: Channel;
    content: string;
    create_date: string;
    is_updated: boolean;
    reactions: Reaction[];
    sender: UserDetail;
    receiver: UserDetail;
    team: Team;
    team_user_profile: TeamProfile;
    sender_team_user_profile: TeamProfile;
    update_date: string;
    uuid: string;
  };
}
