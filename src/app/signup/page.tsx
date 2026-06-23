import { redirect } from "next/navigation";

import { AuthForm } from "@/components/auth/AuthForm";
import { createClient } from "@/lib/supabase/server";

export default async function SignupPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  return (
    <div className="flex min-h-[calc(100dvh-4rem)] items-center justify-center bg-ltl-bg px-4 py-16">
      <AuthForm mode="signup" />
    </div>
  );
}
