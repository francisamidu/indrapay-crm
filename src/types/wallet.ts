import { z } from "zod";
import { ISO_CURRENCY, ISO_COUNTRY, UUID, DateTimeString } from "./common";
import { ApiEnvelope } from "./api-envelope";

export const CreateWalletRequestSchema = z.object({
  defaultCurrency: ISO_CURRENCY.nullable().optional(),
});
export type CreateWalletRequest = z.infer<typeof CreateWalletRequestSchema>;

export const WalletDataSchema = z.object({
  wallet_reference_number: z.string().uuid(),
  wallet_currency: ISO_CURRENCY,
  wallet_status: z.enum(["ACTIVE", "INACTIVE", "FROZEN"]),
  wallet_is_frozen: z.boolean(),
  wallet_balance: z.number(),
  wallet_ledger_balance: z.number(),
  wallet_pending_holds: z.number(),
  wallet_country_code: ISO_COUNTRY.nullable().optional(),
});
export type WalletData = z.infer<typeof WalletDataSchema>;
export const CreateWalletResponseSchema = ApiEnvelope(WalletDataSchema);
export type CreateWalletResponse = z.infer<typeof CreateWalletResponseSchema>;

const BaseTransactionRequestSchema = z.object({
  userId: UUID.optional(),
  amount: z
    .number()
    .min(0)
    .refine((n) => n > 0, "amount must be > 0"),
  currency: ISO_CURRENCY,
  referenceId: z.string().min(1),
  complianceStatus: z
    .enum(["VERIFIED", "PENDING", "SANCTIONED"])
    .nullable()
    .optional(),
  countryCode: ISO_COUNTRY.nullable().optional(),
  type: z.enum(["FUND", "WITHDRAW", "TRANSFER", "CONVERT", "FEE", "TAX"]),
});
export type BaseTransactionRequest = z.infer<
  typeof BaseTransactionRequestSchema
>;

export const FundWalletRequestSchema = BaseTransactionRequestSchema.extend({
  userId: UUID,
  type: z.literal("FUND"),
  paymentMethod: z.string().nullable().optional(),
  sourceDetails: z.record(z.any()).nullable().optional(),
});
export type FundWalletRequest = z.infer<typeof FundWalletRequestSchema>;

export const WithdrawWalletRequestSchema = BaseTransactionRequestSchema.extend({
  userId: UUID,
  type: z.literal("WITHDRAW"),
  destination: z.object({
    type: z.string().min(1),
    details: z.record(z.any()),
  }),
});
export type WithdrawWalletRequest = z.infer<typeof WithdrawWalletRequestSchema>;

export const TransferWalletRequestSchema = BaseTransactionRequestSchema.extend({
  userId: UUID,
  recipientUserId: UUID,
  type: z.literal("TRANSFER"),
  note: z.string().nullable().optional(),
});
export type TransferWalletRequest = z.infer<typeof TransferWalletRequestSchema>;

export const ConvertWalletRequestSchema = BaseTransactionRequestSchema.extend({
  userId: UUID,
  fromCurrency: ISO_CURRENCY,
  toCurrency: ISO_CURRENCY,
  type: z.literal("CONVERT"),
  rateLockId: UUID.nullable().optional(),
});
export type ConvertWalletRequest = z.infer<typeof ConvertWalletRequestSchema>;

export const TransactionCreatedDataSchema = z.object({
  transactionId: z.string().uuid(),
  converted_amount: z.number().nullable().optional(),
});
export type TransactionCreatedData = z.infer<
  typeof TransactionCreatedDataSchema
>;
export const TransactionCreatedResponseSchema = ApiEnvelope(
  TransactionCreatedDataSchema
);
export type TransactionCreatedResponse = z.infer<
  typeof TransactionCreatedResponseSchema
>;

export const WalletBalanceDataSchema = z.object({
  balance: z.number(),
  ledgerBalance: z.number(),
  pendingHolds: z.number(),
  currency: ISO_CURRENCY,
});
export type WalletBalanceData = z.infer<typeof WalletBalanceDataSchema>;
export const WalletBalanceResponseSchema = ApiEnvelope(WalletBalanceDataSchema);
export type WalletBalanceResponse = z.infer<typeof WalletBalanceResponseSchema>;

export const LedgerEntryItemSchema = z.object({
  id: UUID,
  ledger_entry_debit_wallet_informationId: UUID.nullable().optional(),
  ledger_entry_credit_wallet_informationId: UUID.nullable().optional(),
  ledger_entry_type: z.enum([
    "FUND",
    "WITHDRAW",
    "TRANSFER",
    "CONVERT",
    "FEE",
    "TAX",
  ]),
  ledger_entry_amount: z.number(),
  ledger_entry_fee_amount: z.number().nullable().optional(),
  ledger_entry_currency: ISO_CURRENCY,
  ledger_entry_status: z.enum([
    "PENDING",
    "COMPLETED",
    "FAILED",
    "REVERSED",
    "INITIATED",
  ]),
  ledger_entry_exchange_rate_id: UUID.nullable().optional(),
  ledger_entry_converted_amount: z.number().nullable().optional(),
  ledger_entry_description: z.string().nullable().optional(),
  ledger_entry_reference_id: z.string().nullable().optional(),
  ledger_entry_metadata: z.record(z.any()).nullable().optional(),
  ledger_entry_created_at_information: DateTimeString,
  ledger_entry_updated_at_information: DateTimeString,
  ledger_entry_reversed_at: DateTimeString.nullable().optional(),
  ledger_entry_reversal_source_informationId: UUID.nullable().optional(),
});
export type LedgerEntryItem = z.infer<typeof LedgerEntryItemSchema>;

export const TransactionHistoryDataSchema = z.object({
  transactions: z.array(LedgerEntryItemSchema),
  total: z.number(),
  page: z.number().optional(),
  limit: z.number().optional(),
});
export type TransactionHistoryData = z.infer<
  typeof TransactionHistoryDataSchema
>;
export const TransactionHistoryResponseSchema = ApiEnvelope(
  TransactionHistoryDataSchema
);
export type TransactionHistoryResponse = z.infer<
  typeof TransactionHistoryResponseSchema
>;
