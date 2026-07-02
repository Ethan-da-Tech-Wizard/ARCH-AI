const glossary = {
  "Arch ISO": "An ISO is a disk image: a file that contains a bootable operating system environment. The Arch ISO is not the installed system yet. It is a temporary live environment used to prepare the disk and install Arch.",
  BIOS: "BIOS is older firmware that starts the computer before the operating system. Many people say BIOS even when they mean UEFI.",
  UEFI: "UEFI is modern firmware that starts the computer, finds bootloaders, and hands control to an operating system. Most modern Arch installs use UEFI.",
  "boot menu": "The boot menu is a firmware screen where you choose which device to start from, such as the internal drive or the USB stick containing the Arch ISO.",
  terminal: "A terminal is a text interface where you type commands. In the Arch ISO, most installation work happens here.",
  shell: "The shell is the program reading your commands. It splits command text into words, finds programs, and runs them.",
  command: "A command is an instruction typed into the terminal. It usually starts with a program name followed by options and arguments.",
  option: "An option changes how a command behaves. Options often start with a dash, such as -l or -S.",
  argument: "An argument is a value passed to a command, such as a file path, package name, disk name, or username.",
  "block device": "A block device is storage Linux reads and writes in blocks, such as an SSD, hard drive, USB drive, virtual disk, or partition.",
  "/dev": "/dev is the Linux directory that contains device files. Storage devices often appear there as paths such as /dev/sda or /dev/nvme0n1.",
  "device name": "A device name is Linux's current name for a piece of hardware or a partition. It is useful, but it is not permanent proof of identity by itself.",
  NVMe: "NVMe is a modern high-speed storage interface commonly used by internal SSDs. Linux names many NVMe drives with names such as nvme0n1.",
  root: "Root is the administrator account on Linux. Root can change almost anything, including files that can break the system.",
  sudo: "sudo means 'run this command with administrator privileges.' It is used after installation when you are logged in as a normal user.",
  ls: "ls lists files or directories. Beginners use it to see what is in the current folder.",
  nano: "nano is a beginner-friendly terminal text editor. It lets you edit configuration files without a graphical desktop.",
  pacman: "pacman is Arch's package manager. It installs, updates, and removes software from Arch repositories.",
  pacstrap: "pacstrap is an Arch install helper. It installs packages into a mounted target system, creating the first real files of the new Arch installation.",
  partition: "A partition is a defined region of a disk. A disk can have separate partitions for boot files, the operating system, swap, or user data.",
  filesystem: "A filesystem is the structure placed on a partition so Linux can store folders and files there. ext4 and FAT32 are common examples.",
  format: "Formatting creates a filesystem on a partition. It usually erases old data on that partition.",
  mount: "Mounting attaches a filesystem to a folder path so Linux can access it. During installation, the new system is usually mounted at /mnt.",
  fstab: "fstab is a configuration file that tells Linux which partitions to mount automatically at boot.",
  chroot: "chroot means 'change root.' It makes a folder behave like the top of the filesystem, so commands run as if they are inside the new Arch install.",
  hostname: "A hostname is the computer's network name. It is how the machine identifies itself locally.",
  locale: "A locale controls language, character encoding, date formats, sorting rules, and similar regional behavior.",
  "time zone": "A time zone tells the system how to translate universal time into local clock time for logs, file timestamps, calendars, and the desktop clock.",
  "hardware detection": "Hardware detection means reading what CPU, graphics card, network device, audio device, and USB devices the machine actually has before choosing packages.",
  lscpu: "lscpu prints CPU details such as vendor and model. It helps decide whether Intel or AMD CPU microcode applies.",
  lspci: "lspci lists PCI devices such as graphics cards, Wi-Fi adapters, Ethernet adapters, storage controllers, and audio controllers.",
  lsusb: "lsusb lists USB devices. It helps identify USB Wi-Fi adapters, Bluetooth adapters, webcams, audio devices, and installation media.",
  rfkill: "rfkill shows whether wireless radios such as Wi-Fi or Bluetooth are blocked by software or hardware.",
  GPU: "GPU means graphics processing unit. The GPU determines which graphics driver path is appropriate.",
  Mesa: "Mesa provides open-source OpenGL drivers and related graphics pieces used by many Intel and AMD graphics setups.",
  NVIDIA: "NVIDIA is a GPU vendor. NVIDIA systems often need a separate driver decision instead of the Mesa-only path used by many Intel and AMD systems.",
  Vulkan: "Vulkan is a graphics API used by many games and graphics applications. On Arch, Intel and AMD Vulkan support use different Mesa split packages.",
  DNS: "DNS is the internet's naming system. It translates names like archlinux.org into IP addresses computers can connect to.",
  network: "Networking is the collection of hardware, addresses, routes, DNS, and services that let the computer communicate with other machines.",
  firewall: "A firewall is a network policy tool that decides which traffic is allowed or blocked.",
  inbound: "Inbound traffic is network traffic coming into the computer from another device.",
  outbound: "Outbound traffic is network traffic leaving the computer toward another device or service.",
  UFW: "UFW means Uncomplicated Firewall. It is a simpler command-line interface for managing firewall rules.",
  process: "A process is a running program or command. A browser, terminal, shell, service, or script can all have one or more processes.",
  fork: "Fork means a process creates another process. A runaway fork loop can create processes very quickly until the system becomes slow or unusable.",
  nproc: "nproc means number of processes in limit settings. It controls how many processes a user/session is allowed to have.",
  ulimit: "ulimit is a shell built-in that reads or sets resource limits for the current shell session and processes started from it.",
  PAM: "PAM means Pluggable Authentication Modules. It is part of the login/authentication stack that can apply account and session rules.",
  "limits.conf": "/etc/security/limits.conf is a PAM limits configuration file. It can set persistent limits such as maximum process count for users or groups.",
  "soft limit": "A soft limit is the normal active limit a session starts with. It may be lower than the hard limit.",
  "hard limit": "A hard limit is the ceiling for a resource. Normal users generally cannot raise their soft limit above the hard limit.",
  cgroup: "A cgroup is a Linux kernel control group. It groups processes so resource controls can be applied to them.",
  "systemd slice": "A systemd slice is a group unit used to organize and limit other units, services, sessions, or user workloads.",
  "drop-in": "A systemd drop-in is an extra configuration file placed in a .d directory to override or extend a unit without replacing the whole unit file.",
  CPUQuota: "CPUQuota is a systemd resource-control setting that caps CPU time for a unit or slice as a percentage.",
  MemoryMax: "MemoryMax is a systemd resource-control setting that caps memory usage for a unit or slice.",
  TasksMax: "TasksMax is a systemd setting that limits the number of tasks/processes allowed in a unit or slice.",
  "login shell": "A login shell is the shell program started for a user when they log in. It affects what command environment they receive.",
  "restricted shell": "A restricted shell is a shell configured to limit some user actions. It is not a complete security boundary by itself.",
  "/etc/shells": "/etc/shells is a file listing valid login shells known to the system.",
  rbash: "rbash is bash started in restricted mode. It limits some shell features, but it must be combined with careful permissions and is not a sandbox.",
  htop: "htop is an interactive terminal process viewer. It shows running processes, CPU use, memory use, users, and process relationships.",
  PID: "PID means process ID. It is the number the system uses to identify one running process.",
  PPID: "PPID means parent process ID. It points to the process that started another process.",
  "process tree": "A process tree shows parent and child relationships between processes.",
  "runaway process": "A runaway process is a process that consumes resources unexpectedly or creates too many child processes.",
  pstree: "pstree prints processes as a tree so parent and child relationships are easier to see.",
  wc: "wc means word count. With -l, it counts lines.",
  alert: "An alert is a notification that a measured condition crossed a chosen threshold.",
  metric: "A metric is a measured value over time, such as process count, CPU use, memory use, or fork rate.",
  threshold: "A threshold is the line where a normal value becomes worth attention, such as more than 500 processes.",
  "fork rate": "Fork rate means how quickly new processes are being created over time.",
  "false positive": "A false positive is an alert that fires even though there is no real problem.",
  signal: "A signal is a message sent to a process. Some signals ask a process to stop; stronger signals force it to stop.",
  SIGTERM: "SIGTERM is a termination signal that asks a process to exit cleanly.",
  SIGKILL: "SIGKILL is a force-kill signal. The process cannot catch it or clean up first.",
  pkill: "pkill sends signals to processes selected by name or other matching rules. It can affect more than one process.",
  "root cause": "Root cause means the original trigger or configuration that caused the problem, not just the visible symptom.",
  journalctl: "journalctl reads systemd journal logs. Logs can show whether a service repeatedly started or failed.",
  "package source": "Package source means where a file or program came from, such as an official Arch package, the AUR, a manually downloaded script, or a local file.",
  "service config": "A service config is configuration that controls how a systemd service starts, stops, restarts, and runs commands.",
  NetworkManager: "NetworkManager is a system service and set of tools that manage wired and Wi-Fi connections after the installed system boots.",
  PipeWire: "PipeWire is the modern Linux media server. It routes audio and video between apps, microphones, speakers, Bluetooth devices, and screen capture tools.",
  WirePlumber: "WirePlumber is PipeWire's session manager. It watches devices and apps, then decides how PipeWire should connect them.",
  Firefox: "Firefox is a graphical web browser. On a fresh Arch install it must be installed as a package before it can be used.",
  bootloader: "A bootloader is the small program UEFI starts from disk. It loads Linux and starts the installed system.",
  GRUB: "GRUB is the GNU GRand Unified Bootloader. It can boot Linux on both UEFI and legacy BIOS systems, but the install command differs by boot mode.",
  systemd: "systemd is the init and service manager used by Arch. It starts services during boot and manages many system-level tasks.",
  service: "A service is a background program managed by systemd, such as NetworkManager or PipeWire user services.",
  daemon: "A daemon is a background process. Services often start daemons and keep them running.",
  package: "A package is a bundled piece of software installed by pacman. It includes files, metadata, dependencies, and version information.",
  repository: "A repository is a trusted package collection that pacman can download from.",
  mirror: "A mirror is a server that hosts copies of Arch package repositories. A nearby, working mirror makes installs faster and more reliable.",
  kernel: "The kernel is the core of Linux. It talks to hardware, manages memory and processes, and provides the base that the rest of the system uses.",
  firmware: "Firmware is low-level code needed by hardware such as Wi-Fi cards, GPUs, Bluetooth adapters, and storage controllers.",
  initramfs: "The initramfs is an early boot filesystem loaded before the real root filesystem. It contains tools and drivers needed to start the installed system.",
  UUID: "A UUID is a stable identifier for a filesystem or partition. fstab commonly uses UUIDs because device names like /dev/sda can change.",
  ESP: "The EFI System Partition is a FAT32 partition where UEFI firmware looks for bootloader files.",
  "loader entry": "A loader entry is a small configuration file that tells a boot manager which kernel to start, which initramfs files to load, and which kernel command line options to pass.",
  "kernel command line": "The kernel command line is a list of options passed to Linux at boot. For an Arch root filesystem, it commonly includes a root= identifier and read/write mode.",
  initrd: "An initrd or initramfs image is loaded early in boot before the real root filesystem is mounted. In Arch entry files, initrd lines usually point to microcode and the generated initramfs image.",
  PARTUUID: "A PARTUUID is a stable partition identifier stored in the partition table. It identifies the partition itself rather than the filesystem inside it.",
  MBR: "MBR is an older disk partition table and boot layout. In BIOS mode, boot code can live in the disk's boot sector and post-MBR gap when available.",
  GPT: "GPT is the modern GUID Partition Table. It works with UEFI and can also work with BIOS, but BIOS GRUB on GPT normally needs a tiny BIOS boot partition.",
  "BIOS boot partition": "A BIOS boot partition is a tiny unformatted GPT partition used by GRUB in legacy BIOS mode to store its core image. It is not the EFI System Partition.",
  swap: "Swap is disk space Linux can use as overflow memory or for hibernation. It is slower than RAM but can prevent some out-of-memory failures.",
  "desktop environment": "A desktop environment is the graphical workspace: panels, menus, settings, file manager, session tools, and default apps.",
  "display server": "A display server provides the graphical layer that windows draw on. Xorg is the traditional display server used by many desktop setups.",
  Xorg: "Xorg is the X Window System display server. It provides the graphical foundation for Xfce in this beginner path.",
  Xfce: "Xfce is a lightweight desktop environment with a panel, window manager, settings tools, file manager, and terminal.",
  "display manager": "A display manager shows the graphical login screen and starts the selected desktop session after login.",
  LightDM: "LightDM is a lightweight display manager. In this path it shows the login screen and starts the Xfce session.",
  greeter: "A greeter is the visual login UI used by a display manager. lightdm-gtk-greeter is the GTK login screen for LightDM.",
  session: "A desktop session is the set of programs started after login, such as the window manager, panel, settings service, and desktop background.",
  "IP address": "An IP address is a numeric network address assigned to a device so other devices can send packets to it.",
  route: "A route tells the system where to send network packets. The default route usually points to the router that reaches the internet.",
  "mount point": "A mount point is the directory where a filesystem is attached, such as /mnt or /mnt/boot.",
  mountpoints: "Mountpoints are the directories where filesystems are currently attached. In lsblk output, they help reveal which partitions are in use.",
  transport: "Transport describes how storage is connected, such as USB, SATA, NVMe, or virtual. It is one clue for identifying a disk.",
  serial: "A serial number is a hardware identifier reported by some devices. It can help distinguish two drives with similar size or model.",
  "serial console": "A serial console is a text console exposed through a serial device such as ttyS0. It is useful for headless VM testing because boot messages and login prompts can be captured without a graphical window.",
  symlink: "A symbolic link is a filesystem pointer from one path to another. It is often used for configuration paths like /etc/localtime.",
  wheel: "wheel is the traditional administrator group on Arch. Users in wheel can be allowed to run sudo.",
  visudo: "visudo safely edits the sudoers file and checks syntax before saving, which helps avoid locking out administrator access.",
  iwctl: "iwctl is the interactive command-line tool for iwd, the wireless daemon available in the Arch ISO for Wi-Fi setup.",
  lsblk: "lsblk means list block devices. It shows disks, partitions, sizes, device types, models, transports, serials, and mountpoints depending on the options used.",
  "/mnt": "/mnt is a temporary mount directory commonly used during Arch installation. The new system's root filesystem is usually attached there before pacstrap runs.",
  "/etc/security/limits.conf": "/etc/security/limits.conf is the full path to the PAM limits configuration file. It can set persistent process, file, memory, and login-session limits.",
  "/etc": "/etc is the Linux directory that stores many system-wide configuration files.",
  security: "Security means reducing risk through careful defaults, least privilege, updates, verification, backups, and respect for other people's accounts and privacy.",
  privacy: "Privacy means not reading, exposing, copying, or changing another person's files, accounts, sessions, messages, keys, or data without permission.",
  ALSA: "ALSA, the Advanced Linux Sound Architecture, is the lower-level Linux sound layer that exposes audio hardware. PipeWire usually sits above it for everyday desktop audio routing."
};

const glossaryDetails = {
  sudo: {
    appears: "Commands such as sudo pacman -S firefox, sudo systemctl enable lightdm, and sudo nano /etc/security/limits.conf.",
    example: "sudo pacman -S firefox means run pacman as an administrator and install Firefox.",
    safety: "sudo is powerful. Use it only when the command needs administrator access and you understand the path, package, service, or account being changed."
  },
  ls: {
    appears: "Simple inspection commands such as ls /mnt.",
    example: "ls /mnt means list what is inside the /mnt directory.",
    safety: "ls reads directory contents. It does not erase data by itself."
  },
  lsblk: {
    appears: "Disk discovery and safety checkpoints before partitioning, formatting, mounting, and fstab generation.",
    example: "lsblk -o NAME,SIZE,TYPE,MODEL,TRAN,SERIAL,MOUNTPOINTS means list block devices and show those exact columns.",
    safety: "lsblk is inspection-only, but the decisions made from its output can be dangerous. Do not guess which disk is the target."
  },
  nano: {
    appears: "File edits such as nano /etc/locale.gen and sudo nano /etc/security/limits.conf.",
    example: "nano /path/to/file means open that exact file path in the nano text editor.",
    safety: "nano can change important files. Before saving, compare the exact full file contents the app shows with what is on screen."
  },
  mount: {
    appears: "Commands that attach the target root, EFI, or boot partition under /mnt.",
    example: "mount /dev/sda2 /mnt means attach the filesystem on /dev/sda2 at the /mnt directory.",
    safety: "Mounting the wrong partition can make later commands install or configure the wrong place. Confirm with lsblk before continuing."
  },
  root: {
    appears: "Root account, root filesystem, root partition, root= kernel option, and chroot.",
    example: "Root can mean the administrator user or the top filesystem location /, depending on context.",
    safety: "When a page says root, read the surrounding words. Root user and root partition are different ideas."
  },
  UUID: {
    appears: "fstab, bootloader entries, persistent block-device naming, and filesystem identity checks.",
    example: "UUID=abcd-1234 tells Linux to find a filesystem by stable identifier instead of a changeable name like /dev/sda2.",
    safety: "A wrong UUID can make the system mount the wrong filesystem or fail to boot. Copy UUIDs exactly."
  },
  DNS: {
    appears: "Network checks before package installs, Firefox setup, and troubleshooting name-resolution failures.",
    example: "ping archlinux.org needs DNS because the name archlinux.org must be translated into an IP address first.",
    safety: "If DNS is broken, do not assume pacman or Firefox is broken. Separate IP connectivity from name lookup."
  },
  "/mnt": {
    appears: "Mount, pacstrap, genfstab, and inspection commands during installation.",
    example: "ls /mnt means list what is inside the temporary install mount directory.",
    safety: "If /mnt is empty when it should contain the target system, stop and check mounts before installing or generating fstab."
  },
  "/etc/security/limits.conf": {
    appears: "Persistent process-limit hardening with PAM limits.",
    example: "sudo nano /etc/security/limits.conf means edit the system-wide PAM limits configuration file as administrator.",
    safety: "Bad limits can block terminals, desktops, shells, or services. Keep a recovery login path and use conservative values."
  },
  PAM: {
    appears: "Login/session rules, limits.conf, and account safety warnings.",
    example: "PAM applies rules during authentication and session setup, so limits can take effect when a user logs in.",
    safety: "PAM mistakes can affect logins. Never edit PAM-related files without a recovery plan."
  },
  "soft limit": {
    appears: "limits.conf lines that define the normal active value for a resource.",
    example: "@students soft nproc 500 means users in the students group normally start with a 500-process limit.",
    safety: "A soft limit that is too low can break normal applications. Test carefully."
  },
  "hard limit": {
    appears: "limits.conf lines that define the ceiling a normal user cannot exceed.",
    example: "@students hard nproc 1000 means users in the students group cannot raise nproc above 1000.",
    safety: "A hard limit that is too low can be hard for the user to work around without administrator help."
  },
  nproc: {
    appears: "ulimit -u, limits.conf, process-count controls, fork-risk hardening, and safety monitoring.",
    example: "nproc=500 or nproc 500 means limit the number of processes/tasks a user/session may create.",
    safety: "nproc helps prevent runaway process creation, but values must leave room for a normal desktop, browser, terminal, and services."
  },
  systemd: {
    appears: "Services, boot, NetworkManager, LightDM, PipeWire user services, cgroups, and resource controls.",
    example: "systemctl status NetworkManager asks systemd for NetworkManager's current service state.",
    safety: "Starting, enabling, or changing services can affect boot, network, login, and security behavior."
  },
  process: {
    appears: "Safety hardening, htop, ps, pstree, kill, fork-rate, and root-cause sections.",
    example: "A terminal shell, Firefox tab process, background service, and install command can each be processes.",
    safety: "Killing a process can close unsaved work. Inspect ownership, PID, PPID, and command first."
  },
  privacy: {
    appears: "Safety reminders around monitoring, process inspection, shell access, logs, and other users.",
    example: "Respect privacy means do not inspect someone else's files, sessions, messages, logs, or accounts without permission.",
    safety: "This guide is for systems you own or administer with permission."
  }
};

const officialSources = {
  installGuide: {
    label: "ArchWiki: Installation guide",
    url: "https://wiki.archlinux.org/title/Installation_guide",
    note: "Canonical install sequence for booting the ISO, preparing disks, installing packages, chrooting, and basic system configuration."
  },
  usbInstall: {
    label: "ArchWiki: USB flash installation medium",
    url: "https://wiki.archlinux.org/title/USB_flash_installation_medium",
    note: "Official guidance for creating the bootable USB installer."
  },
  networkConfig: {
    label: "ArchWiki: Network configuration",
    url: "https://wiki.archlinux.org/title/Network_configuration",
    note: "Network interfaces, addresses, routing, and setup concepts."
  },
  dns: {
    label: "ArchWiki: Domain name resolution",
    url: "https://wiki.archlinux.org/title/Domain_name_resolution",
    note: "DNS resolver behavior and troubleshooting concepts."
  },
  networkManager: {
    label: "ArchWiki: NetworkManager",
    url: "https://wiki.archlinux.org/title/NetworkManager",
    note: "NetworkManager service setup and connection management."
  },
  partitioning: {
    label: "ArchWiki: Partitioning",
    url: "https://wiki.archlinux.org/title/Partitioning",
    note: "Disk layout, partition tables, and partition purpose."
  },
  fileSystems: {
    label: "ArchWiki: File systems",
    url: "https://wiki.archlinux.org/title/File_systems",
    note: "Filesystem types, creation, and mounting background."
  },
  persistentBlockDeviceNaming: {
    label: "ArchWiki: Persistent block device naming",
    url: "https://wiki.archlinux.org/title/Persistent_block_device_naming",
    note: "Background on why kernel device names can change and why stable identifiers matter."
  },
  lsblkMan: {
    label: "Manual: lsblk(8)",
    url: "https://man.archlinux.org/man/lsblk.8",
    note: "Official command reference for listing block devices and output columns."
  },
  efiSystemPartition: {
    label: "ArchWiki: EFI system partition",
    url: "https://wiki.archlinux.org/title/EFI_system_partition",
    note: "UEFI boot partition requirements and mount points."
  },
  generalRecommendations: {
    label: "ArchWiki: General recommendations",
    url: "https://wiki.archlinux.org/title/General_recommendations",
    note: "Post-install system setup topics after the base install."
  },
  security: {
    label: "ArchWiki: Security",
    url: "https://wiki.archlinux.org/title/Security",
    note: "General Arch security recommendations and defensive system-hardening context."
  },
  ufw: {
    label: "ArchWiki: Uncomplicated Firewall",
    url: "https://wiki.archlinux.org/title/Uncomplicated_Firewall",
    note: "ArchWiki guidance for UFW firewall setup and service usage."
  },
  ufwPackage: {
    label: "Arch package: ufw",
    url: "https://archlinux.org/packages/extra/any/ufw/",
    note: "Official Arch package page for Uncomplicated Firewall."
  },
  bashMan: {
    label: "Manual: bash(1)",
    url: "https://man.archlinux.org/man/bash.1",
    note: "Official shell manual covering built-ins such as ulimit and shell session behavior."
  },
  limitsConfMan: {
    label: "Manual: limits.conf(5)",
    url: "https://man.archlinux.org/man/limits.conf.5",
    note: "Official reference for PAM limits.conf syntax, domains, types, items, and values."
  },
  pam: {
    label: "ArchWiki: PAM",
    url: "https://wiki.archlinux.org/title/PAM",
    note: "ArchWiki page for Pluggable Authentication Modules and login/session behavior."
  },
  systemdResourceControlMan: {
    label: "Manual: systemd.resource-control(5)",
    url: "https://man.archlinux.org/man/systemd.resource-control.5",
    note: "Official systemd resource-control reference for CPU, memory, task, and cgroup-backed controls."
  },
  systemdSliceMan: {
    label: "Manual: systemd.slice(5)",
    url: "https://man.archlinux.org/man/systemd.slice.5",
    note: "Official systemd slice unit reference."
  },
  systemdUnitMan: {
    label: "Manual: systemd.unit(5)",
    url: "https://man.archlinux.org/man/systemd.unit.5",
    note: "Official systemd unit and drop-in configuration reference."
  },
  chshMan: {
    label: "Manual: chsh(1)",
    url: "https://man.archlinux.org/man/chsh.1",
    note: "Official command reference for changing a user's login shell."
  },
  shellsMan: {
    label: "Manual: shells(5)",
    url: "https://man.archlinux.org/man/shells.5",
    note: "Official reference for /etc/shells."
  },
  bashRestrictedMan: {
    label: "Manual: bash restricted shell",
    url: "https://man.archlinux.org/man/bash.1#RESTRICTED_SHELL",
    note: "Official bash manual section describing restricted shell behavior."
  },
  htopPackage: {
    label: "Arch package: htop",
    url: "https://archlinux.org/packages/extra/x86_64/htop/",
    note: "Official Arch package page for htop."
  },
  usersGroups: {
    label: "ArchWiki: Users and groups",
    url: "https://wiki.archlinux.org/title/Users_and_groups",
    note: "User accounts, groups, and normal-user setup."
  },
  sudo: {
    label: "ArchWiki: sudo",
    url: "https://wiki.archlinux.org/title/Sudo",
    note: "Administrator privileges for normal user accounts."
  },
  locale: {
    label: "ArchWiki: Locale",
    url: "https://wiki.archlinux.org/title/Locale",
    note: "Language, encoding, and regional settings."
  },
  systemTime: {
    label: "ArchWiki: System time",
    url: "https://wiki.archlinux.org/title/System_time",
    note: "Time zone, hardware clock, and time sync concepts."
  },
  bootLoader: {
    label: "ArchWiki: Arch boot process",
    url: "https://wiki.archlinux.org/title/Arch_boot_process",
    note: "How firmware, bootloaders, the kernel, and userspace fit together."
  },
  systemdBoot: {
    label: "ArchWiki: systemd-boot",
    url: "https://wiki.archlinux.org/title/Systemd-boot",
    note: "One official bootloader path for UEFI systems."
  },
  systemdBootMan: {
    label: "Manual: systemd-boot(7)",
    url: "https://man.archlinux.org/man/systemd-boot.7",
    note: "Official description of systemd-boot, boot entry locations, and UEFI-only behavior."
  },
  bootctlMan: {
    label: "Manual: bootctl(1)",
    url: "https://man.archlinux.org/man/bootctl.1",
    note: "Official command reference for installing, checking, and managing systemd-boot."
  },
  loaderConfMan: {
    label: "Manual: loader.conf(5)",
    url: "https://man.archlinux.org/man/loader.conf.5",
    note: "Official configuration file reference for systemd-boot loader settings."
  },
  grub: {
    label: "ArchWiki: GRUB",
    url: "https://wiki.archlinux.org/title/GRUB",
    note: "Common bootloader option for UEFI and BIOS systems."
  },
  grubInstallMan: {
    label: "Manual: grub-install(8)",
    url: "https://man.archlinux.org/man/grub-install.8",
    note: "Official command reference for installing GRUB to EFI and BIOS targets."
  },
  grubMkconfigMan: {
    label: "Manual: grub-mkconfig(8)",
    url: "https://man.archlinux.org/man/grub-mkconfig.8",
    note: "Official command reference for generating a GRUB configuration file."
  },
  grubPackage: {
    label: "Arch package: grub",
    url: "https://archlinux.org/packages/core/x86_64/grub/",
    note: "Official package page for GNU GRUB on Arch."
  },
  efibootmgrPackage: {
    label: "Arch package: efibootmgr",
    url: "https://archlinux.org/packages/core/x86_64/efibootmgr/",
    note: "Official package page for the EFI boot manager userspace tool used by GRUB EFI installs."
  },
  xorg: {
    label: "ArchWiki: Xorg",
    url: "https://wiki.archlinux.org/title/Xorg",
    note: "Display server background and Xorg setup guidance."
  },
  xfce: {
    label: "ArchWiki: Xfce",
    url: "https://wiki.archlinux.org/title/Xfce",
    note: "Official ArchWiki page for installing and starting Xfce."
  },
  lightdm: {
    label: "ArchWiki: LightDM",
    url: "https://wiki.archlinux.org/title/LightDM",
    note: "Official ArchWiki page for LightDM display manager setup."
  },
  displayManager: {
    label: "ArchWiki: Display manager",
    url: "https://wiki.archlinux.org/title/Display_manager",
    note: "Background on graphical login managers and enabling them."
  },
  xorgServerPackage: {
    label: "Arch package: xorg-server",
    url: "https://archlinux.org/packages/extra/x86_64/xorg-server/",
    note: "Official package page for the Xorg X server."
  },
  xfce4Group: {
    label: "Arch package group: xfce4",
    url: "https://archlinux.org/groups/x86_64/xfce4/",
    note: "Official Arch package group for the core Xfce desktop components."
  },
  lightdmPackage: {
    label: "Arch package: lightdm",
    url: "https://archlinux.org/packages/extra/x86_64/lightdm/",
    note: "Official package page for LightDM."
  },
  lightdmGtkGreeterPackage: {
    label: "Arch package: lightdm-gtk-greeter",
    url: "https://archlinux.org/packages/extra/x86_64/lightdm-gtk-greeter/",
    note: "Official package page for the GTK greeter used by LightDM."
  },
  sudoPackage: {
    label: "Arch package: sudo",
    url: "https://archlinux.org/packages/core/x86_64/sudo/",
    note: "Official package page for sudo."
  },
  nanoPackage: {
    label: "Arch package: nano",
    url: "https://archlinux.org/packages/core/x86_64/nano/",
    note: "Official package page for nano."
  },
  pipewirePulsePackage: {
    label: "Arch package: pipewire-pulse",
    url: "https://archlinux.org/packages/extra/x86_64/pipewire-pulse/",
    note: "Official package page for PipeWire's PulseAudio-compatible server."
  },
  pavucontrolPackage: {
    label: "Arch package: pavucontrol",
    url: "https://archlinux.org/packages/extra/x86_64/pavucontrol/",
    note: "Official package page for PulseAudio Volume Control."
  },
  xfce4TerminalPackage: {
    label: "Arch package: xfce4-terminal",
    url: "https://archlinux.org/packages/extra/x86_64/xfce4-terminal/",
    note: "Official package page for the Xfce terminal emulator."
  },
  thunarPackage: {
    label: "Arch package: thunar",
    url: "https://archlinux.org/packages/extra/x86_64/thunar/",
    note: "Official package page for the Xfce file manager."
  },
  pacman: {
    label: "ArchWiki: pacman",
    url: "https://wiki.archlinux.org/title/Pacman",
    note: "Arch package manager usage and package database concepts."
  },
  pacstrapMan: {
    label: "Manual: pacstrap(8)",
    url: "https://man.archlinux.org/man/pacstrap.8",
    note: "Official command reference for installing packages into a new root."
  },
  genfstabMan: {
    label: "Manual: genfstab(8)",
    url: "https://man.archlinux.org/man/genfstab.8",
    note: "Official command reference for generating fstab entries."
  },
  archChrootMan: {
    label: "Manual: arch-chroot(8)",
    url: "https://man.archlinux.org/man/arch-chroot.8",
    note: "Official command reference for entering the installed system."
  },
  systemctlMan: {
    label: "Manual: systemctl(1)",
    url: "https://man.archlinux.org/man/systemctl.1",
    note: "Official command reference for controlling systemd services."
  },
  pipewire: {
    label: "ArchWiki: PipeWire",
    url: "https://wiki.archlinux.org/title/PipeWire",
    note: "Audio/video routing, PulseAudio compatibility, and session setup."
  },
  wireplumber: {
    label: "ArchWiki: WirePlumber",
    url: "https://wiki.archlinux.org/title/WirePlumber",
    note: "PipeWire session manager configuration and policy behavior."
  },
  alsa: {
    label: "ArchWiki: ALSA",
    url: "https://wiki.archlinux.org/title/Advanced_Linux_Sound_Architecture",
    note: "Lower-level Linux sound subsystem background."
  },
  firefox: {
    label: "Arch package: firefox",
    url: "https://archlinux.org/packages/extra/x86_64/firefox/",
    note: "Official package page for Firefox in Arch repositories."
  },
  networkManagerPackage: {
    label: "Arch package: networkmanager",
    url: "https://archlinux.org/packages/extra/x86_64/networkmanager/",
    note: "Official package page for NetworkManager."
  },
  pipewirePackage: {
    label: "Arch package: pipewire",
    url: "https://archlinux.org/packages/extra/x86_64/pipewire/",
    note: "Official package page for PipeWire."
  },
  wireplumberPackage: {
    label: "Arch package: wireplumber",
    url: "https://archlinux.org/packages/extra/x86_64/wireplumber/",
    note: "Official package page for WirePlumber."
  },
  mesaPackage: {
    label: "Arch package: mesa",
    url: "https://archlinux.org/packages/extra/x86_64/mesa/",
    note: "Official package page for Mesa open-source OpenGL drivers."
  },
  vulkanIntelPackage: {
    label: "Arch package: vulkan-intel",
    url: "https://archlinux.org/packages/extra/x86_64/vulkan-intel/",
    note: "Official package page for Intel Vulkan driver support."
  },
  vulkanRadeonPackage: {
    label: "Arch package: vulkan-radeon",
    url: "https://archlinux.org/packages/extra/x86_64/vulkan-radeon/",
    note: "Official package page for Radeon Vulkan driver support."
  },
  nvidiaOpenPackage: {
    label: "Arch package: nvidia-open",
    url: "https://archlinux.org/packages/extra/x86_64/nvidia-open/",
    note: "Official package page for NVIDIA open kernel modules."
  },
  nvidiaUtilsPackage: {
    label: "Arch package: nvidia-utils",
    url: "https://archlinux.org/packages/extra/x86_64/nvidia-utils/",
    note: "Official package page for NVIDIA userspace utilities and libraries."
  },
  archWikiDocsPackage: {
    label: "Arch package: arch-wiki-docs",
    url: "https://archlinux.org/packages/extra/any/arch-wiki-docs/",
    note: "Official package for offline ArchWiki pages."
  },
  archWikiLitePackage: {
    label: "Arch package: arch-wiki-lite",
    url: "https://archlinux.org/packages/extra/any/arch-wiki-lite/",
    note: "Official package for console-searchable ArchWiki text."
  }
};

function sourceRefs(...keys) {
  return keys.map((key) => officialSources[key]);
}

