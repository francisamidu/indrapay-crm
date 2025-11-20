interface Case {
  id: string;
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  category: "TRANSACTION" | "COMPLIANCE" | "TECHNICAL" | "ACCOUNT" | "OTHER";
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  customerId?: string;
  transactionId?: string;
  assigneeId?: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

interface CreateCaseRequest {
  title: string;
  description: string;
  priority?: Case["priority"];
  category: Case["category"];
  customerId?: string;
  transactionId?: string;
  metadata?: Record<string, any>;
}

interface CaseSearchParams {
  status?: Case["status"];
  priority?: Case["priority"];
  assigneeId?: string;
  category?: Case["category"];
  customerId?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export type { Case, CreateCaseRequest, CaseSearchParams };
