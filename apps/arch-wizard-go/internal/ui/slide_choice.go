package ui

import (
	"arch-wizard/internal/model"
	"image/color"
	"strings"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/canvas"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/layout"
	"fyne.io/fyne/v2/widget"
)

// NewChoiceSlide renders selectable option tiles.
func NewChoiceSlide(step model.WizardStep, onChoice func(model.Choice), onReady func()) fyne.CanvasObject {
	var selectedKey string
	tiles := make([]*choiceTile, len(step.Choices))

	selectChoice := func(key string) {
		selectedKey = key
		for _, t := range tiles {
			t.setSelected(t.choice.Key == key)
		}
		onReady()
	}
	_ = selectedKey

	bodyLbl := widget.NewLabel(step.Body)
	bodyLbl.Wrapping = fyne.TextWrapWord

	// 3-column grid of choice tiles — 240×140 gives the description label
	// enough height to wrap 2–3 lines without overflowing into the next row.
	grid := container.New(layout.NewGridWrapLayout(fyne.NewSize(240, 140)))
	for i, ch := range step.Choices {
		c := ch
		t := newChoiceTile(c, func() {
			onChoice(c)
			selectChoice(c.Key)
		})
		tiles[i] = t
		grid.Add(t.render())
	}

	return container.NewVBox(bodyLbl, widget.NewLabel(""), grid)
}

// ─── choiceTile ──────────────────────────────────────────────────────────────

type choiceTile struct {
	choice model.Choice
	onTap  func()
	bg     *canvas.Rectangle
	border *canvas.Rectangle
}

func newChoiceTile(ch model.Choice, onTap func()) *choiceTile {
	return &choiceTile{choice: ch, onTap: onTap}
}

func (t *choiceTile) render() fyne.CanvasObject {
	symLbl := widget.NewLabel(t.choice.Symbol + "  " + t.choice.Label)
	symLbl.TextStyle = fyne.TextStyle{Bold: true}
	symLbl.Wrapping = fyne.TextWrapWord

	descLbl := widget.NewLabel(t.choice.Description)
	descLbl.Wrapping = fyne.TextWrapWord
	descLbl.Importance = widget.LowImportance

	var extras []fyne.CanvasObject
	if t.choice.IsDefault {
		badge := widget.NewLabel("★ Recommended")
		badge.Importance = widget.SuccessImportance
		extras = append(extras, badge)
	}

	t.bg = canvas.NewRectangle(color.NRGBA{R: 0x1c, G: 0x1e, B: 0x2c, A: 0xff})
	t.bg.CornerRadius = 8
	t.bg.SetMinSize(fyne.NewSize(240, 140))

	t.border = canvas.NewRectangle(color.Transparent)
	t.border.CornerRadius = 8
	t.border.StrokeColor = color.Transparent
	t.border.StrokeWidth = 2
	t.border.SetMinSize(fyne.NewSize(240, 140))

	innerItems := []fyne.CanvasObject{symLbl, descLbl}
	innerItems = append(innerItems, extras...)
	inner := container.NewVBox(innerItems...)

	btn := widget.NewButton("", t.onTap)
	btn.Importance = widget.LowImportance

	return container.NewStack(t.bg, t.border, container.NewPadded(inner), btn)
}

func (t *choiceTile) setSelected(sel bool) {
	if sel {
		t.bg.FillColor = color.NRGBA{R: 0x0e, G: 0x22, B: 0x3c, A: 0xff}
		t.border.StrokeColor = color.NRGBA{R: 0x4c, G: 0xaf, B: 0xf0, A: 0xff}
	} else {
		t.bg.FillColor = color.NRGBA{R: 0x1c, G: 0x1e, B: 0x2c, A: 0xff}
		t.border.StrokeColor = color.Transparent
	}
	t.bg.Refresh()
	t.border.Refresh()
}

// ─── NewInputSlide ────────────────────────────────────────────────────────────

func NewInputSlide(
	step model.WizardStep,
	dm model.DeviceMap,
	onUpdate func(key, value string, unknown bool),
	onReady func(allFilled bool),
) fyne.CanvasObject {

	bodyLbl := widget.NewLabel(step.Body)
	bodyLbl.Wrapping = fyne.TextWrapWord

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

	rows := container.NewVBox()
	for _, field := range step.InputFields {
		f := field

		lbl := widget.NewLabel(f.Label)
		lbl.TextStyle = fyne.TextStyle{Bold: true}
		lbl.Wrapping = fyne.TextWrapWord

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

		exampleLbl := widget.NewLabel("e.g. " + f.Example)
		exampleLbl.Importance = widget.LowImportance
		exampleLbl.Wrapping = fyne.TextWrapWord

		hintLbl := widget.NewLabel(f.Hint)
		hintLbl.Wrapping = fyne.TextWrapWord
		hintLbl.Importance = widget.LowImportance

		rowItems := []fyne.CanvasObject{lbl, entry, exampleLbl, hintLbl}

		if f.AllowUnknown {
			unknownBtn := widget.NewButton("I don't know yet", func() {
				entry.SetText("")
				filled[f.DeviceMapKey] = true
				onUpdate(f.DeviceMapKey, "", true)
				checkReady()
			})
			unknownBtn.Importance = widget.LowImportance
			rowItems = append(rowItems, container.NewHBox(layout.NewSpacer(), unknownBtn))
		}

		sep := widget.NewSeparator()

		for _, item := range rowItems {
			rows.Add(item)
		}
		rows.Add(widget.NewLabel(""))
		rows.Add(sep)
		rows.Add(widget.NewLabel(""))
	}

	return container.NewVBox(bodyLbl, widget.NewLabel(""), rows)
}
