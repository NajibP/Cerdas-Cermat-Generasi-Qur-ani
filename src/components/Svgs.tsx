import React, { useId, useMemo } from 'react';
import { fmtT, shuffle } from '../utils/helpers';

export const AVATARS = Array.from({ length: 12 }, (_, i) => 'a' + i);

interface AvatarDef {
  s: string;
  c: string;
  h: 'peci' | 'hijab' | 'kopiah' | 'kopiahB' | 'sorban';
  hc?: string;
  g?: number;
  open?: number;
  bg: string;
}

const AVS: AvatarDef[] = [
  { s: '#F2C29B', c: '#58CC02', h: 'peci', bg: '#D7FFB8' },
  { s: '#F7D1B0', c: '#CE82FF', h: 'hijab', hc: '#FF86C8', bg: '#FFE0F0' },
  { s: '#D9A06F', c: '#1CB0F6', h: 'kopiah', bg: '#DDF4FF' },
  { s: '#E8B58A', c: '#FFC800', h: 'hijab', hc: '#2CC4B0', bg: '#D3F6F0' },
  { s: '#C98B5B', c: '#FF9600', h: 'sorban', bg: '#FFE9C7' },
  { s: '#F2C29B', c: '#FF4B4B', h: 'hijab', hc: '#8E6CF0', g: 1, bg: '#E9E1FF' },
  { s: '#8D5A3C', c: '#2B70C9', h: 'peci', g: 1, bg: '#DDF4FF' },
  { s: '#8D5A3C', c: '#58CC02', h: 'hijab', hc: '#FFC800', bg: '#FFF3BF' },
  { s: '#F7D1B0', c: '#CE82FF', h: 'kopiahB', hc: '#1CB0F6', bg: '#DDF4FF' },
  { s: '#D9A06F', c: '#1CB0F6', h: 'hijab', hc: '#FF6B6B', bg: '#FFE0E0' },
  { s: '#E8B58A', c: '#00A88F', h: 'peci', open: 1, bg: '#D3F6F0' },
  { s: '#C98B5B', c: '#8E6CF0', h: 'hijab', hc: '#8FD6FF', bg: '#E3F5FF' }
];

export const AvatarSvg: React.FC<{ code?: string; size?: number | 'fill'; bg?: boolean; className?: string }> = ({
  code = 'a0',
  size = 32,
  bg = true,
  className = ''
}) => {
  const uid = useId().replace(/:/g, '');
  const match = /^a(\d+)$/.exec(code || 'a0');
  const idx = match ? +match[1] : 0;
  const a = AVS[idx % AVS.length];
  const hij = a.h === 'hijab';
  const ey = hij ? 50 : 46;
  const my = hij ? 60 : 56;
  const wh = size === 'fill' ? {} : { width: size, height: size };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 align-middle ${className}`}
      viewBox="0 0 100 100"
      role="img"
      aria-label={`Avatar ${idx + 1}`}
      {...wh}
    >
      {bg && (
        <>
          <clipPath id={`avc-${uid}`}>
            <circle cx="50" cy="50" r="50" />
          </clipPath>
          <circle cx="50" cy="50" r="50" fill={a.bg} />
        </>
      )}
      <g clipPath={bg ? `url(#avc-${uid})` : undefined}>
        <path d="M12 104 Q12 70 50 68 Q88 70 88 104Z" fill={a.c} />
        {!hij && (
          <>
            <path d="M41 69 L50 82 L59 69Z" fill="#fff" opacity=".9" />
            <rect x="43" y="58" width="14" height="16" rx="6" fill={a.s} />
          </>
        )}
        {hij ? (
          <>
            <path d="M18 50 Q14 8 50 8 Q86 8 82 50 Q88 74 72 84 L28 84 Q12 74 18 50Z" fill={a.hc} />
            <path d="M14 96 Q12 70 50 66 Q88 70 86 96 Q50 88 14 96Z" fill={a.hc} />
          </>
        ) : (
          <>
            <circle cx="27" cy="48" r="4.5" fill={a.s} />
            <circle cx="73" cy="48" r="4.5" fill={a.s} />
            <circle cx="50" cy="46" r="23" fill={a.s} />
          </>
        )}
        {hij && (
          <>
            <ellipse cx="50" cy="48" rx="20" ry="22" fill={a.s} />
            <path d="M29 44 Q30 24 50 24 Q70 24 71 44 Q60 33 50 33 Q40 33 29 44Z" fill={a.hc} />
          </>
        )}
        {a.h === 'peci' && (
          <>
            <path d="M28 38 L30 16 Q50 9 70 16 L72 38 Q50 31 28 38Z" fill="#2B2B2B" />
            <path d="M29 33 Q50 27 71 33" stroke="#FFC800" strokeWidth="2.5" fill="none" />
          </>
        )}
        {a.h === 'kopiah' && (
          <>
            <path d="M27 38 Q28 11 50 11 Q72 11 73 38 Q50 31 27 38Z" fill="#fff" stroke="#D9D9D9" strokeWidth="2" />
            <path d="M34 25 Q50 19 66 25" stroke="#E5E5E5" strokeWidth="2" fill="none" />
          </>
        )}
        {a.h === 'kopiahB' && (
          <>
            <path d="M27 38 Q28 11 50 11 Q72 11 73 38 Q50 31 27 38Z" fill={a.hc} />
            <circle cx="40" cy="24" r="2.5" fill="#fff" opacity=".8" />
            <circle cx="50" cy="20" r="2.5" fill="#fff" opacity=".8" />
            <circle cx="60" cy="24" r="2.5" fill="#fff" opacity=".8" />
          </>
        )}
        {a.h === 'sorban' && (
          <>
            <path d="M25 38 Q24 8 50 8 Q76 8 75 38 Q50 29 25 38Z" fill="#FFF3D6" />
            <path d="M27 31 Q50 20 73 31M30 23 Q50 14 70 23" stroke="#E2C98F" strokeWidth="2.5" fill="none" />
            <path d="M72 30 Q84 44 77 60 L70 54 Q75 43 69 33Z" fill="#FFF3D6" stroke="#E2C98F" strokeWidth="1.5" />
          </>
        )}
        <ellipse cx="41" cy={ey} rx="3.2" ry="4.4" fill="#2B2B2B" />
        <ellipse cx="59" cy={ey} rx="3.2" ry="4.4" fill="#2B2B2B" />
        <circle cx="42.2" cy={ey - 1.6} r="1.3" fill="#fff" />
        <circle cx="60.2" cy={ey - 1.6} r="1.3" fill="#fff" />
        <circle cx="34" cy={my - 3} r="4" fill="#FF7A8A" opacity=".35" />
        <circle cx="66" cy={my - 3} r="4" fill="#FF7A8A" opacity=".35" />
        {a.open ? (
          <>
            <path d={`M42 ${my - 3} Q50 ${my + 11} 58 ${my - 3}Z`} fill="#8A3B2A" />
            <path d={`M45 ${my + 4} Q50 ${my + 8} 55 ${my + 4}Q50 ${my + 2} 45 ${my + 4}Z`} fill="#FF8FA3" />
          </>
        ) : (
          <path d={`M43 ${my - 2} Q50 ${my + 5} 57 ${my - 2}`} stroke="#8A3B2A" strokeWidth="2.6" fill="none" strokeLinecap="round" />
        )}
        {a.g && (
          <>
            <circle cx="41" cy={ey} r="7.5" fill="none" stroke="#2B2B2B" strokeWidth="2" />
            <circle cx="59" cy={ey} r="7.5" fill="none" stroke="#2B2B2B" strokeWidth="2" />
            <path d={`M48.5 ${ey} L51.5 ${ey}`} stroke="#2B2B2B" strokeWidth="2" />
          </>
        )}
      </g>
    </svg>
  );
};

