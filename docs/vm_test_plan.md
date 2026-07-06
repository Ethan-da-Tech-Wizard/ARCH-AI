# Clean Arch VM Test Plan

This plan verifies the walkthrough against a clean virtual machine before calling the guide production-quality.

The goal is not to prove every possible laptop, Mac, Wi-Fi card, GPU, or audio device works. The goal is to prove that the app's default beginner path, bootloader branches, networking checks, package installs, and first-boot assumptions match real Arch behavior in a controlled environment.

## Test Rules

1. Use a fresh VM for each bootloader path.
2. Do not reuse a disk from a previous test.
3. Record the exact VM settings before install.
4. Follow the app, not memory.
5. When real output differs from the app, record the mismatch before fixing it.
6. Do not mark a path passed unless the VM boots without the ISO.
7. Keep screenshots or copied terminal output for failures.

## Minimum VM Matrix

Run these three installs:

| Test | Firmware | Bootloader path | Disk layout | Network |
| --- | --- | --- | --- | --- |
| VM-UEFI-SDBOOT | UEFI | systemd-boot | GPT, EFI + root, optional swap | NAT Ethernet |
| VM-UEFI-GRUB | UEFI | GRUB UEFI | GPT, EFI + root, optional swap | NAT Ethernet |
| VM-BIOS-GRUB | Legacy BIOS | GRUB BIOS | MBR or GPT with BIOS boot partition | NAT Ethernet |

KISS default:

- Start with NAT Ethernet.
- Test Wi-Fi instructions as a documented limitation unless the VM platform can expose a real Wi-Fi adapter to the guest.
- Use one virtual disk unless testing multi-disk behavior.

## Recommended VM Settings

Use any VM tool that can boot the Arch ISO and switch between UEFI and BIOS mode. Examples include GNOME Boxes, VirtualBox, QEMU/KVM, VMware, or UTM.

Recommended baseline:

```text
CPU: 2 cores
Memory: 4096 MiB
Disk: 32 GiB fresh virtual disk
Firmware UEFI test: UEFI enabled
Firmware BIOS test: legacy BIOS enabled
Network: NAT
Network adapter: virtio, e1000, or the VM default
Audio: enabled if available
Display: default VM display
ISO: current official Arch Linux ISO
```

Record the actual settings used:

```text
VM name:
VM software:
Arch ISO date/file:
Firmware mode:
Disk size:
Disk bus/model shown by lsblk:
Network mode:
Network interface name:
Audio device exposed:
Desktop path tested:
Bootloader path tested:
```

## Pre-Install Checkpoints

After booting the ISO, record:

```text
whoami
timedatectl
ip link
lsblk -o NAME,SIZE,TYPE,MODEL,TRAN,SERIAL,MOUNTPOINTS
lsblk -f
```

Expected:

- `whoami` prints `root`.
- `timedatectl` shows the system clock and time sync state.
- `ip link` shows at least loopback and one network interface.
- `lsblk` shows the ISO media and the fresh virtual disk.
- The target virtual disk has no mountpoints that look like a host OS disk.

Stop if the VM exposes host disks, passthrough disks, or shared disks that should not be erased.

## Network/DNS Checkpoints

Before `pacstrap`, verify network layers separately:

```text
ip link
ping -c 3 1.1.1.1
ping -c 3 archlinux.org
```

Meaning:

- `ip link` lists network interfaces.
- `ping -c 3 1.1.1.1` tests raw IP connectivity without DNS.
- `ping -c 3 archlinux.org` tests DNS plus reachability.

Pass:

- IP ping works.
- Domain ping works.
- Package downloads later work.

Fail notes:

- If IP ping fails, fix VM networking first.
- If IP ping works but domain ping fails, investigate DNS before blaming pacman or Firefox.

## UEFI/systemd-boot Test

VM settings:

```text
Firmware: UEFI
Disk: fresh 32 GiB virtual disk
Partition table: GPT
Bootloader: systemd-boot
ESP mount point: /mnt/boot during install, /boot inside chroot
```

Required checkpoints:

```text
ls /sys/firmware/efi/efivars
findmnt /boot
ls -lh /boot/vmlinuz-linux /boot/initramfs-linux.img
blkid -s UUID -o value ROOT_PARTITION
bootctl install
bootctl list
bootctl status
```

Pass:

- UEFI variables exist.
- `/boot` is the EFI System Partition for this simple path.
- Kernel and initramfs exist.
- `arch.conf` uses the real root filesystem UUID.
- `bootctl list` shows the Arch entry.
- VM boots without the ISO.

Fail notes:

- If UEFI variables are missing, the VM did not boot in UEFI mode.
- If `/boot` is not mounted, systemd-boot files may be written to the wrong filesystem.
- If root UUID is wrong, boot can fail even when bootloader installation succeeded.

## UEFI GRUB Test

