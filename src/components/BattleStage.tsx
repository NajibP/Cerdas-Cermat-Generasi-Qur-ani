import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Music } from '../utils/audio';
import { shuffle } from '../utils/helpers';
import { sceneMega, sceneV } from './BattleBackgrounds';
import {
  BURST,
  ENEMY_COLORS,
  HERO_SIGIL,
  SHOCKWAVE,
  ULTN,
  enemyBurstSvg,
  enemySigilSvg,
  enemyWaveSvg,
  makeOrbSvg,
  makePrjSvg,
  megaSVG,
  syaitanSVG
} from './EnemySvgs';
import { AVATARS, BattleHeroSvg, SupporterFigureSvg, SupporterProp } from './Svgs';

export interface BattleStageHandle {
  fxHero: () => void;
  fxKaiju: (v?: number) => void;
  ultHero: () => void;
  ultEnemy: (v: number) => void;
  fxKO: () => void;
  fxHeroKO: () => void;
  fxWin: () => void;
  fxFlee: () => void;
  floatText: (text: string) => void;
}

interface BattleStageProps {
  mega?: boolean;
  v?: number;
  av: string;
  hname: string;
  kname: string;
  hpH: number;
  hpK: number;
}

export const BattleStage = forwardRef<BattleStageHandle, BattleStageProps>(
  ({ mega = false, v = 0, av, hname, kname, hpH, hpK }, ref) => {
    const stageRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const kaijuRef = useRef<HTMLDivElement>(null);
    const cheerTimerRef = useRef<number | null>(null);
    const clsTimersRef = useRef<Map<string, number>>(new Map());
    const activeTimersRef = useRef<Set<number>>(new Set());
    const mountedRef = useRef(true);
    const seqRef = useRef(0);
    const [won, setWon] = useState(false);
    const [fled, setFled] = useState(false);

    useEffect(() => {
      mountedRef.current = true;
      return () => {
        mountedRef.current = false;
        if (cheerTimerRef.current) window.clearTimeout(cheerTimerRef.current);
        clsTimersRef.current.forEach((tid) => window.clearTimeout(tid));
        clsTimersRef.current.clear();
        activeTimersRef.current.forEach((tid) => window.clearTimeout(tid));
        activeTimersRef.current.clear();
      };
    }, []);

    const schedule = (fn: () => void, ms: number) => {
      const tid = window.setTimeout(() => {
        activeTimersRef.current.delete(tid);
        if (!mountedRef.current) return;
        fn();
      }, ms);
      activeTimersRef.current.add(tid);
      return tid;
    };

    const { frontCrowd, backCrowd } = useMemo(() => {
      const pool = shuffle(AVATARS);
      return {
        frontCrowd: pool.slice(0, 7),
        backCrowd: pool.slice(7, 12)
      };
    }, []);
    const sceneMarkup = useMemo(() => (mega ? sceneMega() : sceneV(v)), [mega, v]);
    const enemyMarkup = useMemo(() => (mega ? megaSVG() : syaitanSVG(v)), [mega, v]);

    const addOverlay = (cls: string, html: string, ms: number) => {
      const s = stageRef.current;
      if (!s || !mountedRef.current) return;
      const d = document.createElement('div');
      d.className = cls;
      d.innerHTML = html;
      s.appendChild(d);
      schedule(() => d.remove(), ms);
    };

    const pulseClass = (el: HTMLElement | null, cls: string, clearMs?: number) => {
      if (!el || el.classList.contains('fx-ko')) return;
      if (el === heroRef.current) {
        el.classList.remove('fx-lunge', 'fx-hit', 'fx-ult');
      } else if (el === kaijuRef.current) {
        el.classList.remove('fx-hit', 'atk');
      } else {
        el.classList.remove(cls);
      }
      void el.offsetWidth;
      el.classList.add(cls);
      if (clearMs) {
        const key = `${el === heroRef.current ? 'h' : el === kaijuRef.current ? 'k' : 's'}:${cls}`;
        const prev = clsTimersRef.current.get(key);
        if (prev) window.clearTimeout(prev);
        const tid = window.setTimeout(() => {
          clsTimersRef.current.delete(key);
          el.classList.remove(cls);
        }, clearMs);
        clsTimersRef.current.set(key, tid);
      }
    };

    const triggerCrowdCheer = (ms = 1200) => {
      const s = stageRef.current;
      if (!s || s.classList.contains('flee')) return;
      s.classList.add('cheer');
      if (cheerTimerRef.current) window.clearTimeout(cheerTimerRef.current);
      cheerTimerRef.current = window.setTimeout(() => {
        stageRef.current?.classList.remove('cheer');
      }, ms);
    };

    const spawnCheerBubble = (text: string, leftPct: number, tone: 'good' | 'hype' | 'panic' = 'good') => {
      const bg =
        tone === 'good'
          ? 'bg-white text-[#1D3511] border-[#58CC02]'
          : tone === 'panic'
          ? 'bg-[#FFE5E5] text-[#9E1414] border-[#FF4B4B]'
          : 'bg-[#FFF7D6] text-[#804800] border-[#FFC800]';
      addOverlay(
        `crowd-pop absolute bottom-[22%] z-[14] pointer-events-none px-2.5 py-1 rounded-2xl border-2 shadow-md text-[10px] sm:text-xs font-black whitespace-nowrap ${bg}`,
        text,
        1350
      );
      const s = stageRef.current;
      const last = s?.lastElementChild as HTMLElement | null;
      if (last) last.style.left = `${leftPct}%`;
    };

    const triggerFleeNow = () => {
      setFled(true);
      setWon(false);
      stageRef.current?.classList.remove('cheer', 'win');
      spawnCheerBubble('KABUR!! 😱', 26, 'panic');
      schedule(() => spawnCheerBubble('Pahlawan kalah, lari!!', 62, 'panic'), 110);
      schedule(() => spawnCheerBubble('Selamatkan diri! 💨', 42, 'panic'), 240);
      [18, 34, 52, 68, 82].forEach((lp, idx) => {
        schedule(() => {
          addOverlay('crowd-dust absolute bottom-[10%] z-[5] text-lg sm:text-xl pointer-events-none', '💨', 700);
          const s = stageRef.current;
          const last = s?.lastElementChild as HTMLElement | null;
          if (last) last.style.left = `${lp}%`;
        }, idx * 75);
      });
    };

    const triggerWinJoy = () => {
      setFled(false);
      setWon(true);
      spawnCheerBubble('Hore!! Menang! 🎉', 25, 'good');
      schedule(() => spawnCheerBubble('Alhamdulillah, Kota Selamat!', 68, 'hype'), 220);
      ['🎉', '❤️', '🌟', '💚', '✨'].forEach((em, idx) => {
        schedule(() => {
          addOverlay('heart-up absolute bottom-[18%] z-[13] text-xl sm:text-2xl pointer-events-none', em, 2000);
          const s = stageRef.current;
          const last = s?.lastElementChild as HTMLElement | null;
          if (last) last.style.left = `${14 + idx * 18}%`;
        }, idx * 140);
      });
    };

    useImperativeHandle(ref, () => ({
      fxHero() {
        if (heroRef.current?.classList.contains('fx-ko')) return;
        const uid = String(++seqRef.current);
        pulseClass(heroRef.current, 'fx-lunge', 540);
        triggerCrowdCheer(1250);
        const cheers = ['Masya Allah!', 'Serang!', 'Keren!', 'Mantap!', 'Teruskan!'];
        spawnCheerBubble(cheers[(Math.random() * cheers.length) | 0], 18 + Math.random() * 58, 'good');
        addOverlay('hero-sigil absolute bottom-[31%] left-[19%] w-[78px] h-[78px] z-[9] pointer-events-none', HERO_SIGIL, 560);
        addOverlay(
          'orb-fx absolute bottom-[34%] left-[20%] w-[94px] h-[56px] z-10 pointer-events-none drop-shadow-[0_0_12px_rgba(255,224,102,0.95)]',
          makeOrbSvg(uid),
          460
        );
        schedule(() => {
          if (heroRef.current?.classList.contains('fx-ko')) return;
          pulseClass(stageRef.current, 'micro-shake', 360);
          addOverlay('shockwave-fx absolute bottom-[29%] left-[63%] w-[110px] h-[110px] z-[9] pointer-events-none', SHOCKWAVE, 520);
          addOverlay('burst-fx absolute bottom-[29%] left-[61%] w-[124px] h-[124px] z-10 pointer-events-none', BURST, 540);
          pulseClass(kaijuRef.current, 'fx-hit', 560);
          Music.sfx('hit');
        }, 400);
      },
      fxKaiju(variant = -1) {
        if (kaijuRef.current?.classList.contains('fx-ko')) return;
        const uid = String(++seqRef.current);
        pulseClass(kaijuRef.current, 'atk', 720);
        Music.sfx('roar');
        const idx = variant >= 0 ? variant % 6 : mega ? 5 : v % 5;
        const [c1] = ENEMY_COLORS[idx];
        addOverlay('hero-sigil absolute bottom-[31%] right-[20%] w-[84px] h-[84px] z-[9] pointer-events-none', enemySigilSvg(idx), 560);
        addOverlay(
          'flame-fx absolute bottom-[33%] left-[57%] w-[104px] h-[62px] z-10 pointer-events-none',
          makePrjSvg(idx, uid),
          520
        );
        const s = stageRef.current;
        const projEl = s?.lastElementChild as HTMLElement | null;
        if (projEl) projEl.style.filter = `drop-shadow(0 0 12px ${c1})`;
        schedule(() => {
          pulseClass(heroRef.current, 'fx-hit', 560);
          pulseClass(stageRef.current, 'micro-shake', 360);
          addOverlay('shockwave-fx absolute bottom-[27%] left-[8%] w-[110px] h-[110px] z-[9] pointer-events-none', enemyWaveSvg(idx), 520);
          addOverlay('burst-fx absolute bottom-[27%] left-[6%] w-[124px] h-[124px] z-10 pointer-events-none', enemyBurstSvg(idx), 540);
          if (stageRef.current?.classList.contains('flee')) return;
          const enc = ['Semangat!', 'Bertahan!', 'Ayo Bangkit!'];
          spawnCheerBubble(enc[(Math.random() * enc.length) | 0], 20 + Math.random() * 35, 'hype');
        }, 440);
      },
      ultHero() {
        if (heroRef.current?.classList.contains('fx-ko')) return;
        pulseClass(heroRef.current, 'fx-ult', 1580);
        triggerCrowdCheer(1900);
        spawnCheerBubble('Allahu Akbar!', 24, 'hype');
        schedule(() => spawnCheerBubble('Luar Biasa!', 72, 'good'), 240);
        addOverlay('hero-sigil absolute bottom-[30%] left-[21%] w-[116px] h-[116px] z-[21] pointer-events-none', HERO_SIGIL, 900);
        addOverlay(
          'absolute inset-0 z-20 pointer-events-none grid place-items-center overflow-hidden',
          `<div class="ult-dim absolute inset-0" style="background:radial-gradient(circle at 24% 55%,rgba(255,232,120,0.28),rgba(8,14,22,0.72) 65%)"></div>
           <div class="ult-fx absolute inset-0" style="background:radial-gradient(circle at 78% 48%,#FFE066,transparent 68%)"></div>
           <div class="beam-fx absolute left-[24%] right-0 top-[41%] h-[54px] rounded-full" style="background:linear-gradient(180deg,#58CC02 0%,#FFE066 22%,#FFFFFF 50%,#FFE066 78%,#58CC02 100%);box-shadow:0 0 42px 18px rgba(255,224,102,0.95),0 0 70px 26px rgba(88,204,2,0.55);transform-origin:left"></div>
           <div class="beam-ring absolute left-[25%] top-[36%] w-[78px] h-[78px] rounded-full border-4 border-[#FFFDF0] shadow-[0_0_18px_#FFE066]"></div>
           <div class="beam-ring absolute left-[25%] top-[36%] w-[78px] h-[78px] rounded-full border-4 border-[#58CC02] shadow-[0_0_18px_#58CC02]" style="animation-delay:0.18s"></div>
           <div class="ult-txt relative font-black text-base sm:text-2xl text-white bg-gradient-to-r from-[#1A2B16]/90 via-[#2E4F12]/90 to-[#1A2B16]/90 border-2 border-[#FFE066] px-5 py-2 rounded-2xl shadow-[0_4px_24px_rgba(255,200,0,0.6)] text-center">✨ ULTIMATE: CAHAYA KEBENARAN!</div>`,
          1750
        );
        Music.sfx('win');
        schedule(() => {
          pulseClass(stageRef.current, 'shake', 620);
          pulseClass(kaijuRef.current, 'fx-hit', 560);
          addOverlay('shockwave-fx absolute bottom-[26%] left-[60%] w-[150px] h-[150px] z-[21] pointer-events-none', SHOCKWAVE, 560);
          addOverlay('burst-fx absolute bottom-[25%] left-[58%] w-[156px] h-[156px] z-[22] pointer-events-none', BURST, 560);
        }, 520);
        schedule(() => {
          addOverlay('burst-fx absolute bottom-[34%] left-[68%] w-[115px] h-[115px] z-[22] pointer-events-none', BURST, 500);
        }, 760);
      },
      ultEnemy(variant: number) {
        const idx = variant < 0 ? 5 : variant % ULTN.length;
        const u = ULTN[idx];
        const [c1, c2] = ENEMY_COLORS[idx];
        pulseClass(kaijuRef.current, 'atk', 720);
        pulseClass(stageRef.current, 'shake', 620);
        addOverlay('hero-sigil absolute bottom-[30%] right-[20%] w-[124px] h-[124px] z-[21] pointer-events-none', enemySigilSvg(idx), 950);
        addOverlay(
          'absolute inset-0 z-20 pointer-events-none grid place-items-center overflow-hidden',
          `<div class="ult-dim absolute inset-0" style="background:radial-gradient(circle at 76% 52%,${c1}44,rgba(10,6,18,0.78) 65%)"></div>
           <div class="ult-fx absolute inset-0" style="background:radial-gradient(circle at 22% 50%,${u[1]},transparent 68%)"></div>
           <div class="beam-fx absolute left-0 right-[24%] top-[41%] h-[54px] rounded-full" style="background:linear-gradient(180deg,${c1} 0%,${c2} 25%,#FFFFFF 50%,${c2} 75%,${c1} 100%);box-shadow:0 0 42px 18px ${c1},0 0 70px 26px ${c2}88;transform-origin:right"></div>
           <div class="beam-ring-l absolute right-[25%] top-[36%] w-[78px] h-[78px] rounded-full border-4 border-[#FFFFFF]" style="box-shadow:0 0 18px ${c2}"></div>
           <div class="beam-ring-l absolute right-[25%] top-[36%] w-[78px] h-[78px] rounded-full border-4" style="border-color:${c1};box-shadow:0 0 18px ${c1};animation-delay:0.18s"></div>
           <div class="ult-txt relative font-black text-base sm:text-2xl text-white bg-black/80 border-2 px-5 py-2 rounded-2xl shadow-lg text-center" style="border-color:${c2};box-shadow:0 4px 24px ${c1}99">⚠️ ULTIMATE: ${u[0].toUpperCase()}!</div>`,
          1750
        );
        Music.sfx('roar');
        schedule(() => {
          pulseClass(stageRef.current, 'shake', 620);
          pulseClass(heroRef.current, 'fx-hit', 560);
          Music.sfx('hit');
          addOverlay('shockwave-fx absolute bottom-[24%] left-[4%] w-[150px] h-[150px] z-[21] pointer-events-none', enemyWaveSvg(idx), 560);
          addOverlay('burst-fx absolute bottom-[24%] left-[4%] w-[156px] h-[156px] z-[22] pointer-events-none', enemyBurstSvg(idx), 560);
          if (!stageRef.current?.classList.contains('flee')) {
            spawnCheerBubble('Jangan Menyerah!', 32, 'hype');
          }
        }, 500);
        schedule(() => {
          addOverlay('burst-fx absolute bottom-[33%] left-[12%] w-[112px] h-[112px] z-[22] pointer-events-none', enemyBurstSvg(idx), 500);
        }, 740);
      },
      fxKO() {
        const k = kaijuRef.current;
        if (k) {
          k.classList.remove('fx-hit', 'atk');
          void k.offsetWidth;
          k.classList.add('fx-ko');
        }
        triggerCrowdCheer(2200);
        spawnCheerBubble('Takbir! Menang!', 50, 'hype');
      },
      fxHeroKO() {
        const h = heroRef.current;
        if (h) {
          h.classList.remove('fx-hit', 'fx-lunge', 'fx-ult');
          void h.offsetWidth;
          h.classList.add('fx-ko');
        }
        triggerFleeNow();
      },
      fxWin() {
        triggerWinJoy();
      },
      fxFlee() {
        triggerFleeNow();
      },
      floatText(text: string) {
        const s = stageRef.current;
        if (!s || !mountedRef.current) return;
        const d = document.createElement('div');
        d.className = 'float-fx absolute left-1/2 top-[38%] font-black text-2xl text-white drop-shadow-[0_2px_0_rgba(0,0,0,0.5)] z-20 pointer-events-none';
        d.textContent = text;
        s.appendChild(d);
        schedule(() => d.remove(), 1000);
      }
    }));

    const propOrder: SupporterProp[] = ['flag', 'light', 'clap', 'flag', 'clap', 'light', 'flag'];

    return (
      <div
        ref={stageRef}
        className={`stage relative rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] overflow-hidden aspect-[16/10] min-h-[220px] max-h-[380px] w-full isolate bg-[#131F24] ${won ? 'win' : ''} ${fled ? 'flee' : ''}`}
      >
        <div dangerouslySetInnerHTML={{ __html: sceneMarkup }} />
        <div className="absolute left-3 right-3 top-3 flex justify-between gap-3 z-10">
          <div className="flex-1 max-w-[46%] min-w-0">
            <div className="flex items-center justify-between text-xs font-black text-white drop-shadow mb-1">
              <span className="truncate">{hname}</span>
              <span className="font-mono-num ml-2">{Math.round(hpH)}%</span>
            </div>
            <div className="h-3.5 bg-black/40 rounded-full overflow-hidden border-2 border-white">
              <div className="h-full bg-[#58CC02] transition-all duration-500 rounded-full" style={{ width: `${Math.max(0, hpH)}%` }} />
            </div>
          </div>
          <div className="flex-1 max-w-[46%] min-w-0">
            <div className="flex items-center justify-between text-xs font-black text-white drop-shadow mb-1">
              <span className="truncate">{kname}</span>
              <span className="font-mono-num ml-2">{Math.round(hpK)}%</span>
            </div>
            <div className="h-3.5 bg-black/40 rounded-full overflow-hidden border-2 border-white">
              <div className="h-full bg-[#FF4B4B] transition-all duration-500 rounded-full" style={{ width: `${Math.max(0, hpK)}%` }} />
            </div>
          </div>
        </div>

        <div
          ref={heroRef}
          className={`hero-f fighter absolute bottom-[14%] left-[4%] w-[clamp(108px,26%,178px)] z-[3] ${hpH <= 0 ? 'fx-ko' : ''}`}
        >
          <div className="hero-bob">
            <BattleHeroSvg code={av} />
          </div>
        </div>

        <div
          ref={kaijuRef}
          className={`kaiju fighter absolute right-[2%] z-[3] ${mega ? 'w-[clamp(150px,45%,310px)] bottom-[14%]' : 'w-[clamp(124px,35%,248px)] bottom-[16%]'} ${hpK <= 0 ? 'fx-ko' : ''}`}
          dangerouslySetInnerHTML={{ __html: enemyMarkup }}
        />

        <div className="absolute left-0 right-0 bottom-0 h-[21%] z-[4] pointer-events-none select-none">
          <div className="absolute left-4 right-4 bottom-[16%] flex justify-around items-end z-[1] opacity-90">
            {backCrowd.map((a, idx) => (
              <div key={`b-${idx}`} className="crowd-av w-[clamp(30px,5.6%,46px)]">
                <SupporterFigureSvg
                  code={a}
                  size="fill"
                  prop={idx % 2 === 0 ? 'light' : 'clap'}
                  mood={fled ? 'panic' : 'cheer'}
                  back
                  cheerful={!fled}
                />
              </div>
            ))}
          </div>

          <div className="absolute left-1 right-1 bottom-[3%] flex justify-around items-end z-[2]">
            {frontCrowd.map((a, idx) => (
              <div key={`f-${idx}`} className="crowd-av w-[clamp(38px,7.6%,62px)] drop-shadow-[0_2px_2px_rgba(0,0,0,0.35)]">
                <SupporterFigureSvg
                  code={a}
                  size="fill"
                  prop={propOrder[idx % propOrder.length]}
                  mood={fled ? 'panic' : 'cheer'}
                  cheerful={!fled}
                />
              </div>
            ))}
          </div>

          <div className="absolute left-0 right-0 bottom-0 h-[22%] z-[3] bg-gradient-to-b from-[#2E3F4B] to-[#17232B] border-t-[2.5px] border-[#FFC800] shadow-[0_-2px_10px_rgba(88,204,2,0.35)]">
            <div className="h-[2px] w-full bg-gradient-to-r from-[#58CC02] via-[#FFE066] to-[#1CB0F6] opacity-90" />
            <div className="h-full flex justify-between px-4 items-center opacity-35">
              {Array.from({ length: 9 }).map((_, idx) => (
                <span key={idx} className="w-1 h-[65%] rounded-full bg-[#8FA3B0]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

BattleStage.displayName = 'BattleStage';
