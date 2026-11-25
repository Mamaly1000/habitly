# Stage 3: Navigation with Expo Router

**Version:** 1 (`stage-3-v1.md`)  
**Status:** Planned  
**Date:** 2026-11-24  
**Owner:** Developer & AI Mentor  
**Related Documents:** `docs/SPEC.md` (§4, §5), `docs/DECISIONS.md`, `docs/ROADMAP.md`, `AGENTS.md`, `agent/development-policies.md`

---

## 1. Stage Objectives & Scope

Stage 3 introduces multi-screen mobile navigation using **Expo Router**, Expo's official file-based routing system.

### Core Learning Topics:
1. **File-Based Routing Architecture:** How file paths in `app/` map to mobile navigation routes.
2. **Layout Files (`_layout.tsx`):** Sharing headers, navigation bars, and providers across screens.
3. **Tab Navigation:** Building a bottom tab bar with `Home` and `Statistics` tabs.
4. **Stack & Modal Navigation:** Presenting the "Add Habit" screen as a smooth slide-up modal.
5. **Route Transitions & Parameters:** Navigating between screens using `router.push()` and `<Link>`.

### Stage Deliverable:
A multi-screen app with:
- Bottom tab navigation switching between **Home** and **Statistics**.
- Header / FAB action on Home opening the **Add Habit** screen as a modal.
- Ability to dismiss the modal and return to Home.

---

## 2. React Native Concepts to Master

### 2.1 File-Based Routing vs. React Router (Web)
In web React Router, developers define routes in JSX (`<Route path="/home" element={<Home />} />`).  
In Expo Router, routing is determined by the filesystem structure under `app/`:
- `app/index.tsx` → Default entry route (`/`).
- `app/(tabs)/` → Route group with parenthesis; does not affect the URL path, used to wrap screens in a shared tab layout.
- `app/_layout.tsx` → Root stack layout wrapper.

### 2.2 Native Stack vs. Web History
Mobile navigation is a physical stack of views (`push` and `pop`). Navigating to a screen adds it to the top of the native view hierarchy; pressing the native Android back button pops the top screen.

### 2.3 Modal Presentation
Expo Router allows defining screen presentation as a native modal:
```tsx
// app/_layout.tsx
<Stack>
  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  <Stack.Screen
    name="habits/new"
    options={{ presentation: 'modal', title: 'New Habit' }}
  />
</Stack>
```

---

## 3. Implementation Steps

1. **Step 1: Install & Configure Expo Router Dependencies**
   - Install `expo-router` and related peer packages via `npx expo install`.
   - Update `app.json` scheme and `package.json` entry point if required.
2. **Step 2: Create Root Stack Layout (`app/_layout.tsx`)**
   - Configure native stack with tabs and modal screens.
3. **Step 3: Create Tab Navigator (`app/(tabs)/_layout.tsx`)**
   - Configure bottom tab bar with Home and Statistics items.
4. **Step 4: Migrate Home Screen (`app/(tabs)/index.tsx`)**
   - Move interactive Home dashboard into the tab route.
5. **Step 5: Create Statistics Placeholder Screen (`app/(tabs)/statistics.tsx`)**
   - Basic layout indicating Stage 6 statistics destination.
6. **Step 6: Create Add Habit Modal Screen (`app/habits/new.tsx`)**
   - Title input placeholder and Save/Cancel buttons.
7. **Step 7: Wire Navigation Triggers**
   - Connect "Add Habit" button on Home screen to `router.push('/habits/new')`.
8. **Step 8: Mentor Review & Testing**
   - Test tab switching and modal presentation on Android.
   - Verify Android hardware back button dismisses modal.

---

## 4. Acceptance Criteria & Quality Gate

| Criterion | Target |
|---|---|
| Tab Switching | User can toggle smoothly between Home and Statistics screens. |
| Modal Presentation | Add Habit screen slides up as a modal and can be closed. |
| Android Back Button | Pressing hardware back button dismisses modal as expected. |
| Clean File Structure | Code organized cleanly under `app/`. |
| TypeScript | Zero compilation errors. |
| Completion Report | Recorded in `agent/reports/report-3/report-3-v1.md`. |
