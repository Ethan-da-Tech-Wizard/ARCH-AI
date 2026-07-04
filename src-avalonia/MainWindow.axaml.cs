using Avalonia;
using Avalonia.Controls;
using Avalonia.Controls.Primitives;
using Avalonia.Input.Platform;
using Avalonia.Interactivity;
using Avalonia.Layout;
using Avalonia.Media;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using src_avalonia.Models;

namespace src_avalonia
{
    public partial class MainWindow : Window
    {
        // State variables
        private string _currentView = "profile"; // "profile", "wizard", "complete"
        private int _currentStepIndex = -1;
        private List<WizardStep> _applicableSteps = new();
        private SafetyProfile _profile = new();
        private Dictionary<string, DeviceMapItem> _deviceMap = new();
        private Dictionary<string, bool> _safetyGates = new();

        private LessonsDatabase? _lessonsDb;
        private GlossaryDatabase? _glossaryDb;

        // Info popup help content mappings
        private static readonly Dictionary<string, (string Title, string Body)> ProfileHelpDetails = new()
        {
            { "guideDevice", ("Reading device source", "Identify the device you are using to read this walkthrough right now. Since installing Arch Linux starts in a console prompt with no web browser, it is highly recommended to read this from a second device (like a phone, tablet, or separate laptop) so it remains visible.") },
            { "machineType", ("Target machine type", "Different physical or virtual machines need different kernel drivers and configurations later. Laptops need wireless packages and touchpad settings, while Virtual Machines need host-specific guest utility services.") },
            { "currentEnvironment", ("Active OS / Environment", "You cannot install Arch Linux commands inside Windows or macOS. You must boot the computer into the Arch live installer environment (the Arch ISO). Choose your current status so the wizard knows how to instruct you.") },
            { "installTarget", ("Installation target drive", "This filter defines where Arch goes. If you choose 'Same disk as an existing OS', you will be dual-booting, which requires partition resizing. Wiping is much simpler and is the standard pathway.") },
            { "eraseIntent", ("Can target disk be fully erased?", "Selecting 'Yes' unlocks CFDisk and disk-writing formatting commands. Selecting 'No' or 'Unsure' hides destructive partitioning/formatting steps to keep your data safe.") },
            { "internalDriveCount", ("Number of internal drives", "Knowing the internal drive count prevents copying a generic example drive path (like /dev/sda) blindly, which could overwrite files on a secondary data drive.") },
            { "externalDrive", ("Is an external drive connected?", "If you have an external storage drive connected, it will appear in block device lists (lsblk) and must be carefully separated from your internal target disk.") },
            { "bootMode", ("Boot mode detected or expected", "UEFI is modern motherboard firmware; BIOS is legacy. They require completely different partitioning maps and bootloader installations. A mismatch means your machine will fail to boot.") },
            { "bootloaderPath", ("Bootloader choice", "Systemd-boot is highly recommended for UEFI (lightweight and simple). GRUB is a traditional bootloader suitable for legacy BIOS or dual-boot menus.") },
            { "networkPath", ("Network path", "Arch packages are downloaded from the internet during installation. Ethernet connects automatically; Wi-Fi requires connecting via the iwctl shell.") },
            { "swapStrategy", ("Swap strategy", "Swap acts as overflow memory. A swap file (created inside the root filesystem after install) is highly recommended because it is very easy to resize or delete without re-partitioning.") },
            { "audioTarget", ("Audio playback route", "Sets whether sound is routed to internal speakers, HDMI displays, USB headsets, or Bluetooth devices, tailoring audio diagnostic steps.") }
        };

        public MainWindow()
        {
            InitializeComponent();
            LoadDataAssets();
            LoadState();
            SyncProfileView();
            TransitionToView(_currentView);
            this.SizeChanged += OnWindowSizeChanged;
        }

        private void OnWindowSizeChanged(object? sender, SizeChangedEventArgs e)
        {
            if (ProfileFormGrid != null)
            {
                ProfileFormGrid.Columns = e.NewSize.Width < 800 ? 1 : 2;
            }

            if (e.NewSize.Width < 950)
            {
                if (DrawerPanel != null && DrawerPanel.IsVisible)
                {
                    DrawerPanel.IsVisible = false;
                }
            }
        }

        private void LoadDataAssets()
        {
            _lessonsDb = DataLoader.LoadAsset<LessonsDatabase>("Assets/lessons.json");
            _glossaryDb = DataLoader.LoadAsset<GlossaryDatabase>("Assets/glossary.json");
        }

        // ================= STATE PERSISTENCE =================
        private void LoadState()
        {
            // Initializing default maps
            _deviceMap = new Dictionary<string, DeviceMapItem>
            {
                { "targetDisk", new DeviceMapItem { Value = "", Unknown = false } },
                { "efiPartition", new DeviceMapItem { Value = "", Unknown = false } },
                { "rootPartition", new DeviceMapItem { Value = "", Unknown = false } },
                { "swapPartition", new DeviceMapItem { Value = "", Unknown = false } },
                { "currentOsDisk", new DeviceMapItem { Value = "", Unknown = false } },
                { "wifiDevice", new DeviceMapItem { Value = "", Unknown = false } },
                { "wifiName", new DeviceMapItem { Value = "", Unknown = false } },
                { "username", new DeviceMapItem { Value = "", Unknown = false } },
                { "hostname", new DeviceMapItem { Value = "", Unknown = false } }
            };

            _safetyGates = new Dictionary<string, bool>
            {
                { "diskIdentity", false },
                { "bootloaderMode", false },
                { "lockoutSafety", false },
                { "securityPrivacy", false }
            };
        }

        private void ResetState()
        {
            _profile = new SafetyProfile();
            LoadState();
            SyncProfileView();
            TransitionToView("profile");
        }

        // ================= PROFILE FORM BINDINGS =================
        private void SyncProfileView()
        {
            // Reset combo selections
            ComboGuideDevice.SelectedIndex = GetSelectedIndexForTag(ComboGuideDevice, _profile.GuideDevice);
            ComboMachineType.SelectedIndex = GetSelectedIndexForTag(ComboMachineType, _profile.MachineType);
            ComboEnvironment.SelectedIndex = GetSelectedIndexForTag(ComboEnvironment, _profile.CurrentEnvironment);
            ComboInstallTarget.SelectedIndex = GetSelectedIndexForTag(ComboInstallTarget, _profile.InstallTarget);
            ComboEraseIntent.SelectedIndex = GetSelectedIndexForTag(ComboEraseIntent, _profile.EraseIntent);
            ComboDriveCount.SelectedIndex = GetSelectedIndexForTag(ComboDriveCount, _profile.InternalDriveCount);
            ComboExternalConnected.SelectedIndex = GetSelectedIndexForTag(ComboExternalConnected, _profile.ExternalDrive);
            ComboBootMode.SelectedIndex = GetSelectedIndexForTag(ComboBootMode, _profile.BootMode);
            ComboBootloader.SelectedIndex = GetSelectedIndexForTag(ComboBootloader, _profile.BootloaderPath);
            ComboNetwork.SelectedIndex = GetSelectedIndexForTag(ComboNetwork, _profile.NetworkPath);
            ComboSwap.SelectedIndex = GetSelectedIndexForTag(ComboSwap, _profile.SwapStrategy);
            ComboAudio.SelectedIndex = GetSelectedIndexForTag(ComboAudio, _profile.AudioTarget);

            UpdateProfileCount();
        }

        private int GetSelectedIndexForTag(ComboBox comboBox, string tagValue)
        {
            if (string.IsNullOrEmpty(tagValue)) return -1;
            for (int i = 0; i < comboBox.Items.Count; i++)
            {
                if (comboBox.Items[i] is ComboBoxItem item && GetItemTag(item) == tagValue)
                {
                    return i;
                }
            }
            return -1;
        }

        private string GetItemTag(ComboBoxItem item)
        {
            return item.Tag as string ?? string.Empty;
        }

