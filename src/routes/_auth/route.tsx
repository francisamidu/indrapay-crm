import { AuthLayout } from "@/components/auth/auth-layout";
import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: AuthRouteComponent,
});

function AuthRouteComponent() {
  const location = useLocation();
  const isSignup = location.pathname.includes("signup");
  return (
    <>
      <AuthLayout
        headerTitle={
          isSignup ? "Create your Indrapay account" : "Welcome back to Indrapay"
        }
      >
        <Outlet />;
      </AuthLayout>
    </>
  );
}
