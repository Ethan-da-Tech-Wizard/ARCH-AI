# Source Update Process

This process keeps the walkthrough tied to official Arch information while preserving the app's beginner explanations.

The app must not treat memory, guesses, blog posts, forum snippets, or AI output as the source of truth for install steps. Use official Arch sources first, then write beginner explanations around them.

## Source Priority

Use sources in this order:

1. Official ArchWiki pages.
2. Official Arch manual pages from `man.archlinux.org`.
3. Official Arch package pages from `archlinux.org/packages`.
4. Official upstream project documentation only when Arch-specific docs point there or when the topic is not Arch-specific.
5. Our own beginner explanations, clearly treated as explanation, not official authority.

Do not use random tutorials as authority for commands that partition disks, format filesystems, install bootloaders, change sudo, change PAM, change shells, configure firewall policy, or alter resource limits.

## Offline Source Target

Before production-quality release, obtain searchable local Arch documentation from an official Arch package/source, preferably:

```text
arch-wiki-docs
arch-wiki-lite
```

Why:

- The app is intended to be useful offline.
- Browser access to ArchWiki can be blocked or unavailable.
- Safety-critical guidance should be reviewable without relying on live internet access.

This repo must not copy large ArchWiki pages into the app. The app should link to official sources and keep our own beginner wording separate.

## Refresh Checklist

Run this process before changing install, bootloader, disk, networking, Firefox, audio, sudo, PAM, firewall, process-limit, or service guidance.

1. Choose the lesson or command being reviewed.
2. List the official source keys already used in `app.js`.
3. Open or search the matching official ArchWiki/manual/package pages.
4. Confirm the command still exists and is still appropriate.
5. Confirm package names still exist in Arch package pages.
6. Confirm boot mode assumptions: UEFI-only, BIOS-only, or both.
7. Confirm destructive risk: whether the command reads, configures, installs, starts services, changes login/access, or writes to disk.
8. Confirm beginner explanation accuracy: no explanation should add a technical claim that the official source does not support.
9. Update the app text only after the source check.
10. Rebuild `arch-setup-walkthrough.html`.
11. Record what changed in the checklist or commit message.

## Command Review Standard

For each command, verify:

- exact command name
- package that provides the command, when relevant
- whether the command belongs in the Arch ISO, the chroot, or the installed system
- whether `sudo` is needed
- whether the command is read-only, configuration, package install, service control, access/login change, security-sensitive, or destructive
- all placeholders, such as disk names, partition names, usernames, Wi-Fi names, hostnames, UUIDs, and service names
- expected output or expected lack of output
- common failure meaning
- official source link

If a command cannot be traced to an official ArchWiki page, manual page, package page, or directly relevant upstream source, mark it for review before treating it as production guidance.

## Lesson Review Standard

For each lesson, verify:

- the lesson has at least one official source link
- each command has a source where possible
- beginner explanations are clearly explanatory
- no page says "as explained earlier" for required understanding
- every repeated command word is explained again on that page
- every placeholder has an input path or discovery path
- destructive commands stay hidden or strongly warned until the matching safety gate passes

## Safety-Critical Pages

These pages require extra review:

- disk discovery
- partitioning
- formatting
- mounting
- `pacstrap`
- `fstab`
- `arch-chroot`
- bootloader installation
- sudo and user setup
- graphical login manager setup
- firewall setup
- PAM limits
- cgroups/resource controls
- restricted shell setup
- process termination

For these pages, do not update commands from memory. Review official sources first.

## Package Name Checks

When a command installs packages with `pacman` or `pacstrap`, confirm package names against official package pages or Arch package search.

Examples:

```text
sudo
networkmanager
firefox
pipewire
pipewire-pulse
wireplumber
pavucontrol
nano
xorg-server
xfce4
lightdm
lightdm-gtk-greeter
ufw
htop
```

If a package name changes, becomes unavailable, or moves in a way that changes guidance, update the walkthrough before release.

## What To Record

For each source update, record:

- date of review
- pages or manuals checked
- package pages checked
- app sections changed
- commands changed
- safety labels changed
- open questions
- whether the single-file app was rebuilt

Keep this short. The goal is traceability, not paperwork.

## KISS Rule

The source process should answer three questions:

1. What official source supports this?
2. What exact user-facing instruction changed?
3. What safety risk could happen if this instruction is wrong?

If those three questions are answered, the process is good enough for the next iteration.
