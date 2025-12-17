"use client";

import { useState } from "react";

import { toast } from "sonner";

import { IndraPayCrmApi } from "@/api/client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { LoginRequest } from "@/types";
import {
  EmailSchema,
  type ForgotPasswordRequest,
  LoginSchema,
  SignupRequestSchema,
} from "@/types/auth";
import {
  IconCopy as Copy,
  IconLoader as Loader2,
  IconMail as Mail,
  IconPhoneFilled as Smartphone,
  IconQrcode as QrCode,
  IconRefresh as RefreshCw,
  IconShieldCheck as ShieldCheck,
} from "@tabler/icons-react";
import { type AnyFieldApi, useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Link, useRouter } from "@tanstack/react-router";

function FieldInfo({ field }: { field: AnyFieldApi }) {
  const error = field.state.meta.errors[0]?.message || "";
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <span className="text-red-600 text-xs">{error}</span>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

const apiClient = new IndraPayCrmApi({
  baseUrl: import.meta.env.VITE_API_URL || "http://localhost:4000",
});

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const defaultUser: LoginRequest = { password: "", email: "" };

  const form = useForm({
    defaultValues: defaultUser,
    validators: {
      onChange: SignupRequestSchema,
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
    },
  });

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.navigate({ to: "/auth/verify-email" });
    }, 1000);
  };

  return (
    <form className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Button
        variant="outline"
        className="w-full h-12 text-base font-medium border-slate-200 text-slate-700 hover:bg-slate-50 relative bg-transparent"
      >
        <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Sign up with Google
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-4 text-slate-400">Or</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <form.Field
            name="email"
            children={(field) => (
              <>
                <Label htmlFor="email" className="text-slate-600">
                  Email address
                </Label>
                <Input
                  id="email"
                  placeholder="name@company.com"
                  type="email"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="h-11 bg-white border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </>
            )}
          ></form.Field>
        </div>
        <form.Subscribe
          children={({ canSubmit, isFormValid }) => (
            <Button
              className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm"
              onClick={handleSubmit}
              disabled={!canSubmit || !isFormValid}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Sign up with Email"
              )}
            </Button>
          )}
        />
      </div>

      <div className="bg-indigo-50/50 border border-indigo-100 rounded-lg p-4 flex gap-3 items-start">
        <div className="mt-0.5 text-indigo-600">
          <ShieldCheck className="h-4 w-4" />
        </div>
        <p className="text-sm text-indigo-900 leading-relaxed">
          You'll receive a link for a password-free sign up. We keep your data
          secure and private.
        </p>
      </div>

      <div className="text-center text-sm">
        <span className="text-slate-500">Already have an account? </span>
        <Link
          to="/auth/login"
          className="text-indigo-600 font-medium hover:underline"
        >
          Log in.
        </Link>
      </div>
    </form>
  );
}

export function LoginForm() {
  const [isLoading, _setIsLoading] = useState(false);
  const router = useRouter();

  const loginFn = useMutation({
    mutationFn: apiClient.auth.login,
    mutationKey: ["login"],
    onSuccess: () => {
      router.navigate({ to: "/dashboard" });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : typeof error === "string"
            ? error
            : "Login failed"
      );
      console.error("Login failed:", error);
    },
  });

  const defaultUser: LoginRequest = {
    password: import.meta.env.VITE_CRM_PASSWORD,
    email: import.meta.env.VITE_CRM_EMAIL,
  };

  const form = useForm({
    defaultValues: defaultUser,
    validators: {
      onChange: LoginSchema,
    },
    onSubmit: async ({ value }) => {
      loginFn.mutate(value);
    },
  });
  const {
    state: { isFormValid, isSubmitting },
  } = form;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      <Button
        variant="outline"
        className="w-full h-12 text-base font-medium border-slate-200 text-slate-700 hover:bg-slate-50 bg-transparent"
      >
        <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-4 text-slate-400">
            Or continue with email
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <form.Field
            name="email"
            children={(field) => (
              <>
                <Label htmlFor="email" className="text-slate-600">
                  Email address
                </Label>
                <Input
                  id="email"
                  placeholder="name@company.com"
                  type="email"
                  className="h-11"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}
          ></form.Field>
        </div>
        <div className="space-y-2">
          <form.Field
            name="password"
            children={(field) => (
              <>
                <div className="flex justify-between">
                  <Label htmlFor="password-login" className="text-slate-600">
                    Password
                  </Label>
                  <Link
                    to="/auth/forgot-password"
                    className="text-xs text-indigo-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password-login"
                  placeholder="••••••••"
                  type="password"
                  className="h-11"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}
          ></form.Field>
        </div>
        <form.Subscribe
          children={() => (
            <>
              <Button
                className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white"
                type="submit"
                disabled={!isFormValid || isSubmitting}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Sign in"
                )}
              </Button>
            </>
          )}
        ></form.Subscribe>
      </div>

      <div className="text-center text-sm">
        <span className="text-slate-500">Don't have an account? </span>
        <Link
          to="/auth/signup"
          className="text-indigo-600 font-medium hover:underline"
        >
          Sign up.
        </Link>
      </div>
    </form>
  );
}