        private void OnProfileSelectionChanged(object? sender, SelectionChangedEventArgs e)
        {
            if (sender is ComboBox combo && combo.SelectedItem is ComboBoxItem item)
            {
                string tag = GetItemTag(item);
                string name = combo.Name ?? string.Empty;

                if (name == "ComboGuideDevice") _profile.GuideDevice = tag;
                else if (name == "ComboMachineType") _profile.MachineType = tag;
                else if (name == "ComboEnvironment") _profile.CurrentEnvironment = tag;
                else if (name == "ComboInstallTarget") _profile.InstallTarget = tag;
                else if (name == "ComboEraseIntent") _profile.EraseIntent = tag;
                else if (name == "ComboDriveCount") _profile.InternalDriveCount = tag;
                else if (name == "ComboExternalConnected") _profile.ExternalDrive = tag;
                else if (name == "ComboBootMode") _profile.BootMode = tag;
                else if (name == "ComboBootloader") _profile.BootloaderPath = tag;
                else if (name == "ComboNetwork") _profile.NetworkPath = tag;
                else if (name == "ComboSwap") _profile.SwapStrategy = tag;
                else if (name == "ComboAudio") _profile.AudioTarget = tag;
            }

            UpdateProfileCount();
        }

        private void UpdateProfileCount()
        {
            int count = 0;
            if (!string.IsNullOrEmpty(_profile.GuideDevice)) count++;
            if (!string.IsNullOrEmpty(_profile.MachineType)) count++;
            if (!string.IsNullOrEmpty(_profile.CurrentEnvironment)) count++;
            if (!string.IsNullOrEmpty(_profile.InstallTarget)) count++;
            if (!string.IsNullOrEmpty(_profile.EraseIntent)) count++;
            if (!string.IsNullOrEmpty(_profile.InternalDriveCount)) count++;
            if (!string.IsNullOrEmpty(_profile.ExternalDrive)) count++;
            if (!string.IsNullOrEmpty(_profile.BootMode)) count++;
            if (!string.IsNullOrEmpty(_profile.BootloaderPath)) count++;
            if (!string.IsNullOrEmpty(_profile.NetworkPath)) count++;
            if (!string.IsNullOrEmpty(_profile.SwapStrategy)) count++;
            if (!string.IsNullOrEmpty(_profile.AudioTarget)) count++;

            if (ProfileCounterText != null)
            {
                ProfileCounterText.Text = $"{count} of 12 answered";
            }

            if (ProfileCounterBorder != null && ProfileCounterText != null)
            {
                if (count == 12)
                {
                    ProfileCounterText.Foreground = Brushes.LightGreen;
                    ProfileCounterBorder.Background = new SolidColorBrush(Color.FromArgb(30, 94, 116, 69));
                }
                else
                {
                    ProfileCounterText.Foreground = new SolidColorBrush(Color.FromRgb(157, 73, 50));
                    ProfileCounterBorder.Background = new SolidColorBrush(Color.FromArgb(20, 157, 73, 50));
                }
            }

            if (BtnBeginWizard != null)
            {
                BtnBeginWizard.IsEnabled = (count == 12);
            }
        }

        // ================= VIEW NAVIGATION =================
        private void TransitionToView(string viewName)
        {
            _currentView = viewName;
            ViewProfile.IsVisible = (viewName == "profile");
            ViewWizard.IsVisible = (viewName == "wizard");
            ViewComplete.IsVisible = (viewName == "complete");

            HeaderProgressPanel.IsVisible = (viewName == "wizard");
            BtnToggleDrawer.IsVisible = (viewName == "wizard");

            if (viewName == "profile")
            {
                BtnBack.IsEnabled = false;
                BtnNext.IsEnabled = _profile.IsComplete();
                FooterStepIndicator.Text = "Safety Profile";
            }
            else if (viewName == "wizard")
            {
                BtnBack.IsEnabled = true;
                BtnNext.IsEnabled = true;
                UpdateWizardStepNavigation();
            }
            else if (viewName == "complete")
            {
                BtnBack.IsEnabled = false;
                BtnNext.IsEnabled = false;
                FooterStepIndicator.Text = "Walkthrough Finished";
            }
        }

        private void UpdateWizardStepNavigation()
        {
            if (_applicableSteps.Count == 0) return;
            FooterStepIndicator.Text = $"Step {_currentStepIndex + 1} of {_applicableSteps.Count}";
            HeaderProgressLabel.Text = $"Step {_currentStepIndex + 1} of {_applicableSteps.Count}";

            double percent = ((double)(_currentStepIndex) / Math.Max(1, _applicableSteps.Count - 1)) * 100;
            HeaderProgressBar.Value = percent;

            BtnBack.Content = _currentStepIndex == 0 ? "Profile" : "< Back";
            BtnNext.Content = _currentStepIndex == _applicableSteps.Count - 1 ? "Finish" : "Next >";
        }

        // ================= EVENT HANDLERS =================
        private void OnShowInfoClick(object? sender, RoutedEventArgs e)
        {
            if (sender is Button btn && btn.Tag is string key && ProfileHelpDetails.TryGetValue(key, out var help))
            {
                ModalTitle.Text = help.Title;
                ModalBody.Text = help.Body;
                ModalOverlay.IsVisible = true;
            }
        }

        private void OnCloseModalClick(object? sender, RoutedEventArgs e)
        {
            ModalOverlay.IsVisible = false;
        }

        private void OnResetProfileClick(object? sender, RoutedEventArgs e)
        {
            ResetState();
        }

        private void OnBeginWizardClick(object? sender, RoutedEventArgs e)
        {
            if (_profile.IsComplete())
            {
                CompileWizardSteps();
                _currentStepIndex = 0;
                TransitionToView("wizard");
                RenderActiveStep();
            }
        }

        private void OnToggleDrawerClick(object? sender, RoutedEventArgs e)
        {
            DrawerPanel.IsVisible = !DrawerPanel.IsVisible;
        }

        private void OnCloseDrawerClick(object? sender, RoutedEventArgs e)
        {
            DrawerPanel.IsVisible = false;
        }

        private void OnBackClick(object? sender, RoutedEventArgs e)
        {
            if (_currentStepIndex == 0)
            {
                TransitionToView("profile");
            }
            else
            {
                _currentStepIndex--;
                RenderActiveStep();
            }
        }

        private void OnNextClick(object? sender, RoutedEventArgs e)
        {
            // If on Device Mapping step, save the input values
            if (_currentStepIndex == 0 && _applicableSteps[_currentStepIndex].Type == "device-mapping")
            {
                SaveDeviceMappingInputs();
            }

            if (_currentStepIndex == _applicableSteps.Count - 1)
            {
                TransitionToView("complete");
            }
            else
            {
                _currentStepIndex++;
                RenderActiveStep();
            }
        }

        private void OnRestartSetupClick(object? sender, RoutedEventArgs e)
        {
            ResetState();
        }

        private void OnExitClick(object? sender, RoutedEventArgs e)
        {
            Close();
        }

        // ================= STEP GENERATOR =================
        private void CompileWizardSteps()
        {
            _applicableSteps.Clear();

            // Step 1: Device Mapping Setup (Wizard Step 0)
            _applicableSteps.Add(new WizardStep
            {
                Type = "device-mapping",
                Title = "Device Mapping Setup",
                Summary = "Register the target storage devices and partition names before typing commands.",
                SectionTitle = "Device Mapping",
                SectionExplainText = "Arch Linux requires you to target specific partitions (EFI, root, swap) on your hard drive. Using correct names is crucial to avoid destroying data on other drives.",
                SectionTerms = new List<string> { "block device", "/dev", "device name", "partition" }
            });

            if (_lessonsDb == null) return;

            // Loop over sections to compile milestones and commands
            foreach (var section in _lessonsDb.Sections)
            {
                var visibleBlocks = GetVisibleBlocks(section);
                var visibleCommands = GetVisibleCommands(section);

                if (visibleBlocks.Count == 0 && visibleCommands.Count == 0)
                {
                    continue; // Skip section if no visible items
                }

                // Add Milestone Intro Step
                _applicableSteps.Add(new WizardStep
                {
                    Type = "milestone",
                    Title = section.Title,
                    Summary = section.Summary,
                    SectionTitle = section.Title,
                    Blocks = visibleBlocks.Where(b => b.Type != "warn" && b.Type != "checkpoint").ToList(),
                    Warnings = visibleBlocks.Where(b => b.Type == "warn").ToList(),
                    Checkpoints = visibleBlocks.Where(b => b.Type == "checkpoint").ToList(),
                    SectionExplainText = string.Join("\n\n", visibleBlocks.Where(b => b.Type != "warn" && b.Type != "checkpoint").Select(b => b.Text)),
                    SectionTerms = section.Terms,
                    Sources = section.Sources
                });

                // Add each command as a separate walkthrough step
                foreach (var command in visibleCommands)
                {
                    _applicableSteps.Add(new WizardStep
                    {
                        Type = "command",
                        Title = command.Label,
                        Summary = command.Purpose,
                        SectionTitle = section.Title,
                        Command = command,
                        SectionExplainText = string.Join("\n\n", visibleBlocks.Where(b => b.Type != "warn" && b.Type != "checkpoint").Select(b => b.Text)),
                        SectionTerms = section.Terms,
                        Sources = command.Sources,
                        Warnings = visibleBlocks.Where(b => b.Type == "warn").ToList()
                    });
                }
            }
        }

