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

// NewProfileScreen returns the 12-card install-type selector with a detail panel.
// Layout: left = scrollable card grid  |  right = detail panel for selected card
func NewProfileScreen(onSelect func(model.InstallCardDef), nextBtn *widget.Button) fyne.CanvasObject {
	cards := model.AllInstallCards()

	var selectedKey string

	// Detail panel labels (updated on card tap)
	detailSymLbl := widget.NewLabel("")
	detailSymLbl.Alignment = fyne.TextAlignCenter

	detailTitleLbl := widget.NewLabel("")
	detailTitleLbl.TextStyle = fyne.TextStyle{Bold: true}
	detailTitleLbl.Wrapping = fyne.TextWrapWord

	detailWhoLbl := widget.NewLabel("")
	detailWhoLbl.Wrapping = fyne.TextWrapWord
	detailWhoLbl.Importance = widget.LowImportance

	detailWhatHeader := widget.NewLabel("What it does:")
	detailWhatHeader.TextStyle = fyne.TextStyle{Bold: true}

	detailWhatLbl := widget.NewLabel("")
	detailWhatLbl.Wrapping = fyne.TextWrapWord

	detailRisksHeader := widget.NewLabel("Risks:")
	detailRisksHeader.TextStyle = fyne.TextStyle{Bold: true}

	detailRisksLbl := widget.NewLabel("")
	detailRisksLbl.Wrapping = fyne.TextWrapWord

	detailSelectBtn := widget.NewButton("Select This  →", nil)
	detailSelectBtn.Importance = widget.HighImportance
	detailSelectBtn.Disable()

	// Shown when nothing is selected
	placeholderLbl := widget.NewLabel("← Select a card to see details")
	placeholderLbl.Importance = widget.LowImportance
	placeholderLbl.Alignment = fyne.TextAlignCenter

	// Detail panel content (shown when a card is selected)
	detailContent := container.NewVBox(
		detailSymLbl,
		widget.NewLabel(""),
		detailTitleLbl,
		detailWhoLbl,
		widget.NewLabel(""),
		detailWhatHeader,
		detailWhatLbl,
		widget.NewLabel(""),
		detailRisksHeader,
		detailRisksLbl,
		widget.NewLabel(""),
		container.NewHBox(layout.NewSpacer(), detailSelectBtn),
	)
	detailContent.Hide()

	detailScroll := container.NewScroll(container.NewPadded(detailContent))
	detailBg := newRect(color.NRGBA{R: 0x13, G: 0x15, B: 0x22, A: 0xff}, 0, 0)

	detailHeader := widget.NewLabel("Install Type Details")
	detailHeader.TextStyle = fyne.TextStyle{Bold: true}
	detailHeader.Importance = widget.LowImportance

	detailDivider := newRect(color.NRGBA{R: 0x28, G: 0x2c, B: 0x3e, A: 0xff}, 0, 1)

	detailPanelInner := container.NewBorder(
		container.NewVBox(container.NewPadded(detailHeader), detailDivider),
		nil, nil, nil,
		container.NewStack(
			container.NewPadded(placeholderLbl),
			detailScroll,
		),
	)
	detailPanel := container.NewStack(detailBg, detailPanelInner)

	// Build card widgets
	cardObjs := make([]fyne.CanvasObject, len(cards))
	cardWidgets := make([]*profileCard, len(cards))

	selectCard := func(def model.InstallCardDef) {
		selectedKey = def.Key
		for _, cw := range cardWidgets {
			cw.setSelected(cw.def.Key == def.Key)
		}
		// Update detail panel
		detailSymLbl.SetText(def.Symbol)
		detailTitleLbl.SetText(def.Title)
		detailWhoLbl.SetText(def.WhoFor)
		detailWhatLbl.SetText(def.What)
		detailRisksLbl.SetText(def.Risks)

		onSelectWrapper := func() {
			onSelect(def)
		}

		detailSelectBtn.OnTapped = onSelectWrapper
		detailSelectBtn.Enable()

		placeholderLbl.Hide()
		detailContent.Show()
		detailScroll.Refresh()

		if nextBtn != nil {
			nextBtn.OnTapped = onSelectWrapper
			nextBtn.Enable()
		}
		_ = selectedKey
	}

	for i, def := range cards {
		d := def
		cw := newProfileCard(d, func() { selectCard(d) })
		cardWidgets[i] = cw
		cardObjs[i] = cw.render()
	}

	// 3-column grid — cards are compact: symbol + title
	grid := container.New(layout.NewGridWrapLayout(fyne.NewSize(200, 100)),
		cardObjs...,
	)

	hintLbl := widget.NewLabel("Not sure? Pick \"I Am Not Sure\" — it will ask you questions to figure it out.")
	hintLbl.Wrapping = fyne.TextWrapWord
	hintLbl.Importance = widget.LowImportance

	footer := container.NewBorder(nil, nil, nil, nil, hintLbl)

	// Left: card grid with scroll  |  Right: detail panel (~300px)
	detailBgFixed := newRect(color.NRGBA{R: 0x13, G: 0x15, B: 0x22, A: 0xff}, 300, 0)
	_ = detailBgFixed // detail panel min-width enforced by its bg

	scrollGrid := container.NewScroll(container.NewPadded(grid))

	splitArea := container.NewBorder(nil, nil, nil, detailPanel, scrollGrid)

	return container.NewBorder(
		nil,
		container.NewPadded(footer),
		nil, nil,
		splitArea,
	)
}

