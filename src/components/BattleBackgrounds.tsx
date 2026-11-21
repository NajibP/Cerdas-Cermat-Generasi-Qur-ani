export interface CityTheme {
  id: string;
  sky: [string, string, string, string];
  horizonGlow: string;
  farSkyline: string;
  bldgA: string;
  bldgB: string;
  bldgShade: string;
  winLit: string;
  winDim: string;
  mosqueWall: string;
  mosqueShade: string;
  dome: string;
  domeHighlight: string;
  portalGlow: string;
  foliage: string;
  foliageLight: string;
  plazaTop: string;
  plazaBot: string;
  curb: string;
  lampGlow: string;
  cloudColor: string;
  cloudOpacity: string;
  celestial: string;
  extraFx: string;
}

export const CITY_THEMES: CityTheme[] = [
  {
    // 0: Hantu Api — Blazing Modern Sunset Metropolis
    id: 'api',
    sky: ['#2D102C', '#8F2940', '#F06A43', '#FFD07B'],
    horizonGlow: '#FF9E44',
    farSkyline: '#5E243B',
    bldgA: '#4E2238',
    bldgB: '#3D192D',
    bldgShade: '#260E1B',
    winLit: '#FFE27A',
    winDim: '#6B3448',
    mosqueWall: '#FFF3E4',
    mosqueShade: '#E0B99E',
    dome: '#FF7A2F',
    domeHighlight: '#FFB970',
    portalGlow: '#FFD166',
    foliage: '#2B5B3B',
    foliageLight: '#4A8C55',
    plazaTop: '#6E7A56',
    plazaBot: '#465239',
    curb: '#9BAE7B',
    lampGlow: '#FFD466',
    cloudColor: '#FFC49E',
    cloudOpacity: '0.35',
    celestial: '<circle class="sc-pulse" cx="485" cy="84" r="64" fill="#FFE07D" opacity="0.24"/><circle cx="485" cy="84" r="34" fill="#FFD25A"/><circle cx="485" cy="84" r="24" fill="#FFF2B2" opacity="0.7"/>',
    extraFx:
      '<circle class="sc-ember" cx="95" cy="275" r="2.6" fill="#FFD166"/><circle class="sc-ember" cx="245" cy="290" r="2.2" fill="#FF9F1C" style="animation-delay:-1.1s"/><circle class="sc-ember" cx="430" cy="270" r="3" fill="#FFD166" style="animation-delay:-2.1s"/><circle class="sc-ember" cx="535" cy="288" r="2.4" fill="#FF6B35" style="animation-delay:-0.6s"/>'
  },
  {
    // 1: Hantu Racun — Bio-Neon Dusk City
    id: 'racun',
    sky: ['#071812', '#123627', '#216341', '#6BC76B'],
    horizonGlow: '#9CFF57',
    farSkyline: '#133326',
    bldgA: '#173B2D',
    bldgB: '#102B21',
    bldgShade: '#081B14',
    winLit: '#B6FF5C',
    winDim: '#24523E',
    mosqueWall: '#D7F5DF',
    mosqueShade: '#9BC9AA',
    dome: '#2EB85C',
    domeHighlight: '#7BE875',
    portalGlow: '#C2FF66',
    foliage: '#164526',
    foliageLight: '#368042',
    plazaTop: '#295736',
    plazaBot: '#1A3B24',
    curb: '#4C8F58',
    lampGlow: '#B6FF5C',
    cloudColor: '#8AE68E',
    cloudOpacity: '0.24',
    celestial: '<circle class="sc-pulse" cx="490" cy="78" r="56" fill="#B6FF5C" opacity="0.2"/><circle cx="490" cy="78" r="28" fill="#E3FFC2"/>',
    extraFx:
      '<ellipse class="sc-mist" cx="300" cy="290" rx="280" ry="18" fill="#9CFF57" opacity="0.16"/><circle class="sc-ember" cx="135" cy="285" r="4" fill="#B6FF5C" opacity="0.7"/><circle class="sc-ember" cx="365" cy="292" r="3" fill="#7BE36B" style="animation-delay:-1.4s"/><circle class="sc-ember" cx="495" cy="280" r="4.5" fill="#C8FF6B" style="animation-delay:-2.3s"/>'
  },
  {
    // 2: Hantu Bayangan — Modern Twilight Night Skyline
    id: 'bayangan',
    sky: ['#0D0922', '#22184F', '#4A368A', '#8F78D4'],
    horizonGlow: '#BFA8FF',
    farSkyline: '#211847',
    bldgA: '#2B2259',
    bldgB: '#1F1845',
    bldgShade: '#120D2E',
    winLit: '#FFE48F',
    winDim: '#3F337A',
    mosqueWall: '#EAE6FF',
    mosqueShade: '#B6AEDD',
    dome: '#7B5CE6',
    domeHighlight: '#B49CFF',
    portalGlow: '#FFE699',
    foliage: '#1F2547',
    foliageLight: '#343D70',
    plazaTop: '#313257',
    plazaBot: '#1F203B',
    curb: '#54558A',
    lampGlow: '#FFE48F',
    cloudColor: '#C5B8FF',
    cloudOpacity: '0.25',
    celestial:
      Array.from({ length: 20 }, (_, i) => `<circle cx="${(i * 79 + 25) % 580}" cy="${(i * 43 + 18) % 145}" r="${0.9 + (i % 3) * 0.5}" fill="#FFFFFF" opacity="${0.45 + (i % 3) * 0.2}"/>`).join('') +
      '<circle class="sc-pulse" cx="495" cy="72" r="46" fill="#DCD0FF" opacity="0.18"/><path d="M487 50 a24 24 0 1 0 24 34 a19 19 0 1 1 -24 -34Z" fill="#FFF4C2"/>',
    extraFx: '<ellipse class="sc-mist" cx="300" cy="292" rx="260" ry="16" fill="#C9B6FF" opacity="0.18"/>'
  },
  {
    // 3: Hantu Petir — Electric Rainstorm Metropolis
    id: 'petir',
    sky: ['#0B1424', '#1B2D4A', '#345380', '#6F98C9'],
    horizonGlow: '#82D4FF',
    farSkyline: '#1B2B45',
    bldgA: '#243857',
    bldgB: '#1A2A42',
    bldgShade: '#0E192B',
    winLit: '#82E3FF',
    winDim: '#31496E',
    mosqueWall: '#E6F4FF',
    mosqueShade: '#AFC7DB',
    dome: '#2B7CD3',
    domeHighlight: '#73C2FB',
    portalGlow: '#FFE966',
    foliage: '#1E3C38',
    foliageLight: '#336358',
    plazaTop: '#364A5E',
    plazaBot: '#223040',
    curb: '#5B7691',
    lampGlow: '#82E3FF',
    cloudColor: '#9DB8D9',
    cloudOpacity: '0.38',
    celestial:
      '<g class="sc-flash"><path d="M465 18 L442 74 L462 74 L434 134 L486 64 L464 64Z" fill="#FFF36B" opacity="0.9"/><path d="M138 24 L124 64 L138 64 L118 108 L152 56 L138 56Z" fill="#82E3FF" opacity="0.75"/></g>',
    extraFx:
      '<g stroke="#BCE8FF" stroke-width="1.2" opacity="0.22" stroke-linecap="round">' +
      Array.from({ length: 14 }, (_, i) => {
        const rx = (i * 47 + 20) % 590;
        const ry = (i * 53 + 15) % 240;
        return `<line x1="${rx}" y1="${ry}" x2="${rx - 12}" y2="${ry + 28}"/>`;
      }).join('') +
      '</g>'
  },
  {
    // 4: Hantu Neraka — Crimson Ember Skyline
    id: 'neraka',
    sky: ['#17040B', '#4D0B1D', '#99182E', '#EB5252'],
    horizonGlow: '#FF5E4D',
    farSkyline: '#3D0E1B',
    bldgA: '#3B101E',
    bldgB: '#2A0A15',
    bldgShade: '#17040B',
    winLit: '#FF8D4D',
    winDim: '#591A2B',
    mosqueWall: '#FFE4E8',
    mosqueShade: '#CFA1AB',
    dome: '#C41C3B',
    domeHighlight: '#FF5E73',
    portalGlow: '#FFB84D',
    foliage: '#3B1822',
    foliageLight: '#662838',
    plazaTop: '#4A242B',
    plazaBot: '#2E1419',
    curb: '#7A3E48',
    lampGlow: '#FF8A47',
    cloudColor: '#FF707A',
    cloudOpacity: '0.26',
    celestial: '<circle class="sc-pulse" cx="485" cy="82" r="56" fill="#FF4757" opacity="0.28"/><circle cx="485" cy="82" r="28" fill="#FF6B6B"/>',
    extraFx:
      '<circle class="sc-ember" cx="80" cy="285" r="2.8" fill="#FFC800"/><circle class="sc-ember" cx="210" cy="292" r="2.4" fill="#FF5A36" style="animation-delay:-0.9s"/><circle class="sc-ember" cx="390" cy="282" r="3" fill="#FFD166" style="animation-delay:-1.7s"/><circle class="sc-ember" cx="520" cy="290" r="2.6" fill="#FF4A5A" style="animation-delay:-2.4s"/>'
  }
];