        private List<Block> GetVisibleBlocks(Section section)
        {
            return section.Blocks.Where(b => BranchMatchesProfile(b.Branch)).ToList();
        }

        private List<Command> GetVisibleCommands(Section section)
        {
            return section.Commands.Where(c => BranchMatchesProfile(c.Branch) &&
                                               DiskStrategyCommandVisible(section.Title, c) &&
                                               SwapStrategyCommandVisible(c)).ToList();
        }

        private bool BranchMatchesProfile(string? branch)
        {
            if (string.IsNullOrEmpty(branch)) return true;
            return branch == ActiveBootloaderBranch();
        }

        private string? ActiveBootloaderBranch()
        {
            if (_profile.BootMode == "uefi")
            {
                if (string.IsNullOrEmpty(_profile.BootloaderPath) || _profile.BootloaderPath == "systemd-boot") return "systemd-boot";
                if (_profile.BootloaderPath == "grub-uefi") return "grub-uefi";
                return null;
            }
            if (_profile.BootMode == "bios")
            {
                if (string.IsNullOrEmpty(_profile.BootloaderPath) || _profile.BootloaderPath == "grub-bios") return "grub-bios";
                return null;
            }
            return null;
        }

        private bool DiskStrategyCommandVisible(string sectionTitle, Command command)
        {
            if (sectionTitle != "Disk Setup") return true;
            if (GetCommandSafetyType(command) != "disk-write") return true;

            // If same OS disk is chosen, allow erase steps only if Erase intent is yes and current OS disk matches target disk.
            if (_profile.InstallTarget == "same-existing")
            {
                bool matches = GetDeviceValue("currentOsDisk") == GetDeviceValue("targetDisk");
                return _profile.EraseIntent == "yes" && matches;
            }

            return _profile.EraseIntent == "yes";
        }

        private bool SwapStrategyCommandVisible(Command command)
        {
            string text = command.CommandText.Trim();
            bool isSwapPartition = text == "mkswap /dev/nvme0n1p3" || text == "swapon /dev/nvme0n1p3";
            if (!isSwapPartition) return true;
            return _profile.SwapStrategy == "partition";
        }

        // ================= SAFETY RULES & GATES =================
        private string GetCommandSafetyType(Command command)
        {
            string text = command.CommandText.Trim();
            if (Regex.IsMatch(text, @"^(cfdisk|fdisk\s+/dev|parted|gdisk|sgdisk|wipefs|mkfs\.|mkswap)\b")) return "disk-write";
            if (Regex.IsMatch(text, @"^(bootctl install|grub-install\b)")) return "bootloader-install";
            if (Regex.IsMatch(text, @"^(passwd|useradd|usermod|gpasswd|chsh|chage|visudo|EDITOR=.*\svisudo)\b")) return "access-change";
            if (Regex.IsMatch(text, @"^(sudo\s+)?systemctl\s+(enable|start|enable\s+--now)\b.*\blightdm\b")) return "access-change";
            if (Regex.IsMatch(text, @"^(sudo\s+)?(ufw|firewall-cmd|nft|iptables|ip6tables|ulimit|htop|top|ps|pstree|pkill|killall|kill)\b")) return "security-privacy";
            if (Regex.IsMatch(text, @"^(sudo\s+)?nano\s+/etc/security/limits\.conf\b")) return "security-privacy";
            if (Regex.IsMatch(text, @"^(sudo\s+)?systemctl\b.*(set-property|CPU|Memory|TasksMax|user-|\.slice|\.service)")) return "security-privacy";
            if (Regex.IsMatch(text, @"^(sudo\s+)?systemctl\s+(enable|start|enable\s+--now)\b.*\bufw\b")) return "security-privacy";
            if (Regex.IsMatch(text, @"^(sudo\s+)?(chsh|usermod)\b.*(-s|--shell)")) return "security-privacy";
            if (Regex.IsMatch(text, @"^(sudo\s+)?pacman\s+-S") || text.StartsWith("pacstrap")) return "package-install";
            if (Regex.IsMatch(text, @"^(sudo\s+)?systemctl\b") || text.StartsWith("bootctl status") || text.StartsWith("bootctl list")) return "service-control";
            if (Regex.IsMatch(text, @"^(nano|sudo\s+nano|EDITOR=.*\bvisudo\b|ln\s+-sf|locale-gen|echo\s+[""']?[A-Z_=$ ]+[""']?$|cat\s+>|genfstab|arch-chroot|mount|swapon)\b"))
            {
                if (text.StartsWith("echo $")) return "safe-inspection";
                return "configuration";
            }
            if (Regex.IsMatch(text, @"^(ls|lsblk|lscpu|lspci|lsusb|rfkill\s+list|fdisk\s+-l|blkid|findmnt|grep|ping|resolvectl|whoami|man|localectl|ip\s|ps\b|pstree\b|journalctl\b|pacman\s+-Q|cat\b|readlink\b|systemctl\s+show|pactl\s+(info|list|get-default|get-sink-mute|get-source-mute)\b|echo\s)")) return "safe-inspection";
            return "normal";
        }

        private string GetCommandSafetyLabel(string type)
        {
            return type switch
            {
                "safe-inspection" => "Safe inspection",
                "configuration" => "Configuration",
                "package-install" => "Package install",
                "service-control" => "Service control",
                "disk-write" => "Disk-write",
                "bootloader-install" => "Bootloader install",
                "access-change" => "Access/login change",
                "security-privacy" => "Security-sensitive",
                _ => "Command"
            };
        }

        private string GetCommandSafetyExplanation(string type)
        {
            return type switch
            {
                "safe-inspection" => "This command reads information only. It will not write or overwrite storage, services, or users.",
                "configuration" => "This command creates or modifies system settings, formats, or mounts. Verify parameters carefully.",
                "package-install" => "This command downloads and installs system packages. Ensure network connectivity is ready.",
                "service-control" => "Starts, enables, or stops services. Confirm unit names before launching.",
                "disk-write" => "Destructive disk operations! CFDisk, formatting, and wiping. Requires Disk Identity confirmation.",
                "bootloader-install" => "Installs startup code. Requires Bootloader Mode match verification.",
                "access-change" => "Changes passwords, logins, or sudo permissions. Lockout risk! Requires Lockdown safety confirmation.",
                "security-privacy" => "Manages firewall, resource quotas, limits, or restricts users. Requires permission checks.",
                _ => "Standard command card. Review word tokens and failures before launching."
            };
        }

        private string GetDeviceValue(string key)
        {
            return _deviceMap.TryGetValue(key, out var item) ? item.Value : string.Empty;
        }

        private bool GetDeviceUnknown(string key)
        {
            return _deviceMap.TryGetValue(key, out var item) && item.Unknown;
        }

        private string GetDestructiveWarning(string type)
        {
            return type switch
            {
                "disk-write" => "⚠️ DESTRUCTIVE STORAGE COMMAND: This partitions, formats, or wipes block storage. Double check your mapped device values against current lsblk output first.",
                "bootloader-install" => "⚠️ BOOT-CRITICAL COMMAND: Modifies EFI boot entries or master boot codes. Ensure boot mode matches.",
                "access-change" => "⚠️ SECURITY-CRITICAL CHANGES: Edits logins or passwords. Ensure you keep a root shell open during testing.",
                _ => string.Empty
            };
        }

        private bool IsCommandBlocked(Command command)
        {
            string safetyType = GetCommandSafetyType(command);
            if (safetyType == "disk-write") return !_safetyGates["diskIdentity"];
            if (safetyType == "bootloader-install") return !_safetyGates["bootloaderMode"];
            if (safetyType == "access-change") return !_safetyGates["lockoutSafety"];
            if (safetyType == "security-privacy") return !_safetyGates["securityPrivacy"];
            return false;
        }

