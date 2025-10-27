export interface MonthlyVolumeData {
  month: string;
  volume: number;
  transactions: number;
}

export interface CorridorData {
  name: string;
  transactions: number;
  volume: number;
  color: string;
}

export interface Transaction {
  id: string;
  amount: number;
  status: "success" | "failed" | "pending";
  customer: string;
  corridor: string;
  timestamp: string;
}

export interface KPIData {
  totalTransactions: number;
  activeWallets: number;
  successRate: number;
  totalVolume: number;
}

export interface DashboardAlert {
  id: string;
  type: "error" | "warning" | "info";
  message: string;
  timestamp: string;
}
