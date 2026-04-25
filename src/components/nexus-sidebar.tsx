import { type LucideIcon, BarChart3, Dumbbell, Flag, LayoutDashboard, LogOut, Menu, MoonStar, NotebookPen, Sparkles, WalletCards } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { profile } from "@/lib/nexus-data";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  accentClass: string;
  hint: string;
};

const workspaceItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "#overview",
    icon: LayoutDashboard,
    accentClass: "bg-emerald-400",
    hint: "Today at a glance",
  },
];

const moduleItems: NavItem[] = [
  {
    label: "Trading Journal",
    href: "#trading",
    icon: BarChart3,
    accentClass: "bg-sky-400",
    hint: "Execution quality and R:R",
  },
  {
    label: "Spiritual Tracker",
    href: "#spiritual",
    icon: MoonStar,
    accentClass: "bg-amber-400",
    hint: "Prayer rhythm and habits",
  },
  {
    label: "Fitness",
    href: "#fitness",
    icon: Dumbbell,
    accentClass: "bg-fuchsia-400",
    hint: "Routine and performance growth",
  },
  {
    label: "Financial Engine",
    href: "#finance",
    icon: WalletCards,
    accentClass: "bg-emerald-400",
    hint: "Business and personal money",
  },
  {
    label: "Milestones",
    href: "#milestones",
    icon: Flag,
    accentClass: "bg-cyan-400",
    hint: "Big goals and next moves",
  },
  {
    label: "Vibe Check",
    href: "#journal",
    icon: NotebookPen,
    accentClass: "bg-rose-400",
    hint: "Mood and quick reflection",
  },
];

function SidebarContent({ userEmail }: { userEmail?: string | null }) {
  return (
    <div className="flex h-full flex-col gap-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
            <Sparkles className="size-5 text-emerald-300" />
          </div>
          <div>
            <p className="font-heading text-base font-semibold tracking-wide text-white">
              The Nexus
            </p>
            <p className="text-sm text-zinc-400">Private life management OS</p>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <Avatar size="lg" className="bg-emerald-400/10">
              <AvatarFallback className="bg-emerald-400/10 text-emerald-200">
                NK
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="font-medium text-white">{profile.name}</p>
              <p className="truncate text-sm text-zinc-400">
                {userEmail ?? profile.headline}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge className="border-emerald-400/20 bg-emerald-400/10 text-emerald-200">
              {profile.streakDays} day streak
            </Badge>
            <Badge className="border-amber-400/20 bg-amber-400/10 text-amber-200">
              {profile.location}
            </Badge>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <SidebarGroup label="Workspace" items={workspaceItems} />
        <SidebarGroup label="Modules" items={moduleItems} />
      </div>

      <div className="mt-auto space-y-3">
        <div className="rounded-[28px] border border-emerald-400/15 bg-emerald-400/8 p-4 text-sm text-zinc-300">
        <p className="font-medium text-white">Launch foundation</p>
        <p className="mt-1 leading-6">
          Supabase SSR auth is scaffolded, Vercel deployment is prepared, and the data model is ready to be pointed at live Postgres next.
        </p>
      </div>
        <form action="/auth/signout" method="post">
          <Button
            variant="outline"
            className="h-11 w-full rounded-2xl border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08]"
          >
            <LogOut className="size-4" />
            Sign out
          </Button>
        </form>
      </div>
    </div>
  );
}

function SidebarGroup({ label, items }: { label: string; items: NavItem[] }) {
  return (
    <div>
      <p className="mb-3 px-2 text-xs font-semibold tracking-[0.22em] text-zinc-500 uppercase">
        {label}
      </p>
      <div className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.label}
              href={item.href}
              className="group flex items-center gap-3 rounded-2xl border border-transparent px-3 py-3 transition-all hover:border-white/10 hover:bg-white/[0.04]"
            >
              <span
                className={cn(
                  "relative flex size-10 items-center justify-center rounded-2xl bg-white/[0.04]",
                  "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                )}
              >
                <span className={cn("absolute top-1.5 left-1.5 size-2 rounded-full", item.accentClass)} />
                <Icon className="size-4 text-zinc-100" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-medium text-zinc-100">{item.label}</span>
                <span className="block truncate text-sm text-zinc-500">{item.hint}</span>
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export function NexusSidebar({ userEmail }: { userEmail?: string | null }) {
  return (
    <aside className="hidden w-[296px] shrink-0 lg:flex">
      <div className="sticky top-4 h-[calc(100vh-2rem)] w-full rounded-[32px] border border-white/10 bg-[#0d1117]/85 p-5 shadow-[0_24px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <SidebarContent userEmail={userEmail} />
      </div>
    </aside>
  );
}

export function NexusMobileSidebar({ userEmail }: { userEmail?: string | null }) {
  return (
    <Sheet>
      <SheetTrigger
        className={cn(
          buttonVariants({ variant: "outline", size: "icon-sm" }),
          "border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08]"
        )}
      >
        <Menu className="size-4" />
        <span className="sr-only">Open dashboard navigation</span>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[88vw] max-w-sm border-white/10 bg-[#090d12] p-0 text-white"
      >
        <SheetHeader className="border-b border-white/10">
          <SheetTitle>The Nexus</SheetTitle>
          <SheetDescription>
            Jump between the dashboard and each module preview.
          </SheetDescription>
        </SheetHeader>
        <div className="h-[calc(100vh-5rem)] overflow-y-auto p-4">
          <SidebarContent userEmail={userEmail} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