const sections = [
  {
    title: "Before You Start",
    summary: "Prepare a second screen, understand the ISO, and know what can be erased.",
    sources: sourceRefs("installGuide", "usbInstall", "archWikiDocsPackage", "archWikiLitePackage"),
    blocks: [
      {
        type: "goal",
        title: "Goal",
        text: "Make sure the learner knows what machine they are installing onto, what device they are reading this guide from, and what data is at risk."
      },
      {
        type: "explain",
        title: "What the Arch ISO is",
        text: "The Arch ISO is a temporary operating system that runs from the USB stick. It gives you tools to create the real installation on the internal drive. When you reboot without the USB, the ISO disappears unless you installed a system to disk."
      },
      {
        type: "warn",
        title: "What will be erased",
        text: "Disk setup can erase the selected drive. The guide must repeatedly ask the learner to compare disk sizes and names before formatting anything."
      }
    ],
    commands: [
      {
        label: "Check the keyboard layout",
        sources: sourceRefs("installGuide"),
        command: "localectl list-keymaps",
        purpose: "Shows available keyboard layouts in the live ISO.",
        words: [
          ["localectl", "A systemd tool for locale and keyboard settings."],
          ["list-keymaps", "Asks localectl to print keyboard layout names."]
        ],
        expected: "A long list such as us, uk, de, fr, es, and many more.",
        fails: "If the output is long, press q if it opens in a pager. Most US keyboards can continue with the default layout."
      },
      {
        label: "Set a non-US keyboard layout",
        sources: sourceRefs("installGuide"),
        command: "loadkeys uk",
        purpose: "Changes the keyboard layout in the live ISO. Replace uk with the layout you need.",
        words: [
          ["loadkeys", "Loads a keyboard map for the current console."],
          ["uk", "The layout name. This is an argument, not a magic word."]
        ],
        expected: "Usually no output. The keyboard should type using the selected layout.",
        fails: "If it says the keymap cannot be found, run localectl list-keymaps and choose an exact name."
      }
    ],
    terms: ["Arch ISO", "terminal", "shell", "command", "option", "argument"]
  },
  {
    title: "Boot Into The ISO",
    summary: "Choose the USB from firmware and confirm the live environment can reach the internet.",
    sources: sourceRefs("installGuide", "networkConfig", "dns"),
    blocks: [
      {
        type: "explain",
        title: "BIOS, UEFI, and the boot menu",
        text: "Before Linux starts, firmware runs first. The boot menu lets you choose the USB stick instead of the internal drive. UEFI systems often show entries like 'UEFI: SanDisk' or the USB model name."
      },
      {
        type: "checkpoint",
        title: "Checkpoint",
        text: "You should see an Arch Linux shell prompt. That means the computer is running the temporary ISO environment."
      }
    ],
    commands: [
      {
        label: "Confirm UEFI mode",
        sources: sourceRefs("installGuide", "efiSystemPartition"),
        command: "ls /sys/firmware/efi/efivars",
        purpose: "Checks whether the ISO booted in UEFI mode by listing UEFI variable files.",
        words: [
          ["ls", "Lists files in a directory."],
          ["/sys/firmware/efi/efivars", "A system path that exists when Linux was booted through UEFI."]
        ],
        expected: "Many filenames are printed. That means UEFI mode is active.",
        fails: "If it says the path does not exist, the machine may be in legacy BIOS mode. Reboot and choose the UEFI version of the USB entry if available."
      },
      {
        label: "Check network reachability",
        sources: sourceRefs("installGuide", "networkConfig", "dns"),
        command: "ping -c 3 archlinux.org",
        purpose: "Tests whether the computer can resolve a domain name and send packets to the internet.",
        words: [
          ["ping", "Sends small test packets to another machine."],
          ["-c 3", "Stops after 3 replies instead of running forever."],
          ["archlinux.org", "The domain name being tested."]
        ],
        expected: "Replies with times in ms and a summary showing 0% packet loss.",
        fails: "If it says temporary failure in name resolution, DNS is failing. If it says network unreachable, the connection itself is not ready."
      }
    ],
    terms: ["BIOS", "UEFI", "boot menu", "network", "DNS"]
  },
  {
    title: "Disk Setup",
    summary: "Identify the real disk, create partitions, format them, and mount them under /mnt.",
    sources: sourceRefs("installGuide", "partitioning", "fileSystems", "efiSystemPartition"),
    blocks: [
      {
        type: "warn",
        title: "Danger zone",
        text: "This is the part that can destroy data. A beginner guide should make the learner write down the target disk name and size before any partitioning command."
      },
      {
        type: "explain",
        title: "Partition, format, mount",
        text: "Partitioning divides the drive into regions. Formatting puts a filesystem on a partition. Mounting attaches that filesystem to a folder so the installer can place files inside it."
      }
    ],
    commands: [
      {
        label: "List disks and partitions",
        sources: sourceRefs("installGuide", "partitioning"),
        command: "lsblk",
        purpose: "Shows block devices: internal drives, USB sticks, and their partitions.",
        words: [
          ["lsblk", "List block devices. A block device is storage Linux reads in chunks."],
          ["NAME", "Device name, such as nvme0n1 or sda."],
          ["SIZE", "Capacity. Use this to recognize the internal disk."],
          ["TYPE", "disk means whole drive; part means partition."]
        ],
        expected: "A tree of devices. The USB stick and internal drive should have different sizes.",
        fails: "If you cannot tell which disk is correct, stop. Unplug extra drives if possible and run lsblk again."
      },
      {
        label: "Format the Linux root partition",
        sources: sourceRefs("installGuide", "fileSystems"),
        command: "mkfs.ext4 /dev/nvme0n1p2",
        purpose: "Creates an ext4 filesystem on the root partition. Replace the device path with the correct partition.",
        words: [
          ["mkfs.ext4", "Make an ext4 filesystem."],
          ["/dev/nvme0n1p2", "Example partition path. This must match the learner's real root partition."]
        ],
        expected: "Progress text ending with filesystem accounting information.",
        fails: "If it says the device is mounted, unmount it first. If the device name is wrong, do not guess."
      },
      {
        label: "Mount the new root filesystem",
        sources: sourceRefs("installGuide", "fileSystems"),
        command: "mount /dev/nvme0n1p2 /mnt",
        purpose: "Attaches the new root partition at /mnt so pacstrap can install Arch into it.",
        words: [
          ["mount", "Attach a filesystem to a directory."],
          ["/dev/nvme0n1p2", "The partition being attached."],
          ["/mnt", "The temporary folder where the new system will appear."]
        ],
        expected: "Usually no output. Running lsblk should show /mnt in the MOUNTPOINTS column.",
        fails: "If /mnt is busy or the partition is wrong, check lsblk before continuing."
      }
    ],
    terms: ["partition", "filesystem", "format", "mount", "ls"]
  },
  {
    title: "Install Base System",
    summary: "Use pacstrap, generate fstab, and enter the installed system with arch-chroot.",
    sources: sourceRefs("installGuide", "pacstrapMan", "genfstabMan", "archChrootMan", "pacman"),
    blocks: [
      {
        type: "explain",
        title: "Bootstrap in plain English",
        text: "Bootstrapping means using a small working environment to create a larger working system. The ISO is the small environment. pacstrap uses it to install the first packages into /mnt. After that, /mnt starts becoming a real Arch system."
      },
      {
        type: "explain",
        title: "Why chroot matters",
        text: "Before chroot, commands affect the live ISO. After arch-chroot /mnt, commands affect the new installed system. This distinction explains many beginner mistakes."
      }
    ],
    commands: [
      {
        label: "Install the base packages",
        sources: sourceRefs("installGuide", "pacstrapMan", "pacman", "networkManagerPackage"),
        command: "pacstrap -K /mnt base linux linux-firmware nano networkmanager",
        purpose: "Downloads and installs the minimum packages needed for a bootable Arch system plus a text editor and networking service.",
        words: [
          ["pacstrap", "Install packages into a mounted target system."],
          ["-K", "Initializes a fresh pacman keyring in the new system."],
          ["/mnt", "The target installation directory."],
          ["base", "Core userspace tools."],
          ["linux", "The Linux kernel."],
          ["linux-firmware", "Firmware files for hardware support."],
          ["nano", "A terminal text editor."],
          ["networkmanager", "A service that manages wired and Wi-Fi connections after install."]
        ],
        expected: "Package download and install progress, ending without errors.",
        fails: "If downloads fail, test ping and DNS. If keys fail, check the system clock and pacman keyring."
      },
      {
        label: "Generate the filesystem table",
        sources: sourceRefs("installGuide", "genfstabMan"),
        command: "genfstab -U /mnt >> /mnt/etc/fstab",
        purpose: "Writes mount instructions so the installed system knows which partitions to mount on boot.",
        words: [
          ["genfstab", "Generates fstab entries from currently mounted filesystems."],
          ["-U", "Uses UUIDs, stable partition identifiers that survive device name changes."],
          ["/mnt", "The mounted installed system."],
          [">>", "Append output to a file instead of printing it only."],
          ["/mnt/etc/fstab", "The fstab file inside the new system."]
        ],
        expected: "Usually no output. The file should contain entries for root and boot partitions.",
        fails: "If the file is empty, the partitions may not be mounted. Run lsblk and mount the needed partitions."
      },
      {
        label: "Enter the new system",
        sources: sourceRefs("installGuide", "archChrootMan"),
        command: "arch-chroot /mnt",
        purpose: "Changes into the installed system so configuration commands apply to it.",
        words: [
          ["arch-chroot", "Arch helper for entering a mounted Linux system."],
          ["/mnt", "The new system's root directory."]
        ],
        expected: "The prompt changes. You are now operating inside the installed system.",
        fails: "If it cannot find /bin/bash or system files, pacstrap may not have completed correctly."
      }
    ],
    terms: ["pacstrap", "pacman", "fstab", "chroot", "nano"]
  },
  {
    title: "Configure System",
    summary: "Set time, language, hostname, users, networking, and the bootloader.",
    sources: sourceRefs("installGuide", "systemTime", "locale", "usersGroups", "sudo", "bootLoader", "systemdBoot", "grub", "networkManager"),
    blocks: [
      {
        type: "explain",
        title: "Configuration files are part of the system",
        text: "Linux stores many settings as plain text files. Editing them is not a hack; it is the normal way to configure a minimal Arch system."
      },
      {
        type: "explain",
        title: "Bootloader role",
        text: "The bootloader is what UEFI starts from the disk. Without it, the installed files may exist but the firmware will not know how to start Linux."
      }
    ],
    commands: [
      {
        label: "Set the time zone",
        sources: sourceRefs("installGuide", "systemTime"),
        command: "ln -sf /usr/share/zoneinfo/America/Phoenix /etc/localtime",
        purpose: "Links the system time zone file to the selected region.",
        words: [
          ["ln", "Creates links between files."],
          ["-s", "Creates a symbolic link, like a pointer."],
          ["-f", "Replaces an existing destination if needed."],
          ["/usr/share/zoneinfo/America/Phoenix", "The chosen time zone file."],
          ["/etc/localtime", "The standard system time zone path."]
        ],
        expected: "Usually no output.",
        fails: "If the zone path does not exist, list /usr/share/zoneinfo and choose the correct region and city."
      },
      {
        label: "Edit locale generation list",
        sources: sourceRefs("installGuide", "locale"),
        command: "nano /etc/locale.gen",
        purpose: "Opens the locale list so the learner can enable a language/encoding such as en_US.UTF-8 UTF-8.",
        words: [
          ["nano", "Opens a terminal text editor."],
          ["/etc/locale.gen", "The file listing locales that can be generated."]
        ],
        expected: "A text editor opens. Remove # from the needed UTF-8 locale, save, and exit.",
        fails: "In nano, Ctrl+O writes the file, Enter confirms, and Ctrl+X exits."
      },
      {
        label: "Enable NetworkManager",
        sources: sourceRefs("installGuide", "networkManager", "systemctlMan", "networkManagerPackage"),
        command: "systemctl enable NetworkManager",
        purpose: "Makes NetworkManager start automatically on the installed system after reboot.",
        words: [
          ["systemctl", "Controls systemd services."],
          ["enable", "Registers a service to start during boot."],
          ["NetworkManager", "The networking service installed by pacstrap."]
        ],
        expected: "A message about creating a symlink.",
        fails: "If the unit does not exist, install networkmanager with pacman -S networkmanager."
      }
    ],
    terms: ["locale", "hostname", "bootloader", "sudo", "root", "network"]
  },
  {
    title: "First Boot",
    summary: "Exit the installer, reboot, log in, and make the new system usable.",
    sources: sourceRefs("installGuide", "generalRecommendations", "sudo", "pacman", "networkConfig", "dns"),
    blocks: [
      {
        type: "checkpoint",
        title: "Checkpoint",
        text: "The first successful boot usually lands at a login prompt or display manager, depending on what was installed."
      },
      {
        type: "explain",
        title: "Why sudo appears now",
        text: "Inside the ISO and chroot, many commands run as root. After first boot, the learner should use a normal account and use sudo only when administrator privileges are needed."
      }
    ],
    commands: [
      {
        label: "Leave chroot",
        sources: sourceRefs("installGuide"),
        command: "exit",
        purpose: "Returns from the installed system back to the live ISO shell.",
        words: [
          ["exit", "Closes the current shell session."]
        ],
        expected: "The prompt changes back to the ISO environment.",
        fails: "If nested shells were opened, exit may need to be typed more than once."
      },
      {
        label: "Reboot",
        sources: sourceRefs("installGuide"),
        command: "reboot",
        purpose: "Restarts the computer so it can boot from the installed system.",
        words: [
          ["reboot", "Asks systemd to restart the machine."]
        ],
        expected: "The machine restarts. Remove the USB when prompted or before it boots the ISO again.",
        fails: "If the ISO starts again, open the boot menu and choose the internal drive."
      },
      {
        label: "Update packages after login",
        sources: sourceRefs("pacman", "sudo", "networkConfig", "dns"),
        command: "sudo pacman -Syu",
        purpose: "Synchronizes package databases and upgrades installed packages.",
        words: [
          ["sudo", "Runs the command with administrator privileges."],
          ["pacman", "Arch package manager."],
          ["-S", "Sync/install packages from repositories."],
          ["-y", "Refresh package databases."],
          ["-u", "Upgrade installed packages."]
        ],
        expected: "Package database refresh and any available upgrades.",
        fails: "If DNS fails, check NetworkManager and resolv.conf. If permission is denied, confirm the user is in the wheel group and sudo is configured."
      }
    ],
    terms: ["sudo", "pacman", "root", "network", "DNS"]
  },
  {
    title: "Firefox",
    summary: "Install Firefox and verify that networking and DNS work in a graphical browser.",
    sources: sourceRefs("firefox", "pacman", "networkConfig", "dns"),
    blocks: [
      {
        type: "explain",
        title: "Browser versus network",
        text: "Firefox can only load websites if several layers work: the network interface has a connection, the system has an IP address and route, DNS can translate names, and the browser can reach the site."
      },
      {
        type: "explain",
        title: "DNS in detail",
        text: "Humans type names like archlinux.org. Computers connect to numeric IP addresses. DNS is the lookup service between those two. If DNS is broken, pinging 1.1.1.1 may work while pinging archlinux.org fails."
      }
    ],
    commands: [
      {
        label: "Install Firefox",
        sources: sourceRefs("firefox", "pacman"),
        command: "sudo pacman -S firefox",
        purpose: "Installs the Firefox browser package from Arch repositories.",
        words: [
          ["sudo", "Requests administrator privileges."],
          ["pacman", "Package manager."],
          ["-S", "Install/sync package."],
          ["firefox", "The package name."]
        ],
        expected: "pacman asks for confirmation, downloads Firefox, and installs it.",
        fails: "If package downloads fail, test ping -c 3 1.1.1.1 and ping -c 3 archlinux.org to separate network problems from DNS problems."
      },
      {
        label: "Check DNS specifically",
        sources: sourceRefs("dns", "networkConfig"),
        command: "resolvectl query archlinux.org",
        purpose: "Asks the system resolver to look up the IP address for archlinux.org.",
        words: [
          ["resolvectl", "systemd tool for DNS resolver status and queries."],
          ["query", "Perform a DNS lookup."],
          ["archlinux.org", "The name to resolve."]
        ],
        expected: "One or more IP addresses are returned.",
        fails: "If no DNS servers are configured, NetworkManager or systemd-resolved may need configuration."
      }
    ],
    terms: ["Firefox", "network", "DNS", "pacman", "sudo"]
  },
  {
    title: "Audio",
    summary: "Install PipeWire and WirePlumber, then test speakers and microphone.",
    sources: sourceRefs("pipewire", "wireplumber", "alsa", "pipewirePackage", "wireplumberPackage"),
    blocks: [
      {
        type: "explain",
        title: "PipeWire in detail",
        text: "Apps do not usually talk directly to speakers or microphones. They send audio streams to a media server. PipeWire is that server. It knows about devices, app streams, volume, Bluetooth audio, and screen/audio capture."
      },
      {
        type: "explain",
        title: "WirePlumber in detail",
        text: "PipeWire provides the plumbing, but WirePlumber makes policy decisions. It notices when a headset appears, chooses default devices, restores volume, and links app streams to outputs and inputs."
      }
    ],
    commands: [
      {
        label: "Install audio packages",
        sources: sourceRefs("pipewire", "wireplumber", "pipewirePackage", "wireplumberPackage", "pacman"),
        command: "sudo pacman -S pipewire pipewire-pulse wireplumber pavucontrol",
        purpose: "Installs the PipeWire audio server, PulseAudio compatibility, the WirePlumber session manager, and a volume control app.",
        words: [
          ["pipewire", "Core media server."],
          ["pipewire-pulse", "Lets apps expecting PulseAudio talk to PipeWire."],
          ["wireplumber", "PipeWire session manager."],
          ["pavucontrol", "Graphical mixer for inputs, outputs, and app volumes."]
        ],
        expected: "Packages install successfully.",
        fails: "If there is a package conflict with pulseaudio, pacman may ask to replace it. On a PipeWire setup, replacing PulseAudio is usually expected."
      },
      {
        label: "Start user audio services",
        sources: sourceRefs("pipewire", "wireplumber", "systemctlMan"),
        command: "systemctl --user enable --now pipewire pipewire-pulse wireplumber",
        purpose: "Starts audio services for the current user and enables them for future logins.",
        words: [
          ["systemctl", "Controls systemd services."],
          ["--user", "Targets the logged-in user's services, not system-wide services."],
          ["enable", "Start automatically in future sessions."],
          ["--now", "Also start immediately."],
          ["pipewire pipewire-pulse wireplumber", "The user services needed for common audio."]
        ],
        expected: "Usually no output if everything starts correctly.",
        fails: "If the user service manager is unavailable, log out and back in, then retry."
      },
      {
        label: "Open the mixer",
        sources: sourceRefs("pipewire", "alsa"),
        command: "pavucontrol",
        purpose: "Opens a graphical app to choose output devices, input devices, and per-app volume.",
        words: [
          ["pavucontrol", "PulseAudio Volume Control. With pipewire-pulse, it controls PipeWire audio streams too."]
        ],
        expected: "A window opens with Output Devices, Input Devices, Playback, and Recording tabs.",
        fails: "If no window opens, confirm a graphical desktop is running. If devices are missing, check pactl info and systemctl --user status pipewire."
      }
    ],
    terms: ["PipeWire", "WirePlumber", "sudo", "pacman", "terminal"]
  }
];

function extendSection(title, patch) {
  const section = sections.find((item) => item.title === title);
  if (!section) return;
  section.blocks.push(...(patch.blocks || []));
  section.commands.push(...(patch.commands || []));
  section.terms = [...new Set([...section.terms, ...(patch.terms || [])])];
}

function insertSectionAfter(title, section) {
  const index = sections.findIndex((item) => item.title === title);
  if (index === -1) {
    sections.push(section);
    return;
  }
  sections.splice(index + 1, 0, section);
}

insertSectionAfter("Boot Into The ISO", {
  title: "Disk Naming",
  summary: "Learn what /dev/sda, /dev/sda1, /dev/nvme0n1, and /dev/nvme0n1p1 mean before disk setup.",
  sources: sourceRefs("installGuide", "partitioning", "persistentBlockDeviceNaming", "lsblkMan"),
  blocks: [
    {
      type: "goal",
      title: "Goal",
      text: "Understand Linux storage names well enough to avoid copying an example disk name onto the wrong device. This page teaches names only. It does not partition, format, erase, mount, or install anything."
    },
    {
      type: "explain",
      title: "/dev means device files",
      text: "Linux represents hardware and virtual hardware through files under /dev. The slash at the start means the path begins at the top of the Linux filesystem. The word dev is short for devices. A path like /dev/sda is not an ordinary document; it is a device file that points to a storage device."
    },
    {
      type: "explain",
      title: "Whole disk versus partition",
      text: "A whole disk is the entire storage device. A partition is one numbered region inside that disk. /dev/sda is a whole disk. /dev/sda1 is partition 1 inside /dev/sda. /dev/nvme0n1 is a whole NVMe disk. /dev/nvme0n1p1 is partition 1 inside /dev/nvme0n1."
    },
    {
      type: "explain",
      title: "NVMe-style names",
      text: "In /dev/nvme0n1, nvme means NVMe-style storage, 0 is Linux's current numbering for that NVMe controller/device, n1 means namespace 1, and the whole text names the whole disk. Partitions add p1, p2, p3, and so on. The p separates the disk name from the partition number."
    },
    {
      type: "explain",
      title: "SATA, USB, and external-style names",
      text: "Many SATA drives, USB drives, external SSDs, and virtual disks appear with sd-style names such as /dev/sda, /dev/sdb, and /dev/sdc. The letters a, b, and c are current ordering clues, not permanent identity. A USB drive that is /dev/sda on one boot could be /dev/sdb on another boot."
    },
    {
      type: "checkpoint",
      title: "Proof rule",
      text: "Do not trust a device name alone. Treat names as clues. Proof comes from matching multiple facts: NAME, SIZE, TYPE, MODEL, TRAN, SERIAL, and MOUNTPOINTS. If those facts do not make the target obvious, stop before disk setup."
    },
    {
      type: "warn",
      title: "Stop before damage",
      text: "If you cannot explain which row is the target whole disk and which rows are its partitions, do not run partitioning, formatting, or wipe commands. The safe next step is more discovery, not guessing."
    }
  ],
  commands: [
    {
      label: "List storage evidence before choosing a disk",
      sources: sourceRefs("lsblkMan", "persistentBlockDeviceNaming", "partitioning"),
      command: "lsblk -o NAME,SIZE,TYPE,MODEL,TRAN,SERIAL,MOUNTPOINTS",
      purpose: "Shows the evidence needed to identify disks and partitions without changing them.",
      words: [
        ["lsblk", "Means list block devices. A block device is storage Linux reads in blocks, such as an SSD, hard drive, USB drive, virtual disk, or partition."],
        ["space after lsblk", "Separates the command name from the option that follows."],
        ["-o", "An option. The dash starts an option. The letter o means output. Together, -o means choose which output columns to print."],
        ["space after -o", "Separates the -o option from the column list."],
        ["NAME,SIZE,TYPE,MODEL,TRAN,SERIAL,MOUNTPOINTS", "One comma-separated column list. The commas separate names. Do not add spaces inside this list."],
        ["NAME", "Linux's current name for the disk or partition, such as sda, sda1, nvme0n1, or nvme0n1p1."],
        ["SIZE", "Capacity. Use it to compare against the advertised size of the internal SSD, second SSD, external SSD, or USB drive."],
        ["TYPE", "disk means whole disk. part means partition inside a disk."],
        ["MODEL", "Hardware model name when Linux can read it."],
        ["TRAN", "Transport path, such as usb, sata, nvme, or virtio, when Linux can read it."],
        ["SERIAL", "Serial number when Linux can read it. This helps separate similar drives."],
        ["MOUNTPOINTS", "Directories where filesystems are attached right now, such as /, /boot, /home, or /mnt."]
      ],
      expected: "A tree of disks and partitions. Whole disks should have TYPE disk. Partitions under them should have TYPE part. Existing OS partitions may show mountpoints or known filesystems in related commands.",
      fails: "If the output does not clearly identify the target by size, model, transport, serial, and mountpoints, stop. Do not choose by /dev/sda or /dev/nvme0n1 alone."
    }
  ],
  terms: ["block device", "/dev", "device name", "NVMe", "partition", "mountpoints", "transport", "serial"]
});

extendSection("Before You Start", {
  blocks: [
    {
      type: "explain",
      title: "Use the guide from a device that will not be erased",
      text: "The target computer may not have a browser during the ISO stage. A phone, tablet, second laptop, printed copy, or second monitor is safer because the walkthrough remains visible while the target machine is partitioned, rebooted, or temporarily offline."
    },
    {
      type: "checkpoint",
      title: "Minimum decisions before typing install commands",
      text: "Know whether the target drive can be erased, whether the machine boots in UEFI mode, whether Wi-Fi or Ethernet will be used, and whether the learner wants a simple single-root layout or a more advanced layout."
    }
  ],
  commands: [
    {
      label: "Show the current shell user",
      sources: sourceRefs("installGuide"),
      command: "whoami",
      purpose: "Confirms which user account is running commands in the live ISO. The Arch ISO normally starts as root.",
      words: [
        ["whoami", "Prints the current effective user name."]
      ],
      expected: "Usually root in the Arch live ISO.",
      fails: "If the command is not found, the environment is not the normal Arch ISO shell."
    },
    {
      label: "Read a command manual from inside the ISO",
      sources: sourceRefs("pacstrapMan"),
      command: "man pacstrap",
      purpose: "Opens the official local manual page for pacstrap so the learner can compare this walkthrough with the real command reference.",
      words: [
        ["man", "Opens a manual page."],
        ["pacstrap", "The command whose manual is being opened."]
      ],
      expected: "A manual page with NAME, SYNOPSIS, DESCRIPTION, OPTIONS, and SEE ALSO sections.",
      fails: "Press q to exit the manual. If man is unavailable, continue using the linked Arch manual page."
    }
  ],
  terms: ["root", "package", "repository", "mirror"]
});

extendSection("Boot Into The ISO", {
  blocks: [
    {
      type: "explain",
      title: "Networking has layers",
      text: "A working browser needs several lower layers: the network device must be detected, the interface must connect, the system must receive an IP address, a default route must exist, and DNS must translate names into addresses."
    },
    {
      type: "explain",
      title: "Ethernet versus Wi-Fi in the ISO",
      text: "Ethernet often works automatically after the cable is connected. Wi-Fi usually needs an explicit connection step. The Arch ISO includes iwd and the iwctl tool for wireless setup."
    }
  ],
  commands: [
    {
      label: "Check system clock synchronization",
      sources: sourceRefs("installGuide", "systemTime"),
      command: "timedatectl",
      purpose: "Shows the system clock, time zone, and whether network time synchronization is active. Correct time helps package signatures validate correctly.",
      words: [
        ["timedatectl", "systemd tool for viewing and changing time settings."]
      ],
      expected: "A status display including Local time, Universal time, Time zone, and clock synchronization fields.",
      fails: "If the clock is very wrong, enable network time after networking works or set the time manually before package installation."
    },
    {
      label: "List network interfaces",
      sources: sourceRefs("networkConfig"),
      command: "ip link",
      purpose: "Shows network interfaces detected by Linux, including loopback, Ethernet, and Wi-Fi devices.",
      words: [
        ["ip", "Tool for viewing and changing network state."],
        ["link", "Subcommand that displays network interfaces at the link layer."]
      ],
      expected: "Entries like lo, enp3s0, wlan0, or wlp2s0. Names beginning with wl are often Wi-Fi; names beginning with en are often Ethernet.",
      fails: "If only lo appears, the hardware may need firmware or may not be detected by the ISO."
    },
    {
      label: "Open the Wi-Fi control shell",
      sources: sourceRefs("installGuide", "networkConfig"),
      command: "iwctl",
      purpose: "Starts the interactive iwd control prompt used for Wi-Fi connections in the Arch ISO.",
      words: [
        ["iwctl", "Interactive command tool for iwd wireless networking."]
      ],
      expected: "The prompt changes to something like [iwd]#.",
      fails: "If iwctl is not found or cannot connect to iwd, verify the ISO environment and wireless device support."
    },
    {
      label: "List Wi-Fi devices inside iwctl",
      sources: sourceRefs("installGuide", "networkConfig"),
      command: "device list",
      purpose: "Inside iwctl, lists wireless devices that iwd can control.",
      words: [
        ["device", "iwctl object type for wireless adapters."],
        ["list", "Print the available devices."]
      ],
      expected: "A table with a device name such as wlan0 or wlp2s0.",
      fails: "If no device appears, the Wi-Fi adapter may need firmware, may be disabled in firmware settings, or may not be supported by the live ISO."
    },
    {
      label: "Scan for Wi-Fi networks",
      sources: sourceRefs("installGuide", "networkConfig"),
      command: "station wlan0 scan",
      purpose: "Asks the Wi-Fi device to scan for nearby networks. Replace wlan0 with the device name shown by device list.",
      words: [
        ["station", "iwctl object type for Wi-Fi station/client operations."],
        ["wlan0", "Example Wi-Fi device name."],
        ["scan", "Search for nearby wireless networks."]
      ],
      expected: "Usually no output. The scan results are cached for the next command.",
      fails: "If the device name is wrong, use the exact name from device list."
    },
    {
      label: "Show Wi-Fi networks",
      sources: sourceRefs("installGuide", "networkConfig"),
      command: "station wlan0 get-networks",
      purpose: "Displays nearby Wi-Fi network names after scanning.",
      words: [
        ["station wlan0", "Operate on the wlan0 Wi-Fi device."],
        ["get-networks", "Print visible network names and security information."]
      ],
      expected: "A list of SSIDs, signal indicators, and security flags.",
      fails: "If the list is empty, move closer to the router or rescan."
    },
    {
      label: "Connect to Wi-Fi",
      sources: sourceRefs("installGuide", "networkConfig"),
      command: "station wlan0 connect \"Network Name\"",
      purpose: "Connects to a Wi-Fi network. Replace wlan0 and Network Name with the learner's real device and SSID.",
      words: [
        ["station wlan0", "Operate on the chosen Wi-Fi device."],
        ["connect", "Start a connection to a network."],
        ["\"Network Name\"", "Quoted SSID. Quotes help when the Wi-Fi name contains spaces."]
      ],
      expected: "If the network is protected, iwctl asks for a passphrase. After success, the prompt returns without an error.",
      fails: "If authentication fails, retype the passphrase carefully. If DHCP fails afterward, check ip addr and ping tests."
    }
  ],
  terms: ["iwctl", "IP address", "route", "firmware", "systemd"]
});

extendSection("Disk Setup", {
  blocks: [
    {
      type: "explain",
      title: "Device names are not promises",
      text: "A disk might appear as /dev/nvme0n1, /dev/sda, /dev/vda, or another name. Partitions add suffixes such as p1 or 1. The guide must teach the learner to identify by size, model, and mountpoints, not by copying an example blindly."
    },
    {
      type: "warn",
      title: "Example layout, not a universal layout",
      text: "The commands here use a common UEFI example: an EFI System Partition and one Linux root partition, optionally with swap. The learner must replace every /dev/nvme0n1... path with their actual target drive and partition names."
    }
  ],
  commands: [
    {
      label: "Show detailed disk names and models",
      sources: sourceRefs("installGuide", "partitioning"),
      command: "lsblk -o NAME,SIZE,TYPE,MODEL,MOUNTPOINTS",
      purpose: "Prints a more useful disk table for choosing the correct target drive.",
      words: [
        ["lsblk", "Lists block devices."],
        ["-o", "Chooses which output columns to show."],
        ["NAME,SIZE,TYPE,MODEL,MOUNTPOINTS", "Columns that help identify drive names, capacities, device type, model, and where filesystems are mounted."]
      ],
      expected: "A table where the USB installer and internal disk can usually be distinguished by size and model.",
      fails: "If the output is confusing, stop before partitioning. Removing unrelated external drives can reduce risk."
    },
    {
      label: "Inspect partition tables",
      sources: sourceRefs("installGuide", "partitioning"),
      command: "fdisk -l",
      purpose: "Shows partition tables for detected disks. This helps confirm whether a disk already has partitions and what their sizes are.",
      words: [
        ["fdisk", "Disk partitioning and inspection tool."],
        ["-l", "List partition tables instead of editing them."]
      ],
      expected: "Detailed information for each disk and its partitions.",
      fails: "If permission is denied outside the ISO, use sudo. In the ISO, root should already have permission."
    },
    {
      label: "Open a partition editor for the target disk",
      sources: sourceRefs("installGuide", "partitioning", "efiSystemPartition"),
      command: "cfdisk /dev/nvme0n1",
      purpose: "Opens an interactive partition editor for the selected disk. This is where partitions can be created or deleted.",
      words: [
        ["cfdisk", "Interactive terminal partition editor."],
        ["/dev/nvme0n1", "Example whole-disk device. Do not use a partition like p1 here."]
      ],
      expected: "An interactive partition table screen. For UEFI, a typical simple layout has an EFI System Partition and a Linux filesystem partition.",
      fails: "If the wrong disk opens, quit without writing. Do not choose Write until the layout and target disk are confirmed."
    },
    {
      label: "Format the EFI System Partition",
      sources: sourceRefs("installGuide", "efiSystemPartition", "fileSystems"),
      command: "mkfs.fat -F 32 /dev/nvme0n1p1",
      purpose: "Creates a FAT32 filesystem on the EFI System Partition so UEFI firmware can read bootloader files.",
      words: [
        ["mkfs.fat", "Creates a FAT filesystem."],
        ["-F 32", "Selects FAT32."],
        ["/dev/nvme0n1p1", "Example EFI partition path."]
      ],
      expected: "A short message from mkfs.fat, usually ending without errors.",
      fails: "If the partition is not the EFI partition, stop. Formatting the wrong partition erases its contents."
    },
    {
      label: "Create swap space on a swap partition",
      sources: sourceRefs("installGuide", "partitioning"),
      command: "mkswap /dev/nvme0n1p3",
      purpose: "Initializes a partition for swap use. This is optional and only applies if the learner created a swap partition.",
      words: [
        ["mkswap", "Sets up a Linux swap area."],
        ["/dev/nvme0n1p3", "Example swap partition path."]
      ],
      expected: "Output showing the swapspace version, size, and UUID.",
      fails: "Do not run this on the root or EFI partition. If there is no swap partition, skip this command."
    },
    {
      label: "Enable swap for the live install session",
      sources: sourceRefs("installGuide"),
      command: "swapon /dev/nvme0n1p3",
      purpose: "Activates the swap partition now so the installer can use it and genfstab can detect it.",
      words: [
        ["swapon", "Enables a swap device."],
        ["/dev/nvme0n1p3", "Example swap partition path."]
      ],
      expected: "Usually no output. swapon --show should list the swap device.",
      fails: "If swapon says the device is invalid, mkswap may not have been run or the wrong partition was chosen."
    },
    {
      label: "Create the boot mount directory",
      sources: sourceRefs("installGuide", "efiSystemPartition"),
      command: "mkdir -p /mnt/boot",
      purpose: "Creates the directory where the EFI System Partition will be mounted inside the new system.",
      words: [
        ["mkdir", "Creates directories."],
        ["-p", "Create parent directories as needed and do not fail if the directory already exists."],
        ["/mnt/boot", "Boot directory inside the mounted target system."]
      ],
      expected: "Usually no output.",
      fails: "If /mnt does not exist or root is not mounted, mount the root partition first."
    },
    {
      label: "Mount the EFI System Partition",
      sources: sourceRefs("installGuide", "efiSystemPartition"),
      command: "mount /dev/nvme0n1p1 /mnt/boot",
      purpose: "Attaches the EFI System Partition at /mnt/boot so bootloader files are installed where UEFI can find them.",
      words: [
        ["mount", "Attach a filesystem to a directory."],
        ["/dev/nvme0n1p1", "Example EFI partition path."],
        ["/mnt/boot", "Mount point for boot files in this simple layout."]
      ],
      expected: "Usually no output. lsblk should show /mnt/boot for the EFI partition.",
      fails: "If the filesystem type is wrong, confirm the partition was formatted FAT32."
    }
  ],
  terms: ["UUID", "ESP", "swap", "mount point"]
});

extendSection("Install Base System", {
  blocks: [
    {
      type: "explain",
      title: "What pacstrap officially does",
      text: "The pacstrap manual describes it as a tool for creating a new system installation from scratch by installing packages into a specified root directory after setting up basic mountpoints. In this walkthrough, that root directory is /mnt."
    },
    {
      type: "explain",
      title: "What genfstab officially does",
      text: "The genfstab manual describes it as generating fstab-compatible output by autodetecting mounts under a given mountpoint. That is why the root, boot, and swap mounts must be correct before running it."
    },
    {
      type: "explain",
      title: "What arch-chroot officially adds",
      text: "The arch-chroot manual explains that it wraps chroot while making important filesystems such as /dev and /proc available and exposing resolver configuration. That is why it is preferred over a plain chroot during Arch installation."
    }
  ],
  commands: [
    {
      label: "Inspect generated fstab before chroot",
      sources: sourceRefs("installGuide", "genfstabMan"),
      command: "cat /mnt/etc/fstab",
      purpose: "Displays the generated fstab so the learner can verify root, boot, and optional swap entries before first boot.",
      words: [
        ["cat", "Prints file contents to the terminal."],
        ["/mnt/etc/fstab", "The new system's filesystem table."]
      ],
      expected: "Lines for the mounted root filesystem, EFI/boot filesystem, and swap if enabled. UUID= values should appear when genfstab -U was used.",
      fails: "If expected entries are missing, return to lsblk and mount commands, then regenerate fstab."
    },
    {
      label: "Install sudo after entering chroot if missing",
      sources: sourceRefs("sudo", "pacman"),
      command: "pacman -S sudo",
      purpose: "Installs sudo inside the new system so a normal user can later perform administrator tasks.",
      words: [
        ["pacman", "Arch package manager."],
        ["-S", "Install packages from synchronized repositories."],
        ["sudo", "Package that provides the sudo command."]
      ],
      expected: "pacman resolves the package, asks for confirmation, and installs sudo.",
      fails: "If networking fails inside chroot, arch-chroot should normally expose resolver configuration, but DNS and network connectivity should still be checked from the ISO."
    }
  ],
  terms: ["kernel", "firmware", "initramfs", "UUID"]
});

