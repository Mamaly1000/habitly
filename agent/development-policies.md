# Habitly — Development Policies & Engineering Standards

> **Document:** Development policies, React Native engineering standards, and guided learning methodology  
> **Project:** Habitly  
> **Audience:** Developer, AI Mentor / Coding Agent (Agy), Reviewers  
> **Location:** `agent/development-policies.md`  
> **Status:** Working policy.  

---

## 1. Purpose & Guiding Principles

This document defines the rules for planning, implementing, reviewing, and learning during the development of Habitly.

The developer has advanced React and TypeScript experience for the web, but is a beginner in React Native. The development process must bridge this gap by explicitly highlighting native concepts, mobile layout mechanics, and architectural trade-offs.

### 1.1 Priority Order
1. **Understanding** (Developer understands the native concept and why it's used).
2. **Correct Implementation** (Adheres to React Native idioms and TypeScript safety).
3. **Maintainability** (Focused components, clean code, no premature abstraction).
4. **User Experience** (Mobile ergonomics, touch targets, safe areas).
5. **Optimization** (Premature optimization is strictly avoided).

---

## 2. Web React vs. React Native Mental Model

As an experienced web developer transitioning to native mobile, the following distinctions must be observed:

| Web React (Browser DOM) | React Native (Mobile Host) | Key Rule in Habitly |
|---|---|---|
| `<div>`, `<section>`, `<main>` | `<View>` | Use `<View>` for layout containers. `<View>` does **not** accept raw text. |
| `<p>`, `<span>`, `<h1>`–`<h6>` | `<Text>` | **All** text must be wrapped inside a `<Text>` component. Unwrapped strings crash native apps. |
| `<button>`, `onClick` | `<Pressable>`, `onPress` | Use `<Pressable>` for touch interactions with feedback (`style={({ pressed }) => ...}`). |
| `<input type="text">` | `<TextInput>` | Use `<TextInput>` with explicit placeholder, value, and `onChangeText`. |
| Browser scrolling by default | `<ScrollView>`, `<FlatList>` | Views do not scroll automatically. Scrollable content must be wrapped in `<ScrollView>` or `<FlatList>`. |
| CSS Flexbox (default: `row`) | Native Flexbox (default: `column`) | React Native flex direction is **`column`** by default. `alignItems` defaults to `stretch`. |
| Pixel units (`px`, `rem`, `em`, `%`) | Unitless points | Dimensions are unitless device-independent numbers (e.g., `margin: 16`, not `'16px'`). Percentages must be strings (`'100%'`). |
| Global CSS cascade / classes | `StyleSheet.create()` | No CSS cascade or inheritance (except nested `<Text>` inside `<Text>`). Styles are scoped objects. |
| Viewport boundaries / body | Safe Areas (`SafeAreaView`) | Mobile devices have notches, islands, status bars, and home indicators. Content must respect safe areas. |

---

## 3. Technology Baseline & Initial Restrictions

### 3.1 Approved Baseline
- **Runtime & Tooling:** Expo Managed Workflow (SDK 58 / latest compatible).
- **Language:** TypeScript with strict checking (`noImplicitAny`, `strictNullChecks`).
- **Styling:** React Native `StyleSheet.create()` and Flexbox.
- **Navigation:** Expo Router (file-based routing with Stack and Tabs).
- **Persistence:** `@react-native-async-storage/async-storage`.
- **Icons:** `lucide-react-native` (introduced when visual indicators are needed).

### 3.2 Prohibited Technologies in Initial MVP
Do not install or introduce:
- Redux, Zustand, or MobX.
- Firebase, Supabase, or remote backends.
- Tailwind CSS or NativeWind.
- UI kits (React Native Paper, Tamagui, NativeBase).
- Complex dependency injection frameworks.
- Premature chart or animation libraries.

---

## 4. Guided Learning & Mentorship Methodology

Agy acts as a **Senior React Native Developer, Technical Mentor, and Code Reviewer**.

### 4.1 Implementation Protocol
For every new component, screen, or mechanic:
1. **Explain the Concept:** Contrast the native approach with web React.
2. **Explain the Purpose:** Why this piece is necessary in Habitly.
3. **Identify Target Files:** Exactly which files will be created or edited.
4. **Provide Implementation Approach:** Outline the steps and code structure.
5. **Encourage Developer Implementation:** Allow the developer to write the code whenever practical.
6. **Review Implementation:** Provide constructive, educational feedback.
7. **Confirm Understanding:** Ensure the developer understands before jumping to the next concept.

### 4.2 Code Review Classifications
When reviewing developer code or suggesting changes, tag points clearly:
- 🔴 **Critical:** Crashes, broken data contracts, memory leaks, unhandled exceptions.
- 🟠 **Important:** React Native anti-patterns, missing safe-area handling, improper key extraction.
- 🟡 **Improvement:** Better Flexbox layout, cleaner prop types, touch target ergonomics.
- 🔵 **Optional:** Stylistic polish, readability suggestions, future enhancements.

---

## 5. Coding & Architecture Standards

### 5.1 Components
- Use functional components with typed props interfaces (`interface HabitCardProps`).
- Keep components focused on a single responsibility.
- Place reusable domain components in `components/habits/`, `components/progress/`, and `components/common/`.
- Handle loading, empty, and error states gracefully.

### 5.2 Touch Targets & Mobile Ergonomics
- All interactive controls (`Pressable`, completion buttons, icon triggers) must have a minimum touch target size of **44 × 44 points**.
- Provide active visual feedback on press (opacity change or background shift).
- Inputs must specify appropriate keyboard types (`keyboardType="default"`, `returnKeyType="done"`).

### 5.3 State & Local Persistence
- Manage in-memory state with standard React hooks (`useState`, `useCallback`, `useMemo`, `createContext`).
- Keep state as close as possible to the component that uses it.
- In Stage 5, encapsulate `AsyncStorage` access behind a typed storage service module (`services/storage/habitStorage.ts`).
- Never perform blocking storage operations on the main thread; always handle promises asynchronously with `try/catch`.

### 5.4 Dependency Management
- Always check Expo SDK compatibility before recommending a package.
- Install native dependencies using **`npx expo install <package>`** to ensure Expo-compatible versions.
- Explain why the package is needed before installing it.

---

## 6. Prohibited AI Behaviors

Unless explicitly instructed by the developer, the AI agent must **NOT**:
- Generate the entire application at once.
- Silently jump across roadmap stages.
- Replace the developer's working implementation without explanation.
- Introduce unnecessary third-party libraries.
- Execute `git push` automatically. Keep all commits local until requested.
- Delete, overwrite, or rename historical stage documents or reports.

---

**End of Habitly Development Policies.**
