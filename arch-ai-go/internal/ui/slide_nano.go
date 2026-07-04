package ui

import (
	"arch-ai-go/internal/model"
	"fmt"
	"image/color"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/canvas"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/widget"
)

// NewNanoSlide renders a "nano" slide — a full file-edit walkthrough.
// For the NanoBlock it shows:
//   - The open command (nano /path/to/file) with token annotation
//   - Character-by-character path explanation
//   - Full file contents in a monospace box
//   - Per-line explanation table
//   - CharNotes table (/, \, ., ", -, =, #, space — every one present)
//   - Save/exit instructions (Ctrl+O, Enter, Ctrl+X)
func NewNanoSlide(step model.WizardStep) fyne.CanvasObject {
	title := canvas.NewText(step.Title, ColorAccent())
	title.TextSize = 20
	title.TextStyle = fyne.TextStyle{Bold: true}

	body := widget.NewRichTextFromMarkdown(step.Body)
	body.Wrapping = fyne.TextWrapWord

	if step.NanoEdit == nil {
		warn := canvas.NewText("(No nano edit block on this slide)", ColorWarning())
		return container.NewPadded(container.NewVBox(title, warn))
	}

	nb := step.NanoEdit

	sections := []fyne.CanvasObject{
		title,
		body,
		widget.NewLabel(""),
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
	}

	content := container.NewVBox(sections...)
	return container.NewPadded(container.NewVScroll(content))
}

// ─── Open command ─────────────────────────────────────────────────────────────

func renderNanoOpenCommand(nb *model.NanoBlock) fyne.CanvasObject {
	hdr := canvas.NewText("Step 1 — Open the file in nano:", color.NRGBA{R: 0xaa, G: 0xbb, B: 0xcc, A: 0xff})
	hdr.TextSize = 13

	cmdBg := canvas.NewRectangle(ColorSurface())
	cmdBg.CornerRadius = 6
	cmdBg.SetMinSize(fyne.NewSize(600, 44))
	cmdLbl := canvas.NewText(nb.OpenCommand, ColorMono())
	cmdLbl.TextSize = 14
	cmdLbl.TextStyle = fyne.TextStyle{Monospace: true}
	cmdBox := container.NewStack(cmdBg, container.NewPadded(container.NewCenter(cmdLbl)))

	tokenRows := container.NewVBox()
	for _, tok := range nb.OpenTokens {
		tokenRows.Add(renderTokenRow(tok))
	}

	cardBg := canvas.NewRectangle(ColorCard())
	cardBg.CornerRadius = 8
	inner := container.NewVBox(hdr, cmdBox, widget.NewLabel(""), tokenRows)
	return container.NewStack(cardBg, container.NewPadded(inner))
}

// ─── File path explanation ────────────────────────────────────────────────────

func renderFilePathExplain(nb *model.NanoBlock) fyne.CanvasObject {
	if nb.FilePathExplain == "" {
		return widget.NewLabel("")
	}
	hdr := canvas.NewText("Path explanation: "+nb.FilePath, color.NRGBA{R: 0xaa, G: 0xbb, B: 0xcc, A: 0xff})
	hdr.TextSize = 13

	explain := widget.NewLabel(nb.FilePathExplain)
	explain.Wrapping = fyne.TextWrapWord

	cardBg := canvas.NewRectangle(ColorCard())
	cardBg.CornerRadius = 8
	return container.NewStack(cardBg, container.NewPadded(container.NewVBox(hdr, explain)))
}

// ─── Full file contents ───────────────────────────────────────────────────────

func renderFullContent(nb *model.NanoBlock) fyne.CanvasObject {
	hdr := canvas.NewText("Step 2 — Type exactly this content into the file:", color.NRGBA{R: 0xaa, G: 0xbb, B: 0xcc, A: 0xff})
	hdr.TextSize = 13

	contentBg := canvas.NewRectangle(ColorSurface())
	contentBg.CornerRadius = 6
	contentLbl := widget.NewLabel(nb.FullContent)
	contentLbl.TextStyle = fyne.TextStyle{Monospace: true}
	contentLbl.Wrapping = fyne.TextWrapOff
	contentBox := container.NewStack(contentBg, container.NewPadded(contentLbl))

	cardBg := canvas.NewRectangle(ColorCard())
	cardBg.CornerRadius = 8
	return container.NewStack(cardBg, container.NewPadded(container.NewVBox(hdr, contentBox)))
}

