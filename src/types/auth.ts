import { z } from "zod";
import { Password, ISO_DATE } from "./common";

export const CreateUserAccountRequestSchema = z.object({
  user_account_email_address: z.string().email(),
  user_account_phone_number: z.string().optional(),
  user_account_password: Password,
});
export type CreateUserAccountRequest = z.infer<typeof CreateUserAccountRequestSchema>;

export const VerifyUserAccountRequestSchema = z.object({
  user_account_verification_code: z.string().min(6),
});
export type VerifyUserAccountRequest = z.infer<typeof VerifyUserAccountRequestSchema>;

export const UserAccountLoginRequestSchema = z.object({
  user_account_email_address: z.string().email(),
  user_account_password: z.string().min(8),
});
export type UserAccountLoginRequest = z.infer<typeof UserAccountLoginRequestSchema>;

export const RequestPasswordResetSchema = z.object({
  user_account_email_address: z.string().email(),
});
export type RequestPasswordReset = z.infer<typeof RequestPasswordResetSchema>;

export const VerifyPasswordResetRequestSchema = z.object({
  user_account_password_reset_token: z.string().optional(),
  one_time_password: z.string().optional(),
});
export type VerifyPasswordResetRequest = z.infer<
  typeof VerifyPasswordResetRequestSchema
>;

export const PasswordResetRequestSchema = z.object({
  user_account_password: Password,
});
export type PasswordResetRequest = z.infer<typeof PasswordResetRequestSchema>;

export const UpdatePasswordRequestSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: Password,
});
export type UpdatePasswordRequest = z.infer<typeof UpdatePasswordRequestSchema>;

export const UpdateAccountProfileRequestSchema = z.object({
  user_account_first_name: z.string().max(200).optional(),
  user_account_last_name: z.string().max(200).optional(),
  user_account_phone: z.string().max(20).optional(),
  user_account_country_code: z.string().max(3).optional(),
  user_account_date_of_birth: ISO_DATE.optional(),
  user_account_address: z.string().max(500).optional(),
  user_account_gender: z.enum(["male", "female", "other"]).optional(),
  user_account_nationality: z.string().max(3).optional(),
  user_account_document_number: z.string().max(50).optional(),
  user_account_occupation: z.string().max(100).optional(),
  user_account_source_of_funds: z.string().max(100).optional(),
  user_account_is_business: z.boolean().optional(),
  user_account_account_type: z
    .enum(["personal", "business", "merchant"])
    .optional(),
  user_account_referral_code: z.string().max(50).optional(),
  user_account_preferred_currency: z.string().max(3).optional(),
  user_account_language: z.string().max(10).optional(),
  user_account_timezone: z.string().max(50).optional(),
  user_account_risk_level: z.enum(["low", "medium", "high"]).optional(),
  user_account_compliance_status: z
    .enum(["verified", "pending", "rejected"])
    .optional(),
  user_account_reference_id: z.string().max(100).optional(),
});
export type UpdateAccountProfileRequest = z.infer<
  typeof UpdateAccountProfileRequestSchema
>;

export const UpdateUserKycInformationRequestSchema = z.object({
  user_account_kyc_risk_score: z.number().optional(),
  user_account_kyc_auto_verified: z.boolean(),
  user_account_kyc_submission_count: z.number(),
  user_account_kyc_submitted_at: z.string(),
  user_account_kyc_verified_at: z.string().optional(),
  user_account_kyc_rejection_reason: z.string().optional(),
  user_account_kyc_last_reviewed_at: z.string().optional(),
  user_account_kyc_notes: z.string().optional(),
});
export type UpdateUserKycInformationRequest = z.infer<
  typeof UpdateUserKycInformationRequestSchema
>;