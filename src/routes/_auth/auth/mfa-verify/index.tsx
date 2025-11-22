import { MfaVerifyView } from "@/components/auth/forms";
import { createFileRoute } from "@tanstack/react-router";

function MfaVerifyPage() {
  return <MfaVerifyView />;
}
export const Route = createFileRoute("/_auth/auth/mfa-verify/")({
  component: MfaVerifyPage,
});
