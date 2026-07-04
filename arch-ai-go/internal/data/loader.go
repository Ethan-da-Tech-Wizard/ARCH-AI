package data

import (
	"arch-ai-go/internal/model"
	"encoding/json"
	"os"
	"strings"
)

// ─── Raw JSON shapes ──────────────────────────────────────────────────────────
// These mirror the structure of the existing lessons.json from the Avalonia app.
// They are decoded first, then mapped to the richer model.WizardStep type.

type rawLesson struct {
	ID        string          `json:"id"`
	Title     string          `json:"title"`
	SlideType string          `json:"slideType"`
	Tags      []string        `json:"tags"`
	Body      string          `json:"body"`
	Commands  []rawCommand    `json:"commands"`
	NanoEdit  *rawNano        `json:"nanoEdit"`
	Choices   []rawChoice     `json:"choices"`
	Inputs    []rawInputField `json:"inputFields"`
	Gate      *rawGate        `json:"safetyGate"`
}

type rawCommand struct {
	Raw            string       `json:"raw"`
	Tokens         []rawToken   `json:"tokens"`
	WhySpaces      string       `json:"whySpaces"`
	ExpectedOutput string       `json:"expectedOutput"`
	FailureOutput  string       `json:"failureOutput"`
	DangerLevel    string       `json:"dangerLevel"`
	Note           string       `json:"note"`
}

type rawToken struct {
	Text          string `json:"text"`
	Role          string `json:"role"`
	Explanation   string `json:"explanation"`
	IsPlaceholder bool   `json:"isPlaceholder"`
	DeviceMapKey  string `json:"deviceMapKey"`
}

type rawNano struct {
	FilePath        string       `json:"filePath"`
	FilePathExplain string       `json:"filePathExplain"`
	OpenCommand     string       `json:"openCommand"`
	OpenTokens      []rawToken   `json:"openTokens"`
	FullContent     string       `json:"fullContent"`
	Lines           []rawNanoLine `json:"lines"`
	CharNotes       []rawCharNote `json:"charNotes"`
	SaveExplain     string       `json:"saveExplain"`
}

type rawNanoLine struct {
	LineNumber  int    `json:"lineNumber"`
	Content     string `json:"content"`
	Explanation string `json:"explanation"`
}

type rawCharNote struct {
	Char        string `json:"char"`
	Name        string `json:"name"`
	Role        string `json:"role"`
	Explanation string `json:"explanation"`
}

type rawChoice struct {
	Key          string `json:"key"`
	Label        string `json:"label"`
	Symbol       string `json:"symbol"`
	Description  string `json:"description"`
	IsDefault    bool   `json:"isDefault"`
	ProfileField string `json:"profileField"`
}

type rawInputField struct {
	DeviceMapKey string `json:"deviceMapKey"`
	Label        string `json:"label"`
	Placeholder  string `json:"placeholder"`
	Hint         string `json:"hint"`
	Example      string `json:"example"`
	Required     bool   `json:"required"`
	AllowUnknown bool   `json:"allowUnknown"`
}

type rawGate struct {
	DangerLevel string   `json:"dangerLevel"`
	Headline    string   `json:"headline"`
	Body        string   `json:"body"`
	Checkboxes  []string `json:"checkboxes"`
}

// rawLessonsFile is the top-level structure of lessons.json.
type rawLessonsFile struct {
	Lessons []rawLesson `json:"lessons"`
}

// ─── Loader ───────────────────────────────────────────────────────────────────

// GlossaryEntry is one entry from glossary.json.
type GlossaryEntry struct {
	Term       string `json:"term"`
	Definition string `json:"definition"`
}

// GlossaryDB is the loaded glossary.
type GlossaryDB map[string]string // term (lowercase) → definition

// LoadGlossary reads glossary.json from the given path and returns a GlossaryDB.
func LoadGlossary(path string) (GlossaryDB, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}
	var raw struct {
		Terms []GlossaryEntry `json:"terms"`
	}
	if err := json.Unmarshal(data, &raw); err != nil {
		return nil, err
	}
	db := make(GlossaryDB, len(raw.Terms))
	for _, e := range raw.Terms {
		db[strings.ToLower(e.Term)] = e.Definition
	}
	return db, nil
}

