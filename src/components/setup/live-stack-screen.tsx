import { GitBranch, KeyRound, Rocket, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const envVars = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  "NEXT_PUBLIC_SITE_URL",
  "DATABASE_URL",
  "DIRECT_URL",
];

const steps = [
  {
    icon: KeyRound,
    title: "Create the Supabase project",
    body: "Grab the project URL and publishable key, then configure Auth URLs and the email template for SSR confirmation.",
  },
  {
    icon: GitBranch,
    title: "Push this code to GitHub",
    body: "Vercel will watch your default branch and create preview deployments for every feature branch.",
  },
  {
    icon: Rocket,
    title: "Import the repo into Vercel",
    body: "Add the same environment variables to Development, Preview, and Production so auth and data stay aligned.",
  },
  {
    icon: ShieldCheck,
    title: "Create your owner account",
    body: "Use the login screen once, confirm the email, then disable open signup in Supabase if you want the app owner-only.",
  },
];

export function LiveStackScreen() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05080d] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.18),transparent_34%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.16),transparent_28%),radial-gradient(circle_at_60%_35%,rgba(251,191,36,0.10),transparent_20%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 py-10 sm:px-6">
        <div className="grid w-full gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <Card className="border border-white/10 bg-white/[0.04] shadow-[0_24px_120px_rgba(0,0,0,0.35)]">
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="border-emerald-400/20 bg-emerald-400/10 text-emerald-200">
                  Live stack selected
                </Badge>
                <Badge className="border-white/10 bg-white/[0.04] text-zinc-300">
                  Supabase + Vercel + GitHub
                </Badge>
              </div>
              <CardTitle className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                The app is scaffolded for launch. It just needs your live credentials.
              </CardTitle>
              <CardDescription className="max-w-2xl text-base leading-7 text-zinc-300">
                Supabase auth wiring, protected routing, and deployment docs are ready. Add the environment values below, then the dashboard can authenticate and deploy cleanly.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                {steps.map((step) => {
                  const Icon = step.icon;

                  return (
                    <div
                      key={step.title}
                      className="rounded-[24px] border border-white/10 bg-black/20 p-4"
                    >
                      <div className="mb-3 flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                        <Icon className="size-5 text-emerald-200" />
                      </div>
                      <p className="font-medium text-white">{step.title}</p>
                      <p className="mt-2 text-sm leading-6 text-zinc-400">{step.body}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-white/10 bg-white/[0.04] shadow-[0_24px_120px_rgba(0,0,0,0.35)]">
            <CardHeader>
              <CardDescription className="text-zinc-400">Required environment variables</CardDescription>
              <CardTitle className="text-white">Add these before first live login</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {envVars.map((variable) => (
                <div
                  key={variable}
                  className="rounded-2xl border border-white/8 bg-black/20 px-4 py-3 font-mono text-sm text-zinc-200"
                >
                  {variable}
                </div>
              ))}

              <div className="rounded-[24px] border border-amber-400/15 bg-amber-400/8 p-4 text-sm leading-6 text-zinc-300">
                Set `NEXT_PUBLIC_SITE_URL` to your current environment URL.
                Locally use `http://localhost:3000`. In production use your Vercel domain or custom domain.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
