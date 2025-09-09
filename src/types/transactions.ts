export interface TransactionDetail {
  id: string;
  amount: number;
  status: "success" | "failed" | "pending" | "cancelled";
  sender: {
    name: string;
    email: string;
    country: string;
  };
  receiver: {
    name: string;
    email: string;
    country: string;
  };
  corridor: string;
  fees: number;
  fxRate: number;
  timestamp: string;
  type: "transfer" | "payment" | "refund";
  reference: string;
}

export interface TransactionKPIs {
  paymentSuccess: { amount: number; change: number };
  paymentPending: { amount: number; change: number };
  totalProcessed: { count: number; change: number };
  totalTransactions: { count: number; change: number };
  totalCancelled: { count: number; change: number };
}
