import { RecoveryCodesView } from "@/components/auth/forms";
import { createFileRoute } from "@tanstack/react-router";

function RecoveryCodesPage() {
  return <RecoveryCodesView />;
}
export const Route = createFileRoute("/_auth/auth/recovery-codes/")({
  component: RecoveryCodesPage,
});