extendSection("Configure System", {
  blocks: [
    {
      type: "warn",
      title: "Bootloader choice must match boot mode",
      text: "A UEFI install and a legacy BIOS install do not use the same exact bootloader steps. This app should first teach the common UEFI path, then clearly branch for GRUB/BIOS later instead of mixing them together."
    },
    {
      type: "explain",
      title: "Users and privilege model",
      text: "The root account is powerful but should not be the everyday account. A normal user is created for daily use, then added to a group that sudo can authorize for administrator commands."
    }
  ],
  commands: [
    {
      label: "Generate /etc/adjtime",
      sources: sourceRefs("installGuide", "systemTime"),
      command: "hwclock --systohc",
      purpose: "Writes the current system clock value to the hardware clock configuration.",
      words: [
        ["hwclock", "Tool for reading and setting the hardware clock."],
        ["--systohc", "Set the hardware clock from the current system clock."]
      ],
      expected: "Usually no output.",
      fails: "If the time is wrong, fix time synchronization before running this."
    },
    {
      label: "Generate enabled locales",
      sources: sourceRefs("installGuide", "locale"),
      command: "locale-gen",
      purpose: "Generates locale data for uncommented entries in /etc/locale.gen.",
      words: [
        ["locale-gen", "Builds locale files selected in /etc/locale.gen."]
      ],
      expected: "Lines showing selected locales being generated.",
      fails: "If no locale is generated, reopen /etc/locale.gen and uncomment a UTF-8 locale such as en_US.UTF-8 UTF-8."
    },
    {
      label: "Set system language",
      sources: sourceRefs("installGuide", "locale"),
      command: "echo \"LANG=en_US.UTF-8\" > /etc/locale.conf",
      purpose: "Creates the locale configuration file for the installed system.",
      words: [
        ["echo", "Prints text."],
        ["\"LANG=en_US.UTF-8\"", "The language and character encoding setting."],
        [">", "Writes output to a file, replacing existing content."],
        ["/etc/locale.conf", "System locale configuration file."]
      ],
      expected: "Usually no output. cat /etc/locale.conf should show LANG=en_US.UTF-8.",
      fails: "If the locale was not generated first, programs may warn that the locale is unavailable."
    },
    {
      label: "Verify time zone link",
      sources: sourceRefs("installGuide", "systemTime"),
      command: "readlink /etc/localtime",
      purpose: "Confirms that /etc/localtime points to the selected time zone file.",
      words: [
        ["readlink", "Prints the target of a symbolic link."],
        ["/etc/localtime", "The system time zone symlink."]
      ],
      expected: "Output points into /usr/share/zoneinfo, such as /usr/share/zoneinfo/America/Phoenix.",
      fails: "If nothing prints or the target is wrong, rerun the ln -sf command with the correct time zone path."
    },
    {
      label: "Verify generated locale selection",
      sources: sourceRefs("installGuide", "locale"),
      command: "grep -v '^#' /etc/locale.gen",
      purpose: "Shows uncommented locale entries so the learner can confirm a UTF-8 locale was selected before locale-gen.",
      words: [
        ["grep", "Searches text."],
        ["-v", "Invert the match, so matching lines are hidden."],
        ["'^#'", "Pattern for lines that start with #, which are comments."],
        ["/etc/locale.gen", "Locale generation list."]
      ],
      expected: "At least one uncommented UTF-8 locale appears, such as en_US.UTF-8 UTF-8.",
      fails: "If nothing useful appears, reopen /etc/locale.gen and uncomment the intended UTF-8 locale."
    },
    {
      label: "Verify system language file",
      sources: sourceRefs("installGuide", "locale"),
      command: "cat /etc/locale.conf",
      purpose: "Displays the installed system's default language and character encoding setting.",
      words: [
        ["cat", "Prints file contents."],
        ["/etc/locale.conf", "System locale configuration file."]
      ],
      expected: "Output includes LANG=en_US.UTF-8 or the locale intentionally chosen for this system.",
      fails: "If the file is missing or has a locale that was not generated, create it again after locale-gen."
    },
    {
      label: "Set the hostname",
      sources: sourceRefs("installGuide"),
      command: "echo \"archbox\" > /etc/hostname",
      purpose: "Sets the computer's local network name. Replace archbox with the desired machine name.",
      words: [
        ["echo", "Print text."],
        ["\"archbox\"", "Example hostname."],
        [">", "Write to a file."],
        ["/etc/hostname", "File containing the static hostname."]
      ],
      expected: "Usually no output.",
      fails: "Use a simple hostname with letters, numbers, and hyphens. Avoid spaces."
    },
    {
      label: "Set the root password",
      sources: sourceRefs("installGuide", "usersGroups"),
      command: "passwd",
      purpose: "Sets the password for the root administrator account.",
      words: [
        ["passwd", "Changes a user's password. With no username, it changes the current user's password."]
      ],
      expected: "Prompts for a new password twice. Typed password characters are not shown.",
      fails: "If the two entries do not match, run passwd again."
    },
    {
      label: "Create a normal user",
      sources: sourceRefs("installGuide", "usersGroups"),
      command: "useradd -m -G wheel -s /bin/bash ethan",
      purpose: "Creates a normal user account, gives it a home directory, adds it to wheel, and sets bash as its shell. Replace ethan with the real username.",
      words: [
        ["useradd", "Creates a user account."],
        ["-m", "Create the user's home directory."],
        ["-G wheel", "Add the user to the wheel supplementary group."],
        ["-s /bin/bash", "Use bash as the login shell."],
        ["ethan", "Example username."]
      ],
      expected: "Usually no output if the user is created.",
      fails: "If the username already exists, choose another or inspect /etc/passwd."
    },
    {
      label: "Set the normal user's password",
      sources: sourceRefs("installGuide", "usersGroups"),
      command: "passwd ethan",
      purpose: "Sets the password for the normal user account. Replace ethan with the real username.",
      words: [
        ["passwd", "Password-changing command."],
        ["ethan", "The user account whose password is being changed."]
      ],
      expected: "Prompts for the password twice. No password characters are displayed.",
      fails: "If the user does not exist, run useradd first or check the username spelling."
    },
    {
      label: "Safely edit sudo permissions",
      sources: sourceRefs("sudo", "usersGroups"),
      command: "EDITOR=nano visudo",
      purpose: "Opens the sudoers file safely so the wheel group can be allowed to use sudo.",
      words: [
        ["EDITOR=nano", "Temporarily tells visudo to use nano for this command."],
        ["visudo", "Safely edits sudoers and validates syntax before saving."]
      ],
      expected: "nano opens the sudoers file. The learner should uncomment the wheel group sudo line if following that policy.",
      fails: "Do not edit sudoers with a plain editor. A syntax error can break sudo access."
    }
  ],
  terms: ["systemd", "service", "symlink", "wheel", "visudo", "ESP"]
});

extendSection("First Boot", {
  blocks: [
    {
      type: "explain",
      title: "First boot proves the disk install works",
      text: "The reboot tests several earlier choices at once: firmware mode, bootloader installation, kernel/initramfs availability, fstab correctness, and whether the root filesystem can be mounted."
    }
  ],
  commands: [
    {
      label: "Unmount all filesystems under /mnt",
      sources: sourceRefs("installGuide"),
      command: "umount -R /mnt",
      purpose: "Recursively unmounts the target system before rebooting.",
      words: [
        ["umount", "Detaches mounted filesystems."],
        ["-R", "Unmount recursively under the target path."],
        ["/mnt", "The mounted installed system."]
      ],
      expected: "Usually no output.",
      fails: "If a target is busy, make sure you exited chroot and no process is using files under /mnt."
    },
    {
      label: "Check the logged-in user",
      sources: sourceRefs("usersGroups", "sudo"),
      command: "whoami",
      purpose: "After first boot, confirms whether the learner logged in as the normal user instead of root.",
      words: [
        ["whoami", "Prints the current user name."]
      ],
      expected: "The normal username, not root, for daily use.",
      fails: "If logged in as root, log out and log in as the normal user after confirming that account exists."
    },
    {
      label: "Confirm NetworkManager is running",
      sources: sourceRefs("networkManager", "systemctlMan"),
      command: "systemctl status NetworkManager",
      purpose: "Shows whether NetworkManager is loaded, enabled, and currently active.",
      words: [
        ["systemctl", "Controls and inspects systemd units."],
        ["status", "Show current service status."],
        ["NetworkManager", "Network connection manager service."]
      ],
      expected: "The service should show active (running).",
      fails: "If inactive, run sudo systemctl enable --now NetworkManager. If missing, install networkmanager."
    },
    {
      label: "Show IP addresses after first boot",
      sources: sourceRefs("networkConfig", "networkManager"),
      command: "ip addr",
      purpose: "Displays assigned IP addresses so the learner can tell whether the machine actually joined a network.",
      words: [
        ["ip", "Network inspection and configuration tool."],
        ["addr", "Show protocol addresses assigned to interfaces."]
      ],
      expected: "An Ethernet or Wi-Fi interface should have an inet address if connected.",
      fails: "If there is no inet address except 127.0.0.1 on lo, the system is not connected to a network."
    }
  ],
  terms: ["initramfs", "bootloader", "service", "IP address", "route"]
});

insertSectionAfter("First Boot", {
  title: "Graphical Desktop",
  summary: "Install one beginner desktop path: Xorg, Xfce, LightDM, terminal, browser, and audio controls.",
  sources: sourceRefs("xorg", "xfce", "lightdm", "displayManager", "xorgServerPackage", "xfce4Group", "lightdmPackage", "lightdmGtkGreeterPackage"),
  blocks: [
    {
      type: "goal",
      title: "Goal",
      text: "Move from a working console login to a graphical desktop where the learner can open a terminal, launch Firefox, adjust volume, and continue troubleshooting from a more familiar interface."
    },
    {
      type: "explain",
      title: "Why this path uses Xfce",
      text: "Xfce is a practical beginner default because it is lighter than many full desktop environments, has a conventional panel/menu/window layout, and is available as an official Arch package group."
    },
    {
      type: "explain",
      title: "Xorg, Xfce, and LightDM roles",
      text: "Xorg provides the graphical display server. Xfce provides the desktop session. LightDM provides the graphical login screen, and lightdm-gtk-greeter provides the visible login UI."
    },
    {
      type: "checkpoint",
      title: "Prerequisite checkpoint",
      text: "Before installing a desktop, the installed system should boot, the normal user should exist, NetworkManager should be running, and sudo should work for that user."
    }
  ],
  commands: [
    {
      label: "Confirm sudo works for the normal user",
      sources: sourceRefs("sudo", "usersGroups"),
      command: "sudo -v",
      purpose: "Prompts for the user's password and refreshes sudo credentials without running a separate administrator command.",
      words: [
        ["sudo", "Run with administrator privileges."],
        ["-v", "Validate or refresh cached credentials."]
      ],
      expected: "The command returns silently after the correct password.",
      fails: "If the user is not allowed to use sudo, revisit the wheel group and visudo steps before continuing."
    },
    {
      label: "Install Xfce desktop path",
      sources: sourceRefs("xorg", "xfce", "lightdm", "xorgServerPackage", "xfce4Group", "lightdmPackage", "lightdmGtkGreeterPackage", "firefox", "pipewire", "wireplumber", "pacman"),
      command: "sudo pacman -S xorg-server xfce4 lightdm lightdm-gtk-greeter firefox pipewire pipewire-pulse wireplumber pavucontrol",
      purpose: "Installs the graphical display server, Xfce desktop group, graphical login manager, browser, PipeWire audio stack, and a volume-control tool.",
      words: [
        ["sudo", "Run pacman with administrator privileges."],
        ["pacman", "Arch package manager."],
        ["-S", "Install packages or package groups from repositories."],
        ["xorg-server", "Xorg display server package."],
        ["xfce4", "Official package group for core Xfce components."],
        ["lightdm", "Display manager service."],
        ["lightdm-gtk-greeter", "Graphical login screen for LightDM."],
        ["firefox", "Web browser."],
        ["pipewire pipewire-pulse wireplumber", "Modern desktop audio stack and PulseAudio compatibility."],
        ["pavucontrol", "Graphical mixer for speakers, microphones, and app audio streams."]
      ],
      expected: "pacman shows packages from the Xfce group and asks for confirmation. Accept the default group selection unless there is a specific reason not to.",
      fails: "If downloads fail, fix network/DNS first. If package conflicts appear, read the prompt carefully before accepting replacements."
    },
    {
      label: "Enable the graphical login screen",
      sources: sourceRefs("lightdm", "displayManager", "systemctlMan"),
      command: "sudo systemctl enable lightdm",
      purpose: "Makes LightDM start automatically during boot so the user sees a graphical login screen.",
      words: [
        ["sudo", "Run as administrator."],
        ["systemctl", "Control systemd services."],
        ["enable", "Configure a service to start automatically at boot."],
        ["lightdm", "The display manager service unit."]
      ],
      expected: "systemctl reports that it created a service symlink.",
      fails: "If the unit is not found, confirm the lightdm package installed successfully."
    },
    {
      label: "Start LightDM immediately",
      sources: sourceRefs("lightdm", "displayManager", "systemctlMan"),
      command: "sudo systemctl start lightdm",
      purpose: "Starts the graphical login screen without waiting for another reboot.",
      words: [
        ["start", "Start the service now."],
        ["lightdm", "Display manager service."]
      ],
      expected: "The screen switches to a graphical login prompt.",
      fails: "If the screen goes black or returns to console, switch to another TTY with Ctrl+Alt+F2 and inspect sudo systemctl status lightdm."
    },
    {
      label: "Check LightDM status",
      sources: sourceRefs("lightdm", "systemctlMan"),
      command: "systemctl status lightdm",
      purpose: "Shows whether the display manager is running or failed.",
      words: [
        ["systemctl", "Inspect or control systemd units."],
        ["status", "Show service state and recent logs."],
        ["lightdm", "Graphical login manager service."]
      ],
      expected: "The service should show active (running) after the graphical login screen starts.",
      fails: "If failed, read the recent log lines in the status output. Missing greeter or Xorg errors usually point to incomplete package installation."
    },
    {
      label: "Confirm the desktop session after login",
      sources: sourceRefs("xfce", "xorg"),
      command: "echo $XDG_CURRENT_DESKTOP",
      purpose: "Prints the current desktop environment name from inside a terminal opened after graphical login.",
      words: [
        ["echo", "Print text or variable values."],
        ["$XDG_CURRENT_DESKTOP", "Environment variable that often names the current desktop session."]
      ],
      expected: "Output includes XFCE or a related Xfce desktop name.",
      fails: "If it is empty, the session may still work, but confirm Xfce components such as panel, settings, and terminal are present."
    },
    {
      label: "Open the Xfce terminal",
      sources: sourceRefs("xfce"),
      command: "xfce4-terminal",
      purpose: "Starts the terminal emulator installed with the Xfce desktop group.",
      words: [
        ["xfce4-terminal", "Terminal emulator primarily for Xfce."]
      ],
      expected: "A terminal window opens on the desktop.",
      fails: "If the command is not found, the Xfce group may not have installed completely."
    },
    {
      label: "Open audio controls from the desktop",
      sources: sourceRefs("pipewire", "alsa"),
      command: "pavucontrol",
      purpose: "Opens the graphical mixer used later to choose speaker and microphone devices.",
      words: [
        ["pavucontrol", "Graphical audio mixer compatible with PipeWire through pipewire-pulse."]
      ],
      expected: "A volume-control window opens with playback, recording, output, and input tabs.",
      fails: "If it cannot connect to the audio server, continue to the Audio section and check PipeWire/WirePlumber services."
    },
    {
      label: "Reboot into the graphical login",
      sources: sourceRefs("systemctlMan", "displayManager"),
      command: "sudo reboot",
      purpose: "Restarts the machine to verify LightDM starts automatically after boot.",
      words: [
        ["sudo", "Run as administrator."],
        ["reboot", "Restart the machine."]
      ],
      expected: "After boot, a LightDM graphical login screen appears without manually running startx or systemctl start lightdm.",
      fails: "If the system returns to a text login, log in and run systemctl status lightdm."
    }
  ],
  terms: ["desktop environment", "display server", "Xorg", "Xfce", "display manager", "LightDM", "greeter", "session", "Firefox", "PipeWire", "WirePlumber"]
});

insertSectionAfter("Graphical Desktop", {
  title: "Post-Install Baseline",
  summary: "Keep the practical package set small, explain why each piece exists, and verify services before troubleshooting.",
  sources: sourceRefs("pacman", "sudo", "sudoPackage", "networkManager", "networkManagerPackage", "firefox", "pipewire", "pipewirePackage", "pipewirePulsePackage", "wireplumber", "wireplumberPackage", "pavucontrolPackage", "nanoPackage", "xfce4TerminalPackage", "thunarPackage"),
  blocks: [
    {
      type: "goal",
      title: "Goal",
      text: "Install and verify the smallest practical set for this walkthrough: administrator access, networking, a browser, audio, a terminal/editor, a file manager, and the chosen graphical login path."
    },
    {
      type: "explain",
      title: "KISS package rule",
      text: "Start with packages that directly support the walkthrough goals. Do not install a large pile of nice-to-have software until the system can boot, connect, browse, play sound, and record from the microphone."
    },
    {
      type: "explain",
      title: "Baseline categories",
      text: "Required: sudo, NetworkManager, Firefox, PipeWire, WirePlumber, pipewire-pulse, pavucontrol, nano, xfce4-terminal, and thunar. Desktop path: xorg-server, xfce4, lightdm, and lightdm-gtk-greeter. Hardware-specific: CPU microcode, Bluetooth tools, printer tools, GPU drivers, and laptop power tools."
    },
    {
      type: "checkpoint",
      title: "Do not troubleshoot apps before services",
      text: "If Firefox or audio fails, first verify NetworkManager, DNS, PipeWire, WirePlumber, and the graphical session. A missing service can look like a broken app."
    }
  ],
  commands: [
    {
      label: "Install the practical baseline",
      sources: sourceRefs("pacman", "sudoPackage", "networkManagerPackage", "firefox", "pipewirePackage", "pipewirePulsePackage", "wireplumberPackage", "pavucontrolPackage", "nanoPackage", "xfce4TerminalPackage", "thunarPackage"),
      command: "sudo pacman -S sudo networkmanager firefox pipewire pipewire-pulse wireplumber pavucontrol nano xfce4-terminal thunar",
      purpose: "Installs the practical non-bootloader baseline without repeating the full desktop group. This is useful if some packages were skipped during install.",
      words: [
        ["sudo", "Administrator command tool for normal users."],
        ["networkmanager", "Network connection manager and user applications."],
        ["firefox", "Web browser."],
        ["pipewire", "Low-latency audio/video router and processor."],
        ["pipewire-pulse", "PulseAudio replacement layer so common desktop apps can send audio to PipeWire."],
        ["wireplumber", "Session/policy manager implementation for PipeWire."],
        ["pavucontrol", "Graphical volume and input/output selector."],
        ["nano", "Beginner-friendly terminal text editor."],
        ["xfce4-terminal", "Graphical terminal emulator for Xfce."],
        ["thunar", "Xfce file manager."]
      ],
      expected: "pacman installs missing packages and skips or reinstalls packages already present depending on the prompt.",
      fails: "If pacman cannot download, fix NetworkManager, IP connectivity, and DNS before adding more packages."
    },
    {
      label: "Verify baseline packages are installed",
      sources: sourceRefs("pacman"),
      command: "pacman -Q sudo networkmanager firefox pipewire pipewire-pulse wireplumber pavucontrol nano xfce4-terminal thunar",
      purpose: "Queries the local package database to confirm the practical baseline is installed.",
      words: [
        ["pacman", "Arch package manager."],
        ["-Q", "Query installed packages."],
        ["package names", "The installed packages being checked."]
      ],
      expected: "Each package prints with an installed version.",
      fails: "If a package is not found, install it with sudo pacman -S package-name."
    },
    {
      label: "Enable required system services",
      sources: sourceRefs("networkManager", "lightdm", "systemctlMan"),
      command: "sudo systemctl enable --now NetworkManager lightdm",
      purpose: "Enables and starts the system services needed for networking and graphical login.",
      words: [
        ["systemctl", "Controls systemd services."],
        ["enable", "Start automatically at boot."],
        ["--now", "Also start immediately."],
        ["NetworkManager", "Network service."],
        ["lightdm", "Graphical login service."]
      ],
      expected: "systemctl creates enablement links and starts the services.",
      fails: "If LightDM immediately switches the screen or disrupts the console, that can be normal. If it fails, check systemctl status lightdm."
    },
    {
      label: "Verify required system services",
      sources: sourceRefs("networkManager", "lightdm", "systemctlMan"),
      command: "systemctl is-active NetworkManager lightdm",
      purpose: "Checks that networking and graphical login services are currently active.",
      words: [
        ["systemctl", "Inspect systemd services."],
        ["is-active", "Print whether services are active."],
        ["NetworkManager lightdm", "The services being checked."]
      ],
      expected: "active is printed for each service.",
      fails: "If NetworkManager is inactive, network setup will be unreliable. If LightDM is inactive, the graphical login will not appear automatically."
    },
    {
      label: "Enable user audio services",
      sources: sourceRefs("pipewire", "wireplumber", "systemctlMan"),
      command: "systemctl --user enable --now pipewire pipewire-pulse wireplumber",
      purpose: "Starts and enables PipeWire audio services for the logged-in user.",
      words: [
        ["--user", "Operate on the current user's systemd services."],
        ["pipewire", "Core media server."],
        ["pipewire-pulse", "PulseAudio-compatible server for desktop apps."],
        ["wireplumber", "PipeWire session manager."]
      ],
      expected: "Usually no output on success.",
      fails: "Run this from the normal user session, not from root. If user systemd is unavailable, log out and back into the desktop."
    },
    {
      label: "Verify user audio services",
      sources: sourceRefs("pipewire", "wireplumber", "systemctlMan"),
      command: "systemctl --user is-active pipewire pipewire-pulse wireplumber",
      purpose: "Confirms the user audio services are running before speaker or microphone troubleshooting.",
      words: [
        ["is-active", "Print active/inactive state."],
        ["pipewire pipewire-pulse wireplumber", "The audio user services being checked."]
      ],
      expected: "active is printed for each service.",
      fails: "If one is inactive, check systemctl --user status service-name and confirm the package is installed."
    },
    {
      label: "Check command availability",
      sources: sourceRefs("firefox", "nanoPackage", "xfce4TerminalPackage", "pavucontrolPackage"),
      command: "command -v firefox nano xfce4-terminal pavucontrol",
      purpose: "Confirms key user-facing commands are present in PATH.",
      words: [
        ["command", "Shell built-in for checking or running commands."],
        ["-v", "Show how the shell resolves a command name."],
        ["firefox nano xfce4-terminal pavucontrol", "The commands being checked."]
      ],
      expected: "A path prints for each command, such as /usr/bin/firefox.",
      fails: "If a command does not print a path, install the package that provides it."
    },
    {
      label: "Hardware-specific packages are a decision, not a default",
      sources: sourceRefs("pacman", "networkManagerPackage", "pipewirePackage"),
      command: "sudo pacman -S intel-ucode amd-ucode bluez bluez-utils",
      purpose: "Shows common hardware-specific packages, but this command should not be blindly copied. Choose only what matches the machine.",
      words: [
        ["intel-ucode", "Intel CPU microcode package. Use on Intel systems."],
        ["amd-ucode", "AMD CPU microcode package. Use on AMD systems."],
        ["bluez bluez-utils", "Bluetooth service and command-line tools. Use when Bluetooth is needed."]
      ],
      expected: "Only selected hardware-matching packages should be installed.",
      fails: "Do not install both CPU microcode packages as a teaching shortcut. Identify the CPU first, then choose the matching microcode package."
    }
  ],
  terms: ["package", "repository", "service", "NetworkManager", "Firefox", "PipeWire", "WirePlumber", "nano", "terminal"]
});

insertSectionAfter("Post-Install Baseline", {
  title: "Hardware Detection",
  summary: "Identify CPU, GPU, network, audio, and USB hardware before choosing hardware-specific packages.",
  sources: sourceRefs("pacman", "mesaPackage", "vulkanIntelPackage", "vulkanRadeonPackage", "nvidiaOpenPackage", "nvidiaUtilsPackage"),
  blocks: [
    {
      type: "goal",
      title: "Goal",
      text: "Keep the default install path simple while still making the machine-specific parts explicit. Hardware packages are chosen from evidence, not guessed from brand names or copied as a bundle."
    },
    {
      type: "warn",
      title: "Do not install every branch",
      text: "Intel CPU microcode, AMD CPU microcode, Mesa Vulkan packages, and NVIDIA packages are not one universal command. Choose the branch that matches the detected hardware. Installing unrelated driver packages can create confusion during troubleshooting."
    },
    {
      type: "explain",
      title: "What usually differs",
      text: "CPU vendor affects microcode. GPU vendor affects graphics packages. Wi-Fi and Bluetooth depend on the adapter. Audio usually starts with PipeWire, but the actual sink/source names come from the detected audio controller."
    }
  ],
  commands: [
    {
      label: "Identify the CPU",
      sources: sourceRefs("installGuide"),
      command: "lscpu | grep -E 'Vendor ID|Model name'",
      purpose: "Shows whether the CPU is Intel or AMD so the matching microcode package can be chosen.",
      words: [
        ["lscpu", "Prints CPU details."],
        ["grep", "Filters text output."],
        ["-E", "Uses extended regular expressions."],
        ["Vendor ID|Model name", "Shows the CPU vendor and human-readable model."]
      ],
      expected: "Vendor ID usually says GenuineIntel or AuthenticAMD.",
      fails: "If lscpu is unavailable, inspect /proc/cpuinfo with grep -E 'vendor_id|model name' /proc/cpuinfo."
    },
    {
      label: "Identify PCI hardware",
      sources: sourceRefs("installGuide"),
      command: "lspci -k | grep -A3 -E 'VGA|3D|Display|Network|Ethernet|Audio'",
      purpose: "Lists graphics, network, Ethernet, and audio controllers with the kernel driver currently attached.",
      words: [
        ["lspci", "Lists PCI devices."],
        ["-k", "Shows kernel drivers and modules for each PCI device."],
        ["grep -A3", "Prints each matching line plus three following lines."],
        ["VGA|3D|Display|Network|Ethernet|Audio", "Device classes relevant to desktop setup."]
      ],
      expected: "Output identifies the GPU vendor, network controller, Ethernet controller, and audio controller if present.",
      fails: "If a needed device is missing, confirm the device is enabled in firmware and physically present."
    },
    {
      label: "Identify USB hardware",
      sources: sourceRefs("installGuide"),
      command: "lsusb",
      purpose: "Lists USB devices such as USB Wi-Fi adapters, Bluetooth adapters, webcams, audio interfaces, and the installer USB.",
      words: [
        ["lsusb", "Lists USB devices."]
      ],
      expected: "USB hardware appears by vendor and product name or ID.",
      fails: "If a USB device is missing, try another port and confirm the device works on another machine."
    },
    {
      label: "Check wireless radio blocks",
      sources: sourceRefs("networkManager"),
      command: "rfkill list",
      purpose: "Shows whether Wi-Fi or Bluetooth radios are blocked by software or a hardware switch.",
      words: [
        ["rfkill", "Reads or changes radio block state."],
        ["list", "Displays current radio devices and block status."]
      ],
      expected: "Wi-Fi and Bluetooth devices, if present, should not be hard blocked.",
      fails: "If hard blocked is yes, use the laptop switch, keyboard toggle, or firmware setting before blaming NetworkManager."
    },
    {
      label: "Intel CPU microcode branch",
      sources: sourceRefs("pacman"),
      command: "sudo pacman -S intel-ucode",
      purpose: "Installs Intel CPU microcode. Use this only when CPU detection shows an Intel CPU.",
      words: [
        ["intel-ucode", "Intel CPU microcode package."]
      ],
      expected: "Use on Intel systems only, then add the matching bootloader microcode entry where the bootloader section says to do so.",
      fails: "If the CPU is AMD, do not use this branch."
    },
    {
      label: "AMD CPU microcode branch",
      sources: sourceRefs("pacman"),
      command: "sudo pacman -S amd-ucode",
      purpose: "Installs AMD CPU microcode. Use this only when CPU detection shows an AMD CPU.",
      words: [
        ["amd-ucode", "AMD CPU microcode package."]
      ],
      expected: "Use on AMD systems only, then add the matching bootloader microcode entry where the bootloader section says to do so.",
      fails: "If the CPU is Intel, do not use this branch."
    },
    {
      label: "Intel graphics branch",
      sources: sourceRefs("mesaPackage", "vulkanIntelPackage", "pacman"),
      command: "sudo pacman -S mesa vulkan-intel",
      purpose: "Installs Mesa OpenGL support and the Intel Vulkan driver for systems whose detected GPU is Intel.",
      words: [
        ["mesa", "Open-source OpenGL drivers."],
        ["vulkan-intel", "Intel Vulkan driver package."]
      ],
      expected: "Use when lspci identifies Intel graphics. If the machine only needs a basic desktop and Vulkan is not needed, Mesa may already arrive as a dependency.",
      fails: "If the GPU is not Intel, choose the matching GPU branch instead."
    },
    {
      label: "AMD graphics branch",
      sources: sourceRefs("mesaPackage", "vulkanRadeonPackage", "pacman"),
      command: "sudo pacman -S mesa vulkan-radeon",
      purpose: "Installs Mesa OpenGL support and the Radeon Vulkan driver for systems whose detected GPU is AMD Radeon.",
      words: [
        ["mesa", "Open-source OpenGL drivers."],
        ["vulkan-radeon", "Radeon Vulkan driver package."]
      ],
      expected: "Use when lspci identifies AMD/ATI Radeon graphics.",
      fails: "If the GPU is not AMD Radeon, choose the matching GPU branch instead."
    },
    {
      label: "NVIDIA graphics branch",
      sources: sourceRefs("nvidiaOpenPackage", "nvidiaUtilsPackage", "pacman"),
      command: "sudo pacman -S nvidia-open nvidia-utils",
      purpose: "Installs NVIDIA open kernel modules and NVIDIA userspace utilities for supported NVIDIA GPUs on the standard linux kernel path.",
      words: [
        ["nvidia-open", "NVIDIA open kernel modules package."],
        ["nvidia-utils", "NVIDIA userspace utilities and libraries."]
      ],
      expected: "Use only when lspci identifies NVIDIA graphics and the selected NVIDIA driver path matches the installed kernel and GPU support.",
      fails: "If the machine has older NVIDIA hardware, a custom kernel, or hybrid graphics, stop and use the NVIDIA-specific documentation before installing random packages."
    },
    {
      label: "Verify selected graphics path",
      sources: sourceRefs("pacman"),
      command: "pacman -Q mesa vulkan-intel vulkan-radeon nvidia-open nvidia-utils",
      purpose: "Checks which graphics packages are installed after choosing a branch.",
      words: [
        ["pacman -Q", "Queries installed packages."],
        ["graphics package names", "The possible packages from the branches above."]
      ],
      expected: "Installed packages print versions. Packages not selected for this machine may print 'was not found'.",
      fails: "Do not treat every missing branch package as a failure. Only the package or packages chosen for this hardware need to be installed."
    }
  ],
  terms: ["hardware detection", "lscpu", "lspci", "lsusb", "rfkill", "GPU", "Mesa", "NVIDIA", "Vulkan", "firmware", "NetworkManager", "PipeWire"]
});

extendSection("Configure System", {
  blocks: [
    {
      type: "checkpoint",
      title: "systemd-boot assumptions for this path",
      text: "Use this path only when the machine booted the ISO in UEFI mode and the EFI System Partition is mounted at /boot inside the installed system. The commands assume the Linux kernel is installed as /boot/vmlinuz-linux and the initramfs is /boot/initramfs-linux.img."
    },
    {
      type: "explain",
      title: "What systemd-boot reads",
      text: "systemd-boot reads its main settings from /boot/loader/loader.conf and boot entries from /boot/loader/entries/*.conf when the EFI System Partition is mounted at /boot. The entry file tells it which kernel to start and what root filesystem Linux should mount."
    },
    {
      type: "warn",
      title: "The root identifier must match the real root filesystem",
      text: "The example entry uses root=UUID=... because UUIDs are stable. The learner must copy the UUID of the Linux root filesystem, not the EFI partition and not the swap partition."
    },
    {
      type: "checkpoint",
      title: "Headless VM testing note",
      text: "For automated or headless VM validation, the Arch ISO and installed system may need a serial console. In the VM run, adding console=ttyS0,115200 made the live ISO and installed system visible over QEMU serial output. A normal laptop or desktop install usually does not need this option."
    },
    {
      type: "explain",
      title: "bootctl output can mention EFI variables",
      text: "When bootctl install runs inside a chroot or VM environment, it may report that EFI variable modifications were skipped. That is not automatically a failed install. systemd-boot can still copy EFI files, including fallback files, and the real proof is whether the machine boots from the installed disk without the ISO."
    },
    {
      type: "explain",
      title: "FAT32 random seed warning",
      text: "A simple beginner layout mounts the EFI System Partition at /boot, and that filesystem is FAT32. bootctl may warn that the random seed file is on a world-accessible mount. Treat that as a hardening note for later, not as a reason to abandon a successful beginner install."
    }
  ],
  commands: [
    {
      label: "Confirm the EFI partition is mounted at /boot",
      sources: sourceRefs("installGuide", "efiSystemPartition", "systemdBoot", "systemdBootMan"),
      command: "findmnt /boot",
      purpose: "Shows the filesystem mounted at /boot from inside the chroot. For this simple systemd-boot path, /boot should be the EFI System Partition.",
      words: [
        ["findmnt", "Shows mounted filesystems in a clear tree/table form."],
        ["/boot", "The mount point being checked."]
      ],
      expected: "A row showing /boot mounted from the EFI partition, usually with a vfat/FAT filesystem.",
      fails: "If /boot is not mounted, exit chroot, mount the EFI partition at /mnt/boot, re-enter chroot, and check again."
    },
    {
      label: "Confirm kernel and initramfs files exist",
      sources: sourceRefs("installGuide", "systemdBootMan"),
      command: "ls -lh /boot/vmlinuz-linux /boot/initramfs-linux.img",
      purpose: "Verifies that the kernel image and initramfs image are present where the boot entry will point.",
      words: [
        ["ls", "Lists file information."],
        ["-l", "Long format with permissions, owner, size, and date."],
        ["-h", "Human-readable sizes."],
        ["/boot/vmlinuz-linux", "Default Arch Linux kernel image path for the linux package in this simple layout."],
        ["/boot/initramfs-linux.img", "Default generated initramfs image path."]
      ],
      expected: "Two files are listed with nonzero sizes.",
      fails: "If files are missing, confirm the linux package was installed by pacstrap and that /boot was mounted correctly before kernel installation."
    },
    {
      label: "Get the root filesystem UUID",
      sources: sourceRefs("installGuide", "fileSystems"),
      command: "blkid -s UUID -o value /dev/nvme0n1p2",
      purpose: "Prints only the UUID for the Linux root partition. Replace the device path with the real root partition.",
      words: [
        ["blkid", "Prints block device identifiers and filesystem metadata."],
        ["-s UUID", "Select only the UUID field."],
        ["-o value", "Print only the value, without the UUID= label."],
        ["/dev/nvme0n1p2", "Example Linux root partition path."]
      ],
      expected: "A UUID string such as 12345678-90ab-cdef-1234-567890abcdef.",
      fails: "If nothing prints, the partition may not have a filesystem or the wrong partition path was used."
    },
    {
      label: "Create the loader entries directory",
      sources: sourceRefs("loaderConfMan", "systemdBootMan"),
      command: "mkdir -p /boot/loader/entries",
      purpose: "Creates the directory where systemd-boot Type 1 boot entry files are stored.",
      words: [
        ["mkdir", "Creates directories."],
        ["-p", "Also create parent directories and do not fail if the directory already exists."],
        ["/boot/loader/entries", "Directory where entry files such as arch.conf live for this layout."]
      ],
      expected: "Usually no output.",
      fails: "If /boot is not writable, confirm the EFI partition is mounted at /boot. bootctl install can also create /boot/loader, but creating it here keeps the file-editing order clear."
    },
    {
      label: "Open the systemd-boot main config",
      sources: sourceRefs("loaderConfMan", "systemdBoot", "systemdBootMan"),
      command: "nano /boot/loader/loader.conf",
      purpose: "Opens the main systemd-boot configuration file. This controls the default entry and menu timeout.",
      words: [
        ["nano", "Terminal text editor."],
        ["/boot/loader/loader.conf", "Main systemd-boot configuration file on the EFI System Partition."]
      ],
      expected: "nano opens a file. Add the loader.conf content shown in the next card, save, and exit.",
      fails: "If nano says the path does not exist, create /boot/loader first or confirm systemd-boot was installed."
    },
    {
      label: "loader.conf content",
      sources: sourceRefs("loaderConfMan"),
      command: "default arch.conf\ntimeout 5\nconsole-mode keep\neditor no",
      purpose: "Sets the default boot entry, shows the boot menu for 5 seconds, keeps firmware console mode, and disables editing boot options from the boot menu.",
      words: [
        ["default arch.conf", "Boot the entry file named arch.conf by default."],
        ["timeout 5", "Show the menu for 5 seconds before booting the default entry."],
        ["console-mode keep", "Keep the display mode selected by firmware."],
        ["editor no", "Disable editing the kernel command line from the boot menu, useful on shared machines."]
      ],
      expected: "After saving, /boot/loader/loader.conf contains these four lines.",
      fails: "If the machine needs emergency boot-line edits during troubleshooting, editor yes can be used later, but editor no is safer for unattended access."
    },
    {
      label: "Open the Arch boot entry",
      sources: sourceRefs("systemdBootMan", "loaderConfMan"),
      command: "nano /boot/loader/entries/arch.conf",
      purpose: "Creates the boot entry that systemd-boot will show as Arch Linux.",
      words: [
        ["nano", "Terminal text editor."],
        ["/boot/loader/entries/arch.conf", "The entry file referenced by default arch.conf in loader.conf."]
      ],
      expected: "nano opens a new or existing entry file. Add the entry content shown in the next card.",
      fails: "If the directory does not exist, run mkdir -p /boot/loader/entries first."
    },
    {
      label: "arch.conf content with root UUID",
      sources: sourceRefs("systemdBootMan", "loaderConfMan", "installGuide"),
      command: "title Arch Linux\nlinux /vmlinuz-linux\ninitrd /initramfs-linux.img\noptions root=UUID=PASTE-ROOT-UUID-HERE rw",
      purpose: "Defines a boot entry for the normal Arch kernel. Replace PASTE-ROOT-UUID-HERE with the UUID from the root partition.",
      words: [
        ["title Arch Linux", "Name shown in the boot menu."],
        ["linux /vmlinuz-linux", "Kernel image path relative to the EFI System Partition."],
        ["initrd /initramfs-linux.img", "Initramfs image path relative to the EFI System Partition."],
        ["options", "Kernel command line starts after this word."],
        ["root=UUID=PASTE-ROOT-UUID-HERE", "Tells Linux which filesystem to mount as /."],
        ["rw", "Mount the root filesystem read-write."]
      ],
      expected: "The file exists at /boot/loader/entries/arch.conf and contains the real root UUID.",
      fails: "If the UUID belongs to the EFI or swap partition, boot will fail. Recheck with blkid and lsblk -f."
    },
    {
      label: "Optional serial-console boot entry variant",
      sources: sourceRefs("systemdBootMan", "loaderConfMan"),
      command: "options root=UUID=PASTE-ROOT-UUID-HERE rw console=ttyS0,115200",
      purpose: "Shows the options line variant used for headless VM testing when boot messages and login need to appear on the first serial port.",
      words: [
        ["options", "Kernel command line starts after this word."],
        ["root=UUID=PASTE-ROOT-UUID-HERE", "The real root filesystem UUID."],
        ["rw", "Mount root read-write."],
        ["console=ttyS0,115200", "Send kernel console output to the ttyS0 serial port at 115200 baud."]
      ],
      expected: "Use this variant only for a VM or machine where a serial console is intentionally needed.",
      fails: "For normal graphical or laptop installs, keep the simpler options line unless you know why serial output is required."
    },
    {
      label: "Optional Intel microcode entry line",
      sources: sourceRefs("systemdBootMan", "pacman"),
      command: "initrd /intel-ucode.img",
      purpose: "Shows the extra initrd line used when the intel-ucode package is installed. It must appear before initrd /initramfs-linux.img.",
      words: [
        ["initrd", "Adds an early boot image to load before the root filesystem is available."],
        ["/intel-ucode.img", "Intel CPU microcode image path on /boot."]
      ],
      expected: "Only use this line on Intel systems after installing intel-ucode.",
      fails: "Do not add this line if the file does not exist in /boot."
    },
    {
      label: "Optional AMD microcode entry line",
      sources: sourceRefs("systemdBootMan", "pacman"),
      command: "initrd /amd-ucode.img",
      purpose: "Shows the extra initrd line used when the amd-ucode package is installed. It must appear before initrd /initramfs-linux.img.",
      words: [
        ["initrd", "Adds an early boot image to load."],
        ["/amd-ucode.img", "AMD CPU microcode image path on /boot."]
      ],
      expected: "Only use this line on AMD systems after installing amd-ucode.",
      fails: "Do not add this line if the file does not exist in /boot."
    },
    {
      label: "Install systemd-boot",
      sources: sourceRefs("bootctlMan", "systemdBoot", "systemdBootMan"),
      command: "bootctl install",
      purpose: "Installs systemd-boot into the EFI System Partition and adds it to the firmware boot loader list.",
      words: [
        ["bootctl", "Tool for checking EFI boot status and managing systemd-boot."],
        ["install", "Install systemd-boot to the EFI System Partition."]
      ],
      expected: "Output indicates systemd-boot files were installed. It may also create normal and fallback EFI loader paths.",
      fails: "If bootctl cannot find an EFI System Partition, confirm UEFI mode and that the ESP is mounted at /boot. If EFI variable modification is skipped from a chroot, continue to bootctl list/status and the real boot test instead of assuming failure."
    },
    {
      label: "List boot entries before reboot",
      sources: sourceRefs("bootctlMan", "systemdBootMan"),
      command: "bootctl list",
      purpose: "Shows boot loader entries that systemd-boot can see. This validates that arch.conf is readable.",
      words: [
        ["bootctl", "EFI boot manager control tool."],
        ["list", "List available boot loader entries."]
      ],
      expected: "An entry for Arch Linux or arch.conf appears.",
      fails: "If no Arch entry appears, check /boot/loader/entries/arch.conf path and file contents."
    },
    {
      label: "Check bootctl status",
      sources: sourceRefs("bootctlMan"),
      command: "bootctl status",
      purpose: "Displays firmware, ESP, boot loader, and default-entry information before reboot.",
      words: [
        ["bootctl", "EFI boot manager control tool."],
        ["status", "Show EFI firmware and boot loader status."]
      ],
      expected: "Status output identifies the EFI System Partition and systemd-boot installation.",
      fails: "If firmware variables cannot be accessed, confirm the ISO was booted in UEFI mode."
    }
  ],
  terms: ["systemd", "bootloader", "loader entry", "kernel command line", "initrd", "UUID", "PARTUUID", "ESP"]
});

