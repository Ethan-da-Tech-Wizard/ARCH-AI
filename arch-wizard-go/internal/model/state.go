package model

// AppState is the complete runtime state of the wizard.
// It is serialised to disk so the user can close and resume at any time.
type AppState struct {
	// Phase is the current top-level screen.
	// Values: "profile", "questions", "wizard", "complete"
	Phase string `json:"phase"`

	// Profile holds all the user's answered setup questions.
	Profile SafetyProfile `json:"profile"`

	// DeviceMap holds all the user's entered device/partition names.
	DeviceMap DeviceMap `json:"deviceMap"`

	// CurrentStepIndex is the 0-based index into the filtered step list.
	// -1 means the wizard hasn't started yet.
	CurrentStepIndex int `json:"currentStepIndex"`

	// CompletedStepIDs is the set of step IDs the user has passed through.
	CompletedStepIDs map[string]bool `json:"completedStepIDs"`

	// QuestionIndex is the current index within the profile question slides.
	QuestionIndex int `json:"questionIndex"`
}

// NewAppState returns an AppState initialised to the profile selection screen.
func NewAppState() AppState {
	return AppState{
		Phase:            "profile",
		DeviceMap:        DefaultDeviceMap(),
		CurrentStepIndex: -1,
		CompletedStepIDs: make(map[string]bool),
		QuestionIndex:    0,
	}
}

// MarkStepComplete records that the step with the given ID has been completed.
func (s *AppState) MarkStepComplete(id string) {
	if s.CompletedStepIDs == nil {
		s.CompletedStepIDs = make(map[string]bool)
	}
	s.CompletedStepIDs[id] = true
}

// IsStepComplete returns true if the step with the given ID has been completed.
func (s *AppState) IsStepComplete(id string) bool {
	return s.CompletedStepIDs[id]
}
