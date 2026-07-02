# VM Run Log

This file records actual VM validation runs. Do not mark a VM path complete in `WALKTHROUGH_CHECKLIST.md` unless the run boots without the ISO and the observed output matches the guide or mismatches are documented.

## Current Local VM Readiness

Date checked: 2026-07-01

Available locally:

```text
QEMU: /usr/bin/qemu-system-x86_64
QEMU version: 11.0.1
UEFI firmware: /usr/share/edk2/x64/OVMF_CODE.4m.fd
UEFI vars template: /usr/share/edk2/x64/OVMF_VARS.4m.fd
Arch ISO: /home/ethan/ARCH-AI/iso/archlinux-2026.07.01-x86_64.iso
Arch ISO SHA256: e86295dc0bdf9b85a5a9256810c553239689d2ae8e80eeec81b4e2e910d8a6c0
VM disk: /home/ethan/ARCH-AI/vm/arch-uefi-systemdboot.qcow2
VM disk virtual size: 32 GiB
UEFI vars file: /home/ethan/ARCH-AI/vm/OVMF_VARS-arch-uefi-systemdboot.fd
```

Missing locally:

```text
KVM acceleration: /dev/kvm was not available in this environment.
```

Status:

```text
UEFI/systemd-boot VM run: pending
Reason: QEMU reached the Arch UEFI boot menu, but the default ISO boot did not expose a usable live shell through the serial-only console. A graphical VM console or a serial-enabled boot parameter path is needed to complete the install test.
```

## Completed Local Preparation

Official source checked:

```text
Arch download page current release: 2026.07.01
ISO size reported by Arch: about 1.5 GB
Official SHA256: e86295dc0bdf9b85a5a9256810c553239689d2ae8e80eeec81b4e2e910d8a6c0
```

Downloaded:

```text
iso/archlinux-2026.07.01-x86_64.iso
```

Verified:

```text
sha256sum iso/archlinux-2026.07.01-x86_64.iso
e86295dc0bdf9b85a5a9256810c553239689d2ae8e80eeec81b4e2e910d8a6c0  iso/archlinux-2026.07.01-x86_64.iso
```

Prepared VM files:

```text
qemu-img create -f qcow2 vm/arch-uefi-systemdboot.qcow2 32G
cp /usr/share/edk2/x64/OVMF_VARS.4m.fd vm/OVMF_VARS-arch-uefi-systemdboot.fd
```

Smoke test result:

```text
QEMU started with OVMF UEFI firmware.
QEMU loaded the Arch ISO as a UEFI DVD-ROM.
The Arch boot menu appeared over serial output.
The selected entry was "Arch Linux install medium (x86_64, UEFI)".
The boot menu countdown completed.
After the countdown, no usable live shell appeared on the serial-only console.
The QEMU process was stopped with Ctrl+C.
```

What this proves:

```text
The ISO path is valid.
The ISO checksum is valid.
The OVMF firmware path is valid.
The writable OVMF vars file is valid enough for QEMU to start.
The qcow2 disk path is valid.
QEMU can boot the Arch ISO to the UEFI boot menu.
```

What this does not prove yet:

```text
The guide's partitioning commands match real output.
pacstrap has not been run.
systemd-boot has not been installed.
The VM has not booted from the installed disk.
Networking inside the live ISO has not been verified.
Firefox and audio have not been verified.
```

Next practical test path:

```text
Use a graphical QEMU/virt-manager/GNOME Boxes console, or boot the ISO with explicit serial console kernel parameters, then complete the VM_TEST_PLAN.md UEFI/systemd-boot run.
```

## ISO Placement

Put the official Arch ISO in this repo or another known local path, for example:

```text
/home/ethan/ARCH-AI/iso/archlinux-2026.07.01-x86_64.iso
```

The ISO file is the bootable installer image. It is not the installed system. QEMU will boot from it first, then the walkthrough installs Arch onto a separate virtual disk file.

## Create A Fresh UEFI Test Disk

Use a fresh disk file for the UEFI/systemd-boot test:

```bash
qemu-img create -f qcow2 /home/ethan/ARCH-AI/vm/arch-uefi-systemdboot.qcow2 32G
```

Explanation:

- `qemu-img` is QEMU's disk-image tool.
- `create` means make a new virtual disk image.
- `-f qcow2` chooses QEMU's copy-on-write disk image format.
- `/home/ethan/ARCH-AI/vm/arch-uefi-systemdboot.qcow2` is the virtual disk file.
- `32G` means the virtual disk can grow up to 32 GiB.