extendSection("Configure System", {
  blocks: [
    {
      type: "checkpoint",
      title: "GRUB UEFI assumptions for this path",
      text: "Use this GRUB path only when the machine booted the ISO in UEFI mode and the EFI System Partition is mounted at /boot inside the installed system. This is an alternative to systemd-boot; a beginner should choose one bootloader path for the install."
    },
    {
      type: "explain",
      title: "What GRUB does in this UEFI path",
      text: "GRUB installs EFI boot files to the EFI System Partition, registers a boot entry with firmware through EFI variables, and reads /boot/grub/grub.cfg to decide which Linux kernel entries to show."
    },
    {
      type: "warn",
      title: "Do not mix bootloader instructions casually",
      text: "Installing both systemd-boot and GRUB can be valid for advanced users, but it adds confusion for beginners. This guide should present GRUB UEFI as a separate branch from systemd-boot UEFI."
    }
  ],
  commands: [
    {
      label: "Install GRUB and EFI boot manager tools",
      sources: sourceRefs("grub", "grubPackage", "efibootmgrPackage", "pacman"),
      command: "pacman -S grub efibootmgr",
      purpose: "Installs GRUB and efibootmgr inside the new Arch system. efibootmgr lets GRUB's installer create or update UEFI firmware boot entries.",
      words: [
        ["pacman", "Arch package manager."],
        ["-S", "Install packages from synchronized repositories."],
        ["grub", "The GNU GRUB bootloader package."],
        ["efibootmgr", "Tool for modifying UEFI boot manager entries from Linux."]
      ],
      expected: "pacman asks for confirmation and installs GRUB plus efibootmgr.",
      fails: "If package downloads fail, return to network and DNS validation. If efibootmgr is omitted, GRUB UEFI installation may not be able to register firmware entries."
    },
    {
      label: "Confirm UEFI variables are available",
      sources: sourceRefs("installGuide", "efiSystemPartition", "grub"),
      command: "ls /sys/firmware/efi/efivars",
      purpose: "Verifies that the chrooted system can see UEFI firmware variables. GRUB UEFI registration depends on this unless using fallback/removable installation modes.",
      words: [
        ["ls", "Lists files in a directory."],
        ["/sys/firmware/efi/efivars", "Kernel interface exposing UEFI firmware variables."]
      ],
      expected: "Many UEFI variable files are listed.",
      fails: "If the path is missing, the ISO may have been booted in legacy BIOS mode. Do not use the UEFI GRUB command path until boot mode is understood."
    },
    {
      label: "Confirm the EFI partition is mounted for GRUB",
      sources: sourceRefs("efiSystemPartition", "grub", "grubInstallMan"),
      command: "findmnt /boot",
      purpose: "Checks that /boot is backed by the EFI System Partition for this simple GRUB UEFI layout.",
      words: [
        ["findmnt", "Shows mounted filesystems."],
        ["/boot", "Mount point used as --efi-directory in this guide."]
      ],
      expected: "/boot is mounted from the EFI partition, usually with filesystem type vfat.",
      fails: "If /boot is not the EFI partition, either mount the ESP at /boot for this path or adjust --efi-directory to the real ESP mount point."
    },
    {
      label: "Install GRUB for x86_64 UEFI",
      sources: sourceRefs("grub", "grubInstallMan", "efiSystemPartition"),
      command: "grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB",
      purpose: "Installs GRUB EFI files to the EFI System Partition and creates a UEFI firmware boot entry named GRUB.",
      words: [
        ["grub-install", "Installs GRUB bootloader files for a chosen platform."],
        ["--target=x86_64-efi", "Selects the 64-bit x86 UEFI GRUB platform."],
        ["--efi-directory=/boot", "Tells GRUB where the EFI System Partition is mounted."],
        ["--bootloader-id=GRUB", "Names the firmware boot entry and directory under EFI."]
      ],
      expected: "Output should end with a successful installation message.",
      fails: "If it cannot find the EFI directory, recheck /boot. If EFI variables fail, confirm UEFI mode and efibootmgr availability."
    },
    {
      label: "Generate the GRUB configuration",
      sources: sourceRefs("grub", "grubMkconfigMan"),
      command: "grub-mkconfig -o /boot/grub/grub.cfg",
      purpose: "Scans the installed system and writes GRUB's main configuration file.",
      words: [
        ["grub-mkconfig", "Generates a GRUB configuration file."],
        ["-o", "Write output to a file instead of printing to the terminal."],
        ["/boot/grub/grub.cfg", "GRUB's generated configuration file for this install."]
      ],
      expected: "Output shows detected Linux images and writes /boot/grub/grub.cfg.",
      fails: "If no Linux image is found, confirm the linux package is installed and /boot contains the kernel/initramfs files."
    },
    {
      label: "Inspect the generated GRUB menu entries",
      sources: sourceRefs("grub", "grubMkconfigMan"),
      command: "grep -n \"menuentry\" /boot/grub/grub.cfg",
      purpose: "Shows the GRUB menu entries generated for the installed system without reading the entire config file.",
      words: [
        ["grep", "Searches text for matching lines."],
        ["-n", "Show line numbers."],
        ["\"menuentry\"", "The GRUB config keyword that starts a boot menu entry."],
        ["/boot/grub/grub.cfg", "Generated GRUB configuration file."]
      ],
      expected: "At least one Arch Linux menuentry appears.",
      fails: "If no menuentry appears, regenerate config and verify kernel files exist."
    },
    {
      label: "Check UEFI boot entries",
      sources: sourceRefs("efibootmgrPackage", "grubInstallMan"),
      command: "efibootmgr",
      purpose: "Lists firmware boot entries so the learner can verify a GRUB entry was registered.",
      words: [
        ["efibootmgr", "Lists and modifies UEFI boot manager entries."]
      ],
      expected: "A Boot#### entry named GRUB appears somewhere in the output.",
      fails: "If no GRUB entry appears but grub-install succeeded with --removable or fallback mode, firmware may still boot fallback files. Otherwise recheck UEFI variable access."
    }
  ],
  terms: ["bootloader", "UEFI", "ESP", "kernel", "initramfs", "firmware", "package"]
});

extendSection("Configure System", {
  blocks: [
    {
      type: "checkpoint",
      title: "GRUB legacy BIOS assumptions for this path",
      text: "Use this branch only when the machine booted the ISO in legacy BIOS mode, not UEFI mode. This path does not use an EFI System Partition or UEFI firmware variables."
    },
    {
      type: "explain",
      title: "Why BIOS GRUB is different",
      text: "In UEFI mode, firmware reads bootloader files from a FAT EFI System Partition. In legacy BIOS mode, firmware starts boot code from the disk boot area, and GRUB then loads the rest of its files from /boot/grub."
    },
    {
      type: "warn",
      title: "Install to the disk, not a partition",
      text: "The BIOS GRUB install command targets a whole disk such as /dev/sda or /dev/nvme0n1. Do not use a partition path such as /dev/sda1 or /dev/nvme0n1p1 for this command."
    },
    {
      type: "warn",
      title: "GPT disks need a BIOS boot partition",
      text: "If the disk uses GPT and the machine boots in legacy BIOS mode, GRUB normally needs a tiny BIOS boot partition. This is separate from the EFI System Partition used by UEFI installs."
    }
  ],
  commands: [
    {
      label: "Confirm the ISO was not booted in UEFI mode",
      sources: sourceRefs("installGuide", "grub"),
      command: "ls /sys/firmware/efi/efivars",
      purpose: "Checks whether UEFI variables are available. For a legacy BIOS branch, this path is expected to be missing.",
      words: [
        ["ls", "Lists files in a directory."],
        ["/sys/firmware/efi/efivars", "UEFI variable path that exists when booted through UEFI."]
      ],
      expected: "For legacy BIOS mode, this should report that the path does not exist.",
      fails: "If many files are listed, the machine booted in UEFI mode. Use the systemd-boot UEFI path or GRUB UEFI path instead."
    },
    {
      label: "Install GRUB for BIOS systems",
      sources: sourceRefs("grub", "grubPackage", "pacman"),
      command: "pacman -S grub",
      purpose: "Installs the GRUB package inside the new Arch system. efibootmgr is not required for the legacy BIOS path.",
      words: [
        ["pacman", "Arch package manager."],
        ["-S", "Install package from repositories."],
        ["grub", "GNU GRUB bootloader package."]
      ],
      expected: "pacman installs GRUB successfully.",
      fails: "If downloads fail, return to network and DNS validation before continuing."
    },
    {
      label: "Identify the whole target disk for BIOS GRUB",
      sources: sourceRefs("installGuide", "partitioning", "grub"),
      command: "lsblk -o NAME,SIZE,TYPE,MODEL,MOUNTPOINTS",
      purpose: "Shows the disk and partition layout so the learner can identify the whole target disk, not a partition.",
      words: [
        ["lsblk", "Lists block devices."],
        ["-o", "Chooses output columns."],
        ["TYPE", "disk means whole disk; part means partition."]
      ],
      expected: "The target install drive appears as TYPE disk, with partitions underneath it as TYPE part.",
      fails: "If you cannot identify the whole disk confidently, stop. Installing GRUB to the wrong disk can make the wrong drive boot or fail to boot."
    },
    {
      label: "Check whether the disk uses GPT or MBR",
      sources: sourceRefs("partitioning", "grub"),
      command: "fdisk -l /dev/sda",
      purpose: "Displays partition table information for the example disk. Replace /dev/sda with the real whole disk.",
      words: [
        ["fdisk", "Partition table inspection and editing tool."],
        ["-l", "List partition information instead of editing it."],
        ["/dev/sda", "Example whole disk path."],
        ["Disklabel type", "The output field that commonly shows gpt or dos/MBR-style partitioning."]
      ],
      expected: "Output includes a Disklabel type line such as gpt or dos.",
      fails: "If the command says the disk is invalid or missing, use the correct whole disk path from lsblk."
    },
    {
      label: "Install GRUB to a BIOS boot disk",
      sources: sourceRefs("grub", "grubInstallMan"),
      command: "grub-install --target=i386-pc /dev/sda",
      purpose: "Installs GRUB for legacy BIOS booting to the whole disk. Replace /dev/sda with the real target disk.",
      words: [
        ["grub-install", "Installs GRUB bootloader files for a chosen platform."],
        ["--target=i386-pc", "Selects the traditional PC BIOS GRUB platform. The name is i386-pc even on many 64-bit x86 machines because it describes the BIOS boot platform."],
        ["/dev/sda", "Example whole disk target. This must not include a partition number."]
      ],
      expected: "Output should end with a successful installation message.",
      fails: "If GRUB complains about embedding on a GPT disk, confirm that a BIOS boot partition exists. If you accidentally used /dev/sda1, rerun with the whole disk after confirming the target."
    },
    {
      label: "Generate GRUB config for BIOS boot",
      sources: sourceRefs("grub", "grubMkconfigMan"),
      command: "grub-mkconfig -o /boot/grub/grub.cfg",
      purpose: "Generates the GRUB menu configuration used at boot. This command is shared by GRUB UEFI and GRUB BIOS paths.",
      words: [
        ["grub-mkconfig", "Generates GRUB configuration."],
        ["-o", "Write output to a specific file."],
        ["/boot/grub/grub.cfg", "Generated GRUB config file."]
      ],
      expected: "Output mentions found Linux image and initramfs image, then writes grub.cfg.",
      fails: "If no Linux image is found, confirm the linux package is installed and /boot is the correct boot directory."
    },
    {
      label: "Inspect BIOS GRUB menu entries",
      sources: sourceRefs("grub", "grubMkconfigMan"),
      command: "grep -n \"menuentry\" /boot/grub/grub.cfg",
      purpose: "Confirms that the generated GRUB configuration contains boot menu entries.",
      words: [
        ["grep", "Search text."],
        ["-n", "Show line numbers."],
        ["\"menuentry\"", "GRUB keyword for a boot menu entry."],
        ["/boot/grub/grub.cfg", "Generated GRUB configuration file."]
      ],
      expected: "At least one Arch Linux menuentry appears.",
      fails: "If no entries appear, regenerate the config and check kernel/initramfs files."
    }
  ],
  terms: ["BIOS", "bootloader", "GRUB", "MBR", "GPT", "BIOS boot partition", "kernel", "initramfs"]
});

extendSection("Firefox", {
  blocks: [
    {
      type: "checkpoint",
      title: "Browser readiness checkpoint",
      text: "Before blaming Firefox, test raw connectivity and DNS separately. If an IP address ping works but a domain ping fails, Firefox is not the root problem; DNS is."
    }
  ],
  commands: [
    {
      label: "Test raw internet connectivity without DNS",
      sources: sourceRefs("networkConfig"),
      command: "ping -c 3 1.1.1.1",
      purpose: "Tests whether packets can reach a public IP address without needing DNS name lookup.",
      words: [
        ["ping", "Send test packets."],
        ["-c 3", "Stop after 3 packets."],
        ["1.1.1.1", "A public IP address used here to test connectivity without DNS."]
      ],
      expected: "Replies with millisecond timings.",
      fails: "If this fails, fix connection, IP address, or routing before investigating DNS or Firefox."
    },
    {
      label: "Test DNS with a normal domain",
      sources: sourceRefs("dns", "networkConfig"),
      command: "ping -c 3 archlinux.org",
      purpose: "Tests both DNS lookup and network reachability to the resolved address.",
      words: [
        ["ping", "Send test packets."],
        ["archlinux.org", "A domain name that must be resolved through DNS."]
      ],
      expected: "Replies from an IP address associated with the domain.",
      fails: "If the error mentions name resolution, focus on DNS. If it resolves but packets fail, focus on routing or firewall/network conditions."
    },
    {
      label: "Launch Firefox from terminal",
      sources: sourceRefs("firefox"),
      command: "firefox",
      purpose: "Starts Firefox and leaves terminal output visible for debugging if the browser fails to launch.",
      words: [
        ["firefox", "Runs the installed Firefox browser."]
      ],
      expected: "A Firefox window opens in the graphical session.",
      fails: "If there is no graphical desktop or DISPLAY/Wayland session, install and start a desktop environment or window manager first."
    }
  ],
  terms: ["IP address", "route", "package", "repository"]
});

extendSection("Audio", {
  blocks: [
    {
      type: "checkpoint",
      title: "Audio readiness checkpoint",
      text: "A working audio setup requires detected hardware, running PipeWire services, a session manager, the correct default output/input, and application streams routed to the right devices."
    },
    {
      type: "explain",
      title: "What the official package metadata says",
      text: "The Arch package metadata describes pipewire as a low-latency audio/video router and processor, and wireplumber as a session/policy manager implementation for PipeWire. The app explanation should preserve that distinction."
    }
  ],
  commands: [
    {
      label: "Check PipeWire service status",
      sources: sourceRefs("pipewire", "systemctlMan"),
      command: "systemctl --user status pipewire",
      purpose: "Shows whether the PipeWire user service is loaded and running for the logged-in user.",
      words: [
        ["systemctl", "Controls and inspects systemd services."],
        ["--user", "Inspect services belonging to the current user session."],
        ["status", "Show service state and recent logs."],
        ["pipewire", "The PipeWire service."]
      ],
      expected: "The service should show active (running).",
      fails: "If the user service cannot connect to the bus, log into a normal user session and retry."
    },
    {
      label: "Check WirePlumber service status",
      sources: sourceRefs("wireplumber", "systemctlMan"),
      command: "systemctl --user status wireplumber",
      purpose: "Shows whether the PipeWire session manager is running.",
      words: [
        ["systemctl --user", "Inspect current user's services."],
        ["status", "Show service state."],
        ["wireplumber", "The PipeWire session/policy manager."]
      ],
      expected: "The service should show active (running).",
      fails: "If missing, install wireplumber. If inactive, enable and start it for the user."
    },
    {
      label: "Show PipeWire/Pulse compatibility info",
      sources: sourceRefs("pipewire"),
      command: "pactl info",
      purpose: "Prints information about the PulseAudio-compatible server. With pipewire-pulse, the server name should indicate PipeWire.",
      words: [
        ["pactl", "PulseAudio control tool, also used through PipeWire's PulseAudio compatibility layer."],
        ["info", "Show server information."]
      ],
      expected: "Server information including a server name related to PulseAudio on PipeWire.",
      fails: "If pactl cannot connect, pipewire-pulse may not be installed or running."
    },
    {
      label: "List output sinks",
      sources: sourceRefs("pipewire", "alsa"),
      command: "pactl list short sinks",
      purpose: "Lists audio output devices that apps can play sound through.",
      words: [
        ["pactl", "Audio server control tool."],
        ["list short", "Print a compact list."],
        ["sinks", "Audio outputs such as speakers, HDMI audio, or headphones."]
      ],
      expected: "One or more sinks, such as built-in analog audio, HDMI, USB headset, or Bluetooth output.",
      fails: "If no sinks appear, check hardware detection, ALSA, PipeWire, and WirePlumber status."
    },
    {
      label: "List input sources",
      sources: sourceRefs("pipewire", "alsa"),
      command: "pactl list short sources",
      purpose: "Lists audio input devices such as microphones.",
      words: [
        ["sources", "Audio inputs such as microphones or monitor sources."]
      ],
      expected: "One or more sources. Microphones may appear alongside monitor sources that represent output capture.",
      fails: "If only monitor sources appear, the microphone may be muted, disabled in firmware, unsupported, or not selected in pavucontrol."
    },
    {
      label: "Record a short microphone test",
      sources: sourceRefs("alsa", "pipewire"),
      command: "arecord -d 5 test.wav",
      purpose: "Records five seconds from the default microphone into a WAV file.",
      words: [
        ["arecord", "ALSA command-line recording tool."],
        ["-d 5", "Record for 5 seconds."],
        ["test.wav", "Output audio file."]
      ],
      expected: "Recording runs for five seconds and creates test.wav.",
      fails: "If the device is busy or missing, choose the input in pavucontrol and confirm the mic is not muted."
    },
    {
      label: "Play the microphone test",
      sources: sourceRefs("alsa", "pipewire"),
      command: "aplay test.wav",
      purpose: "Plays the recorded WAV file through the default output device.",
      words: [
        ["aplay", "ALSA command-line playback tool."],
        ["test.wav", "The recorded test file."]
      ],
      expected: "The learner hears the recorded microphone audio.",
      fails: "If playback is silent, check output device, volume, mute state, and whether test.wav actually contains audio."
    }
  ],
  terms: ["service", "daemon", "ALSA", "package"]
});

insertSectionAfter("Audio", {
  title: "Safety Hardening: Firewall",
  summary: "Use a simple default-deny incoming firewall path after networking, Firefox, audio, and sudo are working.",
  sources: sourceRefs("security", "ufw", "ufwPackage", "systemctlMan"),
  blocks: [
    {
      type: "goal",
      title: "Goal",
      text: "Add a beginner firewall baseline for the user's own Arch machine. This page is defensive hardening. It is not for interfering with other people's systems, accounts, files, traffic, or privacy."
    },
    {
      type: "explain",
      title: "What a firewall does",
      text: "A firewall is a network policy tool. It decides which network traffic is allowed and which traffic is blocked. It does not replace updates, good passwords, careful sudo use, or safe software choices."
    },
    {
      type: "explain",
      title: "Inbound versus outbound",
      text: "Inbound traffic comes into this computer from somewhere else. Outbound traffic leaves this computer to reach websites, package mirrors, DNS servers, update servers, and other services. A beginner desktop usually needs outbound traffic, but usually does not need random inbound connections."
    },
    {
      type: "explain",
      title: "Why default-deny incoming is the beginner default",
      text: "Default-deny incoming means the firewall blocks unsolicited inbound connections unless a later rule allows them. This is safer for a beginner desktop because it reduces accidental exposure while still allowing normal outbound web, package, DNS, and update traffic."
    },
    {
      type: "checkpoint",
      title: "Before this page",
      text: "Use this after first boot, after a normal user exists, after sudo works, and after networking is already verified. If remote SSH is your only way into the machine, do not enable a firewall until SSH access rules are explicitly planned."
    },
    {
      type: "warn",
      title: "Security and privacy boundary",
      text: "Only apply firewall and monitoring guidance to systems you own or administer with permission. Respect other people's privacy. Prevention is the main protection; detection and process killing are backup responses."
    }
  ],
  commands: [
    {
      label: "Install UFW",
      sources: sourceRefs("ufw", "ufwPackage", "pacman"),
      command: "sudo pacman -S ufw",
      purpose: "Installs Uncomplicated Firewall, a simpler firewall management tool.",
      words: [
        ["sudo", "Runs the command with administrator privileges."],
        ["pacman", "Arch package manager."],
        ["-S", "Sync/install a package from repositories."],
        ["ufw", "The Uncomplicated Firewall package."]
      ],
      expected: "pacman asks for confirmation, downloads UFW, and installs it.",
      fails: "If downloads fail, fix networking and DNS before continuing. A firewall should not be configured while package installation is broken."
    },
    {
      label: "Set default deny incoming",
      sources: sourceRefs("ufw", "security"),
      command: "sudo ufw default deny incoming",
      purpose: "Sets the default policy for inbound traffic to deny. This blocks unsolicited incoming connections unless later rules allow them.",
      words: [
        ["sudo", "Runs the command with administrator privileges."],
        ["ufw", "Uncomplicated Firewall command."],
        ["default", "Change the default policy used when no specific rule matches."],
        ["deny", "Block the traffic."],
        ["incoming", "Traffic coming into this computer from another device."]
      ],
      expected: "UFW reports that the default incoming policy changed to deny.",
      fails: "If UFW is not found, install the ufw package first. If you rely on remote login, stop and add the needed allow rule before enabling the firewall."
    },
    {
      label: "Set default allow outgoing",
      sources: sourceRefs("ufw", "security"),
      command: "sudo ufw default allow outgoing",
      purpose: "Sets the default policy for outbound traffic to allow so normal browsing, updates, DNS, and package downloads can work.",
      words: [
        ["sudo", "Runs with administrator privileges."],
        ["ufw", "Uncomplicated Firewall command."],
        ["default", "Change default policy."],
        ["allow", "Permit the traffic."],
        ["outgoing", "Traffic leaving this computer toward another device or internet service."]
      ],
      expected: "UFW reports that the default outgoing policy changed to allow.",
      fails: "If outgoing traffic is denied by mistake, browsers, pacman, DNS, and updates may fail."
    },
    {
      label: "Enable and start the UFW service",
      sources: sourceRefs("ufw", "systemctlMan"),
      command: "sudo systemctl enable --now ufw",
      purpose: "Starts UFW now and enables it to start automatically on future boots.",
      words: [
        ["sudo", "Runs with administrator privileges."],
        ["systemctl", "Controls systemd services."],
        ["enable", "Makes the service start automatically during boot."],
        ["--now", "Also start the service immediately."],
        ["ufw", "The UFW systemd service."]
      ],
      expected: "systemctl returns without an error. The service should now be enabled and active.",
      fails: "If the service does not exist, confirm the ufw package installed. If remote access stops working, use local console or recovery access and adjust firewall rules."
    },
    {
      label: "Verify firewall status",
      sources: sourceRefs("ufw"),
      command: "sudo ufw status verbose",
      purpose: "Shows whether UFW is active and prints default incoming/outgoing policies.",
      words: [
        ["sudo", "Runs with administrator privileges."],
        ["ufw", "Uncomplicated Firewall command."],
        ["status", "Show firewall status."],
        ["verbose", "Show more detail, including default policies."]
      ],
      expected: "Status is active. Default incoming policy is deny. Default outgoing policy is allow.",
      fails: "If inactive, check the UFW service. If policies do not match, repeat the default deny incoming and default allow outgoing commands carefully."
    }
  ],
  terms: ["firewall", "inbound", "outbound", "UFW", "sudo", "systemd", "service", "network"]
});

insertSectionAfter("Safety Hardening: Firewall", {
  title: "Safety Hardening: Process Limits",
  summary: "Learn the temporary session-scoped process limit command before permanent PAM or cgroup limits.",
  sources: sourceRefs("security", "bashMan"),
  blocks: [
    {
      type: "goal",
      title: "Goal",
      text: "Teach a beginner what process-count limiting means without making a permanent system change. This page uses ulimit because it is temporary for the current shell session."
    },
    {
      type: "explain",
      title: "What a process is",
      text: "A process is a running program or command. Firefox can have many processes. A terminal shell is a process. A system service is a process. Process count matters because too many processes can consume CPU, memory, and scheduler attention."
    },
    {
      type: "explain",
      title: "What fork means",
      text: "Fork means one process creates another process. This is normal when a shell starts commands. It becomes dangerous when a broken command, script, or program creates processes repeatedly and quickly. Prevention is the main protection because a system can become hard to control once process creation explodes."
    },
    {
      type: "explain",
      title: "What nproc means",
      text: "nproc means number of processes in this context. A process-count limit says how many processes a user/session may have at once. It is not a CPU speed limit and it is not a memory limit."
    },
    {
      type: "explain",
      title: "Why this ulimit path is temporary",
      text: "ulimit is handled by the current shell. A limit set with ulimit affects that shell and commands started from that shell. It is session-scoped. It is useful for learning and testing, but it is not the final persistent policy for every future login."
    },
    {
      type: "warn",
      title: "Security and privacy boundary",
      text: "Use process limits only on systems/accounts you own or administer with permission. Do not use monitoring or limits to interfere with other people's work or inspect their private activity."
    }
  ],
  commands: [
    {
      label: "Show the current process limit",
      sources: sourceRefs("bashMan", "security"),
      command: "ulimit -u",
      purpose: "Prints the current maximum number of processes allowed for this shell session.",
      words: [
        ["ulimit", "Shell built-in that reads or sets resource limits for the current shell session."],
        ["space after ulimit", "Separates the command word from the option. Without this space, the shell would read different text."],
        ["-u", "Option for the maximum user process count. The dash - starts an option. The letter u selects the process-count limit."],
        ["-", "Dash character. It tells the shell/program that the next character belongs to an option, not a normal word."],
        ["u", "The option letter used by ulimit for user process count."],
        ["ulimit -u", "Combined meaning: ask the current shell to print the process-count limit for this session."]
      ],
      expected: "A number, or sometimes the word unlimited. A number means that many processes are allowed. unlimited means no shell-level process-count cap is currently shown here.",
      fails: "If the shell says ulimit is not found, you may not be in a normal POSIX-style shell. In bash, ulimit is a shell built-in."
    },
    {
      label: "Set a temporary process limit for this shell",
      sources: sourceRefs("bashMan", "security"),
      command: "ulimit -u 1000",
      purpose: "Sets the maximum process count for the current shell session to 1000. This is temporary and affects commands started from this shell.",
      words: [
        ["ulimit", "Shell built-in that sets or reads resource limits."],
        ["space after ulimit", "Separates the command name from the option."],
        ["-u", "Option selecting maximum user processes. Dash means option starts. u means process-count limit."],
        ["space after -u", "Separates the option from the value that follows."],
        ["1000", "The numeric limit value. It means one thousand processes."],
        ["1", "The first digit. In this number it represents one thousand because three zeros follow it."],
        ["0", "Zero digit. The three zeros in 1000 make the value one thousand, not one, ten, or one hundred."],
        ["ulimit -u 1000", "Combined meaning: set this shell session's process-count limit to 1000."]
      ],
      expected: "Usually no output. Silence means the shell accepted the new limit.",
      fails: "If it says operation not permitted, the requested limit may be higher than the allowed hard limit or the current user may not be allowed to raise it. Try a lower number only if you understand why."
    },
    {
      label: "Verify the temporary limit",
      sources: sourceRefs("bashMan"),
      command: "ulimit -u",
      purpose: "Prints the process-count limit again so the user can confirm the shell now reports 1000.",
      words: [
        ["ulimit", "Shell built-in for resource limits."],
        ["-u", "Show the process-count limit."],
        ["ulimit -u", "Combined meaning: print the current shell session's process-count limit."]
      ],
      expected: "The output should be 1000 if the previous command succeeded in this same shell.",
      fails: "If the value did not change, confirm you ran both commands in the same terminal shell. A new terminal may have a different limit."
    }
  ],
  terms: ["process", "fork", "nproc", "ulimit", "shell", "session"]
});

insertSectionAfter("Safety Hardening: Process Limits", {
  title: "Safety Hardening: PAM Limits",
  summary: "Create a persistent process-count policy with /etc/security/limits.conf after understanding temporary ulimit.",
  sources: sourceRefs("limitsConfMan", "pam", "security"),
  blocks: [
    {
      type: "goal",
      title: "Goal",
      text: "Teach the persistent PAM limits file carefully before editing it. This page is for defensive hardening on systems/accounts the user owns or administers with permission."
    },
    {
      type: "explain",
      title: "What /etc/security/limits.conf is",
      text: "/etc/security/limits.conf is a configuration file. The first slash means start at the top of the Linux filesystem. etc means system configuration. security is the security configuration directory. limits.conf is the file name. The dot in limits.conf separates the base name limits from the conf extension, which usually means configuration."
    },
    {
      type: "explain",
      title: "What PAM is",
      text: "PAM means Pluggable Authentication Modules. PAM is involved when users log in or start sessions through PAM-aware services. PAM can apply limits from limits.conf when a new session starts. This means changes here usually affect future sessions, not every already-open shell immediately."
    },
    {
      type: "explain",
      title: "The four-column syntax",
      text: "limits.conf lines use four fields: domain, type, item, and value. Domain says who the rule applies to. Type says soft, hard, or both. Item says what resource is limited. Value says the number or setting to use."
    },
    {
      type: "explain",
      title: "Soft versus hard limits",
      text: "A soft limit is the normal active limit a session receives. A hard limit is the ceiling. A normal user may be able to lower a soft limit, but usually cannot raise it above the hard limit. For beginner safety, hard nproc is the important protective ceiling."
    },
    {
      type: "explain",
      title: "What nproc means here",
      text: "nproc means maximum number of processes. In limits.conf, nproc is not the command that prints CPU count. Here it is the resource item that limits how many processes a user or group may have."
    },
    {
      type: "warn",
      title: "Lockout and privacy boundary",
      text: "A bad limits policy can stop users from opening shells, terminals, desktops, or services. Keep a recovery path available. Only apply limits to systems/accounts you own or administer with permission."
    }
  ],
  commands: [
    {
      label: "Open the PAM limits file",
      sources: sourceRefs("limitsConfMan", "pam"),
      command: "sudo nano /etc/security/limits.conf",
      purpose: "Opens the PAM limits configuration file for editing with administrator privileges.",
      words: [
        ["sudo", "Runs the command with administrator privileges."],
        ["space after sudo", "Separates sudo from the program it will run."],
        ["nano", "Terminal text editor."],
        ["space after nano", "Separates the editor name from the file path."],
        ["/etc/security/limits.conf", "The full file path being opened."],
        ["/", "Leading slash. It means start at the root of the Linux filesystem."],
        ["etc", "Directory that stores system configuration."],
        ["/ after etc", "Path separator between etc and security."],
        ["security", "Directory for security-related configuration."],
        ["/ after security", "Path separator between security and limits.conf."],
        ["limits.conf", "Configuration file name for PAM limits."],
        ["limits", "Base name of the file. It describes resource limits."],
        [".", "Dot separating the base file name from the extension."],
        ["conf", "Common short form for configuration."]
      ],
      expected: "nano opens /etc/security/limits.conf. Existing comments may start with #. Do not delete unknown existing lines.",
      fails: "If permission is denied, confirm sudo works. If nano is missing, install nano or use another editor only if you know how to save and exit safely."
    },
    {
      label: "Add a hard process-count limit line",
      sources: sourceRefs("limitsConfMan"),
      command: "@users hard nproc 500",
      purpose: "This is the exact line to add inside /etc/security/limits.conf to set a hard process-count limit for members of the users group.",
      words: [
        ["@users hard nproc 500", "Full file line. It belongs inside /etc/security/limits.conf, not directly at the shell prompt."],
        ["@", "At sign. In limits.conf domain syntax, @ before a name means a group, not one literal username."],
        ["users", "Group name. @users means the rule applies to members of the users group."],
        ["space after @users", "Separates the domain field from the type field."],
        ["hard", "Type field. A hard limit is the ceiling a normal user generally cannot raise above."],
        ["space after hard", "Separates the type field from the item field."],
        ["nproc", "Item field. Here it means maximum number of processes."],
        ["space after nproc", "Separates the item field from the value field."],
        ["500", "Value field. It means five hundred processes."],
        ["5", "First digit. With two zeros after it, this represents five hundred."],
        ["0", "Zero digit. The two zeros in 500 make the value five hundred, not five or fifty."]
      ],
      expected: "The file contains a line exactly like @users hard nproc 500. It should not have # in front if the rule is meant to apply.",
      fails: "If you put this in the terminal instead of the file, the shell will likely treat it as an invalid command. Open the file again and add the line inside nano."
    },
    {
      label: "Optional matching soft process-count limit line",
      sources: sourceRefs("limitsConfMan"),
      command: "@users soft nproc 500",
      purpose: "This optional line makes the normal active process-count limit start at 500 for members of the users group.",
      words: [
        ["@users", "Domain field. @ means group, users is the group name."],
        ["soft", "Type field. Soft means the normal active limit a new session starts with."],
        ["nproc", "Item field. Maximum number of processes."],
        ["500", "Value field. Five hundred processes."],
        ["@users soft nproc 500", "Combined meaning: for users group members, start new sessions with a soft process-count limit of 500."]
      ],
      expected: "The line appears in /etc/security/limits.conf without a leading # if you intentionally want the soft limit active.",
      fails: "If users cannot log in after a limit change, boot or log in through a recovery/admin path and remove or raise the limit."
    },
    {
      label: "Save and exit nano",
      sources: sourceRefs("limitsConfMan"),
      command: "Ctrl+O, Enter, Ctrl+X",
      purpose: "Saves the edited limits.conf file and exits nano.",
      words: [
        ["Ctrl+O", "Hold Control and press O. In nano, this means write out, which saves the file."],
        [",", "Comma in this walkthrough separates key actions. Do not type the comma into nano unless editing text."],
        ["Enter", "Confirms the filename nano is saving to."],
        ["Ctrl+X", "Hold Control and press X. In nano, this exits the editor."],
        ["Ctrl", "Control key on the keyboard."],
        ["+", "Plus sign in this walkthrough means press keys together. Do not type the plus sign."]
      ],
      expected: "nano exits and returns to the shell prompt after saving.",
      fails: "If nano asks about a modified buffer, choose to save only if the file contents are correct. If unsure, cancel and review the lines."
    },
    {
      label: "Verify the file contains the nproc lines",
      sources: sourceRefs("limitsConfMan"),
      command: "grep -n \"nproc\" /etc/security/limits.conf",
      purpose: "Prints lines in limits.conf that contain nproc so the user can verify the policy text.",
      words: [
        ["grep", "Searches text for matching lines."],
        ["space after grep", "Separates the command from its option."],
        ["-n", "Show matching line numbers. Dash starts the option. n means line number."],
        ["space after -n", "Separates the option from the search pattern."],
        ["\"nproc\"", "Quoted search pattern. The quotes group nproc as the text to search for."],
        ["\"", "Double quote character. It starts or ends the quoted text."],
        ["nproc", "The text being searched for."],
        ["/etc/security/limits.conf", "The file being searched."]
      ],
      expected: "The output shows the nproc lines you added, with line numbers. Lines starting with # are comments and are not active rules.",
      fails: "If nothing prints, the file may not contain nproc. Reopen it with sudo nano /etc/security/limits.conf and check the exact spelling."
    }
  ],
  terms: ["PAM", "limits.conf", "soft limit", "hard limit", "nproc", "process", "sudo", "nano"]
});

