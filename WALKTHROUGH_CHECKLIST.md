# Arch Walkthrough Production Checklist

This checklist tracks the work needed to turn the current prototype into a serious, source-backed Arch setup walkthrough. Work one section at a time. Do not mark an item complete until the acceptance check is satisfied.

## Documentation Precision Standard

This app is for users who may not know what they are doing yet. The goal is not just to give them commands. The goal is for the user to understand, in textbook detail, exactly what they are typing, what it changes, and what result proves it worked.

Every walkthrough page must follow these rules:

- [ ] Treat every page/card as standalone.
  - Acceptance: no page assumes the user remembers an explanation from a previous page. If `ls`, `sudo`, `/mnt`, `nano`, `UUID=`, or any other term appears again, it is explained again on that page.

- [ ] Repeat explanations every time a command appears.
  - Acceptance: repeated commands are not allowed to say "as explained earlier." If `sudo pacman -S firefox` appears on a later page, `sudo`, `pacman`, `-S`, and `firefox` are explained again there.

- [ ] Repeat character-level explanations every time fragile syntax appears.
  - Acceptance: fragile syntax such as `/`, `-`, `--`, `=`, `:`, `"` quotes, `>` redirection, `>>` append redirection, `#` comments, spaces, device suffixes, and `UUID=...` is re-explained wherever it appears.

- [ ] Show every typed command exactly.
  - Acceptance: no instruction says "run the usual command" or "edit the file accordingly" without showing the exact text to type.

- [ ] Explain every command word.
  - Acceptance: each command has a word-by-word map. Example: `ls /mnt` must explain that `ls` means list and `/mnt` is the directory being listed.

- [ ] Explain command combinations.
  - Acceptance: the app explains how individual pieces combine into the command's meaning. Example: `ls` means list, `/mnt` means the `/mnt` directory, so `ls /mnt` means list what is inside `/mnt`.

- [ ] Explain flags and options individually.
  - Acceptance: every option such as `-l`, `-h`, `-R`, `-S`, `-U`, `--now`, and `--target=x86_64-efi` has its own explanation.

- [ ] Explain paths as data, not magic text.
  - Acceptance: every path such as `/mnt`, `/boot`, `/etc/fstab`, `/dev/nvme0n1p2`, and `/sys/firmware/efi/efivars` explains what the path points to and whether it is an example or a real user-specific value.

- [ ] Show full file contents for file edits.
  - Acceptance: if the user must create or edit a file in `nano`, the app shows the full intended file contents, not a summary. If the file is 60 lines, all 60 lines are shown.

- [ ] Explain file contents line by line.
  - Acceptance: every configuration file line has an explanation of what that line means and what changes if it is wrong.

- [ ] Explain syntax character by character when fragile.
  - Acceptance: fragile syntax such as `UUID=...`, `>>`, `>`, quotes, spaces, `#` comments, `options root=UUID=... rw`, and `/dev/nvme0n1p2` partition names includes character-level or token-level explanation where needed.

- [ ] Distinguish literal text from placeholders.
  - Acceptance: placeholders such as `PASTE-ROOT-UUID-HERE`, `/dev/sda`, `ethan`, and `"Network Name"` are visually and verbally marked as values the user must replace.

- [ ] Explain expected output in detail.
  - Acceptance: each command explains what success looks like, what normal silence means, and what output indicates failure or danger.

- [ ] Explain failure before recovery.
  - Acceptance: troubleshooting text first explains what the error means, then gives the recovery command or decision.

- [ ] Never hide destructive meaning.
  - Acceptance: any command that can erase data explains exactly which disk, partition, filesystem, or file it can affect before the user sees the command.

- [ ] Keep KISS without becoming vague.
  - Acceptance: the app chooses the simplest practical path, but the explanation remains precise. "Simple" means fewer branches and less unnecessary software, not less explanation.

- [ ] Prefer redundancy over memory.
  - Acceptance: it is acceptable for the app to feel repetitive. It is not acceptable for a user to need another page open to understand the command on the current page.

Example standard:

```text
Command:
ls /mnt

Word map:
ls = list directory contents
/mnt = the temporary mount point used during Arch installation

Combined meaning:
List what is currently visible inside /mnt.

Why this matters:
If the root partition is mounted at /mnt, this should show the beginning of the installed system's file tree after pacstrap.
```