// ─── profileCard ──────────────────────────────────────────────────────────────

type profileCard struct {
	def    model.InstallCardDef
	onTap  func()
	bg     *canvas.Rectangle
	border *canvas.Rectangle
}

func newProfileCard(def model.InstallCardDef, onTap func()) *profileCard {
	return &profileCard{def: def, onTap: onTap}
}

func (c *profileCard) render() fyne.CanvasObject {
	// Symbol emoji — left-aligned to avoid NewCenter squeezing to 1-char wide
	symLbl := widget.NewLabel(c.def.Symbol)
	symLbl.Alignment = fyne.TextAlignLeading

	// Title — bold, wrapping
	titleLbl := widget.NewLabel(c.def.Title)
	titleLbl.TextStyle = fyne.TextStyle{Bold: true}
	titleLbl.Alignment = fyne.TextAlignLeading
	titleLbl.Wrapping = fyne.TextWrapWord

	c.bg = canvas.NewRectangle(color.NRGBA{R: 0x1c, G: 0x1e, B: 0x2c, A: 0xff})
	c.bg.CornerRadius = 8
	c.bg.SetMinSize(fyne.NewSize(200, 100))

	c.border = canvas.NewRectangle(color.Transparent)
	c.border.CornerRadius = 8
	c.border.StrokeColor = color.Transparent
	c.border.StrokeWidth = 2
	c.border.SetMinSize(fyne.NewSize(200, 100))

	// Compact: just symbol row + title — no prose on the card
	inner := container.NewVBox(
		symLbl,
		titleLbl,
	)

	// Invisible button overlay to capture taps
	btn := widget.NewButton("", c.onTap)
	btn.Importance = widget.LowImportance

	return container.NewStack(c.bg, c.border, container.NewPadded(inner), btn)
}

func (c *profileCard) setSelected(sel bool) {
	if sel {
		c.bg.FillColor = color.NRGBA{R: 0x0e, G: 0x22, B: 0x3c, A: 0xff}
		c.border.StrokeColor = color.NRGBA{R: 0x4c, G: 0xaf, B: 0xf0, A: 0xff}
	} else {
		c.bg.FillColor = color.NRGBA{R: 0x1c, G: 0x1e, B: 0x2c, A: 0xff}
		c.border.StrokeColor = color.Transparent
	}
	c.bg.Refresh()
	c.border.Refresh()
}
