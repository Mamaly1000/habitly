# Stage 0: Scaffolding & Tooling Foundation

**Version:** 1 (`stage-0-v1.md`)  
**Status:** In Progress  
**Date:** 2026-11-24  
**Owner:** Developer & AI Mentor  
**Related Documents:** `docs/SPEC.md`, `docs/DECISIONS.md`, `docs/ROADMAP.md`, `AGENTS.md`, `agent/development-policies.md`

---

## 1. Stage Objectives & Scope

Stage 0 sets up the local mobile development environment on Windows 11, establishes the Expo Managed Workflow foundation, and configures project governance and documentation.

### Primary Goals
1. Scaffold clean React Native + Expo project with TypeScript using the `blank-typescript` template.
2. Verify package dependencies (`expo`, `react-native`, `typescript`).
3. Establish the complete markdown documentation hierarchy (`docs/`, `agent/`, `AGENTS.md`, `README.md`).
4. Verify TypeScript static analysis execution (`npx tsc --noEmit`).
5. Verify the Expo development server startup (`npm start`).

---

## 2. Technical Decisions & Setup

| Item | Configuration | Rationale |
|---|---|---|
| **App Name** | `habitly` | Clean, lowercase repository directory name. |
| **Expo Template** | `blank-typescript` | Minimal, clean boilerplate without heavy pre-installed CSS or tabs, ideal for progressive learning. |
| **TypeScript** | Strict mode enabled | Prevents type bugs and enforces typed component props. |
| **Scripts** | `npm start`, `npm run android` | Standard Expo CLI commands for running dev server and targeting Android. |

---

## 3. Implementation Tasks

- [x] Create project directory and initialize Expo app (`c:\Users\mamaly\Desktop\habitly`).
- [x] Install initial dependencies via `npm install`.
- [x] Establish documentation strategy (`AGENTS.md`, `README.md`, `docs/`, `agent/`).
- [ ] Verify TypeScript compiles with zero errors.
- [ ] Verify dev server starts and displays initial placeholder on Android device / emulator.

---

## 4. Acceptance Criteria & Quality Gates

| Acceptance Criterion | Verification Method | Status |
|---|---|---|
| Expo project scaffolded with TypeScript | Inspect `package.json` & `app.json` | Passed |
| Dependencies installed cleanly | `node_modules/` present | Passed |
| Documentation & stage structure established | Verify `docs/` and `agent/` | Passed |
| TypeScript check passes | `npx tsc --noEmit` returns exit code 0 | Pending verification |
| Dev server launches cleanly | `npm start` starts Metro bundler | Pending verification |

---

## 5. Next Steps

Once Stage 0 verification is confirmed, create `agent/reports/report-0/report-0-v1.md` and proceed to **Stage 1: React Native Fundamentals**.