For long `nano` edits, the app must use this structure:

```text
1. Open the file:
   nano /path/to/file

2. Put exactly this content in the file:
   <full file content, every line>

3. Line-by-line explanation:
   line 1 means ...
   line 2 means ...
   ...

4. Save and exit:
   Ctrl+O means write out
   Enter confirms the filename
   Ctrl+X exits nano
```

### Multi-Line Command Sequence Standard

If the app shows a sequence of commands, every line must be explained as its own independent action, and then every token inside that line must be explained. A short command list is allowed only if it is followed immediately by the full expansion.

Example sequence:

```bash
iwctl
device list
station wlan0 scan
station wlan0 get-networks
station wlan0 connect "YourWiFi"
exit
ping archlinux.org
```

Required expansion:

- [ ] Explain `iwctl` as its own command.
  - Acceptance: page explains that `iwctl` opens the interactive iwd wireless control shell.

- [ ] Explain `device list` as its own command.
  - Acceptance: page explains `device` as the iwctl object category for wireless adapters and `list` as the action that shows available Wi-Fi devices.

- [ ] Explain `station wlan0 scan` as its own command.
  - Acceptance: page explains `station`, `wlan0`, and `scan`; it also says `wlan0` is an example and must be replaced with the user's actual Wi-Fi device if different.

- [ ] Explain `station wlan0 get-networks` as its own command.
  - Acceptance: page explains that this lists networks found by the scan and explains every visible output column shown in the app.

- [ ] Explain `station wlan0 connect "YourWiFi"` as its own command.
  - Acceptance: page explains `station`, `wlan0`, `connect`, the quoted Wi-Fi name, why quotes matter, and that `YourWiFi` is a placeholder.

- [ ] Explain `exit` as its own command.
  - Acceptance: page explains that `exit` leaves the interactive `iwctl` shell and returns to the normal shell prompt.

- [ ] Explain `ping archlinux.org` as its own command.
  - Acceptance: page explains `ping`, `archlinux.org`, DNS, network reachability, expected replies, and failure meanings.

Hard rule: never present a command sequence as "just type these" without the full per-line and per-token explanation on the same page or click-through state.

## Safety-First Product Rule

This app must optimize for a safe Arch experience, not a fast Arch install. The app should actively prevent the user from accidentally destroying data, locking themselves out, exposing their machine, or violating another person's privacy.

Every risky flow must use this pattern:

```text
1. Explain the risk.
2. Explain the default path.
3. Explain why that default is recommended.
4. List the other valid options.
5. Explain when each option is appropriate.
6. Ask the user to describe or select their setup.
7. Generate the matching walkthrough path.
8. Hide unrelated paths by default.
9. Require a safety checkpoint before destructive commands.
10. Use the user's exact device names and choices in later instructions.
```

Hard rule: destructive disk operations must never appear as generic copy/paste instructions before the app knows the user's target disk, target partitions, install scenario, and preservation intent.

### Safety Gates

- [x] Add safety gate component.
  - Acceptance: app can show a blocking warning before dangerous or security-sensitive steps, requiring the user to confirm specific facts before continuing.

- [x] Add disk destruction safety gate.
  - Acceptance: before partitioning, formatting, wiping, or running `mkfs.*`, the app says this can ruin all data on the selected disk/partition and requires the user to confirm the exact target.

- [x] Add bootloader mode safety gate.
  - Acceptance: before `bootctl install` or `grub-install`, the app requires confirmed UEFI or legacy BIOS mode and blocks commands that do not match the selected boot mode.

- [x] Add security/privacy safety gate.
  - Acceptance: before monitoring, process killing, restricted shells, or user limits, the app reminds the user to act only on systems/accounts they own or administer with permission.

- [x] Add lockout safety gate.
  - Acceptance: before `sudoers`, PAM, shell restrictions, cgroups, or login changes, the app warns how the user could lock themselves out and explains the recovery plan.

### Option Explanation Standard

- [ ] Explain all meaningful options.
  - Acceptance: when the user reaches a decision point, the app lists every reasonable beginner-relevant option, explains what it does, explains when to choose it, and marks the default.

- [ ] Mark the default option clearly.
  - Acceptance: each decision point says which option is the default, why it is default, and what tradeoff it makes.

