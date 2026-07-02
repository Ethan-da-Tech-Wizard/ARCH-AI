# Safety Wizard Implementation Plan

The product goal is absolute user safety: a careful, click-through Arch setup wizard that explains every action, prevents accidental data loss, and adapts to the user's actual machine.

This file documents what must be researched and built before we continue implementing disk and install flows.

## Core Principle

The app must be safe enough for a user who can read and type accurately but does not yet understand Linux, disks, partitions, bootloaders, or command syntax.

That means:

- no destructive command appears before the app knows the user's setup
- every command is explained every time it appears
- every option is explained before the user chooses it
- defaults are identified and justified
- irrelevant paths are hidden after the user's setup is known
- user-entered device names drive all later commands
- the app repeatedly reminds the user that partitioning/formatting can destroy data

## Research First

Before implementing a safety-critical page, verify the current behavior from official or primary sources.

### Source Priority

1. Official ArchWiki pages, preferably through `arch-wiki-docs` or `arch-wiki-lite` because browser access to ArchWiki may be blocked by Anubis.
2. Local Arch/Linux manual pages, such as `man lsblk`, `man fdisk`, `man mount`, `man pacstrap`, `man genfstab`, `man arch-chroot`, `man bootctl`, `man grub-install`, `man limits.conf`, and `man systemd.resource-control`.
3. Official Arch package metadata from `pacman -Si`.
4. Upstream manual pages or project documentation when Arch docs are insufficient.

### Research Backlog

- [ ] Install or obtain official offline ArchWiki content.
  - Needed for: Installation guide, partitioning, persistent block device naming, file systems, EFI system partition, GRUB, systemd-boot, NetworkManager, PipeWire, security.

- [~] Research disk identity and naming.
  - Sources: ArchWiki persistent block device naming, `man lsblk`, `man fdisk`, udev/systemd docs.
  - Must cover: `/dev/nvme0n1`, `/dev/sda`, `/dev/sdb`, `/dev/sda1`, `/dev/nvme0n1p1`, UUIDs, PARTUUIDs, labels, model, serial, transport, mountpoints.

- [~] Research partitioning and destructive operations.
  - Sources: ArchWiki Installation guide, Partitioning, File systems, `man fdisk`, `man mkfs.*`, `man mount`, `man wipefs`.
  - Must cover: full-disk erase, preserve existing OS, reuse partitions, format vs mount, GPT vs MBR, EFI System Partition, BIOS boot partition.

- [ ] Research boot mode and bootloader paths.
  - Sources: ArchWiki systemd-boot, GRUB, EFI system partition, `man bootctl`, `man loader.conf`, `man systemd-boot`, `man grub-install`, `man grub-mkconfig`.
  - Must cover: UEFI default, UEFI GRUB option, legacy BIOS GRUB, when each applies, and which paths are hidden.

- [ ] Research host scenario differences.
  - Sources: ArchWiki install media, platform pages where applicable, official manuals.
  - Must cover: Mac + external SSD, Windows host + external SSD, Linux host + external SSD, two internal SSDs, same internal SSD as existing OS.

- [ ] Research safety hardening.
  - Sources: ArchWiki Security, firewall pages, `man limits.conf`, `man systemd.resource-control`, systemd slice docs, firewall tool docs.
  - Must cover: firewall, `ulimit`, PAM `nproc`, cgroups CPU/memory/tasks, monitoring, process containment, privacy boundary.

## Implementation Order

### 1. Setup Profile Wizard

Build the first-screen profile collector.

Questions it must ask:

- What are you using to read this guide?
- What machine is being installed?
- Are you on a Mac, Windows PC, Linux PC, generic PC, laptop, or VM?
- Are you currently booted into the Arch ISO?
- Is the install target internal or external?
- Is the target the same disk as an existing OS?
- Is there more than one internal SSD?
- Is there an external SSD/USB drive connected?
- Can the target disk be fully erased?
- Must an existing OS be preserved?
- Is the machine booted in UEFI, BIOS, or unknown mode?
- Are you using Ethernet or Wi-Fi?

Acceptance:

- [x] User can complete the checklist without knowing Linux device naming yet.
- [x] App produces a plain-language setup summary.
- [ ] App hides unrelated paths by default.

Status:

