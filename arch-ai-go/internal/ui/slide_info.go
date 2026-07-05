package ui

import (
	"arch-ai-go/internal/model"
	"image/color"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/canvas"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/widget"
)

// NewInfoSlide renders a plain explanation slide.
// Long bodies get a styled callout card with a left accent stripe.
func NewInfoSlide(step model.WizardStep) fyne.CanvasObject {
	if step.Body == "" {
		return widget.NewLabel("")
	}

	body := widget.NewLabel(step.Body)
	body.Wrapping = fyne.TextWrapWord

	// If the body is short (one sentence), return it plain.
	if len(step.Body) < 120 {
		return body
	}

	// Longer bodies: wrap in a subtle info card with a blue left accent.
	accentLine := canvas.NewRectangle(ColorAccent())
	accentLine.SetMinSize(fyne.NewSize(3, 0))

	cardBg := canvas.NewRectangle(color.NRGBA{R: 0x10, G: 0x18, B: 0x28, A: 0xff})
	cardBg.CornerRadius = 8

	inner := container.NewBorder(nil, nil, accentLine, nil, container.NewPadded(body))
	return container.NewStack(cardBg, container.NewPadded(inner))
}

// NewSafetySlide renders a safety gate — all checkboxes must be ticked.
func NewSafetySlide(step model.WizardStep, onAllChecked func(bool)) fyne.CanvasObject {
	gate := step.SafetyGate
	if gate == nil {
		return NewInfoSlide(step)
	}

	// Header
	_, accentCol := gateColors(gate.DangerLevel)

	iconLbl := widget.NewLabel(gateIcon(gate.DangerLevel) + "  " + gate.Headline)
	iconLbl.TextStyle = fyne.TextStyle{Bold: true}
	iconLbl.Wrapping = fyne.TextWrapWord

	bodyLbl := widget.NewLabel(gate.Body)
	bodyLbl.Wrapping = fyne.TextWrapWord

	headerBg := canvas.NewRectangle(gateHeaderBg(gate.DangerLevel))
	headerBg.CornerRadius = 8
	accentLine := canvas.NewRectangle(accentCol)
	accentLine.SetMinSize(fyne.NewSize(4, 0))

	headerInner := container.NewVBox(iconLbl, bodyLbl)
	headerContent := container.NewBorder(nil, nil, accentLine, nil,
		container.NewPadded(headerInner))
	header := container.NewStack(headerBg, headerContent)

	// Checkboxes
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

	promptLbl := widget.NewLabel("Confirm all of the following before continuing:")
	promptLbl.Importance = widget.LowImportance

	checkList := container.NewVBox(widget.NewLabel(""), promptLbl)
	for i, text := range gate.Checkboxes {
		idx := i
		cb := widget.NewCheck(text, func(val bool) {
			checked[idx] = val
			checkReady()
		})
		checkList.Add(cb)
	}

	return container.NewVBox(header, checkList)
}

func gateHeaderBg(level string) color.Color {
	switch level {
	case "critical":
		return color.NRGBA{R: 0x28, G: 0x08, B: 0x08, A: 0xff}
	case "danger":
		return color.NRGBA{R: 0x20, G: 0x0e, B: 0x04, A: 0xff}
	default:
		return color.NRGBA{R: 0x1e, G: 0x16, B: 0x04, A: 0xff}
	}
}

func gateColors(level string) (bg, accent color.Color) {
	switch level {
	case "critical":
		return gateHeaderBg(level), color.NRGBA{R: 0xff, G: 0x44, B: 0x44, A: 0xff}
	case "danger":
		return gateHeaderBg(level), ColorDanger()
	default:
		return gateHeaderBg(level), ColorWarning()
	}
}

func gateIcon(level string) string {
	switch level {
	case "critical":
		return "🚨"
	case "danger":
		return "⚠"
	default:
		return "⚡"
	}
}
