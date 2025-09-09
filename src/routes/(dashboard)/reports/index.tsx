import Reports from "@/components/dashboard/reports/reports";
import { createFileRoute } from "@tanstack/react-router";

function RouteComponent() {
  return <Reports />;
}
export const Route = createFileRoute("/(dashboard)/reports/")({
  component: RouteComponent,
});
