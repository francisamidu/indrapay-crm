import { AuthFooter } from "@/components/layout/auth/footer";
import { AuthHeader } from "@/components/layout/auth/header";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: AuthRouteComponent,
});

function AuthRouteComponent() {
  return (
    <>
      <AuthHeader />
      <Outlet />
      <AuthFooter />
    </>
  );
}
