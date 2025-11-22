import { VerifyEmailView } from "@/components/auth/forms";
import { createFileRoute } from "@tanstack/react-router";

function VerifyEmailPage() {
  return <VerifyEmailView />;
}
export const Route = createFileRoute("/_auth/auth/verify-email/")({
  component: VerifyEmailPage,
});