- [ ] Hide irrelevant option paths after selection.
  - Acceptance: after the user chooses a path, unrelated OS/hardware/boot/disk instructions are hidden by default to reduce confusion.

- [ ] Allow review of hidden alternatives.
  - Acceptance: user can still expand other options intentionally, but the primary wizard path stays focused on their setup.

## Setup Profile Wizard Requirement

The app must let the user describe their hardware and install goal through a checklist. The app then generates the proper path through the walkthrough.

The checklist must collect:

- current computer type: generic PC, laptop, Mac, virtual machine, other
- current operating system environment: Windows, macOS, Linux, Arch ISO, other
- boot mode: UEFI, legacy BIOS, unknown
- install target: internal SSD, second internal SSD, external SSD, USB drive, virtual disk
- number of internal drives
- number of external drives
- whether an existing operating system must be preserved
- whether the target disk can be fully erased
- whether the target disk is separate from the current OS disk
- network path: Ethernet, Wi-Fi, unknown
- desired bootloader path: default/recommended, systemd-boot, GRUB UEFI, GRUB BIOS
- desktop path: default Xfce path, no desktop yet, other later
- audio target: built-in speakers/mic, HDMI/DisplayPort, USB headset, Bluetooth

### Scenario-Specific Path Generation

- [x] Add setup profile checklist.
  - Acceptance: user can answer questions about OS, drive count, internal/external target, preservation intent, boot mode, and network path before disk commands are shown.

- [x] Generate a focused wizard path from the checklist.
  - Acceptance: app uses the checklist answers to show only the relevant steps by default.

- [~] Add Mac + external SSD install path.
  - Acceptance: app explains the Mac-specific context and external target path while hiding Windows/Linux-only assumptions unless expanded.

- [~] Add Linux host + external SSD install path.
  - Acceptance: app explains that internal NVMe drives often look like `/dev/nvme0n1` while USB/external SATA-style devices often look like `/dev/sda`, but tells the user to verify by size/model/mountpoints instead of assuming.

- [~] Add Windows host + external SSD install path.
  - Acceptance: app explains Windows disk identity clues separately and avoids Linux-host-only assumptions until the user is in the Arch ISO.

- [~] Add two-internal-SSD path.
  - Acceptance: app walks the user through distinguishing the current OS SSD from the target SSD using `lsblk` name, size, model, type, and mountpoints.

- [~] Add same-internal-SSD path.
  - Acceptance: app walks the user through erase-vs-preserve choices before showing partitioning commands.

## User-Named Device Mapping Requirement

The user must be able to easily enter or update the actual names of their devices and partitions. The wizard must then use those exact names everywhere later.

Examples:

- If the user's internal Linux disk is actually `/dev/nvme1n1`, the wizard should use `/dev/nvme1n1`, not a generic `/dev/nvme0n1`.
- If the user's external SSD is actually `/dev/sdb`, the wizard should use `/dev/sdb`, not `/dev/sda`.
- If the user's target root partition is `/dev/sdb4`, the wizard should use `/dev/sdb4`, not `/dev/nvme0n1p2`.

### Device Mapping UI

- [x] Add editable device name fields.
  - Acceptance: user can enter current OS disk, target disk, EFI partition, root partition, swap partition, and external SSD names.

- [~] Add "I do not know my device names" path.
  - Acceptance: every device-name field lets the user say "I do not know", then routes to an OS/environment-specific discovery walkthrough instead of allowing guessing.

- [x] Add Arch ISO/Linux device discovery walkthrough.
  - Acceptance: app teaches `lsblk -o NAME,SIZE,TYPE,MODEL,TRAN,SERIAL,MOUNTPOINTS`, `lsblk -f`, `fdisk -l`, and `blkid` with every command, option, column, path, and output meaning explained on that page.

- [x] Add Windows disk discovery walkthrough.
  - Acceptance: app teaches Disk Management, disk numbers, capacity, EFI/Windows/recovery partitions, external-drive clues, and warns that Windows disk numbers are not Linux `/dev/...` names.

- [x] Add macOS disk discovery walkthrough.
  - Acceptance: app teaches Disk Utility, internal/external disks, capacity, APFS containers, EFI concept, external-drive clues, and warns that macOS `/dev/diskN` names are not Linux `/dev/...` names.

