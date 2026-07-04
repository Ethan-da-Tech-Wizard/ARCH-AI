package ui

import (
	"arch-ai-go/internal/data"
	"arch-ai-go/internal/model"
	"arch-ai-go/internal/persist"
	"fmt"
	"image/color"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/canvas"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/layout"
	"fyne.io/fyne/v2/widget"
)

// WizardApp is the root application controller. It owns the AppState, the
// filtered step list, and the main window content stack.
type WizardApp struct {
	window  fyne.Window
	fyneApp fyne.App

	state    model.AppState
	steps    []model.WizardStep
	glossary data.GlossaryDB

	// content is the main window content container — we swap it to navigate.
	content *fyne.Container

	// nextEnabled tracks whether the Next button should be enabled.
	nextEnabled bool
	nextBtn     *widget.Button
	backBtn     *widget.Button
	progressBar *widget.ProgressBar
	stepCounter *canvas.Text
}

// NewWizardApp creates and wires the full application.
func NewWizardApp(w fyne.Window, a fyne.App, lessonsPath, glossaryPath string) *WizardApp {
	wa := &WizardApp{window: w, fyneApp: a}

	// Load persisted state (or fresh state if first run).
	var err error
	wa.state, err = persist.Load()
	if err != nil {
		wa.state = model.NewAppState()
	}

	// Load all wizard steps.
	wa.steps, err = data.LoadSteps(lessonsPath)
	if err != nil {
		wa.steps = []model.WizardStep{}
	}

	// Load glossary.
	wa.glossary, err = data.LoadGlossary(glossaryPath)
	if err != nil {
		wa.glossary = data.GlossaryDB{}
	}

	wa.content = container.NewStack()
	wa.showCurrentPhase()
	return wa
}

// Root returns the main content object to set as the window content.
func (wa *WizardApp) Root() fyne.CanvasObject {
	return wa.content
}

// ─── Phase routing ────────────────────────────────────────────────────────────

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

// ─── Profile screen ───────────────────────────────────────────────────────────

func (wa *WizardApp) showProfile() {
	screen := NewProfileScreen(func(card model.InstallCardDef) {
		wa.state.Profile.InstallCard = card.Key
		// Pre-fill implied profile fields from the card.
		wa.state.Profile.InstallTarget = card.DefaultNext
		wa.state.Phase = "questions"
		wa.state.QuestionIndex = 0
		wa.save()
		wa.showWizard()
	})
	wa.content.Objects = []fyne.CanvasObject{screen}
	wa.content.Refresh()
}

// ─── Wizard (questions + steps) ───────────────────────────────────────────────

func (wa *WizardApp) showWizard() {
	// Build filtered step list whenever the profile changes.
	filtered := data.FilterSteps(wa.steps, wa.state.Profile)

	// Navigation callbacks.
	var slideContent *fyne.Container

	wa.nextEnabled = false

	wa.backBtn = widget.NewButton("← Back", nil)
	wa.backBtn.OnTapped = func() {
		wa.navigateBack(filtered, slideContent)
	}

	wa.nextBtn = widget.NewButton("Next →", nil)
	wa.nextBtn.Importance = widget.HighImportance
	wa.nextBtn.OnTapped = func() {
		wa.navigateNext(filtered, slideContent)
	}
	wa.nextBtn.Disable()

	wa.progressBar = widget.NewProgressBar()
	wa.progressBar.Min = 0
	wa.progressBar.Max = float64(len(filtered))

	wa.stepCounter = canvas.NewText("", color.NRGBA{R: 0xaa, G: 0xbb, B: 0xcc, A: 0xff})
	wa.stepCounter.TextSize = 12

	slideContent = container.NewStack()

	// Render current slide.
	wa.renderSlide(filtered, slideContent)

	// Top bar: back | progress | counter
	topBar := container.NewBorder(
		nil, nil,
		wa.backBtn,
		container.NewHBox(wa.stepCounter),
		wa.progressBar,
	)

	// Bottom bar: next
	bottomBar := container.NewHBox(layout.NewSpacer(), wa.nextBtn)

	// App title strip
	titleStrip := canvas.NewText("⚙  ARCH-AI — Arch Linux Setup Wizard", ColorAccent())
	titleStrip.TextSize = 14
	titleStrip.TextStyle = fyne.TextStyle{Bold: true}
	titleStrip.Alignment = fyne.TextAlignCenter

	titleBg := canvas.NewRectangle(color.NRGBA{R: 0x13, G: 0x15, B: 0x20, A: 0xff})
	titleBg.SetMinSize(fyne.NewSize(1100, 36))
	titleBar := container.NewStack(titleBg, container.NewCenter(titleStrip))

	mainBg := canvas.NewRectangle(color.NRGBA{R: 0x0f, G: 0x10, B: 0x17, A: 0xff})

	page := container.NewBorder(
		container.NewVBox(titleBar, container.NewPadded(topBar)),
		container.NewPadded(bottomBar),
		nil, nil,
		container.NewPadded(slideContent),
	)

	wa.content.Objects = []fyne.CanvasObject{mainBg, page}
	wa.content.Refresh()
}

