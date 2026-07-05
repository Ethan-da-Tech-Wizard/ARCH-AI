package ui

import (
	"arch-wizard-go/internal/model"
	"image/color"
	"strings"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/canvas"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/layout"
	"fyne.io/fyne/v2/widget"
)

// NewCommandSlide renders a command slide with full token annotation.
func NewCommandSlide(step model.WizardStep, dm model.DeviceMap) fyne.CanvasObject {
	items := []fyne.CanvasObject{}

	if step.Body != "" {
		bodyLbl := widget.NewLabel(step.Body)
		bodyLbl.Wrapping = fyne.TextWrapWord
		items = append(items, bodyLbl, widget.NewLabel(""))
	}

	for _, cb := range step.Commands {
		items = append(items, renderCommandBlock(cb, dm), widget.NewLabel(""))
	}

	return container.NewVBox(items...)
}

// renderCommandBlock builds the visual for one CommandBlock.
func renderCommandBlock(cb model.CommandBlock, dm model.DeviceMap) fyne.CanvasObject {
	resolved := resolveCommand(cb.Raw, dm)
	hasUnfilled := strings.Contains(resolved, "{{")

	// ── Danger badge row ──────────────────────────────────────────────────────
	badgeTxt, badgeBgCol := dangerStyle(cb.DangerLevel)
	badgeLbl := widget.NewLabel(badgeTxt)
	badgeBg := canvas.NewRectangle(badgeBgCol)
	badgeBg.CornerRadius = 4
	badgeWidget := container.NewStack(badgeBg, container.NewPadded(badgeLbl))

	copyBtn := widget.NewButton("📋 Copy", nil)
	if hasUnfilled {
		copyBtn.Disable()
	} else {
		copyBtn.OnTapped = func() {
			fyne.CurrentApp().Driver().AllWindows()[0].Clipboard().SetContent(resolved)
			copyBtn.SetText("✓ Copied!")
		}
	}
	badgeRow := container.NewBorder(nil, nil, badgeWidget, copyBtn, layout.NewSpacer())

	// ── Command box ───────────────────────────────────────────────────────────
	cmdLbl := widget.NewLabel(resolved)
	cmdLbl.TextStyle = fyne.TextStyle{Monospace: true}
	// Use WrapWord so very long commands wrap inside the card instead of
	// painting straight through into adjacent cards.
	cmdLbl.Wrapping = fyne.TextWrapWord

	cmdBg := canvas.NewRectangle(color.NRGBA{R: 0x09, G: 0x0b, B: 0x12, A: 0xff})
	cmdBg.CornerRadius = 6
	cmdBox := container.NewStack(cmdBg, container.NewPadded(cmdLbl))

	// ── Sections ──────────────────────────────────────────────────────────────
	var sections []fyne.CanvasObject
	sections = append(sections, badgeRow, cmdBox)

	if len(cb.Tokens) > 0 {
		sections = append(sections, widget.NewLabel(""),
			sectionHeader("Word-by-word breakdown:"))
		for _, tok := range cb.Tokens {
			sections = append(sections, renderTokenRow(tok))
		}
	}
	if cb.WhySpaces != "" {
		sections = append(sections, widget.NewLabel(""),
			sectionHeader("Why spaces?"),
			wrappingLabel(cb.WhySpaces))
	}
	if cb.ExpectedOutput != "" {
		sections = append(sections,
			sectionHeader("✓ Expected output:"),
			codeBox(cb.ExpectedOutput, color.NRGBA{R: 0x08, G: 0x14, B: 0x0c, A: 0xff}))
	}
	if cb.FailureOutput != "" {
		sections = append(sections,
			sectionHeader("✗ If it fails:"),
			codeBox(cb.FailureOutput, color.NRGBA{R: 0x18, G: 0x06, B: 0x06, A: 0xff}))
	}
	if cb.Note != "" {
		sections = append(sections,
			sectionHeader("ℹ  Note:"),
			wrappingLabel(cb.Note))
	}

	// ── Card wrapper ──────────────────────────────────────────────────────────
	cardBg := canvas.NewRectangle(color.NRGBA{R: 0x18, G: 0x1a, B: 0x28, A: 0xff})
	cardBg.CornerRadius = 8
	inner := container.NewVBox(sections...)
	return container.NewStack(cardBg, container.NewPadded(inner))
}

// renderTokenRow renders one token explanation row.
func renderTokenRow(tok model.CommandToken) fyne.CanvasObject {
	// Use canvas.Text for the short token word itself — it is always a single
	// word/flag so it will never overflow. Using canvas.Text here lets us
	// colour it (green for commands, amber for placeholders) without a custom
	// renderer. The explanation below uses widget.Label with TextWrapWord so
	// it never bleeds outside its container.
	tokenStyle := fyne.TextStyle{Monospace: true, Bold: true}
	monoCol := ColorMono()
	if tok.IsPlaceholder {
		monoCol = ColorWarning()
	}

	tokenLbl := &canvas.Text{
		Text:      tok.Text,
		Color:     monoCol,
		TextSize:  13,
		TextStyle: tokenStyle,
	}
	roleLbl := widget.NewLabel("[" + tok.Role + "]")
	roleLbl.Importance = widget.LowImportance

	header := container.NewHBox(tokenLbl, roleLbl, layout.NewSpacer())

	// Explanation — MUST wrap so it stays inside the card
	explainLbl := widget.NewLabel(tok.Explanation)
	explainLbl.Wrapping = fyne.TextWrapWord

	rowBg := canvas.NewRectangle(color.NRGBA{R: 0x10, G: 0x12, B: 0x1e, A: 0xff})
	rowBg.CornerRadius = 4
	inner := container.NewVBox(header, explainLbl)
	return container.NewStack(rowBg, container.NewPadded(inner))
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

func resolveCommand(raw string, dm model.DeviceMap) string {
	result := raw
	for key := range dm {
		placeholder := "{{" + key + "}}"
		if strings.Contains(result, placeholder) {
			result = strings.ReplaceAll(result, placeholder, dm.Get(key))
		}
	}
	return result
}

func dangerStyle(level string) (label string, bg color.Color) {
	switch level {
	case "destructive":
		return "⚠  DESTRUCTIVE", color.NRGBA{R: 0x44, G: 0x0a, B: 0x0a, A: 0xff}
	case "install":
		return "📦  INSTALL", color.NRGBA{R: 0x3a, G: 0x28, B: 0x08, A: 0xff}
	case "config":
		return "⚙  CONFIG", color.NRGBA{R: 0x0c, G: 0x22, B: 0x3a, A: 0xff}
	default:
		return "✓  SAFE", color.NRGBA{R: 0x08, G: 0x28, B: 0x10, A: 0xff}
	}
}

func sectionHeader(text string) fyne.CanvasObject {
	lbl := widget.NewLabel(text)
	lbl.Importance = widget.LowImportance
	return lbl
}

func wrappingLabel(text string) fyne.CanvasObject {
	lbl := widget.NewLabel(text)
	lbl.Wrapping = fyne.TextWrapWord
	return lbl
}

func codeBox(text string, bg color.Color) fyne.CanvasObject {
	bgRect := canvas.NewRectangle(bg)
	bgRect.CornerRadius = 4
	lbl := widget.NewLabel(text)
	lbl.Wrapping = fyne.TextWrapWord
	return container.NewStack(bgRect, container.NewPadded(lbl))
}