export const BOSS_THEME: CityTheme = {
  // Final Boss: Iblis — Menacing Blood-Eclipse Citadel Metropolis
  id: 'boss',
  sky: ['#05010A', '#1A041C', '#5C0821', '#B81D24'],
  horizonGlow: '#FF3B3B',
  farSkyline: '#1C071B',
  bldgA: '#22091E',
  bldgB: '#160515',
  bldgShade: '#09020A',
  winLit: '#FF4747',
  winDim: '#3D1026',
  mosqueWall: '#3A1A36',
  mosqueShade: '#210D21',
  dome: '#A31227',
  domeHighlight: '#FF424E',
  portalGlow: '#FF6B35',
  foliage: '#240B1A',
  foliageLight: '#471529',
  plazaTop: '#2B111C',
  plazaBot: '#16070E',
  curb: '#692232',
  lampGlow: '#FF4A3D',
  cloudColor: '#69122D',
  cloudOpacity: '0.52',
  celestial:
    Array.from({ length: 18 }, (_, i) => `<circle cx="${(i * 83 + 22) % 585}" cy="${(i * 41 + 14) % 130}" r="${0.9 + (i % 3) * 0.45}" fill="#FFD1D1" opacity="0.55"/>`).join('') +
    '<circle class="sc-pulse" cx="300" cy="88" r="82" fill="#FF2B2B" opacity="0.28"/><circle class="sc-pulse" cx="300" cy="88" r="52" fill="#FF6B2B" opacity="0.35"/><circle cx="300" cy="88" r="38" fill="#FF3B3B"/><circle cx="300" cy="88" r="31" fill="#120312"/>' +
    '<g class="sc-flash"><path d="M108 16 L84 72 L104 72 L78 128 L124 62 L104 62Z" fill="#FF6B4A" opacity="0.88"/><path d="M492 22 L474 70 L492 70 L466 122 L512 62 L492 62Z" fill="#FFE066" opacity="0.85"/></g>',
  extraFx:
    '<ellipse class="sc-mist" cx="300" cy="296" rx="300" ry="20" fill="#FF2E2E" opacity="0.2"/>' +
    '<path d="M120 342 L152 328 L178 338 L208 324 M410 344 L446 330 L480 340" stroke="#FF4A2B" stroke-width="2" fill="none" opacity="0.5" stroke-linecap="round"/>' +
    '<circle class="sc-ember" cx="62" cy="285" r="3" fill="#FF9F1C"/><circle class="sc-ember" cx="165" cy="296" r="2.4" fill="#FF3B3B" style="animation-delay:-0.8s"/><circle class="sc-ember" cx="275" cy="280" r="3.2" fill="#FFE066" style="animation-delay:-1.5s"/><circle class="sc-ember" cx="395" cy="294" r="2.8" fill="#FF5A1F" style="animation-delay:-2.1s"/><circle class="sc-ember" cx="518" cy="282" r="3.2" fill="#FF3B3B" style="animation-delay:-0.4s"/><circle class="sc-ember" cx="565" cy="298" r="2.4" fill="#FFC800" style="animation-delay:-2.7s"/>'
};

