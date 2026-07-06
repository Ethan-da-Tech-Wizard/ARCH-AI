# Arch Wizard: C# + Avalonia UI Native Setup Wizard Migration Plan

## 1. Architectural Rejection of Web Stack
Tauri, WebView, WebKitGTK, Electron, HTML, CSS, JavaScript, and embedded local HTTP servers (`localhost`) are rejected.
- **One-line reason:** Tauri is rejected because it requires a system webview; on Linux that means WebKitGTK. I want a native desktop setup wizard with no webview dependency. Rebuild it in C# + Avalonia.

---

## 2. Target Architecture (C# + Avalonia UI)
We will build a native desktop application in C# and .NET using the **Avalonia UI** cross-platform framework.

### Key Stack Components:
- **Language:** C#
- **Runtime:** .NET 8.0 or .NET 9.0 SDK
- **UI Framework:** Avalonia UI (XAML-based layout rendering using Skia/DirectX/Vulkan, with zero dependency on browser runtimes)
- **Editor:** VS Code with C# Dev Kit extension
- **Configuration & Storage:** Local JSON files for caching the safety profile selections and device maps.
- **Data Layer:** The existing lessons database (sections, commands, glossary, manual references) will be extracted into a `lessons.json` file. The C# application will deserialize this JSON on startup to dynamically populate the wizard stages.

---

## 3. Project Directory Structure
We will clean up the old web frontend and Tauri code, putting them in a legacy subdirectory if needed, and initialize a new Avalonia project structure:

```
Arch Wizard/
├── setup wizard/
│   ├── AVALONIA_MIGRATION_PLAN.md   # This plan
│   └── (Other wizard documentation)
├── src-avalonia/                    # C# + Avalonia Project Root
│   ├── ArchSetupWizard.csproj     # .NET project file
│   ├── App.axaml                    # Application style definition
│   ├── App.axaml.cs                 # Application lifecycle code
│   ├── MainWindow.axaml             # Main window containing the layout grid
│   ├── MainWindow.axaml.cs          # Main window state & event handlers
│   ├── Assets/
│   │   ├── lessons.json             # Extracted JSON database
│   │   └── terms.json               # Glossary and term definitions
│   ├── Models/
│   │   ├── LessonModels.cs          # Section, Block, Command C# definitions
│   │   └── SafetyProfile.cs         # Safety profile & Device map C# definitions
│   └── Views/
│       ├── SafetyProfileView.axaml  # Screen 1: 12-Step Safety Profile form
│       ├── WizardStepView.axaml     # Screen 2+: Walkthrough steps & Drawer
│       └── CompleteView.axaml       # Screen 3: Completion card
```

---

## 4. UI Layout & View Transitions (XAML)

### A. Navigation States
Instead of routing via JavaScript, Avalonia will manage views using standard C# properties:
- `CurrentView`: Enum (`Profile`, `Wizard`, `Complete`).
- `CurrentStepIndex`: Tracker for applicable wizard steps.
- View switching will be managed by setting the content of a `TransitioningContentControl` or by toggling element visibilities.

### B. Safety Profile Page (Screen 1)
- Displays the 12 Safety Profile questions as Avalonia `ComboBox` elements.
- Uses C# bindings to count answered dropdowns.
- The "Begin Walkthrough" button starts disabled (`IsEnabled="False"`). Once all 12 options have a selected index, it becomes enabled.

### C. Setup Wizard Page (Screen 2+)
A two-column grid split:
- **Left Column (Action Pane):** Displays the active command card, clipboard copy button, command word mappings, expected output, and failure notes.
- **Right Column (collapsible Theory Drawer):**
  - Slides in and out by setting `Width="0"` or `Width="400"`.
  - Displays the conceptual explanation, warnings list, clickable glossary, and manual references.

---

## 5. Migration Roadmap (Chunks)

### Chunk 1: Extrication & Cleanup
- Extract the large database arrays (`sections`, `glossary`, `glossaryDetails`) from `frontend/app.js` and save them into a static `lessons.json` and `glossary.json` file inside `src-avalonia/Assets/`.
- Create a legacy archiving folder for Tauri/web components to keep the root directory tidy.

### Chunk 2: SDK Installation & Project Init
- Install the `.NET SDK` on Arch Linux.
- Install Avalonia templates: `dotnet new install Avalonia.Templates`.
- Initialize the application template: `dotnet new avalonia.app -o src-avalonia`.

### Chunk 3: Data Layer & Models (C#)
- Implement `LessonModels.cs` describing lessons, blocks, and commands.
- Implement JSON loading utility using `System.Text.Json`.

### Chunk 4: UI Development (Views)
- Build the `SafetyProfileView.axaml` (12 dropdowns + validation).
- Build the `WizardStepView.axaml` (left-hand command pane + right-hand sliding reference drawer).
- Implement the sticky footer controls.

### Chunk 5: State Machine & Placeholders
- Port the device-name mapping replacement logic (e.g. swapping `/dev/sda` with user's inputted disk name) to C#.
- Port the safety gate block logic to C#.

### Chunk 6: Build & Test
- Run `dotnet run` to test compiling and rendering.
- Verify that copy-to-clipboard works natively via `TopLevel.GetTopLevel(this)?.Clipboard`.