        private string GetBlockedReason(Command command)
        {
            string safetyType = GetCommandSafetyType(command);
            return safetyType switch
            {
                "disk-write" => "This command is blocked until the Disk Identity Safety Gate is confirmed in the reference drawer.",
                "bootloader-install" => "This command is blocked until the Bootloader Mode Safety Gate is confirmed in the reference drawer.",
                "access-change" => "This command is blocked until the Sudo/Lockout Safety Gate is confirmed in the reference drawer.",
                "security-privacy" => "This command is blocked until the Security/Privacy Safety Gate is confirmed in the reference drawer.",
                _ => "Blocked by standard safety rules."
            };
        }

        // ================= PLACEHOLDER SUBSTITUTIONS =================
        private string PersonalizeCommand(string cmdText)
        {
            string targetDisk = GetDeviceValue("targetDisk");
            string efiPart = GetDeviceValue("efiPartition");
            string rootPart = GetDeviceValue("rootPartition");
            string swapPart = GetDeviceValue("swapPartition");

            // Replace whole disks
            if (!string.IsNullOrEmpty(targetDisk) && !GetDeviceUnknown("targetDisk"))
            {
                cmdText = cmdText.Replace("/dev/sda", targetDisk)
                                 .Replace("/dev/nvme0n1", targetDisk);
            }

            // Replace partition structures
            if (!string.IsNullOrEmpty(efiPart) && !GetDeviceUnknown("efiPartition"))
            {
                cmdText = cmdText.Replace("/dev/nvme0n1p1", efiPart)
                                 .Replace("/dev/sda1", efiPart);
            }
            if (!string.IsNullOrEmpty(rootPart) && !GetDeviceUnknown("rootPartition"))
            {
                cmdText = cmdText.Replace("/dev/nvme0n1p2", rootPart)
                                 .Replace("/dev/sda2", rootPart);
            }
            if (!string.IsNullOrEmpty(swapPart) && !GetDeviceUnknown("swapPartition"))
            {
                cmdText = cmdText.Replace("/dev/nvme0n1p3", swapPart)
                                 .Replace("/dev/sda3", swapPart);
            }

            // Text placeholders
            string wifiDevice = GetDeviceValue("wifiDevice");
            string wifiName = GetDeviceValue("wifiName");
            string username = GetDeviceValue("username");
            string hostname = GetDeviceValue("hostname");

            if (!string.IsNullOrEmpty(wifiDevice)) cmdText = cmdText.Replace("wlan0", wifiDevice);
            if (!string.IsNullOrEmpty(wifiName)) cmdText = cmdText.Replace("YourWiFi", wifiName);
            if (!string.IsNullOrEmpty(username)) cmdText = cmdText.Replace("ethan", username);
            if (!string.IsNullOrEmpty(hostname)) cmdText = cmdText.Replace("archbox", hostname);

            return cmdText;
        }

        // ================= DYNAMIC CONTROLS RENDERING =================
        private void SaveDeviceMappingInputs()
        {
            if (WizardStageContainer == null) return;

            foreach (var child in WizardStageContainer.Children)
            {
                if (child is Border card && card.Child is StackPanel fieldsStack)
                {
                    foreach (var element in fieldsStack.Children)
                    {
                        if (element is StackPanel fieldPanel)
                        {
                            var titleBlock = fieldPanel.Children.OfType<TextBlock>().FirstOrDefault(t => t.FontWeight == FontWeight.Bold);
                            var input = fieldPanel.Children.OfType<TextBox>().FirstOrDefault();
                            var chk = fieldPanel.Children.OfType<CheckBox>().FirstOrDefault();

                            if (input != null && titleBlock != null)
                            {
                                string key = input.Tag as string ?? string.Empty;
                                if (!string.IsNullOrEmpty(key))
                                {
                                    bool isUnknown = chk?.IsChecked ?? false;
                                    _deviceMap[key] = new DeviceMapItem
                                    {
                                        Value = isUnknown ? "" : input.Text ?? string.Empty,
                                        Unknown = isUnknown
                                    };
                                }
                            }
                        }
                    }
                }
            }

            // Reset confirmations on mapping changes
            _safetyGates["diskIdentity"] = false;
            _safetyGates["bootloaderMode"] = false;
            _safetyGates["lockoutSafety"] = false;
            _safetyGates["securityPrivacy"] = false;
        }

        private void RenderActiveStep()
        {
            if (WizardStageContainer == null || _currentStepIndex < 0 || _currentStepIndex >= _applicableSteps.Count) return;

            UpdateWizardStepNavigation();
            WizardStageContainer.Children.Clear();

            var step = _applicableSteps[_currentStepIndex];

            // Render different layouts depending on step type
            if (step.Type == "device-mapping")
            {
                RenderDeviceMappingStep(step);
            }
            else if (step.Type == "milestone")
            {
                RenderMilestoneStep(step);
            }
            else if (step.Type == "command")
            {
                RenderCommandStep(step);
            }

            PopulateDrawerPanel(step);
        }

        private void RenderDeviceMappingStep(WizardStep step)
        {
            var header = new StackPanel { Spacing = 6, Margin = new Avalonia.Thickness(0, 0, 0, 16) };
            header.Children.Add(new TextBlock { Text = "Device Mapping", Foreground = new SolidColorBrush(Color.FromRgb(37, 99, 111)), FontSize = 14, FontWeight = FontWeight.Bold });
            header.Children.Add(new TextBlock { Text = step.Title, FontSize = 28, FontWeight = FontWeight.Bold, Foreground = Brushes.White });
            header.Children.Add(new TextBlock { Text = step.Summary, FontSize = 16, Foreground = new SolidColorBrush(Color.FromRgb(138, 153, 160)), TextWrapping = TextWrapping.Wrap });
            WizardStageContainer.Children.Add(header);

            var formCard = new Border { Background = new SolidColorBrush(Color.FromRgb(38, 47, 51)), CornerRadius = new CornerRadius(8), BorderBrush = new SolidColorBrush(Color.FromRgb(51, 63, 68)), BorderThickness = new Avalonia.Thickness(1), Padding = new Avalonia.Thickness(20) };
            var fieldsStack = new StackPanel { Spacing = 16 };

            var keys = new[]
            {
                ("targetDisk", "Target install disk", "The main SSD or USB drive where Arch Linux will be installed (e.g. nvme0n1 or sda)."),
                ("efiPartition", "EFI System Partition", "The partition where the bootloader files are stored (e.g. nvme0n1p1 or sda1)."),
                ("rootPartition", "Root partition", "The partition that will hold the main Linux operating system files (e.g. nvme0n1p2 or sda2)."),
                ("swapPartition", "Swap partition (Optional)", "Only required if you chose the Swap Partition strategy. Otherwise, leave blank (e.g. nvme0n1p3)."),
                ("currentOsDisk", "Current OS disk (Optional)", "Only required for same-disk erase path to verify you are not erasing the wrong disk."),
                ("wifiDevice", "Wi-Fi device name (Optional)", "Only required for Wi-Fi setups (e.g. wlan0)."),
                ("wifiName", "Wi-Fi SSID / Network Name (Optional)", "Your wireless network name."),
                ("username", "New user account username", "The primary non-root username to create (e.g. your name)."),
                ("hostname", "System Hostname", "The name of this computer on the network (e.g. archbox).")
            };

            foreach (var (key, title, help) in keys)
            {
                var fieldPanel = new StackPanel { Spacing = 6 };
                var map = _deviceMap[key];

                var labelPanel = new StackPanel { Orientation = Orientation.Horizontal, Spacing = 10 };
                labelPanel.Children.Add(new TextBlock { Text = title, FontWeight = FontWeight.Bold, FontSize = 15, Foreground = Brushes.White });
                labelPanel.Children.Add(new TextBlock { Text = help, FontSize = 13, Foreground = new SolidColorBrush(Color.FromRgb(138, 153, 160)), VerticalAlignment = VerticalAlignment.Center });
                fieldPanel.Children.Add(labelPanel);

                var input = new TextBox { Tag = key, Text = map.Value, HorizontalAlignment = HorizontalAlignment.Stretch, IsEnabled = !map.Unknown };
                fieldPanel.Children.Add(input);

                var chk = new CheckBox { Content = "I do not know my device name", IsChecked = map.Unknown, Tag = key };
                chk.IsCheckedChanged += (s, ev) =>
                {
                    if (s is CheckBox c && c.Tag is string k)
                    {
                        input.IsEnabled = !(c.IsChecked ?? false);
                        if (c.IsChecked ?? false) input.Text = "";
                    }
                };
                fieldPanel.Children.Add(chk);

                fieldsStack.Children.Add(fieldPanel);
            }

            formCard.Child = fieldsStack;
            WizardStageContainer.Children.Add(formCard);
        }

