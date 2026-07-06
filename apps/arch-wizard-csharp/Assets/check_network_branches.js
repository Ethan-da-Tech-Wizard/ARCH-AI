const fs = require('fs');
const path = require('path');

const lessonsPath = path.join(__dirname, 'lessons.json');
const db = JSON.parse(fs.readFileSync(lessonsPath, 'utf8'));

const alternatives = [
  { name: 'Ethernet Connection', wifi: false },
  { name: 'Wi-Fi Connection', wifi: true }
];

alternatives.forEach(alt => {
  console.log(`\n========================================`);
  console.log(`Alternative branch: ${alt.name}`);
  console.log(`========================================`);

  db.sections.forEach(section => {
    // Let's filter commands that are conditional on Wi-Fi vs Ethernet
    const matchedCommands = section.commands.filter(c => {
      const text = c.command.trim();
      const isWifiCmd = text.startsWith('iwctl') || text.startsWith('station ') || text.startsWith('device ') || text === 'exit' && section.title === 'Boot Into The ISO' && c.label === 'Leave the Wi-Fi control shell';
      return alt.wifi ? isWifiCmd : (text === 'ip link' || text.startsWith('ping') || text.startsWith('resolvectl'));
    });

    if (matchedCommands.length > 0) {
      console.log(`\nSection: ${section.title}`);
      matchedCommands.forEach(c => {
        console.log(`- Label: ${c.label}`);
        console.log(`  Command: ${c.command}`);
        console.log(`  Expected: ${c.expected}`);
      });
    }
  });
});
