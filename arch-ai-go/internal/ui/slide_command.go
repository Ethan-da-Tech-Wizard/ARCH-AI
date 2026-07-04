package ui

import (
	"arch-ai-go/internal/model"
	"fmt"
	"image/color"
	"strings"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/canvas"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/layout"
	"fyne.io/fyne/v2/widget"
)

// NewCommandSlide renders a "command" slide.
// For each CommandBlock it shows:
//   - The full raw command in a monospace box
//   - A token table (each word/symbol with role + explanation)
//   - A "Why spaces?" note
//   - Expected output description
//   - Danger level badge
//   - A copy button (disabled when placeholders are not filled)
func NewCommandSlide(step model.WizardStep, dm model.DeviceMap) fyne.CanvasObject {
	title := canvas.NewText(step.Title, ColorAccent())
	title.TextSize = 20
	title.TextStyle = fyne.TextStyle{Bold: true}

	body := widget.NewRichTextFromMarkdown(step.Body)
	body.Wrapping = fyne.TextWrapWord

	blocks := container.NewVBox()
	for _, cb := range step.Commands {
		blocks.Add(renderCommandBlock(cb, dm))
		blocks.Add(widget.NewLabel(""))
	}

	content := container.NewVBox(
		title,
		body,
		widget.NewLabel(""),
		blocks,
	)
	return container.NewPadded(container.NewVScroll(content))
}

// renderCommandBlock builds the full visual for one CommandBlock.
func renderCommandBlock(cb model.CommandBlock, dm model.DeviceMap) fyne.CanvasObject {
	// ── Danger badge ────────────────────────────────────────────────────────
	badgeColor, badgeLabel := dangerStyle(cb.DangerLevel)
	badge := canvas.NewText("⬛ "+badgeLabel, badgeColor)
	badge.TextSize = 12
	badge.TextStyle = fyne.TextStyle{Bold: true}

	// ── Resolved command (placeholders filled from DeviceMap) ────────────────
	resolved := resolveCommand(cb.Raw, dm)
	hasUnfilled := strings.Contains(resolved, "{{")

	cmdBg := canvas.NewRectangle(ColorSurface())
	cmdBg.CornerRadius = 6
	cmdBg.SetMinSize(fyne.NewSize(600, 44))

	cmdLabel := canvas.NewText(resolved, ColorMono())
	cmdLabel.TextSize = 14
	cmdLabel.TextStyle = fyne.TextStyle{Monospace: true}

	cmdBox := container.NewStack(cmdBg, container.NewPadded(container.NewCenter(cmdLabel)))

	// ── Copy button ──────────────────────────────────────────────────────────
	copyBtn := widget.NewButton("Copy", nil)
	if hasUnfilled {
		copyBtn.Disable()
		copyBtn.SetText("Fill in all fields first")
	} else {
		copyBtn.OnTapped = func() {
			fyne.CurrentApp().Driver().AllWindows()[0].Clipboard().SetContent(resolved)
			copyBtn.SetText("✓ Copied!")
			// Reset label after a moment (next interaction)
		}
	}

	// ── Token table ──────────────────────────────────────────────────────────
	tokenSection := canvas.NewText("Word-by-word breakdown:", color.NRGBA{R: 0xaa, G: 0xbb, B: 0xcc, A: 0xff})
	tokenSection.TextSize = 12

	tokenRows := container.NewVBox()
	for _, tok := range cb.Tokens {
		tokenRows.Add(renderTokenRow(tok))
	}

	// ── Why spaces ───────────────────────────────────────────────────────────
	var spacesSection fyne.CanvasObject
	if cb.WhySpaces != "" {
		spaceLbl := canvas.NewText("Why spaces?", color.NRGBA{R: 0xaa, G: 0xbb, B: 0xcc, A: 0xff})
		spaceLbl.TextSize = 12
		spaceBody := widget.NewLabel(cb.WhySpaces)
		spaceBody.Wrapping = fyne.TextWrapWord
		spacesSection = container.NewVBox(spaceLbl, spaceBody)
	}

	// ── Expected output ──────────────────────────────────────────────────────
	var outputSection fyne.CanvasObject
	if cb.ExpectedOutput != "" {
		outLbl := canvas.NewText("Expected output:", color.NRGBA{R: 0xaa, G: 0xbb, B: 0xcc, A: 0xff})
		outLbl.TextSize = 12

		outBg := canvas.NewRectangle(color.NRGBA{R: 0x0a, G: 0x15, B: 0x0f, A: 0xff})
		outBg.CornerRadius = 4
		outBody := widget.NewLabel(cb.ExpectedOutput)
		outBody.Wrapping = fyne.TextWrapWord
		outBox := container.NewStack(outBg, container.NewPadded(outBody))
		outputSection = container.NewVBox(outLbl, outBox)
	}

	// ── Failure output ───────────────────────────────────────────────────────
	var failSection fyne.CanvasObject
	if cb.FailureOutput != "" {
		failLbl := canvas.NewText("Common failure output:", color.NRGBA{R: 0xdd, G: 0x77, B: 0x77, A: 0xff})
		failLbl.TextSize = 12
		failBg := canvas.NewRectangle(color.NRGBA{R: 0x1a, G: 0x08, B: 0x08, A: 0xff})
		failBg.CornerRadius = 4
		failBody := widget.NewLabel(cb.FailureOutput)
		failBody.Wrapping = fyne.TextWrapWord
		failBox := container.NewStack(failBg, container.NewPadded(failBody))
		failSection = container.NewVBox(failLbl, failBox)
	}

	// ── Note ─────────────────────────────────────────────────────────────────
	var noteSection fyne.CanvasObject
	if cb.Note != "" {
		noteLbl := canvas.NewText("ℹ Note:", ColorWarning())
		noteLbl.TextSize = 12
		noteBody := widget.NewLabel(cb.Note)
		noteBody.Wrapping = fyne.TextWrapWord
		noteSection = container.NewVBox(noteLbl, noteBody)
	}

	// ── Card background ──────────────────────────────────────────────────────
	sections := []fyne.CanvasObject{
		container.NewHBox(badge, layout.NewSpacer(), copyBtn),
		cmdBox,
		widget.NewLabel(""),
		tokenSection,
		tokenRows,
	}
	if spacesSection != nil {
		sections = append(sections, widget.NewLabel(""), spacesSection)
	}
	if outputSection != nil {
		sections = append(sections, widget.NewLabel(""), outputSection)
	}
	if failSection != nil {
		sections = append(sections, failSection)
	}
	if noteSection != nil {
		sections = append(sections, widget.NewLabel(""), noteSection)
	}

	innerBox := container.NewVBox(sections...)
	cardBg := canvas.NewRectangle(ColorCard())
	cardBg.CornerRadius = 8
	return container.NewStack(cardBg, container.NewPadded(innerBox))
}

