import type {
  Notification,
  Alert,
  NotificationSettings,
} from "@/types/notification";

export const notifications: Notification[] = [
  {
    id: "n1",
    title: "New Ticket Assigned",
    description: "You have been assigned to ticket #1234 - Website Redesign",
    type: "ticket",
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    status: "unread",
    metadata: {
      ticketId: "1234",
    },
  },
  {
    id: "n2",
    title: "New Message",
    description:
      "Sarah Johnson sent you a message in the Website Redesign project",
    type: "message",
    timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    status: "unread",
    metadata: {
      userId: "u123",
      projectId: "p456",
    },
  },
  {
    id: "n3",
    title: "Team Update",
    description: "New team member John Smith has joined the project",
    type: "team",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    status: "read",
    metadata: {
      userId: "u789",
      projectId: "p456",
    },
  },
  {
    id: "n4",
    title: "Ticket Status Update",
    description: "Ticket #1235 - Bug fix has been marked as completed",
    type: "ticket",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    status: "read",
    metadata: {
      ticketId: "1235",
    },
  },
  {
    id: "n5",
    title: "New Message",
    description: "Michael Brown mentioned you in a comment on ticket #1235",
    type: "message",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    status: "read",
    metadata: {
      userId: "u456",
      ticketId: "1235",
    },
  },
  {
    id: "n6",
    title: "Team Update",
    description: "Project deadline has been updated to June 15, 2024",
    type: "team",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    status: "read",
    metadata: {
      projectId: "p456",
    },
  },
  {
    id: "n7",
    title: "New Ticket Created",
    description: "A new ticket has been created: #1237 - API Integration",
    type: "ticket",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    status: "read",
    metadata: {
      ticketId: "1237",
    },
  },
  {
    id: "n8",
    title: "New Message",
    description:
      "Emily Davis shared a document in the Website Redesign project",
    type: "message",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    status: "read",
    metadata: {
      userId: "u789",
      projectId: "p456",
      documentId: "d123",
    },
  },
  {
    id: "n9",
    title: "System Alert",
    description: "Database server is experiencing high load",
    type: "system",
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    status: "unread",
    metadata: {
      alertId: "a1",
    },
  },
  {
    id: "n10",
    title: "System Update",
    description: "CRM system will be undergoing maintenance on June 20, 2024",
    type: "system",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    status: "read",
  },
];

export const alerts: Alert[] = [
  {
    id: "a1",
    title: "Database Performance Degradation",
    description:
      "The main database server is experiencing high CPU usage affecting query performance",
    severity: "high",
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    status: "active",
    source: "System Monitoring",
    affectedEntity: {
      type: "system",
      id: "db-main-01",
      name: "Main Database Server",
    },
  },
  {
    id: "a2",
    title: "API Rate Limit Exceeded",
    description: "External payment API rate limit has been exceeded",
    severity: "medium",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    status: "acknowledged",
    source: "API Gateway",
    assignedTo: {
      id: "u123",
      name: "Sarah Johnson",
    },
  },
  {
    id: "a3",
    title: "Failed Login Attempts",
    description: "Multiple failed login attempts detected for user account",
    severity: "medium",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    status: "active",
    source: "Security Monitoring",
    affectedEntity: {
      type: "user",
      id: "u456",
      name: "Michael Brown",
    },
  },
  {
    id: "a4",
    title: "Storage Space Low",
    description:
      "File storage server is running low on available space (85% used)",
    severity: "low",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    status: "acknowledged",
    source: "System Monitoring",
    affectedEntity: {
      type: "system",
      id: "storage-01",
      name: "Primary Storage Server",
    },
    assignedTo: {
      id: "u789",
      name: "John Smith",
    },
  },
  {
    id: "a5",
    title: "Payment Processing Error",
    description: "Recurring payment processing failed for multiple businesses",
    severity: "critical",
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    status: "active",
    source: "Payment System",
    affectedEntity: {
      type: "system",
      id: "payment-proc-01",
      name: "Payment Processing Service",
    },
  },
  {
    id: "a6",
    title: "SSL Certificate Expiring",
    description:
      "SSL Certificate for the customer portal will expire in 7 days",
    severity: "low",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    status: "resolved",
    source: "Security Monitoring",
    affectedEntity: {
      type: "system",
      id: "web-portal",
      name: "Customer Portal",
    },
  },
  {
    id: "a7",
    title: "Business Integration Error",
    description: "Data synchronization failed for Coffee House Downtown",
    severity: "medium",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    status: "active",
    source: "Integration Service",
    affectedEntity: {
      type: "business",
      id: "b1",
      name: "Coffee House Downtown",
    },
  },
];

export const defaultNotificationSettings: NotificationSettings = {
  emailNotifications: true,
  pushNotifications: true,
  desktopNotifications: false,
  notifyOnNewTicket: true,
  notifyOnTicketUpdate: true,
  notifyOnNewMessage: true,
  notifyOnTeamUpdate: false,
  notifyOnSystemAlert: true,
  digestFrequency: "daily",
};
