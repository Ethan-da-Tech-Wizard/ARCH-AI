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
UEFI/systemd-boot VM run: complete
Result: QEMU reached the Arch UEFI boot menu, the ISO was booted over serial with console=ttyS0,115200, Arch was installed to the qcow2 disk, and the VM booted successfully without the ISO.
UEFI/GRUB VM run: complete
Result: QEMU loaded the installed GRUB UEFI boot entry from the qcow2 disk without the ISO, GRUB displayed the Arch menu over serial, and the installed system reached login.
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
Audible sound playback has not been verified.
Legacy BIOS GRUB has not been verified.
```

Next practical test path:

```text
Use the same VM method for deeper audio playback checks, or create a separate fresh disk for legacy BIOS GRUB validation.
```

## Finished UEFI/systemd-boot Run

Test ID: VM-UEFI-SDBOOT

Date: 2026-07-02

VM software: QEMU

QEMU version: 11.0.1

Arch ISO file: `iso/archlinux-2026.07.01-x86_64.iso`

Firmware: UEFI OVMF

Disk image: `vm/arch-uefi-systemdboot.qcow2`

Disk size: 32 GiB

Network mode: QEMU user-mode NAT Ethernet

Network interface shown by `ip link`: `enp0s2`

Disk name shown by `lsblk`: `vda`

EFI partition: `/dev/vda1`, 512 MiB, FAT32, mounted at `/boot`

Root partition: `/dev/vda2`, 31.5 GiB, ext4, mounted at `/`

Swap partition: not used in this VM run

Bootloader path: systemd-boot

Serial console note:

```text
The Arch ISO boot entry was edited at the UEFI systemd-boot menu.
The kernel command line was given console=ttyS0,115200 so the live ISO shell was visible through QEMU serial output.
The installed systemd-boot entry also includes console=ttyS0,115200.
```

Pre-install output:

```text
whoami:
root

timedatectl:
Local time: Thu 2026-07-02 07:21:54 UTC
Universal time: Thu 2026-07-02 07:21:54 UTC
RTC time: Thu 2026-07-02 07:21:54
Time zone: UTC (UTC, +0000)
System clock synchronized: yes
NTP service: active
RTC in local TZ: no

ip link:
1: lo: <LOOPBACK,UP,LOWER_UP>
2: enp0s2: <BROADCAST,MULTICAST,UP,LOWER_UP>
   link/ether 52:54:00:12:34:56
   altname enx525400123456

lsblk -o NAME,SIZE,TYPE,MODEL,TRAN,SERIAL,MOUNTPOINTS:
NAME    SIZE TYPE MODEL        TRAN   SERIAL  MOUNTPOINTS
loop0 999.4M loop                             /run/archiso/airootfs
sr0     1.5G rom  QEMU DVD-ROM sata   QM00005 /run/archiso/bootmnt
vda      32G disk              virtio

lsblk -f:
NAME FSTYPE FSVER LABEL       UUID                                 FSAVAIL FSUSE% MOUNTPOINTS
loop0 squash 4.0                                                          0   100% /run/archiso/airootfs
sr0  iso966 Jolie ARCH_202607 2026-07-01-16-36-20-00                     0   100% /run/archiso/bootmnt
vda
```

Network/DNS output:

```text
ping -c 3 1.1.1.1:
3 packets transmitted, 3 received, 0% packet loss
rtt min/avg/max/mdev = 24.166/36.584/55.111/13.351 ms

ping -c 3 archlinux.org:
PING archlinux.org (209.126.35.79)
3 packets transmitted, 3 received, 0% packet loss
rtt min/avg/max/mdev = 26.961/48.187/88.003/28.174 ms
```

Partition and mount output:

```text
sgdisk -Z /dev/vda:
GPT data structures destroyed! You may now partition the disk using fdisk or other utilities.

sgdisk -n 1:0:+512M -t 1:ef00 -c 1:'EFI System' -n 2:0:0 -t 2:8300 -c 2:'Arch root' /dev/vda:
The operation has completed successfully.

