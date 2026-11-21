export interface SyaitanDef {
  n: string;
  outline: string;
  cTop: string;
  cMid: string;
  cBot: string;
  fold: string;
  rim: string;
  cheek: string;
  eyeBg: string;
  eyeDot: string;
  mouth: string;
  fire1: string;
  fire2: string;
  aura: string;
  crown?: string;
  slime?: string;
  horns?: boolean;
  wisps: string;
}

export const SYV: SyaitanDef[] = [
  {
    n: 'Hantu Api',
    outline: '#3D110A',
    cTop: '#FFF3E4',
    cMid: '#FF9B5E',
    cBot: '#E84724',
    fold: '#BD2B12',
    rim: '#FFFFFF',
    cheek: '#FF6B4A',
    eyeBg: '#230A07',
    eyeDot: '#FFF7D6',
    mouth: '#2B0B07',
    fire1: '#FFC800',
    fire2: '#FF4B1F',
    aura: '#FF8A3D',
    crown:
      '<g class="k-glow"><path d="M104 42 Q94 14 114 4 Q114 22 126 24 Q126 10 138 4 Q142 26 130 42Z" fill="#FF7A1A" stroke="#3D110A" stroke-width="3.5" stroke-linejoin="round"/><path d="M113 40 Q109 24 119 18 Q121 28 128 28 Q129 21 134 18 Q134 31 126 40Z" fill="#FFE066"/></g>',
    wisps:
      '<g class="k-wisp-a"><path d="M36 104 Q28 92 38 82 Q40 91 46 92 Q46 84 52 80 Q53 96 44 106Z" fill="#FF9F1C" stroke="#3D110A" stroke-width="2.5" stroke-linejoin="round"/><circle cx="32" cy="72" r="3.5" fill="#FFE066"/></g><g class="k-wisp-b"><path d="M214 76 Q208 66 216 58 Q217 65 223 66 Q223 60 228 57 Q228 70 221 78Z" fill="#FF5A1F" stroke="#3D110A" stroke-width="2.5" stroke-linejoin="round"/><circle cx="228" cy="96" r="3" fill="#FFD166"/></g>'
  },
  {
    n: 'Hantu Racun',
    outline: '#123821',
    cTop: '#EEFFE6',
    cMid: '#7BE36B',
    cBot: '#299E54',
    fold: '#1B783E',
    rim: '#FFFFFF',
    cheek: '#B6FF3D',
    eyeBg: '#0E2918',
    eyeDot: '#F2FFE6',
    mouth: '#112E1B',
    fire1: '#C8FF47',
    fire2: '#2CC95C',
    aura: '#6CE55B',
    slime:
      '<path d="M98 186 Q98 198 103 200 Q108 198 108 186Z M156 184 Q156 196 161 198 Q166 196 166 184Z" fill="#9CFF57" stroke="#123821" stroke-width="2.6"/><path d="M56 149 Q54 159 58 161 Q62 159 61 148Z" fill="#9CFF57" stroke="#123821" stroke-width="2.4"/>',
    wisps:
      '<g class="k-wisp-a"><circle cx="38" cy="100" r="8" fill="#B6FF3D" stroke="#123821" stroke-width="2.6"/><circle cx="35.5" cy="97.5" r="2.2" fill="#fff"/><circle cx="50" cy="78" r="4.5" fill="#7BE36B" stroke="#123821" stroke-width="2.2"/></g><g class="k-wisp-b"><circle cx="218" cy="74" r="7" fill="#B6FF3D" stroke="#123821" stroke-width="2.6"/><circle cx="215.8" cy="71.8" r="2" fill="#fff"/><circle cx="228" cy="96" r="4" fill="#58CC02" stroke="#123821" stroke-width="2.2"/></g>'
  },
  {
    n: 'Hantu Bayangan',
    outline: '#1D1C3D',
    cTop: '#F4F5FC',
    cMid: '#B9BFE3',
    cBot: '#7B7DBA',
    fold: '#6264A3',
    rim: '#FFFFFF',
    cheek: '#F5989D',
    eyeBg: '#191936',
    eyeDot: '#FFFFFF',
    mouth: '#1D1C3D',
    fire1: '#C9B6FF',
    fire2: '#6A4BD0',
    aura: '#9B8CE8',
    wisps:
      '<g class="k-wisp-a"><path d="M40 100 Q44 88 48 100 Q60 104 48 108 Q44 120 40 108 Q28 104 40 100Z" fill="#EDE9FF" stroke="#1D1C3D" stroke-width="2.4" stroke-linejoin="round"/><path d="M31 124 l5 -2 l2 -5 l2 5 l5 2 l-5 2 l-2 5 l-2 -5Z" fill="#1D1C3D"/></g><g class="k-wisp-b"><path d="M214 68 a9 9 0 1 0 10 13 a7 7 0 1 1 -10 -13Z" fill="#D8CEFF" stroke="#1D1C3D" stroke-width="2.4"/><path d="M196 86 l4 -1.5 l1.5 -4 l1.5 4 l4 1.5 l-4 1.5 l-1.5 4 l-1.5 -4Z" fill="#1D1C3D"/></g>'
  },
  {
    n: 'Hantu Petir',
    outline: '#112854',
    cTop: '#F0FAFF',
    cMid: '#82D4FF',
    cBot: '#397EE0',
    fold: '#245BB5',
    rim: '#FFFFFF',
    cheek: '#FFE054',
    eyeBg: '#0E2045',
    eyeDot: '#FFFBE0',
    mouth: '#112854',
    fire1: '#FFF36B',
    fire2: '#1CB0F6',
    aura: '#FFE94A',
    crown:
      '<g class="k-glow"><path d="M126 6 L111 27 L123 27 L116 44 L138 22 L126 22Z" fill="#FFE94A" stroke="#112854" stroke-width="2.8" stroke-linejoin="round"/></g>',
    wisps:
      '<g class="k-wisp-a"><path d="M48 82 L34 102 L44 102 L38 119 L56 97 L46 97Z" fill="#FFF04A" stroke="#112854" stroke-width="2.5" stroke-linejoin="round"/><circle cx="30" cy="84" r="3" fill="#FFF7A8"/></g><g class="k-wisp-b"><path d="M218 62 L206 80 L215 80 L210 95 L226 76 L217 76Z" fill="#FFF04A" stroke="#112854" stroke-width="2.5" stroke-linejoin="round"/><circle cx="230" cy="96" r="3.2" fill="#82D4FF"/></g>'
  },
  {
    n: 'Hantu Neraka',
    outline: '#290713',
    cTop: '#FFE8EE',
    cMid: '#DF4E6B',
    cBot: '#73142E',
    fold: '#520B1F',
    rim: '#FFF5F7',
    cheek: '#FF708B',
    eyeBg: '#240510',
    eyeDot: '#FFD84A',
    mouth: '#290713',
    fire1: '#FF4A5A',
    fire2: '#8E1022',
    aura: '#FF3D57',
    horns: true,
    wisps:
      '<g class="k-wisp-a"><path d="M40 88 L47 99 L40 110 L33 99Z" fill="#FF4A5A" stroke="#290713" stroke-width="2.4"/><circle cx="48" cy="72" r="3" fill="#FFC800"/></g><g class="k-wisp-b"><path d="M218 66 L225 77 L218 88 L211 77Z" fill="#FFC800" stroke="#290713" stroke-width="2.4"/><circle cx="228" cy="98" r="3.2" fill="#FF4A5A"/></g>'
  }
];