- [x] First KISS profile form implemented.
- [x] Answers persist in browser `localStorage`.
- [x] Wizard displays active setup context.
- [x] Summary warns when destructive disk commands are not safe yet.
- [ ] Path filtering is not implemented yet.

### 2. Device Mapping UI

Let the user enter actual device names and update them later.

Fields:

- current OS disk
- target install disk
- EFI partition
- root partition
- swap partition
- external SSD
- existing OS partition, if preserving

Acceptance:

- [x] User can enter `/dev/nvme1n1`, `/dev/sdb`, `/dev/sdb4`, etc.
- [x] User can choose "I do not know" for any device or partition name.
- [~] App uses those values in future commands.
- [x] App warns when a partition is entered where a whole disk is required.
- [x] App warns when a whole disk is entered where a partition is required.
- [~] App labels every value as user-provided, detected, or example.

Status:

- [x] First KISS Device Mapping UI implemented.
- [x] Device values persist in browser `localStorage`.
- [x] Unknown values are treated as normal safe states, not errors.
- [x] Mapping summary warns about missing, unknown, or shape-mismatched values.
- [x] Wi-Fi command preview renders from user values when available.
- [ ] Device values are not yet integrated into all command cards.
- [ ] Discovery walkthroughs are not yet implemented.

### 2B. "I Do Not Know My Device Names" Path

Some users will not know how to find their disk names, partition names, EFI partition, root partition, or external SSD name. The app must treat "I do not know" as a normal safe path, not as an error.

When the user selects "I do not know", the wizard must ask what environment they can currently access and show the correct discovery path for that environment.

Supported discovery environments:

- Arch ISO terminal
- installed Linux terminal
- Windows
- macOS
- unknown / cannot tell yet

Acceptance:

- [ ] Every device-name field has an "I do not know" option.
- [~] Choosing "I do not know" opens a discovery walkthrough instead of allowing unsafe guesses.
- [~] Discovery walkthrough is based on the user's current operating system/environment.
- [ ] No destructive disk command appears while device identity is unknown.
- [ ] The user can return from discovery and fill the device mapping fields.

#### Arch ISO / Linux Discovery Path

The app must teach the user how to discover devices from a Linux or Arch ISO terminal.

Status:

- [x] First non-destructive `lsblk -o NAME,SIZE,TYPE,MODEL,TRAN,SERIAL,MOUNTPOINTS` discovery page implemented.
- [x] The page explains `lsblk`, the space, `-o`, the column list, every listed column, and safe output reading.
- [x] `lsblk -f` page implemented with repeated command, option, filesystem, column, and safety explanations.
- [x] `fdisk -l` page implemented with repeated command, option, whole-disk, partition, GPT/MBR, and safety explanations.
- [x] `blkid` page implemented with repeated command, UUID, LABEL, TYPE, PARTUUID, and safety explanations.

Commands to document with full precision:

```bash
lsblk -o NAME,SIZE,TYPE,MODEL,TRAN,SERIAL,MOUNTPOINTS
```

```bash
lsblk -f
```

```bash
fdisk -l
```

```bash
blkid
```

Required explanation standard:

- `lsblk` must be explained every time as "list block devices".
- `-o` must be explained as "choose output columns".
- `NAME`, `SIZE`, `TYPE`, `MODEL`, `TRAN`, `SERIAL`, and `MOUNTPOINTS` must each be explained every time.
- `lsblk -f` must explain `-f` as filesystem information and explain filesystem names, labels, UUIDs, and mountpoints.
- `fdisk -l` must explain `fdisk`, `-l`, whole disks, partitions, and partition tables.
- `blkid` must explain filesystem metadata, UUIDs, labels, and why it is not the first beginner-facing command.
- Output examples must explain every column and how to compare rows.
- The user must be taught that `TYPE=disk` means whole disk and `TYPE=part` means partition.
- The user must be taught that mountpoints like `/`, `/boot`, `/home`, or `/mnt` are clues about what is currently in use.

#### Windows Discovery Path

The app must teach the user how to identify disks from Windows without assuming Linux device names exist yet.

Items to document:

- Disk Management
- disk number
- capacity
- partitions
- EFI System Partition
- Windows partition
- recovery partition
- external drive clues
- why Windows "Disk 0" is not the same naming scheme as Linux `/dev/sda`

Acceptance:

