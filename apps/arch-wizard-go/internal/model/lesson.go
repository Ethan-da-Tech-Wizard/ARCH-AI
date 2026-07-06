package model

// ─── Wizard Step ─────────────────────────────────────────────────────────────

// WizardStep is a single slide in the wizard. The SlideType field determines
// which renderer is used to display it.
type WizardStep struct {
	// ID is a unique string key for this step (used in progress saving).
	ID string `json:"id"`

	// Title is the slide heading shown in the progress bar area.
	Title string `json:"title"`

	// SlideType controls which renderer handles this step.
	// Valid values: "info", "command", "nano", "choice", "input", "safety"
	SlideType string `json:"slideType"`

	// Tags are the profile values that must match for this step to be included.
	// An empty Tags slice means the step is always included.
	// A step is included if ANY of its tags matches ANY profile tag.
	Tags []string `json:"tags,omitempty"`

	// Body is the main explanatory markdown text for "info" and "safety" slides.
	Body string `json:"body,omitempty"`

	// Commands are the terminal command blocks for "command" slides.
	Commands []CommandBlock `json:"commands,omitempty"`

	// NanoEdit is the file-edit spec for "nano" slides.
	NanoEdit *NanoBlock `json:"nanoEdit,omitempty"`

	// Choices are the selectable options for "choice" slides.
	Choices []Choice `json:"choices,omitempty"`

	// InputFields are the text input specs for "input" slides.
	InputFields []InputField `json:"inputFields,omitempty"`

	// SafetyGate is the blocking safety checkpoint for "safety" slides.
	SafetyGate *SafetyGate `json:"safetyGate,omitempty"`
}

// ─── Command Block ────────────────────────────────────────────────────────────

// CommandBlock represents a single terminal command with full annotation.
type CommandBlock struct {
	// Raw is the complete command exactly as the user will type it.
	// e.g. "sudo pacman -Syu"
	Raw string `json:"raw"`

	// Tokens is the ordered list of annotated tokens that make up the command.
	Tokens []CommandToken `json:"tokens"`

	// WhySpaces explains why spaces are used to separate tokens in this command.
	WhySpaces string `json:"whySpaces"`

	// ExpectedOutput describes what success looks like in the terminal.
	ExpectedOutput string `json:"expectedOutput"`

	// FailureOutput describes what common failure output looks like.
	FailureOutput string `json:"failureOutput,omitempty"`

	// DangerLevel indicates the risk level of this command.
	// Values: "safe", "config", "install", "destructive"
	DangerLevel string `json:"dangerLevel"`

	// Note is an optional freeform note shown below the command box.
	Note string `json:"note,omitempty"`
}

// CommandToken is one annotated word, flag, path, or symbol within a command.
type CommandToken struct {
	// Text is the exact text of this token as it appears in the command.
	// e.g. "sudo", "pacman", "-Syu", "/dev/sda", "{{disk}}"
	Text string `json:"text"`

	// Role describes the grammatical/functional category of this token.
	// e.g. "privilege-escalator", "package-manager", "flag", "path",
	//      "placeholder", "operator", "argument", "separator"
	Role string `json:"role"`

	// Explanation is the full beginner-level explanation of what this token
	// means, what it does, and what changes if it is wrong or missing.
	Explanation string `json:"explanation"`

	// IsPlaceholder is true when this token must be replaced with a real value
	// from the DeviceMap before the command is safe to copy.
	IsPlaceholder bool `json:"isPlaceholder,omitempty"`

	// DeviceMapKey links this placeholder token to its DeviceMap entry.
	// Only set when IsPlaceholder is true.
	DeviceMapKey string `json:"deviceMapKey,omitempty"`
}

// ─── Nano Block ───────────────────────────────────────────────────────────────