export function syaitanSVG(v: number): string {
  const idx = v % SYV.length;
  const d = SYV[idx];
  const gid = `sy-g-${idx}`;
  const aid = `sy-a-${idx}`;
  const hornsMarkup = d.horns
    ? `<path d="M96 42 Q76 20 84 6 Q94 22 108 36Z" fill="#3A0F1D" stroke="${d.outline}" stroke-width="3.5" stroke-linejoin="round"/><path d="M148 42 Q168 18 160 4 Q150 22 138 36Z" fill="#3A0F1D" stroke="${d.outline}" stroke-width="3.5" stroke-linejoin="round"/><path d="M86 12 Q90 22 98 30" stroke="#FFC800" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M158 10 Q154 21 146 30" stroke="#FFC800" stroke-width="2.2" fill="none" stroke-linecap="round"/>`
    : '';

  return `<svg class="kz w-full h-auto block overflow-visible" viewBox="0 0 260 230" aria-label="${d.n}">
<defs>
  <linearGradient id="${gid}" x1="25%" y1="5%" x2="82%" y2="95%">
    <stop offset="0%" stop-color="${d.cTop}"/>
    <stop offset="52%" stop-color="${d.cMid}"/>
    <stop offset="100%" stop-color="${d.cBot}"/>
  </linearGradient>
  <radialGradient id="${aid}" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="${d.aura}" stop-opacity="0.38"/>
    <stop offset="100%" stop-color="${d.aura}" stop-opacity="0"/>
  </radialGradient>
</defs>
<ellipse class="k-shadow" cx="132" cy="212" rx="64" ry="9" fill="#000"/>
<g class="k-float">
  <ellipse class="k-glow" cx="132" cy="122" rx="92" ry="88" fill="url(#${aid})"/>
  ${d.wisps}
  ${d.crown || ''}
  ${hornsMarkup}
  <g class="k-arm-l">
    <path d="M78 118 Q54 126 45 140 Q42 150 56 152 Q70 153 84 146" fill="url(#${gid})" stroke="${d.outline}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M52 146 Q64 148 76 140" stroke="${d.fold}" stroke-width="3" fill="none" opacity="0.45" stroke-linecap="round"/>
  </g>
  <g class="k-arm-r">
    <path d="M174 108 Q194 94 206 98 Q216 104 208 128 Q200 152 186 164" fill="url(#${gid})" stroke="${d.outline}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M196 105 Q203 116 192 142" stroke="${d.fold}" stroke-width="4" fill="none" opacity="0.35" stroke-linecap="round"/>
  </g>
  <path d="M124 34 C92 34 74 60 72 94 C70 120 68 136 58 156 C55 166 64 178 78 180 C86 181 94 189 108 190 C122 191 132 184 144 188 C160 193 174 186 182 174 C192 158 190 124 182 92 C174 56 156 34 124 34 Z" fill="url(#${gid})" stroke="${d.outline}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M150 48 C168 62 176 92 182 128 C186 154 176 176 154 182 C164 164 166 136 160 104 C156 80 148 60 140 48 Z" fill="${d.fold}" opacity="0.36"/>
  <path d="M74 156 C86 172 114 178 148 176 C132 185 104 188 84 178 C72 172 70 162 74 156 Z" fill="${d.fold}" opacity="0.28"/>
  <path d="M90 52 C102 41 122 39 136 44" stroke="${d.rim}" stroke-width="4.5" stroke-linecap="round" fill="none" opacity="0.72"/>
  ${d.slime || ''}
  <g class="k-eyes-normal">
    <ellipse cx="95" cy="82" rx="7" ry="11.5" fill="${d.eyeBg}"/>
    <ellipse cx="122" cy="80" rx="7.2" ry="11.8" fill="${d.eyeBg}"/>
    <circle cx="93" cy="77" r="2.7" fill="${d.eyeDot}"/>
    <circle cx="97" cy="85" r="1.2" fill="${d.eyeDot}" opacity="0.8"/>
    <circle cx="120" cy="75" r="2.8" fill="${d.eyeDot}"/>
    <circle cx="124" cy="83" r="1.2" fill="${d.eyeDot}" opacity="0.8"/>
    <path d="M89 65 Q96 62 102 65" stroke="${d.outline}" stroke-width="2.2" fill="none" stroke-linecap="round" opacity="0.5"/>
    <path d="M116 63 Q123 60 129 64" stroke="${d.outline}" stroke-width="2.2" fill="none" stroke-linecap="round" opacity="0.5"/>
  </g>
  <g class="k-xeye" stroke="${d.outline}" stroke-width="4" stroke-linecap="round">
    <path d="M89 75 L101 89 M101 75 L89 89"/>
    <path d="M116 73 L128 87 M128 73 L116 87"/>
  </g>
  <ellipse cx="83" cy="96" rx="7.5" ry="4.2" fill="${d.cheek}" opacity="0.68"/>
  <ellipse cx="135" cy="94" rx="7.5" ry="4.2" fill="${d.cheek}" opacity="0.68"/>
  <g class="k-jaw">
    <path d="M97 99 Q110 103 122 98 Q119 116 108 116 Q98 116 97 99Z" fill="${d.mouth}"/>
    <path d="M103 111 Q109 114 115 110 Q109 107 103 111Z" fill="#FF8599" opacity="0.85"/>
  </g>
  <g class="k-fire">
    <path d="M92 106 Q54 90 12 106 Q54 124 92 114Z" fill="${d.fire1}"/>
    <path d="M88 107 Q58 98 28 107 Q58 116 88 111Z" fill="${d.fire2}"/>
  </g>
  <g class="dizzy" fill="#FFC800" stroke="${d.outline}" stroke-width="1.2" font-size="20" font-family="sans-serif">
    <text x="80" y="24">★</text><text x="114" y="12">★</text><text x="148" y="24">★</text>
  </g>
</g>
</svg>`;
}

