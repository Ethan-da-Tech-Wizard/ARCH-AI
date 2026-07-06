const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const diskPath = '/home/ethan/ARCH-AI/vm/test-run.qcow2';
const varsPath = '/home/ethan/ARCH-AI/vm/OVMF_VARS-test-run.fd';

console.log('Initializing fresh test VM files...');
try {
  if (fs.existsSync(diskPath)) fs.unlinkSync(diskPath);
  if (fs.existsSync(varsPath)) fs.unlinkSync(varsPath);
} catch (e) {}

execSync(`qemu-img create -f qcow2 ${diskPath} 32G`);
execSync(`cp /usr/share/edk2/x64/OVMF_VARS.4m.fd ${varsPath}`);

console.log('Starting QEMU in headless installation mode...');
const qemu = spawn('qemu-system-x86_64', [
  '-machine', 'q35',
  '-m', '2048',
  '-smp', '2',
  '-drive', 'if=pflash,format=raw,readonly=on,file=/usr/share/edk2/x64/OVMF_CODE.4m.fd',
  '-drive', `if=pflash,format=raw,file=${varsPath}`,
  '-drive', `file=${diskPath},format=qcow2,if=virtio`,
  '-cdrom', '/home/ethan/ARCH-AI/iso/archlinux-2026.07.01-x86_64.iso',
  '-serial', 'stdio',
  '-display', 'none'
]);

// Forward process stdin to QEMU stdin
process.stdin.pipe(qemu.stdin);

let state = 'BOOTLOADER';
let buffer = '';
let loggedIn = false;

const commands = [
  'whoami',
  'timedatectl',
  'ip link',
  'ping -c 3 1.1.1.1',
  'ping -c 3 archlinux.org',
  'sgdisk -Z /dev/vda',
  'sgdisk -n 1:0:+512M -t 1:ef00 -c 1:EFI -n 2:0:0 -t 2:8300 -c 2:root /dev/vda',
  'partprobe /dev/vda',
  'mkfs.fat -F 32 /dev/vda1',
  'mkfs.ext4 -F /dev/vda2',
  'mount /dev/vda2 /mnt',
  'mkdir -p /mnt/boot',
  'mount /dev/vda1 /mnt/boot',
  // Create 512M swapfile for fast test
  'dd if=/dev/zero of=/mnt/swapfile bs=1M count=512 status=none',
  'chmod 600 /mnt/swapfile',
  'mkswap /mnt/swapfile',
  'swapon /mnt/swapfile',
  // Bootstrap packages (takes ~1-2 min)
  'pacstrap -K /mnt base linux linux-firmware nano networkmanager sudo',
  'genfstab -U /mnt >> /mnt/etc/fstab',
  'arch-chroot /mnt ln -sf /usr/share/zoneinfo/America/Phoenix /etc/localtime',
  'arch-chroot /mnt hwclock --systohc',
  'arch-chroot /mnt sh -c "sed -i \'s/#en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/\' /etc/locale.gen"',
  'arch-chroot /mnt locale-gen',
  'arch-chroot /mnt sh -c \'echo "LANG=en_US.UTF-8" > /etc/locale.conf\'',
  'arch-chroot /mnt sh -c \'echo "archbox" > /etc/hostname\'',
  'arch-chroot /mnt sh -c \'echo -e "rootpass\\nrootpass" | passwd\'',
  'arch-chroot /mnt useradd -m -G wheel -s /bin/bash ethan',
  'arch-chroot /mnt sh -c \'echo -e "userpass\\nuserpass" | passwd ethan\'',
  'arch-chroot /mnt sh -c \'echo "%wheel ALL=(ALL:ALL) ALL" >> /etc/sudoers\'',
  'arch-chroot /mnt systemctl enable NetworkManager',
  'arch-chroot /mnt bootctl install',
  'arch-chroot /mnt sh -c \'echo -e "default arch.conf\\ntimeout 5\\nconsole-mode keep\\neditor no" > /boot/loader/loader.conf\'',
  // Write loader entries
  'arch-chroot /mnt sh -c \'root_uuid=$(blkid -s UUID -o value /dev/vda2) && echo -e "title Arch Linux\\nlinux /vmlinuz-linux\\ninitrd /initramfs-linux.img\\noptions root=UUID=$root_uuid rw console=ttyS0,115200" > /boot/loader/entries/arch.conf\'',
  'swapoff /mnt/swapfile',
  'umount -R /mnt',
  'poweroff'
];

let cmdIndex = 0;