insertSectionAfter("Safety Hardening: PAM Limits", {
  title: "Safety Hardening: Cgroup Plan",
  summary: "Plan CPU, memory, and task limits with systemd cgroup resource controls before applying them.",
  sources: sourceRefs("systemdResourceControlMan", "systemdSliceMan", "systemdUnitMan", "security"),
  blocks: [
    {
      type: "goal",
      title: "Goal",
      text: "Explain cgroup resource controls clearly before the app gives a full applied policy. This page is a plan and education step, not a universal copy/paste hardening recipe."
    },
    {
      type: "explain",
      title: "What cgroups are",
      text: "A cgroup is a Linux kernel control group. It groups processes so limits can be applied to the group. systemd uses cgroups underneath its units, services, scopes, sessions, and slices."
    },
    {
      type: "explain",
      title: "CPU versus memory versus tasks",
      text: "CPU control limits processor time. Memory control limits RAM use. Task control limits how many tasks/processes can exist inside a unit or slice. These are different controls and they solve different problems."
    },
    {
      type: "explain",
      title: "What a user slice is",
      text: "A systemd slice groups work. User sessions normally live under user-related slices. Limiting a user slice can affect everything inside that user's session, including terminals, browsers, desktop services, and background apps."
    },
    {
      type: "explain",
      title: "What a drop-in is",
      text: "A drop-in is an extra config file in a directory ending with .d. It changes a unit without replacing the full original unit file. Drop-ins are powerful because a few lines can change behavior for many processes."
    },
    {
      type: "warn",
      title: "Do not apply blindly",
      text: "Bad CPU, memory, or task limits can freeze apps, break logins, stop desktop sessions, or make troubleshooting harder. Use this page to understand the exact file contents before applying any real override."
    }
  ],
  commands: [
    {
      label: "Example user slice drop-in path",
      sources: sourceRefs("systemdUnitMan", "systemdSliceMan"),
      command: "/etc/systemd/system/user-1000.slice.d/50-limits.conf",
      purpose: "Shows an example path for a systemd drop-in file targeting a user slice. This is an example path, not a universal value.",
      words: [
        ["/etc/systemd/system/user-1000.slice.d/50-limits.conf", "Full example path for a systemd drop-in file."],
        ["/", "Leading slash. Start at the root of the filesystem."],
        ["etc", "System configuration directory."],
        ["systemd", "Configuration area for systemd."],
        ["system", "System-level unit directory."],
        ["user-1000.slice.d", "Drop-in directory for the example user-1000.slice unit."],
        ["user", "Indicates a user-related slice name."],
        ["-", "Dash separating words/numbers in the unit name."],
        ["1000", "Example numeric user ID. This must match the real user's UID if this path is ever used."],
        [".slice", "Systemd unit type suffix for a slice unit."],
        [".d", "Drop-in directory suffix. Files inside extend or override the unit."],
        ["50-limits.conf", "Example drop-in file name. 50 controls ordering relative to other drop-ins; limits describes the purpose; conf means configuration."]
      ],
      expected: "The user understands this is a path example for planning. It should not be created until the exact target user/slice is verified.",
      fails: "If the UID or slice name is wrong, the drop-in may apply to the wrong target or not apply at all."
    },
    {
      label: "Example drop-in file contents",
      sources: sourceRefs("systemdResourceControlMan", "systemdUnitMan"),
      command: "[Slice]\nCPUQuota=50%\nMemoryMax=2G\nTasksMax=500",
      purpose: "Shows exact example file contents for a slice drop-in that limits CPU, memory, and task count.",
      words: [
        ["[Slice]", "Section header. Square brackets mark the section. Slice means these settings belong to a slice unit."],
        ["[", "Opening square bracket. It starts the section name."],
        ["Slice", "Section name for slice-unit settings."],
        ["]", "Closing square bracket. It ends the section header."],
        ["CPUQuota=50%", "Line setting a CPU quota of fifty percent."],
        ["CPUQuota", "systemd resource-control key for CPU time quota."],
        ["=", "Equals sign. It connects the setting name to its value."],
        ["50%", "Value meaning fifty percent of one CPU's worth of time, as a simple beginner example."],
        ["MemoryMax=2G", "Line setting a maximum memory amount of 2 gigabytes."],
        ["MemoryMax", "systemd resource-control key for maximum memory."],
        ["2G", "Value meaning two gigabytes in this example."],
        ["TasksMax=500", "Line setting a maximum task/process count."],
        ["TasksMax", "systemd key for maximum tasks in the unit or slice."],
        ["500", "Value meaning five hundred tasks/processes."]
      ],
      expected: "The user can read every line and explain what it would do before any file is created.",
      fails: "If these values are too low, graphical sessions, browsers, terminals, or services may fail. Plan values conservatively and keep recovery access."
    },
    {
      label: "Verify resource-control properties later",
      sources: sourceRefs("systemdResourceControlMan"),
      command: "systemctl show user-1000.slice -p CPUQuotaPerSecUSec -p MemoryMax -p TasksMax",
      purpose: "Shows example verification for resource-control values on a user slice after a real policy is applied.",
      words: [
        ["systemctl", "Tool for inspecting and controlling systemd."],
        ["show", "Print systemd unit properties."],
        ["user-1000.slice", "Example slice unit name. 1000 must match the real user's UID if used."],
        ["-p", "Property filter option. Dash starts the option. p means property."],
        ["CPUQuotaPerSecUSec", "Property related to CPU quota."],
        ["MemoryMax", "Property for maximum memory setting."],
        ["TasksMax", "Property for maximum task count."]
      ],
      expected: "systemctl prints the requested properties. Values should match the applied policy after daemon reload/session restart as appropriate.",
      fails: "If the unit is not found, the target slice name may be wrong or the user session may not exist."
    }
  ],
  terms: ["cgroup", "systemd slice", "drop-in", "CPUQuota", "MemoryMax", "TasksMax", "systemd", "process"]
});

insertSectionAfter("Safety Hardening: Cgroup Plan", {
  title: "Safety Hardening: Restricted Shell Plan",
  summary: "Understand login shells and restricted shells before changing any account's shell.",
  sources: sourceRefs("chshMan", "shellsMan", "bashRestrictedMan", "usersGroups", "security"),
  blocks: [
    {
      type: "goal",
      title: "Goal",
      text: "Explain restricted shell access as a defensive planning topic. The beginner rule is simple: do not restrict the administrator account, do not restrict your only recovery account, and do not apply shell restrictions to anyone without permission."
    },
    {
      type: "explain",
      title: "What a login shell is",
      text: "A login shell is the shell program started when a user logs in. Common examples are /bin/bash and /usr/bin/zsh. If the login shell is wrong, missing, or too restricted, the user may not be able to use the account normally."
    },
    {
      type: "explain",
      title: "What a restricted shell is",
      text: "A restricted shell limits some shell behavior. For example, restricted bash can limit changing directories, changing some environment variables, or running commands with slash characters in the name. It is not a full sandbox and it is not a replacement for permissions, separate users, containers, or careful service design."
    },
    {
      type: "explain",
      title: "Who should receive restrictions",
      text: "Restrictions should only be considered for deliberately limited accounts, such as a training account, kiosk-like account, or account made for a narrow task. Do not apply this to root, your main administrator account, or the only account that can recover the system."
    },
    {
      type: "explain",
      title: "What restrictions do not protect against",
      text: "A restricted shell does not automatically protect private files if file permissions are wrong. It does not stop every program from doing dangerous things. It does not replace firewall rules, process limits, cgroups, updates, backups, or least-privilege account design."
    },
    {
      type: "warn",
      title: "Lockout warning",
      text: "Changing a login shell can lock out a user. Always keep a separate known-working admin path before testing shell restrictions. The app blocks shell-changing commands behind both the lockout gate and the security/privacy gate."
    }
  ],
  commands: [
    {
      label: "View valid login shells",
      sources: sourceRefs("shellsMan"),
      command: "cat /etc/shells",
      purpose: "Prints the system's list of valid login shells.",
      words: [
        ["cat", "Prints file contents to the terminal."],
        ["space after cat", "Separates the command from the file path."],
        ["/etc/shells", "File listing valid login shells."],
        ["/", "Leading slash. Start at the root of the filesystem."],
        ["etc", "System configuration directory."],
        ["shells", "File name containing known shell paths."]
      ],
      expected: "A list of shell paths, often including /bin/sh and /bin/bash. The exact list depends on installed shells.",
      fails: "If the file is missing or empty, do not change login shells until the system shell configuration is understood."
    },
    {
      label: "Example restricted bash path",
      sources: sourceRefs("bashRestrictedMan", "shellsMan"),
      command: "/bin/rbash",
      purpose: "Shows a common restricted bash path example. This is a value used as a shell path, not a command to run blindly.",
      words: [
        ["/bin/rbash", "Example path for restricted bash."],
        ["/", "Leading slash. Start at filesystem root."],
        ["bin", "Directory for essential command binaries on many systems."],
        ["/ after bin", "Path separator between bin and rbash."],
        ["rbash", "Restricted bash program name or symlink name."],
        ["r", "The r hints restricted in this name."],
        ["bash", "The Bash shell."]
      ],
      expected: "The user understands /bin/rbash is only an example and must exist in /etc/shells before being used as a login shell.",
      fails: "If /bin/rbash does not exist or is not listed in /etc/shells, do not set it as a user's shell."
    },
    {
      label: "Example shell change command for a limited account",
      sources: sourceRefs("chshMan", "usersGroups", "bashRestrictedMan"),
      command: "sudo chsh -s /bin/rbash limiteduser",
      purpose: "Example command showing how a login shell would be changed for a deliberately limited account. Replace limiteduser with the exact account name only after planning.",
      words: [
        ["sudo", "Runs the command with administrator privileges."],
        ["chsh", "Change shell command."],
        ["-s", "Option selecting the shell path. Dash starts the option; s means shell."],
        ["/bin/rbash", "Example restricted shell path."],
        ["limiteduser", "Placeholder account name. This must be replaced with the real limited account, never the admin account unless deliberately intended and recoverable."],
        ["sudo chsh -s /bin/rbash limiteduser", "Combined meaning: as administrator, change limiteduser's login shell to /bin/rbash."]
      ],
      expected: "If used later with a real account and valid shell, the account's login shell changes.",
      fails: "If the user cannot log in afterward, recover through another admin account, root shell, or Arch ISO path and change the shell back to a normal valid shell."
    },
    {
      label: "Example restore command",
      sources: sourceRefs("chshMan", "usersGroups"),
      command: "sudo chsh -s /bin/bash limiteduser",
      purpose: "Example command to restore a limited account back to normal bash as its login shell.",
      words: [
        ["sudo", "Administrator privileges."],
        ["chsh", "Change shell."],
        ["-s", "Shell option."],
        ["/bin/bash", "Normal bash shell path example."],
        ["limiteduser", "Placeholder for the exact account being restored."],
        ["sudo chsh -s /bin/bash limiteduser", "Combined meaning: restore limiteduser's login shell to /bin/bash."]
      ],
      expected: "The target account uses /bin/bash for future logins after the change.",
      fails: "If /bin/bash is not valid on this system, inspect /etc/shells and choose the correct normal shell path."
    }
  ],
  terms: ["login shell", "restricted shell", "/etc/shells", "rbash", "sudo", "shell", "root"]
});

insertSectionAfter("Safety Hardening: Restricted Shell Plan", {
  title: "Safety Hardening: htop Monitoring",
  summary: "Use htop to observe process behavior, process trees, users, CPU, memory, and process-count clues.",
  sources: sourceRefs("htopPackage", "security"),
  blocks: [
    {
      type: "goal",
      title: "Goal",
      text: "Teach monitoring as observation first. htop helps identify what is running, who owns it, and whether CPU, memory, or process count looks abnormal."
    },
    {
      type: "explain",
      title: "What htop shows",
      text: "htop is an interactive process viewer. It shows process IDs, users, CPU use, memory use, command names, and live activity. It helps answer what is running right now."
    },
    {
      type: "explain",
      title: "Process tree mode",
      text: "Process tree mode groups child processes under parent processes. This matters because a runaway child process may have been started by a shell, service, browser, terminal, script, or desktop component."
    },
    {
      type: "explain",
      title: "User filtering",
      text: "User filtering narrows the view to one user account. This is safer than looking at everything when you are trying to understand your own session. Respect privacy and do not inspect other users without permission."
    },
    {
      type: "explain",
      title: "CPU, memory, and process-count clues",
      text: "High CPU can mean a process is constantly working. High memory can mean a process is storing too much data. Many repeated similar processes can indicate a fork loop or runaway launcher. These are clues, not proof by themselves."
    },
    {
      type: "warn",
      title: "Safe termination choices",
      text: "Do not kill processes blindly. Killing a process can destroy unsaved work, interrupt package operations, stop a desktop session, or hide the real cause. First identify the user, parent process, command, and whether the process belongs to important system work."
    }
  ],
  commands: [
    {
      label: "Install htop",
      sources: sourceRefs("htopPackage", "pacman"),
      command: "sudo pacman -S htop",
      purpose: "Installs the htop process viewer from Arch repositories.",
      words: [
        ["sudo", "Runs the command with administrator privileges."],
        ["pacman", "Arch package manager."],
        ["-S", "Install/sync package from repositories."],
        ["htop", "Package name for the interactive process viewer."]
      ],
      expected: "pacman asks for confirmation and installs htop.",
      fails: "If downloads fail, fix networking and DNS before installing monitoring tools."
    },
    {
      label: "Open htop",
      sources: sourceRefs("htopPackage"),
      command: "htop",
      purpose: "Starts the interactive htop process viewer.",
      words: [
        ["htop", "Interactive process viewer command."],
        ["h", "First letter of htop. Historically htop is a more interactive process viewer than top."],
        ["top", "Part of the name that hints it shows top/current process activity."],
        ["htop", "Combined meaning: open the htop process monitor."]
      ],
      expected: "A full-screen terminal interface appears with CPU/memory meters and a process list.",
      fails: "If htop is not found, install the htop package first."
    },
    {
      label: "Use htop tree mode",
      sources: sourceRefs("htopPackage"),
      command: "F5",
      purpose: "Toggles tree view inside htop so parent and child processes are shown together.",
      words: [
        ["F5", "Function key 5. In htop, it toggles tree mode on many default key layouts."],
        ["F", "Function-key label prefix on the keyboard."],
        ["5", "The number five key in the function-key row."],
        ["tree mode", "View that shows parent/child process relationships."]
      ],
      expected: "Processes become visually nested under parent processes.",
      fails: "If F5 does not work in the terminal, use htop's on-screen help or menu keys for tree view."
    },
    {
      label: "Filter htop to one user",
      sources: sourceRefs("htopPackage"),
      command: "u",
      purpose: "Opens the user filter in htop so the view can focus on one account.",
      words: [
        ["u", "Lowercase letter u. In htop, this commonly opens user selection/filtering."],
        ["user filter", "A view control that shows processes for the selected user."],
        ["u", "In this context, u points to user, not the ulimit -u process-count option."]
      ],
      expected: "htop lets the user choose an account and then shows processes for that account.",
      fails: "If the key binding differs, use htop help. Do not inspect another user's processes unless you own/administer the system with permission."
    },
    {
      label: "Read htop columns before acting",
      sources: sourceRefs("htopPackage"),
      command: "PID USER CPU% MEM% COMMAND",
      purpose: "Names the important htop columns to inspect before deciding whether a process is suspicious.",
      words: [
        ["PID", "Process ID. Unique number for one running process."],
        ["USER", "Account that owns the process."],
        ["CPU%", "Approximate CPU use percentage."],
        ["MEM%", "Approximate memory use percentage."],
        ["COMMAND", "Command or program name associated with the process."],
        ["%", "Percent sign. It means the number is a percentage, not a raw count."]
      ],
      expected: "The user can identify owner, process identity, CPU use, memory use, and command name before any termination choice.",
      fails: "If columns are hidden or confusing, do not act yet. Adjust htop columns or use another inspection command later."
    },
    {
      label: "Exit htop safely",
      sources: sourceRefs("htopPackage"),
      command: "q",
      purpose: "Quits htop without killing a process.",
      words: [
        ["q", "Lowercase q. In many terminal programs, q means quit."],
        ["quit", "Exit the viewer and return to the shell prompt."],
        ["q", "This key closes htop; it does not terminate selected processes."]
      ],
      expected: "htop closes and the terminal prompt returns.",
      fails: "If q does not exit, use the on-screen help or close the terminal only if no important command is running there."
    }
  ],
  terms: ["htop", "PID", "PPID", "process tree", "process", "CPUQuota", "MemoryMax"]
});

insertSectionAfter("Safety Hardening: htop Monitoring", {
  title: "Safety Hardening: Process Explosion Detection",
  summary: "Detect runaway process creation with counts, user filtering, and process trees before any kill decision.",
  sources: sourceRefs("security"),
  blocks: [
    {
      type: "goal",
      title: "Goal",
      text: "Teach detection before response. The user should first identify symptoms, count processes, identify the account involved, and inspect the process tree."
    },
    {
      type: "explain",
      title: "Symptoms of runaway process creation",
      text: "Symptoms can include a suddenly slow desktop, fans spinning hard, terminal commands taking a long time, many repeated process names, memory pressure, high CPU use, or inability to start new programs."
    },
    {
      type: "explain",
      title: "Why process counts matter",
      text: "A process explosion means many processes are being created. Counting processes gives a safer first clue than guessing from one busy process. A high count alone is not proof, but a rapidly rising count is a serious warning."
    },
    {
      type: "explain",
      title: "Identify user and parent before action",
      text: "Before terminating anything, identify the user account, process name, PID, PPID, and parent process tree. This helps avoid killing unrelated work, a package manager, a desktop component, or someone else's session."
    },
    {
      type: "warn",
      title: "Do not kill blindly",
      text: "Killing processes can destroy unsaved work and hide the root cause. Containment is not the cure. The real cure is prevention: limits, safer scripts, fixed service configs, removing unsafe triggers, or correcting the command that caused the explosion."
    }
  ],
  commands: [
    {
      label: "Count all visible processes",
      sources: sourceRefs("security"),
      command: "ps -e --no-headers | wc -l",
      purpose: "Counts visible processes by listing processes, removing the header line, and counting output lines.",
      words: [
        ["ps", "Process status command. It prints process information."],
        ["space after ps", "Separates the command from its options."],
        ["-e", "Show every process visible to this command. Dash starts the option; e means every/all processes in this context."],
        ["space after -e", "Separates one option from the next option."],
        ["--no-headers", "Do not print the header row. Two dashes mark a long option; no-headers means omit column headings."],
        ["|", "Pipe character. It sends output from the command on the left into the command on the right."],
        ["wc", "Word count command."],
        ["-l", "Count lines. Dash starts the option; l means lines."],
        ["ps -e --no-headers | wc -l", "Combined meaning: list processes without a header, then count how many process lines were printed."]
      ],
      expected: "A single number prints. Run it more than once if you are checking whether the count is rising quickly.",
      fails: "If the number is high, do not assume the cause yet. Continue by identifying users and process trees."
    },
    {
      label: "Count one user's processes",
      sources: sourceRefs("security"),
      command: "ps -u USERNAME --no-headers | wc -l",
      purpose: "Counts visible processes owned by one user. Replace USERNAME with the exact account name.",
      words: [
        ["ps", "Process status command."],
        ["-u", "Select processes by user. Dash starts the option; u means user in this command."],
        ["USERNAME", "Placeholder. Replace with the exact user account name, such as the normal username from Device Mapping."],
        ["--no-headers", "Omit the header row."],
        ["|", "Pipe output into the next command."],
        ["wc -l", "Count output lines."],
        ["ps -u USERNAME --no-headers | wc -l", "Combined meaning: count processes owned by USERNAME."]
      ],
      expected: "A single number prints for that user's process count.",
      fails: "If USERNAME is wrong, the count may be zero or misleading. Verify the account name before acting."
    },
    {
      label: "List processes with parent IDs",
      sources: sourceRefs("security"),
      command: "ps -eo pid,ppid,user,comm --sort=ppid",
      purpose: "Shows process IDs, parent process IDs, users, and command names sorted by parent process ID.",
      words: [
        ["ps", "Process status command."],
        ["-eo", "Options combined. Dash starts options. e means every process. o means choose output columns."],
        ["pid,ppid,user,comm", "Comma-separated column list. pid is process ID. ppid is parent process ID. user is owner. comm is command name."],
        ["--sort=ppid", "Long option sorting output by parent process ID. Equals sign connects sort to ppid."],
        ["=", "Equals sign. It assigns the sort key value to the --sort option."]
      ],
      expected: "A table appears with PID, PPID, USER, and COMMAND-style data. Similar PPID values can reveal groups of child processes from the same parent.",
      fails: "If the list is too long, use htop tree mode or filter by user before deciding what matters."
    },
    {
      label: "Show a process tree",
      sources: sourceRefs("security"),
      command: "pstree -ap",
      purpose: "Shows processes as a tree with command arguments and process IDs.",
      words: [
        ["pstree", "Prints processes as a tree."],
        ["space after pstree", "Separates the command from its options."],
        ["-ap", "Combined short options. Dash starts options. a shows arguments. p shows process IDs."],
        ["a", "Option letter for arguments."],
        ["p", "Option letter for process IDs."],
        ["pstree -ap", "Combined meaning: show process parent/child relationships with arguments and PIDs."]
      ],
      expected: "A tree appears. Look for one parent with many repeated child processes or a script/service spawning many copies.",
      fails: "If pstree is not installed, use htop tree mode or ps parent-ID output instead."
    }
  ],
  terms: ["runaway process", "process", "fork", "PID", "PPID", "process tree", "pstree", "wc"]
});

insertSectionAfter("Safety Hardening: Process Explosion Detection", {
  title: "Safety Hardening: Alert Planning",
  summary: "Plan process-count and fork-rate alerts without requiring Prometheus in the base install.",
  sources: sourceRefs("security"),
  blocks: [
    {
      type: "goal",
      title: "Goal",
      text: "Teach alert concepts before choosing a monitoring stack. This page does not require Prometheus. It explains the ideas a future Prometheus-style alert would use."
    },
    {
      type: "explain",
      title: "What an alert is",
      text: "An alert is a notification that a measured condition crossed a threshold. An alert does not fix the problem. It tells the user to look."
    },
    {
      type: "explain",
      title: "Metric, threshold, and time window",
      text: "A metric is the value being measured. A threshold is the line that triggers attention. A time window says how long the condition must be true before warning. These three pieces prevent noisy alerts."
    },
    {
      type: "explain",
      title: "Process-count alert idea",
      text: "A process-count alert watches how many processes exist for the system or for one user. Example idea: warn if a normal desktop user has more than 500 processes for several minutes. The number must be adjusted for the real machine."
    },
    {
      type: "explain",
      title: "Fork-rate alert idea",
      text: "A fork-rate alert watches how quickly new processes are being created. This can catch a process explosion earlier than a simple total count, because the total may be rising fast even before the system is unusable."
    },
    {
      type: "warn",
      title: "Alerts are detection, not prevention",
      text: "Alerts are Layer 2 detection. They are not the cure. Prevention still comes from limits, least privilege, safe scripts, fixed service configs, and removing unsafe triggers."
    },
    {
      type: "warn",
      title: "Test alerts before trusting them",
      text: "An untested alert is just a guess. Test that it fires when expected, stays quiet during normal work, and explains what the user should check next."
    }
  ],
  commands: [
    {
      label: "Process-count alert idea",
      sources: sourceRefs("security"),
      command: "process_count_for_user > 500 for 5 minutes",
      purpose: "Plain-language alert idea: warn when one user's process count stays above a chosen threshold long enough to matter.",
      words: [
        ["process_count_for_user", "Placeholder metric name. It means the number of processes owned by one user."],
        ["_", "Underscore character. It joins words inside this placeholder metric name."],
        [">", "Greater-than sign. It means the value on the left is larger than the value on the right."],
        ["500", "Example threshold. It means five hundred processes. This must be tuned for the real system."],
        ["for", "Duration word. It means the condition must stay true for a period of time."],
        ["5 minutes", "Example time window. It reduces alerts from brief harmless spikes."],
        ["process_count_for_user > 500 for 5 minutes", "Combined meaning: alert only if the user's process count stays above 500 for five minutes."]
      ],
      expected: "The user understands this is an alert design idea, not a shell command.",
      fails: "If treated as a terminal command, it will fail. It belongs in future monitoring design, not the shell."
    },
    {
      label: "Fork-rate alert idea",
      sources: sourceRefs("security"),
      command: "new_processes_per_minute > 120 for 2 minutes",
      purpose: "Plain-language alert idea: warn when new processes are being created unusually quickly.",
      words: [
        ["new_processes_per_minute", "Placeholder metric name. It means how many new processes appear each minute."],
        ["per", "Means for each. Here it describes a rate per minute."],
        ["minute", "Time unit used for the rate."],
        [">", "Greater-than sign."],
        ["120", "Example threshold. It means one hundred twenty new processes per minute."],
        ["for 2 minutes", "Example duration. The condition must continue for two minutes before warning."],
        ["new_processes_per_minute > 120 for 2 minutes", "Combined meaning: alert if process creation remains very fast for two minutes."]
      ],
      expected: "The user understands fork-rate alerts detect rapid process creation and need real baseline testing.",
      fails: "If the threshold is too low, normal app launches may trigger false positives. If too high, the alert may fire too late."
    },
    {
      label: "Alert test checklist",
      sources: sourceRefs("security"),
      command: "normal baseline, trigger condition, alert fires, alert quiets, action note",
      purpose: "Lists the minimum test sequence for any future alert rule.",
      words: [
        ["normal baseline", "Measure normal process counts and rates during ordinary use."],
        [",", "Comma separates checklist items. It is not a shell character here."],
        ["trigger condition", "Create or simulate the condition the alert should detect in a controlled way."],
        ["alert fires", "Confirm the alert actually appears."],
        ["alert quiets", "Confirm the alert stops after the condition is gone."],
        ["action note", "The alert should tell the user what to inspect next, such as htop tree mode or process-count commands."]
      ],
      expected: "The user treats alert testing as part of the setup, not an optional afterthought.",
      fails: "If an alert cannot be tested safely, it should not be trusted as a serious protection."
    }
  ],
  terms: ["alert", "metric", "threshold", "fork rate", "false positive", "process", "nproc"]
});

insertSectionAfter("Safety Hardening: Alert Planning", {
  title: "Safety Hardening: Safe Kill Guidance",
  summary: "Contain runaway processes carefully with signal escalation and parent/child awareness.",
  sources: sourceRefs("security"),
  blocks: [
    {
      type: "goal",
      title: "Goal",
      text: "Teach process termination as a last-resort containment step. The user should inspect first, save work if possible, and understand what will be affected before sending a signal."
    },
    {
      type: "explain",
      title: "Killing is containment",
      text: "Killing a process may stop the immediate resource problem, but it does not explain why the process existed. The real fix is prevention, limits, corrected scripts, corrected service configs, or removing the unsafe trigger."
    },
    {
      type: "explain",
      title: "Signal escalation",
      text: "Signal escalation means starting with the least destructive stop request and escalating only if needed. SIGTERM asks a process to exit cleanly. SIGKILL forces it to stop and gives it no cleanup chance."
    },
    {
      type: "explain",
      title: "Parent versus child processes",
      text: "A child process may be only one symptom. A parent process may keep creating new children. If you kill only children, they may reappear. If you kill the parent, you may stop the source, but you may also close a terminal, service, browser, or desktop component."
    },
    {
      type: "explain",
      title: "User-scoped termination",
      text: "User-scoped termination means targeting processes owned by one account instead of the whole system. It is safer than broad matching, but it can still destroy that user's unsaved work."
    },
    {
      type: "warn",
      title: "Unsaved work warning",
      text: "Killing processes can destroy unsaved documents, interrupt updates, corrupt temporary work, or close the graphical session. Do not kill processes you do not understand unless the system is already in an emergency state and you accept the risk."
    }
  ],
  commands: [
    {
      label: "Ask one process to stop cleanly",
      sources: sourceRefs("security"),
      command: "kill -TERM PID",
      purpose: "Sends SIGTERM to one exact process ID. This asks the process to exit cleanly.",
      words: [
        ["kill", "Command that sends a signal to a process."],
        ["space after kill", "Separates the command from the signal option."],
        ["-TERM", "Signal option. Dash starts the option. TERM means terminate cleanly."],
        ["TERM", "Short name for SIGTERM."],
        ["space after -TERM", "Separates the signal from the target process ID."],
        ["PID", "Placeholder for the exact process ID number. Replace it with the real PID only after inspection."],
        ["kill -TERM PID", "Combined meaning: ask exactly one process to terminate cleanly."]
      ],
      expected: "If the process cooperates, it exits. Recheck with htop, ps, or pstree.",
      fails: "If the process ignores SIGTERM or immediately reappears, inspect the parent process before escalating."
    },
    {
      label: "Force one process to stop",
      sources: sourceRefs("security"),
      command: "kill -KILL PID",
      purpose: "Sends SIGKILL to one exact process ID. This forces the process to stop without cleanup.",
      words: [
        ["kill", "Command that sends a signal."],
        ["-KILL", "Signal option for SIGKILL. Dash starts the option. KILL means force stop."],
        ["KILL", "Short name for SIGKILL."],
        ["PID", "Exact process ID placeholder."],
        ["kill -KILL PID", "Combined meaning: force exactly one process to stop immediately."]
      ],
      expected: "The process disappears unless it is already gone, unkillable kernel work, or immediately respawned by a parent/service.",
      fails: "Use this only after SIGTERM fails or when the system is in emergency containment. Unsaved work in that process is likely lost."
    },
    {
      label: "Ask matching user processes to stop carefully",
      sources: sourceRefs("security"),
      command: "pkill -TERM -u USERNAME COMMAND",
      purpose: "Example pattern for asking matching processes owned by one user to stop. This can affect multiple processes.",
      words: [
        ["pkill", "Process-kill-by-match command. It can target more than one process."],
        ["-TERM", "Ask matched processes to terminate cleanly."],
        ["-u", "Match by user. Dash starts the option; u means user here."],
        ["USERNAME", "Placeholder for the exact account name."],
        ["COMMAND", "Placeholder for the process command name to match."],
        ["pkill -TERM -u USERNAME COMMAND", "Combined meaning: ask processes named COMMAND and owned by USERNAME to stop cleanly."]
      ],
      expected: "Matched processes receive SIGTERM. Only use after verifying USERNAME and COMMAND are specific enough.",
      fails: "If COMMAND is too broad, this can stop unrelated work. Prefer exact PID termination when unsure."
    },
    {
      label: "Recheck after containment",
      sources: sourceRefs("security"),
      command: "ps -u USERNAME --no-headers | wc -l",
      purpose: "Counts one user's processes again after containment to see whether process count dropped or keeps rising.",
      words: [
        ["ps", "Process status command."],
        ["-u", "Select by user."],
        ["USERNAME", "Exact user placeholder."],
        ["--no-headers", "Remove header row."],
        ["|", "Pipe output to the next command."],
        ["wc -l", "Count lines."],
        ["ps -u USERNAME --no-headers | wc -l", "Combined meaning: count USERNAME's process lines after attempted containment."]
      ],
      expected: "The count should stop rising or drop if containment worked.",
      fails: "If the count rises again, the parent, service, shell, script, or trigger still needs root-cause analysis."
    }
  ],
  terms: ["signal", "SIGTERM", "SIGKILL", "pkill", "PID", "PPID", "process tree", "runaway process"]
});

insertSectionAfter("Safety Hardening: Safe Kill Guidance", {
  title: "Safety Hardening: Parent Process And Root Cause",
  summary: "Trace PPID, process trees, sessions, services, shells, and configs to find what started runaway behavior.",
  sources: sourceRefs("security", "systemctlMan"),
  blocks: [
    {
      type: "goal",
      title: "Goal",
      text: "Move from containment to cause analysis. The user should identify what started the process explosion before changing limits, killing more processes, or editing service configs."
    },
    {
      type: "explain",
      title: "What PPID means",
      text: "PPID means parent process ID. A process has a PID, and many processes also have a PPID pointing to the process that started them. If many children share one PPID, that parent may be the launcher."
    },
    {
      type: "explain",
      title: "Process trees show relationships",
      text: "A process tree shows parent and child processes visually. This is often clearer than a flat list because it shows whether a shell, service, terminal, browser, or script is creating repeated child processes."
    },
    {
      type: "explain",
      title: "Sessions, services, and shells",
      text: "A session is a user's login or desktop context. A service is a background unit managed by systemd. A shell is a command interpreter. A runaway process may come from any of these, so the source matters before deciding on a fix."
    },
    {
      type: "explain",
      title: "Evidence to write down",
      text: "Write down the process name, PID, PPID, user, parent command, whether it is in a service or user session, and what action happened right before the issue started. This keeps troubleshooting factual."
    },
    {
      type: "warn",
      title: "Do not confuse symptom with cause",
      text: "A high process count is a symptom. Killing children may reduce the symptom temporarily. The cause may be a service restart loop, shell script, browser extension, scheduled job, bad command, or misconfigured limit."
    }
  ],
  commands: [
    {
      label: "Inspect one process by PID",
      sources: sourceRefs("security"),
      command: "ps -o pid,ppid,user,stat,comm,args -p PID",
      purpose: "Shows detailed information for one exact process ID, including its parent process ID and command arguments.",
      words: [
        ["ps", "Process status command."],
        ["-o", "Choose output columns. Dash starts the option; o means output format."],
        ["pid,ppid,user,stat,comm,args", "Comma-separated column list: process ID, parent process ID, user, state, command name, and arguments."],
        ["-p", "Select one process by PID. Dash starts the option; p means process ID."],
        ["PID", "Placeholder for the exact process ID number being investigated."],
        ["ps -o pid,ppid,user,stat,comm,args -p PID", "Combined meaning: show detailed selected columns for one process."]
      ],
      expected: "One row appears for that PID if it still exists. PPID shows the parent process ID.",
      fails: "If no row appears, the process may have exited. Use htop, ps, or logs to inspect the current parent/source."
    },
    {
      label: "Inspect the parent process",
      sources: sourceRefs("security"),
      command: "ps -o pid,ppid,user,stat,comm,args -p PPID",
      purpose: "Shows details for the parent process ID discovered from the child process.",
      words: [
        ["ps", "Process status command."],
        ["-o", "Choose columns."],
        ["pid", "Process ID column."],
        ["ppid", "Parent process ID column."],
        ["user", "Owner account column."],
        ["stat", "Process state column."],
        ["comm", "Command name column."],
        ["args", "Command arguments column."],
        ["-p PPID", "Select the parent process ID. PPID is a placeholder and must be replaced with the actual number."]
      ],
      expected: "The parent row helps reveal whether a shell, service, terminal, browser, script, or launcher started the child.",
      fails: "If the parent is gone, the child may be orphaned or adopted by another process. Use pstree and logs for more context."
    },
    {
      label: "Show user-level process tree",
      sources: sourceRefs("security"),
      command: "pstree -apu USERNAME",
      purpose: "Shows a process tree focused on one user, including arguments and process IDs.",
      words: [
        ["pstree", "Print processes as a tree."],
        ["-apu", "Combined options. Dash starts options. a shows arguments. p shows PIDs. u shows user changes or user information depending on output context."],
        ["USERNAME", "Placeholder for the exact user account being investigated."],
        ["pstree -apu USERNAME", "Combined meaning: show USERNAME's process tree with useful identifying details."]
      ],
      expected: "A tree appears for the user. Look for repeated branches, scripts, shells, or services creating many children.",
      fails: "If USERNAME is wrong or pstree is unavailable, use htop tree mode or ps commands instead."
    },
    {
      label: "Check whether a service is involved",
      sources: sourceRefs("systemctlMan", "security"),
      command: "systemctl status SERVICE",
      purpose: "Checks a named systemd service that may be starting or restarting the runaway process.",
      words: [
        ["systemctl", "Tool for controlling and inspecting systemd."],
        ["status", "Show service state and recent logs."],
        ["SERVICE", "Placeholder for the exact service name, such as a .service unit."],
        ["systemctl status SERVICE", "Combined meaning: show status and recent log context for SERVICE."]
      ],
      expected: "Status output shows whether the service is active, failed, restarting, or producing logs.",
      fails: "If the service name is wrong, systemctl reports it cannot find the unit. Verify the service name before changing anything."
    },
    {
      label: "Read recent logs for a suspected service",
      sources: sourceRefs("systemctlMan", "security"),
      command: "journalctl -u SERVICE -n 50",
      purpose: "Shows the last 50 journal log lines for a suspected systemd service.",
      words: [
        ["journalctl", "Reads systemd journal logs."],
        ["-u", "Filter logs by unit. Dash starts the option; u means unit."],
        ["SERVICE", "Placeholder for the exact service unit name."],
        ["-n 50", "Show the newest 50 lines. Dash starts the option; n means number of lines; 50 is the count."],
        ["journalctl -u SERVICE -n 50", "Combined meaning: show the latest 50 log lines for SERVICE."]
      ],
      expected: "Recent log lines may show restart loops, errors, commands, scripts, or configuration paths.",
      fails: "If logs are empty or unrelated, the runaway process may come from a user session, shell, cron-like job, browser, or another launcher."
    }
  ],
  terms: ["root cause", "PPID", "process tree", "session", "service", "shell", "journalctl", "runaway process"]
});