lsblk -o NAME,SIZE,TYPE,FSTYPE,MOUNTPOINTS /dev/vda:
NAME    SIZE TYPE FSTYPE MOUNTPOINTS
vda      32G disk
├─vda1  512M part
└─vda2 31.5G part

mkfs.fat -F 32 /dev/vda1:
mkfs.fat 4.2 (2021-01-31)

mkfs.ext4 -F /dev/vda2:
Filesystem UUID: 0892e7ba-9227-4d12-b2bc-71382a9409e4

findmnt /mnt:
TARGET SOURCE    FSTYPE OPTIONS
/mnt   /dev/vda2 ext4   rw,relatime

findmnt /mnt/boot:
TARGET    SOURCE    FSTYPE OPTIONS
/mnt/boot /dev/vda1 vfat   rw,relatime,fmask=0022,dmask=0022,codepage=437,iocharset=ascii
```

Install checkpoints:

```text
pacstrap result:
pacstrap -K /mnt base linux linux-firmware nano networkmanager sudo completed successfully.
175 packages were installed.
Total Download Size: 673.22 MiB
Total Installed Size: 1139.82 MiB
pacstrap runtime: 3:36.45

genfstab result:
# /dev/vda2
UUID=0892e7ba-9227-4d12-b2bc-71382a9409e4 /     ext4 rw,relatime 0 1

# /dev/vda1
UUID=1BDA-41B0 /boot vfat rw,relatime,fmask=0022,dmask=0022,codepage=437,iocharset=ascii,shortname=mixed,utf8,errors=remount-ro 0 2

arch-chroot entered:
Prompt changed to [root@archiso /]#

/boot mounted correctly:
TARGET SOURCE FSTYPE OPTIONS
/boot  /dev/vda1 vfat rw,relatime,fmask=0022,dmask=0022,codepage=437,iocharset=ascii

root UUID used:
0892e7ba-9227-4d12-b2bc-71382a9409e4

NetworkManager:
systemctl enable NetworkManager
systemctl is-enabled NetworkManager
enabled

normal user:
archuser was created with UID 1000 and added to wheel.
%wheel ALL=(ALL:ALL) ALL was enabled in /etc/sudoers.
```

Bootloader checkpoints:

```text
/boot/loader/loader.conf:
default arch.conf
timeout 5
console-mode keep
editor no

/boot/loader/entries/arch.conf:
title Arch Linux
linux /vmlinuz-linux
initrd /initramfs-linux.img
options root=UUID=0892e7ba-9227-4d12-b2bc-71382a9409e4 rw console=ttyS0,115200

bootctl install:
Copied /usr/lib/systemd/boot/efi/systemd-bootx64.efi to /boot/EFI/systemd/systemd-bootx64.efi.
Copied /usr/lib/systemd/boot/efi/systemd-bootx64.efi to /boot/EFI/BOOT/BOOTX64.EFI.
Random seed file /boot/loader/random-seed successfully written.
Not booted with EFI or running in a container, skipping EFI variable modifications.

bootctl list:
title: Arch Linux (default)
id: arch.conf
linux: /boot/vmlinuz-linux
initrd: /boot/initramfs-linux.img
options: root=UUID=0892e7ba-9227-4d12-b2bc-71382a9409e4 rw console=ttyS0,115200

bootctl status:
Available Boot Loaders on ESP:
/boot/EFI/systemd/systemd-bootx64.efi
/boot/EFI/BOOT/BOOTX64.EFI
Default Boot Loader Entry: Arch Linux
```

First boot:

```text
ISO removed/ejected:
QEMU was relaunched without -cdrom and without -boot d.

VM boots from installed disk:
Firmware loaded Boot0003 "UEFI Misc Device".
systemd-boot displayed "Arch Linux".
Kernel mounted root UUID 0892e7ba-9227-4d12-b2bc-71382a9409e4.
Installed system reached "archtest login:" on ttyS0.

login works:
Logged in as archuser.
whoami returned archuser.

