import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LiveStackScreen } from "@/components/setup/live-stack-screen";
import { hasSupabaseEnv } from "@/lib/supabase/env";

import { login, signup } from "./actions";

type LoginPageProps = {
  searchParams: Promise<{
    status?: string;
    message?: string;
  }>;
};

function getStatusClasses(status?: string) {
  if (status === "success") {
    return "border-emerald-400/20 bg-emerald-400/10 text-emerald-200";
  }

  if (status === "error") {
    return "border-rose-400/20 bg-rose-400/10 text-rose-200";
  }

  return "border-white/10 bg-white/[0.04] text-zinc-300";
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  if (!hasSupabaseEnv()) {
    return <LiveStackScreen />;
  }

  const params = await searchParams;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05080d] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.18),transparent_34%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.16),transparent_28%),radial-gradient(circle_at_60%_35%,rgba(251,191,36,0.10),transparent_20%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 py-10 sm:px-6">
        <div className="grid w-full gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <Card className="border border-white/10 bg-white/[0.04] shadow-[0_24px_120px_rgba(0,0,0,0.35)]">
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="border-emerald-400/20 bg-emerald-400/10 text-emerald-200">
                  Private access
                </Badge>
                <Badge className="border-white/10 bg-white/[0.04] text-zinc-300">
                  Supabase SSR auth
                </Badge>
              </div>
              <CardTitle className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Sign in to The Nexus.
              </CardTitle>
              <CardDescription className="max-w-2xl text-base leading-7 text-zinc-300">
                This dashboard is wired for a private owner workflow on Supabase, with Vercel-ready server-side auth and GitHub deployment flow.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
                <p className="font-medium text-white">Recommended launch flow</p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Create the owner account once, confirm the email, then disable public signup in the Supabase Auth settings if you want this workspace fully locked down.
                </p>
              </div>

              {params.message ? (
                <Badge className={getStatusClasses(params.status)}>{params.message}</Badge>
              ) : null}
            </CardContent>
          </Card>

          <Card className="border border-white/10 bg-white/[0.04] shadow-[0_24px_120px_rgba(0,0,0,0.35)]">
            <CardHeader>
              <CardDescription className="text-zinc-400">Email and password</CardDescription>
              <CardTitle className="text-white">Owner login</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-200" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="h-12 w-full rounded-2xl border border-white/10 bg-black/20 px-4 text-sm text-white placeholder:text-zinc-500 focus:border-emerald-400/30 focus:outline-none"
                    placeholder="owner@nexus.app"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-200" htmlFor="password">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    minLength={8}
                    className="h-12 w-full rounded-2xl border border-white/10 bg-black/20 px-4 text-sm text-white placeholder:text-zinc-500 focus:border-emerald-400/30 focus:outline-none"
                    placeholder="At least 8 characters"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Button formAction={login} className="h-11 rounded-2xl">
                    Log in
                  </Button>
                  <Button
                    formAction={signup}
                    variant="outline"
                    className="h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08]"
                  >
                    Create owner account
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