insertSectionAfter("Safety Hardening: Parent Process And Root Cause", {
  title: "Safety Hardening: Post-Incident Checklist",
  summary: "After containment, review limits, logs, shell access, service configs, package source, and whether the trigger should be removed or rewritten.",
  sources: sourceRefs("security", "systemctlMan", "pacman", "limitsConfMan", "shellsMan"),
  blocks: [
    {
      type: "goal",
      title: "Goal",
      text: "Turn a scary incident into a concrete repair checklist. The user should not stop at killing processes. They should find what allowed the incident and decide what must change."
    },
    {
      type: "explain",
      title: "Review limits",
      text: "Review temporary ulimit settings, PAM limits, and cgroup/systemd limits. Ask whether prevention failed because no limit existed, the limit was too high, or the limit did not apply to the session where the problem happened."
    },
    {
      type: "explain",
      title: "Review logs",
      text: "Logs can show restart loops, failed commands, service errors, repeated launches, or configuration paths. Logs are evidence. They should be read before editing random files."
    },
    {
      type: "explain",
      title: "Review shell access",
      text: "If the issue involved a user account or shell script, review login shell choices, restricted shell choices, and whether the account should have broad shell access at all. Do not lock out the administrator account while fixing this."
    },
    {
      type: "explain",
      title: "Review service configs",
      text: "A systemd service may restart a failing command repeatedly. Review the service file and drop-ins to see ExecStart, Restart, user, environment, and resource-control settings."
    },
    {
      type: "explain",
      title: "Review package source",
      text: "Find whether the command came from an official package, an AUR package, a manual download, a copied script, or a file the user wrote. The fix depends on where the unsafe behavior came from."
    },
    {
      type: "warn",
      title: "Remove or rewrite unsafe triggers",
      text: "If a command, service, script, extension, or config can recreate the incident, it should be disabled, removed, rewritten, or limited before the system is trusted again."
    }
  ],
  commands: [
    {
      label: "Review active nproc policy text",
      sources: sourceRefs("limitsConfMan"),
      command: "grep -n \"nproc\" /etc/security/limits.conf",
      purpose: "Checks whether PAM limits.conf contains process-count limit lines.",
      words: [
        ["grep", "Search text for matching lines."],
        ["-n", "Show line numbers. Dash starts the option; n means number/line number here."],
        ["\"nproc\"", "Quoted search text. The quotes group nproc as the exact text to search for."],
        ["/etc/security/limits.conf", "PAM limits configuration file being inspected."],
        ["grep -n \"nproc\" /etc/security/limits.conf", "Combined meaning: show line-numbered nproc rules in the PAM limits file."]
      ],
      expected: "Any nproc lines print with line numbers. Lines beginning with # are comments and are not active rules.",
      fails: "If nothing prints, no nproc text is present in that file. The system may still have other limits elsewhere."
    },
    {
      label: "Review a suspected service config",
      sources: sourceRefs("systemctlMan", "systemdUnitMan"),
      command: "systemctl cat SERVICE",
      purpose: "Prints the systemd unit file and drop-ins for a suspected service.",
      words: [
        ["systemctl", "Tool for inspecting and controlling systemd."],
        ["cat", "Show the unit file contents as systemd sees them."],
        ["SERVICE", "Placeholder for the exact service unit name."],
        ["systemctl cat SERVICE", "Combined meaning: print the service file and drop-in config for SERVICE."]
      ],
      expected: "The service configuration prints. Look for ExecStart, Restart, User, Environment, resource limits, and drop-in file paths.",
      fails: "If SERVICE is not found, verify the unit name with systemctl status or the process tree before editing anything."
    },
    {
      label: "Review recent service logs",
      sources: sourceRefs("systemctlMan"),
      command: "journalctl -u SERVICE -n 100",
      purpose: "Shows the last 100 log lines for a suspected service.",
      words: [
        ["journalctl", "Reads systemd journal logs."],
        ["-u", "Filter by unit. Dash starts the option; u means unit."],
        ["SERVICE", "Placeholder for the exact service unit name."],
        ["-n 100", "Show newest 100 lines. n means number of lines; 100 is the count."],
        ["journalctl -u SERVICE -n 100", "Combined meaning: show the latest 100 log lines for SERVICE."]
      ],
      expected: "Recent logs show service starts, stops, errors, restart loops, or useful context.",
      fails: "If logs are unrelated, the cause may be in a user shell/session, script, browser, or manually run command."
    },
    {
      label: "Find which package owns a command path",
      sources: sourceRefs("pacman"),
      command: "pacman -Qo /path/to/command",
      purpose: "Checks whether a file path belongs to an installed Arch package.",
      words: [
        ["pacman", "Arch package manager."],
        ["-Q", "Query installed package database. Dash starts the option; Q means query."],
        ["o", "Owner query option when combined as -Qo. It asks which package owns a file."],
        ["-Qo", "Combined option meaning query owner of a file."],
        ["/path/to/command", "Placeholder path. Replace with the exact command/script path found during investigation."],
        ["pacman -Qo /path/to/command", "Combined meaning: ask pacman which installed package owns this path."]
      ],
      expected: "pacman prints the owning package if the file belongs to an installed package.",
      fails: "If no package owns the file, it may be manually installed, generated, copied, from another package manager, or in a user directory."
    },
    {
      label: "Review valid login shells",
      sources: sourceRefs("shellsMan"),
      command: "cat /etc/shells",
      purpose: "Reviews valid login shells after an incident involving account restrictions or shell access.",
      words: [
        ["cat", "Print file contents."],
        ["/etc/shells", "File listing valid login shells."],
        ["cat /etc/shells", "Combined meaning: print the valid login shell list."]
      ],
      expected: "Known shell paths print. Use this to verify normal and restricted shell paths before changing accounts.",
      fails: "If a shell path is missing, do not set it as a login shell until the shell configuration is corrected."
    },
    {
      label: "Final decision checklist",
      sources: sourceRefs("security"),
      command: "keep, limit, disable, remove, or rewrite",
      purpose: "Names the final decision categories after investigation.",
      words: [
        ["keep", "Leave the command/config as-is only if it is understood and safe."],
        [",", "Comma separates choices in this checklist. It is not a shell command here."],
        ["limit", "Keep it but add resource, permission, or firewall limits."],
        ["disable", "Stop it from starting automatically while preserving the file/config for review."],
        ["remove", "Delete or uninstall the unsafe trigger when it is not needed."],
        ["rewrite", "Change the script/command/config so it cannot repeat the incident."],
        ["keep, limit, disable, remove, or rewrite", "Combined meaning: choose a clear repair action instead of pretending the incident is solved just because processes stopped."]
      ],
      expected: "The user chooses one explicit next action based on evidence.",
      fails: "If the cause is unknown, do not call the system fixed. Keep prevention limits and continue investigation."
    }
  ],
  terms: ["root cause", "limits.conf", "journalctl", "service config", "package source", "login shell", "restricted shell"]
});

const lessonList = document.querySelector("#lesson-list");
const sectionNav = document.querySelector("#section-nav");
const search = document.querySelector("#search");
const progressLabel = document.querySelector("#progress-label");
const progressBar = document.querySelector("#progress-bar");
const profileForm = document.querySelector("#profile-form");
const profileSummary = document.querySelector("#profile-summary");
const deviceForm = document.querySelector("#device-form");
const deviceSummary = document.querySelector("#device-summary");
const discoveryGuide = document.querySelector("#discovery-guide");
const wizardStage = document.querySelector("#wizard-stage");
const wizardCounter = document.querySelector("#wizard-counter");
const wizardPrev = document.querySelector("#wizard-prev");
const wizardNext = document.querySelector("#wizard-next");
const wizardUnderstand = document.querySelector("#wizard-understand");
const glossaryPanel = document.querySelector("#glossary-panel");
const dialog = document.querySelector("#term-dialog");
const closeDialog = document.querySelector("#close-dialog");
const termTitle = document.querySelector("#term-title");
const termBody = document.querySelector("#term-body");

const completed = new Set(JSON.parse(localStorage.getItem("completedLessons") || "[]"));
let setupProfile = JSON.parse(localStorage.getItem("setupProfile") || "{}");
let deviceMap = JSON.parse(localStorage.getItem("deviceMap") || "{}");
let safetyGates = JSON.parse(localStorage.getItem("safetyGates") || "{}");
let wizardIndex = Number(localStorage.getItem("wizardIndex") || "0");

const deviceFields = [
  {
    key: "currentOsDisk",
    label: "Current OS disk",
    placeholder: "/dev/nvme0n1",
    help: "The whole disk that currently holds the operating system, if one exists. Whole disks look like /dev/nvme0n1 or /dev/sda, not /dev/sda1."
  },
  {
    key: "targetDisk",
    label: "Target install disk",
    placeholder: "/dev/sdb",
    help: "The whole disk Arch will be installed onto. This is the most dangerous value. Formatting or partitioning the wrong target disk can erase the wrong data."
  },
  {
    key: "externalSsd",
    label: "External SSD / USB drive",
    placeholder: "/dev/sdb",
    help: "The whole external drive, if Arch is going onto an external SSD or USB drive. External drive names can change between boots."
  },
  {
    key: "efiPartition",
    label: "EFI partition",
    placeholder: "/dev/sdb1",
    help: "The partition used for UEFI boot files. Partitions usually end in a number, like /dev/sda1 or /dev/nvme0n1p1."
  },
  {
    key: "rootPartition",
    label: "Root partition",
    placeholder: "/dev/sdb2",
    help: "The partition that will become /, the main installed Arch filesystem."
  },
  {
    key: "swapPartition",
    label: "Swap partition",
    placeholder: "/dev/sdb3",
    help: "Optional partition for swap. Leave unknown or blank if you are not using a swap partition."
  },
  {
    key: "wifiDevice",
    label: "Wi-Fi device",
    placeholder: "wlan0",
    help: "The wireless device name used by iwctl. It may be wlan0, wlp2s0, or another name discovered with device list."
  },
  {
    key: "wifiName",
    label: "Wi-Fi network name",
    placeholder: "Home Network",
    help: "The exact Wi-Fi name, also called SSID. If it contains spaces, the rendered command must keep quotes around it."
  },
  {
    key: "username",
    label: "Normal username",
    placeholder: "ethan",
    help: "The non-root account name for daily use. This value should be typed exactly the same everywhere."
  },
  {
    key: "hostname",
    label: "Computer hostname",
    placeholder: "archbox",
    help: "The machine name written to /etc/hostname. Use a simple name with letters, numbers, and hyphens."
  }
];

const profileLabels = {
  guideDevice: {
    phone: "phone",
    tablet: "tablet",
    "second-computer": "second computer",
    "same-computer": "same computer",
    printed: "printed copy"
  },
  machineType: {
    "generic-pc": "generic PC",
    laptop: "laptop",
    mac: "Mac",
    vm: "virtual machine",
    other: "other or unsure"
  },
  currentEnvironment: {
    "arch-iso": "booted into the Arch ISO",
    windows: "Windows",
    macos: "macOS",
    linux: "Linux",
    unknown: "unknown"
  },
  installTarget: {
    "only-internal": "only internal SSD/disk",
    "second-internal": "separate second internal SSD/disk",
    external: "external SSD/USB drive",
    "same-existing": "same disk as an existing OS",
    "vm-disk": "virtual disk",
    unknown: "unknown"
  },
  eraseIntent: {
    yes: "target disk can be erased",
    "no-preserve": "existing data or OS must be preserved",
    unsure: "erase decision is unsure"
  },
  internalDriveCount: {
    one: "one internal drive",
    two: "two internal drives",
    "three-plus": "three or more internal drives",
    unknown: "unknown internal drive count"
  },
  externalDrive: {
    yes: "external drive connected",
    no: "no external drive connected",
    unknown: "external drive status unknown"
  },
  bootMode: {
    uefi: "UEFI",
    bios: "legacy BIOS",
    unknown: "boot mode unknown"
  },
  networkPath: {
    ethernet: "Ethernet",
    wifi: "Wi-Fi",
    unknown: "network path unknown"
  }
};

function blockClass(type) {
  if (type === "warn") return "block warning";
  if (type === "checkpoint") return "block checkpoint";
  return "block";
}

function setupProfileCompleteEnough() {
  return Boolean(
    setupProfile.currentEnvironment &&
    setupProfile.installTarget &&
    setupProfile.eraseIntent &&
    setupProfile.bootMode &&
    setupProfile.networkPath
  );
}

function profileValue(field) {
  const value = setupProfile[field];
  return profileLabels[field]?.[value] || "not answered";
}

function syncProfileForm() {
  if (!profileForm) return;
  for (const element of profileForm.elements) {
    if (!element.name) continue;
    element.value = setupProfile[element.name] || "";
  }
}

function getDeviceValue(key) {
  return deviceMap[key]?.value || "";
}

function getDeviceUnknown(key) {
  return Boolean(deviceMap[key]?.unknown);
}

function looksLikeWholeDisk(value) {
  return /^\/dev\/(sd[a-z]|vd[a-z]|xvd[a-z]|nvme\d+n\d+|mmcblk\d+)$/.test(value.trim());
}

function looksLikePartition(value) {
  return /^\/dev\/(sd[a-z]\d+|vd[a-z]\d+|xvd[a-z]\d+|nvme\d+n\d+p\d+|mmcblk\d+p\d+)$/.test(value.trim());
}

function diskIdentitySignature() {
  return JSON.stringify({
    targetDisk: getDeviceValue("targetDisk"),
    efiPartition: getDeviceValue("efiPartition"),
    rootPartition: getDeviceValue("rootPartition"),
    swapPartition: getDeviceValue("swapPartition"),
    eraseIntent: setupProfile.eraseIntent,
    installTarget: setupProfile.installTarget
  });
}

function diskIdentityGateIssues() {
  const issues = [];
  if (!setupProfileCompleteEnough()) {
    issues.push("Complete the safety profile first.");
  }
  if (setupProfile.eraseIntent !== "yes") {
    issues.push("Disk-writing commands stay blocked unless the profile says the target disk can be erased. Preserve/unsure paths need a later, more specific preservation gate.");
  }
  if (getDeviceUnknown("targetDisk") || !getDeviceValue("targetDisk")) {
    issues.push("Target install disk is unknown.");
  } else if (!looksLikeWholeDisk(getDeviceValue("targetDisk"))) {
    issues.push("Target install disk must be a whole disk such as /dev/sda or /dev/nvme0n1.");
  }
  for (const key of ["efiPartition", "rootPartition"]) {
    const field = deviceFields.find((item) => item.key === key);
    if (getDeviceUnknown(key) || !getDeviceValue(key)) {
      issues.push(`${field.label} is unknown.`);
    } else if (!looksLikePartition(getDeviceValue(key))) {
      issues.push(`${field.label} must be a partition such as /dev/sda1 or /dev/nvme0n1p1.`);
    }
  }
  if (getDeviceValue("currentOsDisk") && getDeviceValue("targetDisk") && getDeviceValue("currentOsDisk") === getDeviceValue("targetDisk") && setupProfile.installTarget !== "same-existing") {
    issues.push("Current OS disk and target disk match, but the profile does not say this is a same-disk install.");
  }
  return issues;
}

function diskIdentityGatePassed() {
  return safetyGates.diskIdentityConfirmed === true && safetyGates.diskIdentitySignature === diskIdentitySignature() && diskIdentityGateIssues().length === 0;
}

function bootloaderModeSignature() {
  return JSON.stringify({
    bootMode: setupProfile.bootMode,
    efiPartition: getDeviceValue("efiPartition"),
    targetDisk: getDeviceValue("targetDisk")
  });
}

function bootloaderModeGateIssues() {
  const issues = [];
  if (!setupProfile.bootMode || setupProfile.bootMode === "unknown") {
    issues.push("Boot mode is unknown. Confirm UEFI versus legacy BIOS before bootloader install commands.");
  }
  if (setupProfile.bootMode === "uefi") {
    if (getDeviceUnknown("efiPartition") || !getDeviceValue("efiPartition")) {
      issues.push("UEFI bootloader commands need the EFI partition mapped.");
    } else if (!looksLikePartition(getDeviceValue("efiPartition"))) {
      issues.push("EFI partition must be a partition path such as /dev/sda1 or /dev/nvme0n1p1.");
    }
  }
  if (setupProfile.bootMode === "bios") {
    if (getDeviceUnknown("targetDisk") || !getDeviceValue("targetDisk")) {
      issues.push("Legacy BIOS GRUB install needs the target whole disk mapped.");
    } else if (!looksLikeWholeDisk(getDeviceValue("targetDisk"))) {
      issues.push("Target disk must be a whole disk path such as /dev/sda or /dev/nvme0n1.");
    }
  }
  return issues;
}

function bootloaderModeGatePassed() {
  return safetyGates.bootloaderModeConfirmed === true && safetyGates.bootloaderModeSignature === bootloaderModeSignature() && bootloaderModeGateIssues().length === 0;
}

function lockoutSafetySignature() {
  return JSON.stringify({
    username: getDeviceValue("username"),
    installTarget: setupProfile.installTarget,
    currentEnvironment: setupProfile.currentEnvironment
  });
}

function lockoutSafetyGateIssues() {
  const issues = [];
  if (!setupProfile.currentEnvironment) {
    issues.push("Current environment is not answered. Access-changing commands need clear context.");
  }
  if (getDeviceUnknown("username") || !getDeviceValue("username")) {
    issues.push("Normal username is unknown. User and sudo commands should use the exact intended username.");
  }
  return issues;
}

function lockoutSafetyGatePassed() {
  return safetyGates.lockoutSafetyConfirmed === true && safetyGates.lockoutSafetySignature === lockoutSafetySignature() && lockoutSafetyGateIssues().length === 0;
}

function securityPrivacySignature() {
  return JSON.stringify({
    currentEnvironment: setupProfile.currentEnvironment,
    username: getDeviceValue("username")
  });
}

function securityPrivacyGateIssues() {
  const issues = [];
  if (!setupProfile.currentEnvironment) {
    issues.push("Current environment is not answered. Security and monitoring actions need clear system context.");
  }
  return issues;
}

function securityPrivacyGatePassed() {
  return safetyGates.securityPrivacyConfirmed === true && safetyGates.securityPrivacySignature === securityPrivacySignature() && securityPrivacyGateIssues().length === 0;
}

function renderDeviceForm() {
  deviceForm.innerHTML = deviceFields.map((field) => {
    const value = getDeviceValue(field.key);
    const unknown = getDeviceUnknown(field.key);
    return `
      <section class="device-field">
        <label>
          <span class="device-field-title">${field.label}</span>
          <input type="text" name="${field.key}" value="${escapeHtml(value)}" placeholder="${escapeHtml(field.placeholder)}" ${unknown ? "disabled" : ""}>
        </label>
        <label class="unknown-row">
          <input type="checkbox" name="${field.key}__unknown" ${unknown ? "checked" : ""}>
          <span>I do not know this yet. Show me how to find it before I use commands that need it.</span>
        </label>
        <p class="device-field-help">${field.help}</p>
      </section>
    `;
  }).join("");
}

function deviceWarnings() {
  const warnings = [];
  const required = ["targetDisk", "efiPartition", "rootPartition"];
  for (const key of required) {
    const field = deviceFields.find((item) => item.key === key);
    if (getDeviceUnknown(key) || !getDeviceValue(key)) {
      warnings.push(`${field.label} is not known yet. Discovery must happen before final disk commands.`);
    }
  }

  for (const key of ["currentOsDisk", "targetDisk", "externalSsd"]) {
    const value = getDeviceValue(key);
    const field = deviceFields.find((item) => item.key === key);
    if (value && !looksLikeWholeDisk(value)) {
      warnings.push(`${field.label} should be a whole disk such as /dev/sda or /dev/nvme0n1. The value "${value}" does not look like a whole disk.`);
    }
  }

  for (const key of ["efiPartition", "rootPartition", "swapPartition"]) {
    const value = getDeviceValue(key);
    const field = deviceFields.find((item) => item.key === key);
    if (value && !looksLikePartition(value)) {
      warnings.push(`${field.label} should be a partition such as /dev/sda1 or /dev/nvme0n1p1. The value "${value}" does not look like a partition.`);
    }
  }

  if (getDeviceValue("currentOsDisk") && getDeviceValue("targetDisk") && getDeviceValue("currentOsDisk") === getDeviceValue("targetDisk")) {
    warnings.push("Current OS disk and target install disk are the same. This may be intentional, but it is high risk and requires erase-vs-preserve confirmation.");
  }

  if (getDeviceUnknown("wifiDevice") || !getDeviceValue("wifiDevice")) {
    warnings.push("Wi-Fi device is not known yet. The app cannot render the final iwctl station command verbatim.");
  }
  if (getDeviceUnknown("wifiName") || !getDeviceValue("wifiName")) {
    warnings.push("Wi-Fi network name is not known yet. The app cannot render the final Wi-Fi connect command verbatim.");
  }
  return warnings;
}

function renderWifiCommandPreview() {
  const wifiDevice = getDeviceValue("wifiDevice");
  const wifiName = getDeviceValue("wifiName");
  if (!wifiDevice || !wifiName || getDeviceUnknown("wifiDevice") || getDeviceUnknown("wifiName")) {
    return `
      <section class="profile-summary-card profile-danger">
        <h4>Wi-Fi command preview blocked</h4>
        <p>The final Wi-Fi command needs both a Wi-Fi device and a Wi-Fi network name. Until those are known, the app must not pretend the command is ready.</p>
      </section>
    `;
  }
  const rendered = `station ${wifiDevice} connect "${wifiName}"`;
  return `
    <section class="profile-summary-card profile-safe">
      <h4>Rendered Wi-Fi command</h4>
      <pre><code>${escapeHtml(rendered)}</code></pre>
      <p><code>station</code> tells iwctl to work with a Wi-Fi client device. <code>${escapeHtml(wifiDevice)}</code> is your Wi-Fi device. <code>connect</code> means join a network. <code>"${escapeHtml(wifiName)}"</code> is your exact Wi-Fi name. The quote characters keep the Wi-Fi name together, especially if it contains spaces.</p>
    </section>
  `;
}

function renderTargetDiskCommandPreview() {
  const targetDisk = getDeviceValue("targetDisk");
  if (!targetDisk || getDeviceUnknown("targetDisk")) {
    return `
      <section class="profile-summary-card profile-danger">
        <h4>Target disk command preview blocked</h4>
        <p>The app cannot personalize whole-disk examples until Target install disk is known. Keep examples like <code>/dev/sda</code> and <code>/dev/nvme0n1</code> as examples only, not values to copy.</p>
      </section>
    `;
  }
  if (!looksLikeWholeDisk(targetDisk)) {
    return `
      <section class="profile-summary-card profile-danger">
        <h4>Target disk command preview blocked</h4>
        <p><code>${escapeHtml(targetDisk)}</code> does not look like a whole disk. A whole disk looks like <code>/dev/sda</code>, <code>/dev/vda</code>, <code>/dev/nvme0n1</code>, or <code>/dev/mmcblk0</code>. Do not use a partition such as <code>/dev/sda1</code> where a whole disk is required.</p>
      </section>
    `;
  }
  return `
    <section class="profile-summary-card profile-safe">
      <h4>Rendered target disk examples</h4>
      <p>The app will now replace whole-disk examples such as <code>/dev/sda</code> and <code>/dev/nvme0n1</code> with your mapped target disk: <code>${escapeHtml(targetDisk)}</code>.</p>
      <pre><code>${escapeHtml(`cfdisk ${targetDisk}`)}</code></pre>
      <pre><code>${escapeHtml(`fdisk -l ${targetDisk}`)}</code></pre>
      <p><strong>Safety rule:</strong> this does not make disk-writing safe by itself. The Disk identity gate and Bootloader mode gate still decide whether destructive or bootloader commands can be copied.</p>
    </section>
  `;
}

function validMappedPartition(key) {
  const value = getDeviceValue(key);
  if (!value || getDeviceUnknown(key) || !looksLikePartition(value)) return null;
  return value;
}

function renderPartitionCommandPreview() {
  const efiPartition = validMappedPartition("efiPartition");
  const rootPartition = validMappedPartition("rootPartition");
  const swapPartition = validMappedPartition("swapPartition");
  const missing = [];
  if (!efiPartition) missing.push("EFI partition");
  if (!rootPartition) missing.push("Root partition");

  if (missing.length) {
    return `
      <section class="profile-summary-card profile-danger">
        <h4>Partition command preview blocked</h4>
        <p>The app cannot personalize partition examples until these required partition values are known and shaped like partition paths: ${missing.map(escapeHtml).join(", ")}. A partition looks like <code>/dev/sda1</code>, <code>/dev/nvme0n1p1</code>, or <code>/dev/mmcblk0p1</code>.</p>
      </section>
    `;
  }

  return `
    <section class="profile-summary-card profile-safe">
      <h4>Rendered partition examples</h4>
      <p>The app will now replace root and EFI partition examples with your mapped partitions. Swap commands are personalized only when a valid optional swap partition is entered.</p>
      <pre><code>${escapeHtml(`mkfs.fat -F 32 ${efiPartition}`)}</code></pre>
      <pre><code>${escapeHtml(`mkfs.ext4 ${rootPartition}`)}</code></pre>
      <pre><code>${escapeHtml(`mount ${rootPartition} /mnt`)}</code></pre>
      <pre><code>${escapeHtml(`mount ${efiPartition} /mnt/boot`)}</code></pre>
      ${swapPartition ? `<pre><code>${escapeHtml(`mkswap ${swapPartition}\nswapon ${swapPartition}`)}</code></pre>` : "<p><strong>Swap:</strong> no valid swap partition is mapped, so swap partition commands remain examples until a swap value is entered.</p>"}
      <p><strong>Safety rule:</strong> these are still storage-changing paths. Formatting commands can erase the filesystem on the named partition. The Disk identity gate must still pass before destructive commands are usable.</p>
    </section>
  `;
}

function renderDeviceSummary() {
  renderDeviceForm();
  const warnings = deviceWarnings();
  const knownRows = deviceFields.map((field) => {
    const value = getDeviceUnknown(field.key) ? "I do not know" : (getDeviceValue(field.key) || "blank");
    return `<li><strong>${field.label}:</strong> ${escapeHtml(value)}</li>`;
  }).join("");
  deviceSummary.innerHTML = `
    <section class="profile-summary-card ${warnings.length ? "profile-danger" : "profile-safe"}">
      <h4>Mapped values</h4>
      <ul>${knownRows}</ul>
    </section>
    <section class="profile-summary-card ${warnings.length ? "profile-danger" : "profile-safe"}">
      <h4>Mapping safety status</h4>
      ${warnings.length ? `<ul>${warnings.map((warning) => `<li>${escapeHtml(warning)}</li>`).join("")}</ul>` : "<p>Required values are filled in a plausible shape. Destructive commands still need a final safety gate and output verification before copying.</p>"}
    </section>
    ${renderWifiCommandPreview()}
    ${renderTargetDiskCommandPreview()}
    ${renderPartitionCommandPreview()}
  `;
  renderDiscoveryGuide();
}

function anyUnknownDeviceValues() {
  return deviceFields.some((field) => getDeviceUnknown(field.key));
}

