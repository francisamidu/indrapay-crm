import { z } from "zod";

interface CrmUser {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roles: string[];
  permissions?: string[];
  isActive: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

type ForgotPasswordRequest = {
  email: string;
};

interface LoginResponse {
  accessToken: string;
  sessionId: string;
  expiresIn: number;
  user: CrmUser;
}

interface RefreshTokenRequest {
  refreshToken: string;
}

interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// --- SIGNUP SCHEMA ---

export const SignupRequestSchema = z
  .object({
    email: z.email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      // you can enforce a pattern, e.g. uppercase, number, special char
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
        "Password must contain uppercase, lowercase, and a number"
      ),
    confirmPassword: z.string().min(12, "Confirm Password is required"),
  })
  .superRefine((data, ctx) => {
    // Validate that password and confirmPassword match
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
      });
    }
  });
export const EmailSchema = SignupRequestSchema.pick({ email: true });
export type SignupRequest = z.infer<typeof SignupRequestSchema>;
export const LoginSchema = SignupRequestSchema.omit({ confirmPassword: true });
export type LoginRequest = z.infer<typeof LoginSchema>;
// Example of a SignupResponse schema if you need one:

export const CrmUserSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  roles: z.array(z.string()),
  permissions: z.array(z.string()).optional(),
  isActive: z.boolean(),
  createdAt: z.string(),
  lastLoginAt: z.string().optional(),
});

export const SignupResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresIn: z.number(),
  user: CrmUserSchema,
});
export type SignupResponse = z.infer<typeof SignupResponseSchema>;

export type {
  ChangePasswordRequest,
  CrmUser,
  ForgotPasswordRequest,
  LoginResponse,
  RefreshTokenRequest,
};