export function megaSVG(): string {
  return `<svg class="kz w-full h-auto block overflow-visible" viewBox="0 0 320 270" aria-label="Iblis">
<defs>
  <linearGradient id="iblis-red" x1="25%" y1="6%" x2="82%" y2="96%">
    <stop offset="0%" stop-color="#FF6B70"/>
    <stop offset="48%" stop-color="#E62537"/>
    <stop offset="100%" stop-color="#AC0D21"/>
  </linearGradient>
  <linearGradient id="iblis-horn" x1="20%" y1="0%" x2="85%" y2="100%">
    <stop offset="0%" stop-color="#FF7F82"/>
    <stop offset="100%" stop-color="#BD1528"/>
  </linearGradient>
  <linearGradient id="iblis-wing" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#EE3142"/>
    <stop offset="100%" stop-color="#960D20"/>
  </linearGradient>
  <radialGradient id="iblis-aura" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#FF4242" stop-opacity="0.34"/>
    <stop offset="58%" stop-color="#FF8800" stop-opacity="0.14"/>
    <stop offset="100%" stop-color="#8E0B1D" stop-opacity="0"/>
  </radialGradient>
</defs>
<ellipse cx="176" cy="252" rx="76" ry="10" fill="#2B070C" opacity="0.22"/>
<ellipse class="k-glow" cx="172" cy="146" rx="126" ry="102" fill="url(#iblis-aura)"/>
<g class="k-wisp-a">
  <path d="M40 84 Q34 73 43 65 Q44 72 49 73 Q50 67 54 64 Q55 77 47 86Z" fill="#FF9F1C" stroke="#2B070C" stroke-width="2.2" stroke-linejoin="round"/>
  <circle cx="32" cy="108" r="3.5" fill="#FFE066"/>
</g>
<g class="k-wisp-b">
  <path d="M284 96 Q279 86 286 79 Q288 85 292 86 Q293 80 297 78 Q298 90 291 97Z" fill="#FF4B2B" stroke="#2B070C" stroke-width="2.2" stroke-linejoin="round"/>
  <circle cx="294" cy="126" r="3" fill="#FFD166"/>
</g>
<g class="k-tail">
  <path d="M204 205 Q248 216 269 180" fill="none" stroke="#2B070C" stroke-width="11" stroke-linecap="round"/>
  <path d="M204 205 Q248 216 269 180" fill="none" stroke="#D91F33" stroke-width="4.5" stroke-linecap="round"/>
  <path d="M276 164 L257 177 L270 183 L278 193Z" fill="#E62537" stroke="#2B070C" stroke-width="3.8" stroke-linejoin="round"/>
</g>
<g class="k-wing">
  <path d="M142 152 Q98 118 52 146 Q74 152 84 168 Q102 162 112 178 Q128 168 140 178Z" fill="url(#iblis-wing)" stroke="#2B070C" stroke-width="4.4" stroke-linejoin="round"/>
  <path d="M56 146 Q98 136 136 164 M84 166 Q110 152 136 168" stroke="#2B070C" stroke-width="2.6" fill="none" stroke-linecap="round"/>
</g>
<g class="k-wing w2">
  <path d="M204 152 Q248 118 294 146 Q272 152 262 168 Q244 162 234 178 Q218 168 206 178Z" fill="url(#iblis-wing)" stroke="#2B070C" stroke-width="4.4" stroke-linejoin="round"/>
  <path d="M290 146 Q248 136 210 164 M262 166 Q236 152 210 168" stroke="#2B070C" stroke-width="2.6" fill="none" stroke-linecap="round"/>
</g>
<g class="k-arm-r">
  <path d="M196 158 Q211 171 205 191 Q202 198 195 195 Q189 192 192 174" fill="url(#iblis-red)" stroke="#2B070C" stroke-width="4.4" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<g class="k-arm">
  <path d="M98 250 L62 110" stroke="#2B070C" stroke-width="8.5" stroke-linecap="round"/>
  <path d="M98 250 L62 110" stroke="#6B282E" stroke-width="4" stroke-linecap="round"/>
  <path d="M40 94 Q42 126 65 120 Q88 114 78 82" fill="none" stroke="#2B070C" stroke-width="9.5" stroke-linecap="round"/>
  <path d="M40 94 Q42 126 65 120 Q88 114 78 82" fill="none" stroke="#FF3B47" stroke-width="4.8" stroke-linecap="round"/>
  <path d="M62 110 L57 82" stroke="#2B070C" stroke-width="9.5" stroke-linecap="round"/>
  <path d="M62 110 L57 82" stroke="#FF3B47" stroke-width="4.8" stroke-linecap="round"/>
  <path d="M38 80 L33 97 L48 94Z M55 68 L50 86 L65 84Z M76 70 L71 87 L86 85Z" fill="#FF545B" stroke="#2B070C" stroke-width="3.2" stroke-linejoin="round"/>
  <circle class="k-glow" cx="58" cy="96" r="10" fill="#FFE066" opacity="0.32"/>
  <path d="M150 158 Q119 178 89 181" fill="none" stroke="#2B070C" stroke-width="19" stroke-linecap="round"/>
  <path d="M150 158 Q119 178 89 181" fill="none" stroke="#E62537" stroke-width="10.5" stroke-linecap="round"/>
  <circle cx="84" cy="182" r="9.5" fill="url(#iblis-red)" stroke="#2B070C" stroke-width="4.2"/>
</g>
<g class="k-body">
  <path d="M140 152 C136 178 138 208 142 234 C144 246 162 248 164 234 C166 220 168 214 173 214 C178 214 180 220 182 234 C184 248 202 246 204 234 C208 208 210 178 206 152 Z" fill="url(#iblis-red)" stroke="#2B070C" stroke-width="4.8" stroke-linejoin="round"/>
  <path d="M189 160 C197 182 198 212 194 236 C200 232 203 210 202 178 C201 168 196 160 189 160 Z" fill="#8E0B1D" opacity="0.34"/>
  <ellipse cx="168" cy="186" rx="18" ry="20" fill="#FF7378" opacity="0.24"/>
</g>
<g class="k-head">
  <path d="M117 95 Q96 86 92 71 Q108 77 122 86Z" fill="url(#iblis-red)" stroke="#2B070C" stroke-width="4.4" stroke-linejoin="round"/>
  <path d="M102 80 Q110 85 116 90" stroke="#2B070C" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M227 95 Q248 86 252 71 Q236 77 222 86Z" fill="url(#iblis-red)" stroke="#2B070C" stroke-width="4.4" stroke-linejoin="round"/>
  <path d="M242 80 Q234 85 228 90" stroke="#2B070C" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <ellipse cx="172" cy="105" rx="60" ry="51" fill="url(#iblis-red)" stroke="#2B070C" stroke-width="4.8"/>
  <path d="M132 69 C149 58 175 56 196 63" stroke="#FFA3A8" stroke-width="4.5" stroke-linecap="round" fill="none" opacity="0.72"/>
  <path d="M206 67 C222 82 227 110 214 134 C203 148 182 154 162 153 C186 149 205 134 210 108 C213 91 210 77 206 67 Z" fill="#8E0B1D" opacity="0.32"/>
  <path d="M126 67 Q112 41 122 19 Q130 39 144 57 Q134 62 126 67Z" fill="url(#iblis-horn)" stroke="#2B070C" stroke-width="4.4" stroke-linejoin="round"/>
  <path d="M124 31 Q125 44 132 54" stroke="#FFA3A8" stroke-width="2.4" fill="none" stroke-linecap="round" opacity="0.75"/>
  <path d="M218 67 Q232 41 222 19 Q214 39 200 57 Q210 62 218 67Z" fill="url(#iblis-horn)" stroke="#2B070C" stroke-width="4.4" stroke-linejoin="round"/>
  <path d="M217 31 Q217 44 210 54" stroke="#FFA3A8" stroke-width="2.4" fill="none" stroke-linecap="round" opacity="0.75"/>
  <path d="M129 88 L153 96" stroke="#2B070C" stroke-width="5.6" stroke-linecap="round"/>
  <path d="M207 86 L183 96" stroke="#2B070C" stroke-width="5.6" stroke-linecap="round"/>
  <g class="k-eyes-normal">
    <ellipse cx="144" cy="107" rx="7" ry="10.5" fill="#2B070C"/>
    <ellipse cx="192" cy="106" rx="7" ry="10.5" fill="#2B070C"/>
    <circle cx="142" cy="103" r="2.5" fill="#FFFFFF"/>
    <circle cx="190" cy="102" r="2.5" fill="#FFFFFF"/>
    <circle cx="145" cy="111" r="1.3" fill="#FF9F1C" opacity="0.75"/>
    <circle cx="193" cy="110" r="1.3" fill="#FF9F1C" opacity="0.75"/>
  </g>
  <g class="k-xeye" stroke="#FFFFFF" stroke-width="4.2" stroke-linecap="round">
    <path d="M137 99 L151 115 M151 99 L137 115"/>
    <path d="M185 98 L199 114 M199 98 L185 114"/>
  </g>
  <ellipse cx="129" cy="118" rx="6.5" ry="3.5" fill="#FF8FA3" opacity="0.48"/>
  <ellipse cx="206" cy="117" rx="6.5" ry="3.5" fill="#FF8FA3" opacity="0.48"/>
  <g class="k-jaw">
    <path d="M150 119 Q168 128 186 118 Q181 131 168 131 Q155 131 150 119Z" fill="#2B070C"/>
    <path d="M153 121 L157 129 L161 122Z M175 121 L179 129 L183 120Z" fill="#FFFFFF" stroke="#2B070C" stroke-width="1.2" stroke-linejoin="round"/>
  </g>
  <g class="k-fire">
    <path d="M144 124 Q84 100 18 122 Q84 146 144 134Z" fill="#FF9F1C"/>
    <path d="M138 125 Q90 112 42 125 Q90 136 138 130Z" fill="#FFE066"/>
  </g>
  <g class="dizzy" fill="#FFC800" stroke="#2B070C" stroke-width="1.4" font-size="22" font-family="sans-serif">
    <text x="122" y="18">★</text><text x="164" y="6">★</text><text x="206" y="18">★</text>
  </g>
</g>
</svg>`;
}

