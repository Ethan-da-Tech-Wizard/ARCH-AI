# ARCH-AI Go/Fyne Build Log

This file is **append-only**. It is never overwritten or truncated.
Every completed chunk appends a dated entry below.

---

## 2026-07-04 — Chunk 1: Project Scaffold & Theme

- Status: COMPLETE
- Files created:
  - `go.mod` (module arch-ai-go)
  - `main.go` (Fyne app init, dark theme, 1100×760 window)
  - `internal/ui/theme.go` (ArchTheme — full dark palette)
  - `internal/ui/splash.go` (temporary splash screen)
  - `TODO.md` (this file)
  - `assets/` directory (for lessons.json and glossary.json)
  - `internal/model/`, `internal/data/`, `internal/persist/` directories
- Acceptance check: `go run .` opens a dark window titled "ARCH-AI — Arch Linux Setup Wizard"
- Notes: Fyne v2 dependency will be fetched via `go mod tidy` after go.sum is generated

---

## 2026-07-04 — Chunk 2: Data Models
- Status: COMPLETE
- Files created:
  - `internal/model/profile.go` (SafetyProfile, 12 InstallCardDefs)
  - `internal/model/device.go` (DeviceMap, DevKeyXxx constants)
  - `internal/model/lesson.go` (WizardStep, CommandBlock, CommandToken, NanoBlock, NanoLine, CharNote, Choice, InputField, SafetyGate)
  - `internal/model/state.go` (AppState, NewAppState)
- Acceptance check: `go build ./internal/model/...` → zero errors ✓

---

## 2026-07-04 — Chunk 3: State Persistence
- Status: COMPLETE
- Files created:
  - `internal/persist/store.go` (Load, Save, Reset with XDG_DATA_HOME)
- Notes: Uses atomic write (tmp + rename) to prevent corruption on crash

---

## 2026-07-04 — Chunk 4: Data Loader
- Status: COMPLETE
- Files created:
  - `internal/data/loader.go` (LoadSteps, LoadGlossary, FilterSteps, raw JSON types)
  - `assets/lessons.json` (copied from src-avalonia/Assets)
  - `assets/glossary.json` (copied from src-avalonia/Assets)
- Acceptance check: `go build ./internal/...` → zero errors ✓

---

## 2026-07-04 — Chunk 5: 12-Card Profile Screen
- Status: COMPLETE
- Files created:
  - `internal/ui/profile.go` (NewProfileScreen, profileCard with selection state)
- Features: 3-col grid, selection highlight (blue border), Begin Setup button enables only after selection

---

## 2026-07-04 — Chunk 6: Setup Question Slides
- Status: COMPLETE
- Files created:
  - `internal/ui/slide_choice.go` (NewChoiceSlide, choiceTile with recommended badge)
  - `internal/ui/slide_input.go` (NewInputSlide, per-field readiness tracking, "I don't know yet" button)

---

## 2026-07-04 — Chunk 7: Wizard Engine
- Status: COMPLETE
- Files created:
  - `internal/ui/wizard.go` (WizardApp, phase routing, slide rendering, Back/Next, progress bar, device map, completion screen)
- Notes: applyChoice() writes to correct SafetyProfile field by name; navigateNext() marks steps complete before advancing

---

## 2026-07-04 — Chunk 8: Command Slide Renderer
- Status: COMPLETE
- Files created:
  - `internal/ui/slide_command.go` (renderCommandBlock, renderTokenRow, dangerStyle, resolveCommand)
- Features: Token table, why-spaces, expected output, failure output, danger badge (safe/config/install/destructive), placeholder-aware copy button

---

## 2026-07-04 — Chunk 9: Nano Slide Renderer
- Status: COMPLETE
- Files created:
  - `internal/ui/slide_nano.go` (NewNanoSlide, renderNanoOpenCommand, renderNanoLineTable, renderCharNotes, renderSaveExit)
- Features: 8 canonical CharNotes (/ \ . " - = # space), per-line table, full content monospace box, save/exit instructions

---

## 2026-07-04 — Chunk 10: Info & Safety Slides
- Status: COMPLETE
- Files created:
  - `internal/ui/slide_info.go` (NewInfoSlide, NewSafetySlide, gateColors, gateIcon)
- Features: Checkbox safety gate with warning/danger/critical color levels, blocks Next until all checked

---

## 2026-07-04 — Chunks 11-13: Device Templating, Wiring, main.go
- Status: COMPLETE
- Files updated:
  - `main.go` (full WizardApp wiring, asset path resolution)
- Notes: DeviceMap.Get() / resolveCommand() in slide_command.go handles placeholder substitution; splash.go retained as dead import-free file

---

## 2026-07-04 — Build Verification
- Status: COMPLETE
- Command: `go build -buildvcs=false ./...`
- Result: ✓ Zero errors, all packages compile

## 2026-07-04 — Full Lesson Data: wizard_lessons.json

- Status: COMPLETE
- File created: `assets/wizard_lessons.json`
- Total slides: 32
- Slide types:
  - info: 2 (intro + completion)
  - command: 19 (all terminal commands fully token-annotated)
  - nano: 5 (locale.gen, locale.conf, hostname, loader.conf, arch.conf)
  - safety: 1 (disk safety gate with 4 checkboxes)
  - input: 2 (disk name, root UUID)
- Token annotations: every word, flag, path separator, and argument in every command explained
- CharNotes: all 8 canonical chars (/ \ . " - = # space) explained per nano slide
- Placeholder tokens: {{disk}}, {{efi_part}}, {{root_part}}, {{username}}, {{root_uuid}}
- Binary rebuilt: arch-ai-wizard 33MB ✓