- [x] Add unknown environment discovery walkthrough.
  - Acceptance: app asks what the screen looks like, distinguishes browser, terminal, Windows, macOS, Linux, Arch ISO, and firmware setup, gives observation-only actions, and tells the user to stop before disk commands until the environment is identified.

- [x] Add easy update controls.
  - Acceptance: user can change a device name later and all future instructions update to match.

- [ ] Add placeholder warnings.
  - Acceptance: app clearly labels example values like `/dev/sda`, `/dev/nvme0n1`, `/dev/sdb4`, `PASTE-ROOT-UUID-HERE`, and never lets them look like guaranteed real values.

- [ ] Add command templating.
  - Acceptance: commands render using the user's mapped names, while preserving safety warnings.

- [ ] Add placeholder input fields for every command placeholder.
  - Acceptance: placeholders such as `"YourWiFi"`, `wlan0`, `/dev/sda`, `/dev/sda1`, `ethan`, `archbox`, and `PASTE-ROOT-UUID-HERE` all have matching inputs or discovery steps before the user is expected to type/copy the command.

- [ ] Disable copy for incomplete templated commands.
  - Acceptance: if required values are missing, the command is visibly incomplete and cannot be copied as if it were ready.

- [ ] Render final commands verbatim from user values.
  - Acceptance: if the user enters Wi-Fi name `Home Network` and Wi-Fi device `wlan0`, the app renders `station wlan0 connect "Home Network"` and explains the quotes and space.

- [ ] Add mismatch warnings.
  - Acceptance: if a user enters a partition path where a whole disk is required, or a whole disk where a partition is required, the app warns before showing destructive commands.

## Storage Naming Education Requirement

The app must teach how Linux names storage hardware and why names differ.

- [x] Explain `/dev/nvme0n1`.
  - Acceptance: app explains NVMe naming: `nvme` means NVMe device, `0` is controller/device numbering, `n1` is namespace, and partitions become `p1`, `p2`, etc.

- [x] Explain `/dev/sda`.
  - Acceptance: app explains that SATA, USB storage, and many external drives often appear as SCSI-style disks such as `/dev/sda`, `/dev/sdb`, etc.

- [x] Explain partition suffixes.
  - Acceptance: app explains `/dev/sda1` versus `/dev/sda`, and `/dev/nvme0n1p1` versus `/dev/nvme0n1`.

- [x] Explain why names can change.
  - Acceptance: app warns that `/dev/sda` and `/dev/sdb` can change depending on boot order and connected devices, so users must verify by size, model, serial, and mountpoints.

- [x] Teach drive identification by evidence.
  - Acceptance: app teaches the user to compare `NAME`, `SIZE`, `TYPE`, `MODEL`, `TRAN`, `SERIAL`, and `MOUNTPOINTS` before choosing a target.

- [x] Add specs-based identification.
  - Acceptance: app explains how to use drive capacity, manufacturer/model, internal vs USB transport, and existing partitions to identify separate SSDs.

- [x] Add "do not trust name alone" rule.
  - Acceptance: app repeatedly says device names are clues, not proof; proof comes from multiple matching facts.

## Status Legend

- `[ ]` Not started
- `[~]` In progress
- `[x]` Complete
- `[!]` Blocked or needs a decision

## 1. Finish The Full Install Path

- [x] Add exact `systemd-boot` install and configuration flow.
  - Acceptance: app includes `bootctl install`, loader config, Arch entry file, kernel/initramfs paths, root identifier explanation, and verification before reboot.

- [x] Add a GRUB path for UEFI systems.
  - Acceptance: app explains when to choose GRUB, installs the needed packages, runs the UEFI install command, generates config, and explains each argument.

- [x] Add a GRUB path for legacy BIOS systems.
  - Acceptance: app explains BIOS boot mode, disk-level GRUB install target, config generation, and why this differs from UEFI.

- [x] Add one beginner desktop environment path.
  - Acceptance: app gives one clear default path for a graphical desktop, display manager, terminal, browser, NetworkManager integration, and audio controls.

- [x] Add post-install package baseline.
  - Acceptance: app explains and installs practical beginner packages such as `sudo`, `networkmanager`, `firefox`, `pipewire`, `wireplumber`, `pipewire-pulse`, `pavucontrol`, and a terminal/editor path.

- [x] Add locale and timezone verification.
  - Acceptance: app does not only set `/etc/localtime`, `/etc/locale.gen`, and `/etc/locale.conf`; it also verifies the time zone symlink, uncommented locale selection, and locale configuration file.