// ─── Per-line explanation table ───────────────────────────────────────────────

func renderNanoLineTable(nb *model.NanoBlock) fyne.CanvasObject {
	if len(nb.Lines) == 0 {
		return widget.NewLabel("")
	}
	hdr := canvas.NewText("Step 3 — Line-by-line explanation:", color.NRGBA{R: 0xaa, G: 0xbb, B: 0xcc, A: 0xff})
	hdr.TextSize = 13

	rows := container.NewVBox()
	for _, line := range nb.Lines {
		numLbl := canvas.NewText(fmt.Sprintf("Line %d:", line.LineNumber), ColorAccent())
		numLbl.TextSize = 12
		numLbl.TextStyle = fyne.TextStyle{Bold: true}

		contentLbl := canvas.NewText(line.Content, ColorMono())
		contentLbl.TextSize = 13
		contentLbl.TextStyle = fyne.TextStyle{Monospace: true}

		explain := widget.NewLabel(line.Explanation)
		explain.Wrapping = fyne.TextWrapWord

		rowBg := canvas.NewRectangle(color.NRGBA{R: 0x13, G: 0x15, B: 0x20, A: 0xff})
		rowBg.CornerRadius = 4
		inner := container.NewVBox(
			container.NewHBox(numLbl, contentLbl),
			explain,
		)
		rows.Add(container.NewStack(rowBg, container.NewPadded(inner)))
	}

	cardBg := canvas.NewRectangle(ColorCard())
	cardBg.CornerRadius = 8
	return container.NewStack(cardBg, container.NewPadded(container.NewVBox(hdr, rows)))
}

// ─── CharNotes table ──────────────────────────────────────────────────────────

