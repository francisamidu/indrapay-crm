import Corridors from "@/components/dashboard/corridors/corridors";
import { createFileRoute } from "@tanstack/react-router";

function RouteComponent() {
  return <Corridors />;
}

export const Route = createFileRoute("/(dashboard)/corridors/")({
  component: RouteComponent,
});
