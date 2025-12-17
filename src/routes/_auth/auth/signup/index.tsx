import { SignUpForm } from "@/components/auth/forms";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/auth/signup/")({
  component: SignUpForm,
});
