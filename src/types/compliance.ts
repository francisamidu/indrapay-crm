interface CaseNote {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  type: "note" | "action" | "system";
}
export interface ComplianceCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  verificationStatus: "pending" | "verified" | "rejected" | "flagged";
  riskScore: number;
  riskLevel: "low" | "medium" | "high" | "critical";
  documentsSubmitted: string[];
  lastActivity: string;
  registrationDate: string;
  totalTransactions: number;
  totalVolume: number;
  watchlistMatch: boolean;
  sanctionsMatch: boolean;
  priority: "low" | "medium" | "high" | "urgent";
  assignedTo?: string;
  caseNotes: CaseNote[];
}