qemu.stdout.on('data', (data) => {
  const str = data.toString();
  process.stdout.write(str);
  
  // Clean ANSI escape sequences and character-set designations (like \x1b(B)
  const cleanStr = str.replace(/\u001b\[[0-9;]*[a-zA-Z]/g, '').replace(/\u001b\([a-zA-Z]/g, '');
  buffer += cleanStr;

  // Auto-respond to login prompt exactly once
  if (!loggedIn && buffer.includes('archiso login:')) {
    console.log('\n*** Login prompt detected. Auto-submitting root login...');
    loggedIn = true;
    buffer = '';
    qemu.stdin.write('root\n');
  }

  if (state === 'BOOTLOADER') {
    if (buffer.includes('Arch Linux install medium') || buffer.includes('Boot in')) {
      state = 'EDITING';
      buffer = '';
      setTimeout(() => {
        console.log('\n*** Sending "e" to edit boot parameters...');
        qemu.stdin.write('e');
        setTimeout(() => {
          console.log('\n*** Appending serial console parameter...');
          qemu.stdin.write(' console=ttyS0,115200\n');
          state = 'BOOTING';
        }, 1500);
      }, 1500);
    }
  } else if (state === 'BOOTING') {
    if (buffer.includes('root@archiso')) {
      state = 'INSTALLING';
      buffer = '';
      runNextCommand();
    }
  } else if (state === 'INSTALLING') {
    // Wait for the prompt to return
    if (buffer.includes('root@archiso')) {
      buffer = '';
      runNextCommand();
    }
  }
});

function runNextCommand() {
  if (cmdIndex >= commands.length) {
    console.log('\n*** All installation commands sent. Waiting for QEMU to power off...');
    return;
  }

  const cmd = commands[cmdIndex++];
  console.log(`\n*** Running command [${cmdIndex}/${commands.length}]: ${cmd}`);
  qemu.stdin.write(cmd + '\n');
}

qemu.on('close', (code) => {
  console.log(`\n*** Installation QEMU process exited with code ${code}.`);
  console.log('Now initiating FIRST BOOT validation (without the installer ISO)...');

  const bootQemu = spawn('qemu-system-x86_64', [
    '-machine', 'q35',
    '-m', '2048',
    '-smp', '2',
    '-drive', 'if=pflash,format=raw,readonly=on,file=/usr/share/edk2/x64/OVMF_CODE.4m.fd',
    '-drive', `if=pflash,format=raw,file=${varsPath}`,
    '-drive', `file=${diskPath},format=qcow2,if=virtio`,
    '-serial', 'stdio',
    '-display', 'none'
  ]);

  let bootBuffer = '';
  let bootState = 'WAITING_LOGIN';
  
  let bootTimeout = setTimeout(() => {
    console.log('\n❌ FIRST BOOT TIMEOUT: Login prompt was not reached.');
    bootQemu.kill();
    process.exit(1);
  }, 45000);

  bootQemu.stdout.on('data', (data) => {
    const str = data.toString();
    process.stdout.write(str);
    
    const cleanStr = str.replace(/\u001b\[[0-9;]*[a-zA-Z]/g, '').replace(/\u001b\([a-zA-Z]/g, '');
    bootBuffer += cleanStr;

    if (bootState === 'WAITING_LOGIN') {
      if (bootBuffer.includes('archbox login:')) {
        console.log('\n✓ Reached system login prompt. Entering username "ethan"...');
        bootState = 'WAITING_PASSWORD';
        bootBuffer = '';
        bootQemu.stdin.write('ethan\n');
      }
    } else if (bootState === 'WAITING_PASSWORD') {
      if (bootBuffer.includes('Password:')) {
        console.log('\n✓ Reached password prompt. Entering password "userpass"...');
        bootState = 'WAITING_SHELL';
        bootBuffer = '';
        bootQemu.stdin.write('userpass\n');
      }
    } else if (bootState === 'WAITING_SHELL') {
      if (bootBuffer.includes('ethan@archbox')) {
        clearTimeout(bootTimeout);
        console.log('\n✓ AUTHENTICATION SUCCESSFUL! Logged in as ethan.');
        console.log('Cleaning up VM test disk...');
        bootQemu.kill();
        try {
          fs.unlinkSync(diskPath);
          fs.unlinkSync(varsPath);
        } catch(e) {}
        console.log('*** TEST PASSED! Setup wizard walkthrough commands verified successfully.');
        process.exit(0);
      }
    }
  });
});