        private void RenderMilestoneStep(WizardStep step)
        {
            var header = new StackPanel { Spacing = 6, Margin = new Avalonia.Thickness(0, 0, 0, 16) };
            header.Children.Add(new TextBlock { Text = $"{step.SectionTitle} Milestone", Foreground = new SolidColorBrush(Color.FromRgb(37, 99, 111)), FontSize = 14, FontWeight = FontWeight.Bold });
            header.Children.Add(new TextBlock { Text = step.Title, FontSize = 28, FontWeight = FontWeight.Bold, Foreground = Brushes.White });
            header.Children.Add(new TextBlock { Text = step.Summary, FontSize = 16, Foreground = new SolidColorBrush(Color.FromRgb(138, 153, 160)), TextWrapping = TextWrapping.Wrap });
            WizardStageContainer.Children.Add(header);

            var listPanel = new StackPanel { Spacing = 16 };

            // Goals / Explanatory Blocks
            if (step.Blocks != null)
            {
                foreach (var block in step.Blocks)
                {
                    var blockCard = new Border { Background = new SolidColorBrush(Color.FromRgb(38, 47, 51)), CornerRadius = new CornerRadius(6), Padding = new Avalonia.Thickness(16) };
                    var stack = new StackPanel { Spacing = 6 };
                    stack.Children.Add(new TextBlock { Text = block.Title, FontSize = 16, FontWeight = FontWeight.Bold, Foreground = Brushes.White });
                    stack.Children.Add(new TextBlock { Text = block.Text, FontSize = 15, Foreground = new SolidColorBrush(Color.FromRgb(203, 213, 217)), TextWrapping = TextWrapping.Wrap });
                    blockCard.Child = stack;
                    listPanel.Children.Add(blockCard);
                }
            }

            // Warnings
            if (step.Warnings != null)
            {
                foreach (var warn in step.Warnings)
                {
                    var warnCard = new Border { Background = new SolidColorBrush(Color.FromArgb(30, 157, 73, 50)), BorderBrush = new SolidColorBrush(Color.FromRgb(157, 73, 50)), BorderThickness = new Avalonia.Thickness(1), CornerRadius = new CornerRadius(6), Padding = new Avalonia.Thickness(16) };
                    var stack = new StackPanel { Spacing = 6 };
                    stack.Children.Add(new TextBlock { Text = $"⚠️ {warn.Title}", FontSize = 16, FontWeight = FontWeight.Bold, Foreground = new SolidColorBrush(Color.FromRgb(157, 73, 50)) });
                    stack.Children.Add(new TextBlock { Text = warn.Text, FontSize = 15, Foreground = new SolidColorBrush(Color.FromRgb(203, 213, 217)), TextWrapping = TextWrapping.Wrap });
                    warnCard.Child = stack;
                    listPanel.Children.Add(warnCard);
                }
            }

            // Checkpoints
            if (step.Checkpoints != null)
            {
                foreach (var cp in step.Checkpoints)
                {
                    var cpCard = new Border { Background = new SolidColorBrush(Color.FromArgb(30, 94, 116, 69)), BorderBrush = new SolidColorBrush(Color.FromRgb(94, 116, 69)), BorderThickness = new Avalonia.Thickness(1), CornerRadius = new CornerRadius(6), Padding = new Avalonia.Thickness(16) };
                    var stack = new StackPanel { Spacing = 6 };
                    stack.Children.Add(new TextBlock { Text = $"✓ {cp.Title}", FontSize = 16, FontWeight = FontWeight.Bold, Foreground = new SolidColorBrush(Color.FromRgb(94, 116, 69)) });
                    stack.Children.Add(new TextBlock { Text = cp.Text, FontSize = 15, Foreground = new SolidColorBrush(Color.FromRgb(203, 213, 217)), TextWrapping = TextWrapping.Wrap });
                    cpCard.Child = stack;
                    listPanel.Children.Add(cpCard);
                }
            }

            WizardStageContainer.Children.Add(listPanel);
        }

