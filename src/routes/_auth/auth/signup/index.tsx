import { AuthLayout } from "@/components/auth/auth-layout";
import { SignUpForm } from "@/components/auth/forms";
import { createFileRoute } from "@tanstack/react-router";

function SignupPage() {
  return (
    <AuthLayout headerTitle="Record your first Supademo in seconds">
      <SignUpForm />
    </AuthLayout>
  );
}
export const Route = createFileRoute("/_auth/auth/signup/")({
  component: SignupPage,
});
