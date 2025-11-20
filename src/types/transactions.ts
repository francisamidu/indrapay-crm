interface Transaction {
  id: string;
  ledger_entry_type:
    | "FUND"
    | "WITHDRAW"
    | "TRANSFER"
    | "CONVERT"
    | "FEE"
    | "TAX";
  ledger_entry_amount: number;
  ledger_entry_currency: string;
  ledger_entry_status:
    | "PENDING"
    | "COMPLETED"
    | "FAILED"
    | "REVERSED"
    | "INITIATED";
  ledger_entry_fee_amount?: number;
  ledger_entry_created_at_information: string;
  ledger_entry_debit_wallet_informationId?: string;
  ledger_entry_credit_wallet_informationId?: string;
}

interface TransactionSearchParams {
  transactionId?: string;
  userId?: string;
  walletId?: string;
  status?: Transaction["ledger_entry_status"];
  currency?: string;
  railType?: string;
  minAmount?: number;
  maxAmount?: number;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

interface RefundRequest {
  amount: number;
  reason: string;
}

interface ReverseTransactionRequest {
  reason: string;
}
export type {
  Transaction,
  TransactionSearchParams,
  RefundRequest,
  ReverseTransactionRequest,
};
