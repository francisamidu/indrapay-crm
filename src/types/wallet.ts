interface Wallet {
  wallet_reference_number: string;
  wallet_currency: string;
  wallet_status: "ACTIVE" | "INACTIVE" | "FROZEN";
  wallet_is_frozen: boolean;
  wallet_balance: number;
  wallet_ledger_balance: number;
  wallet_pending_holds: number;
  wallet_country_code: string | null;
}

interface FreezeWalletRequest {
  reason: string;
}

export type { Wallet, FreezeWalletRequest };