VM settings:

```text
Firmware: UEFI
Disk: fresh 32 GiB virtual disk
Partition table: GPT
Bootloader: GRUB UEFI
ESP mount point: /mnt/boot during install, /boot inside chroot
```

Required checkpoints:

```text
ls /sys/firmware/efi/efivars
findmnt /boot
pacman -S grub efibootmgr
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB
grub-mkconfig -o /boot/grub/grub.cfg
grep -n "menuentry" /boot/grub/grub.cfg
efibootmgr
```

Pass:

- UEFI variables exist.
- GRUB installs successfully for `x86_64-efi`.
- `grub.cfg` contains at least one Arch menu entry.
- `efibootmgr` shows a GRUB boot entry or the VM successfully boots through the fallback path.
- VM boots without the ISO.

Fail notes:

- If `efibootmgr` cannot access firmware variables, confirm UEFI mode.
- If GRUB cannot find the EFI directory, confirm `/boot` is the ESP for this path.
- If no menu entries appear, confirm kernel/initramfs files exist.

## Legacy BIOS GRUB Test

VM settings:

```text
Firmware: legacy BIOS
Disk: fresh 32 GiB virtual disk
Partition table: MBR for simplest BIOS test, or GPT with a BIOS boot partition for the GPT BIOS branch
Bootloader: GRUB BIOS
GRUB target: whole disk, not partition
```

Required checkpoints:

```text
ls /sys/firmware/efi/efivars
lsblk -o NAME,SIZE,TYPE,MODEL,MOUNTPOINTS
fdisk -l TARGET_DISK
pacman -S grub
grub-install --target=i386-pc TARGET_DISK
grub-mkconfig -o /boot/grub/grub.cfg
grep -n "menuentry" /boot/grub/grub.cfg
```

Expected:

- `ls /sys/firmware/efi/efivars` should fail or report missing path in BIOS mode.
- `TARGET_DISK` is a whole disk such as `/dev/sda`, `/dev/vda`, or `/dev/nvme0n1`.
- `TARGET_DISK` is not a partition such as `/dev/sda1`.

Pass:

- GRUB installs to the whole disk.
- `grub.cfg` contains at least one Arch menu entry.
- VM boots without the ISO.

Fail notes:

- If the VM is actually UEFI, do not use the BIOS path.
- If using GPT and GRUB complains about embedding, confirm a BIOS boot partition exists.

## First Boot Checkpoints

After removing/ejecting the ISO and booting the installed system:

```text
whoami
uname -r
findmnt /
findmnt /boot
cat /etc/fstab
systemctl status NetworkManager
ip addr
ping -c 3 1.1.1.1
ping -c 3 archlinux.org
sudo -v
```

Pass:

- Login works.
- Root filesystem is mounted.
- Boot filesystem is mounted if expected.
- `fstab` contains expected root and boot entries.
- NetworkManager status matches the guide's expected path.
- IP connectivity and DNS work.
- Normal user can use `sudo` if that path was configured.

## Desktop, Firefox, And Audio Checks

If testing the beginner desktop path:

```text
sudo pacman -S xorg-server xfce4 lightdm lightdm-gtk-greeter firefox pipewire pipewire-pulse wireplumber pavucontrol
sudo systemctl enable lightdm
sudo systemctl start lightdm
echo $XDG_CURRENT_DESKTOP
which firefox nano xfce4-terminal pavucontrol
firefox
systemctl --user status pipewire
systemctl --user status wireplumber
pactl info
pactl list short sinks
pactl list short sources
```

Pass:

- Graphical login appears.
- Xfce session starts.
- Firefox launches.
- PipeWire and WirePlumber user services are active or explainable by real output.
- `pactl` can show server/device information when audio packages and session are active.

Hardware-dependent:

- Speaker output may not be meaningful in every VM.
- Microphone testing may not be available unless the VM exposes a microphone.
- Mark missing VM audio hardware as environment-specific, not automatically a guide failure.

## What To Record For Each VM Run

Use this template:

```text
Test ID:
Date:
VM software:
Arch ISO:
Firmware:
Bootloader path:
Disk layout:
Network mode:
Commands that matched the guide:
Commands that differed:
Unexpected output:
Failure point:
Fix needed in app:
Fix needed in documentation:
Final result:
```

## Pass/Fail Standard

A bootloader path passes only when:

1. The install followed the app's visible branch.
2. The VM boots without the ISO.
3. The expected bootloader appears.
4. Network and DNS work after first boot.
5. Any mismatch is either fixed or documented.

The whole guide is not production-quality until:

- UEFI/systemd-boot path passes.
- GRUB UEFI or GRUB BIOS path passes, depending on chosen release scope.
- Network/DNS checks match real output.
- Firefox installation and launch are verified.
- Audio commands are verified or clearly marked VM/hardware-dependent.