export const HERO_SIGIL =
  '<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="48" fill="none" stroke="#FFE066" stroke-width="4" stroke-dasharray="14 7"/><circle cx="60" cy="60" r="34" fill="none" stroke="#58CC02" stroke-width="3"/><rect x="28" y="28" width="64" height="64" fill="none" stroke="#FFE066" stroke-width="2.5"/><rect x="28" y="28" width="64" height="64" transform="rotate(45 60 60)" fill="none" stroke="#FFFDF0" stroke-width="2.5"/><path d="M64 38 a16 16 0 1 0 16 22 a12.5 12.5 0 1 1 -16 -22Z" fill="#FFE066"/></svg>';

export const makeOrbSvg = (uid: string) =>
  `<svg viewBox="0 0 120 72"><defs><linearGradient id="og-${uid}" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#58CC02" stop-opacity="0"/><stop offset="55%" stop-color="#FFE066"/><stop offset="100%" stop-color="#FFFFFF"/></linearGradient></defs><path d="M4 36 Q42 18 86 12 Q66 36 86 60 Q42 54 4 36Z" fill="url(#og-${uid})" opacity="0.88"/><path d="M58 6 Q110 12 116 36 Q110 60 58 66 Q86 48 86 36 Q86 24 58 6Z" fill="#FFE066" stroke="#231F32" stroke-width="2.8" stroke-linejoin="round"/><path d="M72 14 Q106 20 110 36 Q106 52 72 58 Q90 44 90 36 Q90 28 72 14Z" fill="#FFFFFF"/><g class="orb-spin"><path d="M74 19 L78 31 L90 36 L78 41 L74 53 L70 41 L58 36 L70 31Z" fill="#FFFDF0" stroke="#58CC02" stroke-width="2"/></g></svg>`;

