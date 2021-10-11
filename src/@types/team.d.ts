export {};

declare global {
  type Team = {
    avatar: string;
    is_private: boolean;
    create_date: string;
    description: string;
    name: string;
    owner: UserDetail;
    update_date: string;
    uuid: string;
  };

  type MyTeam = {
    channel_uuid: Channel;
    create_date: string;
    id: number;
    team_uuid: Team;
    user_uuid: User;
  };

  type TeamParticipant = Team & {
    email: string;
    team_profile: TeamUser;
  };
}