// renderTokenRow renders one row of the token breakdown table.
func renderTokenRow(tok model.CommandToken) fyne.CanvasObject {
	tokenColor := ColorMono()
	if tok.IsPlaceholder {
		tokenColor = ColorWarning()
	}

	tokenText := canvas.NewText(tok.Text, tokenColor)
	tokenText.TextSize = 13
	tokenText.TextStyle = fyne.TextStyle{Monospace: true}

	roleText := canvas.NewText("["+tok.Role+"]", color.NRGBA{R: 0x66, G: 0x88, B: 0xaa, A: 0xff})
	roleText.TextSize = 11

	explain := widget.NewLabel(tok.Explanation)
	explain.Wrapping = fyne.TextWrapWord

	rowBg := canvas.NewRectangle(color.NRGBA{R: 0x13, G: 0x15, B: 0x20, A: 0xff})
	rowBg.CornerRadius = 4

	inner := container.NewVBox(
		container.NewHBox(tokenText, roleText),
		explain,
	)
	return container.NewStack(rowBg, container.NewPadded(inner))
}

// resolveCommand replaces {{key}} placeholders with DeviceMap values.
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

// dangerStyle returns the badge color and label for a DangerLevel string.
func dangerStyle(level string) (color.Color, string) {
	switch level {
	case "destructive":
		return ColorDanger(), "⚠ DESTRUCTIVE — this command can erase data"
	case "install":
		return ColorWarning(), "📦 INSTALL — downloads and installs packages"
	case "config":
		return ColorAccent(), "⚙ CONFIG — edits system configuration"
	default:
		return ColorSuccess(), "✓ SAFE — read-only inspection command"
	}
}

// renderCommandBlockPreview is used in the wizard progress tooltip.
func renderCommandBlockPreview(raw string) string {
	return fmt.Sprintf("$ %s", raw)
}
