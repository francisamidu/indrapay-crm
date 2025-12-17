import { Button } from "@/components/ui/button";
import { useLocation, useRouter } from "@tanstack/react-router";

export function AuthHeader() {
  const location = useLocation();
  const router = useRouter();
  const redirectTo = () => {
    if (location.pathname.includes("login")) {
      router.navigate({ to: "/auth/signup" });
    }
    if (location.pathname.includes("signup")) {
      router.navigate({ to: "/auth/login" });
    }
    return "/";
  };
  return (
    <nav className="w-full flex items-center justify-between py-3 px-6 bg-white border-b border-slate-200">
      <div className="text-xl font-bold text-slate-700">Indrapay CRM</div>
      <div>
        {location.pathname.includes("login") && (
          <Button
            size="lg"
            className="text-sm text-white hover:bg-slate-800"
            onClick={redirectTo}
          >
            Sign Up
          </Button>
        )}
        {location.pathname.includes("signup") && (
          <Button
            size="lg"
            className="text-sm text-white hover:bg-slate-800"
            onClick={redirectTo}
          >
            Log In
          </Button>
        )}
      </div>
    </nav>
  );
}
