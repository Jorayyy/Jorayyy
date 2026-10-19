const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const assets = path.join(root, "assets");
const spritesDir = path.join(assets, "sprites");

const sprites = ["rick", "morty", "pickle-rick", "meeseeks", "evil-morty", "butter-robot", "birdperson", "squanchy", "jerry"];
const b64 = {};
for (const key of sprites) {
  b64[key] = fs.readFileSync(path.join(spritesDir, key + ".png")).toString("base64");
}

const FONT = "ui-monospace, 'Cascadia Mono', 'Courier New', monospace";

function sprite(key, x, y, scale, delay, dur) {
  const size = 16 * scale;
  return `
  <g transform="translate(${x} ${y})">
    <animateTransform attributeName="transform" type="translate" values="${x} ${y};${x} ${y - 7};${x} ${y}" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
    <image href="data:image/png;base64,${b64[key]}" xlink:href="data:image/png;base64,${b64[key]}" width="${size}" height="${size}" image-rendering="pixelated"/>
  </g>`;
}

let seed = 11;
function rand() {
  seed = (seed * 1103515245 + 12345) % 2147483648;
  return seed / 2147483648;
}

const stars = Array.from({ length: 54 }, (_, i) => {
  const x = Math.round(rand() * 960) + 20;
  const y = Math.round(rand() * 190) + 20;
  const s = i % 9 === 0 ? 2 : 1;
  const fill = i % 8 === 0 ? "#f0e14a" : i % 3 === 0 ? "#b084eb" : "#cfe8b8";
  const begin = (rand() * 4).toFixed(2);
  return `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="${fill}" opacity=".5"><animate attributeName="opacity" values=".15;.85;.15" dur="${(2 + rand() * 3).toFixed(1)}s" begin="${begin}s" repeatCount="indefinite"/></rect>`;
}).join("\n    ");

const hero = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1000" height="300" viewBox="0 0 1000 300" role="img" aria-label="Jorayyy">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#05090a"/>
      <stop offset=".55" stop-color="#0a1710"/>
      <stop offset="1" stop-color="#05090a"/>
    </linearGradient>
    <linearGradient id="name" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#eaffc9"/>
      <stop offset=".45" stop-color="#97ce4c"/>
      <stop offset="1" stop-color="#4f9a2c"/>
    </linearGradient>
    <radialGradient id="core" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#eaffc9" stop-opacity=".35"/>
      <stop offset=".5" stop-color="#97ce4c" stop-opacity=".12"/>
      <stop offset="1" stop-color="#97ce4c" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vignette" cx="50%" cy="42%" r="70%">
      <stop offset=".55" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity=".55"/>
    </radialGradient>
    <linearGradient id="scan" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#97ce4c" stop-opacity="0"/>
      <stop offset=".5" stop-color="#97ce4c" stop-opacity=".16"/>
      <stop offset="1" stop-color="#97ce4c" stop-opacity="0"/>
    </linearGradient>
    <pattern id="lines" width="4" height="4" patternUnits="userSpaceOnUse">
      <rect width="4" height="2" fill="#000" opacity=".16"/>
    </pattern>
    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="6" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <clipPath id="card"><rect x="1" y="1" width="998" height="298" rx="20"/></clipPath>
  </defs>

  <g clip-path="url(#card)">
    <rect width="1000" height="300" fill="url(#bg)"/>
    ${stars}

    <g opacity=".85">
      <circle cx="500" cy="150" r="230" fill="url(#core)">
        <animate attributeName="opacity" values=".5;.95;.5" dur="6s" repeatCount="indefinite"/>
      </circle>
      <circle cx="500" cy="150" r="232" fill="none" stroke="#97ce4c" stroke-opacity=".16" stroke-width="1.5" stroke-dasharray="2 12">
        <animateTransform attributeName="transform" type="rotate" from="0 500 150" to="360 500 150" dur="60s" repeatCount="indefinite"/>
      </circle>
      <circle cx="500" cy="150" r="196" fill="none" stroke="#b084eb" stroke-opacity=".14" stroke-width="1" stroke-dasharray="1 9">
        <animateTransform attributeName="transform" type="rotate" from="360 500 150" to="0 500 150" dur="44s" repeatCount="indefinite"/>
      </circle>
      <circle cx="500" cy="150" r="160" fill="none" stroke="#97ce4c" stroke-opacity=".1" stroke-width="8"/>
      <circle cx="500" cy="150" r="246" fill="none" stroke="#97ce4c" stroke-opacity=".35" stroke-width="2" stroke-dasharray="1 40">
        <animateTransform attributeName="transform" type="rotate" from="0 500 150" to="360 500 150" dur="24s" repeatCount="indefinite"/>
      </circle>
      <circle cx="500" cy="150" r="246" fill="none" stroke="#f0e14a" stroke-opacity=".6" stroke-width="2" stroke-dasharray="2 90">
        <animateTransform attributeName="transform" type="rotate" from="0 500 150" to="-360 500 150" dur="36s" repeatCount="indefinite"/>
      </circle>
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 500 150" to="360 500 150" dur="18s" repeatCount="indefinite"/>
        <circle cx="500" cy="-96" r="3" fill="#c6f27a">
          <animate attributeName="opacity" values="1;.2;1" dur="2s" repeatCount="indefinite"/>
        </circle>
      </g>
    </g>

    <text x="504" y="188" text-anchor="middle" font-family="${FONT}" font-size="96" font-weight="700" letter-spacing="12" fill="#000" opacity=".6">JORAYYY</text>
    <text x="500" y="180" text-anchor="middle" font-family="${FONT}" font-size="96" font-weight="700" letter-spacing="12" fill="url(#name)" stroke="#06130b" stroke-width="9" paint-order="stroke" filter="url(#glow)">JORAYYY</text>

    <rect x="386" y="210" width="228" height="3" rx="1.5" fill="#97ce4c" opacity=".8">
      <animate attributeName="width" values="150;228;150" dur="5s" repeatCount="indefinite"/>
      <animate attributeName="x" values="425;386;425" dur="5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values=".4;.95;.4" dur="5s" repeatCount="indefinite"/>
    </rect>

    ${sprite("rick", 52, 218, 3, 0, 3.8)}
    ${sprite("morty", 884, 218, 3, 1.2, 4.2)}

    <rect width="1000" height="300" fill="url(#lines)"/>
    <rect x="0" y="0" width="1000" height="70" fill="url(#scan)" opacity=".7">
      <animateTransform attributeName="transform" type="translate" from="0 -90" to="0 330" dur="8s" repeatCount="indefinite"/>
    </rect>
    <rect width="1000" height="300" fill="url(#vignette)"/>
    <rect x="1" y="1" width="998" height="298" rx="20" fill="none" stroke="#ffffff" stroke-opacity=".08"/>
  </g>
