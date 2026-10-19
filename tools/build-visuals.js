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

const stars = Array.from({ length: 46 }, (_, i) => {
  const x = Math.round(rand() * 470) + 25;
  const y = Math.round(rand() * 470) + 25;
  const s = i % 9 === 0 ? 2 : 1;
  const fill = i % 8 === 0 ? "#f0e14a" : i % 3 === 0 ? "#b084eb" : "#cfe8b8";
  const begin = (rand() * 4).toFixed(2);
  return `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="${fill}" opacity=".5"><animate attributeName="opacity" values=".12;.8;.12" dur="${(2 + rand() * 3).toFixed(1)}s" begin="${begin}s" repeatCount="indefinite"/></rect>`;
}).join("\n    ");

const hero = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="520" height="520" viewBox="0 0 520 520" role="img" aria-label="Rick's portal">
  <defs>
    <radialGradient id="bg" cx="50%" cy="45%" r="75%">
      <stop offset="0" stop-color="#0b1a10"/>
      <stop offset=".55" stop-color="#050c08"/>
      <stop offset="1" stop-color="#030605"/>
    </radialGradient>
    <radialGradient id="portal" cx="50%" cy="46%" r="52%">
      <stop offset="0" stop-color="#f6ffdf" stop-opacity=".95"/>
      <stop offset=".18" stop-color="#d6ff96" stop-opacity=".88"/>
      <stop offset=".38" stop-color="#aee260" stop-opacity=".9"/>
      <stop offset=".62" stop-color="#77b83c" stop-opacity=".78"/>
      <stop offset=".84" stop-color="#417d23" stop-opacity=".42"/>
      <stop offset="1" stop-color="#2c5c17" stop-opacity=".06"/>
    </radialGradient>
    <radialGradient id="rim" cx="50%" cy="50%" r="50%">
      <stop offset=".7" stop-color="#d9ff9e" stop-opacity="0"/>
      <stop offset=".9" stop-color="#d9ff9e" stop-opacity=".75"/>
      <stop offset="1" stop-color="#f6ffdf" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vignette" cx="50%" cy="46%" r="72%">
      <stop offset=".5" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity=".6"/>
    </radialGradient>
    <pattern id="lines" width="4" height="4" patternUnits="userSpaceOnUse">
      <rect width="4" height="2" fill="#000" opacity=".14"/>
    </pattern>
    <filter id="warp" x="-30%" y="-30%" width="160%" height="160%">
      <feTurbulence type="fractalNoise" baseFrequency="0.014 0.018" numOctaves="3" seed="9" result="n">
        <animate attributeName="baseFrequency" values="0.013 0.017;0.023 0.027;0.013 0.017" dur="11s" repeatCount="indefinite"/>
      </feTurbulence>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="32" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="swirl" x="-40%" y="-40%" width="180%" height="180%">
      <feTurbulence type="fractalNoise" baseFrequency="0.03 0.026" numOctaves="2" seed="23" result="n">
        <animate attributeName="baseFrequency" values="0.026 0.03;0.038 0.022;0.026 0.03" dur="8s" repeatCount="indefinite"/>
      </feTurbulence>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="26" xChannelSelector="R" yChannelSelector="G"/>
      <feGaussianBlur stdDeviation="4"/>
    </filter>
    <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="7"/>
    </filter>
    <filter id="halo" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="22"/>
    </filter>
    <clipPath id="card"><rect x="1" y="1" width="518" height="518" rx="26"/></clipPath>
  </defs>

  <g clip-path="url(#card)">
    <rect width="520" height="520" fill="url(#bg)"/>
    ${stars}

    <ellipse cx="260" cy="264" rx="192" ry="192" fill="#8fd945" opacity=".2" filter="url(#halo)">
      <animate attributeName="opacity" values=".13;.28;.13" dur="5.4s" repeatCount="indefinite"/>
    </ellipse>

    <g filter="url(#warp)">
      <circle cx="260" cy="260" r="171" fill="url(#portal)"/>
      <circle cx="260" cy="260" r="171" fill="none" stroke="#f6ffdf" stroke-opacity=".8" stroke-width="3.5"/>
      <circle cx="260" cy="260" r="165" fill="none" stroke="#ffffff" stroke-opacity=".3" stroke-width="1.4"/>
    </g>

    <g filter="url(#swirl)" opacity=".8">
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 260 260" to="360 260 260" dur="26s" repeatCount="indefinite"/>
        <path d="M262 116 C 336 130, 396 198, 380 282 C 366 350, 306 398, 242 400" fill="none" stroke="#ffffff" stroke-opacity=".55" stroke-width="12"/>
        <path d="M142 296 C 158 218, 224 148, 322 138" fill="none" stroke="#d9ff9e" stroke-opacity=".45" stroke-width="10"/>
      </g>
      <g>
        <animateTransform attributeName="transform" type="rotate" from="360 260 260" to="0 260 260" dur="34s" repeatCount="indefinite"/>
        <path d="M180 190 C 246 122, 352 132, 398 210" fill="none" stroke="#f6ffdf" stroke-opacity=".33" stroke-width="16"/>
      </g>
    </g>

    <g>
      <animateTransform attributeName="transform" type="rotate" from="0 260 260" to="-360 260 260" dur="19s" repeatCount="indefinite"/>
      <ellipse cx="260" cy="114" rx="27" ry="9" fill="#f6ffdf" opacity=".4" filter="url(#soft)">
        <animate attributeName="opacity" values=".15;.6;.15" dur="3.4s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="260" cy="406" rx="20" ry="7" fill="#d9ff9e" opacity=".28" filter="url(#soft)">
        <animate attributeName="opacity" values=".1;.45;.1" dur="4.1s" repeatCount="indefinite"/>
      </ellipse>
    </g>

    <circle cx="260" cy="260" r="178" fill="none" stroke="url(#rim)" stroke-width="9">
      <animate attributeName="opacity" values=".55;1;.55" dur="4.6s" repeatCount="indefinite"/>
    </circle>
    <circle cx="260" cy="260" r="163" fill="none" stroke="#f6ffdf" stroke-opacity=".18" stroke-width="2">
      <animate attributeName="r" values="161;166;161" dur="6s" repeatCount="indefinite"/>
    </circle>

    <rect width="520" height="520" fill="url(#lines)"/>
    <rect width="520" height="520" fill="url(#vignette)"/>
    <rect x="1" y="1" width="518" height="518" rx="26" fill="none" stroke="#ffffff" stroke-opacity=".09"/>
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
    <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="4"/>
    </filter>
  </defs>
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
    <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#e8edf1"/>
      <stop offset=".5" stop-color="#b9c0c7"/>
      <stop offset="1" stop-color="#8f969d"/>
    </linearGradient>
    <filter id="muzzle" x="-80%" y="-80%" width="260%" height="260%">
      <feGaussianBlur stdDeviation="5" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect x="8" y="10" width="544" height="100" rx="18" fill="#97ce4c" opacity=".18" filter="url(#pulse)">
    <animate attributeName="opacity" values=".08;.28;.08" dur="2.4s" repeatCount="indefinite"/>
  </rect>
  <rect x="8" y="10" width="544" height="100" rx="18" fill="#081009"/>
  <rect x="8" y="10" width="544" height="100" rx="18" fill="none" stroke="url(#neon)" stroke-width="2.5"/>
  <rect x="14" y="16" width="532" height="88" rx="13" fill="none" stroke="#ffffff" stroke-opacity=".05"/>

  <g transform="translate(30 18) scale(1.5)" stroke-linejoin="round">
    <path d="M6 26 l10 0 l3 12 l-5 12 l-8 0 l-2 -12 z" fill="#7d848b" stroke="#101010" stroke-width="1.6"/>
    <rect x="4" y="12" width="34" height="15" rx="5" fill="url(#metal)" stroke="#101010" stroke-width="1.6"/>
    <rect x="10" y="6" width="16" height="7" rx="3" fill="#c8f5a0" stroke="#101010" stroke-width="1.5"/>
    <rect x="12" y="7.5" width="12" height="4" rx="2" fill="#7dd63c">
      <animate attributeName="opacity" values=".65;1;.65" dur="2.2s" repeatCount="indefinite"/>
    </rect>
    <circle cx="15" cy="9.5" r="1.1" fill="#ffffff">
      <animate attributeName="cy" values="11;7;11" dur="2.6s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values=".9;.2;.9" dur="2.6s" repeatCount="indefinite"/>
    </circle>
    <circle cx="20" cy="9.5" r="0.9" fill="#ffffff">
      <animate attributeName="cy" values="8;11.5;8" dur="3.1s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values=".2;.9;.2" dur="3.1s" repeatCount="indefinite"/>
    </circle>
    <rect x="18" y="24" width="6" height="5" rx="1.5" fill="#101010"/>
    <g filter="url(#muzzle)">
      <ellipse cx="40" cy="19" rx="9.5" ry="9.5" fill="#97ce4c" opacity=".35">
        <animate attributeName="rx" values="8.5;11.5;8.5" dur="1.8s" repeatCount="indefinite"/>
        <animate attributeName="ry" values="8.5;11.5;8.5" dur="1.8s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="40" cy="19" rx="7" ry="7" fill="#c8f57e">
        <animate attributeName="opacity" values=".75;1;.75" dur="1.8s" repeatCount="indefinite"/>
      </ellipse>
    </g>
    <ellipse cx="40" cy="19" rx="3.2" ry="3.2" fill="#f8ffe6"/>
    <circle cx="40" cy="19" r="10" fill="none" stroke="#101010" stroke-width="1.6"/>
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
    <linearGradient id="disk" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#e9eef2"/>
      <stop offset="1" stop-color="#aeb6bd"/>
    </linearGradient>
  </defs>
  <g transform="translate(12 12)" stroke-linejoin="round">
    <rect x="1" y="1" width="38" height="38" rx="6" fill="url(#disk)" stroke="#101010" stroke-width="2.2"/>
    <path d="M0 30 q19 8 40 0" fill="none" stroke="#101010" stroke-width="2.2"/>
    <path d="M9 1 h18 l10 10 v0 h-28 z" fill="#8f969d" stroke="#101010" stroke-width="2"/>
    <rect x="10" y="3" width="14" height="8" rx="2" fill="#e9eef2" stroke="#101010" stroke-width="1.8"/>
    <g transform="translate(13 2.5) scale(0.9)">
      <path d="M2 12 l2.5 -7 l3 4 l2 -6 l2.5 5 l2 -4 l2.5 6 z" fill="#a7dbe8" stroke="#101010" stroke-width="1.4"/>
      <path d="M1 14 q6 -3 12 0 q-6 5 -12 0 z" fill="#d9d9cf" stroke="#101010" stroke-width="1.4"/>
    </g>
    <rect x="22" y="22" width="12" height="17" rx="2" fill="#4a8f2c" stroke="#101010" stroke-width="2"/>
    <path d="M24 26 h8 M24 30 h8 M24 34 h5" fill="none" stroke="#c6f27a" stroke-width="2" stroke-linecap="round"/>
    <circle cx="7" cy="35" r="2.4" fill="#7dd63c" stroke="#101010" stroke-width="1.4">
      <animate attributeName="opacity" values="1;.25;1" dur="2.2s" repeatCount="indefinite"/>
    </circle>
  </g>
  <text x="66" y="41" font-family="${FONT}" font-size="25" font-weight="700" letter-spacing="5" fill="url(#lg)">SAVE FILE</text>
  <rect x="268" y="22" width="9" height="18" fill="#97ce4c">
    <animate attributeName="opacity" values="1;0;1" dur="1.1s" repeatCount="indefinite"/>
  </rect>
  <line x1="66" y1="49" x2="286" y2="49" stroke="#97ce4c" stroke-opacity=".25" stroke-width="1"/>