export function buildCityScene(t: CityTheme): string {
  const skyId = `sky-${t.id}`;
  const glowId = `hglow-${t.id}`;
  const lampId = `lamp-${t.id}`;
  const plazaId = `plaza-${t.id}`;

  const farTowers = [
    [0, 165, 38, 135],
    [34, 132, 46, 168],
    [76, 152, 42, 148],
    [114, 118, 48, 182],
    [158, 170, 38, 130],
    [408, 166, 40, 134],
    [444, 115, 50, 185],
    [490, 142, 44, 158],
    [530, 124, 48, 176],
    [572, 156, 34, 144]
  ]
    .map(
      ([x, y, w, h], idx) =>
        `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${t.farSkyline}" opacity="0.88"/>` +
        (idx % 3 === 0 ? `<line x1="${x + w / 2}" y1="${y}" x2="${x + w / 2}" y2="${y - 14}" stroke="${t.farSkyline}" stroke-width="2.5"/>` : '')
    )
    .join('');

  const midBuildings: Array<[number, number, number, number, boolean]> = [
    [6, 196, 52, 104, true],
    [62, 170, 48, 130, false],
    [114, 214, 52, 86, true],
    [434, 212, 52, 88, false],
    [490, 168, 48, 132, true],
    [542, 192, 52, 108, false]
  ];

  const midMarkup = midBuildings
    .map(([x, y, w, h, alt], bi) => {
      const base = alt ? t.bldgA : t.bldgB;
      const rows = Math.floor((h - 18) / 16);
      const wins = Array.from({ length: rows }, (_, r) =>
        [0, 1, 2]
          .map((c) => {
            const lit = (bi * 7 + r * 3 + c * 5) % 4 !== 0;
            return `<rect x="${x + 7 + c * 13}" y="${y + 10 + r * 15}" width="8" height="9" rx="1.5" fill="${lit ? t.winLit : t.winDim}" opacity="${lit ? '0.92' : '0.6'}"/>`;
          })
          .join('')
      ).join('');
      return (
        `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${base}"/>` +
        `<rect x="${x + w - 9}" y="${y}" width="9" height="${h}" rx="2" fill="${t.bldgShade}" opacity="0.35"/>` +
        `<rect x="${x + 6}" y="${y - 5}" width="${w - 16}" height="5" rx="2" fill="${t.bldgShade}" opacity="0.5"/>` +
        wins
      );
    })
    .join('');

  const trees = [174, 426]
    .map(
      (tx) =>
        `<rect x="${tx - 3}" y="274" width="6" height="26" rx="2" fill="${t.bldgShade}"/>` +
        `<circle cx="${tx}" cy="264" r="16" fill="${t.foliage}"/>` +
        `<circle cx="${tx - 5}" cy="259" r="10" fill="${t.foliageLight}" opacity="0.85"/>`
    )
    .join('');

  const lamps = [42, 152, 448, 558]
    .map(
      (lx) =>
        `<ellipse cx="${lx}" cy="298" rx="28" ry="18" fill="url(#${lampId})" opacity="0.55"/>` +
        `<rect x="${lx - 1.5}" y="242" width="3" height="58" rx="1.5" fill="${t.bldgShade}"/>` +
        `<circle cx="${lx}" cy="240" r="4.5" fill="${t.lampGlow}"/>`
    )
    .join('');

  return `<svg class="absolute inset-0 w-full h-full z-0" viewBox="0 0 600 375" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
<defs>
  <linearGradient id="${skyId}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${t.sky[0]}"/>
    <stop offset="38%" stop-color="${t.sky[1]}"/>
    <stop offset="72%" stop-color="${t.sky[2]}"/>
    <stop offset="100%" stop-color="${t.sky[3]}"/>
  </linearGradient>
  <radialGradient id="${glowId}" cx="50%" cy="80%" r="60%">
    <stop offset="0%" stop-color="${t.horizonGlow}" stop-opacity="0.46"/>
    <stop offset="100%" stop-color="${t.horizonGlow}" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="${lampId}" cx="50%" cy="20%" r="75%">
    <stop offset="0%" stop-color="${t.lampGlow}" stop-opacity="0.8"/>
    <stop offset="100%" stop-color="${t.lampGlow}" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="${plazaId}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${t.plazaTop}"/>
    <stop offset="100%" stop-color="${t.plazaBot}"/>
  </linearGradient>
  <clipPath id="dome-clip-${t.id}">
    <path d="M248 218 C243 188 270 164 300 154 C330 164 357 188 352 218 Z"/>
  </clipPath>
</defs>

<rect width="600" height="375" fill="url(#${skyId})"/>
<rect y="110" width="600" height="200" fill="url(#${glowId})"/>
${t.celestial}

<g class="cloud-drift" fill="${t.cloudColor}" opacity="${t.cloudOpacity}">
  <ellipse cx="115" cy="72" rx="48" ry="15"/><ellipse cx="148" cy="62" rx="30" ry="15"/>
</g>
<g class="cloud-drift" fill="${t.cloudColor}" opacity="${t.cloudOpacity}" style="animation-delay:-18s">
  <ellipse cx="340" cy="46" rx="44" ry="14"/><ellipse cx="368" cy="38" rx="26" ry="12"/>
</g>

${farTowers}
<rect y="210" width="600" height="90" fill="url(#${glowId})" opacity="0.5"/>
${midMarkup}

<g>
  <rect x="201" y="164" width="20" height="136" rx="2" fill="${t.mosqueWall}"/>
  <rect x="214" y="164" width="7" height="136" fill="${t.mosqueShade}" opacity="0.55"/>
  <rect x="197" y="182" width="28" height="5" rx="2" fill="${t.mosqueShade}"/>
  <path d="M198 164 C198 154 205 148 211 144 C217 148 224 154 224 164Z" fill="${t.dome}"/>
  <circle cx="211" cy="142" r="2.6" fill="#FFC800"/>

  <rect x="379" y="164" width="20" height="136" rx="2" fill="${t.mosqueWall}"/>
  <rect x="392" y="164" width="7" height="136" fill="${t.mosqueShade}" opacity="0.55"/>
  <rect x="375" y="182" width="28" height="5" rx="2" fill="${t.mosqueShade}"/>
  <path d="M376 164 C376 154 383 148 389 144 C395 148 402 154 402 164Z" fill="${t.dome}"/>
  <circle cx="389" cy="142" r="2.6" fill="#FFC800"/>

  <path d="M248 218 C243 188 270 164 300 154 C330 164 357 188 352 218 Z" fill="${t.dome}"/>
  <g clip-path="url(#dome-clip-${t.id})">
    <path d="M259 218 C257 193 274 174 295 162" stroke="${t.domeHighlight}" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.65"/>
    <path d="M300 154 C330 164 357 188 352 218 L324 218 C331 190 318 168 300 154 Z" fill="#000000" opacity="0.16"/>
  </g>
  <rect x="244" y="216" width="112" height="10" rx="3" fill="${t.mosqueShade}" opacity="0.75"/>
  <ellipse cx="300" cy="155" rx="5.5" ry="2.5" fill="#FFC800"/>
  <line x1="300" y1="155" x2="300" y2="141" stroke="#FFC800" stroke-width="2.8" stroke-linecap="round"/>
  <circle cx="300" cy="147" r="2.2" fill="#FFC800"/>
  <path d="M303.5 130.5 a6 6 0 1 0 0 11 a4.7 4.7 0 1 1 0 -11Z" fill="#FFC800"/>

  <rect x="224" y="224" width="152" height="76" rx="5" fill="${t.mosqueWall}"/>
  <rect x="358" y="224" width="18" height="76" rx="3" fill="${t.mosqueShade}" opacity="0.45"/>
  <path d="M242 284 L242 256 Q254 242 266 256 L266 284Z" fill="${t.portalGlow}" opacity="0.88"/>
  <path d="M334 284 L334 256 Q346 242 358 256 L358 284Z" fill="${t.portalGlow}" opacity="0.88"/>
  <path d="M278 300 L278 260 Q300 236 322 260 L322 300Z" fill="${t.portalGlow}"/>
  <path d="M284 300 L284 264 Q300 245 316 264 L316 300Z" fill="#FFFFFF" opacity="0.32"/>
</g>

${trees}
${lamps}

<rect y="298" width="600" height="77" fill="url(#${plazaId})"/>
<rect y="298" width="600" height="6" fill="${t.curb}" opacity="0.75"/>
<rect y="304" width="600" height="4" fill="#000000" opacity="0.16"/>
<g stroke="#FFFFFF" stroke-width="1" opacity="0.1">
  <line x1="0" y1="322" x2="600" y2="322"/>
  <line x1="0" y1="348" x2="600" y2="348"/>
  <line x1="120" y1="304" x2="80" y2="375"/>
  <line x1="220" y1="304" x2="195" y2="375"/>
  <line x1="300" y1="304" x2="300" y2="375"/>
  <line x1="380" y1="304" x2="405" y2="375"/>
  <line x1="480" y1="304" x2="520" y2="375"/>
</g>

${t.extraFx}
</svg>`;
}

export const sceneV = (v: number) => buildCityScene(CITY_THEMES[v % CITY_THEMES.length]);
export const sceneMega = () => buildCityScene(BOSS_THEME);