export const BURST =
  '<svg viewBox="0 0 130 130"><path d="M65 4 L77 42 L118 22 L90 54 L126 75 L84 78 L98 118 L66 90 L44 126 L46 84 L6 94 L38 62 L6 38 L48 44Z" fill="#FF9600" stroke="#231F32" stroke-width="3.5" stroke-linejoin="round"/><path d="M65 18 L74 47 L104 34 L82 58 L110 74 L78 76 L84 106 L65 82 L48 106 L52 76 L20 78 L46 58 L24 38 L55 46Z" fill="#FFE066"/><path d="M65 36 L71 54 L90 50 L76 63 L90 76 L72 74 L65 92 L58 74 L40 76 L54 63 L40 50 L59 54Z" fill="#FFFFFF"/><circle cx="24" cy="22" r="5" fill="#FFE066"/><circle cx="110" cy="108" r="5.5" fill="#58CC02"/><circle cx="108" cy="20" r="4" fill="#FFF"/></svg>';

export const SHOCKWAVE =
  '<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="48" fill="none" stroke="#FFE066" stroke-width="7"/><circle cx="60" cy="60" r="38" fill="none" stroke="#FFFFFF" stroke-width="3.5"/></svg>';

export const ENEMY_COLORS: Array<[string, string, string]> = [
  ['#FF7A18', '#FFE066', '#2B070C'],
  ['#58CC02', '#D9FF5B', '#183A18'],
  ['#7A4BD0', '#EDE4FF', '#1B0F38'],
  ['#FFE94A', '#6AD1FF', '#1B3B70'],
  ['#E62537', '#FF9F1C', '#2B070C'],
  ['#FF2E43', '#FFE066', '#2B070C']
];

