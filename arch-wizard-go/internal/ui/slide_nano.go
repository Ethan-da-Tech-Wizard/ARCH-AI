package ui

import (
	"arch-wizard-go/internal/model"
	"fmt"
	"image/color"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/canvas"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/widget"
)

// NewNanoSlide renders a file-edit slide with step-by-step annotation.
func NewNanoSlide(step model.WizardStep) fyne.CanvasObject {
	items := []fyne.CanvasObject{}

	if step.Body != "" {
		bodyLbl := widget.NewLabel(step.Body)
		bodyLbl.Wrapping = fyne.TextWrapWord
		items = append(items, bodyLbl, widget.NewLabel(""))
	}

	if step.NanoEdit == nil {
		return container.NewVBox(items...)
	}

	nb := step.NanoEdit
	items = append(items,
		renderNanoOpenCommand(nb),
		widget.NewLabel(""),
		renderFilePathExplain(nb),
		widget.NewLabel(""),
		renderFullContent(nb),
		widget.NewLabel(""),
		renderNanoLineTable(nb),
		widget.NewLabel(""),
		renderCharNotes(nb),
		widget.NewLabel(""),
		renderSaveExit(nb),
	)

	return container.NewVBox(items...)
}

// ─── Open command ─────────────────────────────────────────────────────────────

func renderNanoOpenCommand(nb *model.NanoBlock) fyne.CanvasObject {
	hdr := widget.NewLabel("Step 1 — Open the file:")
	hdr.Importance = widget.LowImportance

	// Use TextWrapWord so long paths don't overflow the card edge.
	cmdLbl := widget.NewLabel(nb.OpenCommand)
	cmdLbl.TextStyle = fyne.TextStyle{Monospace: true}
	cmdLbl.Wrapping = fyne.TextWrapWord
	cmdBg := canvas.NewRectangle(color.NRGBA{R: 0x09, G: 0x0b, B: 0x12, A: 0xff})
	cmdBg.CornerRadius = 6
	cmdBox := container.NewStack(cmdBg, container.NewPadded(cmdLbl))

	tokenRows := container.NewVBox()
	for _, tok := range nb.OpenTokens {
		tokenRows.Add(renderTokenRow(tok))
	}

	inner := container.NewVBox(hdr, cmdBox, widget.NewLabel(""), tokenRows)
	cardBg := canvas.NewRectangle(color.NRGBA{R: 0x18, G: 0x1a, B: 0x28, A: 0xff})
	cardBg.CornerRadius = 8
	return container.NewStack(cardBg, container.NewPadded(inner))
}

// ─── File path explanation ────────────────────────────────────────────────────

func renderFilePathExplain(nb *model.NanoBlock) fyne.CanvasObject {
	if nb.FilePathExplain == "" {
		return widget.NewLabel("")
	}
	hdr := widget.NewLabel("Path explained: " + nb.FilePath)
	hdr.Importance = widget.LowImportance

	body := widget.NewLabel(nb.FilePathExplain)
	body.Wrapping = fyne.TextWrapWord

	inner := container.NewVBox(hdr, body)
	cardBg := canvas.NewRectangle(color.NRGBA{R: 0x18, G: 0x1a, B: 0x28, A: 0xff})
	cardBg.CornerRadius = 8
	return container.NewStack(cardBg, container.NewPadded(inner))
}

// ─── Full file content ────────────────────────────────────────────────────────

func renderFullContent(nb *model.NanoBlock) fyne.CanvasObject {
	hdr := widget.NewLabel("Step 2 — Type this exactly into the file:")
	hdr.Importance = widget.LowImportance

	// TextWrapOff is intentional here — this is verbatim file content that must
	// be reproduced character-for-character. Wrap it in a scroll container so
	// lines longer than the panel width scroll horizontally instead of being
	// clipped at the card edge.
	contentLbl := widget.NewLabel(nb.FullContent)
	contentLbl.TextStyle = fyne.TextStyle{Monospace: true}
	contentLbl.Wrapping = fyne.TextWrapOff

	contentBg := canvas.NewRectangle(color.NRGBA{R: 0x09, G: 0x0b, B: 0x12, A: 0xff})
	contentBg.CornerRadius = 6
	// Set a minimum height so short files still show as a distinct block.
	contentBg.SetMinSize(fyne.NewSize(0, 60))

	copyBtn := widget.NewButton("📋 Copy", func() {
		fyne.CurrentApp().Driver().AllWindows()[0].Clipboard().SetContent(nb.FullContent)
		// Button text reset is best-effort; we don't capture the button ref cleanly here.
	})
	copyBtn.Importance = widget.LowImportance

	scrollContent := container.NewScroll(container.NewPadded(contentLbl))
	scrollContent.SetMinSize(fyne.NewSize(0, 120))
	contentBox := container.NewStack(contentBg, scrollContent)

	headerRow := container.NewBorder(nil, nil, nil, copyBtn, hdr)

	inner := container.NewVBox(headerRow, contentBox)
	cardBg := canvas.NewRectangle(color.NRGBA{R: 0x18, G: 0x1a, B: 0x28, A: 0xff})
	cardBg.CornerRadius = 8
	return container.NewStack(cardBg, container.NewPadded(inner))
}