- [x] User can identify likely current OS disk by Windows Disk Management clues.
- [x] User understands that final Linux names must still be verified in the Arch ISO.
- [x] App does not translate Windows disk numbers into Linux `/dev/...` names as fact.

#### macOS Discovery Path

The app must teach the user how to identify disks from macOS without assuming Linux device names exist yet.

Items to document:

- Disk Utility
- internal vs external
- capacity
- device tree
- APFS containers
- EFI partition concept
- external SSD clues
- why macOS `/dev/diskN` names are not Linux `/dev/...` names

Acceptance:

- [x] User can identify likely internal and external disks by macOS Disk Utility clues.
- [x] User understands final Linux names must still be verified in the Arch ISO.
- [x] App does not translate macOS disk numbers into Linux `/dev/...` names as fact.

#### Unknown Environment Path

If the user does not know what operating system/environment they are in:

- [x] App asks what the screen looks like.
- [x] App explains how to tell whether they are in a browser, a terminal, Windows, macOS, Linux, Arch ISO, or firmware setup.
- [x] App gives non-destructive observation steps only.
- [x] App tells the user to stop before disk commands until the environment is identified.

### 3. Disk Naming Education Page

Teach storage names before partition commands.

Must explain:

- `/dev` means device files
- `nvme` means NVMe-style storage
- `nvme0n1` means NVMe controller/device namespace naming
- `p1`, `p2`, `p3` are partition suffixes for NVMe devices
- `sdX` names often appear for SATA, USB, and external drives
- `sda`, `sdb`, `sdc` ordering can change
- `sda1`, `sda2` are partitions on `sda`
- names are clues, not proof
- proof comes from name + size + model + transport + serial + mountpoints

Acceptance:

- [x] User sees examples for internal NVMe, internal SATA, external USB SSD, and partitions.
- [x] User is told not to continue if disk identity is unclear.
- [x] Page re-explains `lsblk` token by token.

### 4. Scenario Branching

Generate the right path from the profile.

Scenarios:

- Mac + external SSD
- Windows host + external SSD
- Linux host + external SSD
- Arch ISO + one internal SSD
- Arch ISO + two internal SSDs
- same internal SSD, erase existing OS
- same internal SSD, preserve existing OS
- VM virtual disk

Acceptance:

- [x] Each scenario has a default path.
- [x] Each default says why it is default.
- [x] Other options are listed but collapsed.
- [ ] Destructive commands remain hidden until scenario and target are confirmed.

### 5. Safety Gates

Add blocking gates before risky steps.

Gate types:

- disk identity gate
- partitioning gate
- formatting gate
- bootloader mode gate
- sudo/admin gate
- security/privacy gate
- lockout gate

Acceptance:

- [x] Gate says what can go wrong for disk-writing, bootloader install, access/login-changing, and security/privacy-sensitive commands.
- [x] Gate asks the user to confirm specific disk, boot mode, lockout recovery, and privacy/permission facts.
- [x] Gate names the exact disk/partition affected from Device Mapping where applicable.
- [x] Gate uses the user's mapped device names.
- [x] Gate does not rely on memory from earlier pages.

### 6. Command Template Engine

Replace generic examples with user-mapped values.

Examples:

```text
mkfs.ext4 {{rootPartition}}
mount {{rootPartition}} /mnt
mkfs.fat -F 32 {{efiPartition}}
grub-install --target=i386-pc {{targetDisk}}
```

Acceptance:

- [ ] Templates render with user values.
- [ ] Unfilled templates render as placeholders with warnings.
- [ ] Copy buttons are disabled for destructive commands until required values are filled and safety gates are passed.

### 6B. Placeholder Input Requirement

Any command placeholder must have a matching input field before the user is expected to type or copy the command. The final rendered command should be as close to verbatim as possible for the user's setup.

Examples:

- `"YourWiFi"` requires a Wi-Fi network name input.
- `wlan0` requires a Wi-Fi device name input or discovery step.
- `/dev/sda` requires a target disk input or discovery step.
- `/dev/sda1` requires a partition input or discovery step.
- `ethan` requires a username input.
- `archbox` requires a hostname input.
- `PASTE-ROOT-UUID-HERE` requires UUID discovery and confirmation.

Acceptance:

- [ ] Every placeholder in a command has a matching setup/profile/device input.
- [ ] Commands with missing placeholder values are visibly incomplete.
- [ ] Copy buttons are disabled when required placeholder values are missing.
- [ ] The user can edit values easily and future commands update.
- [ ] The app explains which values are user-chosen, discovered, or generated.
- [ ] The final command is shown with the user's exact values before the user types it.