</svg>
`;

let paradeItems = "";
sprites.forEach((key, i) => {
  const x = 20 + i * 104;
  paradeItems += `
  <g transform="translate(${x} 12)">
    <rect width="96" height="96" rx="16" fill="#0b1410" stroke="#21382a"/>
    <rect x="1" y="1" width="94" height="94" rx="15" fill="none" stroke="#ffffff" stroke-opacity=".04"/>
    <circle cx="48" cy="54" r="30" fill="#97ce4c" opacity=".06">
      <animate attributeName="opacity" values=".03;.11;.03" dur="3.2s" begin="${(i * 0.22).toFixed(2)}s" repeatCount="indefinite"/>
    </circle>
    <g>
      <animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="2.8s" begin="${(i * 0.18).toFixed(2)}s" repeatCount="indefinite"/>
      <image href="data:image/png;base64,${b64[key]}" xlink:href="data:image/png;base64,${b64[key]}" x="24" y="22" width="48" height="48" image-rendering="pixelated"/>
    </g>
  </g>`;
});

const parade = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1000" height="120" viewBox="0 0 1000 120" role="img" aria-label="Character select">
  <defs>
    <linearGradient id="fade" x1="0" x2="1">
      <stop offset="0" stop-color="#05090a" stop-opacity="0"/>
      <stop offset=".5" stop-color="#05090a" stop-opacity="0"/>
      <stop offset="1" stop-color="#05090a" stop-opacity="0"/>
    </linearGradient>
    <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="4"/>
    </filter>
  </defs>
  <rect width="1000" height="120" fill="#05090a" opacity="0"/>
  <ellipse cx="500" cy="112" rx="420" ry="10" fill="#97ce4c" opacity=".06" filter="url(#soft)"/>
  ${paradeItems}
</svg>
`;

