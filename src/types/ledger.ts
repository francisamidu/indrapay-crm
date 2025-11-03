import { z } from "zod";
import { UUID, ISO_CURRENCY, DateTimeString } from "./common";
import { ApiEnvelope } from "./api-envelope";

export const CreateLedgerEntryRequestSchema = z.object({
  ledger_entry_debit_wallet_informationId: UUID.nullable().optional(),
  ledger_entry_credit_wallet_informationId: UUID.nullable().optional(),
  ledger_entry_type: z.enum(["FUND","WITHDRAW","TRANSFER","CONVERT","FEE","TAX"]),
  ledger_entry_amount: z.number().min(0).refine((n)=>n>0,"must be > 0"),
  ledger_entry_currency: ISO_CURRENCY,
  ledger_entry_status: z.enum(["PENDING","COMPLETED","FAILED","REVERSED","INITIATED"]),
  ledger_entry_reference_id: z.string().min(1).nullable().optional(),
  ledger_entry_fee_amount: z.number().min(0).nullable().optional(),
  ledger_entry_exchange_rate_id: UUID.nullable().optional(),
  ledger_entry_converted_amount: z.number().min(0).nullable().optional(),
  ledger_entry_description: z.string().max(255).nullable().optional(),
  ledger_entry_metadata: z.record(z.any()).nullable().optional(),
  ledger_entry_external_tx_id: z.string().max(100).nullable().optional(),
  ledger_entry_reversed_at: DateTimeString.nullable().optional(),
  ledger_entry_reversal_source_informationId: UUID.nullable().optional(),
});
export type CreateLedgerEntryRequest = z.infer<typeof CreateLedgerEntryRequestSchema>;

export const CreateLedgerEntryResponseSchema = ApiEnvelope(z.object({ id: UUID }));
export type CreateLedgerEntryResponse = z.infer<typeof CreateLedgerEntryResponseSchema>;