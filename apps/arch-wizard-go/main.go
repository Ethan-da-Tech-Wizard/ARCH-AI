package main

import (
	"arch-wizard/internal/ui"
	"os"
	"path/filepath"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/app"
)

func main() {
	a := app.NewWithID("com.arch-wizard.wizard")
	a.Settings().SetTheme(&ui.ArchTheme{})

	w := a.NewWindow("Arch Wizard — Arch Linux Setup Wizard")
	w.Resize(fyne.NewSize(1100, 760))
	w.SetMaster()

	// Resolve assets relative to the executable.
	// Falls back to the directory of the binary or cwd for development.
	lessonsPath := resolveAsset("assets/wizard_lessons.json")
	glossaryPath := resolveAsset("assets/glossary.json")

	wizard := ui.NewWizardApp(w, a, lessonsPath, glossaryPath)
	w.SetContent(wizard.Root())

	w.ShowAndRun()
}

// resolveAsset finds an asset file relative to the running executable.
// During development with `go run .` it falls back to the current directory.
func resolveAsset(rel string) string {
	exe, err := os.Executable()
	if err == nil {
		candidate := filepath.Join(filepath.Dir(exe), rel)
		if _, err := os.Stat(candidate); err == nil {
			return candidate
		}
	}
	// Fallback: current working directory (works with `go run .`)
	return rel
}