export type SupporterProp = 'flag' | 'light' | 'clap';

export const SupporterFigureSvg: React.FC<{
  code?: string;
  size?: number | 'fill';
  prop?: SupporterProp;
  cheerful?: boolean;
  mood?: 'cheer' | 'panic';
  back?: boolean;
  className?: string;
}> = ({ code = 'a0', size = 56, prop = 'clap', cheerful = true, mood = 'cheer', back = false, className = '' }) => {
  const uid = useId().replace(/:/g, '');
  const match = /^a(\d+)$/.exec(code || 'a0');
  const idx = match ? +match[1] : 0;
  const a = AVS[idx % AVS.length];
  const hij = a.h === 'hijab';
  const ey = hij ? 52 : 49;
  const my = hij ? 62 : 59;
  const wh = size === 'fill' ? {} : { width: size, height: Math.round(size * 1.08) };
  const strokeCol = '#231F32';
  const flagMain = idx % 2 === 0 ? '#58CC02' : '#1CB0F6';
  const flagAccent = '#FFC800';
  const stickGlow = idx % 2 === 0 ? '#FFE066' : '#5CE1E6';
  const isPanic = mood === 'panic';
  const activeProp: SupporterProp = isPanic ? 'clap' : prop;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 overflow-visible select-none ${back ? 'brightness-90 saturate-90' : ''} ${className}`}
      viewBox="0 0 112 120"
      role="img"
      aria-label={`Pendukung ${idx + 1}`}
      {...wh}
    >
      <defs>
        <radialGradient id={`sg-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="45%" stopColor={stickGlow} />
          <stop offset="100%" stopColor={stickGlow} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`fl-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={flagMain} />
          <stop offset="100%" stopColor={idx % 2 === 0 ? '#3E9A00' : '#1582C4'} />
        </linearGradient>
      </defs>

      {/* Left arm (waving, holding pennant flag, or flailing in panic) */}
      <g className="crowd-arm-l">
        {activeProp === 'flag' && (
          <g>
            <line x1="15" y1="74" x2="8" y2="14" stroke="#8C5A2B" strokeWidth="4" strokeLinecap="round" />
            <circle cx="8" cy="13" r="3.4" fill={flagAccent} stroke={strokeCol} strokeWidth="2" />
            <path
              d="M10 15 Q26 11 40 20 Q26 28 11 35 Z"
              fill={`url(#fl-${uid})`}
              stroke={strokeCol}
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
            <path d="M12 22 L28 21" stroke={flagAccent} strokeWidth="2.6" strokeLinecap="round" />
          </g>
        )}
        <path
          d={isPanic ? 'M35 84 Q18 68 14 44' : 'M35 84 Q20 79 16 60'}
          fill="none"
          stroke={strokeCol}
          strokeWidth="12.5"
          strokeLinecap="round"
        />
        <path
          d={isPanic ? 'M35 84 Q18 68 14 44' : 'M35 84 Q20 79 16 60'}
          fill="none"
          stroke={hij ? a.hc || a.c : a.c}
          strokeWidth="7.5"
          strokeLinecap="round"
        />
        <circle cx={isPanic ? 13.5 : 15.5} cy={isPanic ? 41 : 57} r="5.8" fill={a.s} stroke={strokeCol} strokeWidth="2.4" />
      </g>

      {/* Right arm (waving, holding glowing cheering stick, or flailing in panic) */}
      <g className="crowd-arm-r">
        {activeProp === 'light' && (
          <g>
            <circle cx="96" cy="34" r="16" fill={`url(#sg-${uid})`} opacity="0.9" />
            <rect
              x="93"
              y="32"
              width="6"
              height="20"
              rx="3"
              fill="#FFFDF0"
              stroke={strokeCol}
              strokeWidth="2.2"
            />
            <rect
              x="92.5"
              y="48"
              width="7"
              height="9"
              rx="2"
              fill="#3C4B57"
              stroke={strokeCol}
              strokeWidth="2"
            />
          </g>
        )}
        <path
          d={isPanic ? 'M77 84 Q94 68 98 44' : 'M77 84 Q92 79 96 58'}
          fill="none"
          stroke={strokeCol}
          strokeWidth="12.5"
          strokeLinecap="round"
        />
        <path
          d={isPanic ? 'M77 84 Q94 68 98 44' : 'M77 84 Q92 79 96 58'}
          fill="none"
          stroke={hij ? a.hc || a.c : a.c}
          strokeWidth="7.5"
          strokeLinecap="round"
        />
        <circle cx={isPanic ? 98.5 : 96.5} cy={isPanic ? 41 : 55} r="5.8" fill={a.s} stroke={strokeCol} strokeWidth="2.4" />
      </g>

      {/* Torso with cel-shaded depth */}
      <path
        d="M25 118 Q26 78 56 76 Q86 78 87 118 Z"
        fill={a.c}
        stroke={strokeCol}
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      <path d="M56 77 Q84 79 86 117 L68 117 Q68 89 56 77 Z" fill="#000" opacity="0.14" />
      <path d="M32 95 Q36 83 49 81" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" opacity="0.28" fill="none" />

      {!hij && (
        <>
          <path d="M46 78 L56 91 L66 78 Z" fill="#FFFFFF" stroke={strokeCol} strokeWidth="2" strokeLinejoin="round" />
          <rect x="49" y="65" width="14" height="15" rx="6" fill={a.s} stroke={strokeCol} strokeWidth="2.4" />
        </>
      )}

      {/* Head & Hijab / Ears */}
      {hij ? (
        <>
          <path
            d="M24 52 Q21 12 56 12 Q91 12 88 52 Q94 79 78 92 L34 92 Q18 79 24 52 Z"
            fill={a.hc}
            stroke={strokeCol}
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <path
            d="M23 105 Q22 77 56 74 Q90 77 89 105 Q56 95 23 105 Z"
            fill={a.hc}
            stroke={strokeCol}
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          <path d="M35 23 Q46 16 62 17" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" opacity="0.35" fill="none" />
          <ellipse cx="56" cy="51" rx="20" ry="22" fill={a.s} stroke={strokeCol} strokeWidth="2.4" />
          <path
            d="M35 46 Q36 27 56 27 Q76 27 77 46 Q66 36 56 36 Q46 36 35 46 Z"
            fill={a.hc}
            stroke={strokeCol}
            strokeWidth="2.2"
          />
        </>
      ) : (
        <>
          <circle cx="33" cy="51" r="5" fill={a.s} stroke={strokeCol} strokeWidth="2.4" />
          <circle cx="79" cy="51" r="5" fill={a.s} stroke={strokeCol} strokeWidth="2.4" />
          <circle cx="56" cy="49" r="23" fill={a.s} stroke={strokeCol} strokeWidth="2.8" />
          <path d="M68 31 Q78 44 74 62 Q65 71 54 71 Q70 64 71 48 Q71 38 68 31 Z" fill="#000" opacity="0.08" />
        </>
      )}

      {/* Headwear */}
      {a.h === 'peci' && (
        <>
          <path
            d="M34 40 L36 19 Q56 12 76 19 L78 40 Q56 33 34 40 Z"
            fill="#2B2B2B"
            stroke={strokeCol}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path d="M36 35 Q56 29 76 35" stroke="#FFC800" strokeWidth="2.6" fill="none" />
          <path d="M40 23 Q50 18 62 19" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.25" fill="none" />
        </>
      )}
      {a.h === 'kopiah' && (
        <>
          <path
            d="M33 40 Q34 14 56 14 Q78 14 79 40 Q56 33 33 40 Z"
            fill="#FFFFFF"
            stroke={strokeCol}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path d="M40 27 Q56 21 72 27" stroke="#D9E2EC" strokeWidth="2.2" fill="none" />
        </>
      )}
      {a.h === 'kopiahB' && (
        <>
          <path
            d="M33 40 Q34 14 56 14 Q78 14 79 40 Q56 33 33 40 Z"
            fill={a.hc}
            stroke={strokeCol}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <circle cx="46" cy="27" r="2.5" fill="#fff" opacity="0.88" />
          <circle cx="56" cy="23" r="2.5" fill="#fff" opacity="0.88" />
          <circle cx="66" cy="27" r="2.5" fill="#fff" opacity="0.88" />
        </>
      )}
      {a.h === 'sorban' && (
        <>
          <path
            d="M31 40 Q30 11 56 11 Q82 11 81 40 Q56 31 31 40 Z"
            fill="#FFF3D6"
            stroke={strokeCol}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path d="M33 33 Q56 22 79 33 M36 25 Q56 16 76 25" stroke="#D9BA76" strokeWidth="2.4" fill="none" />
          <path
            d="M78 33 Q89 47 83 62 L76 56 Q80 46 75 36 Z"
            fill="#FFF3D6"
            stroke={strokeCol}
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
        </>
      )}

      {/* Expressive Face */}
      {isPanic ? (
        <>
          {/* Worried brows */}
          <path d={`M41 ${ey - 6} L51 ${ey - 3.5}`} stroke={strokeCol} strokeWidth="2.5" strokeLinecap="round" />
          <path d={`M71 ${ey - 6} L61 ${ey - 3.5}`} stroke={strokeCol} strokeWidth="2.5" strokeLinecap="round" />
          {/* Wide shocked eyes */}
          <circle cx="47" cy={ey} r="5.1" fill="#fff" stroke={strokeCol} strokeWidth="2.1" />
          <circle cx="65" cy={ey} r="5.1" fill="#fff" stroke={strokeCol} strokeWidth="2.1" />
          <circle cx="46" cy={ey + 0.5} r="2.1" fill={strokeCol} />
          <circle cx="64" cy={ey + 0.5} r="2.1" fill={strokeCol} />
          {/* Panic open gasp */}
          <ellipse cx="56" cy={my + 2.5} rx="5.5" ry="6.8" fill="#7A1D1D" stroke={strokeCol} strokeWidth="2.2" />
          {/* Sweat drop */}
          <path
            d={`M76 ${ey - 8} Q82 ${ey - 1} 76 ${ey + 3} Q70 ${ey - 1} 76 ${ey - 8} Z`}
            fill="#5CE1E6"
            stroke="#1582C4"
            strokeWidth="1.5"
          />
        </>
      ) : (
        <>
          {cheerful && idx % 3 === 1 ? (
            <>
              <path d={`M43 ${ey + 1} Q47 ${ey - 5} 51 ${ey + 1}`} stroke={strokeCol} strokeWidth="2.8" strokeLinecap="round" fill="none" />
              <path d={`M61 ${ey + 1} Q65 ${ey - 5} 69 ${ey + 1}`} stroke={strokeCol} strokeWidth="2.8" strokeLinecap="round" fill="none" />
            </>
          ) : (
            <>
              <ellipse cx="47" cy={ey} rx="3.4" ry="4.5" fill={strokeCol} />
              <ellipse cx="65" cy={ey} rx="3.4" ry="4.5" fill={strokeCol} />
              <circle cx="48.2" cy={ey - 1.6} r="1.4" fill="#fff" />
              <circle cx="66.2" cy={ey - 1.6} r="1.4" fill="#fff" />
            </>
          )}
          <circle cx="39.5" cy={my - 2.5} r="4.2" fill="#FF7A8A" opacity="0.42" />
          <circle cx="72.5" cy={my - 2.5} r="4.2" fill="#FF7A8A" opacity="0.42" />

          {cheerful || a.open ? (
            <>
              <path
                d={`M48 ${my - 2} Q56 ${my + 11} 64 ${my - 2} Z`}
                fill="#8A2E22"
                stroke={strokeCol}
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path d={`M51 ${my + 4.5} Q56 ${my + 8} 61 ${my + 4.5} Q56 ${my + 2} 51 ${my + 4.5} Z`} fill="#FF8FA3" />
            </>
          ) : (
            <path d={`M49 ${my - 1} Q56 ${my + 5} 63 ${my - 1}`} stroke="#8A3B2A" strokeWidth="2.6" fill="none" strokeLinecap="round" />
          )}
        </>
      )}

      {a.g && (
        <>
          <circle cx="47" cy={ey} r="7.5" fill="none" stroke={strokeCol} strokeWidth="2.1" />
          <circle cx="65" cy={ey} r="7.5" fill="none" stroke={strokeCol} strokeWidth="2.1" />
          <path d={`M54.5 ${ey} L57.5 ${ey}`} stroke={strokeCol} strokeWidth="2.1" />
        </>
      )}
    </svg>
  );
};