export const makePrjSvg = (idx: number, uid: string): string => {
  const safe = idx % 6;
  const gid = `pf-${safe}-${uid}`;
  switch (safe) {
    case 0:
      return `<svg viewBox="0 0 130 76"><defs><linearGradient id="${gid}" x1="1" y1="0" x2="0" y2="0"><stop offset="0%" stop-color="#FF5500" stop-opacity="0"/><stop offset="55%" stop-color="#FF7A18"/><stop offset="100%" stop-color="#FFE066"/></linearGradient></defs><path d="M126 38 Q86 14 34 10 Q56 38 34 66 Q86 62 126 38Z" fill="url(#${gid})" opacity="0.9"/><path d="M64 8 Q14 14 8 38 Q14 62 64 68 Q46 49 46 38 Q46 27 64 8Z" fill="#FF6B1A" stroke="#2B070C" stroke-width="3" stroke-linejoin="round"/><path d="M52 16 Q20 22 16 38 Q20 54 52 60 Q36 45 36 38 Q36 31 52 16Z" fill="#FFD23F"/><circle cx="34" cy="38" r="11" fill="#FFFDF0"/><circle cx="78" cy="16" r="4" fill="#FFE066"/><circle cx="92" cy="58" r="3.5" fill="#FF9600"/></svg>`;
    case 1:
      return `<svg viewBox="0 0 130 76"><defs><linearGradient id="${gid}" x1="1" y1="0" x2="0" y2="0"><stop offset="0%" stop-color="#2F9E2F" stop-opacity="0"/><stop offset="55%" stop-color="#58CC02"/><stop offset="100%" stop-color="#D9FF5B"/></linearGradient></defs><path d="M124 38 Q84 18 38 14 Q58 38 38 62 Q84 58 124 38Z" fill="url(#${gid})" opacity="0.88"/><circle cx="36" cy="38" r="24" fill="#46B828" stroke="#183A18" stroke-width="3"/><circle cx="34" cy="36" r="15" fill="#A6FF3D"/><circle cx="28" cy="30" r="6" fill="#F2FFD6"/><g class="orb-spin"><circle cx="36" cy="18" r="4.5" fill="#D9FF5B" stroke="#183A18" stroke-width="1.8"/><circle cx="52" cy="46" r="4" fill="#B6FF3D" stroke="#183A18" stroke-width="1.8"/><circle cx="22" cy="50" r="3.5" fill="#7BE82C" stroke="#183A18" stroke-width="1.6"/></g><circle cx="80" cy="20" r="4.5" fill="#A6FF3D"/><circle cx="96" cy="54" r="3.5" fill="#58CC02"/></svg>`;
    case 2:
      return `<svg viewBox="0 0 130 76"><defs><linearGradient id="${gid}" x1="1" y1="0" x2="0" y2="0"><stop offset="0%" stop-color="#3B1E7A" stop-opacity="0"/><stop offset="55%" stop-color="#7A4BD0"/><stop offset="100%" stop-color="#E5D4FF"/></linearGradient></defs><path d="M126 38 Q86 16 40 12 Q60 38 40 64 Q86 60 126 38Z" fill="url(#${gid})" opacity="0.9"/><path d="M68 6 Q16 14 8 38 Q16 62 68 70 Q42 50 42 38 Q42 26 68 6Z" fill="#4C2B99" stroke="#1B0F38" stroke-width="3" stroke-linejoin="round"/><path d="M54 16 Q22 22 18 38 Q22 54 54 60 Q36 45 36 38 Q36 31 54 16Z" fill="#9B72FF"/><circle cx="38" cy="38" r="9" fill="#F3E8FF"/><g class="orb-spin"><path d="M38 24 L42 34 L52 38 L42 42 L38 52 L34 42 L24 38 L34 34Z" fill="#FFFFFF"/></g></svg>`;
    case 3:
      return `<svg viewBox="0 0 130 76"><defs><linearGradient id="${gid}" x1="1" y1="0" x2="0" y2="0"><stop offset="0%" stop-color="#1CB0F6" stop-opacity="0"/><stop offset="55%" stop-color="#FFE94A"/><stop offset="100%" stop-color="#FFFFFF"/></linearGradient></defs><path d="M126 38 L52 16 L66 38 L52 60 Z" fill="url(#${gid})" opacity="0.88"/><path d="M114 26 L62 28 L76 12 L10 38 L66 44 L50 64 L110 46 L86 40Z" fill="#FFF04A" stroke="#1B3B70" stroke-width="3.2" stroke-linejoin="round"/><path d="M90 32 L54 34 L62 24 L22 38 L58 42 L48 53 L86 42Z" fill="#FFFFFF"/><circle cx="32" cy="18" r="3.5" fill="#6AD1FF"/><circle cx="84" cy="60" r="4" fill="#FFE94A"/></svg>`;
    case 4:
      return `<svg viewBox="0 0 130 76"><defs><linearGradient id="${gid}" x1="1" y1="0" x2="0" y2="0"><stop offset="0%" stop-color="#7A0818" stop-opacity="0"/><stop offset="55%" stop-color="#E62537"/><stop offset="100%" stop-color="#FF9F1C"/></linearGradient></defs><path d="M126 38 Q86 16 42 12 Q60 38 42 64 Q86 60 126 38Z" fill="url(#${gid})" opacity="0.92"/><path d="M74 6 L44 26 L8 38 L44 50 L74 70 L54 44 L66 38 L54 32Z" fill="#D91F33" stroke="#2B070C" stroke-width="3" stroke-linejoin="round"/><path d="M56 18 L38 31 L18 38 L38 45 L56 58 L44 41 L54 38 L44 35Z" fill="#FF9F1C"/><circle cx="36" cy="38" r="6" fill="#FFE066"/></svg>`;
    default:
      return `<svg viewBox="0 0 136 80"><defs><linearGradient id="${gid}" x1="1" y1="0" x2="0" y2="0"><stop offset="0%" stop-color="#8E0B1D" stop-opacity="0"/><stop offset="55%" stop-color="#FF2E43"/><stop offset="100%" stop-color="#FFE066"/></linearGradient></defs><path d="M132 40 Q88 14 40 10 Q60 40 40 70 Q88 66 132 40Z" fill="url(#${gid})" opacity="0.95"/><path d="M76 8 Q32 10 10 40 Q32 70 76 72 Q52 52 52 40 Q52 28 76 8Z" fill="#E62537" stroke="#2B070C" stroke-width="3.2" stroke-linejoin="round"/><path d="M58 18 L12 24 L26 40 L12 56 L58 62 L38 44 L6 40 L38 36Z" fill="#FF9F1C" stroke="#2B070C" stroke-width="2.2" stroke-linejoin="round"/><g class="orb-spin"><circle cx="44" cy="40" r="11" fill="#FFE066" stroke="#2B070C" stroke-width="2"/><path d="M44 26 L48 36 L58 40 L48 44 L44 54 L40 44 L30 40 L40 36Z" fill="#FFFFFF"/></g></svg>`;
  }
};

