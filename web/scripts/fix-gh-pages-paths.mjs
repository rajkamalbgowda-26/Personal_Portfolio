import fs from "fs";
import path from "path";

const outDir = path.resolve(process.cwd(), "out");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

if (!fs.existsSync(outDir)) {
  console.log("No out directory found, skipping post-export path fix.");
  process.exit(0);
}

// 1. Always create .nojekyll so GitHub Pages serves the _next/ folder
fs.writeFileSync(path.join(outDir, ".nojekyll"), "");
console.log("Created out/.nojekyll");

// 2. If basePath is set (e.g. /Personal_Portfolio), rewrite root-relative "/assets/..." references
if (basePath && basePath !== "/") {
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (/\.(html|js|css|json|txt)$/i.test(entry.name)) {
        const content = fs.readFileSync(fullPath, "utf8");
        const updated = content
          .replace(/(["'(])\/assets\//g, `$1${basePath}/assets/`)
          .replace(/\\\/assets\\\//g, `\\${basePath}\\/assets\\/`);
        if (updated !== content) {
          fs.writeFileSync(fullPath, updated, "utf8");
        }
      }
    }
  }
  walk(outDir);
  console.log(`Updated /assets/ paths with basePath: ${basePath}`);
}
