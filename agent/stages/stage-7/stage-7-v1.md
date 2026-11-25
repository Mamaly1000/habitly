# Stage 7: Polish, Accessibility & Testing

**Version:** 1 (`stage-7-v1.md`)  
**Status:** Planned  
**Date:** 2026-11-24  
**Owner:** Developer & AI Mentor  
**Related Documents:** `docs/SPEC.md` (§7, §8, §12, §13), `docs/DECISIONS.md`, `docs/ROADMAP.md`, `AGENTS.md`, `agent/development-policies.md`

---

## 1. Stage Objectives & Scope

Stage 7 completes the Habitly MVP, making the application robust, accessible, visually polished, and ready for real-world daily use.

### Core Learning Topics:
1. **Empty States & Guidance:** Designing encouraging empty states with clear calls to action when no habits exist.
2. **Error Boundaries:** Catching unexpected component crashes gracefully in React Native.
3. **Mobile Accessibility:** `accessibilityRole`, `accessibilityLabel`, and screen-reader support.
4. **Touch Target Verification:** Ensuring every interactive control meets the minimum 44×44pt requirement.
5. **Keyboard Handling:** Using `KeyboardAvoidingView` so text inputs aren't obscured by the on-screen keyboard.
6. **Device & Android Verification:** Validating responsiveness across various screen sizes and Android OS versions.
7. **MVP Definition of Done Audit:** Verifying all 11 criteria from `docs/SPEC.md` §8.

### Stage Deliverable:
A polished, robust first release of Habitly running reliably on Android and meeting all MVP criteria.

---

## 2. React Native Concepts to Master

### 2.1 KeyboardAvoidingView
On mobile, the virtual keyboard slides up over content. `KeyboardAvoidingView` automatically adjusts its height or position:
```tsx
<KeyboardAvoidingView
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  style={styles.container}
>
  {/* Inputs */}
</KeyboardAvoidingView>
```

### 2.2 Accessibility in React Native
Web attributes (`aria-label`, `role`) map to React Native accessibility props:
- `accessible={true}`
- `accessibilityRole="button"` / `"checkbox"`
- `accessibilityLabel="Mark Read 20 pages as completed"`
- `accessibilityState={{ checked: isCompleted }}`

### 2.3 Safe Area Insets
Using `useSafeAreaInsets()` from `react-native-safe-area-context` to apply precise edge padding:
```typescript
const insets = useSafeAreaInsets();
// paddingTop: insets.top, paddingBottom: insets.bottom
```

---

## 3. Implementation Steps

1. **Step 1: Empty States Design**
   - Home screen empty state: "No habits yet. Tap '+' to build your first routine!"
   - Statistics empty state: "Complete your first habit to unlock insights."
2. **Step 2: Keyboard Avoiding Behavior in Habit Form**
   - Wrap `HabitForm` inside `KeyboardAvoidingView` and test input focus.
3. **Step 3: Accessibility Pass**
   - Add `accessibilityRole` and `accessibilityLabel` to habit cards, checkboxes, and buttons.
4. **Step 4: Touch Target Audit**
   - Verify every pressable area has `hitSlop` or minimum dimension of 44×44pt.
5. **Step 5: Visual Polish Pass**
   - Harmonize typography, border colors, corner radii, and pressed states.
6. **Step 6: End-to-End Verification on Android**
   - Test habit creation, editing, deletion, toggling, restart persistence, and statistics.
7. **Step 7: Final Completion Report**
   - Document verification results in `agent/reports/report-7/report-7-v1.md`.
   - Update `IMPLEMENTATION_PLAN.md` to MVP Completed.

---

## 4. Acceptance Criteria & MVP Gate

| Criterion | Target |
|---|---|
| Full Habit CRUD | Create, view, edit, and delete habits functioning smoothly. |
| Daily Completion & Undo | Toggle completion works reliably and is tied to `YYYY-MM-DD`. |
| Persistence Verified | Data survives full application termination and restart. |
| Derived Statistics | Accurate daily ratio, weekly overview, and total completions. |
| Navigation Verified | Expo Router tabs and modal transitions work with zero errors. |
| Keyboard Ergonomics | Keyboard does not obscure form inputs. |
| Android Stability | Runs cleanly on Android device/emulator with zero crashes. |
| Completion Report | Recorded in `agent/reports/report-7/report-7-v1.md`. |
