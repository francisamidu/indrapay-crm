// Basic types that will be expanded as we build the application
export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "agent" | "compliance";
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  status: "active" | "suspended" | "closed";
  createdAt: Date;
  walletBalance: number;
}

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed" | "refunded";
  createdAt: Date;
  customerId: string;
  corridorId: string;
}
