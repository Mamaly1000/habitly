# Stage 4: CRUD & Data Management

**Version:** 1 (`stage-4-v1.md`)  
**Status:** Planned  
**Date:** 2026-11-24  
**Owner:** Developer & AI Mentor  
**Related Documents:** `docs/SPEC.md` (§2, §3.1, §3.5, §3.6), `docs/DECISIONS.md`, `docs/ROADMAP.md`, `AGENTS.md`, `agent/development-policies.md`

---

## 1. Stage Objectives & Scope

Stage 4 implements full in-memory CRUD (Create, Read, Update, Delete) habit management with form handling, validation, and deletion safeguards.

### Core Learning Topics:
1. **Domain Data Models:** Formally defining `Habit` and `HabitCompletion` interfaces in `types/habit.ts`.
2. **Form State Management:** Controlled text inputs with `<TextInput>`, `value`, and `onChangeText`.
3. **Form Validation:** Enforcing non-empty habit titles with clear inline error messages.
4. **Habit Creation Flow:** Collecting title/description, generating unique IDs, updating habit collection, and navigating back.
5. **Habit Editing Flow:** Loading existing habit data into the form, saving updates, and preserving historical completion records.
6. **Habit Deletion & Native Alerts:** Triggering native confirmation dialogs using `Alert.alert` before deleting a habit.
7. **State Architecture:** Centralizing habit state using React Context (`HabitContext`) to share data across routes cleanly without third-party state libraries.

### Stage Deliverable:
Users can create new habits, view them on the dashboard, edit their title/description, and delete them with confirmation.

---

## 2. React Native Concepts to Master

### 2.1 TextInput vs. HTML `<input>`
In React Native:
- `<TextInput>` does not have an `onClick` or `type="text"`.
- Use `placeholderTextColor` to style placeholder text (it cannot be styled via CSS pseudo-elements).
- Use `keyboardType` (e.g. `'default'`), `returnKeyType` (`'done'`), and `multiline={true}` for descriptions.
- Auto-capitalization: `autoCapitalize="sentences"`.

### 2.2 Alert.alert for Confirmation
Instead of web `window.confirm()`, React Native uses the native platform dialog API:
```typescript
Alert.alert(
  'Delete Habit',
  'Are you sure you want to delete this habit? All progress history will be removed.',
  [
    { text: 'Cancel', style: 'cancel' },
    {
      text: 'Delete',
      style: 'destructive',
      onPress: () => deleteHabit(habitId),
    },
  ]
);
```

### 2.3 React Context for Route Sharing
Because Expo Router screens are mounted at different route locations, sharing state via props is impractical. A clean `HabitProvider` in `app/_layout.tsx` allows any screen or tab to consume `useHabits()`.

---

## 3. Implementation Steps

1. **Step 1: Create Domain Models (`types/habit.ts`)**
   - Export `Habit` and `HabitCompletion` interfaces matching `docs/SPEC.md`.
2. **Step 2: Build `HabitContext` (`context/HabitContext.tsx`)**
   - Manage `habits: Habit[]` and `completions: HabitCompletion[]`.
   - Provide actions: `addHabit`, `updateHabit`, `deleteHabit`, `toggleCompletion`.
3. **Step 3: Implement Habit Form Component (`components/habits/HabitForm.tsx`)**
   - Controlled inputs for `title` and `description`.
   - Client validation: title must be trimmed and non-empty.
   - Save and Cancel buttons.
4. **Step 4: Build Add Habit Screen (`app/habits/new.tsx`)**
   - Uses `HabitForm` to create habit and redirect back.
5. **Step 5: Build Edit Habit Screen (`app/habits/[id].tsx`)**
   - Reads route parameter `id` via `useLocalSearchParams()`.
   - Populates `HabitForm` with existing data.
   - Saves changes without modifying completion records.
6. **Step 6: Implement Habit Deletion**
   - Add delete button to habit card or edit screen.
   - Wire `Alert.alert` confirmation before triggering `deleteHabit(id)`.
7. **Step 7: Mentor Review & Testing**
   - Test creating a habit, verifying it appears on the dashboard.
   - Test editing title and verifying completion count is untouched.
   - Test deleting habit and verifying confirmation dialog.

---

## 4. Acceptance Criteria & Quality Gate

| Criterion | Target |
|---|---|
| Habit Creation | User can add a new habit with title and optional description. |
| Validation | Blank/whitespace titles show validation error and prevent save. |
| Habit Editing | User can update title/description without erasing completion history. |
| Habit Deletion | User can delete habit after confirming via native `Alert.alert`. |
| Context Architecture | Clean `HabitContext` used without external state libraries. |
| Completion Report | Recorded in `agent/reports/report-4/report-4-v1.md`. |
