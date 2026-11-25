# Habitly — Architecture Decisions Log

Record product, design, and architecture decisions that affect implementation. Update this file when a decision is confirmed, revised, or introduced.

---

## 1. Confirmed Technology Baseline

- **Product Name:** Habitly.
- **Application Type:** Native Mobile Application (Android & iOS).
- **Core Framework:** React Native + Expo (Managed Workflow).
- **Language:** TypeScript (`strict: true`).
- **Styling Architecture:** React Native `StyleSheet.create()` and Flexbox.
- **State Management:** React Hooks (`useState`, `useEffect`, `useCallback`, `useMemo`, React Context).
- **Navigation Engine:** Expo Router (File-based routing with Stack & Tabs).
- **Local Persistence:** `@react-native-async-storage/async-storage`.
- **Target OS & Development Environment:** Windows 11 + VS Code; local testing on Android device / Android emulator.
- **Iconography (when introduced):** Lucide React Native (`lucide-react-native`).

---

## 2. Initial Non-Negotiable Restrictions (MVP Scope)

To maintain educational clarity and avoid premature architectural complexity, the following technologies are strictly forbidden during the MVP:

| Excluded Technology | Reason for Initial Exclusion |
|---|---|
| **Redux / Zustand** | State complexity is low; mastering React Hooks and Context is the primary learning objective. |
| **Firebase / Supabase** | Habitly MVP is strictly offline and private; zero cloud databases or remote servers. |
| **Backend REST/GraphQL APIs** | All data remains on-device; avoids network latency and connection edge cases during initial learning. |
| **NativeWind / Tailwind CSS** | Direct mastery of React Native's `StyleSheet`, Flexbox defaults, and layout primitives is required first. |
| **UI Component Kits (Paper, Tamagui, etc.)** | Learning native touch ergonomics, `Pressable`, and component building is prioritized over pre-baked kits. |
| **Complex Dependency Injection** | Simple service/storage modules and custom hooks are sufficient. |

*Re-evaluation policy:* These technologies can be considered post-MVP once core React Native principles and local CRUD are mastered.

---

## 3. Architecture Decision Records (ADRs)

### 2026-11-24 — ADR-001: Adopt Guided Learning, Mentor Persona & Append-Only Stage/Report Versioning Strategy
- **Context:** The developer has advanced web React and TypeScript experience but is a beginner in React Native. The goal is dual: build a functional habit tracker and genuinely learn React Native without AI overwriting the learning process.
- **Decision:**
  1. Agy acts as a Senior React Native Developer, Technical Mentor, and Code Reviewer.
  2. Implement features strictly according to the 7-stage roadmap (preceded by Stage 0 scaffolding).
  3. Adopt the structured markdown governance and 0-indexed append-only versioning strategy (`agent/stages/stage-N/stage-N-v1.md` and `agent/reports/report-N/report-N-v1.md`).
  4. Never generate the entire app at once or jump stages without explicit owner permission.
  5. Explain React Native concepts before implementation (Flexbox differences, StyleSheet vs CSS, mobile layout primitives, touch handling).
- **Impact:** Ensures the developer builds deep, independent React Native capability and every stage is thoroughly verified.

### 2026-11-24 — ADR-002: Local Date-Keyed Completion Model
- **Context:** Habit completion must be tracked per day. Naive counter approaches (`completionCount: number`) lose historical context, while timezone-insensitive dates cause midnight boundary bugs.
- **Decision:**
  1. Store completions as independent records: `HabitCompletion { id, habitId, completedDate: 'YYYY-MM-DD', completedAt: ISOString }`.
  2. Use local calendar dates (`YYYY-MM-DD`) for `completedDate`.
  3. Derive all progress statistics (daily completion percentage, weekly consistency) dynamically from the completion collection.
- **Impact:** Preserves full historical integrity; editing a habit title never erases history; users can toggle completions on specific days accurately.

### 2026-11-24 — ADR-003: Clean Expo Router Structure with Modal Habit Forms
- **Context:** Mobile apps require intuitive navigation: a daily dashboard, a statistics overview, and accessible habit creation.
- **Decision:**
  1. Use Expo Router with a bottom Tab navigator (`Home` and `Statistics`).
  2. Present Add / Edit Habit forms via a stacked modal route (`app/habits/new.tsx`, `app/habits/[id].tsx`).
  3. Keep navigation simple without deep nested stacks or drawer navigators in the MVP.
- **Impact:** Clear mobile information hierarchy that leverages Expo's native file-based routing.

---

## 4. Open Decisions (Pending Later Stages)

- **Exact Date Utility:** Native `Intl` / lightweight date helper vs. `date-fns` (evaluate in Stage 6).
- **Lucide Icons Introduction:** Timing for introducing `lucide-react-native` (evaluate in Stage 3/4).
- **Haptic Feedback:** Introducing `expo-haptics` for habit completion toggles (evaluate in Stage 7 polish).
- **Dark Mode Support:** System theme support vs. fixed theme for initial MVP (evaluate in Stage 7).
