const fs = require("fs");
const vm = require("vm");

const html = fs.readFileSync("index.html", "utf8");
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
console.log("scripts:", scripts.length);
let ok = true;
scripts.forEach((s, i) => {
  try {
    new vm.Script(s[1]);
    console.log("script", i, "OK", s[1].length, "chars");
  } catch (e) {
    ok = false;
    console.log("script", i, "SYNTAX ERROR:", e.message);
  }
});

const ids = [...new Set([...html.matchAll(/getElementById\("([^"]+)"\)/g)].map(m => m[1]))];
const missing = ids.filter(id => !html.includes('id="' + id + '"'));
console.log("ids referenced:", ids.length, "missing:", missing.length ? missing : "none");

const spriteKeys = [...new Set([...html.matchAll(/assets\/sprites\/([a-z-]+)\.(png|svg)/g)].map(m => m[1]))];
const files = fs.readdirSync("assets/sprites");
const missingFiles = spriteKeys.filter(k => !files.includes(k + ".png") || !files.includes(k + ".svg"));
console.log("sprites referenced:", spriteKeys.join(", "));
console.log("missing sprite files:", missingFiles.length ? missingFiles : "none");

console.log(ok && !missing.length && !missingFiles.length ? "ALL CHECKS PASSED" : "CHECKS FAILED");
