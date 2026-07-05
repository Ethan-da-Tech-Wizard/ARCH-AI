package ui

import (
	"arch-ai-go/internal/data"
	"arch-ai-go/internal/model"
	"arch-ai-go/internal/persist"
	"fmt"
	"image/color"
	"strings"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/canvas"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/widget"
)

// ─────────────────────────────────────────────────────────────────────────────
// WizardApp — root controller
// ─────────────────────────────────────────────────────────────────────────────

type WizardApp struct {
	window  fyne.Window
	fyneApp fyne.App

	state    model.AppState
	steps    []model.WizardStep
	glossary data.GlossaryDB

	content *fyne.Container

	nextEnabled bool
	nextBtn     *widget.Button
	backBtn     *widget.Button
	progressBar *widget.ProgressBar
}

func NewWizardApp(w fyne.Window, a fyne.App, lessonsPath, glossaryPath string) *WizardApp {
	wa := &WizardApp{window: w, fyneApp: a}
	var err error
	wa.state, err = persist.Load()
	if err != nil {
		wa.state = model.NewAppState()
	}
	wa.steps, err = data.LoadSteps(lessonsPath)
	if err != nil {
		wa.steps = []model.WizardStep{}
	}
	wa.glossary, err = data.LoadGlossary(glossaryPath)
	if err != nil {
		wa.glossary = data.GlossaryDB{}
	}
	wa.content = container.NewStack()
	wa.showCurrentPhase()
	return wa
}

func (wa *WizardApp) Root() fyne.CanvasObject { return wa.content }

// ─────────────────────────────────────────────────────────────────────────────
// Phase routing
// ─────────────────────────────────────────────────────────────────────────────

func (wa *WizardApp) showCurrentPhase() {
	switch wa.state.Phase {
	case "wizard", "questions":
		wa.showWizard()
	case "complete":
		wa.showComplete()
	default:
		wa.showProfile()
	}
}

// ─────────────────────────────────────────────────────────────────────────────
// Profile screen
// ─────────────────────────────────────────────────────────────────────────────

func (wa *WizardApp) showProfile() {
	wa.backBtn = widget.NewButton("← Back", nil)
	wa.backBtn.Disable()

	wa.nextBtn = widget.NewButton("Begin Setup  →", nil)
	wa.nextBtn.Importance = widget.HighImportance
	wa.nextBtn.Disable()

	body := NewProfileScreen(func(card model.InstallCardDef) {
		wa.state.Profile.InstallCard = card.Key
		wa.state.Profile.InstallTarget = card.DefaultNext
		wa.state.Phase = "questions"
		wa.state.CurrentStepIndex = 0
		wa.save()
		wa.showWizard()
	}, wa.nextBtn)

	page := wa.buildFrame("Choose Your Install Type",
		"Select the option that best describes your situation. Every option is explained in detail below.",
		body, true, true, nil, nil, "", 0, 0)
	wa.content.Objects = []fyne.CanvasObject{page}
	wa.content.Refresh()
}

// ─────────────────────────────────────────────────────────────────────────────
// Wizard (step slides)
// ─────────────────────────────────────────────────────────────────────────────

func (wa *WizardApp) showWizard() {
	filtered := data.FilterSteps(wa.steps, wa.state.Profile)
	if wa.state.CurrentStepIndex < 0 {
		wa.state.CurrentStepIndex = 0
	}

	slideContent := container.NewStack()

	wa.backBtn = widget.NewButton("← Back", nil)
	wa.nextBtn = widget.NewButton("Next →", nil)
	wa.nextBtn.Importance = widget.HighImportance
	wa.nextBtn.Disable()

	wa.backBtn.OnTapped = func() { wa.navigateBack(filtered, slideContent) }
	wa.nextBtn.OnTapped = func() { wa.navigateNext(filtered, slideContent) }

	wa.progressBar = widget.NewProgressBar()
	wa.progressBar.Min = 0
	wa.progressBar.Max = float64(max(len(filtered), 1))

	wa.renderSlide(filtered, slideContent)

	idx := wa.state.CurrentStepIndex
	total := len(filtered)
	slideTitle := ""
	slideSub := fmt.Sprintf("Step %d of %d", idx+1, total)
	if idx >= 0 && idx < len(filtered) {
		slideTitle = filtered[idx].Title
	}

	currentStepID := ""
	if idx >= 0 && idx < len(filtered) {
		currentStepID = filtered[idx].ID
	}

	page := wa.buildFrame(slideTitle, slideSub, slideContent,
		true, true,
		func() { wa.navigateBack(filtered, slideContent) },
		func() { wa.navigateNext(filtered, slideContent) },
		currentStepID, idx, total,
	)
	wa.content.Objects = []fyne.CanvasObject{page}
	wa.content.Refresh()
}

