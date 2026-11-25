# Stage 6: Statistics & History

**Version:** 1 (`stage-6-v1.md`)  
**Status:** Planned  
**Date:** 2026-11-24  
**Owner:** Developer & AI Mentor  
**Related Documents:** `docs/SPEC.md` (§3.3, §3.4, §4.3), `docs/DECISIONS.md`, `docs/ROADMAP.md`, `AGENTS.md`, `agent/development-policies.md`

---

## 1. Stage Objectives & Scope

Stage 6 delivers the full **Statistics & History** engine, transforming raw completion records into meaningful consistency insights without relying on heavy chart libraries or independent counters.

### Core Learning Topics:
1. **Calendar Date Mathematics in Native Apps:** Safely computing local calendar days (`YYYY-MM-DD`), past 7-day ranges, and avoiding UTC boundary issues.
2. **Derived State:** Computing daily percentages, weekly averages, and milestone stats on-the-fly using pure functions and `useMemo`.
3. **Data Aggregation:** Grouping completion records by date and by habit.
4. **Statistics Screen UI:** Building clean native metrics cards, 7-day consistency indicators, and historical completion summaries.
5. **Habit Detail / History View:** Showing past completion records for a specific habit.

### Stage Deliverable:
A fully functional Statistics screen showing:
- Today's completion ratio and percentage.
- 7-day weekly consistency overview.
- All-time total completed habits milestone.
- Simple chronological completion history.

---

## 2. React Native Concepts to Master

### 2.1 Derived State vs. Stored Counters
A common beginner anti-pattern is storing `completionCount: number` directly on the `Habit` object:
- **Flaw:** If a user edits a habit or changes past completions, the counter drifts out of sync.
- **Idiomatic Solution:** Progress is a *derived computation* from the immutable array of `HabitCompletion` records:
```typescript
const todayString = getLocalDateString(new Date());

const todayCompletedCount = useMemo(() => {
  return completions.filter((c) => c.completedDate === todayString).length;
}, [completions, todayString]);
```

### 2.2 Timezone-Safe Calendar Dates
To prevent UTC midnight discrepancies where a completion late at night is recorded as tomorrow:
```typescript
export function getLocalDateString(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
```

### 2.3 Visualizing Stats with StyleSheet
Before introducing chart libraries, building native progress bars and 7-day dot/bar columns with Flexbox reinforces layout mastery:
- Horizontal progress bar: container `<View>` with `overflow: 'hidden'`, inner fill `<View>` with percentage width (`width: `${percentage}%``).
- 7-day weekday pills: horizontal row of 7 items showing day abbreviation ("M", "T", "W") and completion dot.

---

## 3. Implementation Steps

1. **Step 1: Date & Stats Utility Functions (`utils/dateUtils.ts`, `utils/statsUtils.ts`)**
   - `getLocalDateString(date)`
   - `getPastDays(count: number): string[]`
   - `calculateDailyProgress(habits, completions, dateString)`
   - `calculateWeeklyStats(habits, completions)`
2. **Step 2: Build Metric Summary Cards (`components/progress/StatCard.tsx`)**
   - Title, large numeric value, and subtle description.
3. **Step 3: Build 7-Day Consistency Row (`components/progress/WeeklyOverview.tsx`)**
   - Renders past 7 days with day names and visual completion status.
4. **Step 4: Build Statistics Screen (`app/(tabs)/statistics.tsx`)**
   - Today's summary card (completed vs. total, completion percentage).
   - Weekly overview component.
   - Total all-time completion counter.
   - Recent completion history feed.
5. **Step 5: Mentor Review & Testing**
   - Verify statistics update accurately when toggling habits on Home.
   - Verify 7-day consistency correctly flags past completed days.

---

## 4. Acceptance Criteria & Quality Gate

| Criterion | Target |
|---|---|
| Derived Accuracy | All metrics are derived directly from `HabitCompletion` records. |
| Timezone Safety | `completedDate` matches the user's local calendar day. |
| Weekly Overview | 7-day breakdown displays accurate adherence for each past day. |
| Clean UI | Built with pure React Native components and `StyleSheet`; no heavy chart kits. |
| TypeScript | Zero compilation errors. |
| Completion Report | Recorded in `agent/reports/report-6/report-6-v1.md`. |