findmnt /:
TARGET SOURCE    FSTYPE OPTIONS
/      /dev/vda2 ext4   rw,relatime

findmnt /boot:
TARGET SOURCE FSTYPE OPTIONS
/boot  /dev/vda1 vfat   rw,relatime,fmask=0022,dmask=0022,codepage=437,iocharset=ascii

cat /etc/fstab:
# /dev/vda2
UUID=0892e7ba-9227-4d12-b2bc-71382a9409e4 /     ext4 rw,relatime 0 1

# /dev/vda1
UUID=1BDA-41B0 /boot vfat rw,relatime,fmask=0022,dmask=0022,codepage=437,iocharset=ascii,shortname=mixed,utf8,errors=remount-ro 0 2

systemctl status NetworkManager:
Loaded: loaded; enabled
Active: active (running)
Main PID: 283 (NetworkManager)

ip addr show enp0s2:
enp0s2: <BROADCAST,MULTICAST,UP,LOWER_UP>
inet 10.0.2.15/24

ping -c 3 1.1.1.1:
3 packets transmitted, 3 received, 0% packet loss
rtt min/avg/max/mdev = 18.179/19.384/21.378/1.420 ms

ping -c 3 archlinux.org:
PING archlinux.org (209.126.35.79)
3 packets transmitted, 3 received, 0% packet loss
rtt min/avg/max/mdev = 32.167/63.427/84.771/22.591 ms

sudo -v:
sudo displayed the normal first-use warning and accepted the archuser password.
Command exited successfully.
```

Desktop/Firefox/audio:

```text
graphical login: PASS. LightDM GTK greeter appeared at 1280x800 with archuser selected.
Xfce session: PASS. Login as archuser opened the Xfce desktop with panel, launcher, Home icon, File System icon, and default Xfce wallpaper.
Firefox launch: PASS. Firefox opened in Xfce and loaded https://archlinux.org.
systemctl --user status pipewire: PASS. pipewire.service was active (running).
systemctl --user status wireplumber: PASS. wireplumber.service was active (running).
pactl info: PASS. Server Name reported PulseAudio (on PipeWire 1.6.7).
pactl list short sinks: PASS. QEMU HDA analog-stereo sink was listed.
pactl list short sources: PASS. QEMU HDA analog-stereo input and monitor sources were listed.
audible playback: not tested.
```

Desktop test-harness note:

```text
The original archuser password was not recorded in this repository.
A test-only password reset was performed from the Arch ISO recovery environment:
- mounted /dev/vda2 at /mnt
- mounted /dev/vda1 at /mnt/boot
- verified archuser existed with UID 1000
- ran chpasswd for archuser
- passwd -S archuser reported password status P on 2026-07-02

This did not change the walkthrough commands being validated. It only made the disposable VM account accessible for the LightDM/Xfce/Firefox test.
```

Commands that matched the guide:

```text
Disk identity checks, EFI check, partition creation, mkfs, mount, pacstrap, genfstab, arch-chroot, locale, hostname, user account, NetworkManager enablement, systemd-boot entry creation, first boot mount checks, NetworkManager status, IP ping, DNS ping, sudo validation, desktop package installation, LightDM enablement, graphical login, Xfce session startup, Firefox launch, PipeWire/WirePlumber status checks, and pactl diagnostics matched the intended UEFI/systemd-boot path.
```

Commands that differed:

```text
The VM used -accel tcg instead of -enable-kvm because /dev/kvm was unavailable.
The ISO was booted over serial by editing the Arch ISO boot entry and adding console=ttyS0,115200.
The installed boot entry also includes console=ttyS0,115200 so the installed system is visible over serial.
The first attempt to write /boot/loader/loader.conf happened before /boot/loader existed. The file was rewritten after bootctl install created the directory.
bootctl install reported that EFI variable modifications were skipped from the chroot, but it installed both the normal systemd path and fallback /boot/EFI/BOOT/BOOTX64.EFI. The VM booted from the installed disk successfully.
```

Unexpected output:

```text
The Arch ISO boot showed one failed systemd-loop unit for attaching /sys/devices/.../block/sr0 to loopback. The ISO still mounted /dev/sr0 successfully and reached the live root shell.
bootctl warned that the FAT32 /boot mount is world-accessible for the random seed file. This is expected for the simple ESP-mounted-at-/boot layout, but should be documented as a note for future hardening choices.
```

Failure point:

```text
None in the finished run.
```

Fix needed in app:

```text
Add a serial-console VM note for automated/headless validation:
- live ISO boot parameter: console=ttyS0,115200
- installed systemd-boot options line includes: console=ttyS0,115200