</svg>
`;

const footer = `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="56" viewBox="0 0 1000 56" role="img" aria-label="Divider">
  <defs>
    <radialGradient id="p" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#f8ffe6"/>
      <stop offset=".45" stop-color="#aee260"/>
      <stop offset="1" stop-color="#4f9229" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <line x1="80" y1="28" x2="440" y2="28" stroke="#1f3626" stroke-width="1" stroke-dasharray="2 8"/>
  <line x1="80" y1="28" x2="440" y2="28" stroke="#97ce4c" stroke-width="1" stroke-dasharray="2 8" opacity=".8">
    <animate attributeName="stroke-dashoffset" from="0" to="-80" dur="4s" repeatCount="indefinite"/>
  </line>
  <line x1="560" y1="28" x2="920" y2="28" stroke="#1f3626" stroke-width="1" stroke-dasharray="2 8"/>
  <line x1="560" y1="28" x2="920" y2="28" stroke="#97ce4c" stroke-width="1" stroke-dasharray="2 8" opacity=".8">
    <animate attributeName="stroke-dashoffset" from="0" to="-80" dur="4s" repeatCount="indefinite"/>
  </line>
  <g transform="translate(500 28)">
    <circle r="20" fill="#8fd945" opacity=".22">
      <animate attributeName="r" values="15;23;15" dur="3.6s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values=".16;.3;.16" dur="3.6s" repeatCount="indefinite"/>
    </circle>
    <circle r="14" fill="url(#p)" opacity=".95">
      <animate attributeName="r" values="12;15;12" dur="3.6s" repeatCount="indefinite"/>
    </circle>
    <circle r="16" fill="none" stroke="#d9ff9e" stroke-opacity=".55" stroke-width="1.6" stroke-dasharray="3 5">
      <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="14s" repeatCount="indefinite"/>
    </circle>
    <circle cx="0" cy="-18" r="2.4" fill="#f0e14a">
      <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="6s" repeatCount="indefinite"/>
    </circle>
  </g>
</svg>
`;

fs.writeFileSync(path.join(assets, "hero-portal.svg"), hero);
fs.writeFileSync(path.join(assets, "sprites-parade.svg"), parade);
fs.writeFileSync(path.join(assets, "arcade-button.svg"), button);
fs.writeFileSync(path.join(assets, "save-file.svg"), save);
fs.writeFileSync(path.join(assets, "divider.svg"), footer);
console.log("wrote hero-portal.svg, sprites-parade.svg, arcade-button.svg, save-file.svg, divider.svg");