export const MascotSvg: React.FC<{ size?: number; className?: string }> = ({ size = 120, className = '' }) => (
  <svg
    className={`mascot-bob ${className}`}
    width={size}
    height={size}
    viewBox="0 0 120 120"
    role="img"
    aria-label="Maskot Generasi Qur'ani"
  >
    <ellipse cx="60" cy="112" rx="34" ry="5" fill="#000" opacity=".12" />
    {/* Cute rounded book-owl silhouette inspired by Duolingo's crisp flat shading */}
    <rect x="20" y="18" width="80" height="88" rx="20" fill="#58CC02" />
    <rect x="20" y="18" width="18" height="88" rx="12" fill="#58A700" />
    <path d="M22 28 Q30 14 44 22 L40 34 Z" fill="#58A700" />
    <path d="M98 28 Q90 14 76 22 L80 34 Z" fill="#58CC02" />
    <rect x="34" y="95" width="60" height="10" rx="5" fill="#fff" />
    <path d="M68 24 a9 9 0 1 0 9 13 a7.2 7.2 0 1 1 -9 -13Z" fill="#FFC800" />
    <circle cx="54" cy="56" r="13" fill="#fff" />
    <circle cx="84" cy="56" r="13" fill="#fff" />
    <circle cx="56" cy="57" r="6" fill="#2B2B2B" />
    <circle cx="82" cy="57" r="6" fill="#2B2B2B" />
    <circle cx="58.5" cy="54.5" r="2.2" fill="#fff" />
    <circle cx="84.5" cy="54.5" r="2.2" fill="#fff" />
    <path d="M63 67 Q69 77 75 67 Q69 63 63 67Z" fill="#FF9600" />
    <path d="M58 76 Q69 87 80 76" stroke="#2B2B2B" strokeWidth="3" fill="none" strokeLinecap="round" />
    <circle cx="45" cy="72" r="4.5" fill="#FF7A8A" opacity=".45" />
    <circle cx="93" cy="72" r="4.5" fill="#FF7A8A" opacity=".45" />
  </svg>
);

