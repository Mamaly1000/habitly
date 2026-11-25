# Habitly — Product & Technical Specification

**Project:** Habitly  
**Project Type:** Mobile application (iOS & Android)  
**Framework:** React Native + Expo (Managed Workflow)  
**Language:** TypeScript  
**Development Approach:** Guided, incremental implementation  
**Primary Objective:** Build a functional, beautiful habit tracker while mastering React Native fundamentals.

---

## 1. Product Overview

Habitly is a personal habit-tracking mobile application designed to help users establish healthy routines, manage daily habits, and monitor consistency over time.

The application delivers a focused, intuitive, offline-first mobile experience where users organize habits, track daily completions against specific calendar dates, and understand their consistency through derived progress statistics.

### 1.1 Core Principles
1. **Offline & Private by Default:** All habits and completion records are persisted locally using `AsyncStorage`. No user authentication, backend servers, or cloud synchronization are required for the MVP.
2. **Date-Specific Completion:** Habit completions are strictly tied to specific calendar dates (`YYYY-MM-DD`). Completing a habit today never marks it completed tomorrow.
3. **Derived Statistics:** Progress calculations (percentages, weekly completion, consistency) are computed authoritatively from actual completion records rather than independently incremented counter fields.
4. **Pure Native Ergonomics:** Clean, mobile-first layouts using React Native built-in primitives (`View`, `Text`, `Pressable`, `ScrollView`, `TextInput`) and `StyleSheet`. No heavy UI libraries or CSS-in-JS abstractions in the MVP.
5. **Preserved History:** Editing a habit's title or description must never erase or corrupt its historical completion records.

---

## 2. Data Models & Contracts

### 2.1 Habit Model

Represents a defined habit created by the user.

```typescript
export interface Habit {
  id: string;          // Unique identifier (UUID or timestamp-based ID)
  title: string;       // Habit name / headline
  description?: string;// Optional descriptive text or motivation
  createdAt: string;   // ISO 8601 creation timestamp
  isArchived: boolean; // Soft-archive status (default: false)
}
```

### 2.2 Habit Completion Model

Represents a single completion event for a specific habit on a specific calendar date.

```typescript
export interface HabitCompletion {
  id: string;            // Unique identifier for the completion record
  habitId: string;       // Foreign key referencing Habit.id
  completedDate: string; // Calendar date in local YYYY-MM-DD format
  completedAt: string;   // ISO 8601 timestamp of when user toggled completion
}
```

#### Date Handling Rules:
- `completedDate` must always use the local calendar date format `YYYY-MM-DD`.
- Beware of timezone conversions when calculating the user's active calendar day: avoid UTC day boundary shifts.
- A unique constraint should conceptually exist for `(habitId, completedDate)` to prevent duplicate completion entries for the same habit on the same day.

---

## 3. Application Features & Requirements

### 3.1 Habit Management (CRUD)
- **Create Habit:** Users can add a new habit by specifying a mandatory `title` and an optional `description`.
- **View Habits:** List of active (non-archived) habits displayed on the dashboard.
- **Edit Habit:** Users can modify the `title` and `description` of an existing habit without affecting past completion records.
- **Delete Habit:** Users can delete a habit with an explicit confirmation dialog. Deletion handles or purges associated completion records consistently.
- **Habit Details:** Detailed view displaying habit metadata and past completion history.

### 3.2 Daily Habit Tracking
- Displays the active habits for the current calendar day.
- **Completion Toggle:** Tapping a habit completion indicator toggles completion status:
  - If incomplete today: creates a new `HabitCompletion` record with today's `YYYY-MM-DD`.
  - If already completed today: removes/undoes the completion record for today.
- Visual state differentiation: Completed habits show an active checkmark, muted or strikethrough styling, and filled indicators; incomplete habits show an unfilled target indicator.
- Daily progress summary updates immediately upon toggle.

### 3.3 Progress Tracking
- **Daily Completion Percentage:** `(Completed Habits Today / Total Active Habits) * 100`.
- **Remaining Habits Counter:** Count of active habits not yet completed today.
- **Weekly Completion Overview:** 7-day completion consistency across the current week.
- **Overall Consistency:** Derived from historical completion frequency.

### 3.4 Habit History
- Users can inspect historical completion records by date or per habit.
- For the MVP, a simple, clear historical list or calendar breakdown is sufficient.