// ─────────────────────────────────────────────────────────────────────────────
// Classic wizard frame
//
//	┌─────────────────────────────────────────────────────┐
//	│  Title bar                                          │
//	├──────────┬──────────────────────────────────────────┤
//	│          │  Slide Title                             │
//	│ Sidebar  │  Subtitle                                │
//	│  ~200px  │  ─────────────────────────────────────  │
//	│          │  Scrollable body                         │
//	├──────────┴──────────────────────────────────────────┤
//	│  [Progress]                  [← Back]   [Next →]   │
//	└─────────────────────────────────────────────────────┘
// ─────────────────────────────────────────────────────────────────────────────

func (wa *WizardApp) buildFrame(
	slideTitle, slideSub string,
	body fyne.CanvasObject,
	showBack, showNext bool,
	onBack, onNext func(),
	currentStepID string,
	stepIdx, stepTotal int,
) fyne.CanvasObject {

	// ── Title bar ─────────────────────────────────────────────────────────────
	titleLbl := widget.NewLabel("  ⚙  ARCH-AI — Arch Linux Setup Wizard")
	titleLbl.TextStyle = fyne.TextStyle{Bold: true}
	titleBar := container.NewStack(
		newRect(color.NRGBA{R: 0x0d, G: 0x0f, B: 0x1a, A: 0xff}, 0, 36),
		container.NewCenter(titleLbl),
	)

	// ── Sidebar ───────────────────────────────────────────────────────────────
	sidebar := wa.buildSidebar(currentStepID, stepIdx, stepTotal)

	// ── Right panel header ────────────────────────────────────────────────────
	titleW := widget.NewLabel(slideTitle)
	titleW.TextStyle = fyne.TextStyle{Bold: true}
	subW := widget.NewLabel(slideSub)
	subW.Importance = widget.LowImportance

	divider := newRect(color.NRGBA{R: 0x28, G: 0x2c, B: 0x3e, A: 0xff}, 0, 1)

	panelHeader := container.NewVBox(
		container.NewPadded(container.NewVBox(titleW, subW)),
		divider,
	)

	scrollBody := container.NewScroll(container.NewPadded(body))

	rightBg := newRect(color.NRGBA{R: 0x13, G: 0x15, B: 0x22, A: 0xff}, 0, 0)
	rightPanel := container.NewStack(rightBg,
		container.NewBorder(panelHeader, nil, nil, nil, scrollBody),
	)

	// ── Split layout (sidebar left, content right) ────────────────────────────
	// Using NewBorder so sidebar gets its natural min-width, content fills rest.
	splitArea := container.NewBorder(nil, nil, sidebar, nil, rightPanel)

	// ── Bottom bar ────────────────────────────────────────────────────────────
	bottom := wa.buildBottomBar(showBack, showNext, onBack, onNext)

	// ── Assemble full page ────────────────────────────────────────────────────
	mainBg := newRect(color.NRGBA{R: 0x0f, G: 0x10, B: 0x18, A: 0xff}, 0, 0)
	return container.NewStack(mainBg,
		container.NewBorder(titleBar, bottom, nil, nil, splitArea),
	)
}

// ─────────────────────────────────────────────────────────────────────────────
// Sidebar — fixed 210px via background rectangle min-size
// ─────────────────────────────────────────────────────────────────────────────