        private void RenderCommandStep(WizardStep step)
        {
            var command = step.Command;
            if (command == null) return;

            var header = new StackPanel { Spacing = 6, Margin = new Avalonia.Thickness(0, 0, 0, 16) };
            header.Children.Add(new TextBlock { Text = step.SectionTitle, Foreground = new SolidColorBrush(Color.FromRgb(37, 99, 111)), FontSize = 14, FontWeight = FontWeight.Bold });
            header.Children.Add(new TextBlock { Text = step.Title, FontSize = 28, FontWeight = FontWeight.Bold, Foreground = Brushes.White });
            header.Children.Add(new TextBlock { Text = step.Summary, FontSize = 16, Foreground = new SolidColorBrush(Color.FromRgb(138, 153, 160)), TextWrapping = TextWrapping.Wrap });
            WizardStageContainer.Children.Add(header);

            string safetyType = GetCommandSafetyType(command);
            bool isBlocked = IsCommandBlocked(command);

            // Destructive / Critical Warnings
            string warningMessage = GetDestructiveWarning(safetyType);
            if (!string.IsNullOrEmpty(warningMessage))
            {
                var warnBorder = new Border { Background = new SolidColorBrush(Color.FromArgb(30, 157, 73, 50)), BorderBrush = new SolidColorBrush(Color.FromRgb(157, 73, 50)), BorderThickness = new Avalonia.Thickness(1), CornerRadius = new CornerRadius(6), Padding = new Avalonia.Thickness(12) };
                warnBorder.Child = new TextBlock { Text = warningMessage, FontSize = 14, FontWeight = FontWeight.Bold, Foreground = new SolidColorBrush(Color.FromRgb(157, 73, 50)), TextWrapping = TextWrapping.Wrap };
                WizardStageContainer.Children.Add(warnBorder);
            }

            var card = new Border { Background = new SolidColorBrush(Color.FromRgb(38, 47, 51)), CornerRadius = new CornerRadius(8), BorderBrush = new SolidColorBrush(Color.FromRgb(51, 63, 68)), BorderThickness = new Avalonia.Thickness(1), Padding = new Avalonia.Thickness(20) };
            var stack = new StackPanel { Spacing = 16 };

            // Badge Row
            var badgeRow = new Grid { ColumnDefinitions = new ColumnDefinitions("*,Auto") };
            var labelStack = new StackPanel { Orientation = Orientation.Horizontal, Spacing = 10 };
            labelStack.Children.Add(new TextBlock { Text = GetCommandSafetyLabel(safetyType), FontWeight = FontWeight.Bold, Foreground = new SolidColorBrush(Color.FromRgb(37, 99, 111)), FontSize = 14, VerticalAlignment = VerticalAlignment.Center });
            badgeRow.Children.Add(labelStack);
            stack.Children.Add(badgeRow);

            if (isBlocked)
            {
                var blockedBorder = new Border { Background = new SolidColorBrush(Color.FromArgb(20, 157, 73, 50)), CornerRadius = new CornerRadius(6), Padding = new Avalonia.Thickness(16) };
                var blockedStack = new StackPanel { Spacing = 8 };
                blockedStack.Children.Add(new TextBlock { Text = "🔒 Command Locked Due to Safety Policy", FontSize = 16, FontWeight = FontWeight.Bold, Foreground = new SolidColorBrush(Color.FromRgb(157, 73, 50)) });
                blockedStack.Children.Add(new TextBlock { Text = GetBlockedReason(command), FontSize = 15, Foreground = new SolidColorBrush(Color.FromRgb(203, 213, 217)), TextWrapping = TextWrapping.Wrap });
                blockedBorder.Child = blockedStack;
                stack.Children.Add(blockedBorder);
            }
            else
            {
                // Monospace Command Box
                var cmdBox = new Grid { ColumnDefinitions = new ColumnDefinitions("*,Auto") };
                string personalizedCommand = PersonalizeCommand(command.CommandText);

                var codeTextBox = new TextBox
                {
                    Text = personalizedCommand,
                    FontFamily = new FontFamily("Courier New, monospace"),
                    FontSize = 16,
                    Background = new SolidColorBrush(Color.FromRgb(22, 26, 28)),
                    Foreground = new SolidColorBrush(Color.FromRgb(94, 141, 147)),
                    IsReadOnly = true,
                    BorderThickness = new Avalonia.Thickness(0),
                    Padding = new Avalonia.Thickness(12)
                };
                cmdBox.Children.Add(codeTextBox);

                var copyBtn = new Button { Content = "Copy", Classes = { "primary" }, Height = 40, VerticalAlignment = VerticalAlignment.Stretch, Margin = new Avalonia.Thickness(8, 0, 0, 0) };
                copyBtn.Click += async (s, ev) =>
                {
                    var clipboard = TopLevel.GetTopLevel(this)?.Clipboard;
                    if (clipboard != null)
                    {
                        await clipboard.SetTextAsync(personalizedCommand);
                        copyBtn.Content = "Copied!";
                        await Task.Delay(1500);
                        copyBtn.Content = "Copy";
                    }
                };
                Grid.SetColumn(copyBtn, 1);
                cmdBox.Children.Add(copyBtn);

                var codeBorder = new Border { Background = new SolidColorBrush(Color.FromRgb(22, 26, 28)), CornerRadius = new CornerRadius(4), BorderBrush = new SolidColorBrush(Color.FromRgb(51, 63, 68)), BorderThickness = new Avalonia.Thickness(1) };
                codeBorder.Child = cmdBox;
                stack.Children.Add(codeBorder);
            }

            // Command Explanation Details Grid
            var grid = new UniformGrid { Columns = 2, Rows = 2 };

            // Box 1: Purpose
            var box1 = CreateDetailBox("What this command does", command.Purpose);
            grid.Children.Add(box1);

            // Box 2: Verbatim Mappings
            var box2 = new Border { BorderBrush = new SolidColorBrush(Color.FromRgb(51, 63, 68)), BorderThickness = new Avalonia.Thickness(1), Padding = new Avalonia.Thickness(12), Margin = new Avalonia.Thickness(6) };
            var box2Stack = new StackPanel { Spacing = 6 };
            box2Stack.Children.Add(new TextBlock { Text = "Command pieces", FontWeight = FontWeight.Bold, FontSize = 14, Foreground = Brushes.White });
            var wordsPanel = new StackPanel { Spacing = 4 };
            foreach (var wordPair in command.Words)
            {
                if (wordPair.Count >= 2)
                {
                    string word = PersonalizeCommand(wordPair[0]);
                    string meaning = wordPair[1];
                    wordsPanel.Children.Add(new TextBlock
                    {
                        Text = $"• {word}: {meaning}",
                        FontSize = 13,
                        TextWrapping = TextWrapping.Wrap,
                        Foreground = new SolidColorBrush(Color.FromRgb(203, 213, 217))
                    });
                }
            }
            box2Stack.Children.Add(wordsPanel);
            box2.Child = box2Stack;
            grid.Children.Add(box2);

            // Box 3: Expected Success
            var box3 = CreateDetailBox("Success looks like", command.Expected);
            grid.Children.Add(box3);

            // Box 4: Danger/Fails info
            var box4 = CreateDetailBox("Failure or danger looks like", command.Fails);
            grid.Children.Add(box4);

            grid.Margin = new Avalonia.Thickness(0, 0, 0, 10);
            stack.Children.Add(grid);

            // Render Flag explanations if flags exist
            var options = GetCommandOptionTokens(command.CommandText);
            if (options.Count > 0)
            {
                var flagsCard = new Border { Background = new SolidColorBrush(Color.FromRgb(28, 35, 38)), BorderBrush = new SolidColorBrush(Color.FromRgb(51, 63, 68)), BorderThickness = new Avalonia.Thickness(1), CornerRadius = new CornerRadius(6), Padding = new Avalonia.Thickness(12), Margin = new Avalonia.Thickness(0, 0, 0, 10) };
                var flagsStack = new StackPanel { Spacing = 6 };
                flagsStack.Children.Add(new TextBlock { Text = "Flags and options", FontWeight = FontWeight.Bold, FontSize = 14, Foreground = Brushes.White });
                foreach (var opt in options)
                {
                    string exp = OptionExplanations.TryGetValue(opt, out var ex) ? ex : "Dash-prefixed option or argument flag. Refer to command manuals for details.";
                    flagsStack.Children.Add(new TextBlock { Text = $"• {opt}: {exp}", FontSize = 13, TextWrapping = TextWrapping.Wrap, Foreground = new SolidColorBrush(Color.FromRgb(203, 213, 217)) });
                }
                flagsCard.Child = flagsStack;
                stack.Children.Add(flagsCard);
            }

            // Render Absolute Paths explanations if paths exist
            var paths = GetCommandPathTokens(command.CommandText);
            if (paths.Count > 0)
            {
                var pathsCard = new Border { Background = new SolidColorBrush(Color.FromRgb(28, 35, 38)), BorderBrush = new SolidColorBrush(Color.FromRgb(51, 63, 68)), BorderThickness = new Avalonia.Thickness(1), CornerRadius = new CornerRadius(6), Padding = new Avalonia.Thickness(12), Margin = new Avalonia.Thickness(0, 0, 0, 10) };
                var pathsStack = new StackPanel { Spacing = 6 };
                pathsStack.Children.Add(new TextBlock { Text = "Paths as data", FontWeight = FontWeight.Bold, FontSize = 14, Foreground = Brushes.White });
                foreach (var p in paths)
                {
                    string exp = GetPathExplanation(p);
                    pathsStack.Children.Add(new TextBlock { Text = $"• {p}: {exp}", FontSize = 13, TextWrapping = TextWrapping.Wrap, Foreground = new SolidColorBrush(Color.FromRgb(203, 213, 217)) });
                }
                pathsCard.Child = pathsStack;
                stack.Children.Add(pathsCard);
            }

            // Render Normal Silence Explanation
            var silenceCard = new Border { Background = new SolidColorBrush(Color.FromRgb(28, 35, 38)), BorderBrush = new SolidColorBrush(Color.FromRgb(51, 63, 68)), BorderThickness = new Avalonia.Thickness(1), CornerRadius = new CornerRadius(6), Padding = new Avalonia.Thickness(12), Margin = new Avalonia.Thickness(0, 0, 0, 10) };
            var silenceStack = new StackPanel { Spacing = 6 };
            silenceStack.Children.Add(new TextBlock { Text = "Normal silence means", FontWeight = FontWeight.Bold, FontSize = 14, Foreground = Brushes.White });
            silenceStack.Children.Add(new TextBlock { Text = GetNormalSilenceExplanation(command), FontSize = 13, TextWrapping = TextWrapping.Wrap, Foreground = new SolidColorBrush(Color.FromRgb(203, 213, 217)) });
            silenceCard.Child = silenceStack;
            stack.Children.Add(silenceCard);

            // Render Failure split Recovery Explanation
            var failSplit = SplitFailureExplanation(command.Fails);
            var recoveryCard = new Border { Background = new SolidColorBrush(Color.FromRgb(28, 35, 38)), BorderBrush = new SolidColorBrush(Color.FromRgb(51, 63, 68)), BorderThickness = new Avalonia.Thickness(1), CornerRadius = new CornerRadius(6), Padding = new Avalonia.Thickness(12) };
            var recoveryStack = new StackPanel { Spacing = 6 };
            recoveryStack.Children.Add(new TextBlock { Text = "Failure recovery actions", FontWeight = FontWeight.Bold, FontSize = 14, Foreground = Brushes.White });
            recoveryStack.Children.Add(new TextBlock { Text = $"Meaning: {failSplit.Meaning}", FontSize = 13, TextWrapping = TextWrapping.Wrap, Foreground = new SolidColorBrush(Color.FromRgb(203, 213, 217)) });
            recoveryStack.Children.Add(new TextBlock { Text = $"What to do next: {failSplit.Recovery}", FontSize = 13, TextWrapping = TextWrapping.Wrap, Foreground = new SolidColorBrush(Color.FromRgb(203, 213, 217)) });
            recoveryCard.Child = recoveryStack;
            stack.Children.Add(recoveryCard);

            card.Child = stack;
            WizardStageContainer.Children.Add(card);
        }

        private Border CreateDetailBox(string title, string body)
        {
            var border = new Border { BorderBrush = new SolidColorBrush(Color.FromRgb(51, 63, 68)), BorderThickness = new Avalonia.Thickness(1), Padding = new Avalonia.Thickness(12), Margin = new Avalonia.Thickness(6) };
            var stack = new StackPanel { Spacing = 6 };
            stack.Children.Add(new TextBlock { Text = title, FontWeight = FontWeight.Bold, FontSize = 14, Foreground = Brushes.White });
            stack.Children.Add(new TextBlock { Text = body, FontSize = 13, Foreground = new SolidColorBrush(Color.FromRgb(203, 213, 217)), TextWrapping = TextWrapping.Wrap });
            border.Child = stack;
            return border;
        }