- [x] Add hardware detection and driver-choice branching.
  - Acceptance: app asks the learner to inspect CPU, PCI, USB, and radio-block state before choosing Intel CPU, AMD CPU, Intel graphics, AMD graphics, NVIDIA graphics, Bluetooth, or audio-related packages.

## 2. Make Steps Branch Safely

- [x] Add UEFI vs BIOS branching.
  - Acceptance: app asks which boot mode was detected and shows only matching bootloader instructions by default.

- [x] Add Ethernet vs Wi-Fi branching.
  - Acceptance: app separates automatic wired setup from `iwctl` wireless setup and gives validation commands for each path.

- [x] Add disk strategy branching.
  - Acceptance: app distinguishes full-disk wipe from existing-partition/manual layouts and labels destructive commands clearly.

- [x] Add internal SSD scenario branching.
  - Acceptance: app distinguishes installing Arch to a separate internal SSD from installing Arch onto the same internal SSD that already contains an operating system.

- [x] Add partition-if-necessary decision flow.
  - Acceptance: app explains when partitioning is required, when existing partitions can be reused, when formatting is destructive, and when the user should stop and back up before continuing.

- [x] Add swap strategy branching.
  - Acceptance: app supports no swap, swap partition, and swap file explanations without mixing commands.

- [x] Add audio-device branching.
  - Acceptance: app separates laptop/internal audio, HDMI/DisplayPort audio, USB headsets, and Bluetooth audio troubleshooting paths.

## 2A. Internal SSD Install Scenarios

The app must support two common beginner scenarios before it shows destructive disk commands.

### Scenario A: Arch Goes On A Separate Internal SSD

- [x] Teach how to identify multiple internal drives.
  - Acceptance: app explains how to compare `lsblk` name, size, model, type, and mountpoints so the user can tell the current OS disk from the empty or target SSD.

- [x] Add a "this is not my current OS disk" checkpoint.
  - Acceptance: user must confirm the target SSD is separate from the disk containing the existing operating system before full-disk wipe commands are shown.

- [ ] Add partitioning path for the separate SSD.
  - Acceptance: app offers a simple full-disk Arch layout for the separate SSD and explains EFI, root, optional swap, and BIOS boot partition differences.

- [ ] Add formatting and mounting path for the separate SSD.
  - Acceptance: app maps the chosen partition names into format and mount commands and repeats that formatting erases those target partitions.

### Scenario B: Arch Goes On The Same Internal SSD As An Existing OS

- [ ] Teach how to identify the existing OS disk.
  - Acceptance: app explains clues such as existing EFI partition, Windows/Linux partitions, large mounted filesystems, recovery partitions, and disk model/size.

- [ ] Add an erase-versus-preserve decision.
  - Acceptance: app requires the user to choose between erasing the whole disk and preserving/shrinking existing partitions before any partition command is shown.

- [ ] Add whole-disk erase path for the same SSD.
  - Acceptance: app makes it clear that the existing operating system and files will be removed, then routes to the normal full-disk partitioning flow.

- [ ] Add preserve-existing-OS planning path.
  - Acceptance: app explains that preserving another OS requires free space or shrinking partitions, backups, and extra care; destructive commands remain hidden until the user confirms the exact free space/partition plan.

- [ ] Add "stop and back up" checkpoints.
  - Acceptance: app warns the user to stop before resizing, deleting, or formatting any partition containing data they want to keep.

### Partitioning If Necessary

- [x] Add partition-needed explanation.
  - Acceptance: app explains that partitioning is needed when the target disk lacks the required layout or when the user chooses to erase/rebuild the layout.

- [x] Add reuse-existing-partitions explanation.
  - Acceptance: app explains that reusing partitions may avoid repartitioning, but formatting a reused partition still erases its data.

- [x] Add partition table explanation.
  - Acceptance: app explains GPT vs MBR in beginner terms and ties the choice to UEFI/BIOS boot mode.

- [x] Add safe examples for common layouts.
  - Acceptance: app includes example layouts for UEFI separate SSD, UEFI same SSD erase, BIOS separate SSD with MBR, and BIOS/GPT with BIOS boot partition.

- [x] Add "do not guess" rule.
  - Acceptance: app tells the user to stop if disk identity, partition purpose, or preservation goals are unclear.