export function VerifyEmailView() {
  const router = useRouter();
  const user: ForgotPasswordRequest = {
    email: "",
  };
  const form = useForm({
    defaultValues: user,
    validators: EmailSchema,
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
    },
  });
  return (
    <div className="flex flex-col items-center space-y-6 animate-in zoom-in-95 duration-500 max-w-sm mx-auto">
      <div className="h-20 w-20 bg-indigo-50 rounded-full flex items-center justify-center mb-2">
        <Mail className="h-10 w-10 text-indigo-600" />
      </div>

      <div className="text-center space-y-2">
        <p className="text-slate-600">
          We sent a verification link to <br />
          <span className="font-semibold text-slate-900">name@company.com</span>
        </p>
        <p className="text-sm text-slate-500">
          Click the link inside to get started.
        </p>
      </div>

      <div className="w-full pt-4 space-y-3">
        <Button
          variant="outline"
          className="w-full bg-transparent"
          onClick={() => window.open("https://gmail.com", "_blank")}
        >
          Open Email App
        </Button>
        <Button
          variant="ghost"
          className="w-full text-slate-500 hover:text-slate-900"
          onClick={() => router.navigate({ to: "/auth/mfa-setup" })}
        >
          Skip to MFA Setup (Demo)
        </Button>
      </div>

      <p className="text-xs text-slate-400">
        Didn't receive the email?{" "}
        <button className="text-indigo-600 hover:underline">
          Click to resend
        </button>
      </p>
    </div>
  );
}

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.navigate({ to: "/auth/verify-email" });
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-800">
        Enter the email address associated with your account and we'll send you
        a link to reset your password.
      </div>

      <div className="space-y-2">
        <Label htmlFor="email-reset" className="text-slate-600">
          Email address
        </Label>
        <Input
          id="email-reset"
          placeholder="name@company.com"
          type="email"
          className="h-11"
        />
      </div>

      <Button
        className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Send Reset Link"
        )}
      </Button>
    </div>
  );
}

export function MfaSetupView() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.navigate({ to: "/auth/recovery-codes" });
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-center py-4">
        <div className="bg-white p-4 rounded-xl border-2 border-slate-100 shadow-sm">
          <QrCode className="h-40 w-40 text-slate-800" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="mfa-code" className="text-slate-600">
            Verification Code
          </Label>
          <Input
            id="mfa-code"
            placeholder="123456"
            className="h-11 text-center text-lg tracking-widest font-mono"
            maxLength={6}
          />
        </div>
        <Button
          className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Enable Authentication"
          )}
        </Button>
      </div>

      <div className="text-center">
        <button className="text-xs text-slate-500 hover:text-indigo-600 underline">
          Can't scan the QR code?
        </button>
      </div>
    </div>
  );
}

export function MfaVerifyView() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.navigate({ to: "/dashboard" });
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col items-center mb-6">
        <div className="bg-indigo-50 p-3 rounded-full mb-4">
          <Smartphone className="h-8 w-8 text-indigo-600" />
        </div>
        <p className="text-center text-sm text-slate-500">
          Open your authenticator app and enter the code for{" "}
          <strong className="text-slate-900">Indrpay</strong>.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="verify-code" className="text-slate-600 sr-only">
            Verification Code
          </Label>
          <Input
            id="verify-code"
            placeholder="000-000"
            className="h-14 text-center text-2xl tracking-[0.5em] font-mono font-bold text-slate-800"
            maxLength={6}
          />
        </div>

        <div className="flex items-center space-x-2 py-2">
          <Checkbox id="trust-device" />
          <label
            htmlFor="trust-device"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-600"
          >
            Don't ask again on this device
          </label>
        </div>

        <Button
          className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Verify & Login"
          )}
        </Button>
      </div>

      <div className="text-center">
        <button
          onClick={() => router.navigate({ to: "/auth/recovery-codes" })}
          className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
        >
          Use a recovery code
        </button>
      </div>
    </div>
  );
}

export function RecoveryCodesView() {
  const router = useRouter();
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800 flex gap-2">
        <div className="shrink-0 mt-0.5">⚠️</div>
        <div>
          If you lose your device, these codes are the only way to access your
          account. Save them somewhere safe.
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200 font-mono text-sm text-slate-700">
        <div>a8n2-9x8c</div>
        <div>k2m9-1p4z</div>
        <div>q7r5-3t2y</div>
        <div>v4w8-6b1n</div>
        <div>h5j3-8k9l</div>
        <div>x2c4-7v5b</div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" className="flex-1 bg-transparent">
          <Copy className="mr-2 h-4 w-4" /> Copy
        </Button>
        <Button variant="outline" className="flex-1 bg-transparent">
          <RefreshCw className="mr-2 h-4 w-4" /> New Codes
        </Button>
      </div>

      <Button
        className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white"
        onClick={() => router.navigate({ to: "/dashboard" })}
      >
        I've Saved These Codes
      </Button>
    </div>
  );
}
