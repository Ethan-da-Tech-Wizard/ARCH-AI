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

// NewProfileScreen returns the 12-card install-type selection screen.
// onSelect is called with the chosen InstallCardDef when the user confirms.
func NewProfileScreen(onSelect func(model.InstallCardDef)) fyne.CanvasObject {
	cards := model.AllInstallCards()

	var selectedKey string
	var beginBtn *widget.Button

	// cardWidgets holds the rendered card objects so we can update selection state.
	cardWidgets := make([]*profileCard, len(cards))

	selectCard := func(key string) {
		selectedKey = key
		for _, cw := range cardWidgets {
			cw.setSelected(cw.def.Key == key)
		}
		if beginBtn != nil {
			beginBtn.Enable()
		}
	}

	// Build the card grid.
	grid := container.New(layout.NewGridWrapLayout(fyne.NewSize(320, 240)))
	for i, def := range cards {
		d := def // capture
		cw := newProfileCard(d, func() { selectCard(d.Key) })
		cardWidgets[i] = cw
		grid.Add(cw.render())
	}

	scroll := container.NewVScroll(grid)
	scroll.SetMinSize(fyne.NewSize(700, 480))

	// Header
	header := canvas.NewText("Choose Your Install Type", ColorAccent())
	header.TextSize = 26
	header.TextStyle = fyne.TextStyle{Bold: true}
	header.Alignment = fyne.TextAlignCenter

	sub := widget.NewRichTextFromMarkdown(
		"Select the option that best describes your situation. Each card explains exactly what will happen, who it is for, and what risks are involved. If you are unsure, choose **I Am Not Sure** at the bottom right.",
	)
	sub.Wrapping = fyne.TextWrapWord

	beginBtn = widget.NewButton("Begin Setup →", func() {
		for _, def := range cards {
			if def.Key == selectedKey {
				onSelect(def)
				return
			}
		}
	})
	beginBtn.Importance = widget.HighImportance
	beginBtn.Disable()

	footer := container.NewHBox(layout.NewSpacer(), beginBtn)

	divider := canvas.NewRectangle(ColorAccent())
	divider.SetMinSize(fyne.NewSize(600, 1))

	content := container.NewVBox(
		widget.NewLabel(""),
		container.NewCenter(header),
		container.NewCenter(sub),
		container.NewCenter(divider),
		widget.NewLabel(""),
		scroll,
		widget.NewLabel(""),
		footer,
	)

	bg := canvas.NewRectangle(color.NRGBA{R: 0x0f, G: 0x10, B: 0x17, A: 0xff})
	return container.NewStack(bg, container.NewPadded(content))
}

// ─── profileCard ──────────────────────────────────────────────────────────────

type profileCard struct {
	def      model.InstallCardDef
	onTap    func()
	selected bool

	bg       *canvas.Rectangle
	border   *canvas.Rectangle
	rendered fyne.CanvasObject
}

func newProfileCard(def model.InstallCardDef, onTap func()) *profileCard {
	return &profileCard{def: def, onTap: onTap}
}

func (c *profileCard) render() fyne.CanvasObject {
	// Symbol
	sym := canvas.NewText(c.def.Symbol, color.White)
	sym.TextSize = 36
	sym.Alignment = fyne.TextAlignCenter

	// Title
	title := canvas.NewText(c.def.Title, ColorAccent())
	title.TextSize = 15
	title.TextStyle = fyne.TextStyle{Bold: true}
	title.Alignment = fyne.TextAlignCenter

	// Who-for blurb
	whoFor := widget.NewLabel(c.def.WhoFor)
	whoFor.Wrapping = fyne.TextWrapWord
	whoFor.Alignment = fyne.TextAlignCenter

	// Risk note
	riskText := canvas.NewText(c.def.Risks, ColorWarning())
	riskText.TextSize = 11
	riskText.Alignment = fyne.TextAlignCenter

	inner := container.NewVBox(
		container.NewCenter(sym),
		container.NewCenter(title),
		container.NewCenter(whoFor),
		container.NewCenter(riskText),
	)

	c.bg = canvas.NewRectangle(ColorCard())
	c.bg.CornerRadius = 10
	c.bg.SetMinSize(fyne.NewSize(316, 236))

	c.border = canvas.NewRectangle(color.Transparent)
	c.border.CornerRadius = 10
	c.border.SetMinSize(fyne.NewSize(316, 236))
	c.border.StrokeColor = color.Transparent
	c.border.StrokeWidth = 2

	card := container.NewStack(c.bg, c.border, container.NewPadded(inner))

	// Wrap in a tappable button-like widget.
	btn := widget.NewButton("", func() {
		c.onTap()
	})
	btn.Importance = widget.LowImportance

	// Overlay the button on top of the card visual.
	c.rendered = container.NewStack(card, btn)
	return c.rendered
}

func (c *profileCard) setSelected(sel bool) {
	c.selected = sel
	if sel {
		c.bg.FillColor = color.NRGBA{R: 0x1a, G: 0x2a, B: 0x3a, A: 0xff}
		c.border.StrokeColor = ColorAccent()
	} else {
		c.bg.FillColor = ColorCard()
		c.border.StrokeColor = color.Transparent
	}
	c.bg.Refresh()
	c.border.Refresh()
}
