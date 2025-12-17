import { Link } from "@tanstack/react-router";

interface AuthFooterProps {
  mode?: "signup" | "login" | "simple";
}

export function AuthFooter({ mode = "simple" }: AuthFooterProps) {
  return (
    <div className="py-6 text-center text-xs text-slate-400">
      {mode === "signup" && (
        <p>
          By signing up, I agree to the Indrpay{" "}
          <Link to="/auth/login" className="underline hover:text-slate-600">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link to="/auth/login" className="underline hover:text-slate-600">
            Terms of Service
          </Link>
          .
        </p>
      )}

      {/* Global copyright for all auth pages */}
      <div className="pt-8 border-t border-slate-100 mt-8 w-full flex items-center justify-center gap-6">
        <span className="text-slate-700 font-semibold text-base">
          © 2025 Indrapay
        </span>
        <Link to="/auth/login" className="text-slate-600 hover:text-slate-500">
          Help
        </Link>
        <Link to="/auth/login" className="text-slate-600 hover:text-slate-500">
          Privacy
        </Link>
      </div>
    </div>
  );
}
