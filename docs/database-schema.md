# Nexus Database Schema

## Design goals

- Keep every module anchored to a single `User` so the dashboard can aggregate cross-domain insights without awkward joins.
- Stay portable: this Prisma schema runs on local SQLite today and can be moved to Supabase/Postgres later with minimal structural changes.
- Separate planned data from logged data, especially for prayers, workouts, budgets, and milestones.

## Core relationship spine

- `User` is the root record for schedule, prayers, habits, trades, fitness, finances, goals, and journal entries.
- `DashboardProfile` stores personalization and defaults like budget target, workout target, and prayer calculation preferences.
- `Goal -> Milestone -> MilestoneTask` models long-term outcomes, the steps inside them, and the task-level completion that powers progress bars.
- `BudgetPeriod -> FinanceTransaction` lets the dashboard calculate daily budget remaining and business vs personal spend inside the same time window.
- `PrayerSchedule` stores the generated daily prayer times, while `PrayerLog` stores whether each prayer was completed.
- `WorkoutRoutine -> WorkoutSession -> ExerciseSet` distinguishes the planned weekly timetable from what actually happened in training.

## Module mapping

| Module | Primary models | Notes |
| --- | --- | --- |
| Unified Dashboard | `ScheduleItem`, `PrayerSchedule`, `PrayerLog`, `BudgetPeriod`, `FinanceTransaction`, `Milestone`, `MilestoneTask`, `JournalEntry` | Aggregates today's state across the workspace. |
| Trading Journal | `TradeJournalEntry` | Covers manual and algorithmic trades, strategy, R:R, and lessons learned. |
| Spiritual & Habits | `PrayerSchedule`, `PrayerLog`, `Habit`, `HabitEntry` | Countdown uses prayer schedule; consistency grid uses habit entries. |
| Fitness & Workout | `WorkoutRoutine`, `WorkoutSession`, `ExerciseSet`, `BodyMetric` | Supports both timetable planning and measurable performance growth. |
| Financial Engine | `BudgetPeriod`, `FinanceCategory`, `FinanceTransaction` | Handles daily allowance plus business/personal partitioning. |
| Milestone & Goals | `Goal`, `Milestone`, `MilestoneTask` | Progress is task-driven, with dates and values available for richer analytics. |
| Daily Journal | `JournalEntry` | Stores mood, energy, gratitude, and markdown content. |

## Why this schema works well

- It keeps the home dashboard simple to query because each module rolls back to `User`.
- It preserves clean distinctions between configuration and activity logs.
- It supports future automation, like generating prayer times by location or attaching schedule blocks directly to active goals.

## Implementation note

For SQLite compatibility, date-only concepts like journal days and prayer days are stored as `DateTime`. In practice, the app should normalize those values to the user's local midnight.
