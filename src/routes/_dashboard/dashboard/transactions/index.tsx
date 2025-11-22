import TransactionManagement from "@/components/dashboard/transactions/transaction-management";
import { createFileRoute } from "@tanstack/react-router";

function RouteComponent() {
  return <TransactionManagement />;
}

export const Route = createFileRoute("/_dashboard/dashboard/transactions/")({
  component: RouteComponent,
});
