package model

// SafetyProfile holds all answers the user gives during the initial
// setup-question phase. Every field maps to one of the 13 profile questions.
type SafetyProfile struct {
	// InstallCard is the key of the chosen install-type card (1 of 12).
	// e.g. "fresh-single", "second-internal", "external-usb", "dual-windows" …
	InstallCard string `json:"installCard"`

	// GuideDevice: how the user is viewing this guide while installing.
	// Values: "phone", "second-pc", "same-vm", "same-pc"
	GuideDevice string `json:"guideDevice"`

	// MachineType: what kind of computer Arch is being installed onto.
	// Values: "laptop", "desktop", "mac", "vm", "other"
	MachineType string `json:"machineType"`

	// CurrentEnv: what environment the user is running right now.
	// Values: "arch-iso", "windows", "macos", "linux", "other"
	CurrentEnv string `json:"currentEnv"`

	// InstallTarget: where Arch will be installed.
	// Values: "internal", "second-internal", "external", "same-disk"
	InstallTarget string `json:"installTarget"`

	// EraseIntent: whether the target disk can be fully wiped.
	// Values: "yes", "no", "partial"
	EraseIntent string `json:"eraseIntent"`

	// InternalDrives: how many internal drives are in the machine.
	// Values: "1", "2", "3+"
	InternalDrives string `json:"internalDrives"`

	// ExternalDrive: whether an external drive is connected during install.
	// Values: "yes-disconnect", "yes-keep", "no"
	ExternalDrive string `json:"externalDrive"`

	// BootMode: the firmware boot mode of the target machine.
	// Values: "uefi", "bios", "unknown"
	BootMode string `json:"bootMode"`

	// BootloaderChoice: which bootloader will be installed.
	// Values: "systemd-boot", "grub-uefi", "grub-bios"
	BootloaderChoice string `json:"bootloaderChoice"`

	// NetworkPath: how the machine connects to the internet.
	// Values: "ethernet", "wifi", "unknown"
	NetworkPath string `json:"networkPath"`

	// SwapStrategy: how swap space will be configured.
	// Values: "swapfile", "partition", "none"
	SwapStrategy string `json:"swapStrategy"`

	// AudioTarget: the primary audio output route.
	// Values: "internal", "hdmi", "usb-headset", "bluetooth"
	AudioTarget string `json:"audioTarget"`
}

// IsComplete returns true when all 13 profile fields have been answered.
func (p *SafetyProfile) IsComplete() bool {
	return p.InstallCard != "" &&
		p.GuideDevice != "" &&
		p.MachineType != "" &&
		p.CurrentEnv != "" &&
		p.InstallTarget != "" &&
		p.EraseIntent != "" &&
		p.InternalDrives != "" &&
		p.ExternalDrive != "" &&
		p.BootMode != "" &&
		p.BootloaderChoice != "" &&
		p.NetworkPath != "" &&
		p.SwapStrategy != "" &&
		p.AudioTarget != ""
}

// Tags returns a flat list of all profile value strings, used for
// filtering wizard steps by tag matching.
func (p *SafetyProfile) Tags() []string {
	return []string{
		p.InstallCard,
		p.GuideDevice,
		p.MachineType,
		p.CurrentEnv,
		p.InstallTarget,
		p.EraseIntent,
		p.InternalDrives,
		p.ExternalDrive,
		p.BootMode,
		p.BootloaderChoice,
		p.NetworkPath,
		p.SwapStrategy,
		p.AudioTarget,
	}
}

// InstallCardDef describes one of the 12 install-type profile cards shown
// on the opening screen of the wizard.
type InstallCardDef struct {
	// Key is the machine-readable identifier stored in SafetyProfile.InstallCard.
	Key string

	// Symbol is the Unicode emoji or icon shown prominently on the card.
	Symbol string

	// Title is the short one-line card heading.
	Title string

	// WhoFor is a 1–2 sentence description of the user this card is for.
	WhoFor string

	// What is a 2–3 sentence explanation of what this install type does.
	What string

	// Risks lists the primary risks the user must be aware of.
	Risks string

	// DefaultNext is the default InstallTarget value implied by this card.
	DefaultNext string
}