// NanoBlock represents a complete file-edit step using the nano text editor.
type NanoBlock struct {
	// FilePath is the absolute path of the file to edit.
	// e.g. "/etc/locale.gen"
	FilePath string `json:"filePath"`

	// FilePathExplain is a character-by-character explanation of FilePath.
	FilePathExplain string `json:"filePathExplain"`

	// OpenCommand is the full command to open the file in nano.
	// Usually "nano " + FilePath.
	OpenCommand string `json:"openCommand"`

	// OpenTokens are the annotated tokens for the open command.
	OpenTokens []CommandToken `json:"openTokens"`

	// FullContent is the complete intended file contents (all lines).
	// Shown verbatim in a monospace box.
	FullContent string `json:"fullContent"`

	// Lines is the per-line explanation of every line in FullContent.
	Lines []NanoLine `json:"lines"`

	// CharNotes explains every special character present in this file.
	// At minimum: "/" "\" "." "\"" "-" "=" "#" and " " (space).
	CharNotes []CharNote `json:"charNotes"`

	// SaveExplain is the step-by-step explanation of how to save and exit nano.
	// Covers Ctrl+O, Enter, Ctrl+X.
	SaveExplain string `json:"saveExplain"`
}

// NanoLine is one numbered line inside a file with its full explanation.
type NanoLine struct {
	// LineNumber is the 1-based line number.
	LineNumber int `json:"lineNumber"`

	// Content is the exact text of this line.
	Content string `json:"content"`

	// Explanation is the full description of what this line does, what
	// changes if it is wrong, and what every token on the line means.
	Explanation string `json:"explanation"`
}

// CharNote explains one special character or syntax element.
type CharNote struct {
	// Char is the exact character or short sequence being explained.
	// e.g. "/", "\\", ".", "\"", "-", "=", "#", " "
	Char string `json:"char"`

	// Name is the spoken English name of this character.
	// e.g. "forward slash", "backslash", "period", "double quote",
	//      "hyphen", "equals sign", "hash / pound sign", "space"
	Name string `json:"name"`

	// Role is the grammatical or syntactic function of this character
	// in the context of this specific file or command.
	Role string `json:"role"`

	// Explanation is the full beginner-level explanation.
	Explanation string `json:"explanation"`
}

// ─── Choice Slide ─────────────────────────────────────────────────────────────

// Choice is one selectable option on a "choice" slide.
type Choice struct {
	// Key is the machine-readable value stored when this option is selected.
	Key string `json:"key"`

	// Label is the short display text for this option.
	Label string `json:"label"`

	// Symbol is an optional emoji or icon shown next to the label.
	Symbol string `json:"symbol,omitempty"`

	// Description is the longer explanation of what choosing this option means.
	Description string `json:"description"`

	// IsDefault marks the recommended default choice.
	IsDefault bool `json:"isDefault,omitempty"`

	// ProfileField is the SafetyProfile field this choice writes to.
	// e.g. "BootMode", "NetworkPath"
	ProfileField string `json:"profileField"`
}

// ─── Input Field ─────────────────────────────────────────────────────────────

// InputField is one text entry on an "input" slide.
type InputField struct {
	// DeviceMapKey is the key in DeviceMap that this input updates.
	DeviceMapKey string `json:"deviceMapKey"`

	// Label is the human-readable field label.
	Label string `json:"label"`

	// Placeholder is the hint text shown when the field is empty.
	Placeholder string `json:"placeholder"`

	// Hint is the explanatory text shown below the input.
	Hint string `json:"hint"`

	// Example is a sample value shown as guidance.
	// e.g. "/dev/sda", "wlan0", "archbox"
	Example string `json:"example"`

	// Required means Next is disabled until this field is filled.
	Required bool `json:"required"`

	// AllowUnknown means the user can click "I don't know yet" instead
	// of filling in a value.
	AllowUnknown bool `json:"allowUnknown"`
}

// ─── Safety Gate ─────────────────────────────────────────────────────────────

// SafetyGate is a blocking confirmation checkpoint.
// The Next button is disabled until all checkboxes are checked.
type SafetyGate struct {
	// DangerLevel controls the visual severity of the gate.
	// Values: "warning", "danger", "critical"
	DangerLevel string `json:"dangerLevel"`

	// Headline is the large warning heading.
	Headline string `json:"headline"`

	// Body is the explanatory text shown above the checkboxes.
	Body string `json:"body"`

	// Checkboxes are the facts the user must confirm.
	Checkboxes []string `json:"checkboxes"`
}