Wi-Fi example:

```bash
station {{wifiDevice}} connect "{{wifiName}}"
```

If the user enters:

```text
Wi-Fi device: wlan0
Wi-Fi name: Home Network
```

The app must render:

```bash
station wlan0 connect "Home Network"
```

Then explain:

- `station` means iwctl is working with a Wi-Fi client device.
- `wlan0` is the user's selected Wi-Fi device.
- `connect` means start joining the network.
- `"Home Network"` is the user's Wi-Fi name.
- quotes are included because the Wi-Fi name contains a space.
- the space between `Home` and `Network` is part of the Wi-Fi name, not a command separator because the quotes group it together.

### 7. Full Precision Content Upgrade

After the wizard architecture exists, upgrade each command/page to the monotony standard.

Acceptance:

- [ ] Every page explains repeated terms again.
- [ ] Every command has token-by-token explanation.
- [ ] Every file edit shows full file content.
- [ ] Every fragile syntax line has character-level explanation.

## Research Notes Captured So Far

### Finished Under Research First

- [x] Local `man lsblk` checked for block-device listing and explicit-column safety.
- [x] Local `man fdisk` checked for whole-disk vs partition distinction and partition-table behavior.
- [x] Local `man mount` checked for mount semantics and unstable device-name warning.
- [x] Local `man blkid` checked for UUID/filesystem metadata behavior.
- [ ] Official offline ArchWiki content still needed before finalizing safety-critical install pages.

### `lsblk`

Local `man lsblk` says `lsblk` lists information about block devices and reads sysfs and the udev database. It warns default output can change, so the app should use explicit columns such as:

```bash
lsblk -o NAME,SIZE,TYPE,MODEL,TRAN,SERIAL,MOUNTPOINTS
```

This supports the app's safety rule: identify drives by multiple facts, not device name alone.

### `fdisk`

Local `man fdisk` describes it as a dialog-driven program for creating and manipulating partition tables. It explains that block devices can be divided into partitions and that `/dev/sda` refers to an entire disk while `/dev/sda1` is a partition.

This supports the app's safety rule: distinguish whole disks from partitions every time.

### `mount`

Local `man mount` says `mount` attaches the filesystem found on a device to the single Unix file tree. It also warns that disk partition device names are unstable and that hardware changes can cause name changes. It strongly recommends identifiers such as UUID or LABEL where appropriate.

This supports the app's safety rule: device names are clues, not proof, and the user must verify target devices before formatting or mounting.

### `blkid`

Local `man blkid` says `blkid` prints block device attributes such as filesystem type, LABEL, and UUID. It recommends `lsblk` for block-device information and `lsblk --fs` for filesystem overviews.

This supports the app's safety rule: use `lsblk` first for user-facing disk identification and use UUID/PARTUUID carefully when boot or mount configuration needs stable identifiers.

### PAM `limits.conf`

Local `man limits.conf` defines the syntax:

```text
<domain> <type> <item> <value>
```

It defines `nproc` as maximum number of processes and explains `soft`, `hard`, and `-` limit types. This supports future process-limit walkthroughs.

### systemd Resource Control

Local `man systemd.resource-control` explains that systemd resource control relies on Linux cgroups and covers settings such as CPU and memory controls for units, slices, scopes, services, sockets, mounts, and swap units.

This supports future cgroup CPU/memory/task limit walkthroughs.

## Definition Of Ready

Before implementing a safety-critical wizard page:

- [ ] official or primary source checked
- [ ] risks listed
- [ ] default chosen and justified
- [ ] alternatives listed
- [ ] required user inputs known
- [ ] placeholders defined
- [ ] safety gate designed
- [ ] exact commands drafted
- [ ] expected output drafted
- [ ] failure modes drafted

## Definition Of Done

A safety wizard feature is done only when:

- [ ] it works in the single-file HTML app
- [ ] it uses the user's setup/profile where applicable
- [ ] it hides irrelevant paths by default
- [ ] it has full standalone explanations
- [ ] it has safety gates before risky commands
- [ ] it has source references
- [ ] the generated `arch-setup-walkthrough.html` is rebuilt
- [ ] syntax checks pass
