package ui

import (
	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/canvas"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/widget"
	"image/color"
)

// NewSplashScreen returns the temporary Chunk-1 splash that will be replaced
// by the full wizard UI in Chunk 13.
func NewSplashScreen(w fyne.Window, a fyne.App) fyne.CanvasObject {
	bg := canvas.NewRectangle(color.NRGBA{R: 0x0f, G: 0x10, B: 0x17, A: 0xff})
	bg.SetMinSize(fyne.NewSize(1100, 760))

	logo := canvas.NewText("⚙  ARCH-AI", ColorAccent())
	logo.TextSize = 42
	logo.TextStyle = fyne.TextStyle{Bold: true}
	logo.Alignment = fyne.TextAlignCenter

	sub := canvas.NewText("Arch Linux Setup Wizard", ColorAccent())
	sub.TextSize = 18
	sub.Alignment = fyne.TextAlignCenter

	divider := canvas.NewRectangle(ColorAccent())
	divider.SetMinSize(fyne.NewSize(320, 2))

	body := widget.NewRichTextFromMarkdown(
		"**Chunk 1 complete.** \n\nScaffold · dark theme · Go module\n\n" +
			"Building the rest of the wizard... stand by.",
	)
	body.Wrapping = fyne.TextWrapWord

	status := canvas.NewText("Version: 0.1.0-dev  ·  Go + Fyne v2", ColorSurface())
	status.TextSize = 11
	status.Alignment = fyne.TextAlignCenter

	center := container.NewVBox(
		widget.NewLabel(""),
		widget.NewLabel(""),
		logo,
		sub,
		container.NewCenter(divider),
		widget.NewLabel(""),
		container.NewCenter(container.NewHBox(body)),
		widget.NewLabel(""),
		status,
	)

	return container.NewStack(bg, container.NewCenter(center))
}