function renderDiscoveryGuide() {
  if (!anyUnknownDeviceValues()) {
    discoveryGuide.innerHTML = "";
    return;
  }

  const showWindowsDiscovery = setupProfile.currentEnvironment === "windows" || setupProfile.currentEnvironment === "unknown" || !setupProfile.currentEnvironment;
  const showMacDiscovery = setupProfile.currentEnvironment === "macos" || setupProfile.machineType === "mac" || setupProfile.currentEnvironment === "unknown" || !setupProfile.currentEnvironment;
  const showUnknownEnvironmentDiscovery = setupProfile.currentEnvironment === "unknown" || !setupProfile.currentEnvironment;

  discoveryGuide.innerHTML = `
    ${showUnknownEnvironmentDiscovery ? `
    <section class="discovery-card">
      <div>
        <p class="eyebrow">Discovery path: unknown screen</p>
        <h4>First identify where you are, without changing anything</h4>
      </div>
      <p>
        Use this path when you do not know whether the target computer is in a browser, Windows, macOS, Linux,
        the Arch ISO, or firmware setup. This is observation only. Do not partition, format, erase, install,
        reset, restore, or accept prompts that change the disk.
      </p>
      <div class="discovery-grid">
        <div class="discovery-box">
          <strong>Question 1: do you see a web browser?</strong>
          <ul>
            <li>A browser usually has an address bar where websites or file paths appear.</li>
            <li>You may see tabs, back and forward buttons, or this walkthrough page.</li>
            <li>If you are only reading this guide in a browser, that browser is not proof of the target computer's install environment.</li>
            <li>Safe action: keep reading. Do not assume the Arch ISO is booted just because the guide is open.</li>
          </ul>
        </div>
        <div class="discovery-box">
          <strong>Question 2: do you see a black or plain text terminal?</strong>
          <ul>
            <li>A terminal is a text screen where commands are typed after a prompt.</li>
            <li>The Arch ISO often shows a shell prompt such as <code>root@archiso ~ #</code>.</li>
            <li>The word <code>root</code> means the session has administrator-level power. On the Arch ISO this is normal, but it also means wrong disk commands can be dangerous.</li>
            <li>The word <code>archiso</code> is a strong clue that the temporary Arch ISO environment is running.</li>
            <li>The symbol <code>#</code> often means a root shell prompt. It is not a command by itself in this context.</li>
          </ul>
        </div>
        <div class="discovery-box">
          <strong>Question 3: do you see Windows?</strong>
          <ul>
            <li>Windows usually has a Start menu, taskbar, File Explorer, Settings app, and drive letters such as <code>C:</code>.</li>
            <li><code>C:</code> is a Windows drive letter. It is not a Linux device name.</li>
            <li>If you see Windows, you are not in the Arch ISO yet.</li>
            <li>Safe action: use the Windows discovery card below for observation, then verify final Linux names later from the Arch ISO.</li>
          </ul>
        </div>
        <div class="discovery-box">
          <strong>Question 4: do you see macOS?</strong>
          <ul>
            <li>macOS usually has a top menu bar, Apple menu, Finder, Dock, System Settings, and Disk Utility.</li>
            <li>macOS disk names such as <code>/dev/disk0</code> are macOS names. They are not Linux names.</li>
            <li>If you see macOS, you are not in the Arch ISO yet.</li>
            <li>Safe action: use the macOS discovery card below for observation, then verify final Linux names later from the Arch ISO.</li>
          </ul>
        </div>
        <div class="discovery-box">
          <strong>Question 5: do you see another Linux desktop or terminal?</strong>
          <ul>
            <li>A Linux desktop may have a panel, app launcher, terminal app, and filesystem paths that begin with <code>/</code>.</li>
            <li>A Linux terminal may show a prompt ending in <code>$</code> for a normal user or <code>#</code> for root.</li>
            <li>The slash character <code>/</code> starts many Linux paths, such as <code>/home</code>, <code>/boot</code>, and <code>/dev</code>.</li>
            <li>If it is an installed Linux system, it may be using one of the disks you are trying to protect.</li>
            <li>Safe action: use only non-destructive listing commands until you know which disk is current OS storage and which disk is the target.</li>
          </ul>
        </div>
        <div class="discovery-box">
          <strong>Question 6: do you see BIOS, UEFI, or a boot menu?</strong>
          <ul>
            <li>Firmware screens often say <code>BIOS</code>, <code>UEFI</code>, <code>Setup</code>, <code>Boot Menu</code>, <code>Boot Manager</code>, or show hardware settings.</li>
            <li>A boot menu lets you choose what device starts the computer, such as an internal SSD or the Arch USB installer.</li>
            <li>UEFI is modern firmware used by most current computers. Legacy BIOS is older firmware behavior.</li>
            <li>Safe action: choose the Arch USB only when you intend to boot the installer. Do not change Secure Boot, storage mode, TPM, or disk settings unless the guide has a specific step for your machine.</li>
          </ul>
        </div>
      </div>
      <section class="profile-summary-card profile-danger">
        <h4>Stop rule</h4>
        <p>
          If you cannot identify the environment, stop before disk commands. Keep Device Mapping as
          <strong>I do not know</strong>. The next safe step is observation: identify the screen, then use only
          the matching discovery path for Windows, macOS, Linux, Arch ISO, or firmware.
        </p>
      </section>
    </section>
    ` : ""}
    <section class="discovery-card">
      <div>
        <p class="eyebrow">Discovery path: Arch ISO / Linux</p>
        <h4>Find disk names without guessing</h4>
      </div>
      <p>
        Use this path when you are in the Arch ISO terminal or another Linux terminal. This command is non-destructive:
        it lists information. It does not partition, format, mount, erase, or install anything.
      </p>
      <pre><code>lsblk -o NAME,SIZE,TYPE,MODEL,TRAN,SERIAL,MOUNTPOINTS</code></pre>
      <div class="discovery-grid">
        <div class="discovery-box">
          <strong>Command, explained every time</strong>
          <ul>
            <li><code>lsblk</code> means list block devices. A block device is storage Linux can read in blocks, such as an SSD, hard drive, USB drive, or partition.</li>
            <li>The space after <code>lsblk</code> separates the command name from the next instruction.</li>
            <li><code>-o</code> is an option. The dash <code>-</code> means an option is starting. The letter <code>o</code> means output. Together, <code>-o</code> means choose which output columns to show.</li>
            <li>The space after <code>-o</code> separates the option from the column list.</li>
            <li><code>NAME,SIZE,TYPE,MODEL,TRAN,SERIAL,MOUNTPOINTS</code> is one comma-separated list of columns. The commas separate column names; do not add spaces inside this list.</li>
          </ul>
        </div>
        <div class="discovery-box">
          <strong>Column meanings</strong>
          <ul>
            <li><code>NAME</code>: Linux's current name for the disk or partition, such as <code>sda</code>, <code>sdb</code>, or <code>nvme0n1</code>.</li>
            <li><code>SIZE</code>: capacity. Use this to compare against the advertised size of the internal or external SSD.</li>
            <li><code>TYPE</code>: <code>disk</code> means whole disk. <code>part</code> means partition inside a disk.</li>
            <li><code>MODEL</code>: hardware model name when Linux can read it.</li>
            <li><code>TRAN</code>: transport type, such as USB, SATA, or NVMe, when available.</li>
            <li><code>SERIAL</code>: device serial number when available. This can help identify two similar drives.</li>
            <li><code>MOUNTPOINTS</code>: where a filesystem is attached right now, such as <code>/</code>, <code>/boot</code>, <code>/home</code>, or <code>/mnt</code>.</li>
          </ul>
        </div>
        <div class="discovery-box">
          <strong>How to read the output safely</strong>
          <ul>
            <li>Find rows where <code>TYPE</code> is <code>disk</code>. Those are whole disks.</li>
            <li>Look under each disk for rows where <code>TYPE</code> is <code>part</code>. Those are partitions.</li>
            <li>Do not choose a disk by name alone. Names like <code>sda</code> and <code>sdb</code> can change.</li>
            <li>Compare multiple facts: size, model, transport, serial, and mountpoints.</li>
            <li>If a disk or partition has mountpoints for an existing OS, treat it as dangerous until you know exactly what it is.</li>
          </ul>
        </div>
        <div class="discovery-box">
          <strong>What to copy into Device Mapping</strong>
          <ul>
            <li>For a whole target disk, use a value like <code>/dev/sdb</code> or <code>/dev/nvme0n1</code>.</li>
            <li>For a partition, use a value like <code>/dev/sdb1</code> or <code>/dev/nvme0n1p1</code>.</li>
            <li>If you are not sure, keep the field marked <strong>I do not know</strong>.</li>
            <li>Do not continue to partitioning or formatting until the target disk is identified by more than one clue.</li>
          </ul>
        </div>
      </div>
      <section class="profile-summary-card profile-danger">
        <h4>Stop rule</h4>
        <p>If the output does not clearly prove which disk is the target, stop. The safe answer is not to guess. The next discovery step will add filesystem details with <code>lsblk -f</code>.</p>
      </section>
    </section>
    <section class="discovery-card">
      <div>
        <p class="eyebrow">Discovery path: filesystem view</p>
        <h4>Find filesystem clues without changing anything</h4>
      </div>
      <p>
        This second command is also non-destructive. It lists filesystem information already present on disks and partitions.
        It does not create, delete, format, mount, erase, or repair anything.
      </p>
      <pre><code>lsblk -f</code></pre>
      <div class="discovery-grid">
        <div class="discovery-box">
          <strong>Command, explained every time</strong>
          <ul>
            <li><code>lsblk</code> means list block devices. A block device is storage Linux can read in blocks, such as a disk, SSD, USB drive, or partition.</li>
            <li>The space after <code>lsblk</code> separates the command name from the option that follows it.</li>
            <li><code>-f</code> is an option. The dash <code>-</code> means an option is starting. The letter <code>f</code> means filesystem. Together, <code>-f</code> tells <code>lsblk</code> to show filesystem information.</li>
            <li><code>lsblk -f</code> means list block devices and include filesystem-related columns.</li>
          </ul>
        </div>
        <div class="discovery-box">
          <strong>What filesystem means here</strong>
          <ul>
            <li>A filesystem is the structure placed on a partition so files and folders can exist there.</li>
            <li>Examples include <code>ext4</code>, <code>vfat</code>, <code>btrfs</code>, <code>xfs</code>, <code>ntfs</code>, and <code>swap</code>.</li>
            <li>A partition can exist without a filesystem. That may show as a blank filesystem field.</li>
            <li>Seeing a filesystem does not mean it is safe to use. It may contain data that must be preserved.</li>
          </ul>
        </div>
        <div class="discovery-box">
          <strong>Common columns you may see</strong>
          <ul>
            <li><code>NAME</code>: Linux's current name for the disk or partition.</li>
            <li><code>FSTYPE</code>: filesystem type. For example, <code>ext4</code> may be Linux data, <code>vfat</code> may be an EFI partition, and <code>ntfs</code> may be Windows data.</li>
            <li><code>FSVER</code>: filesystem version, if Linux can read it.</li>
            <li><code>LABEL</code>: human-readable filesystem label, if one exists.</li>
            <li><code>UUID</code>: filesystem universally unique identifier. This is a stable identifier for that filesystem.</li>
            <li><code>FSAVAIL</code>: available space inside the filesystem, when known.</li>
            <li><code>FSUSE%</code>: percentage of filesystem space used, when known.</li>
            <li><code>MOUNTPOINTS</code>: where the filesystem is currently attached, such as <code>/</code>, <code>/boot</code>, <code>/home</code>, or <code>/mnt</code>.</li>
          </ul>
        </div>
        <div class="discovery-box">
          <strong>How to use this safely</strong>
          <ul>
            <li>Use <code>FSTYPE</code> to recognize likely existing systems. <code>ntfs</code> often means Windows data. <code>apfs</code> may appear for Apple storage if supported. <code>ext4</code> or <code>btrfs</code> often means Linux data.</li>
            <li>Use <code>vfat</code> plus a small size from the first command as a clue for an EFI partition.</li>
            <li>Use <code>MOUNTPOINTS</code> to spot partitions currently in use. A mounted filesystem is not automatically safe to change.</li>
            <li>Use <code>UUID</code> later for stable boot or mount configuration, but do not choose a target disk from UUID alone.</li>
            <li>If the target is still unclear after this command, keep <strong>I do not know</strong> selected and continue discovery.</li>
          </ul>
        </div>
      </div>
      <section class="profile-summary-card profile-danger">
        <h4>Stop rule</h4>
        <p>If <code>lsblk -f</code> shows a filesystem that may contain data you care about, do not format it. Formatting creates a new filesystem and usually destroys the old file/folder structure on that partition.</p>
      </section>
    </section>
    <section class="discovery-card">
      <div>
        <p class="eyebrow">Discovery path: partition table view</p>
        <h4>Inspect partition tables without editing them</h4>
      </div>
      <p>
        This third command lists partition-table information. With <code>-l</code>, it is an inspection command.
        It does not open the interactive partition editor and it does not write changes by itself.
      </p>
      <pre><code>fdisk -l</code></pre>
      <div class="discovery-grid">
        <div class="discovery-box">
          <strong>Command, explained every time</strong>
          <ul>
            <li><code>fdisk</code> is a partition-table tool. A partition table is the map that tells the computer where partitions begin and end on a disk.</li>
            <li>The space after <code>fdisk</code> separates the command name from the option that follows it.</li>
            <li><code>-l</code> is an option. The dash <code>-</code> means an option is starting. The letter <code>l</code> means list. Together, <code>-l</code> means list partition tables and exit.</li>
            <li><code>fdisk -l</code> means show disk and partition-table information for detected disks. It is not the same as running interactive <code>fdisk /dev/sdX</code>.</li>
          </ul>
        </div>
        <div class="discovery-box">
          <strong>Whole disk versus partition</strong>
          <ul>
            <li>A whole disk is the entire storage device, such as <code>/dev/sda</code>, <code>/dev/sdb</code>, or <code>/dev/nvme0n1</code>.</li>
            <li>A partition is one region inside a disk, such as <code>/dev/sda1</code>, <code>/dev/sdb2</code>, or <code>/dev/nvme0n1p1</code>.</li>
            <li>The number at the end of <code>/dev/sda1</code> means partition 1 on disk <code>/dev/sda</code>.</li>
            <li>The <code>p1</code> at the end of <code>/dev/nvme0n1p1</code> means partition 1 on NVMe disk <code>/dev/nvme0n1</code>. The letter <code>p</code> separates the disk name from the partition number.</li>
          </ul>
        </div>
        <div class="discovery-box">
          <strong>Partition-table clues</strong>
          <ul>
            <li><code>Disklabel type: gpt</code> means the disk uses GPT, the modern partition-table format commonly used with UEFI.</li>
            <li><code>Disklabel type: dos</code> means the disk uses the older MBR-style partition table. The word <code>dos</code> here is a partition-table type label, not proof that MS-DOS is installed.</li>
            <li><code>Device</code> lines show partitions on a disk.</li>
            <li><code>Start</code> and <code>End</code> are sector positions. They show where a partition begins and ends on the disk.</li>
            <li><code>Size</code> helps identify whether a partition is small, like an EFI partition, or large, like an operating-system/data partition.</li>
            <li><code>Type</code> may describe partition purpose, such as EFI System, Linux filesystem, Linux swap, Microsoft basic data, or BIOS boot.</li>
          </ul>
        </div>
        <div class="discovery-box">
          <strong>How to use this safely</strong>
          <ul>
            <li>Use <code>fdisk -l</code> to confirm the partition layout you think you saw in <code>lsblk</code>.</li>
            <li>Use disk size and partition types as additional evidence, not as the only evidence.</li>
            <li>If the target disk uses GPT and legacy BIOS boot, a tiny BIOS boot partition may be needed for GRUB BIOS.</li>
            <li>If the target disk uses UEFI, a small EFI System Partition is commonly needed.</li>
            <li>Do not run interactive partitioning commands until you have confirmed the target disk and backup/preservation decision.</li>
          </ul>
        </div>
      </div>
      <section class="profile-summary-card profile-danger">
        <h4>Stop rule</h4>
        <p>If <code>fdisk -l</code> shows partitions that look like an existing Windows, macOS, Linux, recovery, EFI, or data layout, assume they may matter. Do not delete, resize, or format them until the preservation plan is explicit.</p>
      </section>
    </section>
    <section class="discovery-card">
      <div>
        <p class="eyebrow">Discovery path: filesystem identifiers</p>
        <h4>Read UUID and label clues without changing anything</h4>
      </div>
      <p>
        This fourth command prints block-device attributes such as filesystem type, label, and UUID.
        It is non-destructive: it reads metadata and prints it. It does not partition, format, mount, erase, or repair anything.
      </p>
      <pre><code>blkid</code></pre>
      <div class="discovery-grid">
        <div class="discovery-box">
          <strong>Command, explained every time</strong>
          <ul>
            <li><code>blkid</code> means block ID. It asks Linux to print identifying attributes for block devices and filesystems.</li>
            <li>There are no spaces, dashes, or extra options in this simple form. The whole command is just <code>blkid</code>.</li>
            <li>A block device is storage Linux can read in blocks, such as a disk, SSD, USB drive, or partition.</li>
            <li>An attribute is a named fact about a device or filesystem, such as <code>UUID=...</code>, <code>LABEL=...</code>, or <code>TYPE=...</code>.</li>
          </ul>
        </div>
        <div class="discovery-box">
          <strong>Common output pieces</strong>
          <ul>
            <li><code>/dev/sda1:</code> is the device or partition being described. The colon <code>:</code> separates the device name from its attributes.</li>
            <li><code>UUID="..."</code> is a filesystem UUID. The letters <code>UUID</code> name the attribute. The equals sign <code>=</code> connects the name to the value. The quotes wrap the UUID value.</li>
            <li><code>LABEL="..."</code> is a human-readable filesystem label, if one exists.</li>
            <li><code>TYPE="ext4"</code>, <code>TYPE="vfat"</code>, <code>TYPE="ntfs"</code>, or <code>TYPE="swap"</code> describes the filesystem or swap type.</li>
            <li><code>PARTUUID="..."</code> identifies the partition itself from the partition table, which is different from the filesystem UUID inside the partition.</li>
          </ul>
        </div>
        <div class="discovery-box">
          <strong>How this helps later</strong>
          <ul>
            <li>UUIDs are useful for bootloader entries and <code>fstab</code> because device names like <code>/dev/sda</code> can change.</li>
            <li>A filesystem UUID identifies the filesystem that was created on a partition.</li>
            <li>A PARTUUID identifies the partition entry in the partition table.</li>
            <li>A label can help a human recognize a filesystem, but labels are optional and may be blank or duplicated.</li>
            <li>Filesystem type can help identify likely data. For example, <code>ntfs</code> may be Windows data, <code>vfat</code> may be EFI, and <code>ext4</code> may be Linux data.</li>
          </ul>
        </div>
        <div class="discovery-box">
          <strong>How to use this safely</strong>
          <ul>
            <li>Use <code>blkid</code> to confirm filesystem identifiers after you already understand the disk layout from <code>lsblk</code> and <code>fdisk -l</code>.</li>
            <li>Do not choose a disk from UUID alone. UUID proves an identifier, not the user's intention.</li>
            <li>If a partition has a UUID and a filesystem type, assume it may contain data until proven otherwise.</li>
            <li>Copy UUIDs carefully when a later bootloader or <code>fstab</code> page asks for them. One wrong character can make boot or mounting fail.</li>
            <li>If you cannot match a UUID back to the correct partition, keep the value marked <strong>I do not know</strong> and stop before destructive steps.</li>
          </ul>
        </div>
      </div>
      <section class="profile-summary-card profile-danger">
        <h4>Stop rule</h4>
        <p><code>blkid</code> can help identify filesystems, but it does not decide what is safe to erase. Safety still depends on matching multiple facts: device name, size, model, transport, serial, partition table, filesystem type, UUID, and mountpoints.</p>
      </section>
    </section>
    ${showWindowsDiscovery ? `
    <section class="discovery-card">
      <div>
        <p class="eyebrow">Discovery path: Windows</p>
        <h4>Identify likely disks in Windows without guessing Linux names</h4>
      </div>
      <p>
        Use this path when the target computer is still running Windows or when you are using Windows to inspect an external SSD before booting the Arch ISO.
        This section is observational. It does not tell you to delete, format, shrink, or create partitions.
      </p>
      <div class="discovery-grid">
        <div class="discovery-box">
          <strong>Open Disk Management</strong>
          <ul>
            <li>Press the Windows key or open the Start menu.</li>
            <li>Type <code>Disk Management</code>. This is text you type into Windows search, not a Linux command.</li>
            <li>Open <strong>Create and format hard disk partitions</strong>. Despite the scary name, opening it only shows the tool. Do not click format, delete, shrink, or create unless the wizard later tells you exactly why.</li>
            <li>Disk Management is the Windows graphical tool that shows disks, partitions, sizes, and some partition labels.</li>
          </ul>
        </div>
        <div class="discovery-box">
          <strong>Windows words you may see</strong>
          <ul>
            <li><code>Disk 0</code>, <code>Disk 1</code>, and similar names are Windows disk numbers. They are not Linux names.</li>
            <li><code>Basic</code> usually describes a normal Windows disk type.</li>
            <li><code>Online</code> means Windows can currently see the disk.</li>
            <li><code>EFI System Partition</code> is a small UEFI boot partition. It may be present on the Windows OS disk.</li>
            <li><code>NTFS</code> is a common Windows filesystem. Treat NTFS partitions as containing data unless you know otherwise.</li>
            <li><code>Recovery Partition</code> is usually Windows recovery data. Do not delete it unless you intentionally decided to erase the whole disk.</li>
          </ul>
        </div>
        <div class="discovery-box">
          <strong>How to identify an external SSD</strong>
          <ul>
            <li>Compare capacity. A 1 TB external SSD should appear close to that size.</li>
            <li>Look for a disk that appears or disappears when the external SSD is connected or disconnected. Do not disconnect a disk while writing to it.</li>
            <li>Look for labels, drive letters, or volume names that match the external drive.</li>
            <li>If the external drive is empty or new, it may show unallocated space. Unallocated means Windows does not currently show a normal partition there.</li>
            <li>Still verify the final Linux name later in the Arch ISO with <code>lsblk</code>. Windows cannot tell you that the disk will be <code>/dev/sda</code> or <code>/dev/sdb</code>.</li>
          </ul>
        </div>
        <div class="discovery-box">
          <strong>Do not translate Windows names into Linux names</strong>
          <ul>
            <li><code>Disk 0</code> in Windows does not mean <code>/dev/sda</code> in Linux.</li>
            <li><code>Disk 1</code> in Windows does not guarantee <code>/dev/sdb</code> in Linux.</li>
            <li>Windows drive letters like <code>C:</code> and <code>D:</code> are not Linux disk names.</li>
            <li>Use Windows only to learn clues: capacity, internal/external role, partition layout, and labels.</li>
            <li>The final device mapping must be verified after booting the Arch ISO.</li>
          </ul>
        </div>
      </div>
      <section class="profile-summary-card profile-danger">
        <h4>Stop rule</h4>
        <p>If Windows shows partitions you want to keep, do not delete, format, or shrink them from this app's current path. Mark the relevant Device Mapping fields as <strong>I do not know</strong>, boot the Arch ISO when ready, and verify with the Linux discovery commands.</p>
      </section>
    </section>
    ` : ""}
    ${showMacDiscovery ? `
    <section class="discovery-card">
      <div>
        <p class="eyebrow">Discovery path: macOS</p>
        <h4>Identify likely disks in Disk Utility without guessing Linux names</h4>
      </div>
      <p>
        Use this path when the target computer is still running macOS or when you are using macOS to inspect an external SSD before booting the Arch ISO.
        This section is observational. It does not tell you to erase, partition, restore, or reformat anything in Disk Utility.
      </p>
      <div class="discovery-grid">
        <div class="discovery-box">
          <strong>Open Disk Utility safely</strong>
          <ul>
            <li>Open <strong>Disk Utility</strong> from Applications, Utilities, Spotlight, or Recovery.</li>
            <li>In Disk Utility, choose <strong>View</strong>, then <strong>Show All Devices</strong>. This matters because macOS may otherwise show volumes without the full device tree.</li>
            <li>The device tree means the nested list of physical disks, containers, and volumes.</li>
            <li>Do not click <strong>Erase</strong>, <strong>Partition</strong>, <strong>Restore</strong>, or <strong>First Aid</strong> from this discovery path. The goal is only to observe names, size, internal/external role, and layout.</li>
          </ul>
        </div>
        <div class="discovery-box">
          <strong>macOS words you may see</strong>
          <ul>
            <li><code>Internal</code> means built into the Mac. This may be the macOS system disk.</li>
            <li><code>External</code> means connected by USB, Thunderbolt, or another external path.</li>
            <li><code>APFS</code> is Apple's modern filesystem. Treat APFS containers and volumes as containing macOS data unless you know otherwise.</li>
            <li>An <code>APFS Container</code> can hold multiple volumes. The container is not the same thing as a Linux partition name.</li>
            <li><code>EFI</code> or an EFI partition is boot-related. Do not erase it unless the whole target disk is intentionally being erased.</li>
          </ul>
        </div>
        <div class="discovery-box">
          <strong>Apple Silicon versus Intel Mac context</strong>
          <ul>
            <li><strong>Apple Silicon</strong> means Macs with Apple chips such as M1, M2, M3, or newer. Boot behavior and Linux support are different from older Intel Macs.</li>
            <li><strong>Intel Mac</strong> means Macs with Intel processors. These are closer to standard x86_64 PC boot behavior, but still need careful disk identification.</li>
            <li>This discovery page does not decide whether the Mac can boot the exact Arch path. It only helps identify disks safely.</li>
            <li>If you are unsure whether the Mac is Apple Silicon or Intel, use macOS <strong>About This Mac</strong> to read the chip/processor line. Do not infer it from disk names.</li>
          </ul>
        </div>
        <div class="discovery-box">
          <strong>External SSD clues</strong>
          <ul>
            <li>Compare capacity. A 500 GB or 1 TB external SSD should appear close to that size.</li>
            <li>Look for <code>External</code> in Disk Utility when the drive is connected.</li>
            <li>Look for a device that appears or disappears when the external SSD is connected or disconnected. Do not unplug a drive while macOS is writing to it.</li>
            <li>Look for model/vendor names that match the external SSD enclosure or drive.</li>
            <li>Still verify the final Linux name later in the Arch ISO with <code>lsblk</code>. macOS cannot tell you that the disk will be <code>/dev/sda</code>, <code>/dev/sdb</code>, or <code>/dev/nvme0n1</code>.</li>
          </ul>
        </div>
        <div class="discovery-box">
          <strong>Do not translate macOS names into Linux names</strong>
          <ul>
            <li><code>/dev/disk0</code> in macOS does not mean <code>/dev/sda</code> in Linux.</li>
            <li><code>/dev/disk1</code> in macOS does not guarantee <code>/dev/sdb</code> in Linux.</li>
            <li>macOS volume names are not Linux device names.</li>
            <li>Use macOS only to learn clues: internal/external role, capacity, model, APFS layout, EFI clues, and which drive is likely the target.</li>
            <li>The final Device Mapping values must be verified after booting the Arch ISO or Linux environment.</li>
          </ul>
        </div>
        <div class="discovery-box">
          <strong>What to write down</strong>
          <ul>
            <li>Mac type: Apple Silicon or Intel, if known.</li>
            <li>Likely internal disk capacity and model.</li>
            <li>Likely external SSD capacity and model.</li>
            <li>Whether the target disk is internal or external.</li>
            <li>Whether the target disk can be erased or must preserve data.</li>
          </ul>
        </div>
      </div>
      <section class="profile-summary-card profile-danger">
        <h4>Stop rule</h4>
        <p>If Disk Utility shows APFS, EFI, recovery, Time Machine, macOS, or personal-data volumes that you want to keep, do not erase, partition, or restore them from this path. Keep Device Mapping as <strong>I do not know</strong> until Linux discovery confirms the final device names.</p>
      </section>
    </section>
    ` : ""}
  `;
}

function profileWarnings() {
  const warnings = [];
  if (!setupProfileCompleteEnough()) {
    warnings.push("The profile is incomplete. The app must not show destructive disk commands as a copy/paste path yet.");
  }
  if (setupProfile.eraseIntent === "no-preserve") {
    warnings.push("Preserve mode selected. The wizard must stop before resizing, deleting, or formatting any partition until the exact preservation plan is known.");
  }
  if (setupProfile.eraseIntent === "unsure") {
    warnings.push("Erase decision is unsure. Stop before partitioning or formatting. The user must decide what data must survive.");
  }
  if (setupProfile.installTarget === "same-existing") {
    warnings.push("Same-disk install selected. This is high risk because the existing operating system may live on the target disk.");
  }
  if (setupProfile.installTarget === "external") {
    warnings.push("External target selected. Device names such as /dev/sda and /dev/sdb can change; verify by size, model, transport, serial, and mountpoints.");
  }
  if (setupProfile.bootMode === "unknown") {
    warnings.push("Boot mode is unknown. Do not choose a bootloader path until UEFI versus legacy BIOS is verified.");
  }
  return warnings;
}

function recommendedPath() {
  if (!setupProfileCompleteEnough()) {
    return "Complete the safety profile first. Default: do not partition, format, or install a bootloader yet.";
  }
  return scenarioPath().defaultPath;
}

const scenarioCatalog = {
  "mac-external": {
    label: "Mac + external SSD",
    defaultPath: "Default: use macOS only to identify likely internal and external disks, then boot the Arch ISO and verify the external SSD with Linux evidence before any erase or format command.",
    why: "This is default because macOS disk names do not translate into Linux device names, and an external SSD can appear differently after booting the ISO.",
    steps: [
      "In macOS, use Disk Utility only for observation: internal/external role, capacity, model, APFS layout, and EFI clues.",
      "Record whether the Mac is Apple Silicon or Intel. This affects boot expectations, but it does not identify Linux disk names.",
      "Boot the Arch ISO only when ready, then use lsblk evidence to map the final target disk.",
      "Do not erase APFS, EFI, recovery, Time Machine, or personal-data volumes unless the target disk is intentionally being wiped."
    ]
  },
  "windows-external": {
    label: "Windows host + external SSD",
    defaultPath: "Default: use Windows Disk Management only to observe disk capacity and partition clues, then boot the Arch ISO and verify the external SSD with lsblk before writing anything.",
    why: "This is default because Windows Disk 0/Disk 1 and drive letters like C: are not Linux device names.",
    steps: [
      "Use Disk Management to identify likely current OS disk and likely external disk by size, labels, and partition layout.",
      "Treat NTFS, EFI System Partition, Recovery Partition, and Windows volumes as preserve-until-proven-erase.",
      "Boot the Arch ISO, then verify the final target disk by NAME, SIZE, TYPE, MODEL, TRAN, SERIAL, and MOUNTPOINTS.",
      "Do not copy any /dev/sda-style command until the Linux name is verified inside the Arch ISO."
    ]
  },
  "linux-external": {
    label: "Linux host + external SSD",
    defaultPath: "Default: use non-destructive Linux discovery commands to separate the running OS disk from the external SSD, then use only the verified external disk as the target.",
    why: "This is default because internal NVMe storage often looks like /dev/nvme0n1 while external USB/SATA-style storage may look like /dev/sda or /dev/sdb, but names alone are never proof.",
    steps: [
      "Run lsblk evidence commands from the Linux environment or Arch ISO.",
      "Find the current OS disk by mountpoints such as /, /boot, /home, and by model/size.",
      "Find the external SSD by transport such as usb, capacity, model, serial, and whether it appears when connected.",
      "Keep destructive commands blocked until the target whole disk and target partitions are mapped exactly."
    ]
  },
  "arch-one-internal": {
    label: "Arch ISO + one internal disk",
    defaultPath: "Default: assume the one internal disk may be the only install target, but still verify by size, model, and mountpoints before erasing.",
    why: "This is default because a one-disk machine is simpler, but the disk may still contain Windows, macOS, Linux, recovery partitions, or personal data.",
    steps: [
      "Confirm the target computer is actually booted into the Arch ISO.",
      "Use lsblk evidence to identify the internal disk and any existing partitions.",
      "Choose erase only if the user intentionally wants the whole target disk wiped.",
      "If preserving anything, stop and use the same-disk preserve path instead."
    ]
  },
  "arch-two-internal": {
    label: "Arch ISO + two internal disks",
    defaultPath: "Default: identify the current OS disk and the separate target disk by evidence before any partitioning.",
    why: "This is default because two internal disks can look similar, and erasing the wrong internal SSD can destroy the existing OS or personal files.",
    steps: [
      "Use lsblk to list both whole disks and their partitions.",
      "Compare capacity, model, serial, transport, and mountpoints.",
      "Mark the current OS disk separately from the target install disk in Device Mapping.",
      "Do not format until the target disk is proven by more than one clue."
    ]
  },
  "same-disk-erase": {
    label: "Same internal disk, erase existing OS",
    defaultPath: "Default: require an explicit erase decision, exact target disk mapping, and a final disk identity gate before partitioning.",
    why: "This is default because same-disk erase intentionally destroys the existing OS/data on that disk.",
    steps: [
      "Confirm the user chose to erase the target disk.",
      "Identify the whole disk, not just a partition.",
      "Verify that all wanted data is backed up somewhere else.",
      "Only after confirmation should partitioning or formatting commands appear as usable commands."
    ]
  },
  "same-disk-preserve": {
    label: "Same internal disk, preserve existing OS/data",
    defaultPath: "Default: stop before resize, delete, or format actions until a preservation layout is explicitly planned.",
    why: "This is default because preserving an OS on the same disk is the highest beginner disk-layout risk.",
    steps: [
      "Identify the existing OS partitions, EFI partition, recovery partitions, and data partitions.",
      "Do not delete or format partitions just because they are old or unfamiliar.",
      "Decide whether space already exists for Arch or whether resizing is needed.",
      "Treat resizing and dual-boot layout as an advanced branch that needs extra validation."
    ]
  },
  "vm-disk": {
    label: "VM virtual disk",
    defaultPath: "Default: use the VM's virtual disk as the target only after confirming the VM has no attached host disk or passthrough disk that must be preserved.",
    why: "This is default because VM disks are usually safer for practice, but passthrough or shared storage can still risk real data.",
    steps: [
      "Confirm the install is inside a virtual machine.",
      "Confirm the listed disk size matches the virtual disk created for the VM.",
      "Do not choose shared folders, host-mounted disks, or passthrough disks as install targets.",
      "Continue with the normal Arch ISO path after the virtual disk is mapped."
    ]
  },
  "profile-incomplete": {
    label: "Profile incomplete",
    defaultPath: "Default: complete the safety profile and Device Mapping discovery before choosing any install path.",
    why: "This is default because the app cannot safely choose a disk, bootloader, or network path without the user's setup.",
    steps: [
      "Answer the current environment, install target, erase intent, boot mode, and network path questions.",
      "Mark unknown device names honestly instead of guessing.",
      "Use the matching discovery path for the current screen or operating system.",
      "Do not run destructive disk commands yet."
    ]
  }
};

function scenarioKey() {
  if (!setupProfileCompleteEnough()) return "profile-incomplete";
  if (setupProfile.installTarget === "vm-disk") return "vm-disk";
  if (setupProfile.installTarget === "external" && (setupProfile.machineType === "mac" || setupProfile.currentEnvironment === "macos")) return "mac-external";
  if (setupProfile.installTarget === "external" && setupProfile.currentEnvironment === "windows") return "windows-external";
  if (setupProfile.installTarget === "external" && setupProfile.currentEnvironment === "linux") return "linux-external";
  if (setupProfile.installTarget === "external" && setupProfile.currentEnvironment === "arch-iso") return "linux-external";
  if (setupProfile.installTarget === "same-existing" && setupProfile.eraseIntent === "yes") return "same-disk-erase";
  if (setupProfile.installTarget === "same-existing") return "same-disk-preserve";
  if (setupProfile.installTarget === "second-internal" || setupProfile.internalDriveCount === "two" || setupProfile.internalDriveCount === "three-plus") return "arch-two-internal";
  if (setupProfile.installTarget === "only-internal" && setupProfile.currentEnvironment === "arch-iso") return "arch-one-internal";
  return "profile-incomplete";
}

function scenarioPath() {
  return scenarioCatalog[scenarioKey()] || scenarioCatalog["profile-incomplete"];
}

function bootNetworkPathNotes() {
  const parts = [];
  if (setupProfile.bootMode === "uefi") {
    parts.push("Boot mode path: UEFI. Default bootloader path should be systemd-boot unless the user chooses GRUB for a specific reason.");
  } else if (setupProfile.bootMode === "bios") {
    parts.push("Boot mode path: legacy BIOS. Default bootloader path should be GRUB BIOS.");
  } else {
    parts.push("Boot mode path: unknown. Verify boot mode before bootloader commands.");
  }
  if (setupProfile.networkPath === "ethernet") {
    parts.push("Network path: Ethernet. Default is to test connectivity first, then continue.");
  } else if (setupProfile.networkPath === "wifi") {
    parts.push("Network path: Wi-Fi. Default is to use the ISO Wi-Fi walkthrough before package installation.");
  }
  return parts;
}

function bootloaderPathChoice() {
  if (setupProfile.bootMode === "uefi") {
    return {
      status: "ready",
      title: "UEFI boot mode selected",
      defaultPath: "Default beginner path: systemd-boot.",
      active: [
        "Use the systemd-boot UEFI path first unless there is a clear reason to choose GRUB.",
        "The EFI System Partition must be mapped and mounted at /boot for this simple path.",
        "UEFI paths use firmware variables and EFI boot files. They do not install GRUB to a whole disk MBR-style target."
      ],
      inactive: [
        "Legacy BIOS GRUB is not the active path.",
        "Do not use grub-install --target=i386-pc in a UEFI install path.",
        "Do not treat a BIOS boot partition as the EFI System Partition."
      ],
      review: "GRUB UEFI remains an alternate UEFI branch for users who intentionally choose GRUB, but beginners should use one bootloader path, not both."
    };
  }
  if (setupProfile.bootMode === "bios") {
    return {
      status: "danger",
      title: "Legacy BIOS boot mode selected",
      defaultPath: "Default beginner path: GRUB for BIOS.",
      active: [
        "Use the GRUB legacy BIOS path.",
        "BIOS GRUB installs to a whole target disk such as /dev/sda, not a partition such as /dev/sda1.",
        "If the disk uses GPT, confirm whether a tiny BIOS boot partition is required before installing GRUB."
      ],
      inactive: [
        "systemd-boot is not active because systemd-boot is for UEFI systems.",
        "GRUB UEFI is not active because --target=x86_64-efi is a UEFI target.",
        "Do not rely on EFI variables or an EFI System Partition as the BIOS boot mechanism."
      ],
      review: "The BIOS path must be handled carefully because the install target is the whole disk. Device Mapping and the Bootloader mode gate still must pass."
    };
  }
  return {
    status: "danger",
    title: "Boot mode unknown",
    defaultPath: "Default safe path: stop before bootloader install commands.",
    active: [
      "Find out whether the ISO booted in UEFI mode or legacy BIOS mode.",
      "UEFI evidence commonly includes /sys/firmware/efi/efivars existing.",
      "Legacy BIOS evidence commonly means /sys/firmware/efi/efivars is missing."
    ],
    inactive: [
      "Do not choose systemd-boot yet.",
      "Do not choose GRUB UEFI yet.",
      "Do not choose GRUB BIOS yet."
    ],
    review: "After boot mode is known, select UEFI or legacy BIOS in the Safety profile. The visible bootloader path will change."
  };
}

function bootloaderPathTemplate() {
  const choice = bootloaderPathChoice();
  return `
    <section class="profile-summary-card boot-path-card ${choice.status === "danger" ? "profile-danger" : "profile-safe"}">
      <h4>Active bootloader path</h4>
      <p><strong>${choice.title}:</strong> ${choice.defaultPath}</p>
      <div class="boot-path-grid">
        <div>
          <strong>Visible matching path</strong>
          <ul>${choice.active.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </div>
        <div>
          <strong>Inactive wrong-mode path</strong>
          <ul>${choice.inactive.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </div>
      </div>
      <p><strong>KISS rule:</strong> ${escapeHtml(choice.review)}</p>
    </section>
  `;
}

function networkPathChoice() {
  if (setupProfile.networkPath === "ethernet") {
    return {
      status: "ready",
      title: "Ethernet selected",
      defaultPath: "Default beginner path: plug in the cable, verify IP connectivity, then verify DNS.",
      active: [
        "Ethernet usually works automatically in the Arch ISO when the cable, adapter, router, and DHCP are working.",
        "First inspect interfaces with ip link so the user can see Ethernet-style names such as enp3s0.",
        "Then test raw IP connectivity with ping -c 3 1.1.1.1.",
        "Then test DNS with ping -c 3 archlinux.org before package installation."
      ],
      inactive: [
        "The iwctl Wi-Fi connection path is not the default for Ethernet.",
        "Do not invent a Wi-Fi device name such as wlan0 if using wired networking.",
        "Do not blame Firefox or pacman until IP connectivity and DNS have been tested."
      ],
      commands: [
        {
          command: "ip link",
          explain: "ip means inspect or change network settings. link means network interfaces. Together, ip link lists network interfaces without connecting to a website."
        },
        {
          command: "ping -c 3 1.1.1.1",
          explain: "ping tests reachability. -c 3 means send 3 probes. 1.1.1.1 is a numeric IP address, so this checks connection/routing without DNS."
        },
        {
          command: "ping -c 3 archlinux.org",
          explain: "This tests DNS plus connectivity because archlinux.org must be translated into an IP address before ping can reach it."
        }
      ],
      review: "If IP ping works but archlinux.org fails, the network is partly working and DNS is the next problem to solve."
    };
  }
  if (setupProfile.networkPath === "wifi") {
    const wifiDevice = getDeviceValue("wifiDevice") || "wlan0";
    const wifiName = getDeviceValue("wifiName") || "YourWiFi";
    const hasExactWifi = getDeviceValue("wifiDevice") && getDeviceValue("wifiName") && !getDeviceUnknown("wifiDevice") && !getDeviceUnknown("wifiName");
    return {
      status: hasExactWifi ? "ready" : "danger",
      title: "Wi-Fi selected",
      defaultPath: hasExactWifi ? "Default beginner path: use the rendered iwctl commands with your exact Wi-Fi device and network name." : "Default safe path: discover the Wi-Fi device and exact network name before rendering the final connect command.",
      active: [
        "Use iwctl in the Arch ISO to control iwd wireless networking.",
        "Run device list inside iwctl to find the real Wi-Fi device name.",
        "Scan and list networks before connecting.",
        `Final connect command should use the user's exact values: station ${wifiDevice} connect "${wifiName}".`
      ],
      inactive: [
        "Ethernet automatic setup is not the selected path.",
        "Do not copy station wlan0 connect \"YourWiFi\" unless wlan0 and YourWiFi are the real values.",
        "Do not remove quotes around a Wi-Fi name that contains spaces."
      ],
      commands: [
        {
          command: "iwctl",
          explain: "iwctl opens the interactive iwd wireless control shell. After this, the prompt is iwctl's prompt, not the normal shell prompt."
        },
        {
          command: "device list",
          explain: "device means wireless adapter category inside iwctl. list means show the adapters iwd can control."
        },
        {
          command: `station ${wifiDevice} scan`,
          explain: `station means Wi-Fi client operations. ${wifiDevice} is the Wi-Fi device value. scan asks that device to search for nearby networks.`
        },
        {
          command: `station ${wifiDevice} get-networks`,
          explain: "get-networks shows nearby Wi-Fi network names after scanning."
        },
        {
          command: `station ${wifiDevice} connect "${wifiName}"`,
          explain: `connect means join the network. "${wifiName}" is quoted so the Wi-Fi name stays one argument, especially if it contains spaces.`
        },
        {
          command: "exit",
          explain: "exit leaves the iwctl shell and returns to the normal shell prompt."
        },
        {
          command: "ping -c 3 archlinux.org",
          explain: "After connecting, this checks DNS and reachability with a real domain name."
        }
      ],
      review: "Wi-Fi should not require guesswork. If the device or network name is unknown, use Device Mapping's I do not know path before copying the final connect line."
    };
  }
  return {
    status: "danger",
    title: "Network path unknown",
    defaultPath: "Default safe path: identify Ethernet versus Wi-Fi before package installation.",
    active: [
      "Use ip link to see network interfaces.",
      "Ethernet-style names often begin with en.",
      "Wi-Fi-style names often begin with wl.",
      "After choosing Ethernet or Wi-Fi in the Safety profile, this card will show the matching setup path."
    ],
    inactive: [
      "Do not assume Ethernet is working just because a cable is nearby.",
      "Do not assume Wi-Fi is working just because a network name is visible.",
      "Do not install packages until IP connectivity and DNS are confirmed."
    ],
    commands: [
      {
        command: "ip link",
        explain: "Lists network interfaces so the user can decide whether Ethernet, Wi-Fi, or both are visible."
      },
      {
        command: "ping -c 3 1.1.1.1",
        explain: "Tests raw IP connectivity without DNS."
      },
      {
        command: "ping -c 3 archlinux.org",
        explain: "Tests DNS and reachability after a connection exists."
      }
    ],
    review: "The network path must be known before pacstrap, pacman installs, Firefox troubleshooting, or DNS debugging."
  };
}

function networkPathTemplate() {
  const choice = networkPathChoice();
  return `
    <section class="profile-summary-card network-path-card ${choice.status === "danger" ? "profile-danger" : "profile-safe"}">
      <h4>Active network path</h4>
      <p><strong>${choice.title}:</strong> ${choice.defaultPath}</p>
      <div class="boot-path-grid">
        <div>
          <strong>Visible matching path</strong>
          <ul>${choice.active.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </div>
        <div>
          <strong>Inactive wrong-path guidance</strong>
          <ul>${choice.inactive.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </div>
      </div>
      <section class="network-command-list">
        <strong>Validation commands for this path</strong>
        ${choice.commands.map((item) => `
          <div class="network-command-item">
            <code>${escapeHtml(item.command)}</code>
            <p>${escapeHtml(item.explain)}</p>
          </div>
        `).join("")}
      </section>
      <p><strong>KISS rule:</strong> ${escapeHtml(choice.review)}</p>
    </section>
  `;
}

function scenarioPathTemplate() {
  const active = scenarioPath();
  const alternatives = Object.entries(scenarioCatalog)
    .filter(([key]) => key !== scenarioKey() && key !== "profile-incomplete")
    .map(([, scenario]) => scenario);
  const bootNetwork = bootNetworkPathNotes();
  return `
    <section class="profile-summary-card">
      <h4>Focused scenario path</h4>
      <p><strong>${active.label}:</strong> ${active.defaultPath}</p>
      <p><strong>Why this is the default:</strong> ${active.why}</p>
      ${bootNetwork.length ? `<ul>${bootNetwork.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}</ul>` : ""}
      <ol>
        ${active.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
      </ol>
      <details>
        <summary>Review other scenario paths</summary>
        <div class="scenario-list">
          ${alternatives.map((scenario) => `
            <section class="scenario-option">
              <h5>${scenario.label}</h5>
              <p>${scenario.defaultPath}</p>
              <p><strong>Default reason:</strong> ${scenario.why}</p>
            </section>
          `).join("")}
        </div>
      </details>
    </section>
    <section class="profile-summary-card profile-danger">
      <h4>Destructive commands remain blocked</h4>
      <p>Scenario branching does not make partitioning or formatting safe by itself. The app still needs exact Device Mapping values and a final disk identity gate before commands that erase, format, partition, resize, or install a bootloader should be treated as usable copy/paste commands.</p>
    </section>
  `;
}

