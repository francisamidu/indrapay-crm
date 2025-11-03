import { z } from "zod";
import { ISO_CURRENCY, ISO_COUNTRY, UUID } from "./common";

export const FeeBreakdownItemSchema = z.object({
  type: z.enum(["fixed","tiered","percentage","cross_border"]),
  amount: z.number().min(0),
  taxAmount: z.number().min(0).optional(),
  priority: z.number().optional(),
  paymentRail: z.string().nullable().optional(),
  referenceId: z.string().nullable().optional(),
});
export type FeeBreakdownItem = z.infer<typeof FeeBreakdownItemSchema>;

export const FeeCalculationSchema = z.object({
  feeAmount: z.number().min(0),
  taxAmount: z.number().min(0),
  currency: ISO_CURRENCY,
  breakdown: z.array(FeeBreakdownItemSchema),
});
export type FeeCalculation = z.infer<typeof FeeCalculationSchema>;

export const ApplyFeesRequestSchema = z.object({
  walletId: UUID,
  transactionType: z.enum(["FUND","WITHDRAW","TRANSFER","CONVERT","FEE","TAX"]),
  txId: UUID,
  referenceId: z.string().nullable().optional(),
  feeCalculation: FeeCalculationSchema,
});
export type ApplyFeesRequest = z.infer<typeof ApplyFeesRequestSchema>;

export const ApplyFeesResponseSchema = z.object({ message: z.string() });
export type ApplyFeesResponse = z.infer<typeof ApplyFeesResponseSchema>;

export const FeeTierSchema = z.object({
  minAmount: z.number().min(0),
  maxAmount: z.number().min(0).nullable().optional(),
  feeAmount: z.number().min(0),
  feePercentage: z.number().min(0).optional(),
});
export type FeeTier = z.infer<typeof FeeTierSchema>;

export const FeeRuleSchema = z.object({
  type: z.enum(["fixed","tiered","percentage","cross_border"]),
  transactionType: z.enum(["FUND","WITHDRAW","TRANSFER","CONVERT","FEE","TAX"]),
  currency: ISO_CURRENCY,
  feeFixedAmount: z.number().min(0).nullable().optional(),
  feePercentage: z.number().min(0).nullable().optional(),
  taxRate: z.number().min(0),
  feeTieredConfig: z.array(FeeTierSchema).nullable().optional(),
  feeConditions: z
    .object({
      countryCode: ISO_COUNTRY.nullable().optional(),
      paymentRail: z.string().nullable().optional(),
      partnerId: z.string().nullable().optional(),
    })
    .nullable()
    .optional(),
  feeEffectiveDate: z.string().optional(),
  feeExpiryDate: z.string().nullable().optional(),
  feePriority: z.number().min(0).optional(),
  feeReferenceId: z.string(),
  countryCode: ISO_COUNTRY.nullable().optional(),
});
export type FeeRule = z.infer<typeof FeeRuleSchema>;