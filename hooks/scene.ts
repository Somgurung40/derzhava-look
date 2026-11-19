// Пляж-флаг. Светлая тема: синее небо и море над жёлтым песком.
// Тёмная: красное закатное небо над чёрным морем и чёрным песком.
// Движение медленное: волны, облака, блики, чайки, звёзды.

function stars(): string {
  let seed = 7
  const rnd = () => {
    seed = (seed * 16807) % 2147483647
    return seed / 2147483647
  }
  let out = ''
  for (let i = 0; i < 46; i++) {
    const x = Math.round(rnd() * 1600)
    const y = Math.round(rnd() * 260)
    const r = (0.8 + rnd() * 1.4).toFixed(1)
    const d = (3 + rnd() * 5).toFixed(1)
    const delay = (rnd() * 6).toFixed(1)
    out += `<circle class="star" cx="${x}" cy="${y}" r="${r}" style="animation-duration:${d}s;animation-delay:-${delay}s"/>`
  }
  return out
}

function glints(): string {
  let out = ''
  for (let i = 0; i < 9; i++) {
    const y = 560 + i * 14
    const w = 170 - i * 14
    out += `<rect class="glint" x="${1180 - w / 2}" y="${y}" width="${w}" height="3" rx="1.5" style="animation-delay:-${(i * 0.7).toFixed(1)}s"/>`
  }
  return out
}

const WAVE = 'M0 0 Q100 -10 200 0 T400 0 T600 0 T800 0 T1000 0 T1200 0 T1400 0 T1600 0 T1800 0 T2000 0 T2200 0 T2400 0 T2600 0 T2800 0 T3000 0 T3200 0'

