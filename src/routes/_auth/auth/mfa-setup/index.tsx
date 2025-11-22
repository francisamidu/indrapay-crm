import { MfaSetupView } from "@/components/auth/forms";
import { createFileRoute } from "@tanstack/react-router";

function MfaSetupPage() {
  return <MfaSetupView />;
}
export const Route = createFileRoute("/_auth/auth/mfa-setup/")({
  component: MfaSetupPage,
});
