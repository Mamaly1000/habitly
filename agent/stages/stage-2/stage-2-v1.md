# Stage 2: Components & State Management

**Version:** 1 (`stage-2-v1.md`)  
**Status:** Planned  
**Date:** 2026-11-24  
**Owner:** Developer & AI Mentor  
**Related Documents:** `docs/SPEC.md` (§3.2, §3.3), `docs/DECISIONS.md`, `docs/ROADMAP.md`, `AGENTS.md`, `agent/development-policies.md`

---

## 1. Stage Objectives & Scope

Stage 2 transitions Habitly from a static screen into an interactive mobile experience. The developer will decompose the monolithic screen into reusable components, manage state with `useState`, and make habit completion fully interactive.

### Core Learning Topics:
1. **Component Decomposition:** Breaking down screens into focused, reusable components (`HabitCard`, `HabitList`, `ProgressCard`).
2. **Component Props & Interfaces:** Creating strict TypeScript prop interfaces for React Native components.
3. **State Management with `useState`:** Managing an array of habits and tracking completion state.
4. **Interactive Toggling:** Handling touch events (`onPress`) to toggle completion and dynamically recalculate progress.
5. **Conditional Styling:** Applying dynamic styles based on completion state (e.g., active checkmark color, strikethrough/muted title).
6. **List Rendering:** Comparing `map()` inside `<ScrollView>` vs. `<FlatList>` for mobile performance.

### Stage Deliverable:
An interactive Home screen where tapping any habit toggles its completion status, updates its visual appearance, and dynamically recalculates the daily progress percentage.

---

## 2. React Native Concepts to Master

### 2.1 Component Props in TypeScript
In React Native, components take typed props just like in web React, but style props often accept `StyleProp<ViewStyle>` or `StyleProp<TextStyle>`. We will define clean, explicit prop interfaces:
```typescript
interface HabitCardProps {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  onToggle: (id: string) => void;
}
```

### 2.2 Pressable Feedback States
Instead of relying on browser CSS `:hover` or `:active`, `<Pressable>` accepts a style function:
```tsx
<Pressable
  onPress={() => onToggle(id)}
  style={({ pressed }) => [
    styles.card,
    pressed && styles.cardPressed,
    isCompleted && styles.cardCompleted,
  ]}
>
```

### 2.3 ScrollView vs. FlatList
- `<ScrollView>` renders all children at once, suitable for short, bounded lists.
- `<FlatList>` virtualizes rows, only rendering items currently in view on the screen, crucial for large lists to conserve mobile RAM.
- In Stage 2, we will start with `<ScrollView>` and discuss when to graduate to `<FlatList>`.

---

## 3. Implementation Steps

1. **Step 1: Define In-Memory Habit Interface**
   - Create typed sample habit records with `isCompletedToday: boolean`.
2. **Step 2: Extract `ProgressCard` Component**
   - Receives `completedCount` and `totalCount`.
   - Computes percentage: `Math.round((completed / total) * 100)`.
3. **Step 3: Extract `HabitCard` Component**
   - Receives habit data and `onToggle` callback.
   - Renders interactive checkbox and title/description with completion styling.
4. **Step 4: Extract `HabitList` Component**
   - Maps through habits array and renders `HabitCard` items.
   - Renders clean empty state when no habits exist.
5. **Step 5: Connect State in Home Screen**
   - Initialize `habits` state in `App.tsx` with sample data.
   - Implement `handleToggleHabit(id: string)` updating state immutably.
6. **Step 6: Mentor Review & Testing**
   - Verify tapping habit toggles state reliably on Android.
   - Verify progress card responds instantly.

---

## 4. Acceptance Criteria & Quality Gate

| Criterion | Target |
|---|---|
| Component Modularity | Code is cleanly split into `HabitCard`, `HabitList`, and `ProgressCard`. |
| Interactive Toggle | Tapping any habit card toggles completion status. |
| Reactive Progress | Daily percentage recalculates accurately upon toggle. |
| Visual Differentiation | Completed habits clearly visually distinguished from incomplete habits. |
| TypeScript & Linter | Zero compilation errors under strict mode. |
| Completion Report | Recorded in `agent/reports/report-2/report-2-v1.md`. |
