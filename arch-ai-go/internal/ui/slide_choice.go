package ui

import (
	"arch-ai-go/internal/model"
	"image/color"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/canvas"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/layout"
	"fyne.io/fyne/v2/widget"
)

// NewChoiceSlide renders a "choice" slide — a set of option tiles.
// onChoice is called with the chosen Choice when the user taps a tile.
// After choosing, the slide enables Next automatically via onReady().
func NewChoiceSlide(step model.WizardStep, onChoice func(model.Choice), onReady func()) fyne.CanvasObject {
	title := canvas.NewText(step.Title, ColorAccent())
	title.TextSize = 20
	title.TextStyle = fyne.TextStyle{Bold: true}

	body := widget.NewRichTextFromMarkdown(step.Body)
	body.Wrapping = fyne.TextWrapWord

	var selectedKey string
	tiles := make([]*choiceTile, len(step.Choices))

	selectChoice := func(key string) {
		selectedKey = key
		for _, t := range tiles {
			t.setSelected(t.choice.Key == key)
		}
		onReady()
	}

	choiceGrid := container.New(layout.NewGridWrapLayout(fyne.NewSize(280, 140)))
	for i, ch := range step.Choices {
		c := ch
		t := newChoiceTile(c, func() {
			onChoice(c)
			selectChoice(c.Key)
		})
		tiles[i] = t
		choiceGrid.Add(t.render())
	}

	_ = selectedKey // used via closure

	content := container.NewVBox(
		title,
		body,
		widget.NewLabel(""),
		choiceGrid,
	)
	return container.NewPadded(content)
}

// ─── choiceTile ──────────────────────────────────────────────────────────────

type choiceTile struct {
	choice   model.Choice
	onTap    func()
	bg       *canvas.Rectangle
	border   *canvas.Rectangle
}

func newChoiceTile(ch model.Choice, onTap func()) *choiceTile {
	return &choiceTile{choice: ch, onTap: onTap}
}

func (t *choiceTile) render() fyne.CanvasObject {
	sym := canvas.NewText(t.choice.Symbol, color.White)
	sym.TextSize = 28
	sym.Alignment = fyne.TextAlignCenter

	label := canvas.NewText(t.choice.Label, ColorAccent())
	label.TextSize = 14
	label.TextStyle = fyne.TextStyle{Bold: true}
	label.Alignment = fyne.TextAlignCenter

	desc := widget.NewLabel(t.choice.Description)
	desc.Wrapping = fyne.TextWrapWord
	desc.Alignment = fyne.TextAlignCenter

	var defaultBadge fyne.CanvasObject
	if t.choice.IsDefault {
		badge := canvas.NewText("★ Recommended", ColorSuccess())
		badge.TextSize = 11
		badge.Alignment = fyne.TextAlignCenter
		defaultBadge = container.NewCenter(badge)
	} else {
		defaultBadge = widget.NewLabel("")
	}

	inner := container.NewVBox(
		container.NewCenter(sym),
		container.NewCenter(label),
		desc,
		defaultBadge,
	)

	t.bg = canvas.NewRectangle(ColorCard())
	t.bg.CornerRadius = 8
	t.bg.SetMinSize(fyne.NewSize(276, 136))

	t.border = canvas.NewRectangle(color.Transparent)
	t.border.CornerRadius = 8
	t.border.StrokeColor = color.Transparent
	t.border.StrokeWidth = 2

	btn := widget.NewButton("", t.onTap)
	btn.Importance = widget.LowImportance

	return container.NewStack(t.bg, t.border, container.NewPadded(inner), btn)
}

func (t *choiceTile) setSelected(sel bool) {
	if sel {
		t.bg.FillColor = color.NRGBA{R: 0x10, G: 0x25, B: 0x35, A: 0xff}
		t.border.StrokeColor = ColorAccent()
	} else {
		t.bg.FillColor = ColorCard()
		t.border.StrokeColor = color.Transparent
	}
	t.bg.Refresh()
	t.border.Refresh()
}
