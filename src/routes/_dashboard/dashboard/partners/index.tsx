import PartnersManagement from "@/components/dashboard/partners/partners";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/dashboard/partners/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PartnersManagement />;
}