const button = `<svg xmlns="http://www.w3.org/2000/svg" width="560" height="120" viewBox="0 0 560 120" role="img" aria-label="Insert coin">
  <defs>
    <linearGradient id="neon" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#97ce4c"/>
      <stop offset=".5" stop-color="#c6f27a"/>
      <stop offset="1" stop-color="#b084eb"/>
    </linearGradient>
    <filter id="pulse" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="7" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect x="8" y="10" width="544" height="100" rx="18" fill="#97ce4c" opacity=".18" filter="url(#pulse)">
    <animate attributeName="opacity" values=".08;.28;.08" dur="2.4s" repeatCount="indefinite"/>
  </rect>
  <rect x="8" y="10" width="544" height="100" rx="18" fill="#081009"/>
  <rect x="8" y="10" width="544" height="100" rx="18" fill="none" stroke="url(#neon)" stroke-width="2.5"/>
  <rect x="14" y="16" width="532" height="88" rx="13" fill="none" stroke="#ffffff" stroke-opacity=".05"/>

  <g transform="translate(58 60)">
    <rect x="-19" y="-25" width="38" height="50" rx="7" fill="#101c12" stroke="url(#neon)" stroke-width="2"/>
    <rect x="-11" y="-16" width="22" height="5" rx="2.5" fill="#0a120b" stroke="#4f9a2c"/>
    <circle cx="0" cy="10" r="8" fill="none" stroke="#97ce4c" stroke-width="2">
      <animate attributeName="r" values="7;9;7" dur="1.6s" repeatCount="indefinite"/>
    </circle>
    <circle cx="0" cy="10" r="2.5" fill="#eaffc9">
      <animate attributeName="opacity" values=".4;1;.4" dur="1.6s" repeatCount="indefinite"/>
    </circle>
  </g>

  <text x="110" y="71" font-family="${FONT}" font-size="33" font-weight="700" letter-spacing="3" fill="#f0e14a">INSERT COIN</text>

  <g fill="#97ce4c" opacity=".9">
    <rect x="432" y="55" width="9" height="9" rx="1">
      <animate attributeName="opacity" values=".2;1;.2" dur="1.2s" begin="0s" repeatCount="indefinite"/>
    </rect>
    <rect x="446" y="55" width="9" height="9" rx="1">
      <animate attributeName="opacity" values=".2;1;.2" dur="1.2s" begin=".2s" repeatCount="indefinite"/>
    </rect>
    <rect x="460" y="55" width="9" height="9" rx="1">
      <animate attributeName="opacity" values=".2;1;.2" dur="1.2s" begin=".4s" repeatCount="indefinite"/>
    </rect>
  </g>

  <path d="M505 48 l24 12 -24 12 z" fill="#c6f27a">
    <animate attributeName="opacity" values=".35;1;.35" dur="1.6s" repeatCount="indefinite"/>
  </path>
</svg>
`;

const save = `<svg xmlns="http://www.w3.org/2000/svg" width="440" height="64" viewBox="0 0 440 64" role="img" aria-label="Save file">
  <defs>
    <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#c6f27a"/>
      <stop offset="1" stop-color="#6fae35"/>
    </linearGradient>
  </defs>
  <g transform="translate(14 14)">
    <rect width="36" height="36" rx="5" fill="#0c1a10" stroke="#4f9a2c" stroke-width="2"/>
    <rect x="7" y="2" width="16" height="11" rx="2" fill="#97ce4c"/>
    <rect x="20" y="22" width="12" height="14" rx="1.5" fill="#0d1117" stroke="#97ce4c" stroke-width="1.5"/>
    <rect x="7" y="22" width="8" height="2" fill="#4f9a2c"/>
    <rect x="7" y="27" width="8" height="2" fill="#4f9a2c"/>
  </g>
  <text x="66" y="41" font-family="${FONT}" font-size="25" font-weight="700" letter-spacing="5" fill="url(#lg)">SAVE FILE</text>
  <rect x="268" y="22" width="9" height="18" fill="#97ce4c">
    <animate attributeName="opacity" values="1;0;1" dur="1.1s" repeatCount="indefinite"/>
  </rect>
  <line x1="66" y1="49" x2="286" y2="49" stroke="#97ce4c" stroke-opacity=".25" stroke-width="1"/>
</svg>
`;

const footer = `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="50" viewBox="0 0 1000 50" role="img" aria-label="Divider">
  <line x1="80" y1="25" x2="920" y2="25" stroke="#1f3626" stroke-width="1" stroke-dasharray="2 8"/>
  <line x1="80" y1="25" x2="920" y2="25" stroke="#97ce4c" stroke-width="1" stroke-dasharray="2 8" opacity=".8">
    <animate attributeName="stroke-dashoffset" from="0" to="-80" dur="4s" repeatCount="indefinite"/>
  </line>
  <circle cx="500" cy="25" r="4" fill="#97ce4c">
    <animate attributeName="r" values="3;5;3" dur="2.4s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values=".5;1;.5" dur="2.4s" repeatCount="indefinite"/>
  </circle>
  <circle cx="500" cy="25" r="10" fill="none" stroke="#97ce4c" stroke-opacity=".35">
    <animate attributeName="r" values="7;15;7" dur="3.2s" repeatCount="indefinite"/>
    <animate attributeName="stroke-opacity" values=".35;0;.35" dur="3.2s" repeatCount="indefinite"/>
  </circle>
</svg>
`;

fs.writeFileSync(path.join(assets, "hero.svg"), hero);
fs.writeFileSync(path.join(assets, "sprites-parade.svg"), parade);
fs.writeFileSync(path.join(assets, "arcade-button.svg"), button);
fs.writeFileSync(path.join(assets, "save-file.svg"), save);
fs.writeFileSync(path.join(assets, "divider.svg"), footer);
console.log("wrote hero.svg, sprites-parade.svg, arcade-button.svg, save-file.svg, divider.svg");