export const enemySigilSvg = (idx: number) => {
  const [c1, c2] = ENEMY_COLORS[idx % ENEMY_COLORS.length];
  return `<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="48" fill="none" stroke="${c1}" stroke-width="4" stroke-dasharray="12 6"/><circle cx="60" cy="60" r="34" fill="none" stroke="${c2}" stroke-width="3"/><polygon points="60,14 98,84 22,84" fill="none" stroke="${c1}" stroke-width="2.8"/><polygon points="60,106 98,36 22,36" fill="none" stroke="${c2}" stroke-width="2.6"/><circle cx="60" cy="60" r="10" fill="${c2}" opacity="0.85"/></svg>`;
};

export const enemyWaveSvg = (idx: number) => {
  const [c1, c2] = ENEMY_COLORS[idx % ENEMY_COLORS.length];
  return `<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="48" fill="none" stroke="${c1}" stroke-width="7"/><circle cx="60" cy="60" r="37" fill="none" stroke="${c2}" stroke-width="3.5"/></svg>`;
};

export const enemyBurstSvg = (idx: number) => {
  const [c1, c2, out] = ENEMY_COLORS[idx % ENEMY_COLORS.length];
  return `<svg viewBox="0 0 130 130"><path d="M65 4 L77 42 L118 22 L90 54 L126 75 L84 78 L98 118 L66 90 L44 126 L46 84 L6 94 L38 62 L6 38 L48 44Z" fill="${c1}" stroke="${out}" stroke-width="3.5" stroke-linejoin="round"/><path d="M65 18 L74 47 L104 34 L82 58 L110 74 L78 76 L84 106 L65 82 L48 106 L52 76 L20 78 L46 58 L24 38 L55 46Z" fill="${c2}"/><path d="M65 36 L71 54 L90 50 L76 63 L90 76 L72 74 L65 92 L58 74 L40 76 L54 63 L40 50 L59 54Z" fill="#FFFFFF"/><circle cx="24" cy="22" r="5" fill="${c2}"/><circle cx="110" cy="108" r="5" fill="${c1}"/></svg>`;
};

export const ULTN: Array<[string, string]> = [
  ['Hujan Api', '#FF6A00'],
  ['Banjir Racun', '#5BC236'],
  ['Kabut Bayangan', '#7A4BD0'],
  ['Badai Petir', '#FFE94A'],
  ['Tombak Neraka', '#C0102A'],
  ['Gerhana Kegelapan', '#8E1022']
];