Add a small ordering note:
- bootctl install creates /boot/loader if it does not already exist
- if writing loader.conf before bootctl install, create /boot/loader first
```

Fix needed in documentation:

```text
Document that bootctl can install fallback EFI files even when EFI variable writes are skipped inside a chroot, and that the real proof is a successful boot without the ISO.
Keep audible playback marked as untested unless a future VM or hardware run actually plays and confirms sound.
```

Final result:

```text
PASS. The UEFI/systemd-boot VM installed Arch, shut down, relaunched without the ISO, booted from the installed qcow2 disk, logged in as archuser, mounted / and /boot correctly, ran NetworkManager, resolved DNS, reached archlinux.org, validated sudo, installed Xorg/Xfce/LightDM/Firefox/PipeWire packages, showed the LightDM graphical login, started an Xfce session, launched Firefox to archlinux.org, and exposed PipeWire audio sink/source diagnostics through pactl.
```

## Finished UEFI/GRUB Run

Test ID: VM-UEFI-GRUB

Date: 2026-07-02

VM software: QEMU

QEMU version: 11.0.1

Arch ISO file: `iso/archlinux-2026.07.01-x86_64.iso`

Firmware: UEFI OVMF

Disk image: `vm/arch-uefi-grub.qcow2`

Disk size: 32 GiB

UEFI vars file: `vm/OVMF_VARS-arch-uefi-grub.fd`

Network mode: QEMU user-mode NAT Ethernet

Bootloader path: GRUB UEFI

Acceleration: TCG software emulation; `/dev/kvm` was unavailable in this environment.

Install layout:

```text
Disk: /dev/vda
EFI system partition: /dev/vda1, 512 MiB, vfat, mounted at /mnt/boot during install and /boot after first boot
Root partition: /dev/vda2, ext4, mounted at /mnt during install and / after first boot
Swap partition: not used in this VM run
```

Important VM-specific choices:

```text
GRUB_CMDLINE_LINUX_DEFAULT="console=ttyS0,115200"
GRUB_TERMINAL_OUTPUT="console serial"
GRUB_SERIAL_COMMAND="serial --speed=115200 --unit=0 --word=8 --parity=no --stop=1"
serial-getty@ttyS0.service enabled
```

These serial settings were used so the headless QEMU test could show GRUB, kernel boot output, and login over the terminal. They are not required for a normal graphical desktop install.

Install commands and observed results:

```text
ls /sys/firmware/efi/efivars
Result: UEFI variables existed.

lsblk -o NAME,SIZE,TYPE,FSTYPE,MOUNTPOINTS
Result before partitioning: /dev/vda existed as a blank 32 GiB disk.

sgdisk --zap-all /dev/vda
sgdisk -n 1:0:+512M -t 1:ef00 -c 1:EFI /dev/vda
sgdisk -n 2:0:0 -t 2:8300 -c 2:root /dev/vda
partprobe /dev/vda
mkfs.fat -F32 /dev/vda1
mkfs.ext4 -F /dev/vda2
mount /dev/vda2 /mnt
mkdir -p /mnt/boot
mount /dev/vda1 /mnt/boot

Result after mounting:
/dev/vda1 vfat mounted at /mnt/boot
/dev/vda2 ext4 mounted at /mnt

pacstrap -K /mnt base linux linux-firmware nano networkmanager sudo grub efibootmgr
Result: packages installed and initramfs generated successfully.

