# Arch Wizard Go/Fyne Wizard — UI Formatting Fix Plan

**Date:** 2026-07-05
**Scope:** `arch-wizard-go/` (the Go + Fyne v2 variant of the setup wizard)
**Goal:** Turn the current jumbled, overlapping, vertical-letter-soup UI into a
clean, boring, *typical* setup-wizard workflow. No new features. KISS.

This is a research + planning document. **No code is changed by this document.**
Every item below says exactly what file, what line-area, what is wrong, why it
is wrong (with the Fyne layout rule that explains it), and what the fix is.

---

## 1. What the screenshot shows (symptoms)

The install-type card screen currently renders like this:

1. **Card titles wrap one letter per line, vertically** — "Fresh" becomes
   `F / r / e / s / h` stacked in a 1-character-wide column.
2. **Card body text overflows the card** and paints on top of the cards in the
   row below, so two rows of cards visually merge into one unreadable blob.
3. **Long titles and risk lines run past the card edge** and collide with the
   neighboring card's text.
4. **Multi-codepoint emoji render as broken glyphs** (the `🪟🖥️` "Windows Host
   → VM" symbol shows as boxes / wrong marks).
5. **Cards have no consistent internal structure** — icon, title, description
   and risk text all fight for the same space instead of sitting in fixed
   zones.
6. The screen **does not read as a wizard step**: there is no clear
   "one question, a few readable options, Next" rhythm.

All of these are layout-system bugs, not data bugs. The card text in
`internal/model/profile.go` is fine — it is the rendering in
`internal/ui/profile.go` that destroys it.

---

## 2. Root-cause research — the four Fyne rules we are violating

Everything in the screenshot traces back to four behaviors of Fyne's layout
system. Understanding these is the whole fix; the rest is mechanical.

### Rule A — `canvas.Text` NEVER wraps

`canvas.Text` is a raw canvas primitive. It has no wrapping, no truncation,
and its `MinSize()` is the full pixel width of the entire string. Put a
40-word risk sentence in a `canvas.Text` inside a 320 px card and it simply
draws 1500 px of text straight through every card to its right.

**Where we do this with long prose (all wrong):**

| File | Line | What |
|---|---|---|
| `internal/ui/profile.go` | 123 | `riskText := canvas.NewText(c.def.Risks, …)` — Risks is a full sentence |
| `internal/ui/slide_info.go` | 45 | `headline := canvas.NewText(gate.Headline, …)` — headlines can be long |
| `internal/ui/slide_command.go` | 63 | `cmdLabel := canvas.NewText(resolved, …)` — resolved commands can exceed 600 px |
| `internal/ui/slide_nano.go` | 67, 133 | open-command and file-content lines |

**Rule of thumb going forward:** `canvas.Text` is allowed ONLY for short,
single-line, fixed strings (headings ≤ ~40 chars, badges, counters). Any
sentence-length or data-driven string must be a `widget.Label` (with
`Wrapping = fyne.TextWrapWord`) or `widget.RichText`.

### Rule B — a wrapping `widget.Label` inside `container.NewCenter` (or `NewHBox`) collapses to ~1 character wide

This is THE bug behind the vertical letter-soup. A `widget.Label` with
`Wrapping = fyne.TextWrapWord` reports a *tiny* MinSize (it promises "I can
wrap to fit whatever width you give me"). `container.NewCenter` and
`container.NewHBox` size every child to exactly its MinSize. Result: the
label is given a width of a few pixels, and word-wrap dutifully breaks the
text after every single character → `F` `r` `e` `s` `h` stacked vertically.

**Where we do this (all wrong):**

| File | Line | What |
|---|---|---|
| `internal/ui/profile.go` | 130 | `container.NewCenter(whoFor)` — whoFor is a wrapping Label → THE screenshot bug |
| `internal/ui/profile.go` | 77 | `container.NewCenter(sub)` — sub is wrapping RichText (survives only because the parent VBox is wide) |
| `internal/ui/wizard.go` | 363 | `container.NewCenter(sub)` on the completion screen |
| `internal/ui/splash.go` | 46 | `container.NewCenter(container.NewHBox(body))` — wrapping RichText inside HBox |

**Rule of thumb:** wrapping text goes directly into a `VBox`, `Border`, or
`Max`/`Stack` slot — layouts that hand the child the **full available width**.
To center wrapped text, set `label.Alignment = fyne.TextAlignCenter` on the
label itself; never wrap it in `NewCenter`.

### Rule C — `layout.NewGridWrapLayout(size)` forces every cell to exactly `size` and does NOT clip overflow

GridWrap ignores child MinSize entirely: every cell is exactly 320×240
(profile) or 280×140 (choice tiles). Our card content is a `VBox` whose real
height (icon 36 pt + title + 4–6 wrapped lines + risk sentence) is far more
than 240 px. Fyne does not clip children, so the extra content just draws
over the row below → the "two cards merged into one" mess in the screenshot.

**Where:**

| File | Line | Cell size | Real content height |
|---|---|---|---|
| `internal/ui/profile.go` | 36 | 320×240 | ~380–450 px for the wordy cards |
| `internal/ui/slide_choice.go` | 36 | 280×140 | ~200+ px with a wrapped description |

**Fix options (pick ONE, keep it simple):**
1. **Shrink the content, keep the grid** *(recommended, KISS)* — the card
   shows only icon + title + a 1–2 line summary; the full What/Risks prose
   moves to a **detail panel** that appears for the selected card. This is
   how every real installer does it (Ubuntu, Calamares, Windows setup:
   options are short; detail lives beside/below them).
2. Grow the cell (e.g. 340×420) so everything fits — rejected: cards become
   huge, and any future text edit re-breaks the layout silently.
3. Replace GridWrap with `container.NewGridWithColumns(3, …)` — rows get the
   height of the tallest card, nothing can overlap; still needs option 1's
   text diet to avoid comically tall rows.

### Rule D — Fyne's bundled font has no color emoji; multi-codepoint emoji break

Symbols like `🖥️` (U+1F5A5 + VS16) and the two-emoji string `🪟🖥️` render as
tofu/misaligned glyphs. Anything data-driven that must always render should
be a plain ASCII/BMP symbol or a bundled SVG icon resource
(`theme.Icon`/`widget.NewIcon`).

**Where:** `internal/model/profile.go` `Symbol` fields (lines 126, 135, …,
esp. 180 `"🪟🖥️"`) rendered at `internal/ui/profile.go:107` and
`internal/ui/slide_choice.go:72`.

**KISS fix:** keep the emoji concept but restrict to single-codepoint,
widely-supported emoji (🖥 💿 🔌 🐧 🍎 🔒 ⚡ 🔄 ❓) and replace compound ones
(`🪟🖥️` → just `🪟`; `🐧🖥️` → `🐧`). Icon resources are the "proper"
fix but are explicitly out of scope for this pass.

---

## 3. Target design — the boring, standard wizard shell

One mental model for every screen, matching what users expect from any
installer (and matching the intended design in the screenshot's left rail):

```
┌────────────────────────────────────────────────────────────┐
│ ⚙ Arch Wizard — Arch Linux Setup Wizard            (title bar) │
├────────────┬───────────────────────────────────────────────┤
│  SIDEBAR   │  STEP TITLE (one line, bold, accent)          │
│            │  Short subtitle / instruction (wraps)         │
│ ● Install  │  ───────────────────────────────────────────  │
│   Type     │                                               │
│ ○ Boot &   │        SCROLLABLE CONTENT AREA                │
│   Keyboard │        (cards / choices / command / nano)     │
│ ○ Network  │                                               │
│ ○ Disk     │                                               │
│   Setup    │                                               │
│ ○ Install  │                                               │
│ ○ Configure│                                               │
│ ○ Bootload.│                                               │
│ ○ First    │                                               │
│   Boot     │  ───────────────────────────────────────────  │
│            │  [← Back]      Step 4 of 32  ▓▓▓░░  [Next →]  │
└────────────┴───────────────────────────────────────────────┘
```

Fixed rules for the shell:

1. **One `container.NewBorder` page layout**: title bar top, nav bar bottom,
   sidebar left, scrollable content center. Built ONCE in `wizard.go`;
   slides only ever supply the center content. Today each slide pads and
   scrolls itself and the profile screen builds its own competing page —
   that inconsistency is half the "jumbled" feel.
2. **Back and Next live together in the bottom bar** (Back left, Next right,
   progress + "Step N of M" between). Today Back is in the *top* bar
   (`wizard.go:136`) and Next is alone at the bottom (`wizard.go:144`) —
   nonstandard and disorienting.
3. **The sidebar lists the 8 phases** (Select Install Type, Boot & Keyboard,
   Network, Disk Setup, Install System, Configure, Bootloader, First Boot)
   with the current phase highlighted. Phase for each step comes from a
   `phase` tag in `wizard_lessons.json` (data change, additive). The sidebar
   is display-only — no click-to-jump (KISS; jumping breaks the safety-gate
   ordering anyway).
4. **Every text element obeys Rules A–D above.** Headings: `canvas.Text`,
   short only. Prose: wrapping `widget.Label`/RichText placed in
   full-width slots.
5. **No hard-coded pixel widths for content** (`SetMinSize(fyne.NewSize(600, …))`
   etc.). Backgrounds and dividers may keep min *heights*; widths come from
   the layout. The window is resizable and the content must survive
   800×600 through full-screen.

---

## 4. Screen-by-screen walkthrough of required changes

### 4.1 `internal/ui/profile.go` — the install-type card screen (the screenshot)

This screen gets the biggest rework. Target look: a grid of **small, uniform,
scannable cards** (icon, title, one-line summary) + a **detail panel** that
shows the full WhoFor/What/Risks prose for whichever card is selected +
the existing `Begin Setup →` button.

Step-by-step:

1. **Card content diet** (fixes Rule C overflow):
   - Card shows: symbol (single-codepoint, see 4.8), `Title`
     (`canvas.Text`, bold, 15 pt — all 12 titles are short enough not to
     wrap in a ~300 px card; verify "Full Disk Encryption (LUKS2)" and
     rename to "Full Disk Encryption" if it doesn't fit), and `WhoFor`
     **truncated to a 2-line summary**. Add a short `Summary` field to
     `InstallCardDef` (model change, one line per card) instead of
     truncating at runtime — explicit beats clever.
   - `What` and `Risks` move OFF the card entirely, into the detail panel.
2. **Fix the letter-soup** (Rule B): the summary label is a wrapping
   `widget.Label` with `Alignment = fyne.TextAlignCenter`, added **directly**
   to the card's `VBox` — delete the `container.NewCenter(whoFor)` wrapper
   (line 130). Same for every other `NewCenter(<wrapping thing>)` on this
   screen (line 77).
3. **Fix the overflow risk text** (Rule A): `Risks` is no longer on the card,
   so `canvas.NewText(c.def.Risks, …)` (line 123) is deleted. In the detail
   panel, Risks is a wrapping `widget.Label` colored `ColorWarning()` /
   `ColorSuccess()` (keys `vm-*` and `not-sure` use ✓-style safe notes).
4. **Grid**: replace `layout.NewGridWrapLayout(fyne.NewSize(320, 240))`
   (line 36) with a cell of **≈ 300×150** — icon + title + 2 summary lines
   fits with margin. Keep GridWrap (it reflows columns on resize, which is
   what we want) but now the content provably fits the cell. Remove the
   matching hard-coded `SetMinSize(316, 236)` on bg/border (lines 136, 140)
   — the Stack already stretches them to the cell.
5. **Detail panel**: a `widget.Card`-style box under the grid (or right of
   it at wide sizes — under is simpler, do under): selected card's title,
   `What` (wrapping label), `Risks` (wrapping, colored). Default text when
   nothing selected: "Select an install type above to see details."
   `Begin Setup →` stays disabled until a selection exists (existing logic,
   lines 25–33, keeps working).
6. **Page structure**: stop hand-rolling the page in this file. Profile
   becomes content-only; the wizard shell (4.7) provides title bar, header
   ("Choose Your Install Type" + subtitle), scroll, and the bottom bar
   (`Begin Setup →` takes the Next slot). Delete the local `scroll.SetMinSize
   (700, 480)` (line 45) and the `divider.SetMinSize(600, 1)` (line 72).
7. **Selection affordance** stays as-is (blue border + darker fill,
   lines 157–168) — it works.

### 4.2 `internal/ui/slide_choice.go` — question tiles

Same disease, same medicine:

1. Tile cell `280×140` (line 36) is too small for wrapped descriptions →
   overflow onto neighbors. New cell **≈ 300×170**, and cap `Description`
   length in `wizard_lessons.json` to ~2 lines (audit pass over the data —
   see 4.9).
2. `desc` label (lines 81–83) is already added directly to the VBox —
   correct — but `label` (choice title, line 76) is `canvas.Text` inside
   `NewCenter`: fine ONLY if every choice label is short; audit data and
   shorten any label that would exceed ~26 chars.
3. Remove `t.bg.SetMinSize(276, 136)` (line 104) — cell size governs.
4. Slide title (line 18): `canvas.Text` is acceptable (short), but `body`
   (line 22, wrapping RichText) must be added directly to the VBox — it
   already is (line 51). ✓ no change.
5. Wrap the whole slide in the shared shell's scroll instead of local
   `NewPadded` (line 55) once 4.7 lands.

### 4.3 `internal/ui/slide_info.go` — info + safety slides

1. Info slide is nearly fine (title short, body is wrapping RichText in a
   VBox). Only change: adopt the shared shell scroll.
2. Safety slide: `headline` (line 45) is `canvas.Text` inside
   `NewCenter` (line 55) — Rule A+B risk if any gate headline is long.
   Convert to a bold wrapping `widget.RichText`/Label with centered
   alignment, added directly to the VBox.
3. `checkLbl` (line 85): short fixed string — OK as `canvas.Text`.
4. Line 89 adds a raw `canvas.NewText(step.Title, …)` with no size/style —
   inconsistent with every other slide's 20 pt bold title. Use the shared
   slide-header helper (4.7 item 4).

### 4.4 `internal/ui/slide_command.go` — command slides

1. **Command box** (lines 61–67): `canvas.Text` of the resolved command
   inside a 600 px box — long commands (e.g. the pacstrap line with
   pipewire-bluetooth etc.) silently overflow. Fix: render the command as a
   monospace `widget.Label` with `Wrapping = fyne.TextWrapBreak` (commands
   have no natural word breaks at 600 px) inside the box, and drop the
   `SetMinSize(600, 44)` width — let it take the slide width.
   `container.NewCenter(cmdLabel)` (line 67) must go for the same Rule-B
   reason (left-align commands anyway; centered commands are odd).
2. Section headers (lines 83, 94, 104, 118, 131): short fixed strings —
   `canvas.Text` OK.
3. Token rows (lines 172–176): token text and role tags are short — OK —
   but the per-token *explanation* (whatever widget follows) must be a
   wrapping Label given full row width via `container.NewBorder(nil, nil,
   fixedLeftPart, nil, explanation)`, not an HBox. Audit this function and
   convert any HBox-wrapped explanation label.
4. Adopt shared shell scroll (line 44).

### 4.5 `internal/ui/slide_nano.go` — nano file-edit slides

1. Open-command box (lines 66–70): same fix as 4.4-1 (monospace label,
   no NewCenter, no fixed 600 px width).
2. File-content lines (line 133) and char-note labels (lines 206–213):
   file content lines are short (locale.gen etc.) — `canvas.Text` in
   monospace green is acceptable — but each line's *explanation* must be a
   wrapping Label with full remaining row width (Border layout, as 4.4-3).
3. Headers (61, 89, 103, 124, 201, 237): `"Path explanation: "+nb.FilePath`
   (line 89) is data-driven and can be long → convert that one to a
   wrapping Label; the rest are short fixed strings — OK.
4. Adopt shared shell scroll (line 55).

### 4.6 `internal/ui/slide_input.go` — device-name input slides

1. Field labels (line 55) and `"Example: "+f.Example` (line 79) are
   data-driven `canvas.Text` → convert both to wrapping Labels (examples
   like UUIDs are long).
2. Remove `sep.SetMinSize(600, 1)` (line 108) — full-width separator via
   the layout (`widget.NewSeparator()` is the simplest correct answer).
3. Adopt shared shell scroll (line 121).

### 4.7 `internal/ui/wizard.go` — the shell (structural core of this plan)

1. **Build the standard shell** in `showWizard()` (lines 102–167):
   `container.NewBorder(top: titleBar, bottom: navBar, left: sidebar,
   center: container.NewVScroll(slideContent))`.
   - `navBar` = `container.NewBorder(nil, nil, backBtn,
     nextBtn, container.NewVBox(stepCounter, progressBar))` → Back left,
     Next right, progress centered. Delete the current split (Back in
     topBar line 136–141, Next alone line 144).
   - Slides stop wrapping themselves in `NewVScroll`/`NewPadded`
     (4.2–4.6) — the shell owns scroll + padding. One scrollbar, always in
     the same place.
2. **Sidebar**: new `internal/ui/sidebar.go`. A `VBox` of the 8 phase
   labels; current phase bold + accent + `●`, others dim + `○`. Input: the
   current step's `Phase` string (see 4.9). Width naturally ~180 px from
   label MinSize — no `SetMinSize` needed. Profile screen shows the same
   sidebar with "Select Install Type" active (matches the mock).
3. **Title bar** (lines 147–154): remove `titleBg.SetMinSize(fyne.NewSize(
   1100, 36))` — hard 1100 px breaks at other window widths; a min *height*
   only (e.g. `fyne.NewSize(0, 36)`) with the Stack stretching the width.
4. **Shared slide-header helper**: `func slideHeader(title string) fyne.
   CanvasObject` — 20 pt bold accent `canvas.Text` (titles in
   `wizard_lessons.json` are short; add "titles ≤ 48 chars" to the data
   audit) — so all six slide types stop hand-rolling slightly different
   titles.
5. **Completion screen** (lines 328–370): `container.NewCenter(sub)`
   (line 363) → Rule B; give `sub` a max-width column instead:
   `container.NewCenter(container.NewGridWrap(fyne.NewSize(560, 0), sub))`
   is NOT valid (GridWrap fixes height too) — simplest correct: put `sub`
   in the VBox directly with `Alignment` centered and let the VBox sit in
   a `NewCenter` *with a fixed-width spacer rectangle* (a 560×0
   `canvas.Rectangle` in the same VBox) so the column has a stable width.
   This "invisible width-giver rectangle" is the standard Fyne idiom for
   centered wrapped paragraphs — document it once in theme.go or a
   `uihelpers.go` and reuse.
6. **`showProfile()`** (lines 86–98): render profile content inside the
   same shell (sidebar + title bar + bottom bar with `Begin Setup →`).

### 4.8 `internal/model/profile.go` — data adjustments (small)

1. Add `Summary string` to `InstallCardDef` (1–2 line card text); write the
   12 summaries (≤ ~90 chars each). `WhoFor`/`What`/`Risks` keep their
   current prose for the detail panel.
2. Replace multi-codepoint symbols: `"🖥️"`→`"🖥"`, `"🪟🖥️"`→`"🪟"`,
   `"🐧🖥️"`→`"🐧"` (dedupe vs dual-linux by context; VM cards can use
   `"📦"`), `"⚠️"` risk prefixes inside strings are fine (rendered by
   Label). Verify each remaining symbol renders in Fyne's fallback font on
   Linux; anything that doesn't gets an ASCII/BMP stand-in (`"?"`→`"？"` no —
   keep `"❓"`, it's BMP-adjacent and renders; test).
3. Optional title trims for card width: "Full Disk Encryption (LUKS2)" →
   "Full Disk Encryption"; "Reinstall / Rescue" fits; verify all 12 at
   15 pt in a 300 px card.

### 4.9 `assets/wizard_lessons.json` — data audit (no schema breakage)

1. Add `"phase"` to every step, one of the 8 sidebar phases. Loader
   (`internal/data/loader.go`) and `model.WizardStep` get the matching
   field; steps without a phase default to the previous step's phase so
   partial tagging can't crash anything.
2. Audit pass with hard limits: step `title` ≤ 48 chars; choice `label`
   ≤ 26 chars; choice `description` ≤ 140 chars. Move overflow prose into
   the step `body`.

---

## 5. Master TODO checklist (ordered — do top to bottom)

### Phase 1 — stop the bleeding (the screenshot bugs)
- [ ] 1.1 `profile.go`: delete `NewCenter` wrappers around wrapping labels (lines 77, 130) — kills the vertical letter-soup
- [ ] 1.2 `profile.go`: card diet — add `Summary` to `InstallCardDef`, card shows icon + title + summary only
- [ ] 1.3 `profile.go`: `Risks` off the card; delete `canvas.NewText(Risks)` (line 123)
- [ ] 1.4 `profile.go`: GridWrap cell → 300×150; remove bg/border `SetMinSize` (136, 140)
- [ ] 1.5 `profile.go`: add selected-card detail panel (What + Risks, wrapping labels)
- [ ] 1.6 `model/profile.go`: single-codepoint symbols; write 12 summaries; trim long titles
- [ ] 1.7 `slide_choice.go`: cell → 300×170; remove `SetMinSize` (104); audit choice label lengths

### Phase 2 — the standard wizard shell
- [ ] 2.1 `wizard.go`: one Border-layout shell; Back+progress+Next together in the bottom bar
- [ ] 2.2 `wizard.go`: shell owns the single `VScroll` + padding; slides return bare content (touch all 6 slide files)
- [ ] 2.3 new `sidebar.go`: 8-phase display-only sidebar, current phase highlighted
- [ ] 2.4 `wizard_lessons.json` + loader + `WizardStep`: additive `phase` field
- [ ] 2.5 `wizard.go`: profile screen rendered inside the same shell (`Begin Setup →` in the Next slot)
- [ ] 2.6 `wizard.go`: title bar min-size → height-only (line 153)
- [ ] 2.7 shared `slideHeader()` helper; all slides use it (incl. slide_info.go line 89)

### Phase 3 — remaining Rule A/B violations in slides
- [ ] 3.1 `slide_command.go`: command box → wrapping monospace Label, no `NewCenter`, no fixed 600 px (61–67)
- [ ] 3.2 `slide_command.go`: token explanation rows → Border layout with full-width wrapping label
- [ ] 3.3 `slide_nano.go`: open-command box same as 3.1 (66–70); path-explanation header → wrapping Label (89); line-explanation rows as 3.2
- [ ] 3.4 `slide_info.go`: safety headline → centered wrapping label (45, 55)
- [ ] 3.5 `slide_input.go`: field label + example → wrapping Labels (55, 79); separator → `widget.NewSeparator()` (108)
- [ ] 3.6 `wizard.go` completion screen: fix centered-wrapped-paragraph idiom (363); splash.go same (46) or delete splash.go (it's dead code per TODO.md)
- [ ] 3.7 data audit of `wizard_lessons.json` against the length limits in 4.9

### Phase 4 — verification
- [ ] 4.1 `go build ./...` clean
- [ ] 4.2 Run at 1100×760, 800×600, and full-screen: no overlap, no clipped text, no horizontal letter-stacking anywhere
- [ ] 4.3 Click through all 32 slides of one full profile (vm-linux-host is fastest) — every slide readable, Next/Back always in the same place
- [ ] 4.4 Select each of the 12 cards — detail panel correct, Begin Setup enables
- [ ] 4.5 Update `TODO.md` build log with a dated entry

## 6. Acceptance criteria

1. No text anywhere renders vertically letter-by-letter.
2. No card/tile content overlaps another card or escapes its cell at any
   window size ≥ 800×600.
3. Back, progress, step counter, and Next are always in one bottom bar, in
   that order, on every screen.
4. The sidebar shows the 8 phases with the current one highlighted, on both
   the card screen and every slide.
5. Every card symbol renders as a real glyph (no tofu boxes).
6. `go build ./...` passes; no new dependencies (Fyne v2 only).

## 7. Explicitly OUT of scope (KISS guardrails)

- No new features, slides, or lesson content.
- No clickable sidebar navigation / step jumping (breaks safety-gate order).
- No custom widgets beyond the existing card/tile pattern and one sidebar.
- No SVG icon system this pass — curated single-codepoint emoji only.
- No theme rewrite — `theme.go` palette stays exactly as-is.
- No touching `src-avalonia/` or `legacy_web_setup/` — Go variant only.
