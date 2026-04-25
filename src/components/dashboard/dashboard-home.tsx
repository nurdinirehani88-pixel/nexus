import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  CheckCheck,
  CircleDollarSign,
  Clock3,
  Target,
  TrendingUp,
} from "lucide-react";

import { GrowthPulseChart } from "@/components/dashboard/growth-pulse-chart";
import { HabitHeatmap } from "@/components/dashboard/habit-heatmap";
import { PrayerCountdownCard } from "@/components/dashboard/prayer-countdown-card";
import { NexusMobileSidebar, NexusSidebar } from "@/components/nexus-sidebar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  activeGoal,
  financePreview,
  formatCurrencyFromCents,
  getDailyBudgetSnapshot,
  getDomainBudgetSummary,
  getMilestoneProgress,
  getTodayScheduleSummary,
  getTradingSummary,
  habitHeatmap,
  journalPreview,
  prayerCompletion,
  prayerSlots,
  profile,
  todaysSchedule,
  tradeSnapshots,
  weeklyRoutine,
  workoutTrend,
} from "@/lib/nexus-data";

function getMoodStyles(mood: string) {
  if (mood === "Grounded") {
    return "border-emerald-400/20 bg-emerald-400/10 text-emerald-200";
  }

  return "border-white/10 bg-white/[0.04] text-zinc-200";
}