export const QBookSvg: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
    <rect x="6" y="4" width="28" height="32" rx="5" fill="#58CC02" stroke="#46A302" strokeWidth="2" />
    <rect x="6" y="4" width="6" height="32" rx="3" fill="#46A302" />
    <path d="M23 11 a5 5 0 1 0 5 7 a4 4 0 1 1 -5 -7Z" fill="#FFC800" />
    <rect x="14" y="26" width="16" height="3" rx="1.5" fill="#fff" />
  </svg>
);

export const BattleHeroSvg: React.FC<{ code?: string; className?: string }> = ({ code = 'a0', className = '' }) => {
  const uid = useId().replace(/:/g, '');
  const match = /^a(\d+)$/.exec(code || 'a0');
  const idx = match ? +match[1] : 0;
  const a = AVS[idx % AVS.length];
  const hij = a.h === 'hijab';
  const strokeCol = '#1E1A30';
  const ey = hij ? 63 : 60;
  const my = hij ? 74 : 71;
  const capeCol = a.c === '#58CC02' || a.c === '#00A88F' ? '#16A34A' : a.c;
  const capeDark = '#0F4D2A';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-auto overflow-visible select-none ${className}`}
      viewBox="0 0 190 190"
      role="img"
      aria-label={`Pahlawan ${idx + 1}`}
    >
      <defs>
        <radialGradient id={`ha-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFE066" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#58CC02" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#58CC02" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`hc-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={capeCol} />
          <stop offset="100%" stopColor={capeDark} />
        </linearGradient>
        <radialGradient id={`ho-${uid}`} cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="45%" stopColor="#FFE066" />
          <stop offset="100%" stopColor="#58CC02" />
        </radialGradient>
      </defs>

      {/* Ground Shadow & Heroic Energy Aura */}
      <ellipse cx="88" cy="175" rx="46" ry="9" fill="#0D181E" opacity="0.34" />
      <g className="h-aura">
        <ellipse cx="88" cy="171" rx="54" ry="12" fill={`url(#ha-${uid})`} />
        <ellipse cx="88" cy="172" rx="44" ry="7" fill="none" stroke="#FFE066" strokeWidth="2.2" strokeDasharray="10 6" opacity="0.85" />
      </g>

      {/* Ultimate Rotating Geometric Sacred Halo (visible during fx-ult) */}
      <g className="h-ult-halo" opacity="0">
        <circle cx="88" cy="86" r="66" fill="none" stroke="#FFE066" strokeWidth="3.5" strokeDasharray="12 6" />
        <rect x="40" y="38" width="96" height="96" fill="none" stroke="#58CC02" strokeWidth="3" />
        <rect x="40" y="38" width="96" height="96" transform="rotate(45 88 86)" fill="none" stroke="#FFE066" strokeWidth="3" />
      </g>

      {/* Both Legs Tucked Cleanly Behind Cape & Heroic Robe */}
      <g>
        {/* Left/back leg behind cape & robe */}
        <path
          d="M74 140 L69 164 L58 166 Q54 173 65 174 L77 172 L83 142 Z"
          fill="#222E38"
          stroke={strokeCol}
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
        <path d="M58 167 L76 165 L76 172 L59 173 Z" fill="#3B2314" stroke={strokeCol} strokeWidth="2.4" strokeLinejoin="round" />
        {/* Right/front leg neatly tucked beneath robe hem */}
        <path
          d="M93 140 L99 164 L113 166 Q117 173 105 174 L93 172 L88 142 Z"
          fill="#2B3A47"
          stroke={strokeCol}
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
        <path d="M95 165 L113 167 Q117 173 105 174 L94 172 Z" fill="#4E2F1B" stroke={strokeCol} strokeWidth="2.4" strokeLinejoin="round" />
        <path d="M96 162 L106 162" stroke="#FFC800" strokeWidth="2.4" strokeLinecap="round" />
      </g>

      {/* Flowing Hero Cape */}
      <g className="h-cape">
        <path
          d="M72 86 Q34 94 14 149 Q42 154 70 146 Q80 120 82 92 Z"
          fill={`url(#hc-${uid})`}
          stroke={strokeCol}
          strokeWidth="3.2"
          strokeLinejoin="round"
        />
        <path d="M20 145 Q43 149 66 142" stroke="#FFC800" strokeWidth="3.2" fill="none" strokeLinecap="round" />
        <path d="M64 95 Q44 108 32 136" stroke="#fff" strokeWidth="2.2" opacity="0.22" fill="none" strokeLinecap="round" />
      </g>

      {/* Torso / Heroic Robe Coat & Golden Sash (layered cleanly in front of legs) */}
      <g>
        <path
          d="M58 150 Q63 91 88 87 Q113 91 118 150 Q88 158 58 150 Z"
          fill={a.c}
          stroke={strokeCol}
          strokeWidth="3.2"
          strokeLinejoin="round"
        />
        {/* Cel shadow & highlight */}
        <path d="M60 148 Q65 94 84 89 L76 152 Z" fill="#000" opacity="0.16" />
        <path d="M99 95 Q108 110 111 135" stroke="#fff" strokeWidth="2.8" opacity="0.28" fill="none" strokeLinecap="round" />
        <path d="M61 146 Q88 153 115 146" stroke="#FFC800" strokeWidth="2.8" fill="none" strokeLinecap="round" />
        {/* White heroic collar */}
        <path d="M76 89 L88 103 L100 89 Z" fill="#FFFFFF" stroke={strokeCol} strokeWidth="2.4" strokeLinejoin="round" />
        {/* Golden belt & flowing sash tails */}
        <path d="M63 122 Q88 128 113 122 L114 130 Q88 136 62 130 Z" fill="#FFC800" stroke={strokeCol} strokeWidth="2.6" strokeLinejoin="round" />
        <path d="M81 129 L74 150 L84 148 L88 131 Z" fill="#FFA800" stroke={strokeCol} strokeWidth="2.2" strokeLinejoin="round" />
        <circle cx="88" cy="126" r="5" fill="#FFFDF0" stroke={strokeCol} strokeWidth="2.2" />
      </g>

      {/* Back Arm + Floating Radiant Kitab Cahaya (Mushaf) */}
      <g>
        <path d="M68 97 Q52 104 45 113" fill="none" stroke={strokeCol} strokeWidth="14" strokeLinecap="round" />
        <path d="M68 97 Q52 104 45 113" fill="none" stroke={hij ? a.hc || a.c : a.c} strokeWidth="8.5" strokeLinecap="round" />
        <circle cx="44" cy="114" r="6" fill={a.s} stroke={strokeCol} strokeWidth="2.6" />

        <g className="h-tome">
          <circle cx="33" cy="92" r="24" fill="#FFE066" opacity="0.26" />
          {/* Open Sacred Tome */}
          <path d="M12 86 Q23 80 33 88 L33 114 Q23 108 12 112 Z" fill="#299E00" stroke={strokeCol} strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M54 86 Q43 80 33 88 L33 114 Q43 108 54 112 Z" fill="#58CC02" stroke={strokeCol} strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M15 84 Q24 79 33 86 L33 110 Q24 104 15 108 Z" fill="#FFFDF2" stroke={strokeCol} strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M51 84 Q42 79 33 86 L33 110 Q42 104 51 108 Z" fill="#FFF8DC" stroke={strokeCol} strokeWidth="1.8" strokeLinejoin="round" />
          {/* Floating Golden Crescent Emblem above Tome */}
          <path d="M35 66 a7 7 0 1 0 7 9.5 a5.6 5.6 0 1 1 -7 -9.5Z" fill="#FFC800" stroke={strokeCol} strokeWidth="1.4" />
          <circle cx="22" cy="72" r="2" fill="#FFE066" />
          <circle cx="45" cy="70" r="2.2" fill="#FFF" />
        </g>
      </g>

      {/* Head & Headwear matching selected AVS */}
      {!hij && <rect x="81" y="75" width="14" height="16" rx="6" fill={a.s} stroke={strokeCol} strokeWidth="2.6" />}
      {hij ? (
        <>
          <path
            d="M55 62 Q52 20 88 20 Q124 20 121 62 Q127 90 110 104 L66 104 Q49 90 55 62 Z"
            fill={a.hc}
            stroke={strokeCol}
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          <path
            d="M54 115 Q53 87 88 84 Q123 87 122 115 Q88 105 54 115 Z"
            fill={a.hc}
            stroke={strokeCol}
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <path d="M67 31 Q78 24 95 25" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" opacity="0.35" fill="none" />
          <ellipse cx="88" cy="61" rx="20.5" ry="22.5" fill={a.s} stroke={strokeCol} strokeWidth="2.8" />
          <path
            d="M66 56 Q67 36 88 36 Q109 36 110 56 Q99 45 88 45 Q77 45 66 56 Z"
            fill={a.hc}
            stroke={strokeCol}
            strokeWidth="2.4"
          />
        </>
      ) : (
        <>
          <circle cx="64" cy="61" r="5" fill={a.s} stroke={strokeCol} strokeWidth="2.6" />
          <circle cx="112" cy="61" r="5" fill={a.s} stroke={strokeCol} strokeWidth="2.6" />
          <circle cx="88" cy="59" r="24" fill={a.s} stroke={strokeCol} strokeWidth="3.2" />
          <path d="M72 42 Q64 56 69 75 Q77 82 86 82 Q72 75 72 58 Z" fill="#000" opacity="0.1" />
        </>
      )}

      {/* Headwear */}
      {a.h === 'peci' && (
        <>
          <path
            d="M65 49 L67 27 Q88 20 109 27 L111 49 Q88 42 65 49 Z"
            fill="#2B2B2B"
            stroke={strokeCol}
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <path d="M67 44 Q88 38 109 44" stroke="#FFC800" strokeWidth="2.8" fill="none" />
          <path d="M72 31 Q82 26 95 27" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" opacity="0.28" fill="none" />
        </>
      )}
      {a.h === 'kopiah' && (
        <>
          <path
            d="M64 49 Q65 22 88 22 Q111 22 112 49 Q88 42 64 49 Z"
            fill="#FFFFFF"
            stroke={strokeCol}
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <path d="M71 36 Q88 30 105 36" stroke="#D9E2EC" strokeWidth="2.4" fill="none" />
        </>
      )}
      {a.h === 'kopiahB' && (
        <>
          <path
            d="M64 49 Q65 22 88 22 Q111 22 112 49 Q88 42 64 49 Z"
            fill={a.hc}
            stroke={strokeCol}
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <circle cx="78" cy="35" r="2.6" fill="#fff" opacity="0.9" />
          <circle cx="88" cy="31" r="2.6" fill="#fff" opacity="0.9" />
          <circle cx="98" cy="35" r="2.6" fill="#fff" opacity="0.9" />
        </>
      )}
      {a.h === 'sorban' && (
        <>
          <path
            d="M62 49 Q61 19 88 19 Q115 19 114 49 Q88 40 62 49 Z"
            fill="#FFF3D6"
            stroke={strokeCol}
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <path d="M64 42 Q88 31 112 42 M67 34 Q88 25 109 34" stroke="#D9BA76" strokeWidth="2.4" fill="none" />
          <path
            d="M111 41 Q123 55 117 71 L110 65 Q114 54 108 44 Z"
            fill="#FFF3D6"
            stroke={strokeCol}
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
        </>
      )}

      {/* Dynamic Combat Facial Expressions */}
      {/* 1. Normal Determined Face */}
      <g className="h-eye-norm">
        <path d={`M73 ${ey - 7} L85 ${ey - 4}`} stroke={strokeCol} strokeWidth="2.6" strokeLinecap="round" />
        <path d={`M105 ${ey - 7} L93 ${ey - 4}`} stroke={strokeCol} strokeWidth="2.6" strokeLinecap="round" />
        <ellipse cx="80" cy={ey} rx="3.8" ry="5" fill={strokeCol} />
        <ellipse cx="98" cy={ey} rx="3.8" ry="5" fill={strokeCol} />
        <circle cx="81.3" cy={ey - 1.8} r="1.6" fill="#fff" />
        <circle cx="99.3" cy={ey - 1.8} r="1.6" fill="#fff" />
        <circle cx="72" cy={my - 2} r="3.8" fill="#FF7A8A" opacity="0.34" />
        <circle cx="104" cy={my - 2} r="3.8" fill="#FF7A8A" opacity="0.34" />
        <path d={`M81 ${my} Q89 ${my + 6} 97 ${my - 1}`} stroke="#7A2E22" strokeWidth="2.7" fill="none" strokeLinecap="round" />
      </g>

      {/* 2. Fierce Attack / Ultimate Glowing Eyes */}
      <g className="h-eye-atk">
        <path d={`M72 ${ey - 8} L86 ${ey - 3}`} stroke={strokeCol} strokeWidth="3" strokeLinecap="round" />
        <path d={`M106 ${ey - 8} L92 ${ey - 3}`} stroke={strokeCol} strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="80" cy={ey} rx="4.2" ry="4.8" fill="#FFE066" stroke={strokeCol} strokeWidth="1.8" />
        <ellipse cx="98" cy={ey} rx="4.2" ry="4.8" fill="#FFE066" stroke={strokeCol} strokeWidth="1.8" />
        <circle cx="80.5" cy={ey} r="1.8" fill="#fff" />
        <circle cx="98.5" cy={ey} r="1.8" fill="#fff" />
        <path d={`M81 ${my - 1} Q89 ${my + 10} 97 ${my - 1} Z`} fill="#7A1F1F" stroke={strokeCol} strokeWidth="2" strokeLinejoin="round" />
      </g>

      {/* 3. Wincing Hit Expression (> <) */}
      <g className="h-eye-hit">
        <path d={`M72 ${ey - 7} L84 ${ey - 5}`} stroke={strokeCol} strokeWidth="2.5" strokeLinecap="round" />
        <path d={`M106 ${ey - 7} L94 ${ey - 5}`} stroke={strokeCol} strokeWidth="2.5" strokeLinecap="round" />
        <path d={`M74 ${ey - 3.5} L83 ${ey + 0.5} L74 ${ey + 4.5}`} stroke={strokeCol} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d={`M104 ${ey - 3.5} L95 ${ey + 0.5} L104 ${ey + 4.5}`} stroke={strokeCol} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="72" cy={my - 1} r="3.6" fill="#FF7A8A" opacity="0.32" />
        <circle cx="106" cy={my - 1} r="3.6" fill="#FF7A8A" opacity="0.32" />
        <path d={`M81 ${my + 2.5} Q85 ${my - 1} 89 ${my + 2} Q93 ${my + 5} 97 ${my + 1.5}`} stroke="#7A2E22" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      </g>

      {/* 4. KO Expression (X X) */}
      <g className="h-eye-ko">
        <path d={`M75 ${ey - 4} L84 ${ey + 4} M84 ${ey - 4} L75 ${ey + 4}`} stroke={strokeCol} strokeWidth="2.8" strokeLinecap="round" />
        <path d={`M94 ${ey - 4} L103 ${ey + 4} M103 ${ey - 4} L94 ${ey + 4}`} stroke={strokeCol} strokeWidth="2.8" strokeLinecap="round" />
        <ellipse cx="89" cy={my + 2} rx="4" ry="4.5" fill="#7A2E22" stroke={strokeCol} strokeWidth="1.8" />
      </g>

      {a.g && (
        <>
          <circle cx="80" cy={ey} r="7.5" fill="none" stroke={strokeCol} strokeWidth="2.1" />
          <circle cx="98" cy={ey} r="7.5" fill="none" stroke={strokeCol} strokeWidth="2.1" />
          <path d={`M87.5 ${ey} L90.5 ${ey}`} stroke={strokeCol} strokeWidth="2.1" />
        </>
      )}

      {/* Front Casting Arm + Radiant Energy Palm */}
      <g className="h-arm-cast">
        <path d="M107 98 Q125 104 142 96" fill="none" stroke={strokeCol} strokeWidth="14" strokeLinecap="round" />
        <path d="M107 98 Q125 104 142 96" fill="none" stroke={hij ? a.hc || a.c : a.c} strokeWidth="8.5" strokeLinecap="round" />
        <circle cx="145" cy="95" r="6.5" fill={a.s} stroke={strokeCol} strokeWidth="2.6" />
        {/* Swirling golden-emerald power orb in palm */}
        <circle cx="154" cy="92" r="14" fill="#FFE066" opacity="0.35" />
        <circle cx="154" cy="92" r="8" fill={`url(#ho-${uid})`} stroke="#FFFDF0" strokeWidth="1.6" />
      </g>
    </svg>
  );
};