        // ================= THEORY & REFERENCE DRAWER =================
        private void PopulateDrawerPanel(WizardStep step)
        {
            if (DrawerContentContainer == null) return;
            DrawerContentContainer.Children.Clear();

            // 1. Context Explanation
            if (!string.IsNullOrEmpty(step.SectionExplainText))
            {
                var block = new StackPanel { Spacing = 6 };
                block.Children.Add(new TextBlock { Text = "General Context", FontSize = 15, FontWeight = FontWeight.Bold, Foreground = Brushes.White });
                block.Children.Add(new TextBlock { Text = step.SectionExplainText, FontSize = 14, Foreground = new SolidColorBrush(Color.FromRgb(203, 213, 217)), TextWrapping = TextWrapping.Wrap });
                DrawerContentContainer.Children.Add(block);
            }

            // 2. Safety Gates Panel
            RenderSafetyGatesPanel();

            // 3. Glossary terms for this step
            if (step.SectionTerms != null && step.SectionTerms.Count > 0 && _glossaryDb != null)
            {
                var termHeader = new TextBlock { Text = "📚 Glossary Definitions", FontSize = 15, FontWeight = FontWeight.Bold, Foreground = Brushes.White, Margin = new Avalonia.Thickness(0, 10, 0, 0) };
                DrawerContentContainer.Children.Add(termHeader);

                var termsStack = new StackPanel { Spacing = 10 };
                foreach (var termName in step.SectionTerms)
                {
                    if (_glossaryDb.Glossary.TryGetValue(termName, out var meaning))
                    {
                        var border = new Border { Background = new SolidColorBrush(Color.FromRgb(38, 47, 51)), CornerRadius = new CornerRadius(4), Padding = new Avalonia.Thickness(10) };
                        var vstack = new StackPanel { Spacing = 4 };

                        var linkBtn = new Button { Content = termName, Background = Brushes.Transparent, BorderThickness = new Avalonia.Thickness(0), Padding = new Avalonia.Thickness(0), Foreground = new SolidColorBrush(Color.FromRgb(37, 99, 111)), FontWeight = FontWeight.Bold, FontSize = 14 };
                        linkBtn.Click += (s, ev) => OpenGlossaryModal(termName);
                        vstack.Children.Add(linkBtn);

                        vstack.Children.Add(new TextBlock { Text = meaning, FontSize = 13, Foreground = new SolidColorBrush(Color.FromRgb(203, 213, 217)), TextWrapping = TextWrapping.Wrap });
                        border.Child = vstack;
                        termsStack.Children.Add(border);
                    }
                }
                DrawerContentContainer.Children.Add(termsStack);
            }

            // 4. Source manuals list
            if (step.Sources != null && step.Sources.Count > 0)
            {
                var sourceHeader = new TextBlock { Text = "🔗 References & Manuals", FontSize = 15, FontWeight = FontWeight.Bold, Foreground = Brushes.White, Margin = new Avalonia.Thickness(0, 10, 0, 0) };
                DrawerContentContainer.Children.Add(sourceHeader);

                var sourceStack = new StackPanel { Spacing = 8 };
                foreach (var source in step.Sources)
                {
                    var sourceBorder = new Border { BorderBrush = new SolidColorBrush(Color.FromRgb(51, 63, 68)), BorderThickness = new Avalonia.Thickness(1), CornerRadius = new CornerRadius(4), Padding = new Avalonia.Thickness(10) };
                    var sstack = new StackPanel { Spacing = 4 };
                    sstack.Children.Add(new TextBlock { Text = source.Label, FontSize = 14, FontWeight = FontWeight.Bold, Foreground = Brushes.White });
                    sstack.Children.Add(new TextBlock { Text = source.Note, FontSize = 13, Foreground = new SolidColorBrush(Color.FromRgb(138, 153, 160)), TextWrapping = TextWrapping.Wrap });

                    // Append wiki keys if applicable
                    var match = Regex.Match(source.Url, @"^https://wiki\.archlinux\.org/title/([^#?]+)");
                    if (match.Success)
                    {
                        string wikiKey = Uri.UnescapeDataString(match.Groups[1].Value);
                        sstack.Children.Add(new TextBlock { Text = $"Offline key: {wikiKey}", FontSize = 12, Foreground = new SolidColorBrush(Color.FromRgb(37, 99, 111)), FontWeight = FontWeight.Bold });
                    }

                    sourceBorder.Child = sstack;
                    sourceStack.Children.Add(sourceBorder);
                }
                DrawerContentContainer.Children.Add(sourceStack);
            }
        }

        private void OpenGlossaryModal(string termName)
        {
            if (_glossaryDb == null) return;
            if (_glossaryDb.Glossary.TryGetValue(termName, out var meaning))
            {
                ModalTitle.Text = termName;
                string details = $"Meaning:\n{meaning}\n\n";

                if (_glossaryDb.GlossaryDetails.TryGetValue(termName, out var detail))
                {
                    details += $"Where it appears:\n{detail.Appears}\n\n";
                    details += $"Example usage:\n{detail.Example}\n\n";
                    details += $"Safety information:\n{detail.Safety}";
                }

                ModalBody.Text = details;
                ModalOverlay.IsVisible = true;
            }
        }

        private void RenderSafetyGatesPanel()
        {
            if (DrawerContentContainer == null) return;

            var safetyCard = new Border { Background = new SolidColorBrush(Color.FromRgb(38, 47, 51)), CornerRadius = new CornerRadius(6), BorderBrush = new SolidColorBrush(Color.FromRgb(51, 63, 68)), BorderThickness = new Avalonia.Thickness(1), Padding = new Avalonia.Thickness(12), Margin = new Avalonia.Thickness(0, 10, 0, 0) };
            var safetyStack = new StackPanel { Spacing = 10 };
            safetyStack.Children.Add(new TextBlock { Text = "🔒 Safety Gates Checklist", FontSize = 15, FontWeight = FontWeight.Bold, Foreground = Brushes.White });

            var gates = new[]
            {
                ("diskIdentity", "Disk Identity verified", "Ensure you mapped the target SSD correctly and verified disk partitions under lsblk before writing."),
                ("bootloaderMode", "Bootloader Mode match", "Check UEFI vs legacy BIOS. Commands for UEFI (systemd-boot) must not be mixed with legacy GRUB."),
                ("lockoutSafety", "Sudo Lockout prevention", "Verify username details. Avoid changes that block user login or administrator access."),
                ("securityPrivacy", "Security & Privacy boundary", "Firewall policies, PAM limits, cgroup configs. Apply only to systems you are authorized to manage.")
            };

            foreach (var (key, title, help) in gates)
            {
                var row = new StackPanel { Spacing = 4 };
                var chk = new CheckBox { Content = title, IsChecked = _safetyGates[key], FontSize = 14, FontWeight = FontWeight.Bold };
                chk.IsCheckedChanged += (s, ev) =>
                {
                    _safetyGates[key] = chk.IsChecked ?? false;
                    RenderActiveStep(); // Refresh active command blocks to unlock/lock
                };
                row.Children.Add(chk);
                row.Children.Add(new TextBlock { Text = help, FontSize = 12, Foreground = new SolidColorBrush(Color.FromRgb(138, 153, 160)), TextWrapping = TextWrapping.Wrap, Margin = new Avalonia.Thickness(28, 0, 0, 0) });
                safetyStack.Children.Add(row);
            }

            safetyCard.Child = safetyStack;
            DrawerContentContainer.Children.Add(safetyCard);
        }

