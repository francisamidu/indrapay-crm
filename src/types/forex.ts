import { z } from "zod";
import { ISO_CURRENCY } from "./common";
import { ApiEnvelope } from "./api-envelope";

export const ForexConvertRequestSchema = z.object({
  amount: z.number().min(0).refine((n) => n > 0, "amount must be > 0"),
  from: ISO_CURRENCY,
  to: ISO_CURRENCY,
  userTier: z.enum(["retail", "corporate"]),
  transactionVolume: z.number().min(0).nullable().optional(),
  paymentId: z.string().nullable().optional(),
});
export type ForexConvertRequest = z.infer<typeof ForexConvertRequestSchema>;

export const ForexConvertResponseDataSchema = z.object({
  amount: z.number(),
  rate: z.number(),
  pair: z.string(),
  userTier: z.enum(["retail", "corporate"]),
  transactionVolume: z.number().nullable().optional(),
  paymentId: z.string().nullable().optional(),
});
export type ForexConvertResponseData = z.infer<
  typeof ForexConvertResponseDataSchema
>;

export const ForexConvertResponseSchema = ApiEnvelope(ForexConvertResponseDataSchema);
export type ForexConvertResponse = z.infer<typeof ForexConvertResponseSchema>;

export const RateDataSchema = z.object({
  rate: z.number(),
  pair: z.string(),
  provider: z.string(),
  expiresAt: z.string().optional(),
});
export type RateData = z.infer<typeof RateDataSchema>;
export const RateResponseSchema = ApiEnvelope(RateDataSchema);
export type RateResponse = z.infer<typeof RateResponseSchema>;

export const LockRateRequestSchema = z.object({
  from: ISO_CURRENCY,
  to: ISO_CURRENCY,
  userTier: z.enum(["retail", "corporate"]),
  transactionVolume: z.number().min(0).nullable().optional(),
  paymentId: z.string().min(1).optional(),
});
export type LockRateRequest = z.infer<typeof LockRateRequestSchema>;

export const LockRateDataSchema = z.object({
  rate: z.number(),
  pair: z.string(),
  paymentId: z.string(),
  lockedUntil: z.string().optional(),
  provider: z.string(),
});
export type LockRateData = z.infer<typeof LockRateDataSchema>;
export const LockRateResponseSchema = ApiEnvelope(LockRateDataSchema);
export type LockRateResponse = z.infer<typeof LockRateResponseSchema>;