export const GhostLogoSvg: React.FC<{ size?: number; variant?: 'normal' | 'boss'; className?: string }> = ({
  size = 42,
  variant = 'normal',
  className = ''
}) => {
  const uid = useId().replace(/:/g, '');
  const isBoss = variant === 'boss';
  const gid = `gl-${variant}-${uid}`;
  const cTop = isBoss ? '#F2EAFF' : '#F4F5FC';
  const cMid = isBoss ? '#9A73FF' : '#B9BFE3';
  const cBot = isBoss ? '#481FB0' : '#7B7DBA';
  const outline = isBoss ? '#18083B' : '#1D1C3D';
  const fold = isBoss ? '#36148C' : '#6264A3';
  const cheek = isBoss ? '#FF6BA8' : '#F5989D';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={`inline-block shrink-0 ${className}`}
      role="img"
      aria-label={isBoss ? 'Logo Raja Hantu' : 'Logo Hantu'}
    >
      <defs>
        <linearGradient id={gid} x1="22%" y1="8%" x2="80%" y2="94%">
          <stop offset="0%" stopColor={cTop} />
          <stop offset="52%" stopColor={cMid} />
          <stop offset="100%" stopColor={cBot} />
        </linearGradient>
      </defs>
      {isBoss && (
        <>
          <path d="M40 24 Q28 10 34 4 Q40 14 46 21Z" fill="#26105E" stroke={outline} strokeWidth="2.6" strokeLinejoin="round" />
          <path d="M76 23 Q88 9 82 3 Q76 13 70 20Z" fill="#26105E" stroke={outline} strokeWidth="2.6" strokeLinejoin="round" />
        </>
      )}
      {/* Left & right cute raised arms */}
      <path
        d="M34 64 Q18 68 15 76 Q14 82 22 83 Q30 83 37 78"
        fill={`url(#${gid})`}
        stroke={outline}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M84 58 Q96 49 103 52 Q108 56 103 70 Q98 83 90 89"
        fill={`url(#${gid})`}
        stroke={outline}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Main ghost sheet */}
      <path
        d="M58 17 C40 17 31 31 30 50 C29 65 27 74 22 86 C20 92 26 99 34 100 C39 100 44 104 51 105 C59 105 64 101 71 104 C80 106 87 102 91 95 C96 86 95 66 90 49 C86 30 75 17 58 17 Z"
        fill={`url(#${gid})`}
        stroke={outline}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M72 25 C82 33 86 50 90 69 C92 84 86 96 74 99 C80 89 81 74 78 56 C75 43 71 32 67 25 Z"
        fill={fold}
        opacity="0.34"
      />
      <path d="M40 27 C47 21 57 20 65 23" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.72" />
      {/* Eyes & smile */}
      <ellipse cx="43" cy="44" rx="4.2" ry="6.8" fill={outline} />
      <ellipse cx="58" cy="43" rx="4.3" ry="7" fill={outline} />
      {isBoss && (
        <>
          <ellipse cx="43" cy="44.5" rx="2.1" ry="3.6" fill="#FFE066" />
          <ellipse cx="58" cy="43.5" rx="2.1" ry="3.6" fill="#FFE066" />
        </>
      )}
      <circle cx="41.8" cy="41.2" r="1.5" fill="#FFFFFF" />
      <circle cx="56.8" cy="40.2" r="1.5" fill="#FFFFFF" />
      <ellipse cx="36" cy="52" rx="4.4" ry="2.5" fill={cheek} opacity="0.72" />
      <ellipse cx="66" cy="51" rx="4.4" ry="2.5" fill={cheek} opacity="0.72" />
      <path d="M44 54 Q51 57 58 53 Q56 64 50 64 Q44 64 44 54Z" fill={outline} />
      {/* Sparkles */}
      <path d="M16 54 l3 -1 l1 -3 l1 3 l3 1 l-3 1 l-1 3 l-1 -3Z" fill={outline} opacity="0.8" />
      <path d="M98 37 l3 -1 l1 -3 l1 3 l3 1 l-3 1 l-1 3 l-1 -3Z" fill={outline} opacity="0.8" />
    </svg>
  );
};

