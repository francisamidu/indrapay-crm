import { z } from "zod";

export const ISO_CURRENCY = z
  .string()
  .regex(/^[A-Z]{3}$/, "must be 3 uppercase letters (ISO 4217)");
export const ISO_COUNTRY = z
  .string()
  .regex(/^[A-Z]{2}$/, "must be 2 uppercase letters (ISO 3166-1 alpha-2)");
export const UUID = z.string().uuid();
export const DateTimeString = z.string();
export const ISO_DATE = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "YYYY-MM-DD");

export const Password = z
  .string()
  .min(8)
  .max(128)
  .refine((s) => /[a-z]/.test(s), "must contain a lowercase letter")
  .refine((s) => /[A-Z]/.test(s), "must contain an uppercase letter")
  .refine((s) => /\d/.test(s), "must contain a digit")
  .refine((s) => /[\W_]/.test(s), "must contain a special character");

export type ISO_CURRENCY = z.infer<typeof ISO_CURRENCY>;
export type ISO_COUNTRY = z.infer<typeof ISO_COUNTRY>;
export type UUID = z.infer<typeof UUID>;
export type DateTimeString = z.infer<typeof DateTimeString>;
export type ISO_DATE = z.infer<typeof ISO_DATE>;
export type Password = z.infer<typeof Password>;