export function DashboardHome({
  userEmail,
}: {
  userEmail?: string | null;
}) {
  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());
  const scheduleSummary = getTodayScheduleSummary(todaysSchedule);
  const dailyBudget = getDailyBudgetSnapshot();
  const milestoneProgress = getMilestoneProgress();
  const tradingSummary = getTradingSummary();
  const businessBudget = getDomainBudgetSummary("Business");
  const personalBudget = getDomainBudgetSummary("Personal");

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05080d] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.16),transparent_34%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.16),transparent_28%),radial-gradient(circle_at_60%_35%,rgba(251,191,36,0.10),transparent_20%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:84px_84px] opacity-[0.16]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-[1700px] gap-5 px-4 py-4 sm:px-5 lg:px-6">
        <NexusSidebar userEmail={userEmail} />

        <main className="min-w-0 flex-1">
          <div className="sticky top-4 z-30 mb-5 flex items-center justify-between rounded-[24px] border border-white/10 bg-black/20 px-4 py-3 backdrop-blur-xl lg:hidden">
            <div>
              <p className="text-sm text-zinc-400">The Nexus</p>
              <p className="font-medium text-white">{today}</p>
            </div>
            <NexusMobileSidebar userEmail={userEmail} />
          </div>

          <div className="space-y-6">
            <section
              id="overview"
              className="scroll-mt-24 rounded-[32px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_120px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-6"
            >
              <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
                <div className="max-w-3xl space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="border-emerald-400/20 bg-emerald-400/10 text-emerald-200">
                      Personal HQ
                    </Badge>
                    <Badge className="border-white/10 bg-white/[0.04] text-zinc-300">
                      {profile.timeZone}
                    </Badge>
                    {userEmail ? (
                      <Badge className="border-sky-400/20 bg-sky-400/10 text-sky-200">
                        {userEmail}
                      </Badge>
                    ) : null}
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-zinc-400">{today}</p>
                    <h1 className="font-heading text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                      A unified command center for your real life.
                    </h1>
                    <p className="max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
                      Trading precision, prayer discipline, physical growth, financial clarity, and daily reflection all connected in one calm workspace.
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3 xl:w-[480px]">
                  <QuickSignal
                    label="Streak"
                    value={`${profile.streakDays} days`}
                    hint="Consistency engine"
                    accent="text-emerald-200"
                  />
                  <QuickSignal
                    label="Focus"
                    value="Deep work"
                    hint="Schema + UI today"
                    accent="text-sky-200"
                  />
                  <QuickSignal
                    label="Mood"
                    value={journalPreview.mood}
                    hint="Calm and deliberate"
                    accent="text-amber-200"
                  />
                </div>
              </div>
            </section>

            <section className="grid gap-4 xl:grid-cols-4">
              <OverviewCard
                icon={CalendarDays}
                eyebrow="Today's schedule"
                title={`${scheduleSummary.totalBlocks} blocks locked`}
                value={`${scheduleSummary.totalHours}h planned`}
                hint={scheduleSummary.firstBlock}
                accentClass="from-emerald-300/20 to-emerald-500/5"
              />
              <PrayerCountdownCard location={profile.location} prayers={prayerSlots} />
              <OverviewCard
                icon={CircleDollarSign}
                eyebrow="Daily budget remaining"
                title={formatCurrencyFromCents(dailyBudget.remaining)}
                value={`${formatCurrencyFromCents(dailyBudget.spent)} spent today`}
                hint={`${formatCurrencyFromCents(dailyBudget.budget)} daily allowance`}
                accentClass="from-emerald-300/20 to-cyan-500/5"
              />
              <OverviewCard
                icon={Target}
                eyebrow="Active milestone"
                title={`${milestoneProgress.percent}% complete`}
                value={`${milestoneProgress.daysRemaining} days remaining`}
                hint={activeGoal.milestone.title}
                accentClass="from-sky-300/20 to-blue-500/5"
              />
            </section>

            <section className="grid gap-6 2xl:grid-cols-[1.25fr_0.95fr]">
              <Card className="border border-white/10 bg-white/[0.04] shadow-[0_24px_80px_rgba(0,0,0,0.24)]">
                <CardHeader>
                  <CardDescription className="text-zinc-400">Today&apos;s flow</CardDescription>
                  <CardTitle className="text-white">Schedule aligned with your priorities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {todaysSchedule.map((block) => (
                    <div
                      key={`${block.time}-${block.title}`}
                      className="flex gap-4 rounded-[24px] border border-white/8 bg-black/20 p-4"
                    >
                      <div className="min-w-[72px]">
                        <p className="font-medium text-white">{block.time}</p>
                        <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                          {block.category}
                        </p>
                      </div>
                      <div className="relative flex-1 rounded-[20px] border border-white/6 bg-white/[0.03] p-4">
                        <div
                          className={`absolute inset-y-0 left-0 w-1 rounded-full bg-gradient-to-b ${block.accentClass}`}
                        />
                        <div className="pl-3">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="font-medium text-white">{block.title}</p>
                            <Badge className="border-white/10 bg-white/[0.04] text-zinc-300">
                              {block.duration}
                            </Badge>
                          </div>
                          <p className="mt-2 text-sm leading-6 text-zinc-400">{block.note}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border border-white/10 bg-white/[0.04] shadow-[0_24px_80px_rgba(0,0,0,0.24)]">
                <CardHeader>
                  <CardDescription className="text-zinc-400">Growth pulse</CardDescription>
                  <CardTitle className="text-white">Fitness momentum and body trend</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <GrowthPulseChart data={workoutTrend} />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <QuickSignal
                      label="Weight"
                      value={`${workoutTrend.at(-1)?.weight ?? 0} kg`}
                      hint="Down 1.5 kg this week"
                      accent="text-emerald-200"
                    />
                    <QuickSignal
                      label="Momentum"
                      value={`${workoutTrend.at(-1)?.score ?? 0}/100`}
                      hint="Volume trending upward"
                      accent="text-sky-200"
                    />
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="grid gap-6 2xl:grid-cols-2">
              <Card
                id="trading"
                className="scroll-mt-24 border border-sky-400/15 bg-[linear-gradient(180deg,rgba(56,189,248,0.10),rgba(255,255,255,0.03))]"
              >
                <CardHeader>
                  <CardDescription className="text-sky-100/70">Trading journal</CardDescription>
                  <CardTitle className="text-white">Execution quality over excitement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <QuickSignal
                      label="Realized R"
                      value={tradingSummary.realizedR}
                      hint="Across latest 3 trades"
                      accent="text-sky-200"
                    />
                    <QuickSignal
                      label="Win rate"
                      value={`${Math.round((tradingSummary.wins / tradingSummary.total) * 100)}%`}
                      hint={`${tradingSummary.wins}/${tradingSummary.total} trades`}
                      accent="text-emerald-200"
                    />
                    <QuickSignal
                      label="Bias"
                      value="Selective"
                      hint="Only A-setup liquidity grabs"
                      accent="text-zinc-100"
                    />
                  </div>

                  <div className="space-y-3">
                    {tradeSnapshots.map((trade) => (
                      <div
                        key={`${trade.asset}-${trade.strategy}`}
                        className="rounded-[24px] border border-white/10 bg-black/20 p-4"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <p className="font-medium text-white">{trade.asset}</p>
                            <p className="text-sm text-zinc-400">
                              {trade.strategy} strategy
                            </p>
                          </div>
                          <Badge
                            className={
                              trade.outcome === "Win"
                                ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
                                : trade.outcome === "Loss"
                                  ? "border-rose-400/20 bg-rose-400/10 text-rose-200"
                                  : "border-white/10 bg-white/[0.04] text-zinc-300"
                            }
                          >
                            {trade.outcome} {trade.rr >= 0 ? `+${trade.rr}` : trade.rr}R
                          </Badge>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-zinc-300">{trade.lesson}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card
                id="spiritual"
                className="scroll-mt-24 border border-amber-400/15 bg-[linear-gradient(180deg,rgba(251,191,36,0.10),rgba(255,255,255,0.03))]"
              >
                <CardHeader>
                  <CardDescription className="text-amber-100/70">Spiritual and habits</CardDescription>
                  <CardTitle className="text-white">Prayer rhythm with visible consistency</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid gap-3 sm:grid-cols-5">
                    {prayerCompletion.map((prayer) => (
                      <div
                        key={prayer.name}
                        className="rounded-[22px] border border-white/10 bg-black/20 p-4"
                      >
                        <p className="text-sm text-zinc-400">{prayer.name}</p>
                        <p
                          className={
                            prayer.completed
                              ? "mt-2 font-medium text-emerald-200"
                              : "mt-2 font-medium text-amber-100"
                          }
                        >
                          {prayer.completed ? "Completed" : "Pending"}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium text-white">Habit grid</p>
                        <p className="text-sm text-zinc-400">Daily consistency across your core routines</p>
                      </div>
                      <Badge className="border-emerald-400/20 bg-emerald-400/10 text-emerald-200">
                        82% weekly consistency
                      </Badge>
                    </div>
                    <HabitHeatmap values={habitHeatmap} />
                  </div>
                </CardContent>
              </Card>

              <Card
                id="fitness"
                className="scroll-mt-24 border border-fuchsia-400/15 bg-[linear-gradient(180deg,rgba(232,121,249,0.10),rgba(255,255,255,0.03))]"
              >
                <CardHeader>
                  <CardDescription className="text-fuchsia-100/70">Fitness and workout</CardDescription>
                  <CardTitle className="text-white">Weekly routine with measurable growth</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {weeklyRoutine.map((session) => (
                      <div
                        key={`${session.day}-${session.focus}`}
                        className="rounded-[24px] border border-white/10 bg-black/20 p-4"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-medium text-white">{session.focus}</p>
                          <Badge className="border-white/10 bg-white/[0.04] text-zinc-300">
                            {session.day}
                          </Badge>
                        </div>
                        <p className="mt-2 text-sm text-zinc-400">{session.time}</p>
                        <p className="mt-3 text-sm leading-6 text-zinc-300">{session.anchor}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium text-white">Key metrics</p>
                        <p className="text-sm text-zinc-400">Weight is down while performance is climbing</p>
                      </div>
                      <TrendingUp className="size-5 text-fuchsia-200" />
                    </div>
                    <GrowthPulseChart data={workoutTrend} />
                  </div>
                </CardContent>
              </Card>

              <Card
                id="finance"
                className="scroll-mt-24 border border-emerald-400/15 bg-[linear-gradient(180deg,rgba(16,185,129,0.10),rgba(255,255,255,0.03))]"
              >
                <CardHeader>
                  <CardDescription className="text-emerald-100/70">Financial engine</CardDescription>
                  <CardTitle className="text-white">Business and personal money in one view</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <BudgetStat
                      title="Business"
                      income={businessBudget.income}
                      expenses={businessBudget.expenses}
                      usage={businessBudget.usage}
                    />
                    <BudgetStat
                      title="Personal"
                      income={personalBudget.income}
                      expenses={personalBudget.expenses}
                      usage={personalBudget.usage}
                    />
                  </div>

                  <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium text-white">Recent transactions</p>
                        <p className="text-sm text-zinc-400">
                          Daily allowance: {formatCurrencyFromCents(financePreview.dailyBudgetCents)}
                        </p>
                      </div>
                      <Badge className="border-emerald-400/20 bg-emerald-400/10 text-emerald-200">
                        {formatCurrencyFromCents(dailyBudget.remaining)} left
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      {financePreview.todayExpenses.map((expense) => (
                        <div
                          key={expense.label}
                          className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3"
                        >
                          <div>
                            <p className="font-medium text-white">{expense.label}</p>
                            <p className="text-sm text-zinc-400">{expense.domain}</p>
                          </div>
                          <p className="font-medium text-rose-200">
                            -{formatCurrencyFromCents(expense.amountCents)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                id="milestones"
                className="scroll-mt-24 border border-cyan-400/15 bg-[linear-gradient(180deg,rgba(34,211,238,0.10),rgba(255,255,255,0.03))]"
              >
                <CardHeader>
                  <CardDescription className="text-cyan-100/70">Milestone and goals</CardDescription>
                  <CardTitle className="text-white">Progress that updates from completed tasks</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-white">{activeGoal.title}</p>
                        <p className="mt-1 text-sm text-zinc-400">
                          {activeGoal.area} goal with a target of ${activeGoal.targetValue.toLocaleString()}
                        </p>
                      </div>
                      <Badge className="border-cyan-300/20 bg-cyan-300/10 text-cyan-100">
                        {milestoneProgress.capitalProgress}% toward goal value
                      </Badge>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between text-sm text-zinc-300">
                        <span>Capital progress</span>
                        <span>
                          ${activeGoal.currentValue.toLocaleString()} / ${activeGoal.targetValue.toLocaleString()}
                        </span>
                      </div>
                      <Progress
                        value={milestoneProgress.capitalProgress}
                        className="gap-2"
                      />
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium text-white">{activeGoal.milestone.title}</p>
                        <p className="text-sm text-zinc-400">
                          {milestoneProgress.completedTasks}/{milestoneProgress.totalTasks} tasks complete, {milestoneProgress.daysRemaining} days left
                        </p>
                      </div>
                      <Badge className="border-white/10 bg-white/[0.04] text-zinc-200">
                        {milestoneProgress.percent}% complete
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      {activeGoal.milestone.tasks.map((task) => (
                        <div
                          key={task.title}
                          className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3"
                        >
                          <span
                            className={
                              task.completed
                                ? "mt-0.5 text-emerald-200"
                                : "mt-0.5 text-zinc-500"
                            }
                          >
                            <CheckCheck className="size-4" />
                          </span>
                          <div>
                            <p className="font-medium text-white">{task.title}</p>
                            <p className="text-sm text-zinc-400">
                              {task.completed ? "Complete" : "Still in motion"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                id="journal"
                className="scroll-mt-24 border border-rose-400/15 bg-[linear-gradient(180deg,rgba(251,113,133,0.10),rgba(255,255,255,0.03))]"
              >
                <CardHeader>
                  <CardDescription className="text-rose-100/70">Daily journal</CardDescription>
                  <CardTitle className="text-white">Vibe check with markdown-ready reflection</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge className={getMoodStyles(journalPreview.mood)}>{journalPreview.mood}</Badge>
                    <Badge className="border-white/10 bg-white/[0.04] text-zinc-300">
                      Energy {journalPreview.energy}/10
                    </Badge>
                  </div>

                  <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
                    <p className="text-sm font-medium text-zinc-300">Gratitude</p>
                    <p className="mt-3 text-base leading-7 text-white">{journalPreview.gratitude}</p>
                  </div>

                  <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
                    <p className="text-sm font-medium text-zinc-300">Markdown entry preview</p>
                    <p className="mt-3 text-base leading-7 text-zinc-200">{journalPreview.content}</p>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function OverviewCard({
  icon: Icon,
  eyebrow,
  title,
  value,
  hint,
  accentClass,
}: {
  icon: typeof Clock3;
  eyebrow: string;
  title: string;
  value: string;
  hint: string;
  accentClass: string;
}) {
  return (
    <Card
      className={`border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.03))] shadow-[0_18px_60px_rgba(0,0,0,0.22)]`}
    >
      <CardContent className="relative overflow-hidden p-5">
        <div className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-br ${accentClass}`} />
        <div className="relative space-y-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-zinc-400">{eyebrow}</p>
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-2">
              <Icon className="size-4 text-zinc-100" />
            </div>
          </div>
          <div>
            <p className="font-heading text-2xl font-semibold tracking-tight text-white">{title}</p>
            <p className="mt-2 text-sm text-zinc-300">{value}</p>
          </div>
          <p className="text-sm leading-6 text-zinc-500">{hint}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function QuickSignal({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: string;
  hint: string;
  accent: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
      <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">{label}</p>
      <p className={`mt-2 font-heading text-xl font-semibold ${accent}`}>{value}</p>
      <p className="mt-1 text-sm text-zinc-400">{hint}</p>
    </div>
  );
}

function BudgetStat({
  title,
  income,
  expenses,
  usage,
}: {
  title: string;
  income: number;
  expenses: number;
  usage: number;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="font-medium text-white">{title}</p>
        <Badge className="border-white/10 bg-white/[0.04] text-zinc-300">
          {usage}% used
        </Badge>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-sm text-zinc-300">
          <span className="inline-flex items-center gap-2">
            <ArrowUpRight className="size-4 text-emerald-200" />
            Income
          </span>
          <span>{formatCurrencyFromCents(income)}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-zinc-300">
          <span className="inline-flex items-center gap-2">
            <ArrowDownRight className="size-4 text-rose-200" />
            Expenses
          </span>
          <span>{formatCurrencyFromCents(expenses)}</span>
        </div>
      </div>
      <Progress value={usage} className="mt-4" />
    </div>
  );
}
