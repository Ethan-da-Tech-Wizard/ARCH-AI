const fs = require("fs");
const path = require("path");

const root = __dirname;
const outputFile = path.join(root, "arch-setup-walkthrough.html");

const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const js = fs.readFileSync(path.join(root, "app.js"), "utf8");

const bundled = html
  .replace(
    '    <link rel="stylesheet" href="styles.css">',
    `    <style>\n${css}\n    </style>`
  )
  .replace(
    '    <script src="app.js"></script>',
    `    <script>\n${js}\n    </script>`
  );

fs.writeFileSync(outputFile, bundled);

const bytes = fs.statSync(outputFile).size;
console.log(`Wrote ${path.basename(outputFile)} (${Math.round(bytes / 1024)} KiB)`);
