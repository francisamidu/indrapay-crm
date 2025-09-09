export interface BulkPayout {
  id: string;
  fileName: string;
  uploadDate: string;
  status: "pending" | "processing" | "completed" | "failed";
  totalAmount: number;
  recordCount: number;
  validRecords: number;
  invalidRecords: number;
}

export interface ManualTransaction {
  id: string;
  type: "adjustment" | "correction" | "reversal";
  amount: number;
  description: string;
  createdBy: string;
  createdAt: string;
  status: "pending" | "approved" | "rejected";
}

export interface SupportTicket {
  id: string;
  title: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "in-progress" | "resolved" | "closed";
  assignee: string;
  createdAt: string;
  linkedTransactions: string[];
}
