export type PrayerSlot = {
  name: "Fajr" | "Dhuhr" | "Asr" | "Maghrib" | "Isha";
  time: string;
};

export type ScheduleBlock = {
  time: string;
  title: string;
  category: string;
  duration: string;
  note: string;
  accentClass: string;
};

export type TradeSnapshot = {
  asset: string;
  strategy: string;
  outcome: "Win" | "Loss" | "Breakeven";
  rr: number;
  lesson: string;
};

export type WorkoutPoint = {
  day: string;
  score: number;
  weight: number;
};

export type RoutineBlock = {
  day: string;
  focus: string;
  time: string;
  anchor: string;
};

export type HabitCell = 0 | 1 | 2 | 3 | 4;

type FinanceTransactionPreview = {
  label: string;
  domain: "Business" | "Personal";
  type: "income" | "expense";
  amountCents: number;
};

type MilestoneTaskPreview = {
  title: string;
  completed: boolean;
};

export const profile = {
  name: "Nurdin",
  location: "Dar es Salaam",
  timeZone: "Africa/Dar_es_Salaam",
  headline: "Private workspace for discipline, growth, and clean execution.",
  streakDays: 18,
  focusTheme: "Compounding consistency across trading, ibadah, fitness, and money.",
};

export const prayerSlots: PrayerSlot[] = [
  { name: "Fajr", time: "05:14" },
  { name: "Dhuhr", time: "12:31" },
  { name: "Asr", time: "15:48" },
  { name: "Maghrib", time: "18:24" },
  { name: "Isha", time: "19:37" },
];

export const todaysSchedule: ScheduleBlock[] = [
  {
    time: "05:20",
    title: "Fajr and Qur'an reflection",
    category: "Spiritual",
    duration: "40 min",
    note: "Ground the day before market prep.",
    accentClass: "from-amber-300/70 to-amber-500/20",
  },
  {
    time: "07:00",
    title: "London session watchlist and ORB prep",
    category: "Trading",
    duration: "90 min",
    note: "Focus on XAUUSD and NAS100 liquidity zones.",
    accentClass: "from-sky-400/70 to-blue-500/20",
  },
  {
    time: "11:30",
    title: "Build sprint for The Nexus",
    category: "Deep Work",
    duration: "2 hr",
    note: "Schema-first implementation and dashboard polish.",
    accentClass: "from-emerald-300/70 to-emerald-500/20",
  },
  {
    time: "17:30",
    title: "Upper body strength session",
    category: "Fitness",
    duration: "75 min",
    note: "Pressing volume plus weighted pull-ups.",
    accentClass: "from-fuchsia-300/70 to-pink-500/20",
  },
];

export const financePreview = {
  dailyBudgetCents: 9500,
  businessBudgetCents: 320000,
  personalBudgetCents: 180000,
  transactions: [
    {
      label: "Algo consulting retainer",
      domain: "Business",
      type: "income",
      amountCents: 420000,
    },
    {
      label: "VPS and market data",
      domain: "Business",
      type: "expense",
      amountCents: 38400,
    },
    {
      label: "Gym membership",
      domain: "Personal",
      type: "expense",
      amountCents: 6200,
    },
    {
      label: "Family transport",
      domain: "Personal",
      type: "expense",
      amountCents: 2400,
    },
    {
      label: "Protein restock",
      domain: "Personal",
      type: "expense",
      amountCents: 1650,
    },
  ] satisfies FinanceTransactionPreview[],
  todayExpenses: [
    { label: "Coffee and Wi-Fi", domain: "Business", type: "expense", amountCents: 1450 },
    { label: "Lunch", domain: "Personal", type: "expense", amountCents: 2150 },
  ] satisfies FinanceTransactionPreview[],
};

export const activeGoal = {
  title: "Prop Firm Challenge",
  area: "Trading",
  targetDate: "2026-05-31",
  targetValue: 100_000,
  currentValue: 71_400,
  milestone: {
    title: "Phase 1 Lock-In",
    dueDate: "2026-05-12",
    tasks: [
      { title: "Finish the 10-day execution checklist", completed: true },
      { title: "Log every trade with lessons learned", completed: true },
      { title: "Stay under max daily drawdown for 7 sessions", completed: true },
      { title: "Review end-of-week metrics and refine filters", completed: false },
      { title: "Submit payout-safe playbook summary", completed: false },
    ] satisfies MilestoneTaskPreview[],
  },
};

export const tradeSnapshots: TradeSnapshot[] = [
  {
    asset: "XAUUSD",
    strategy: "SMC",
    outcome: "Win",
    rr: 2.4,
    lesson: "Patience around London liquidity paid better than forcing the first break.",
  },
  {
    asset: "NAS100",
    strategy: "ORB",
    outcome: "Loss",
    rr: -1,
    lesson: "Skipped higher-timeframe bias check and took a low-quality open.",
  },
  {
    asset: "BTCUSD",
    strategy: "Breakout",
    outcome: "Breakeven",
    rr: 0,
    lesson: "Move stop only after structure confirms, not just after momentum spikes.",
  },
];

