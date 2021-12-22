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
    channel: Channel;
    create_date: string;
    id: number;
    team: Team;
    user: User;
  };

  type TeamParticipant = Team & {
    email: string;
    channel: Channel;
    id: number;
    team: string;
    team_user_profile: TeamProfile;
    user: UserDetail;
  };
}
