import { OperationsTools } from "@/components/dashboard/operations/operations";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(dashboard)/operations/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <OperationsTools />;
}
