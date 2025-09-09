import Compliance from "@/components/dashboard/compliance/compliance";
import { createFileRoute } from "@tanstack/react-router";

function RouteComponent() {
  return <Compliance />;
}
export const Route = createFileRoute("/(dashboard)/compliance/")({
  component: RouteComponent,
});