func (wa *WizardApp) buildSidebar(currentStepID string, stepIdx, stepTotal int) fyne.CanvasObject {
	// Logo / branding — use Alignment on the labels, NOT NewCenter (which squeezes
	// wrapping labels to 1-char wide and causes letter-soup vertical text).
	logoLbl := widget.NewLabel("⚙")
	logoLbl.Alignment = fyne.TextAlignCenter

	appNameLbl := widget.NewLabel("ARCH-AI")
	appNameLbl.TextStyle = fyne.TextStyle{Bold: true}
	appNameLbl.Alignment = fyne.TextAlignCenter

	tagLbl := widget.NewLabel("Arch Linux Wizard")
	tagLbl.Importance = widget.LowImportance
	tagLbl.Alignment = fyne.TextAlignCenter

	divider := newRect(color.NRGBA{R: 0x22, G: 0x33, B: 0x55, A: 0xff}, 0, 1)

	logoArea := container.NewVBox(
		widget.NewLabel(""),
		logoLbl,
		appNameLbl,
		tagLbl,
		widget.NewLabel(""),
		divider,
		widget.NewLabel(""),
	)

	// Phase list — active phase is determined by the current step's ID prefix,
	// not by dividing stepIdx/stepTotal (which drifts when steps are filtered).
	type phaseEntry struct {
		label    string
		prefixes []string // slide IDs that start with any of these strings
	}
	phaseList := []phaseEntry{
		{"Select Install Type", []string{"before-you-start"}},
		{"Boot & Keyboard", []string{"boot-iso"}},
		{"Network", []string{"boot-iso-wifi", "boot-iso-network"}},
		{"Disk Setup", []string{"disk-"}},
		{"Install System", []string{"install-"}},
		{"Configure", []string{"configure-"}},
		{"Bootloader", []string{"configure-bootloader"}},
		{"First Boot", []string{"first-boot", "complete"}},
	}

	// resolvePhase returns the index (0-based) of the phase that best matches currentID.
	resolvePhase := func(id string) int {
		// Bootloader must be checked before Configure because its IDs are a subset.
		best := 0
		for i, ph := range phaseList {
			for _, prefix := range ph.prefixes {
				if strings.HasPrefix(id, prefix) {
					best = i
				}
			}
		}
		return best
	}
	activePhase := resolvePhase(currentStepID)

	phaseBox := container.NewVBox()
	for i, ph := range phaseList {
		row := makePhaseRow(ph.label, i == activePhase)
		phaseBox.Add(row)
	}

	// Progress fraction text — Alignment on label, not NewCenter wrapper
	var progLbl *widget.Label
	if stepTotal > 0 {
		pct := (stepIdx * 100) / stepTotal
		progLbl = widget.NewLabel(fmt.Sprintf("%d%% complete", pct))
	} else {
		progLbl = widget.NewLabel("Ready to start")
	}
	progLbl.Importance = widget.LowImportance
	progLbl.Alignment = fyne.TextAlignCenter

	inner := container.NewVBox(logoArea, phaseBox, widget.NewLabel(""), progLbl)

	// The background rectangle enforces the minimum sidebar width (210px).
	sidebarBg := newRect(color.NRGBA{R: 0x09, G: 0x0b, B: 0x15, A: 0xff}, 210, 0)

	return container.NewStack(sidebarBg, container.NewPadded(inner))
}

func makePhaseRow(label string, active bool) fyne.CanvasObject {
	dot := "  ·"
	var dotLbl, textLbl *widget.Label

	dotLbl = widget.NewLabel(dot)
	textLbl = widget.NewLabel(label)

	if active {
		dotLbl.SetText("  ▶")
		dotLbl.TextStyle = fyne.TextStyle{Bold: true}
		textLbl.TextStyle = fyne.TextStyle{Bold: true}
	} else {
		dotLbl.Importance = widget.LowImportance
		textLbl.Importance = widget.LowImportance
	}

	return container.NewHBox(dotLbl, textLbl)
}

// ─────────────────────────────────────────────────────────────────────────────
// Bottom bar
// ─────────────────────────────────────────────────────────────────────────────

