# Stage 5: Local Persistence with AsyncStorage

**Version:** 1 (`stage-5-v1.md`)  
**Status:** Planned  
**Date:** 2026-11-24  
**Owner:** Developer & AI Mentor  
**Related Documents:** `docs/SPEC.md` (§6), `docs/DECISIONS.md`, `docs/ROADMAP.md`, `AGENTS.md`, `agent/development-policies.md`

---

## 1. Stage Objectives & Scope

Stage 5 makes Habitly a genuinely useful offline application by persisting habits and completion history locally on the device using `@react-native-async-storage/async-storage`.

### Core Learning Topics:
1. **Mobile Local Storage:** Understanding native asynchronous key-value persistence.
2. **`AsyncStorage` vs. Web `localStorage`:** Key differences (asynchronous promises vs. synchronous blocking, serialization).
3. **Storage Service Layer:** Encapsulating storage operations inside a typed service (`services/storage/habitStorage.ts`).
4. **App Initialization & Hydration:** Loading stored data on application boot and managing a loading state.
5. **Data Serialization & Error Handling:** Safe JSON parsing and handling corrupted or missing stored values gracefully.
6. **Reactive Persistence:** Ensuring create, edit, delete, and completion actions persist immediately.

### Stage Deliverable:
Habits and historical completion records persist across full application restarts and app backgrounding/termination.

---

## 2. React Native Concepts to Master

### 2.1 AsyncStorage vs. Browser localStorage
In web browsers, `window.localStorage` is synchronous and blocks the JavaScript event loop (`localStorage.setItem('key', val)`).  
In React Native, `AsyncStorage` communicates across the native bridge or via JSI asynchronously. Every call returns a Promise and must be `await`ed:
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Saving
await AsyncStorage.setItem('@habitly:habits', JSON.stringify(habits));

// Loading
const json = await AsyncStorage.getItem('@habitly:habits');
const habits = json != null ? JSON.parse(json) : [];
```

### 2.2 Storage Keys & Namespacing
To avoid key collisions, prefix storage keys with the application namespace:
- `@habitly:habits`
- `@habitly:completions`

### 2.3 Hydration & Splash/Loading State
Because reading from disk is asynchronous, the app must display a brief loading state until data is restored, preventing empty flashes or race conditions:
```typescript
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  async function loadData() {
    try {
      const savedHabits = await habitStorage.getHabits();
      setHabits(savedHabits);
    } finally {
      setIsLoading(false);
    }
  }
  loadData();
}, []);
```

---

## 3. Implementation Steps

1. **Step 1: Install AsyncStorage**
   - Execute `npx expo install @react-native-async-storage/async-storage`.
2. **Step 2: Create Storage Service (`services/storage/habitStorage.ts`)**
   - `getHabits(): Promise<Habit[]>`
   - `saveHabits(habits: Habit[]): Promise<void>`
   - `getCompletions(): Promise<HabitCompletion[]>`
   - `saveCompletions(completions: HabitCompletion[]): Promise<void>`
   - Add error handling and fallback defaults (`[]`).
3. **Step 3: Integrate Storage into `HabitContext`**
   - On mount, asynchronously hydrate habits and completions from storage.
   - Render `ActivityIndicator` or splash screen while `isLoading` is true.
   - On any mutation (`addHabit`, `updateHabit`, `deleteHabit`, `toggleCompletion`), write to `AsyncStorage`.
4. **Step 4: Mentor Review & Testing**
   - Add sample habits and mark completions.
   - Terminate the app completely (kill process) and relaunch.
   - Verify all habits and today's completion states remain intact.

---

## 4. Acceptance Criteria & Quality Gate

| Criterion | Target |
|---|---|
| Dependency Hygiene | Installed using `npx expo install @react-native-async-storage/async-storage`. |
| Cold Restart Persistence | Habits and completion records persist after full app restart. |
| Loading State | App displays a clean loading indicator during data hydration. |
| Error Resilience | Corrupted or missing storage values fallback gracefully without crashing. |
| Clean Service Layer | Storage logic encapsulated in `services/storage/habitStorage.ts`. |
| Completion Report | Recorded in `agent/reports/report-5/report-5-v1.md`. |
