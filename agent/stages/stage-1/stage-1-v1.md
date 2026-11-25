# Stage 1: React Native Fundamentals & Static Home Screen

**Version:** 1 (`stage-1-v1.md`)  
**Status:** Planned  
**Date:** 2026-11-24  
**Owner:** Developer & AI Mentor  
**Related Documents:** `docs/SPEC.md` (§3.1, §4.1), `docs/DECISIONS.md`, `docs/ROADMAP.md`, `AGENTS.md`, `agent/development-policies.md`

---

## 1. Stage Objectives & Scope

Stage 1 introduces core React Native mobile components and layout mechanics. The developer will build a clean, static **Habitly Home Screen** to master native layouts before adding interactivity.

### Core Learning Topics:
1. **Native UI Primitives:** `View`, `Text`, `Pressable`, `TextInput`, `ScrollView`.
2. **Styling & Layout:** `StyleSheet.create()`, unitless dimensions, Flexbox in React Native (default direction: `column`, `alignItems: 'stretch'`).
3. **Safe Areas:** Handling status bar padding and device edges (`SafeAreaView` / `react-native-safe-area-context`).
4. **Touch Targets:** Minimum 44x44pt interactive targets and `Pressable` pressed feedback.

### Stage Deliverable:
A static Habitly Home Screen containing:
- Greeting & date header ("Good morning", current date).
- Daily progress summary card (e.g. "Today's Progress: 2 of 3 completed · 66%").
- Three sample habit cards displaying title, description snippet, and a mock completion checkbox.
- "Add Habit" action button.

---

## 2. React Native Concepts to Master

### 2.1 View vs. Div
In React Native, `<View>` is the fundamental layout container, analogous to a `<div>` in web development. However:
- `<View>` does **not** accept raw text strings. Placing `"Hello"` inside `<View>` will cause a runtime crash.
- `<View>` is mapped directly to native views (`android.view.ViewGroup` on Android, `UIView` on iOS).

### 2.2 Text Component
All text must be enclosed inside `<Text>`. Unlike web CSS, typography properties (`fontSize`, `fontWeight`, `color`) do **not** cascade down from parent `<View>` components to children. They must be defined on the `<Text>` element or inherited from nested `<Text>` elements.

### 2.3 Native Flexbox
- `flexDirection` defaults to `'column'` (on web it defaults to `'row'`).
- `flex: 1` means expand to fill available space along the main axis.
- Dimensions (`width`, `height`, `margin`, `padding`) are unitless numbers representing density-independent pixels.

### 2.4 Pressable vs. Button
React Native includes a basic `<Button>`, but it has rigid native platform styling. `<Pressable>` is the modern, flexible touch primitive that allows custom styling, hit slop, and pressed-state feedback (`style={({ pressed }) => [...]}`).

---

## 3. Implementation Steps

1. **Step 1: Mentor Concept Walkthrough**
   - Review Web vs. Native Flexbox and `StyleSheet.create()`.
   - Inspect `App.tsx` and understand the root component.
2. **Step 2: Build the Screen Structure**
   - Replace placeholder content with a scrollable container (`ScrollView`).
   - Add status bar configuration using `expo-status-bar`.
3. **Step 3: Construct the Header Section**
   - Add greeting and date display.
4. **Step 4: Construct the Daily Progress Card**
   - Add progress bar background and fill indicator.
5. **Step 5: Construct Sample Habit Cards**
   - Style card container with padding, rounded corners, and border.
   - Add title, description, and mock checkbox indicator.
6. **Step 6: Add the "Add Habit" Button**
   - Create a styled `<Pressable>` button with touch feedback.
7. **Step 7: Code Review & Verification**
   - Review implementation using the Mentor Rubric.
   - Verify layout on Android emulator or physical device.

---

## 4. Acceptance Criteria & Quality Gate

| Criterion | Target |
|---|---|
| Native Primitives | Screen exclusively uses `View`, `Text`, `Pressable`, `ScrollView`, and `StyleSheet`. |
| Zero Crashes | App renders without red screens or unhandled string errors. |
| Spacing & Typography | Clean visual hierarchy, consistent margins, and readable text sizes. |
| Touch Target Sizing | "Add Habit" button and habit checkboxes have at least 44x44pt touchable area. |
| TypeScript | `npx tsc --noEmit` returns 0 errors. |
| Completion Report | Recorded in `agent/reports/report-1/report-1-v1.md`. |