## 3. Add Stronger Validation Checkpoints

- [x] Add disk identity checkpoint before partitioning.
  - Acceptance: learner must compare disk name, size, model, and current mountpoints before any partition editor or format command.

- [x] Add destructive command checkpoint before formatting.
  - Acceptance: every `mkfs.*`, `mkswap`, and partition write step has a visible danger block and a confirmation checklist.

- [ ] Add mount layout checkpoint before `pacstrap`.
  - Acceptance: app instructs learner to run `lsblk` and confirm root, boot, and optional swap are mounted/active correctly.

- [ ] Add `fstab` checkpoint before `arch-chroot` or reboot.
  - Acceptance: app shows what entries should exist and what common bad entries look like.

- [ ] Add network/DNS checkpoint before package installation.
  - Acceptance: app separates IP connectivity tests from DNS tests and explains what each result means.

- [ ] Add Firefox readiness checkpoint.
  - Acceptance: app verifies desktop session, network, DNS, and Firefox package installation before browser troubleshooting.

- [ ] Add audio readiness checkpoint.
  - Acceptance: app verifies package installation, user services, sinks, sources, mute state, and recording/playback test.

## 3A. Post-Install Safety Hardening

This module belongs after the user has a bootable system, working networking, Firefox, audio, and a normal user account. It must be written as defensive system hardening for the user's own machine.

### Layer 1: Prevention Is The Only Cure

- [x] Add firewall setup walkthrough.
  - Acceptance: app explains what a firewall is, what inbound vs outbound means, why default-deny inbound is safer for beginners, and shows one simple firewall path with exact commands and verification.

- [x] Add process-count limit walkthrough with `ulimit`.
  - Acceptance: app explains what a process is, what a fork is, what `nproc` means, what `ulimit -u 1000` does, why it is session-scoped, and how to verify the current limit.

- [x] Add PAM limits walkthrough.
  - Acceptance: app explains `/etc/security/limits.conf`, PAM, soft vs hard limits, user/group selectors, `nproc`, and shows full file lines such as `@users hard nproc 500` with token-by-token explanation.

- [x] Add cgroup CPU and memory limit plan.
  - Acceptance: app explains cgroups as kernel resource controllers, CPU vs memory control, user slices, systemd drop-ins, and exact file contents for any unit or slice override.

- [x] Add restricted shell access plan for regular users.
  - Acceptance: app explains login shells, limited shells, who should receive restrictions, what restrictions do not protect against, and how to avoid locking out the administrator account.

### Layer 2: Detect Explosion And Kill Safely

- [x] Add process explosion detection walkthrough.
  - Acceptance: app explains symptoms of runaway process creation, how to inspect process counts, how to identify a user/process tree, and how to avoid killing unrelated work blindly.

- [x] Add `htop` monitoring walkthrough.
  - Acceptance: app explains what `htop` shows, process tree mode, user filtering, CPU/memory columns, process count clues, and safe termination choices.

- [x] Add Prometheus-style alert planning.
  - Acceptance: app explains monitoring concepts without requiring Prometheus in the base install, including fork-rate/process-count alert ideas, thresholds, and why alerts should be tested.

- [x] Add safe kill guidance.
  - Acceptance: app explains signal escalation, parent vs child processes, user-scoped termination, and warns that killing processes can destroy unsaved work.

### Layer 3: Parent Process And Root Cause

- [x] Add parent-process tracing walkthrough.
  - Acceptance: app explains parent process IDs, process trees, sessions, services, shells, and how to identify what started the runaway process.

- [x] Add root-cause notes after containment.
  - Acceptance: app reminds the user that killing processes is containment, not a cure; the real fix is prevention, limits, code/config correction, or removing the unsafe trigger.

- [x] Add post-incident checklist.
  - Acceptance: app asks the user to review limits, logs, shell access, service configs, package source, and whether a command/script should be removed or rewritten.

### Privacy And Ethics Reminder

- [x] Add privacy reminder to hardening pages.
  - Acceptance: app reminds the user to respect the privacy of others, inspect only systems/accounts they own or administer, and avoid reading personal files or monitoring other users without permission.

- [x] Add defensive-use boundary.
  - Acceptance: app frames process limits, monitoring, restricted shells, and kill procedures as protection for the user's own machine, not as tools for interfering with other people's systems.