## Copy Fresh UEFI Variables

Use a private copy of OVMF variables for this VM:

```bash
cp /usr/share/edk2/x64/OVMF_VARS.4m.fd /home/ethan/ARCH-AI/vm/OVMF_VARS-arch-uefi-systemdboot.fd
```

Explanation:

- `cp` copies a file.
- `/usr/share/edk2/x64/OVMF_VARS.4m.fd` is the template UEFI variable storage.
- `/home/ethan/ARCH-AI/vm/OVMF_VARS-arch-uefi-systemdboot.fd` is the VM-specific writable copy.
- UEFI boot entries may be written into this vars file during bootloader installation.

## Launch UEFI/systemd-boot Test VM

Template command:

```bash
qemu-system-x86_64 \
  -enable-kvm \
  -machine q35 \
  -cpu host \
  -smp 2 \
  -m 4096 \
  -drive if=pflash,format=raw,readonly=on,file=/usr/share/edk2/x64/OVMF_CODE.4m.fd \
  -drive if=pflash,format=raw,file=/home/ethan/ARCH-AI/vm/OVMF_VARS-arch-uefi-systemdboot.fd \
  -drive file=/home/ethan/ARCH-AI/vm/arch-uefi-systemdboot.qcow2,format=qcow2,if=virtio \
  -cdrom /home/ethan/ARCH-AI/iso/archlinux-2026.07.01-x86_64.iso \
  -boot d \
  -nic user,model=virtio-net-pci \
  -device intel-hda \
  -device hda-duplex
```

Explanation:

- `qemu-system-x86_64` starts a 64-bit x86 virtual machine.
- `-enable-kvm` uses hardware acceleration when available.
- `-machine q35` uses a modern PC chipset model.
- `-cpu host` exposes host CPU features to the guest.
- `-smp 2` gives the VM 2 virtual CPUs.
- `-m 4096` gives the VM 4096 MiB memory.
- The first `-drive if=pflash` line loads read-only UEFI firmware code.
- The second `-drive if=pflash` line gives the VM writable UEFI variables.
- The qcow2 `-drive` is the blank target disk where Arch will be installed.
- `-cdrom` points to the Arch ISO.
- `-boot d` boots the ISO first.
- `-nic user,model=virtio-net-pci` gives NAT Ethernet networking.
- `-device intel-hda` and `-device hda-duplex` expose a simple virtual audio device for later audio checks.

## UEFI/systemd-boot Run Template

Fill this during the real run:

```text
Test ID: VM-UEFI-SDBOOT
Date:
VM software: QEMU
QEMU version:
Arch ISO file:
Firmware: UEFI OVMF
Disk image:
Disk size: 32 GiB
Network mode: NAT Ethernet
Network interface shown by ip link:
Disk name shown by lsblk:
EFI partition:
Root partition:
Swap partition:
Bootloader path: systemd-boot

Pre-install output:
- whoami:
- timedatectl:
- ip link:
- lsblk -o NAME,SIZE,TYPE,MODEL,TRAN,SERIAL,MOUNTPOINTS:
- lsblk -f:

Network/DNS output:
- ping -c 3 1.1.1.1:
- ping -c 3 archlinux.org:

Install checkpoints:
- pacstrap result:
- genfstab result:
- arch-chroot entered:
- /boot mounted correctly:
- root UUID used:
- bootctl install:
- bootctl list:
- bootctl status:

First boot:
- ISO removed/ejected:
- VM boots from installed disk:
- login works:
- findmnt /:
- findmnt /boot:
- cat /etc/fstab:
- systemctl status NetworkManager:
- ping -c 3 1.1.1.1:
- ping -c 3 archlinux.org:
- sudo -v:

Desktop/Firefox/audio, if tested:
- graphical login:
- Firefox launch:
- systemctl --user status pipewire:
- systemctl --user status wireplumber:
- pactl info:

Commands that matched the guide:
Commands that differed:
Unexpected output:
Failure point:
Fix needed in app:
Fix needed in documentation:
Final result:
```

## Checklist Rule

Only after a completed run with successful first boot should this checklist item be marked complete:

```text
Run the UEFI/systemd-boot path in a VM.
```

Until then, it remains pending.