        // ================= HELPERS FOR DETAILED COMMAND PARSING =================
        private static readonly Dictionary<string, string> OptionExplanations = new()
        {
            { "-A3", "grep option meaning print 3 lines after each matching line, so related device-driver context appears with the match." },
            { "-F", "mkfs.fat option meaning FAT size. In mkfs.fat -F 32, it creates a FAT32 filesystem." },
            { "-G", "useradd option meaning add the new user to supplementary groups listed after the option." },
            { "-K", "pacstrap option meaning initialize a fresh pacman keyring in the new target system." },
            { "-KILL", "kill signal argument meaning send SIGKILL, the force-kill signal that the process cannot handle or clean up from." },
            { "-Q", "pacman query option meaning inspect installed package database instead of installing packages." },
            { "-Qo", "pacman query-owner option meaning find which installed package owns a file path." },
            { "-R", "umount option meaning recursive, so nested mounts under the target mount point are unmounted too." },
            { "-S", "pacman sync/install option meaning install packages from enabled repositories." },
            { "-Syu", "pacman combined sync/update options: -S selects repository sync mode, y refreshes package databases, and u upgrades installed packages." },
            { "-TERM", "kill signal argument meaning send SIGTERM, a normal terminate request that gives the process a chance to exit cleanly." },
            { "-U", "genfstab option meaning write filesystem identifiers as UUIDs instead of unstable device names." },
            { "-ap", "pstree combined options: -a shows command arguments and -p shows process IDs." },
            { "-apu", "pstree combined options: -a shows command arguments, -p shows process IDs, and -u shows user changes." },
            { "-c", "count option. For ping, -c 3 means stop after 3 packets instead of running forever." },
            { "-d", "duration option. For arecord, -d 5 means record for 5 seconds." },
            { "-e", "ps option meaning show every process." },
            { "-E", "grep option meaning extended regular expression syntax." },
            { "-eo", "ps combined options: -e selects every process and -o chooses the output columns." },
            { "-k", "lspci option meaning show kernel drivers handling each PCI device." },
            { "-l", "list or long-format option, depending on the command. Read the command card and official source for the exact command-specific meaning." },
            { "-lh", "ls combined options: -l uses long listing format and -h makes sizes human-readable." },
            { "-m", "useradd option meaning create the user's home directory." },
            { "-n", "journalctl option meaning show only the requested number of recent log lines." },
            { "-o", "output option. It selects an output format or column list for commands such as lsblk, blkid, ps, or grub-mkconfig." },
            { "-p", "select-by-property option. For ps or systemctl show, it selects the process ID or property name listed after it." },
            { "-s", "selector option. Its exact meaning depends on the command, such as selecting a UUID field in blkid or selecting a shell in useradd/chsh." },
            { "-sf", "ln combined options: -s creates a symbolic link and -f replaces an existing destination if needed." },
            { "-u", "user option. It filters or targets a user for commands such as ps, pkill, or journalctl." },
            { "-v", "invert-match option for grep, meaning show lines that do not match." },
            { "--bootloader-id=GRUB", "grub-install option setting the UEFI bootloader identifier/name to GRUB." },
            { "--efi-directory=/boot", "grub-install option telling GRUB where the EFI System Partition is mounted." },
            { "--no-headers", "ps option hiding the header row so counts and scripts receive only process rows." },
            { "--now", "systemctl option meaning start the unit immediately while also applying the requested enable action." },
            { "--show", "swapon option meaning list active swap devices instead of enabling a new one." },
            { "--sort=ppid", "ps option sorting the output by parent process ID." },
            { "--systohc", "hwclock option meaning write the current system clock into the hardware clock." },
            { "--target=i386-pc", "grub-install option selecting the legacy BIOS GRUB target." },
            { "--target=x86_64-efi", "grub-install option selecting the 64-bit UEFI GRUB target." },
            { "--user", "systemctl option meaning operate on the current user's systemd manager instead of the system manager." }
        };

        private static List<string> GetCommandOptionTokens(string commandText)
        {
            return commandText
                .Split(new[] { ' ', '\t' }, StringSplitOptions.RemoveEmptyEntries)
                .Select(token => token.Trim().Trim('(', ')', '\'', '"', '`', ','))
                .Where(token => Regex.IsMatch(token, @"^-{1,2}[A-Za-z0-9]"))
                .Distinct()
                .ToList();
        }

        private static List<string> GetCommandPathTokens(string commandText)
        {
            var matches = Regex.Matches(commandText, @"(?:^|[\s=:])/([A-Za-z0-9._@%+/-]+)");
            return matches.Cast<Match>()
                .Select(m => m.Groups[1].Value.Trim().Trim('=', ':').Trim(')', ','))
                .Select(p => "/" + p)
                .Distinct()
                .ToList();
        }

        private static string GetPathExplanation(string path)
        {
            if (path.StartsWith("/dev/"))
            {
                return "Device path. This points to hardware or a partition exposed by Linux. Treat it as machine-specific data from discovery output, not magic text to copy from an example.";
            }
            if (path == "/mnt" || path.StartsWith("/mnt/"))
            {
                return "Temporary install mount path. During installation, /mnt is where the new Arch system is attached before pacstrap, fstab generation, and chroot work.";
            }
            if (path == "/boot" || path.StartsWith("/boot/"))
            {
                return "Boot-files path inside the installed system. It contains kernel, initramfs, bootloader, or EFI-related files depending on the selected boot path.";
            }
            if (path.StartsWith("/etc/systemd/"))
            {
                return "System configuration path for systemd. Files here affect services, units, slices, or drop-ins on the installed system.";
            }
            if (path.StartsWith("/etc/security/"))
            {
                return "Security/login configuration path. Files here can affect PAM limits and user sessions, so edits must be exact and recoverable.";
            }
            if (path.StartsWith("/etc/"))
            {
                return "System configuration path. Files under /etc change installed-system behavior such as locale, hostname, mounts, shells, or service configuration.";
            }
            if (path.StartsWith("/sys/"))
            {
                return "Kernel-provided evidence path. This is not a normal file to edit; it exposes live system/firmware information for inspection.";
            }
            if (path.StartsWith("/usr/share/zoneinfo/"))
            {
                return "Time zone data path. This points to an installed time zone file used when linking /etc/localtime.";
            }
            if (path == "/bin/bash" || path == "/bin/rbash")
            {
                return "Shell program path. This names the login shell executable assigned to a user account.";
            }
            if (path == "/path/to/command")
            {
                return "Placeholder file path. Replace it with the real command path before using the command.";
            }
            if (path == "/vmlinuz-linux" || path == "/initramfs-linux.img" || path == "/intel-ucode.img" || path == "/amd-ucode.img")
            {
                return "Boot entry path relative to the boot partition. In a systemd-boot entry, this tells the bootloader which kernel, initramfs, or microcode file to load.";
            }
            return "Absolute filesystem path. It starts at /, the root of the Linux filesystem. Verify whether this path is a fixed system location or a value specific to this machine before using it.";
        }

        private static string GetNormalSilenceExplanation(Command command)
        {
            string expected = command.Expected.ToLower();
            if (Regex.IsMatch(expected, @"(no output|usually no output|prints nothing|no text|silent|without an error|without error|returns without an error)"))
            {
                return "Silence or a return to the prompt can be normal for this command, but only when the command's expected-result text says that no output or no error is the success signal.";
            }
            if (Regex.IsMatch(command.CommandText.Trim(), @"^(nano|sudo\s+nano|editor=.*visudo|htop|pavucontrol|firefox|xfce4-terminal)\b", RegexOptions.IgnoreCase))
            {
                return "This command opens an interactive program or editor. Normal success may be a screen change, editor window, graphical app, or prompt inside that program instead of a simple printed line.";
            }
            return "Plain silence is not the main success signal for this command. If nothing appears, compare that behavior with the expected-result text and do not assume success until the next verification command confirms it.";
        }

        private static (string Meaning, string Recovery) SplitFailureExplanation(string fails)
        {
            var parts = Regex.Split(fails, @"(?<=[.!?])\s+")
                .Select(p => p.Trim())
                .Where(p => !string.IsNullOrEmpty(p))
                .ToList();

            if (parts.Count <= 1)
            {
                return ("This means the command did not produce the expected result, or the visible result is not enough evidence to safely continue.", fails);
            }
            return (parts[0], string.Join(" ", parts.Skip(1)));
        }
    }

    // Helper model for wizard steps
    public class WizardStep
    {
        public string Type { get; set; } = string.Empty; // "device-mapping", "milestone", "command"
        public string Title { get; set; } = string.Empty;
        public string Summary { get; set; } = string.Empty;
        public string SectionTitle { get; set; } = string.Empty;
        public string SectionExplainText { get; set; } = string.Empty;
        public List<string> SectionTerms { get; set; } = new();
        public List<Source> Sources { get; set; } = new();

        // Milestone-specific fields
        public List<Block> Blocks { get; set; } = new();
        public List<Block> Warnings { get; set; } = new();
        public List<Block> Checkpoints { get; set; } = new();

        // Command-specific fields
        public Command? Command { get; set; }
    }
}