// Types
export type User = {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
  settings: UserSettings;
  teams: TeamMember[];
  notifications: Notification[];
};

export type UserSettings = {
  emailNotifications: boolean;
  pushNotifications: boolean;
  theme: string;
  timezone: string;
};

export type TeamMember = {
  team: {
    name: string;
    description: string | null;
  };
  role: "OWNER" | "ADMIN" | "MEMBER";
};

export type Notification = {
  id: string;
  type:
    | "TODO_ASSIGNED"
    | "TODO_DUE_SOON"
    | "TODO_COMPLETED"
    | "COMMENT_ADDED"
    | "TEAM_INVITATION";
  content: string;
  read: boolean;
  createdAt: Date;
};
