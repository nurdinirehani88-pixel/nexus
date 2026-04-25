import { DashboardHome } from "@/components/dashboard/dashboard-home";
import { LiveStackScreen } from "@/components/setup/live-stack-screen";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function Home() {
  if (!hasSupabaseEnv()) {
    return <LiveStackScreen />;
  }

  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userEmail =
    data && "claims" in data ? (data.claims.email as string | undefined) : undefined;

  return <DashboardHome userEmail={userEmail} />;
}
