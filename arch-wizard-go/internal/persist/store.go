package persist

import (
	"arch-wizard-go/internal/model"
	"encoding/json"
	"os"
	"path/filepath"
)

// stateFileName is the name of the JSON file stored in the data directory.
const stateFileName = "state.json"

// dataDir returns the directory where the state file is stored.
// It follows the XDG Base Directory Specification on Linux/macOS and uses
// %APPDATA% on Windows. Falls back to the user home directory.
func dataDir() (string, error) {
	// XDG_DATA_HOME takes priority on Linux.
	if xdg := os.Getenv("XDG_DATA_HOME"); xdg != "" {
		return filepath.Join(xdg, "arch-wizard-go"), nil
	}
	home, err := os.UserHomeDir()
	if err != nil {
		return "", err
	}
	return filepath.Join(home, ".local", "share", "arch-wizard-go"), nil
}

// statePath returns the full path to the state JSON file.
func statePath() (string, error) {
	dir, err := dataDir()
	if err != nil {
		return "", err
	}
	return filepath.Join(dir, stateFileName), nil
}

// Load reads the saved AppState from disk.
// If no state file exists yet, it returns a fresh default AppState with no error.
func Load() (model.AppState, error) {
	path, err := statePath()
	if err != nil {
		return model.NewAppState(), err
	}

	data, err := os.ReadFile(path)
	if os.IsNotExist(err) {
		// First run — return a clean slate.
		return model.NewAppState(), nil
	}
	if err != nil {
		return model.NewAppState(), err
	}

	var state model.AppState
	if err := json.Unmarshal(data, &state); err != nil {
		// Corrupted file — start fresh but do not delete the bad file.
		return model.NewAppState(), err
	}

	// Ensure maps are initialised even if the JSON had null values.
	if state.DeviceMap == nil {
		state.DeviceMap = model.DefaultDeviceMap()
	}
	if state.CompletedStepIDs == nil {
		state.CompletedStepIDs = make(map[string]bool)
	}

	return state, nil
}

// Save writes the AppState to disk as JSON.
// The data directory is created if it does not exist.
func Save(state model.AppState) error {
	dir, err := dataDir()
	if err != nil {
		return err
	}
	if err := os.MkdirAll(dir, 0o755); err != nil {
		return err
	}

	data, err := json.MarshalIndent(state, "", "  ")
	if err != nil {
		return err
	}

	path := filepath.Join(dir, stateFileName)
	// Write to a temp file first then rename for atomic update.
	tmp := path + ".tmp"
	if err := os.WriteFile(tmp, data, 0o644); err != nil {
		return err
	}
	return os.Rename(tmp, path)
}

// Reset deletes the state file so the wizard restarts from the beginning.
func Reset() error {
	path, err := statePath()
	if err != nil {
		return err
	}
	err = os.Remove(path)
	if os.IsNotExist(err) {
		return nil // nothing to delete
	}
	return err
}