## 4. Improve Source Fidelity

- [ ] Install or otherwise obtain official offline ArchWiki content.
  - Acceptance: local source exists from `arch-wiki-docs`, `arch-wiki-lite`, or another official Arch package/source and can be searched offline.

- [ ] Map every lesson to official source pages.
  - Acceptance: each lesson lists its ArchWiki/manual/package source and the app content can be traced back to it.

- [ ] Map every command to an official source where possible.
  - Acceptance: install-specific commands use ArchWiki/manual sources; package commands use package/manual sources.

- [ ] Add source review notes for non-official explanatory text.
  - Acceptance: app distinguishes official technical facts from beginner explanations written by us.

- [x] Add a source update process.
  - Acceptance: repo has a short process for refreshing ArchWiki/package information and reviewing changed guidance.

## 5. Better UI For Beginner Mode

- [x] Add boot mode selector.
  - Acceptance: user can choose or confirm UEFI vs BIOS, and the visible bootloader path changes accordingly.

- [x] Add network selector.
  - Acceptance: user can choose Ethernet or Wi-Fi, and the app shows the correct setup path.

- [x] Add target disk placeholder.
  - Acceptance: user can enter a disk path like `/dev/nvme0n1`, and example commands update while preserving warnings.

- [x] Add partition placeholders.
  - Acceptance: user can enter root, EFI, and optional swap partition paths, and commands update consistently.

- [x] Add command safety labels.
  - Acceptance: commands are visually labeled as safe inspection, configuration, package install, service control, or destructive.

- [x] Add big danger styling for destructive steps.
  - Acceptance: destructive commands cannot visually blend in with ordinary copyable commands.

- [x] Add beginner glossary mode.
  - Acceptance: common words like `sudo`, `ls`, `nano`, `mount`, `root`, `UUID`, and `DNS` are always one click away.

## 6. Test The Guide Against A VM

- [x] Create a clean Arch VM test plan.
  - Acceptance: document lists VM settings, boot mode, disk size, networking mode, and test checkpoints.

- [x] Run the UEFI/systemd-boot path in a VM.
  - Acceptance: VM boots into the installed system without the ISO and matches the guide.

- [x] Run the UEFI GRUB path in a VM.
  - Acceptance: VM boots through GRUB UEFI from the installed disk without the ISO and matches the guide.

- [x] Run the legacy BIOS GRUB path in a VM.
  - Acceptance: VM boots through BIOS GRUB from the installed disk without the ISO and matches the guide.

- [x] Verify networking steps in the VM.
  - Acceptance: wired networking, DNS, package install, and Firefox install steps match real output.

- [x] Verify audio steps where possible.
  - Acceptance: PipeWire/WirePlumber services and `pactl` diagnostics match real output; hardware-dependent items are clearly marked.

- [x] Verify beginner desktop and Firefox launch in the VM.
  - Acceptance: LightDM graphical login appears, Xfce starts for the normal user, and Firefox opens in the graphical session.

- [x] Correct assumptions found during VM testing.
  - Acceptance: every mismatch from real output is either fixed in the app or documented as hardware/environment-specific.

## Current State

- [x] Static app exists.
- [x] Major walkthrough sections exist.
- [x] Command cards include beginner explanations.
- [x] Official source links are attached to lessons and commands.
- [x] Initial glossary exists.
- [x] Branching UI is implemented for bootloader, network, and hardware-driver paths.
- [x] First Setup Profile Wizard pass is implemented with persistent answers and safety summary.
- [x] Full bootloader configuration covers UEFI `systemd-boot`, UEFI GRUB, and legacy BIOS GRUB paths.
- [x] Beginner desktop path is added with Xorg, Xfce, LightDM, Firefox, and audio controls.
- [x] Post-install baseline is added with required, desktop-path, and hardware-specific package guidance.
- [x] Hardware detection path separates Intel CPU, AMD CPU, Intel graphics, AMD graphics, and NVIDIA graphics choices.
- [ ] Offline ArchWiki source ingestion is not complete.
- [x] Core VM install and bootloader verification is complete; audible audio playback remains hardware-dependent and untested.

## Next Step

Next KISS implementation step: add the mount layout checkpoint before `pacstrap` so root, boot, and optional swap must be confirmed mounted/active before base-system install.