// AllInstallCards returns all 12 install-type card definitions.
func AllInstallCards() []InstallCardDef {
	return []InstallCardDef{
		{
			Key:    "fresh-single",
			Symbol: "🖥️",
			Title:  "Fresh Single Disk",
			WhoFor: "You have one internal drive and want to replace whatever is on it entirely with Arch Linux.",
			What:   "The entire disk is erased and a brand-new Arch Linux system is written from scratch. You will not keep any existing operating system or files on this drive.",
			Risks:  "⚠ All data on the chosen disk will be permanently deleted. Back up anything important before continuing.",
			DefaultNext: "internal",
		},
		{
			Key:    "second-internal",
			Symbol: "💿",
			Title:  "Second Internal SSD",
			WhoFor: "Your computer has two or more internal drives. You want to install Arch on the empty or secondary drive and leave your primary drive (with Windows or another OS) untouched.",
			What:   "Arch gets its own dedicated internal drive. The existing operating system on the primary drive is completely separate and will not be modified.",
			Risks:  "⚠ You must correctly identify which drive is the target before any command is run. Mixing up drive names can destroy your primary OS.",
			DefaultNext: "second-internal",
		},
		{
			Key:    "external-usb",
			Symbol: "🔌",
			Title:  "External USB / SSD",
			WhoFor: "You want a portable Arch Linux installation on a removable drive that you can plug into different computers.",
			What:   "Arch is installed on an external USB flash drive or portable SSD. The internal drives of any computer you plug this into are left completely alone.",
			Risks:  "⚠ Bootloader must be installed in portable mode or it may overwrite the EFI entries of the host computer.",
			DefaultNext: "external",
		},
		{
			Key:    "dual-windows",
			Symbol: "🪟",
			Title:  "Dual Boot With Windows",
			WhoFor: "You want to keep Windows and add Arch Linux on the same internal drive, choosing which to boot at startup.",
			What:   "Free space is carved out from the Windows disk (by shrinking a Windows partition) and used for Arch. Both operating systems share the same EFI partition.",
			Risks:  "⚠ Resizing Windows partitions is risky. Always back up your Windows data and disable BitLocker before shrinking. A mistake can make Windows unbootable.",
			DefaultNext: "same-disk",
		},
		{
			Key:    "dual-linux",
			Symbol: "🐧",
			Title:  "Dual Boot With Linux",
			WhoFor: "You already have a Linux distribution installed and want to add Arch alongside it.",
			What:   "Arch is installed in available free space or a separate partition. The existing Linux OS and its bootloader are updated to include Arch in the boot menu.",
			Risks:  "⚠ Grub or systemd-boot configuration of the existing Linux may need manual editing. Formatting the wrong partition will destroy the existing Linux install.",
			DefaultNext: "same-disk",
		},
		{
			Key:    "mac-external",
			Symbol: "🍎",
			Title:  "Mac + External SSD",
			WhoFor: "You have an Apple Mac (Intel or Apple Silicon) and want to run Arch Linux from an external SSD without touching the Mac's internal drive.",
			What:   "Arch is installed on an external SSD. On Intel Macs, the internal drive is completely untouched. Apple Silicon support requires additional steps not covered in this path.",
			Risks:  "⚠ Apple Silicon (M1/M2/M3) is not fully supported. This path is for Intel Macs only unless you know what you are doing.",
			DefaultNext: "external",
		},
		{
			Key:    "vm-windows-host",
			Symbol: "🖥",
			Title:  "Windows Host → VM",
			WhoFor: "You are running Windows as your main OS and want to install Arch Linux inside a virtual machine (QEMU, VirtualBox, or VMware) without rebooting.",
			What:   "Arch runs inside a virtual disk that looks like a real disk to the VM. Your Windows environment is never touched. The VM can be deleted at any time.",
			Risks:  "✓ This is the safest installation scenario. No real disk is at risk. Recommended for beginners who want to learn before committing.",
			DefaultNext: "internal",
		},
		{
			Key:    "vm-linux-host",
			Symbol: "🐧",
			Title:  "Linux Host → VM",
			WhoFor: "You are running a Linux distribution and want to install Arch in a QEMU or VirtualBox virtual machine on the same computer.",
			What:   "Arch runs inside a virtual disk image file. Your existing Linux installation is not touched. Clipboard and display scaling may require guest additions.",
			Risks:  "✓ Safe scenario. No physical disk is at risk. QEMU with KVM acceleration is recommended for speed.",
			DefaultNext: "internal",
		},
		{
			Key:    "encrypted",
			Symbol: "🔒",
			Title:  "Full Disk Encryption (LUKS2)",
			WhoFor: "You want the strongest data-at-rest protection: the entire Arch root partition is encrypted with LUKS2 and unlocked by a passphrase at boot.",
			What:   "After normal partitioning, the root partition is formatted with LUKS2 encryption before any filesystem is created inside it. You must enter a passphrase every time the system boots.",
			Risks:  "⚠ If you forget the passphrase, your data is permanently unrecoverable. There is no reset or bypass. Store the passphrase safely.",
			DefaultNext: "internal",
		},
		{
			Key:    "bios-legacy",
			Symbol: "⚡",
			Title:  "BIOS / Legacy System",
			WhoFor: "Your computer predates UEFI or is configured in legacy BIOS mode. You need an MBR partition table and GRUB installed in legacy mode.",
			What:   "Instead of an EFI System Partition, GRUB is installed directly into the first 512 bytes of the disk (the Master Boot Record). The partition table uses MBR instead of GPT.",
			Risks:  "⚠ Legacy BIOS and UEFI bootloaders are not interchangeable. Installing a UEFI bootloader on a BIOS system results in a non-bootable system.",
			DefaultNext: "internal",
		},
		{
			Key:    "reinstall-rescue",
			Symbol: "🔄",
			Title:  "Reinstall / Rescue",
			WhoFor: "Your Arch system no longer boots, or you want to reinstall from scratch while optionally preserving your home partition.",
			What:   "Using the Arch ISO, you chroot into your existing broken system to repair it, or you selectively reformat only the root partition while keeping the home partition's data.",
			Risks:  "⚠ Formatting the wrong partition during a reinstall can destroy user data. Verify every partition before running any mkfs command.",
			DefaultNext: "same-disk",
		},
		{
			Key:    "not-sure",
			Symbol: "❓",
			Title:  "I Am Not Sure",
			WhoFor: "You are unsure what kind of install you need, what hardware you have, or what your current environment looks like.",
			What:   "A guided discovery flow will ask you questions about what you see on your screen, what hardware you have, and what you want to end up with. Based on your answers, the wizard will recommend the right install path.",
			Risks:  "✓ No commands are shown until the discovery flow is complete. This is the safe starting point for anyone uncertain.",
			DefaultNext: "internal",
		},
	}
}
