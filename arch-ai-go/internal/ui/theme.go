package ui

import (
	"image/color"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/theme"
)

// ArchTheme is the custom dark theme for the ARCH-AI wizard.
type ArchTheme struct{}

var _ fyne.Theme = (*ArchTheme)(nil)

func (t *ArchTheme) Color(name fyne.ThemeColorName, variant fyne.ThemeVariant) color.Color {
	switch name {
	case theme.ColorNameBackground:
		return color.NRGBA{R: 0x0f, G: 0x10, B: 0x17, A: 0xff} // near-black
	case theme.ColorNameForeground:
		return color.NRGBA{R: 0xe8, G: 0xe8, B: 0xf0, A: 0xff} // soft white
	case theme.ColorNamePrimary:
		return color.NRGBA{R: 0x4c, G: 0xaf, B: 0xf0, A: 0xff} // arch blue
	case theme.ColorNameButton:
		return color.NRGBA{R: 0x1e, G: 0x20, B: 0x2e, A: 0xff}
	case theme.ColorNameDisabledButton:
		return color.NRGBA{R: 0x28, G: 0x2a, B: 0x38, A: 0xff}
	case theme.ColorNameDisabled:
		return color.NRGBA{R: 0x55, G: 0x57, B: 0x6a, A: 0xff}
	case theme.ColorNameInputBackground:
		return color.NRGBA{R: 0x16, G: 0x18, B: 0x24, A: 0xff}
	case theme.ColorNamePlaceHolder:
		return color.NRGBA{R: 0x66, G: 0x68, B: 0x80, A: 0xff}
	case theme.ColorNameScrollBar:
		return color.NRGBA{R: 0x4c, G: 0xaf, B: 0xf0, A: 0x66}
	case theme.ColorNameShadow:
		return color.NRGBA{R: 0x00, G: 0x00, B: 0x00, A: 0xaa}
	case theme.ColorNameSelection:
		return color.NRGBA{R: 0x4c, G: 0xaf, B: 0xf0, A: 0x44}
	case theme.ColorNameHover:
		return color.NRGBA{R: 0x4c, G: 0xaf, B: 0xf0, A: 0x22}
	case theme.ColorNameFocus:
		return color.NRGBA{R: 0x4c, G: 0xaf, B: 0xf0, A: 0xff}
	case theme.ColorNameError:
		return color.NRGBA{R: 0xe5, G: 0x53, B: 0x4b, A: 0xff}
	case theme.ColorNameWarning:
		return color.NRGBA{R: 0xf0, G: 0xa3, B: 0x30, A: 0xff}
	case theme.ColorNameSuccess:
		return color.NRGBA{R: 0x4c, G: 0xd9, B: 0x7a, A: 0xff}
	case theme.ColorNameHeaderBackground:
		return color.NRGBA{R: 0x13, G: 0x15, B: 0x20, A: 0xff}
	case theme.ColorNameMenuBackground:
		return color.NRGBA{R: 0x1a, G: 0x1c, B: 0x28, A: 0xff}
	case theme.ColorNameOverlayBackground:
		return color.NRGBA{R: 0x0a, G: 0x0b, B: 0x11, A: 0xee}
	case theme.ColorNameSeparator:
		return color.NRGBA{R: 0x2a, G: 0x2c, B: 0x3a, A: 0xff}
	}
	return theme.DefaultTheme().Color(name, variant)
}

func (t *ArchTheme) Font(style fyne.TextStyle) fyne.Resource {
	return theme.DefaultTheme().Font(style)
}

func (t *ArchTheme) Icon(name fyne.ThemeIconName) fyne.Resource {
	return theme.DefaultTheme().Icon(name)
}

func (t *ArchTheme) Size(name fyne.ThemeSizeName) float32 {
	switch name {
	case theme.SizeNameText:
		return 14
	case theme.SizeNameSubHeadingText:
		return 16
	case theme.SizeNameHeadingText:
		return 22
	case theme.SizeNameCaptionText:
		return 12
	case theme.SizeNamePadding:
		return 8
	case theme.SizeNameInnerPadding:
		return 10
	case theme.SizeNameScrollBar:
		return 4
	case theme.SizeNameScrollBarSmall:
		return 2
	}
	return theme.DefaultTheme().Size(name)
}

// Semantic color helpers used by UI components
func ColorDanger() color.Color  { return color.NRGBA{R: 0xe5, G: 0x53, B: 0x4b, A: 0xff} }
func ColorWarning() color.Color { return color.NRGBA{R: 0xf0, G: 0xa3, B: 0x30, A: 0xff} }
func ColorSuccess() color.Color { return color.NRGBA{R: 0x4c, G: 0xd9, B: 0x7a, A: 0xff} }
func ColorAccent() color.Color  { return color.NRGBA{R: 0x4c, G: 0xaf, B: 0xf0, A: 0xff} }
func ColorCard() color.Color    { return color.NRGBA{R: 0x1a, G: 0x1c, B: 0x2a, A: 0xff} }
func ColorMono() color.Color    { return color.NRGBA{R: 0x22, G: 0xf5, B: 0xa0, A: 0xff} } // monospace green for commands
func ColorSurface() color.Color { return color.NRGBA{R: 0x16, G: 0x18, B: 0x24, A: 0xff} }