func (wa *WizardApp) buildBottomBar(showBack, showNext bool, onBack, onNext func()) fyne.CanvasObject {
	divider := newRect(color.NRGBA{R: 0x28, G: 0x2c, B: 0x3e, A: 0xff}, 0, 1)
	barBg := newRect(color.NRGBA{R: 0x0d, G: 0x0f, B: 0x1a, A: 0xff}, 0, 52)

	var backBtn, nextBtn fyne.CanvasObject

	if showBack && wa.backBtn != nil {
		backBtn = wa.backBtn
	} else {
		b := widget.NewButton("← Back", onBack)
		b.Disable()
		backBtn = b
	}

	if showNext && wa.nextBtn != nil {
		nextBtn = wa.nextBtn
	} else {
		n := widget.NewButton("Next →", onNext)
		n.Importance = widget.HighImportance
		nextBtn = n
	}

	var progressSection fyne.CanvasObject
	if wa.progressBar != nil {
		progLbl := widget.NewLabel("Progress")
		progLbl.Importance = widget.LowImportance
		// Constrain progress bar to 200px so it doesn't stretch across the whole
		// bottom bar on wide windows. We wrap it in a GridWrap container.
		progressSection = container.NewHBox(
			progLbl,
			container.NewGridWrap(fyne.NewSize(200, wa.progressBar.MinSize().Height), wa.progressBar),
		)
	} else {
		progressSection = widget.NewLabel("")
	}

	// Layout: Back button on the Left, Next button on the Right, Progress in the Center
	barRow := container.NewBorder(nil, nil, backBtn, nextBtn, container.NewCenter(progressSection))

	return container.NewVBox(
		divider,
		container.NewStack(barBg, container.NewPadded(barRow)),
	)
}

// ─────────────────────────────────────────────────────────────────────────────
// Slide rendering
// ─────────────────────────────────────────────────────────────────────────────

func (wa *WizardApp) renderSlide(filtered []model.WizardStep, slideContent *fyne.Container) {
	idx := wa.state.CurrentStepIndex
	total := len(filtered)

	if wa.progressBar != nil {
		wa.progressBar.SetValue(float64(idx + 1))
	}
	if wa.backBtn != nil {
		if idx <= 0 {
			wa.backBtn.Disable()
		} else {
			wa.backBtn.Enable()
		}
	}
	if idx < 0 {
		wa.state.CurrentStepIndex = 0
		idx = 0
	}
	if idx >= total {
		wa.showComplete()
		return
	}

	step := filtered[idx]
	if wa.nextBtn != nil {
		wa.nextBtn.Disable()
	}
	wa.nextEnabled = false

	enableNext := func() {
		wa.nextEnabled = true
		if wa.nextBtn != nil {
			wa.nextBtn.Enable()
		}
	}

	var slide fyne.CanvasObject
	switch step.SlideType {
	case "command":
		slide = NewCommandSlide(step, wa.state.DeviceMap)
		enableNext()
	case "nano":
		slide = NewNanoSlide(step)
		enableNext()
	case "info":
		slide = NewInfoSlide(step)
		enableNext()
	case "choice":
		slide = NewChoiceSlide(step, func(ch model.Choice) {
			wa.applyChoice(ch)
			wa.save()
		}, enableNext)
	case "input":
		slide = NewInputSlide(step, wa.state.DeviceMap,
			func(key, value string, unknown bool) {
				if unknown {
					wa.state.DeviceMap.SetUnknown(key)
				} else {
					wa.state.DeviceMap.Set(key, value)
				}
				wa.save()
			},
			func(allFilled bool) {
				if allFilled {
					enableNext()
				} else if wa.nextBtn != nil {
					wa.nextBtn.Disable()
				}
			},
		)
	case "safety":
		slide = NewSafetySlide(step, func(allChecked bool) {
			if allChecked {
				enableNext()
			} else if wa.nextBtn != nil {
				wa.nextBtn.Disable()
			}
		})
	default:
		slide = NewInfoSlide(step)
		enableNext()
	}

	slideContent.Objects = []fyne.CanvasObject{slide}
	slideContent.Refresh()
}

// ─────────────────────────────────────────────────────────────────────────────
// Navigation
// ─────────────────────────────────────────────────────────────────────────────

