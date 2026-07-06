const fs = require('fs');
const path = require('path');

const lessonsPath = path.join(__dirname, 'lessons.json');
const db = JSON.parse(fs.readFileSync(lessonsPath, 'utf8'));

// Profile settings to simulate
const profile = {
  bootMode: 'uefi',
  bootloaderPath: 'systemd-boot',
  swapStrategy: 'partition',
  eraseIntent: 'yes',
  installTarget: 'internal-ssd',
  targetDisk: 'nvme0n1',
  efiPartition: 'nvme0n1p1',
  rootPartition: 'nvme0n1p2',
  swapPartition: 'nvme0n1p3'
};

function branchMatches(branch) {
  if (!branch) return true;
  return branch === 'systemd-boot';
}

function swapStrategyCommandVisible(commandText) {
  const text = commandText.trim();
  const isSwapPartition = text === 'mkswap /dev/nvme0n1p3' || text === 'swapon /dev/nvme0n1p3';
  if (!isSwapPartition) return true;
  return profile.swapStrategy === 'partition';
}

let steps = [];
steps.push({
  type: 'device-mapping',
  title: 'Device Mapping Setup',
  summary: 'Register target storage devices and partition names before typing commands.',
  explain: 'Arch Linux requires you to target specific partitions (EFI, root, swap) on your hard drive. Using correct names is crucial to avoid destroying data on other drives.',
  terms: ['block device', '/dev', 'device name', 'partition']
});

db.sections.forEach(section => {
  const visibleBlocks = section.blocks.filter(b => branchMatches(b.branch));
  const visibleCommands = section.commands.filter(c => branchMatches(c.branch) && swapStrategyCommandVisible(c.command));

  if (visibleBlocks.length === 0 && visibleCommands.length === 0) return;

  steps.push({
    type: 'milestone',
    title: section.title,
    summary: section.summary,
    blocks: visibleBlocks,
    terms: section.terms
  });

  visibleCommands.forEach(c => {
    steps.push({
      type: 'command',
      title: c.label,
      summary: c.purpose,
      command: c
    });
  });
});

console.log(`Dumping steps 0 to 29:`);
for (let i = 0; i <= 29 && i < steps.length; i++) {
  const s = steps[i];
  console.log(`\n=== PAGE ${i}: [${s.type.toUpperCase()}] - ${s.title} ===`);
  if (s.type === 'command') {
    console.log(`Command: ${s.command.command}`);
    console.log(`Purpose: ${s.summary}`);
    console.log(`Expected: ${s.command.expected}`);
    console.log(`Fails: ${s.command.fails}`);
  } else {
    console.log(`Summary: ${s.summary}`);
  }
}