genfstab -U /mnt >> /mnt/etc/fstab
Result: / and /boot were written by UUID.

locale-gen
Result: en_US.UTF-8 generated.

systemctl enable NetworkManager
Result: NetworkManager service enabled.

grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB
Result: Installation finished. No error reported.

grub-mkconfig -o /boot/grub/grub.cfg
Result: Arch Linux menu entry generated.

grep -n "menuentry" /boot/grub/grub.cfg
Result: Arch Linux, Advanced options, and UEFI Firmware Settings menu entries existed.

efibootmgr
Result: Boot0002* GRUB existed and BootOrder started with 0002.
```

First boot without ISO:

```text
QEMU launched without -cdrom.
OVMF loaded Boot0002 "GRUB" from \EFI\GRUB\grubx64.efi.
GRUB displayed version 2:2.14-1.
GRUB displayed the Arch Linux menu.
GRUB loaded /boot/vmlinuz-linux and /boot/initramfs-linux.img.
The installed system reached archgrub login on ttyS0.
```

Installed-system verification:

```text
whoami
archuser

hostnamectl --static
archgrub

findmnt /
/dev/vda2 ext4 mounted at /

findmnt /boot
/dev/vda1 vfat mounted at /boot

cat /etc/fstab
UUID=86c1c8f4-46d8-45c5-9554-c098dd17f4f4 / ext4 rw,relatime 0 1
UUID=3EE9-49C1 /boot vfat rw,relatime,fmask=0022,dmask=0022,codepage=437,iocharset=ascii,shortname=mixed,utf8,errors=remount-ro 0 2

readlink /etc/localtime
/usr/share/zoneinfo/UTC

grep -v '^#' /etc/locale.gen
en_US.UTF-8 UTF-8

cat /etc/locale.conf
LANG=en_US.UTF-8

systemctl is-active NetworkManager
active

ip addr show
enp0s2 had DHCP address 10.0.2.15/24.

ping -c 2 1.1.1.1
2 packets transmitted, 2 received, 0% packet loss.

ping -c 2 archlinux.org
2 packets transmitted, 2 received, 0% packet loss.

sudo -v
SUDO_OK
```

Observed warnings and notes:

```text
The live ISO serial login reset once while the ISO was still finishing startup jobs. Logging in again and switching to a plain Bash prompt avoided prompt noise.

mkinitcpio warned that /etc/vconsole.conf was not found and default values would be used. This is acceptable for the minimal VM and not a GRUB failure.

grub-mkconfig warned that os-prober would not be executed. This is expected for this single-OS VM and not a GRUB failure.
```

Commands that matched the guide:

```text
UEFI detection, GPT partitioning, ESP mounted at /boot, pacstrap, genfstab, locale setup, timezone setup, NetworkManager enablement, user/sudo setup, GRUB UEFI package install, grub-install, grub-mkconfig, menuentry check, efibootmgr check, first boot without ISO, mount checks, network checks, DNS check, and sudo validation matched the intended UEFI GRUB path.
```

Commands that differed from a normal desktop install:

```text
The VM added serial console options to GRUB and enabled serial-getty@ttyS0.service so QEMU could be tested headlessly.
The VM used UTC for deterministic testing. A real user should choose their actual timezone.
The VM used -accel tcg instead of -enable-kvm because /dev/kvm was unavailable.
```

Fix needed in app:

```text
None found from this UEFI GRUB run.
```

Fix needed in documentation:

```text
Record that UEFI GRUB has passed separately from legacy BIOS GRUB.
```

Final result:

```text
PASS. The UEFI GRUB VM installed Arch, installed GRUB for x86_64-efi, generated a GRUB config with an Arch menu entry, created a GRUB UEFI boot entry, shut down, relaunched without the ISO, showed GRUB, booted the installed system, logged in as archuser, mounted / and /boot correctly, used the configured locale and timezone, ran NetworkManager, reached IP and DNS targets, and validated sudo.
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