export const workoutTrend: WorkoutPoint[] = [
  { day: "Mon", score: 68, weight: 74.6 },
  { day: "Tue", score: 72, weight: 74.2 },
  { day: "Wed", score: 75, weight: 73.9 },
  { day: "Thu", score: 79, weight: 73.7 },
  { day: "Fri", score: 82, weight: 73.4 },
  { day: "Sat", score: 86, weight: 73.2 },
  { day: "Sun", score: 88, weight: 73.1 },
];

export const weeklyRoutine: RoutineBlock[] = [
  { day: "Mon", focus: "Upper Power", time: "17:30", anchor: "Heavy push and pull volume" },
  { day: "Tue", focus: "Zone 2 + Mobility", time: "18:00", anchor: "Recovery and joint quality" },
  { day: "Thu", focus: "Lower Strength", time: "17:30", anchor: "Squat pattern and posterior chain" },
  { day: "Sat", focus: "Athletic Conditioning", time: "08:00", anchor: "Carries, sleds, and intervals" },
];

export const habitHeatmap: HabitCell[] = [
  1, 2, 0, 3, 2, 1, 4,
  2, 3, 2, 1, 4, 3, 2,
  0, 1, 3, 4, 2, 2, 1,
  3, 4, 2, 3, 1, 0, 2,
  2, 3, 4, 2, 1, 3, 4,
];

export const prayerCompletion = [
  { name: "Fajr", completed: true },
  { name: "Dhuhr", completed: true },
  { name: "Asr", completed: false },
  { name: "Maghrib", completed: false },
  { name: "Isha", completed: false },
];

export const journalPreview = {
  mood: "Grounded",
  energy: 8,
  gratitude: "Quiet mornings, clear data, and enough patience to protect capital.",
  content:
    "Today felt cleaner than last week. The good part was discipline, not excitement. I waited longer, sized responsibly, and moved through the day with less noise. Tomorrow's aim is the same: less forcing, more structure.",
};

export function formatCurrencyFromCents(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function getTodayScheduleSummary(schedule: ScheduleBlock[]) {
  const totalBlocks = schedule.length;
  const totalMinutes = schedule.reduce((sum, block) => {
    const [value, unit] = block.duration.split(" ");
    const parsed = Number(value);

    if (!Number.isFinite(parsed)) {
      return sum;
    }

    return unit.startsWith("hr") ? sum + parsed * 60 : sum + parsed;
  }, 0);

  return {
    totalBlocks,
    totalHours: (totalMinutes / 60).toFixed(1),
    firstBlock: schedule[0]?.title ?? "Clear day",
  };
}

export function getDailyBudgetSnapshot() {
  const spentToday = financePreview.todayExpenses.reduce(
    (sum, transaction) => sum + transaction.amountCents,
    0
  );

  return {
    budget: financePreview.dailyBudgetCents,
    spent: spentToday,
    remaining: financePreview.dailyBudgetCents - spentToday,
  };
}

export function getDomainBudgetSummary(domain: "Business" | "Personal") {
  const expenses = financePreview.transactions
    .filter((transaction) => transaction.domain === domain && transaction.type === "expense")
    .reduce((sum, transaction) => sum + transaction.amountCents, 0);

  const income = financePreview.transactions
    .filter((transaction) => transaction.domain === domain && transaction.type === "income")
    .reduce((sum, transaction) => sum + transaction.amountCents, 0);

  const cap =
    domain === "Business"
      ? financePreview.businessBudgetCents
      : financePreview.personalBudgetCents;

  return {
    income,
    expenses,
    cap,
    usage: Math.min(100, Math.round((expenses / cap) * 100)),
  };
}

export function getMilestoneProgress() {
  const tasks = activeGoal.milestone.tasks;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const percent = Math.round((completedTasks / totalTasks) * 100);
  const dueDate = new Date(activeGoal.milestone.dueDate);
  const now = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysRemaining = Math.max(
    0,
    Math.ceil((dueDate.getTime() - now.getTime()) / msPerDay)
  );

  return {
    completedTasks,
    totalTasks,
    percent,
    daysRemaining,
    capitalProgress: Math.round((activeGoal.currentValue / activeGoal.targetValue) * 100),
  };
}

export function getTradingSummary() {
  const realizedR = tradeSnapshots.reduce((sum, trade) => sum + trade.rr, 0);
  const wins = tradeSnapshots.filter((trade) => trade.outcome === "Win").length;

  return {
    realizedR: realizedR.toFixed(1),
    wins,
    total: tradeSnapshots.length,
  };
}
