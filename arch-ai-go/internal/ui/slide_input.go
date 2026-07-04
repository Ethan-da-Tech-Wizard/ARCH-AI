package ui

import (
	"arch-ai-go/internal/model"
	"strings"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/canvas"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/layout"
	"fyne.io/fyne/v2/widget"
)

// NewInputSlide renders an "input" slide — labelled text fields.
// onUpdate is called whenever a field value changes so the wizard can
// update the DeviceMap and re-evaluate whether Next should be enabled.
func NewInputSlide(
	step model.WizardStep,
	dm model.DeviceMap,
	onUpdate func(key, value string, unknown bool),
	onReady func(allFilled bool),
) fyne.CanvasObject {

	title := canvas.NewText(step.Title, ColorAccent())
	title.TextSize = 20
	title.TextStyle = fyne.TextStyle{Bold: true}

	body := widget.NewRichTextFromMarkdown(step.Body)
	body.Wrapping = fyne.TextWrapWord

	fieldRows := container.NewVBox()

	// Track per-field state to evaluate readiness.
	filled := make(map[string]bool, len(step.InputFields))
	for _, f := range step.InputFields {
		if !f.Required || dm.IsKnown(f.DeviceMapKey) {
			filled[f.DeviceMapKey] = true
		}
	}

	checkReady := func() {
		for _, f := range step.InputFields {
			if f.Required && !filled[f.DeviceMapKey] {
				onReady(false)
				return
			}
		}
		onReady(true)
	}

	for _, field := range step.InputFields {
		f := field // capture

		// Label
		lbl := canvas.NewText(f.Label, ColorAccent())
		lbl.TextSize = 14
		lbl.TextStyle = fyne.TextStyle{Bold: true}

		// Text entry
		entry := widget.NewEntry()
		entry.SetPlaceHolder(f.Placeholder)
		if dm.IsKnown(f.DeviceMapKey) {
			entry.SetText(dm.Get(f.DeviceMapKey))
			filled[f.DeviceMapKey] = true
		}
		entry.OnChanged = func(val string) {
			val = strings.TrimSpace(val)
			if val != "" {
				filled[f.DeviceMapKey] = true
				onUpdate(f.DeviceMapKey, val, false)
			} else {
				filled[f.DeviceMapKey] = !f.Required
				onUpdate(f.DeviceMapKey, "", true)
			}
			checkReady()
		}

		// Example hint
		exampleLabel := canvas.NewText("Example: "+f.Example, ColorAccent())
		exampleLabel.TextSize = 11

		// Hint text
		hint := widget.NewLabel(f.Hint)
		hint.Wrapping = fyne.TextWrapWord

		var unknownBtn *widget.Button
		if f.AllowUnknown {
			unknownBtn = widget.NewButton("I don't know yet", func() {
				entry.SetText("")
				filled[f.DeviceMapKey] = true // unknown is OK
				onUpdate(f.DeviceMapKey, "", true)
				checkReady()
			})
			unknownBtn.Importance = widget.LowImportance
		}

		row := container.NewVBox(
			lbl,
			entry,
			exampleLabel,
			hint,
		)
		if unknownBtn != nil {
			row.Add(container.NewHBox(layout.NewSpacer(), unknownBtn))
		}

		sep := canvas.NewRectangle(ColorSurface())
		sep.SetMinSize(fyne.NewSize(600, 1))

		fieldRows.Add(row)
		fieldRows.Add(sep)
		fieldRows.Add(widget.NewLabel(""))
	}

	content := container.NewVBox(
		title,
		body,
		widget.NewLabel(""),
		fieldRows,
	)
	return container.NewPadded(container.NewVScroll(content))
}