export { SYV } from './EnemySvgs';
export { BattleStage } from './BattleStage';
export type { BattleStageHandle } from './BattleStage';

export const TrophySvg: React.FC = () => (
  <svg className="trophy-bob w-20 h-24" viewBox="0 0 90 100" aria-label="Trofi">
    <path d="M22 14 H68 V44 Q68 66 45 70 Q22 66 22 44Z" fill="#FFC800" stroke="#E5A800" strokeWidth="3" />
    <path d="M22 22 H10 Q8 42 24 44 M68 22 H80 Q82 42 66 44" fill="none" stroke="#E5A800" strokeWidth="4" strokeLinecap="round" />
    <rect x="40" y="70" width="10" height="12" fill="#E5A800" />
    <rect x="24" y="82" width="42" height="10" rx="4" fill="#B8860B" />
    <path d="M45 28 L49 38 L60 38 L51 44 L54 55 L45 48 L36 55 L39 44 L30 38 L41 38Z" fill="#FFF7CC" />
  </svg>
);

const MedalSvg: React.FC<{ c1: string; c2: string; rank: number; delay: string }> = ({ c1, c2, rank, delay }) => (
  <svg className="medal-drop w-14 h-[70px]" style={{ animationDelay: delay }} viewBox="0 0 64 78" aria-label={`Medali ${rank}`}>
    <path d="M18 4 L30 34 L22 36 L10 6Z" fill="#1CB0F6" />
    <path d="M46 4 L34 34 L42 36 L54 6Z" fill="#FF4B4B" />
    <circle cx="32" cy="52" r="22" fill={c1} stroke={c2} strokeWidth="4" />
    <circle cx="32" cy="52" r="16" fill="none" stroke="#FFF9D6" strokeWidth="2" strokeDasharray="3 3" />
    <text x="32" y="60" textAnchor="middle" fontFamily="Nunito,sans-serif" fontWeight="900" fontSize="22" fill="#fff">
      {rank}
    </text>
  </svg>
);

