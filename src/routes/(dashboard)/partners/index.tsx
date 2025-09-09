import PartnersManagement from "@/components/dashboard/partners/partners";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(dashboard)/partners/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PartnersManagement />;
}