// renderCharNotes renders the character-by-character explanation table.
// Every special character that appears in the file is explained here.
func renderCharNotes(nb *model.NanoBlock) fyne.CanvasObject {
	// Always ensure the 8 canonical characters are covered.
	canonical := []model.CharNote{
		{Char: "/", Name: "forward slash", Role: "path separator", Explanation: "In Linux, every file path starts with / (the root directory) and uses / to separate directory names. For example, /etc/locale.gen means: start at root (/), then go into the etc directory, then find locale.gen inside it."},
		{Char: "\\", Name: "backslash", Role: "escape character", Explanation: "The backslash is used to escape special characters or to continue a command on the next line. In file contents it may also appear in Windows-style paths or escape sequences. On Linux, forward slash (/) is the path separator — backslash has no path meaning."},
		{Char: ".", Name: "period / dot", Role: "file extension separator or hidden-file marker", Explanation: "A dot separates a file name from its extension (e.g. locale.gen — 'locale' is the name, 'gen' is the extension). A file whose name begins with a dot (e.g. .bashrc) is a hidden file in Linux and will not appear in a normal ls listing."},
		{Char: "\"", Name: "double quote", Role: "string delimiter", Explanation: "Double quotes group words into a single argument. Everything inside double quotes is treated as one value, even if it contains spaces. For example, connect \"My WiFi Network\" passes the whole name including the space as one argument."},
		{Char: "-", Name: "hyphen / dash", Role: "flag prefix or separator", Explanation: "A single hyphen before a letter introduces a short flag (e.g. -S, -y, -u). Two hyphens introduce a long flag (e.g. --target=x86_64-efi). Inside a value like a UUID or filename it is just a separator with no special meaning."},
		{Char: "=", Name: "equals sign", Role: "assignment operator", Explanation: "In configuration files, = assigns a value to a setting. For example LANG=en_US.UTF-8 sets the LANG variable to en_US.UTF-8. In some commands it also joins a flag to its value, e.g. --target=x86_64-efi."},
		{Char: "#", Name: "hash / pound sign", Role: "comment marker", Explanation: "Any text after # on a line is a comment and is ignored by the system. In configuration files like locale.gen, a line that starts with # is commented out and has no effect. To activate a setting, remove the # at the start of the line."},
		{Char: " ", Name: "space", Role: "token separator", Explanation: "In shell commands, a single space separates each word or argument. The shell uses spaces to know where one token ends and the next begins. In file contents, spaces inside values are usually literal and significant — e.g. 'en_US.UTF-8 UTF-8' has a space that separates the locale name from the character set."},
	}

	// Merge canonical notes with any custom ones from the NanoBlock.
	charMap := make(map[string]model.CharNote, len(canonical))
	for _, cn := range canonical {
		charMap[cn.Char] = cn
	}
	for _, cn := range nb.CharNotes {
		// Custom notes override canonical ones for the same character.
		charMap[cn.Char] = cn
	}

	// Only show characters that actually appear in the file content.
	var notes []model.CharNote
	for _, cn := range canonical {
		if containsChar(nb.FullContent+nb.OpenCommand, cn.Char) {
			if custom, ok := charMap[cn.Char]; ok {
				notes = append(notes, custom)
			}
		}
	}
	// Also add any extra custom characters not in the canonical set.
	for _, cn := range nb.CharNotes {
		if _, exists := charMap[cn.Char]; !exists {
			notes = append(notes, cn)
		}
	}

	if len(notes) == 0 {
		return widget.NewLabel("")
	}

	hdr := canvas.NewText("Character reference for this file:", color.NRGBA{R: 0xaa, G: 0xbb, B: 0xcc, A: 0xff})
	hdr.TextSize = 13

	rows := container.NewVBox()
	for _, cn := range notes {
		charLbl := canvas.NewText(`"`+cn.Char+`"`, ColorMono())
		charLbl.TextSize = 16
		charLbl.TextStyle = fyne.TextStyle{Monospace: true, Bold: true}

		nameLbl := canvas.NewText(cn.Name, ColorAccent())
		nameLbl.TextSize = 12

		roleLbl := canvas.NewText("Role: "+cn.Role, color.NRGBA{R: 0x66, G: 0x88, B: 0xaa, A: 0xff})
		roleLbl.TextSize = 11

		explain := widget.NewLabel(cn.Explanation)
		explain.Wrapping = fyne.TextWrapWord

		rowBg := canvas.NewRectangle(color.NRGBA{R: 0x13, G: 0x15, B: 0x20, A: 0xff})
		rowBg.CornerRadius = 4
		inner := container.NewVBox(
			container.NewHBox(charLbl, nameLbl),
			roleLbl,
			explain,
		)
		rows.Add(container.NewStack(rowBg, container.NewPadded(inner)))
	}

	cardBg := canvas.NewRectangle(ColorCard())
	cardBg.CornerRadius = 8
	return container.NewStack(cardBg, container.NewPadded(container.NewVBox(hdr, rows)))
}

// ─── Save / exit instructions ─────────────────────────────────────────────────

func renderSaveExit(nb *model.NanoBlock) fyne.CanvasObject {
	hdr := canvas.NewText("Step 4 — Save and exit nano:", color.NRGBA{R: 0xaa, G: 0xbb, B: 0xcc, A: 0xff})
	hdr.TextSize = 13

	defaultInstructions := "Press Ctrl+O  (hold Control, then press the letter O) — this means \"Write Out\" (save the file).\n" +
		"Press Enter to confirm the filename without changing it.\n" +
		"Press Ctrl+X  (hold Control, then press the letter X) — this exits nano and returns you to the shell prompt.\n\n" +
		"Ctrl = the Control key, usually bottom-left on your keyboard.\n" +
		"O = the letter O, not the number 0.\n" +
		"X = the letter X."

	instructions := nb.SaveExplain
	if instructions == "" {
		instructions = defaultInstructions
	}

	body := widget.NewLabel(instructions)
	body.Wrapping = fyne.TextWrapWord

	cardBg := canvas.NewRectangle(color.NRGBA{R: 0x0a, G: 0x15, B: 0x0f, A: 0xff})
	cardBg.CornerRadius = 8
	return container.NewStack(cardBg, container.NewPadded(container.NewVBox(hdr, body)))
}

// containsChar returns true when s contains the character (or substring) c.
func containsChar(s, c string) bool {
	return len(c) > 0 && len(s) > 0 && (c == " " || contains(s, c))
}

func contains(s, substr string) bool {
	return len(s) >= len(substr) && (s == substr || len(substr) == 0 ||
		func() bool {
			for i := 0; i <= len(s)-len(substr); i++ {
				if s[i:i+len(substr)] == substr {
					return true
				}
			}
			return false
		}())
}