func (wa *WizardApp) navigateNext(filtered []model.WizardStep, sc *fyne.Container) {
	if !wa.nextEnabled {
		return
	}
	if wa.state.CurrentStepIndex >= 0 && wa.state.CurrentStepIndex < len(filtered) {
		wa.state.MarkStepComplete(filtered[wa.state.CurrentStepIndex].ID)
	}
	wa.state.CurrentStepIndex++
	wa.save()
	if wa.state.CurrentStepIndex >= len(filtered) {
		wa.showComplete()
		return
	}
	wa.showWizard()
}

func (wa *WizardApp) navigateBack(filtered []model.WizardStep, sc *fyne.Container) {
	if wa.state.CurrentStepIndex > 0 {
		wa.state.CurrentStepIndex--
		wa.save()
		wa.showWizard()
	}
}

// ─────────────────────────────────────────────────────────────────────────────
// Profile field writing
// ─────────────────────────────────────────────────────────────────────────────

func (wa *WizardApp) applyChoice(ch model.Choice) {
	p := &wa.state.Profile
	switch ch.ProfileField {
	case "GuideDevice":
		p.GuideDevice = ch.Key
	case "MachineType":
		p.MachineType = ch.Key
	case "CurrentEnv":
		p.CurrentEnv = ch.Key
	case "InstallTarget":
		p.InstallTarget = ch.Key
	case "EraseIntent":
		p.EraseIntent = ch.Key
	case "InternalDrives":
		p.InternalDrives = ch.Key
	case "ExternalDrive":
		p.ExternalDrive = ch.Key
	case "BootMode":
		p.BootMode = ch.Key
	case "BootloaderChoice":
		p.BootloaderChoice = ch.Key
	case "NetworkPath":
		p.NetworkPath = ch.Key
	case "SwapStrategy":
		p.SwapStrategy = ch.Key
	case "AudioTarget":
		p.AudioTarget = ch.Key
	}
}

// ─────────────────────────────────────────────────────────────────────────────
// Completion screen
// ─────────────────────────────────────────────────────────────────────────────

func (wa *WizardApp) showComplete() {
	wa.state.Phase = "complete"
	wa.save()

	icon := widget.NewLabel("✅")
	icon.Alignment = fyne.TextAlignCenter

	heading := widget.NewLabel("Installation Complete!")
	heading.TextStyle = fyne.TextStyle{Bold: true}
	heading.Alignment = fyne.TextAlignCenter

	msg := widget.NewLabel(
		"You have finished the Arch Linux installation walkthrough.\n\n" +
			"If you followed every step, your system should be installed and booting correctly.\n" +
			"Use ← Back to review any step, or restart the wizard to start over.",
	)
	msg.Wrapping = fyne.TextWrapWord
	msg.Alignment = fyne.TextAlignCenter

	restartBtn := widget.NewButton("↩  Restart Wizard", func() {
		_ = persist.Reset()
		wa.state = model.NewAppState()
		wa.save()
		wa.showProfile()
	})

	widthSpacer := canvas.NewRectangle(color.Transparent)
	widthSpacer.SetMinSize(fyne.NewSize(560, 0))

	body := container.NewCenter(container.NewVBox(
		widthSpacer,
		widget.NewLabel(""),
		icon,
		widget.NewLabel(""),
		heading,
		widget.NewLabel(""),
		msg,
		widget.NewLabel(""),
		container.NewCenter(restartBtn),
	))

	page := wa.buildFrame("Installation Complete", "All steps finished", body,
		false, false, nil, nil, "complete", 100, 100)
	wa.content.Objects = []fyne.CanvasObject{page}
	wa.content.Refresh()
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

func (wa *WizardApp) save() { _ = persist.Save(wa.state) }

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

// newRect creates a background rectangle with optional minimum dimensions.
func newRect(c color.Color, minW, minH float32) *canvas.Rectangle {
	r := canvas.NewRectangle(c)
	if minW > 0 || minH > 0 {
		r.SetMinSize(fyne.NewSize(minW, minH))
	}
	return r
}