### 3.5 Habit Editing & Deletion Safeguards
- Form validation: `title` is mandatory and must not be empty or whitespace-only.
- Confirmation modal/alert prior to irreversible habit deletion.

---

## 4. Application Screens & Layouts

### 4.1 Home Screen (`/` or `app/(tabs)/index.tsx`)
The primary daily dashboard.
- **Greeting & Date Section:** Displays friendly greeting and formatted current date (e.g., "Tuesday, Nov 24").
- **Daily Progress Summary:** Progress indicator bar or percentage pill summarizing today's completion.
- **Daily Habit List:** Scrollable list of active habits with titles, optional descriptions, and interactive completion check triggers.
- **Add Habit Trigger:** Floating action button (FAB) or header action button to create a new habit.
- **Empty State:** Motivational message with call-to-action when no habits have been created yet.

### 4.2 Add / Edit Habit Screen (`app/habits/new.tsx` / `app/habits/[id].tsx`)
Modal or stack screen for creating and editing habits.
- **Title Input:** Single-line text input with placeholder ("e.g. Read 20 pages").
- **Description Input:** Multi-line text input for optional notes or cues.
- **Save Action:** Validates input and persists changes.
- **Cancel Action:** Discards unsaved edits and navigates back.
- **Validation Messages:** Clear inline feedback if the title is omitted.

### 4.3 Statistics Screen (`app/(tabs)/statistics.tsx`)
Overview of consistency and habit analytics.
- **Daily Completion Summary:** Today's completed vs. remaining numbers.
- **Weekly Completion Overview:** 7-day breakdown of habit adherence.
- **Total Completed Count:** All-time completion counter derived from records.
- **Simple Historical Progress:** Recent completion timeline.

---

## 5. Navigation Structure (Expo Router)

```text
app/
├── _layout.tsx           # Root stack layout (Tabs + Modal screens)
├── (tabs)/
│   ├── _layout.tsx       # Bottom tab bar (Home, Statistics)
│   ├── index.tsx         # Home dashboard
│   └── statistics.tsx    # Statistics & consistency overview
└── habits/
    ├── new.tsx           # Add habit modal
    └── [id].tsx          # Edit / view habit modal
```

---

## 6. Local Persistence Specification (`AsyncStorage`)

### Storage Keys:
- `@habitly:habits`: JSON array of `Habit` objects.
- `@habitly:completions`: JSON array of `HabitCompletion` objects.

### Operational Rules:
- Load saved habits and completions during application startup.
- Display a smooth splash/loading indicator while reading from storage.
- Save immediately upon creating, editing, deleting, or toggling completion.
- Safely handle corrupted or missing stored data with graceful fallbacks.

---

## 7. UI/UX & Design Guidelines

- **Typography & Hierarchy:** Clean native sans-serif fonts with distinct weight hierarchy (Bold titles, Medium subtitles, Regular body).
- **Touch Ergonomics:** Minimum touch target size of 44x44 points for all buttons and completion checkboxes.
- **Safe Area Handling:** Use `SafeAreaView` / `react-native-safe-area-context` to prevent notch, island, or home indicator clipping.
- **Visual Feedback:** Provide immediate tactile feedback on pressable items (`activeOpacity` or `Pressable` pressed state).
- **Distinguishable States:** Strong contrast between completed and incomplete items.
- **No Heavy Libraries:** Built strictly with `StyleSheet.create()`; no Tailwind, NativeWind, or component kits during MVP.

---

## 8. Definition of MVP Done

Habitly MVP is complete and ready for release when:
1. Users can create, view, edit, and delete habits.
2. Users can mark habits completed today and undo completion with immediate visual feedback.
3. Completions are accurately tied to calendar dates (`YYYY-MM-DD`).
4. Habits and completion history persist across full application restarts.
5. Daily and weekly statistics accurately reflect real completion records.
6. Navigation flows smoothly between Home, Statistics, and Add/Edit screens using Expo Router.
7. The application runs reliably on Android without crashes, layout bugs, or unhandled errors.

---

## 9. Future Possibilities (Post-MVP)

- User authentication & cross-device cloud sync.
- Local push notifications & scheduled habit reminders.
- Habit streaks, freeze days, and milestone achievements.
- Habit categories, color tags, and custom icons.
- Interactive charts and heatmaps.
- Home screen widgets (iOS & Android).