// ─── Per-line explanation ─────────────────────────────────────────────────────

func renderNanoLineTable(nb *model.NanoBlock) fyne.CanvasObject {
	if len(nb.Lines) == 0 {
		return widget.NewLabel("")
	}

	hdr := widget.NewLabel("Step 3 — Line-by-line explanation:")
	hdr.Importance = widget.LowImportance

	rows := container.NewVBox()
	for _, line := range nb.Lines {
		numLbl := widget.NewLabel(fmt.Sprintf("Line %d:", line.LineNumber))
		numLbl.TextStyle = fyne.TextStyle{Bold: true}

		codeLbl := widget.NewLabel(line.Content)
		codeLbl.TextStyle = fyne.TextStyle{Monospace: true}

		explainLbl := widget.NewLabel(line.Explanation)
		explainLbl.Wrapping = fyne.TextWrapWord

		rowBg := canvas.NewRectangle(color.NRGBA{R: 0x10, G: 0x12, B: 0x1e, A: 0xff})
		rowBg.CornerRadius = 4
		inner := container.NewVBox(
			container.NewHBox(numLbl, codeLbl),
			explainLbl,
		)
		rows.Add(container.NewStack(rowBg, container.NewPadded(inner)))
		rows.Add(widget.NewLabel(""))
	}

	inner := container.NewVBox(hdr, rows)
	cardBg := canvas.NewRectangle(color.NRGBA{R: 0x18, G: 0x1a, B: 0x28, A: 0xff})
	cardBg.CornerRadius = 8
	return container.NewStack(cardBg, container.NewPadded(inner))
}

// ─── CharNotes ────────────────────────────────────────────────────────────────

func renderCharNotes(nb *model.NanoBlock) fyne.CanvasObject {
	if len(nb.CharNotes) == 0 {
		return widget.NewLabel("")
	}

	hdr := widget.NewLabel("Character reference:")
	hdr.Importance = widget.LowImportance

	rows := container.NewVBox()
	for _, cn := range nb.CharNotes {
		charLbl := widget.NewLabel(`"` + cn.Char + `"`)
		charLbl.TextStyle = fyne.TextStyle{Monospace: true, Bold: true}

		nameLbl := widget.NewLabel(cn.Name)
		nameLbl.Importance = widget.LowImportance

		roleLbl := widget.NewLabel("Role: " + cn.Role)
		roleLbl.Importance = widget.LowImportance

		explainLbl := widget.NewLabel(cn.Explanation)
		explainLbl.Wrapping = fyne.TextWrapWord

		rowBg := canvas.NewRectangle(color.NRGBA{R: 0x10, G: 0x12, B: 0x1e, A: 0xff})
		rowBg.CornerRadius = 4
		inner := container.NewVBox(
			container.NewHBox(charLbl, nameLbl),
			roleLbl,
			explainLbl,
		)
		rows.Add(container.NewStack(rowBg, container.NewPadded(inner)))
		rows.Add(widget.NewLabel(""))
	}

	inner := container.NewVBox(hdr, rows)
	cardBg := canvas.NewRectangle(color.NRGBA{R: 0x18, G: 0x1a, B: 0x28, A: 0xff})
	cardBg.CornerRadius = 8
	return container.NewStack(cardBg, container.NewPadded(inner))
}

// ─── Save/exit instructions ───────────────────────────────────────────────────

func renderSaveExit(nb *model.NanoBlock) fyne.CanvasObject {
	hdr := widget.NewLabel("Step 4 — Save and exit nano:")
	hdr.Importance = widget.LowImportance

	instructions := nb.SaveExplain
	if instructions == "" {
		instructions = "Press Ctrl+O  (hold Control, then press the letter O) — this saves the file.\n" +
			"Press Enter to confirm the filename.\n" +
			"Press Ctrl+X  (hold Control, then press X) — this exits nano."
	}
	bodyLbl := widget.NewLabel(instructions)
	bodyLbl.Wrapping = fyne.TextWrapWord

	inner := container.NewVBox(hdr, bodyLbl)
	cardBg := canvas.NewRectangle(color.NRGBA{R: 0x08, G: 0x18, B: 0x0c, A: 0xff})
	cardBg.CornerRadius = 8
	return container.NewStack(cardBg, container.NewPadded(inner))
}