export const SCENE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop class="sk1" offset="0"/><stop class="sk2" offset="1"/></linearGradient>
<linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop class="se1" offset="0"/><stop class="se2" offset="1"/></linearGradient>
<linearGradient id="sand" x1="0" y1="0" x2="0" y2="1"><stop class="sa1" offset="0"/><stop class="sa2" offset="1"/></linearGradient>
<radialGradient id="glow"><stop class="gl1" offset="0"/><stop class="gl2" offset="1"/></radialGradient>
</defs>
<style>
.sk1{stop-color:#2f7fd6}.sk2{stop-color:#a9d8f7}
.se1{stop-color:#1f6fb8}.se2{stop-color:#4fa6dc}
.sa1{stop-color:#f7d65a}.sa2{stop-color:#eebd2c}
.gl1{stop-color:#fff6c2;stop-opacity:.9}.gl2{stop-color:#fff6c2;stop-opacity:0}
.sun{fill:#ffe066}
.cloud{fill:#ffffff;opacity:.85}
.foam{fill:none;stroke:#ffffff;stroke-width:3;opacity:.55}
.wash{fill:#fdf3c4;opacity:.7}
.glint{fill:#fffbe0;opacity:.5}
.palm{fill:#2e6b3a}.trunk{fill:#8a5a2b}
.gull{fill:none;stroke:#28466b;stroke-width:3;stroke-linecap:round}
.stars{display:none}
.star{fill:#ffd9d0;animation:tw 5s ease-in-out infinite}
.drift{animation:drift 120s linear infinite}
.drift2{animation:drift 180s linear infinite}
.w1{animation:roll 26s linear infinite}
.w2{animation:roll 38s linear infinite reverse}
.w3{animation:roll 52s linear infinite}
.lap{animation:lap 9s ease-in-out infinite}
.glint{animation:shine 6s ease-in-out infinite}
.fly{animation:fly 70s linear infinite}
.sway{transform-origin:140px 900px;animation:sway 11s ease-in-out infinite}
.pulse{transform-origin:1180px 520px;animation:pulse 14s ease-in-out infinite}
@keyframes drift{from{transform:translateX(0)}to{transform:translateX(-1600px)}}
@keyframes roll{from{transform:translateX(0)}to{transform:translateX(-400px)}}
@keyframes lap{0%,100%{transform:translateY(0)}50%{transform:translateY(10px)}}
@keyframes shine{0%,100%{opacity:.15}50%{opacity:.6}}
@keyframes tw{0%,100%{opacity:.25}50%{opacity:.9}}
@keyframes fly{from{transform:translateX(0)}to{transform:translateX(-1900px)}}
@keyframes sway{0%,100%{transform:rotate(-1.2deg)}50%{transform:rotate(1.2deg)}}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
@media (prefers-color-scheme: dark){
.sk1{stop-color:#3a0006}.sk2{stop-color:#c4161c}
.se1{stop-color:#160607}.se2{stop-color:#050505}
.sa1{stop-color:#141212}.sa2{stop-color:#050505}
.gl1{stop-color:#ff5a3c;stop-opacity:.85}.gl2{stop-color:#ff5a3c;stop-opacity:0}
.sun{fill:#ff3b24}
.cloud{fill:#5a0a10;opacity:.7}
.foam{stroke:#c4161c;opacity:.45}
.wash{fill:#2a0b0d;opacity:.8}
.glint{fill:#ff4a2e}
.palm{fill:#020202}.trunk{fill:#0a0a0a}
.gull{stroke:#1a0204}
.stars{display:inline}
}
</style>
<rect width="1600" height="560" fill="url(#sky)"/>
<g class="stars">${stars()}</g>
<g class="pulse"><circle cx="1180" cy="200" r="190" fill="url(#glow)"/><circle class="sun" cx="1180" cy="200" r="62"/></g>
<g class="drift"><g>
<ellipse class="cloud" cx="300" cy="140" rx="120" ry="30"/><ellipse class="cloud" cx="360" cy="120" rx="80" ry="28"/>
<ellipse class="cloud" cx="900" cy="90" rx="140" ry="26"/><ellipse class="cloud" cx="1500" cy="170" rx="100" ry="24"/>
<ellipse class="cloud" cx="1900" cy="140" rx="120" ry="30"/><ellipse class="cloud" cx="1960" cy="120" rx="80" ry="28"/>
<ellipse class="cloud" cx="2500" cy="90" rx="140" ry="26"/><ellipse class="cloud" cx="3100" cy="170" rx="100" ry="24"/>
</g></g>
<g class="drift2"><ellipse class="cloud" cx="650" cy="230" rx="90" ry="16"/><ellipse class="cloud" cx="2250" cy="230" rx="90" ry="16"/></g>
<rect y="520" width="1600" height="200" fill="url(#sea)"/>
<g>${glints()}</g>
<g transform="translate(0 560)"><path class="foam w3" d="${WAVE}"/></g>
<g transform="translate(0 610)"><path class="foam w2" d="${WAVE}"/></g>
<g transform="translate(0 660)"><path class="foam w1" d="${WAVE}"/></g>
<g class="lap"><path class="wash" d="M0 690 Q200 670 400 688 T800 684 T1200 690 T1600 682 L1600 720 L0 720 Z"/></g>
<path fill="url(#sand)" d="M0 705 Q220 690 450 702 T900 698 T1350 706 T1600 700 L1600 900 L0 900 Z"/>
<g class="fly"><g transform="translate(1700 300)">
<path class="gull" d="M0 0 q12 -10 24 0 q12 -10 24 0"/>
<path class="gull" d="M70 30 q9 -8 18 0 q9 -8 18 0"/>
<path class="gull" d="M40 -40 q8 -7 16 0 q8 -7 16 0"/>
</g></g>
<g class="sway">
<path class="trunk" d="M150 900 C150 760 170 620 215 500 L232 506 C192 625 176 765 178 900 Z"/>
<path class="palm" d="M222 500 C160 450 90 450 30 495 C100 470 160 480 222 505 Z"/>
<path class="palm" d="M222 500 C190 420 130 390 70 400 C140 420 185 455 220 506 Z"/>
<path class="palm" d="M224 500 C270 430 340 410 410 430 C340 440 280 465 226 506 Z"/>
<path class="palm" d="M224 502 C300 480 370 500 420 555 C360 520 290 510 226 508 Z"/>
<path class="palm" d="M222 498 C215 430 240 380 280 350 C255 400 240 445 226 504 Z"/>
</g>
</svg>`