export const Podium: React.FC<{ list: Array<{ name: string; av: string; sc?: number; t?: number }> }> = ({ list }) => {
  const slots = [
    { item: list[1], rank: 2, h: 'h-[110px]', grad: 'from-[#E4E9F0] to-[#9AA4B2]', riseDelay: '0.5s', medalDelay: '1.3s', mc: ['#B8C2CC', '#7D8794'] },
    { item: list[0], rank: 1, h: 'h-[150px]', grad: 'from-[#FFE066] to-[#E5A800]', riseDelay: '0.9s', medalDelay: '1.7s', mc: ['#FFD43B', '#D99B00'] },
    { item: list[2], rank: 3, h: 'h-[80px]', grad: 'from-[#E39A5B] to-[#A55F26]', riseDelay: '0.1s', medalDelay: '0.9s', mc: ['#E89B58', '#A85A1E'] }
  ];

  return (
    <div className="flex items-end justify-center gap-2 pt-4 w-full max-w-lg mx-auto">
      {slots.map((s) =>
        s.item ? (
          <div key={s.rank} className="flex-1 min-w-0 flex flex-col items-center text-center gap-1.5">
            <MedalSvg c1={s.mc[0]} c2={s.mc[1]} rank={s.rank} delay={s.medalDelay} />
            <AvatarSvg code={s.item.av} size={52} />
            <div className="font-black text-sm sm:text-base break-words leading-tight">{s.item.name}</div>
            <div className="text-xs font-bold text-[#777777] dark:text-[#9DB0BA] font-mono-num">
              {s.item.sc != null ? `Skor ${s.item.sc}` : ''}
              {s.item.t != null ? ` · ${fmtT(s.item.t)}` : ''}
            </div>
            <div
              className={`podium-rise w-full ${s.h} rounded-t-2xl bg-gradient-to-b ${s.grad} grid place-items-center font-black text-3xl text-white drop-shadow-sm`}
              style={{ animationDelay: s.riseDelay }}
            >
              {s.rank}
            </div>
          </div>
        ) : (
          <div key={s.rank} className="flex-1 min-w-0 flex flex-col items-center text-center gap-1.5 opacity-40">
            <div className="text-xs font-bold text-[#777777]">Kosong</div>
            <div className={`podium-rise w-full ${s.h} rounded-t-2xl bg-gradient-to-b ${s.grad} grid place-items-center font-black text-3xl text-white`}>
              {s.rank}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export const CrowdCheer: React.FC<{ win?: boolean }> = ({ win = true }) => {
  const { phrase, people } = useMemo(() => {
    const winSay = ['Alhamdulillah, Kota Selamat!', 'Hore! Pahlawan Menang!', 'Masya Allah, Luar Biasa!', 'Barakallah, Juara!', 'Hidup Pahlawan Qur’ani!'];
    const loseSay = ['Awas! Pahlawan tumbang — KABUR!! 😱', 'Cepat mengungsi sebelum kota ikut hancur!', 'Lari! Selamatkan diri masing-masing!! 💨'];
    const pool = win ? winSay : loseSay;
    return {
      phrase: pool[(Math.random() * pool.length) | 0],
      people: shuffle(AVATARS).slice(0, 8)
    };
  }, [win]);
  const hearts = win ? ['❤️', '🎉', '💛', '💚', '🌟'] : ['💨', '😱', '💦', '💨'];
  const props: SupporterProp[] = ['flag', 'light', 'clap', 'flag', 'light', 'clap', 'flag', 'light'];

  return (
    <div className="mt-3 w-full">
      <div className={`text-center font-black text-base sm:text-lg ${win ? 'text-[#58CC02] animate-pulse' : 'text-[#EA2B2B] dark:text-[#FF8A8A]'}`}>
        “{phrase}”
      </div>
      <div
        className={`stage ${win ? 'win' : 'flee-loop'} relative mt-2 rounded-2xl border-2 overflow-hidden pt-10 ${
          win
            ? 'bg-gradient-to-b from-[#EFF9E8] to-[#DDF4CF] dark:from-[#1B2B22] dark:to-[#132019] border-[#C8EAA8] dark:border-[#2C4735]'
            : 'bg-gradient-to-b from-[#FFF0EE] to-[#FFE1DC] dark:from-[#2D1819] dark:to-[#1F1011] border-[#FFBEB8] dark:border-[#5C292C]'
        }`}
      >
        {hearts.map((h, i) => (
          <span
            key={i}
            className="heart-up absolute bottom-8 text-xl sm:text-2xl pointer-events-none z-10"
            style={{ left: `${10 + i * 20}%`, animationDelay: `${i * 0.4}s` }}
          >
            {h}
          </span>
        ))}
        <div className="flex justify-center items-end gap-0 sm:gap-1 px-2 -mb-2">
          {people.map((a, idx) => (
            <div key={idx} className="crowd-av w-[clamp(44px,11%,64px)] drop-shadow-sm">
              <SupporterFigureSvg
                code={a}
                size="fill"
                prop={props[idx % props.length]}
                mood={win ? 'cheer' : 'panic'}
                cheerful={win}
              />
            </div>
          ))}
        </div>
        <div
          className={`relative z-[3] h-3.5 border-t-2 border-white/70 ${
            win ? 'bg-gradient-to-r from-[#58CC02] via-[#FFC800] to-[#1CB0F6]' : 'bg-gradient-to-r from-[#FF4B4B] via-[#FF9600] to-[#EA2B2B]'
          }`}
        />
      </div>
    </div>
  );
};
