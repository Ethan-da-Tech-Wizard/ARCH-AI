package ui

import (
	"arch-ai-go/internal/model"
	"image/color"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/canvas"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/widget"
)

// NewInfoSlide renders a plain "info" explanation slide.
func NewInfoSlide(step model.WizardStep) fyne.CanvasObject {
	title := canvas.NewText(step.Title, ColorAccent())
	title.TextSize = 20
	title.TextStyle = fyne.TextStyle{Bold: true}

	body := widget.NewRichTextFromMarkdown(step.Body)
	body.Wrapping = fyne.TextWrapWord

	content := container.NewVBox(title, body)
	return container.NewPadded(container.NewVScroll(content))
}

// NewSafetySlide renders a "safety" gate slide.
// The Next button (via onAllChecked) is only enabled when every checkbox
// in the SafetyGate is ticked.
func NewSafetySlide(step model.WizardStep, onAllChecked func(bool)) fyne.CanvasObject {
	gate := step.SafetyGate
	if gate == nil {
		return NewInfoSlide(step)
	}

	// ── Danger header ────────────────────────────────────────────────────────
	bgColor, borderColor := gateColors(gate.DangerLevel)

	headerBg := canvas.NewRectangle(bgColor)
	headerBg.CornerRadius = 8

	warningIcon := canvas.NewText(gateIcon(gate.DangerLevel), borderColor)
	warningIcon.TextSize = 36
	warningIcon.Alignment = fyne.TextAlignCenter

	headline := canvas.NewText(gate.Headline, borderColor)
	headline.TextSize = 18
	headline.TextStyle = fyne.TextStyle{Bold: true}
	headline.Alignment = fyne.TextAlignCenter

	gateBody := widget.NewLabel(gate.Body)
	gateBody.Wrapping = fyne.TextWrapWord

	headerInner := container.NewVBox(
		container.NewCenter(warningIcon),
		container.NewCenter(headline),
		widget.NewLabel(""),
		gateBody,
	)
	header := container.NewStack(headerBg, container.NewPadded(headerInner))

	// ── Checkboxes ───────────────────────────────────────────────────────────
	checked := make([]bool, len(gate.Checkboxes))

	checkReady := func() {
		for _, v := range checked {
			if !v {
				onAllChecked(false)
				return
			}
		}
		onAllChecked(true)
	}

	checkList := container.NewVBox()
	for i, text := range gate.Checkboxes {
		idx := i
		txt := text
		cb := widget.NewCheck(txt, func(val bool) {
			checked[idx] = val
			checkReady()
		})
		checkList.Add(cb)
	}

	checkLbl := canvas.NewText("You must confirm all of the following before continuing:", color.NRGBA{R: 0xaa, G: 0xbb, B: 0xcc, A: 0xff})
	checkLbl.TextSize = 13

	content := container.NewVBox(
		canvas.NewText(step.Title, ColorAccent()),
		widget.NewLabel(""),
		header,
		widget.NewLabel(""),
		checkLbl,
		checkList,
	)
	return container.NewPadded(container.NewVScroll(content))
}

// ─── Gate style helpers ───────────────────────────────────────────────────────

func gateColors(level string) (bg color.Color, border color.Color) {
	switch level {
	case "critical":
		return color.NRGBA{R: 0x2a, G: 0x08, B: 0x08, A: 0xff},
			color.NRGBA{R: 0xff, G: 0x44, B: 0x44, A: 0xff}
	case "danger":
		return color.NRGBA{R: 0x22, G: 0x0f, B: 0x05, A: 0xff},
			ColorDanger()
	default: // "warning"
		return color.NRGBA{R: 0x20, G: 0x18, B: 0x05, A: 0xff},
			ColorWarning()
	}
}

func gateIcon(level string) string {
	switch level {
	case "critical":
		return "🚨"
	case "danger":
		return "⚠️"
	default:
		return "⚡"
	}
}