// LoadSteps reads lessons.json from the given path, converts every lesson to
// a model.WizardStep, and returns the full unfiltered slice.
func LoadSteps(path string) ([]model.WizardStep, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}
	var raw rawLessonsFile
	if err := json.Unmarshal(data, &raw); err != nil {
		return nil, err
	}
	steps := make([]model.WizardStep, 0, len(raw.Lessons))
	for _, r := range raw.Lessons {
		steps = append(steps, convertLesson(r))
	}
	return steps, nil
}

// FilterSteps returns only the steps that are relevant for the given profile.
// A step with no tags is always included.
// A step with tags is included when at least one of its tags matches one of
// the profile's active tags.
func FilterSteps(steps []model.WizardStep, profile model.SafetyProfile) []model.WizardStep {
	profileTags := tagSet(profile.Tags())
	var filtered []model.WizardStep
	for _, s := range steps {
		if len(s.Tags) == 0 {
			filtered = append(filtered, s)
			continue
		}
		for _, t := range s.Tags {
			if profileTags[t] {
				filtered = append(filtered, s)
				break
			}
		}
	}
	return filtered
}

// tagSet converts a slice of tag strings into a map for O(1) lookup.
func tagSet(tags []string) map[string]bool {
	m := make(map[string]bool, len(tags))
	for _, t := range tags {
		if t != "" {
			m[t] = true
		}
	}
	return m
}

// ─── Conversion helpers ───────────────────────────────────────────────────────

func convertLesson(r rawLesson) model.WizardStep {
	s := model.WizardStep{
		ID:        r.ID,
		Title:     r.Title,
		SlideType: r.SlideType,
		Tags:      r.Tags,
		Body:      r.Body,
	}
	for _, rc := range r.Commands {
		s.Commands = append(s.Commands, convertCommand(rc))
	}
	if r.NanoEdit != nil {
		nb := convertNano(*r.NanoEdit)
		s.NanoEdit = &nb
	}
	for _, rc := range r.Choices {
		s.Choices = append(s.Choices, model.Choice{
			Key: rc.Key, Label: rc.Label, Symbol: rc.Symbol,
			Description: rc.Description, IsDefault: rc.IsDefault,
			ProfileField: rc.ProfileField,
		})
	}
	for _, ri := range r.Inputs {
		s.InputFields = append(s.InputFields, model.InputField{
			DeviceMapKey: ri.DeviceMapKey, Label: ri.Label,
			Placeholder: ri.Placeholder, Hint: ri.Hint,
			Example: ri.Example, Required: ri.Required,
			AllowUnknown: ri.AllowUnknown,
		})
	}
	if r.Gate != nil {
		g := model.SafetyGate{
			DangerLevel: r.Gate.DangerLevel,
			Headline:    r.Gate.Headline,
			Body:        r.Gate.Body,
			Checkboxes:  r.Gate.Checkboxes,
		}
		s.SafetyGate = &g
	}
	return s
}

func convertCommand(r rawCommand) model.CommandBlock {
	cb := model.CommandBlock{
		Raw: r.Raw, WhySpaces: r.WhySpaces,
		ExpectedOutput: r.ExpectedOutput, FailureOutput: r.FailureOutput,
		DangerLevel: r.DangerLevel, Note: r.Note,
	}
	for _, rt := range r.Tokens {
		cb.Tokens = append(cb.Tokens, model.CommandToken{
			Text: rt.Text, Role: rt.Role, Explanation: rt.Explanation,
			IsPlaceholder: rt.IsPlaceholder, DeviceMapKey: rt.DeviceMapKey,
		})
	}
	return cb
}

func convertNano(r rawNano) model.NanoBlock {
	nb := model.NanoBlock{
		FilePath: r.FilePath, FilePathExplain: r.FilePathExplain,
		OpenCommand: r.OpenCommand, FullContent: r.FullContent,
		SaveExplain: r.SaveExplain,
	}
	for _, rt := range r.OpenTokens {
		nb.OpenTokens = append(nb.OpenTokens, model.CommandToken{
			Text: rt.Text, Role: rt.Role, Explanation: rt.Explanation,
		})
	}
	for _, rl := range r.Lines {
		nb.Lines = append(nb.Lines, model.NanoLine{
			LineNumber: rl.LineNumber, Content: rl.Content,
			Explanation: rl.Explanation,
		})
	}
	for _, rc := range r.CharNotes {
		nb.CharNotes = append(nb.CharNotes, model.CharNote{
			Char: rc.Char, Name: rc.Name, Role: rc.Role,
			Explanation: rc.Explanation,
		})
	}
	return nb
}
