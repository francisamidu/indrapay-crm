export type NotificationType =
  | "ticket"
  | "message"
  | "team"
  | "system"
  | "alert";
export type NotificationStatus = "read" | "unread";
export type AlertSeverity = "low" | "medium" | "high" | "critical";

export interface Notification {
  id: string;
  title: string;
  description: string;
  type: NotificationType;
  timestamp: Date;
  status: NotificationStatus;
  metadata?: {
    ticketId?: string;
    userId?: string;
    projectId?: string;
    documentId?: string;
    alertId?: string;
  };
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  timestamp: Date;
  status: "active" | "acknowledged" | "resolved";
  source: string;
  affectedEntity?: {
    type: "business" | "system" | "user";
    id: string;
    name: string;
  };
  assignedTo?: {
    id: string;
    name: string;
  };
}

export interface NotificationFilter {
  type?: NotificationType | "all";
  status?: NotificationStatus | "all";
  timeRange?: "today" | "yesterday" | "week" | "month" | "all";
  search?: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  desktopNotifications: boolean;
  notifyOnNewTicket: boolean;
  notifyOnTicketUpdate: boolean;
  notifyOnNewMessage: boolean;
  notifyOnTeamUpdate: boolean;
  notifyOnSystemAlert: boolean;
  digestFrequency: "immediate" | "hourly" | "daily" | "weekly" | "never";
}