function diskIdentityGateTemplate() {
  const issues = diskIdentityGateIssues();
  const passed = diskIdentityGatePassed();
  const ready = issues.length === 0;
  const targetDisk = getDeviceValue("targetDisk") || "not entered";
  const efiPartition = getDeviceValue("efiPartition") || "not entered";
  const rootPartition = getDeviceValue("rootPartition") || "not entered";
  const swapPartition = getDeviceValue("swapPartition") || "not entered";
  return `
    <section class="profile-summary-card ${passed ? "profile-safe" : "profile-danger"}">
      <h4>Disk identity gate</h4>
      <p>This gate must pass before the app reveals copy-ready partitioning or formatting commands. It is intentionally repetitive because wrong disk identity can destroy data.</p>
      <ul>
        <li><strong>Target whole disk:</strong> ${escapeHtml(targetDisk)}</li>
        <li><strong>EFI partition:</strong> ${escapeHtml(efiPartition)}</li>
        <li><strong>Root partition:</strong> ${escapeHtml(rootPartition)}</li>
        <li><strong>Swap partition:</strong> ${escapeHtml(swapPartition)}</li>
        <li><strong>Erase intent:</strong> ${profileValue("eraseIntent")}</li>
      </ul>
      ${issues.length ? `<p><strong>Still blocked:</strong></p><ul>${issues.map((issue) => `<li>${escapeHtml(issue)}</li>`).join("")}</ul>` : ""}
      <label class="gate-confirm">
        <input type="checkbox" data-gate="diskIdentity" ${passed ? "checked" : ""} ${ready ? "" : "disabled"}>
        <span>I have verified these exact disk and partition names by size, model, transport, serial, and mountpoints. I understand disk-writing commands can erase data on these targets.</span>
      </label>
      <p>${passed ? "Gate passed for the current mapped values. If any mapped value changes, this confirmation must be repeated." : "Gate not passed. Disk-writing commands remain hidden and cannot be copied."}</p>
    </section>
  `;
}

function bootloaderModeGateTemplate() {
  const issues = bootloaderModeGateIssues();
  const passed = bootloaderModeGatePassed();
  const ready = issues.length === 0;
  return `
    <section class="profile-summary-card ${passed ? "profile-safe" : "profile-danger"}">
      <h4>Bootloader mode gate</h4>
      <p>This gate must pass before the app reveals copy-ready bootloader install commands. UEFI and legacy BIOS use different commands, and mixing them can leave an installed system unable to boot.</p>
      <ul>
        <li><strong>Boot mode:</strong> ${profileValue("bootMode")}</li>
        <li><strong>EFI partition:</strong> ${escapeHtml(getDeviceValue("efiPartition") || "not entered")}</li>
        <li><strong>Target whole disk:</strong> ${escapeHtml(getDeviceValue("targetDisk") || "not entered")}</li>
      </ul>
      ${issues.length ? `<p><strong>Still blocked:</strong></p><ul>${issues.map((issue) => `<li>${escapeHtml(issue)}</li>`).join("")}</ul>` : ""}
      <label class="gate-confirm">
        <input type="checkbox" data-gate="bootloaderMode" ${passed ? "checked" : ""} ${ready ? "" : "disabled"}>
        <span>I have confirmed the machine's boot mode and understand that UEFI bootloader commands are not the same as legacy BIOS GRUB commands.</span>
      </label>
      <p>${passed ? "Gate passed for the current boot mode and mapped values. If boot mode or mapped values change, this confirmation must be repeated." : "Gate not passed. Bootloader install commands remain hidden and cannot be copied."}</p>
    </section>
  `;
}

function lockoutSafetyGateTemplate() {
  const issues = lockoutSafetyGateIssues();
  const passed = lockoutSafetyGatePassed();
  const ready = issues.length === 0;
  return `
    <section class="profile-summary-card ${passed ? "profile-safe" : "profile-danger"}">
      <h4>Sudo/admin lockout gate</h4>
      <p>This gate must pass before the app reveals copy-ready commands that change passwords, users, sudo access, shells, PAM/login limits, or graphical login behavior. These actions can lock the user out if the wrong account, group, file, or service is changed.</p>
      <ul>
        <li><strong>Normal username:</strong> ${escapeHtml(getDeviceValue("username") || "not entered")}</li>
        <li><strong>Current environment:</strong> ${profileValue("currentEnvironment")}</li>
        <li><strong>Recovery rule:</strong> keep a root shell, Arch ISO path, or known working admin path available until login and sudo are tested.</li>
      </ul>
      ${issues.length ? `<p><strong>Still blocked:</strong></p><ul>${issues.map((issue) => `<li>${escapeHtml(issue)}</li>`).join("")}</ul>` : ""}
      <label class="gate-confirm">
        <input type="checkbox" data-gate="lockoutSafety" ${passed ? "checked" : ""} ${ready ? "" : "disabled"}>
        <span>I understand that account, sudo, shell, PAM, and login-service changes can lock me out. I will keep a recovery path available and test login plus sudo before relying on the install.</span>
      </label>
      <p>${passed ? "Gate passed for the current username and environment. If those values change, this confirmation must be repeated." : "Gate not passed. Access/login-changing commands remain hidden and cannot be copied."}</p>
    </section>
  `;
}

function securityPrivacyGateTemplate() {
  const issues = securityPrivacyGateIssues();
  const passed = securityPrivacyGatePassed();
  const ready = issues.length === 0;
  return `
    <section class="profile-summary-card ${passed ? "profile-safe" : "profile-danger"}">
      <h4>Security/privacy gate</h4>
      <p>This gate must pass before the app reveals copy-ready commands for firewall rules, process limits, PAM limits, cgroups, monitoring, process killing, or restricted shells. These actions are for protecting systems and accounts you own or administer with permission.</p>
      <ul>
        <li><strong>Current environment:</strong> ${profileValue("currentEnvironment")}</li>
        <li><strong>Privacy boundary:</strong> respect other people's privacy. Do not inspect personal files, monitor users, or restrict accounts without permission.</li>
        <li><strong>Layer 1 prevention:</strong> prefer limits, firewall defaults, and least-privilege setup before a problem starts.</li>
        <li><strong>Layer 2 detection/response:</strong> monitoring, alerts, and process killing are emergency tools, not the primary cure.</li>
        <li><strong>Layer 3 cause analysis:</strong> identify the parent process, service, shell, script, or config that caused the runaway behavior.</li>
      </ul>
      ${issues.length ? `<p><strong>Still blocked:</strong></p><ul>${issues.map((issue) => `<li>${escapeHtml(issue)}</li>`).join("")}</ul>` : ""}
      <label class="gate-confirm">
        <input type="checkbox" data-gate="securityPrivacy" ${passed ? "checked" : ""} ${ready ? "" : "disabled"}>
        <span>I will use security, monitoring, process-limit, and process-control steps only on systems/accounts I own or administer with permission. I understand prevention is the main protection and privacy must be respected.</span>
      </label>
      <p>${passed ? "Gate passed for the current environment. If the environment changes, this confirmation must be repeated." : "Gate not passed. Security/privacy-sensitive commands remain hidden and cannot be copied."}</p>
    </section>
  `;
}

function renderProfileSummary() {
  syncProfileForm();
  const warnings = profileWarnings();
  profileSummary.innerHTML = `
    <section class="profile-summary-card ${warnings.length ? "profile-danger" : "profile-safe"}">
      <h4>Current safety summary</h4>
      <p>
        Reading from: ${profileValue("guideDevice")}. Target machine: ${profileValue("machineType")}.
        Current environment: ${profileValue("currentEnvironment")}. Install target: ${profileValue("installTarget")}.
        Erase intent: ${profileValue("eraseIntent")}. Internal drives: ${profileValue("internalDriveCount")}.
        External drive: ${profileValue("externalDrive")}. Boot mode: ${profileValue("bootMode")}.
        Network: ${profileValue("networkPath")}.
      </p>
    </section>
    <section class="profile-summary-card">
      <h4>Recommended safe path right now</h4>
      <p>${recommendedPath()}</p>
    </section>
    ${scenarioPathTemplate()}
    ${bootloaderPathTemplate()}
    ${networkPathTemplate()}
    ${diskIdentityGateTemplate()}
    ${bootloaderModeGateTemplate()}
    ${lockoutSafetyGateTemplate()}
    ${securityPrivacyGateTemplate()}
    <section class="profile-summary-card ${warnings.length ? "profile-danger" : "profile-safe"}">
      <h4>Safety gates still active</h4>
      ${warnings.length ? `<ul>${warnings.map((warning) => `<li>${warning}</li>`).join("")}</ul>` : "<p>Profile is complete enough to choose a focused path. Disk commands still require device-name mapping and a final disk identity gate.</p>"}
    </section>
  `;
}

function render() {
  wizardIndex = Math.min(Math.max(wizardIndex, 0), sections.length - 1);
  renderProfileSummary();
  renderDeviceSummary();
  renderWizard();
  renderGlossaryPanel();

  const query = search.value.trim().toLowerCase();
  const visibleSections = sections.filter((section) => {
    const haystack = JSON.stringify(section).toLowerCase();
    return !query || haystack.includes(query);
  });

  sectionNav.innerHTML = sections.map((section, index) => `
    <a href="#lesson-${index + 1}" data-wizard-jump="${index}">${index + 1}. ${section.title}</a>
  `).join("");

  lessonList.innerHTML = visibleSections.map((section) => {
    const realIndex = sections.indexOf(section);
    const index = realIndex + 1;
    return `
      <article class="lesson open" id="lesson-${index}" data-index="${realIndex}">
        <button class="lesson-header" type="button" aria-expanded="true">
          <span class="lesson-number">${index}</span>
          <span>
            <h3>${section.title}</h3>
            <p class="lesson-summary">${section.summary}</p>
          </span>
          <span class="lesson-toggle">-</span>
        </button>
        <div class="lesson-body">
          <div class="blocks">
            ${sourceListTemplate(section.sources, "Official sources for this lesson")}
            ${section.blocks.map((block) => `
              <section class="${blockClass(block.type)}">
                <h4>${block.title}</h4>
                <p>${block.text}</p>
              </section>
            `).join("")}
            ${section.commands.map((command) => commandTemplate(command)).join("")}
            <section class="block">
              <h4>Words to understand before moving on</h4>
              <div class="term-grid">
                ${section.terms.map((term) => `<button type="button" data-term="${term}">${term}</button>`).join("")}
              </div>
            </section>
          </div>
          <label class="complete-row">
            <input type="checkbox" data-complete="${realIndex}" ${completed.has(realIndex) ? "checked" : ""}>
            I understand this section well enough to continue
          </label>
        </div>
      </article>
    `;
  }).join("");

  updateProgress();
}

function allSectionTerms() {
  return [...new Set(sections.flatMap((section) => section.terms || []))].filter(Boolean);
}

function priorityGlossaryTerms() {
  const repeatedTerms = allSectionTerms()
    .filter((term) => glossary[term])
    .sort((a, b) => a.localeCompare(b));
  const mustKnow = [
    "sudo",
    "ls",
    "lsblk",
    "nano",
    "mount",
    "/mnt",
    "root",
    "UUID",
    "DNS",
    "pacman",
    "pacstrap",
    "systemd",
    "PAM",
    "/etc/security/limits.conf",
    "soft limit",
    "hard limit",
    "nproc",
    "process",
    "privacy"
  ];
  return [...new Set([...mustKnow, ...repeatedTerms])].filter((term) => glossary[term]);
}

function renderGlossaryPanel() {
  if (!glossaryPanel) return;
  const terms = priorityGlossaryTerms();
  glossaryPanel.innerHTML = `
    <section class="glossary-feature">
      <strong>Beginner mode rule</strong>
      <p>Do not rely on memory. If a word appears again, open it again. The same command word must be understandable every time it appears.</p>
    </section>
    <div class="term-grid glossary-term-grid">
      ${terms.map((term) => `<button type="button" data-term="${escapeHtml(term)}">${escapeHtml(term)}</button>`).join("")}
    </div>
  `;
}

function termDetail(term) {
  const meaning = glossary[term] || "This term still needs a detailed explanation.";
  const detail = glossaryDetails[term] || {};
  return {
    meaning,
    appears: detail.appears || "This term appears in one or more install, safety, networking, audio, boot, or troubleshooting pages.",
    example: detail.example || "Open this term whenever it appears. The app should explain the current command's exact words on the same page too.",
    safety: detail.safety || "Read the surrounding command, expected result, and failure note before typing anything."
  };
}

function openTermDialog(term) {
  const detail = termDetail(term);
  termTitle.textContent = term;
  termBody.innerHTML = `
    <span class="term-detail-label">Meaning</span>
    <span>${escapeHtml(detail.meaning)}</span>
    <span class="term-detail-label">Where this appears</span>
    <span>${escapeHtml(detail.appears)}</span>
    <span class="term-detail-label">Tiny example</span>
    <span>${escapeHtml(detail.example)}</span>
    <span class="term-detail-label">Safety note</span>
    <span>${escapeHtml(detail.safety)}</span>
  `;
  dialog.showModal();
}

function renderWizard() {
  const section = sections[wizardIndex];
  const firstCommand = section.commands[0];
  const secondCommand = section.commands[1];
  const warning = section.blocks.find((block) => block.type === "warn");
  const checkpoint = section.blocks.find((block) => block.type === "checkpoint");
  const explanation = section.blocks.find((block) => block.type !== "warn" && block.type !== "checkpoint") || section.blocks[0];

  wizardCounter.textContent = `Step ${wizardIndex + 1} of ${sections.length}`;
  wizardPrev.disabled = wizardIndex === 0;
  wizardNext.disabled = wizardIndex === sections.length - 1;
  wizardUnderstand.textContent = completed.has(wizardIndex) ? "Marked understood" : "Mark understood";

  wizardStage.innerHTML = `
    <div class="wizard-stage-head">
      <h4>${section.title}</h4>
      <p>${section.summary}</p>
    </div>
    <section class="wizard-profile-context">
      <strong>Your active setup profile</strong>
      <p>
        Install target: ${profileValue("installTarget")}. Erase intent: ${profileValue("eraseIntent")}.
        Boot mode: ${profileValue("bootMode")}. Network: ${profileValue("networkPath")}.
      </p>
      <p>
        Target disk: ${escapeHtml(getDeviceUnknown("targetDisk") ? "I do not know" : (getDeviceValue("targetDisk") || "not entered"))}.
        EFI partition: ${escapeHtml(getDeviceUnknown("efiPartition") ? "I do not know" : (getDeviceValue("efiPartition") || "not entered"))}.
        Root partition: ${escapeHtml(getDeviceUnknown("rootPartition") ? "I do not know" : (getDeviceValue("rootPartition") || "not entered"))}.
      </p>
      <p>${setupProfileCompleteEnough() ? "This profile is complete enough to choose a focused path, but disk commands still require exact device names and a safety gate." : "This profile is incomplete. Treat disk commands below as educational examples, not final copy/paste instructions."}</p>
    </section>
    <div class="wizard-focus-grid">
      <div class="wizard-focus">
        <strong>What you are doing</strong>
        <p>${explanation ? explanation.text : section.summary}</p>
      </div>
      <div class="wizard-focus">
        <strong>Do not continue until</strong>
        <p>${checkpoint ? checkpoint.text : "You understand the goal of this stage and can explain what the next command changes."}</p>
      </div>
      <div class="wizard-focus">
        <strong>High-risk note</strong>
        <p>${warning ? warning.text : "This stage still matters. Read the expected result and failure notes before copying commands."}</p>
      </div>
    </div>
    ${wizardCommandPreview(firstCommand, "First command to understand")}
    ${secondCommand ? wizardCommandPreview(secondCommand, "Next command to understand") : ""}
  `;
}

function wizardCommandPreview(command, title) {
  if (!command) return "";
  const safety = commandSafetyMeta(command);
  const safetyType = commandSafetyType(command);
  const dangerClass = commandDangerClass(safetyType);
  const rendered = renderCommandValue(command);
  if (commandBlockedBySafetyGate(command)) {
    return `
      <section class="wizard-command-preview gate-blocked${dangerClass}">
        <div class="command-title-row">
          <h4>${title}: ${command.label}</h4>
          ${commandSafetyBadge(command)}
        </div>
        <p><strong>Hidden until safety gate passes.</strong> ${blockedCommandReason(command)}</p>
      </section>
    `;
  }
  return `
    <section class="wizard-command-preview${dangerClass}">
      <div class="command-title-row">
        <h4>${title}: ${command.label}</h4>
        ${commandSafetyBadge(command)}
      </div>
      <p class="command-safety-note">${safety.explanation}</p>
      ${destructiveCommandWarning(safetyType)}
      ${rendered.note}
      <pre><code>${escapeHtml(rendered.command)}</code></pre>
      <p><strong>Meaning:</strong> ${command.purpose}</p>
      <p><strong>Expected:</strong> ${command.expected}</p>
      <p><strong>If it fails:</strong> ${command.fails}</p>
    </section>
  `;
}

function commandSafetyType(command) {
  const text = command.command.trim();
  if (/^(cfdisk|fdisk\s+\/dev|parted|gdisk|sgdisk|wipefs|mkfs\.|mkswap)\b/.test(text)) {
    return "disk-write";
  }
  if (/^(bootctl install|grub-install\b)/.test(text)) {
    return "bootloader-install";
  }
  if (/^(passwd|useradd|usermod|gpasswd|chsh|chage|visudo|EDITOR=.*\svisudo)\b/.test(text)) {
    return "access-change";
  }
  if (/^(sudo\s+)?systemctl\s+(enable|start|enable\s+--now)\b.*\blightdm\b/.test(text)) {
    return "access-change";
  }
  if (/^(sudo\s+)?(ufw|firewall-cmd|nft|iptables|ip6tables|ulimit|htop|top|ps|pstree|pkill|killall|kill)\b/.test(text)) {
    return "security-privacy";
  }
  if (/^(sudo\s+)?nano\s+\/etc\/security\/limits\.conf\b/.test(text)) {
    return "security-privacy";
  }
  if (/^(sudo\s+)?systemctl\b.*(set-property|CPU|Memory|TasksMax|user-|\.slice|\.service)/.test(text)) {
    return "security-privacy";
  }
  if (/^(sudo\s+)?systemctl\s+(enable|start|enable\s+--now)\b.*\bufw\b/.test(text)) {
    return "security-privacy";
  }
  if (/^(sudo\s+)?(chsh|usermod)\b.*(-s|--shell)/.test(text)) {
    return "security-privacy";
  }
  if (/^(sudo\s+)?pacman\s+-S/.test(text) || /^pacstrap\b/.test(text)) {
    return "package-install";
  }
  if (/^(sudo\s+)?systemctl\b/.test(text) || /^bootctl\s+(list|status)\b/.test(text)) {
    return "service-control";
  }
  if (/^(nano|sudo\s+nano|EDITOR=.*\bvisudo\b|ln\s+-sf|locale-gen|echo\b|cat\s+>|genfstab|arch-chroot|mount|swapon)\b/.test(text)) {
    return "configuration";
  }
  if (/^(ls|lsblk|lscpu|lspci|lsusb|rfkill\s+list|fdisk\s+-l|blkid|findmnt|grep|ping|resolvectl|whoami|man|localectl|ip\s|ps\b|pstree\b|journalctl\b|pacman\s+-Q|cat\b|readlink\b|systemctl\s+show)\b/.test(text)) {
    return "safe-inspection";
  }
  if (/^(Ctrl|F\d+$|u$|q$|PID |\/|@|\[|process_count|new_processes|normal baseline|keep,)/.test(text)) {
    return "reference-example";
  }
  return "normal";
}

const commandSafetyLabels = {
  "safe-inspection": {
    label: "Safe inspection",
    className: "safe-inspection",
    explanation: "This command is meant to read or display information. It should not change disks, accounts, services, or firewall policy by itself."
  },
  configuration: {
    label: "Configuration",
    className: "configuration",
    explanation: "This command edits or creates configuration, mounts filesystems, or changes setup state. Read the file/path and expected result carefully."
  },
  "package-install": {
    label: "Package install",
    className: "package-install",
    explanation: "This command installs packages. It changes installed software but should not erase disks or alter login policy by itself."
  },
  "service-control": {
    label: "Service control",
    className: "service-control",
    explanation: "This command inspects or changes systemd service state. Starting/enabling the wrong service can affect boot, networking, login, or security behavior."
  },
  "disk-write": {
    label: "Disk-write",
    className: "danger",
    explanation: "This command can partition, format, or prepare storage. It can destroy data and requires the Disk identity gate."
  },
  "bootloader-install": {
    label: "Bootloader install",
    className: "danger",
    explanation: "This command installs bootloader files or firmware entries. It requires the Bootloader mode gate."
  },
  "access-change": {
    label: "Access/login change",
    className: "danger",
    explanation: "This command can change passwords, users, sudo, shells, PAM, or login behavior. It requires the Sudo/admin lockout gate."
  },
  "security-privacy": {
    label: "Security-sensitive",
    className: "security",
    explanation: "This command can affect firewall policy, limits, monitoring, process termination, resource control, or restrictions. It requires privacy/permission awareness."
  },
  "reference-example": {
    label: "Reference/example",
    className: "reference",
    explanation: "This is shown as text, a key press, a file line, a placeholder, or a planning example. It is not always a shell command."
  },
  normal: {
    label: "Command",
    className: "normal",
    explanation: "This command does not match a higher-risk category yet. Read the word map, expected result, and failure notes before using it."
  }
};

function commandSafetyMeta(command) {
  const type = commandSafetyType(command);
  return commandSafetyLabels[type] || commandSafetyLabels.normal;
}

function commandSafetyBadge(command) {
  const meta = commandSafetyMeta(command);
  return `<span class="safety-badge safety-${meta.className}">${meta.label}</span>`;
}

function commandDangerClass(safetyType) {
  if (["disk-write", "bootloader-install", "access-change"].includes(safetyType)) {
    return ` command-danger command-danger-${safetyType}`;
  }
  return "";
}

function destructiveCommandWarning(safetyType) {
  if (safetyType === "disk-write") {
    return `
      <section class="danger-command-warning">
        <strong>Destructive storage command.</strong>
        <p>This command can erase, repartition, format, or prepare storage. The user must confirm the exact target disk or partition from real <code>lsblk</code> output before using it.</p>
      </section>
    `;
  }
  if (safetyType === "bootloader-install") {
    return `
      <section class="danger-command-warning">
        <strong>Boot-critical command.</strong>
        <p>This command changes bootloader files or firmware boot entries. The user must confirm UEFI vs BIOS mode and the correct boot partition or disk before using it.</p>
      </section>
    `;
  }
  if (safetyType === "access-change") {
    return `
      <section class="danger-command-warning">
        <strong>Login-critical command.</strong>
        <p>This command can change passwords, users, sudo access, shells, or display-login behavior. The user must keep a tested admin path before using it.</p>
      </section>
    `;
  }
  return "";
}

function bootloaderCommandIssues(command) {
  const text = command.command.trim();
  const issues = [...bootloaderModeGateIssues()];
  if (text.startsWith("bootctl install") && setupProfile.bootMode !== "uefi") {
    issues.push("bootctl install is a UEFI systemd-boot command. It must not be used for a legacy BIOS path.");
  }
  if (text.includes("--target=x86_64-efi") && setupProfile.bootMode !== "uefi") {
    issues.push("GRUB target x86_64-efi is for UEFI mode. It must not be used for a legacy BIOS path.");
  }
  if (text.includes("--target=i386-pc") && setupProfile.bootMode !== "bios") {
    issues.push("GRUB target i386-pc is for legacy BIOS mode. It must not be used for a UEFI path.");
  }
  return [...new Set(issues)];
}

function commandBlockedBySafetyGate(command) {
  const safetyType = commandSafetyType(command);
  if (safetyType === "disk-write") return !diskIdentityGatePassed();
  if (safetyType === "bootloader-install") return !bootloaderModeGatePassed() || bootloaderCommandIssues(command).length > 0;
  if (safetyType === "access-change") return !lockoutSafetyGatePassed();
  if (safetyType === "security-privacy") return !securityPrivacyGatePassed() || (command.command.includes("/etc/security/limits.conf") && !lockoutSafetyGatePassed());
  return false;
}

function blockedCommandReason(command) {
  const safetyType = commandSafetyType(command);
  if (safetyType === "disk-write") {
    return "This command can write to disk, change partitioning, or format storage. Complete the Disk identity gate before treating it as a usable command.";
  }
  if (safetyType === "bootloader-install") {
    const issues = bootloaderCommandIssues(command);
    return `This command installs bootloader files or firmware boot entries. Complete the Bootloader mode gate first.${issues.length ? ` Still blocked: ${issues.join(" ")}` : ""}`;
  }
  if (safetyType === "access-change") {
    const issues = lockoutSafetyGateIssues();
    return `This command can change passwords, users, sudo access, shells, or graphical login behavior. Complete the Sudo/admin lockout gate first.${issues.length ? ` Still blocked: ${issues.join(" ")}` : ""}`;
  }
  if (safetyType === "security-privacy") {
    const issues = securityPrivacyGateIssues();
    const lockoutNote = command.command.includes("/etc/security/limits.conf") && !lockoutSafetyGatePassed() ? " This PAM limits edit can also affect login/session behavior, so complete the Sudo/admin lockout gate too." : "";
    return `This command can affect firewall policy, process limits, monitoring, process termination, resource control, or account restrictions. Complete the Security/privacy gate first.${lockoutNote}${issues.length ? ` Still blocked: ${issues.join(" ")}` : ""}`;
  }
  return "This command is blocked by a safety gate.";
}

function targetDiskReplacement() {
  const targetDisk = getDeviceValue("targetDisk");
  if (!targetDisk || getDeviceUnknown("targetDisk") || !looksLikeWholeDisk(targetDisk)) return null;
  return targetDisk;
}

function replaceWholeDiskExamples(value, targetDisk) {
  return value
    .replace(/\/dev\/sda(?!\d)/g, targetDisk)
    .replace(/\/dev\/nvme0n1(?!p\d)/g, targetDisk);
}

function partitionReplacements() {
  const replacements = [];
  const efiPartition = validMappedPartition("efiPartition");
  const rootPartition = validMappedPartition("rootPartition");
  const swapPartition = validMappedPartition("swapPartition");
  if (efiPartition) replacements.push([/\/dev\/nvme0n1p1\b/g, efiPartition]);
  if (rootPartition) replacements.push([/\/dev\/nvme0n1p2\b/g, rootPartition]);
  if (swapPartition) replacements.push([/\/dev\/nvme0n1p3\b/g, swapPartition]);
  return replacements;
}

function replacePartitionExamples(value) {
  return partitionReplacements().reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), value);
}

function renderPersonalizationNote(hasDiskReplacement, hasPartitionReplacement) {
  if (!hasDiskReplacement && !hasPartitionReplacement) return "";
  const targetDisk = targetDiskReplacement();
  const partitionParts = [];
  const efiPartition = validMappedPartition("efiPartition");
  const rootPartition = validMappedPartition("rootPartition");
  const swapPartition = validMappedPartition("swapPartition");
  if (efiPartition) partitionParts.push(`EFI ${efiPartition}`);
  if (rootPartition) partitionParts.push(`root ${rootPartition}`);
  if (swapPartition) partitionParts.push(`swap ${swapPartition}`);
  return `
    <section class="personalized-command-note">
      <strong>Personalized mapped value</strong>
      <p>
        ${hasDiskReplacement && targetDisk ? `Whole-disk examples were replaced with target disk ${escapeHtml(targetDisk)}. ` : ""}
        ${hasPartitionReplacement ? `Partition examples were replaced with ${escapeHtml(partitionParts.join(", "))}. ` : ""}
        Still verify size, model, transport, serial, mountpoints, and filesystem role before storage-changing commands.
      </p>
    </section>
  `;
}

function renderCommandValue(command) {
  const targetDisk = targetDiskReplacement();
  const afterDisk = targetDisk ? replaceWholeDiskExamples(command.command, targetDisk) : command.command;
  const afterPartitions = replacePartitionExamples(afterDisk);
  const hasDiskReplacement = afterDisk !== command.command;
  const hasPartitionReplacement = afterPartitions !== afterDisk;
  const replaced = afterPartitions;
  const personalized = replaced !== command.command;
  return {
    command: replaced,
    personalized,
    note: renderPersonalizationNote(hasDiskReplacement, hasPartitionReplacement)
  };
}

function renderCommandWords(command, rendered) {
  const targetDisk = targetDiskReplacement();
  return command.words.map(([word, meaning]) => {
    const afterDisk = targetDisk ? replaceWholeDiskExamples(word, targetDisk) : word;
    const shownWord = replacePartitionExamples(afterDisk);
    const extra = shownWord !== word ? ` This was personalized from the example value ${word}.` : "";
    return `<li><code>${escapeHtml(shownWord)}</code>: ${meaning}${extra}</li>`;
  }).join("");
}

function commandTemplate(command) {
  const blocked = commandBlockedBySafetyGate(command);
  const safetyType = commandSafetyType(command);
  const safety = commandSafetyMeta(command);
  const dangerClass = commandDangerClass(safetyType);
  const rendered = renderCommandValue(command);
  if (blocked) {
    return `
      <section class="command-card command-blocked${dangerClass}">
        <div class="command-top">
          <div class="command-title-row">
            <h4>${command.label}</h4>
            ${commandSafetyBadge(command)}
          </div>
          <button class="copy-btn" type="button" disabled>Blocked</button>
        </div>
        ${sourceListTemplate(command.sources, "Official source for this command", true)}
        <section class="blocked-command">
          <strong>Command hidden until safety gate passes</strong>
          <p>This command is classified as <code>${safetyType}</code>. ${blockedCommandReason(command)}</p>
          <p><strong>What to do now:</strong> complete the Safety Profile, fill Device Mapping with exact values, verify the relevant evidence, then check the matching safety gate.</p>
        </section>
        <div class="explain-grid">
          <div class="explain-box">
            <strong>Why this is blocked</strong>
            <p>${command.purpose}</p>
          </div>
          <div class="explain-box">
            <strong>If it fails later</strong>
            <p>${command.fails}</p>
          </div>
        </div>
      </section>
    `;
  }
  return `
    <section class="command-card${dangerClass}">
      <div class="command-top">
        <div class="command-title-row">
          <h4>${command.label}</h4>
          ${commandSafetyBadge(command)}
        </div>
        <button class="copy-btn" type="button" data-copy="${escapeHtml(rendered.command)}">Copy</button>
      </div>
      <p class="command-safety-note">${safety.explanation}</p>
      ${destructiveCommandWarning(safetyType)}
      ${rendered.note}
      ${sourceListTemplate(command.sources, "Official source for this command", true)}
      <pre><code>${escapeHtml(rendered.command)}</code></pre>
      <div class="explain-grid">
        <div class="explain-box">
          <strong>What this command does</strong>
          <p>${command.purpose}</p>
        </div>
        <div class="explain-box">
          <strong>What you should see</strong>
          <p>${command.expected}</p>
        </div>
        <div class="explain-box">
          <strong>If it fails</strong>
          <p>${command.fails}</p>
        </div>
        <div class="explain-box">
          <strong>Command words</strong>
          <ul>
            ${renderCommandWords(command, rendered)}
          </ul>
        </div>
      </div>
    </section>
  `;
}

function sourceListTemplate(sources = [], title = "Official sources", compact = false) {
  if (!sources.length) return "";
  const safeSources = sources.filter(Boolean);
  return `
    <section class="${compact ? "source-list compact" : "source-list"}">
      <h4>${title}</h4>
      <div class="source-links">
        ${safeSources.map((source) => `
          <a href="${source.url}" target="_blank" rel="noreferrer">
            <span>${source.label}</span>
            <small>${source.note}</small>
          </a>
        `).join("")}
      </div>
    </section>
  `;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function updateProgress() {
  const percent = Math.round((completed.size / sections.length) * 100);
  progressLabel.textContent = `${percent}% complete`;
  progressBar.style.width = `${percent}%`;
  localStorage.setItem("completedLessons", JSON.stringify([...completed]));
}

lessonList.addEventListener("click", async (event) => {
  const header = event.target.closest(".lesson-header");
  const copyButton = event.target.closest("[data-copy]");
  const termButton = event.target.closest("[data-term]");

  if (header) {
    const lesson = header.closest(".lesson");
    const isOpen = lesson.classList.toggle("open");
    header.setAttribute("aria-expanded", String(isOpen));
    lesson.querySelector(".lesson-toggle").textContent = isOpen ? "-" : "+";
  }

  if (copyButton) {
    try {
      await navigator.clipboard.writeText(copyButton.dataset.copy);
      copyButton.textContent = "Copied";
    } catch {
      copyButton.textContent = "Select text";
    }
    setTimeout(() => {
      copyButton.textContent = "Copy";
    }, 1200);
  }

  if (termButton) {
    const term = termButton.dataset.term;
    openTermDialog(term);
  }
});

glossaryPanel.addEventListener("click", (event) => {
  const termButton = event.target.closest("[data-term]");
  if (!termButton) return;
  openTermDialog(termButton.dataset.term);
});

lessonList.addEventListener("change", (event) => {
  const checkbox = event.target.closest("[data-complete]");
  if (!checkbox) return;
  const index = Number(checkbox.dataset.complete);
  if (checkbox.checked) {
    completed.add(index);
  } else {
    completed.delete(index);
  }
  updateProgress();
});

sectionNav.addEventListener("click", (event) => {
  const link = event.target.closest("[data-wizard-jump]");
  if (!link) return;
  wizardIndex = Number(link.dataset.wizardJump);
  localStorage.setItem("wizardIndex", String(wizardIndex));
  renderWizard();
});

profileForm.addEventListener("change", () => {
  const nextProfile = {};
  for (const element of profileForm.elements) {
    if (!element.name) continue;
    nextProfile[element.name] = element.value;
  }
  setupProfile = nextProfile;
  safetyGates.diskIdentityConfirmed = false;
  safetyGates.bootloaderModeConfirmed = false;
  safetyGates.lockoutSafetyConfirmed = false;
  safetyGates.securityPrivacyConfirmed = false;
  localStorage.setItem("setupProfile", JSON.stringify(setupProfile));
  localStorage.setItem("safetyGates", JSON.stringify(safetyGates));
  render();
});

deviceForm.addEventListener("input", (event) => {
  const input = event.target.closest("input[type='text']");
  if (!input) return;
  deviceMap[input.name] = {
    ...(deviceMap[input.name] || {}),
    value: input.value
  };
  safetyGates.diskIdentityConfirmed = false;
  safetyGates.bootloaderModeConfirmed = false;
  safetyGates.lockoutSafetyConfirmed = false;
  safetyGates.securityPrivacyConfirmed = false;
  localStorage.setItem("deviceMap", JSON.stringify(deviceMap));
  localStorage.setItem("safetyGates", JSON.stringify(safetyGates));
  render();
});

deviceForm.addEventListener("change", (event) => {
  const checkbox = event.target.closest("input[type='checkbox']");
  if (!checkbox || !checkbox.name.endsWith("__unknown")) return;
  const key = checkbox.name.replace("__unknown", "");
  deviceMap[key] = {
    ...(deviceMap[key] || {}),
    unknown: checkbox.checked,
    value: checkbox.checked ? "" : (deviceMap[key]?.value || "")
  };
  safetyGates.diskIdentityConfirmed = false;
  safetyGates.bootloaderModeConfirmed = false;
  safetyGates.lockoutSafetyConfirmed = false;
  safetyGates.securityPrivacyConfirmed = false;
  localStorage.setItem("deviceMap", JSON.stringify(deviceMap));
  localStorage.setItem("safetyGates", JSON.stringify(safetyGates));
  render();
});

profileSummary.addEventListener("change", (event) => {
  const gate = event.target.closest("[data-gate]");
  if (!gate) return;
  if (gate.dataset.gate === "diskIdentity") {
    safetyGates.diskIdentityConfirmed = gate.checked && diskIdentityGateIssues().length === 0;
    safetyGates.diskIdentitySignature = safetyGates.diskIdentityConfirmed ? diskIdentitySignature() : "";
  }
  if (gate.dataset.gate === "bootloaderMode") {
    safetyGates.bootloaderModeConfirmed = gate.checked && bootloaderModeGateIssues().length === 0;
    safetyGates.bootloaderModeSignature = safetyGates.bootloaderModeConfirmed ? bootloaderModeSignature() : "";
  }
  if (gate.dataset.gate === "lockoutSafety") {
    safetyGates.lockoutSafetyConfirmed = gate.checked && lockoutSafetyGateIssues().length === 0;
    safetyGates.lockoutSafetySignature = safetyGates.lockoutSafetyConfirmed ? lockoutSafetySignature() : "";
  }
  if (gate.dataset.gate === "securityPrivacy") {
    safetyGates.securityPrivacyConfirmed = gate.checked && securityPrivacyGateIssues().length === 0;
    safetyGates.securityPrivacySignature = safetyGates.securityPrivacyConfirmed ? securityPrivacySignature() : "";
  }
  localStorage.setItem("safetyGates", JSON.stringify(safetyGates));
  render();
});

wizardPrev.addEventListener("click", () => {
  wizardIndex = Math.max(0, wizardIndex - 1);
  localStorage.setItem("wizardIndex", String(wizardIndex));
  renderWizard();
  document.querySelector(".wizard").scrollIntoView({ behavior: "smooth", block: "start" });
});

wizardNext.addEventListener("click", () => {
  wizardIndex = Math.min(sections.length - 1, wizardIndex + 1);
  localStorage.setItem("wizardIndex", String(wizardIndex));
  renderWizard();
  document.querySelector(".wizard").scrollIntoView({ behavior: "smooth", block: "start" });
});

wizardUnderstand.addEventListener("click", () => {
  completed.add(wizardIndex);
  updateProgress();
  render();
});

search.addEventListener("input", render);
closeDialog.addEventListener("click", () => dialog.close());

render();
