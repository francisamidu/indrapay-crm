import UserWalletManagement from "@/components/dashboard/wallets/user-wallet-management";
import { createFileRoute } from "@tanstack/react-router";

function RouteComponent() {
  return <UserWalletManagement />;
}
export const Route = createFileRoute("/(dashboard)/wallet-management/")({
  component: RouteComponent,
});