// ─── Slide rendering ──────────────────────────────────────────────────────────

func (wa *WizardApp) renderSlide(filtered []model.WizardStep, slideContent *fyne.Container) {
	idx := wa.state.CurrentStepIndex
	total := len(filtered)

	// Update progress.
	wa.progressBar.SetValue(float64(idx + 1))
	wa.stepCounter.Text = fmt.Sprintf("Step %d of %d", max(idx+1, 1), max(total, 1))
	wa.stepCounter.Refresh()

	// Back button enabled only after first step.
	if idx <= 0 {
		wa.backBtn.Disable()
	} else {
		wa.backBtn.Enable()
	}

	// If we haven't started yet (index = -1), show the first step.
	if idx < 0 {
		wa.state.CurrentStepIndex = 0
		idx = 0
	}

	if idx >= total {
		wa.showComplete()
		return
	}

	step := filtered[idx]

	// Disable next by default; slide types re-enable it appropriately.
	wa.nextBtn.Disable()
	wa.nextEnabled = false

	enableNext := func() {
		wa.nextEnabled = true
		wa.nextBtn.Enable()
	}

	var slide fyne.CanvasObject
	switch step.SlideType {
	case "command":
		slide = NewCommandSlide(step, wa.state.DeviceMap)
		enableNext() // command slides are always passable

	case "nano":
		slide = NewNanoSlide(step)
		enableNext()

	case "info":
		slide = NewInfoSlide(step)
		enableNext()

	case "choice":
		slide = NewChoiceSlide(step, func(ch model.Choice) {
			// Write choice back to profile field.
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
				} else {
					wa.nextBtn.Disable()
				}
			},
		)

	case "safety":
		slide = NewSafetySlide(step, func(allChecked bool) {
			if allChecked {
				enableNext()
			} else {
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

// ─── Navigation ───────────────────────────────────────────────────────────────

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
	wa.renderSlide(filtered, sc)
}

func (wa *WizardApp) navigateBack(filtered []model.WizardStep, sc *fyne.Container) {
	if wa.state.CurrentStepIndex > 0 {
		wa.state.CurrentStepIndex--
		wa.save()
		wa.renderSlide(filtered, sc)
	}
}

// ─── Profile field writing ────────────────────────────────────────────────────

// applyChoice writes a Choice selection back to the correct SafetyProfile field.
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

// ─── Completion screen ────────────────────────────────────────────────────────

func (wa *WizardApp) showComplete() {
	wa.state.Phase = "complete"
	wa.save()

	icon := canvas.NewText("✅", color.White)
	icon.TextSize = 64
	icon.Alignment = fyne.TextAlignCenter

	heading := canvas.NewText("Installation Walkthrough Complete!", ColorSuccess())
	heading.TextSize = 28
	heading.TextStyle = fyne.TextStyle{Bold: true}
	heading.Alignment = fyne.TextAlignCenter

	sub := widget.NewRichTextFromMarkdown(
		"You have reached the end of your guided Arch Linux setup walkthrough.\n\n" +
			"If you followed every step, your system should be installed and booting correctly. " +
			"If anything did not work, use the **← Back** button to review the relevant steps, " +
			"or restart the wizard from the beginning.",
	)
	sub.Wrapping = fyne.TextWrapWord

	restartBtn := widget.NewButton("↩ Restart Wizard", func() {
		persist.Reset()
		wa.state = model.NewAppState()
		wa.save()
		wa.showProfile()
	})

	bg := canvas.NewRectangle(color.NRGBA{R: 0x0f, G: 0x10, B: 0x17, A: 0xff})

	content := container.NewCenter(container.NewVBox(
		widget.NewLabel(""),
		container.NewCenter(icon),
		container.NewCenter(heading),
		widget.NewLabel(""),
		container.NewCenter(sub),
		widget.NewLabel(""),
		container.NewCenter(restartBtn),
	))

	wa.content.Objects = []fyne.CanvasObject{bg, content}
	wa.content.Refresh()
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

func (wa *WizardApp) save() {
	_ = persist.Save(wa.state)
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}
