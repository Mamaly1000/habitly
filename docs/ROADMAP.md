# Habitly — Implementation Roadmap

Development must follow these stages in sequential order. Each stage has a dedicated specification under `agent/stages/stage-N/stage-N-v1.md` and requires verification and a completion report under `agent/reports/report-N/report-N-v1.md` before proceeding.

---

## Stage 0 — Project Scaffolding & Tooling Foundation
**Specification:** [`agent/stages/stage-0/stage-0-v1.md`](../agent/stages/stage-0/stage-0-v1.md)

- [ ] Initialize Expo Managed Workflow project with TypeScript.
- [ ] Verify local Windows 11 development tooling (Node.js, npm, Expo CLI).
- [ ] Establish markdown governance, agent policies, and stage specifications.
- [ ] Configure `tsconfig.json`, `app.json`, and clean development scripts (`npm start`, `npm run android`).
- [ ] Verify clean baseline launch on Android device / emulator.

**Gate:** Application starts and displays baseline screen without warnings; development environment verified.

---

## Stage 1 — React Native Fundamentals
**Specification:** [`agent/stages/stage-1/stage-1-v1.md`](../agent/stages/stage-1/stage-1-v1.md)

- [ ] Understand core native primitives: `View`, `Text`, `Pressable`, `TextInput`, `ScrollView`, `StyleSheet`.
- [ ] Master React Native Flexbox layout (default `flexDirection: 'column'`, unitless pixel sizing, `alignItems`, `justifyContent`).
- [ ] Understand safe area boundaries and Android status bar handling.
- [ ] Build static Habitly Home Screen:
  - Header / greeting section ("Good morning", current date).
  - Daily progress card with visual completion indicator.
  - Three sample habit cards (title, description preview, mock completion checkbox).
  - "Add Habit" action button.

**Gate:** Static Home screen renders cleanly on Android with proper spacing, readable typography, and correct touch targets.

---

## Stage 2 — Components & State Management
**Specification:** [`agent/stages/stage-2/stage-2-v1.md`](../agent/stages/stage-2/stage-2-v1.md)

- [ ] Decompose monolithic screen into focused, reusable components: `HabitCard`, `HabitList`, `ProgressCard`.
- [ ] Master component props and TypeScript interfaces for native components.
- [ ] Implement interactive state using `useState`:
  - Manage in-memory habit list.
  - Interactive completion toggle: tapping habit marks it completed or undoes completion.
  - Dynamic completion styling (filled checkmark, muted text).
  - Reactive progress card: completion percentage dynamically recalculated.
- [ ] Explore dynamic list rendering: compare `map` inside `ScrollView` vs. `FlatList`.

**Gate:** User can interactively tap habits to mark them complete/incomplete; daily percentage updates smoothly.

---

## Stage 3 — Navigation with Expo Router
**Specification:** [`agent/stages/stage-3/stage-3-v1.md`](../agent/stages/stage-3/stage-3-v1.md)

- [ ] Learn Expo Router file-based routing architecture (`app/` directory, layouts, special filenames).
- [ ] Set up Root Stack Layout (`app/_layout.tsx`).
- [ ] Build Bottom Tab Navigator (`app/(tabs)/_layout.tsx`) with two tabs:
  - Home (`app/(tabs)/index.tsx`)
  - Statistics (`app/(tabs)/statistics.tsx`)
- [ ] Build modal presentation for Habit Form:
  - Add Habit route (`app/habits/new.tsx`).
- [ ] Pass route parameters and navigate between screens.

**Gate:** User can switch between Home and Statistics tabs and open/close the Add Habit modal cleanly.

---

## Stage 4 — CRUD & Data Management
**Specification:** [`agent/stages/stage-4/stage-4-v1.md`](../agent/stages/stage-4/stage-4-v1.md)

- [ ] Implement Habit domain models (`Habit`, `HabitCompletion`) in TypeScript.
- [ ] Build full habit creation form with validation (title required, non-empty).
- [ ] Implement habit editing screen (`app/habits/[id].tsx`): update title & description without erasing completion history.
- [ ] Implement habit deletion with native confirmation dialog (`Alert.alert`).
- [ ] Centralize in-memory habit state and state mutation helpers.

**Gate:** User can create, edit, view, and delete habits with input validation and deletion confirmation.

---

## Stage 5 — Local Persistence with AsyncStorage
**Specification:** [`agent/stages/stage-5/stage-5-v1.md`](../agent/stages/stage-5/stage-5-v1.md)

- [ ] Understand native asynchronous storage principles and the `@react-native-async-storage/async-storage` package.
- [ ] Install `@react-native-async-storage/async-storage` via `npx expo install`.
- [ ] Build typed storage service (`services/storage/`):
  - Save / load habits (`@habitly:habits`).
  - Save / load completions (`@habitly:completions`).
- [ ] Implement application startup data hydration, loading splash state, and error handling.
- [ ] Ensure all CRUD mutations persist immediately.

**Gate:** Habits and completion states persist across full application restarts.

---

## Stage 6 — Statistics & History
**Specification:** [`agent/stages/stage-6/stage-6-v1.md`](../agent/stages/stage-6/stage-6-v1.md)

- [ ] Implement calendar date calculation utilities (`YYYY-MM-DD`, start-of-week, day comparisons).
- [ ] Calculate derived statistics from completion records:
  - Today's completed vs. remaining counts.
  - Daily completion percentage.
  - Weekly 7-day consistency overview.
  - All-time completed habit milestones.
- [ ] Build Statistics Screen UI with clean cards, summary pills, and weekly breakdown.
- [ ] Simple historical completion ledger per habit.

**Gate:** Statistics screen accurately reflects past and present completion records.

---

## Stage 7 — Polish, Accessibility & Testing
**Specification:** [`agent/stages/stage-7/stage-7-v1.md`](../agent/stages/stage-7/stage-7-v1.md)

- [ ] Empty states for habit list and statistics.
- [ ] Accessibility pass: `accessibilityRole`, `accessibilityLabel`, minimum 44x44 touch targets.
- [ ] Visual polish: smooth transitions, consistent margins, typography hierarchy.
- [ ] Error boundary and corrupted data recovery.
- [ ] Multi-screen resolution testing on Android.
- [ ] Verify MVP Definition of Done.

**Gate:** Polished, bug-free, fully responsive habit tracker running reliably on Android.

---

## Agent Task Template

For every implementation task, follow this structure:

> **Stage & Task:** [e.g., Stage 1: Build Static Habit Card]  
> **React Native Concept:** [Explain concept, e.g., View vs div, StyleSheet, Flexbox]  
> **Why it's necessary:** [Reasoning for this step]  
> **Target Files:** [Specific file paths]  
> **Implementation Guidance:** [Step-by-step guidance, allowing the developer to code where practical]  
> **Verification:** [How to test on device/emulator]
