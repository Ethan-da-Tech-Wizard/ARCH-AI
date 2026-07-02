# Arch Setup Walkthrough

This project is meant to ship as a tiny offline browser app:

1. Download one file.
2. Open it in any browser.
3. Follow clicky instructions.
4. No account.
5. No internet required after download, except optional links to official Arch sources.
6. No admin permission.
7. No installation.

## Source Files

- `index.html` - page structure
- `styles.css` - visual design
- `app.js` - walkthrough content and interactions
- `WALKTHROUGH_CHECKLIST.md` - internal product checklist
- `SAFETY_WIZARD_IMPLEMENTATION_PLAN.md` - research-first plan for the safety wizard, setup profile, device mapping, and disk-risk gates
- `SOURCE_UPDATE_PROCESS.md` - short repeatable process for checking official Arch sources before changing guidance
- `VM_TEST_PLAN.md` - clean virtual-machine test plan for validating bootloader, network, Firefox, and audio assumptions
- `VM_RUN_LOG.md` - actual VM run status, local QEMU readiness, launch recipe, and test-result template

## Build The Downloadable File

Run:

```bash
node build-single-file.js
```

This creates:

```text
arch-setup-walkthrough.html
```

That generated file contains the HTML, CSS, and JavaScript inline. It can be shared directly and opened from disk in a browser.

## Distribution Target

The intended release artifact is `arch-setup-walkthrough.html`, not an installer and not an AppImage. A single offline HTML file works on Linux, Windows, macOS, Chromebooks, phones, and tablets, which matters because the user may be reading the walkthrough on a second device while the target computer is booted into the Arch ISO.

## Content Standard

The walkthrough must be monotonously precise. Every command must show exactly what to type, explain every word, explain every option, explain every path, and explain what the combined command means.

If the user edits a file in `nano`, the app must show the full file contents. If the file is 60 lines, all 60 lines must be displayed and explained line by line. Fragile syntax must be explained at token or character level when needed.

Every page, card, and click-through state must stand alone. The app must re-explain `ls`, `sudo`, `nano`, `/mnt`, `UUID=`, flags, paths, placeholders, and fragile characters every time they appear. Repetition is intentional; the user should never need to remember a previous page to understand the current one.

If the user does not know a disk or partition name, the app must provide an "I do not know" path. That path must teach the user how to discover the information from their current environment, such as Arch ISO/Linux, Windows, macOS, or unknown. Every command, option, output column, generated value, and visible clue must be explained on that same page.

If the app shows a multi-line command sequence, each line must be explained as a separate action and then every token inside that line must be explained. A sequence like `iwctl`, `device list`, `station wlan0 scan`, `station wlan0 get-networks`, `station wlan0 connect "YourWiFi"`, `exit`, and `ping archlinux.org` must explain every line, every word, every placeholder, every quote, and every expected output.

Every placeholder must have an input or discovery path. If a command contains `"YourWiFi"`, the user should be able to enter their actual Wi-Fi name and see the final command rendered exactly, such as `station wlan0 connect "Home Network"`. The user should not guess, mentally substitute values, or copy incomplete placeholder commands.

The goal is not that the user already knows Linux. The goal is that the user can follow the wizard and understand exactly what each typed thing does.

## Safety And Privacy Boundary

Security hardening content must be defensive and local to the user's own machine. Firewall setup, process limits, cgroups, monitoring, restricted shells, and kill procedures should be framed as prevention, detection, and containment for systems the user owns or administers.

The walkthrough must remind users to respect the privacy of others. Users should not inspect personal files, monitor accounts, or interfere with processes on systems they do not own or administer with permission.

## Source Update Process

Before changing install commands, bootloader instructions, disk steps, package names, networking, Firefox, audio, sudo, PAM, firewall, process limits, or service guidance, follow `SOURCE_UPDATE_PROCESS.md`.

The short rule is:

1. Check the official ArchWiki, Arch manual page, or Arch package page.
2. Update the beginner explanation only after the official source still supports the technical fact.
3. Rebuild `arch-setup-walkthrough.html`.
4. Record what changed.

## VM Verification

Before calling the walkthrough production-quality, follow `VM_TEST_PLAN.md`.

At minimum, the guide should be tested in a clean UEFI VM with the systemd-boot path and a clean VM with a GRUB path. The VM must boot without the ISO, networking and DNS must work after first boot, Firefox must install and launch, and audio commands must be checked or marked hardware-dependent.

Actual VM run status belongs in `VM_RUN_LOG.md`. If the Arch ISO is not available locally, record the run as pending instead of marking it complete.

Local VM artifacts are intentionally ignored by Git:

- `iso/*.iso` for downloaded Arch installer images
- `vm/*.qcow2` and similar virtual disk images
- `vm/*VARS*.fd` for writable UEFI variable files

The `iso/` and `vm/` folders can exist in the repo, but their large local test files should not be committed.

## Setup Profile And Device Mapping

Before destructive disk commands are shown, the app must ask the user about their setup and generate a focused path. The app should distinguish scenarios such as Mac plus external SSD, Linux host plus external SSD, Windows host plus external SSD, two internal SSDs, and installing onto the same internal SSD as an existing operating system.

The user must be able to enter the exact names of their disks and partitions, such as `/dev/nvme1n1`, `/dev/sdb`, or `/dev/sdb4`. The wizard must then use those exact names in future commands and explanations. Example device names must never be treated as guaranteed real values.

The app must teach storage naming directly: why NVMe drives look like `/dev/nvme0n1`, why many SATA/USB/external drives look like `/dev/sda` or `/dev/sdb`, why partitions add suffixes like `1` or `p1`, and why names can change. The user should learn to identify drives by multiple facts: name, size, model, transport, serial, type, and mountpoints.
