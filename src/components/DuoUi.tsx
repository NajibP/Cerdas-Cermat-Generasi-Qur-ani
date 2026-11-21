import React, { useEffect, useRef, useState } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Lock,
  Sun,
  Moon,
  X,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Maximize2,
  Minimize2,
  AlertTriangle
} from 'lucide-react';
import { Music } from '../utils/audio';
import { getQuestionTopic, trackOpen } from '../utils/helpers';
import { Question, TIER_L } from '../data/bank';
import { PWAInstallButton } from './PwaUi';

export type ButtonVariant = 'green' | 'blue' | 'gold' | 'red' | 'purple' | 'ghost';

interface DuoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  full?: boolean;
}

const VARIANT_CLS: Record<ButtonVariant, string> = {
  green: 'bg-[#58CC02] text-white border-b-4 border-[#58A700] hover:brightness-105 active:border-b-0 active:mt-1',
  blue: 'bg-[#1CB0F6] text-white border-b-4 border-[#1899D6] hover:brightness-105 active:border-b-0 active:mt-1',
  gold: 'bg-[#FFC800] text-[#5A4300] border-b-4 border-[#E5B400] hover:brightness-105 active:border-b-0 active:mt-1',
  red: 'bg-[#FF4B4B] text-white border-b-4 border-[#EA2B2B] hover:brightness-105 active:border-b-0 active:mt-1',
  purple: 'bg-[#CE82FF] text-white border-b-4 border-[#A55EEA] hover:brightness-105 active:border-b-0 active:mt-1',
  ghost:
    'bg-white dark:bg-[#1F2F36] text-[#1CB0F6] dark:text-[#4CC4FF] border-2 border-b-4 border-[#E5E5E5] dark:border-[#37464F] hover:bg-[#F7F7F7] dark:hover:bg-[#24363E] active:border-b-2 active:mt-0.5'
};

const SIZE_CLS = {
  sm: 'px-3.5 py-2 text-xs min-h-[38px] rounded-xl',
  md: 'px-5 py-3 text-sm min-h-[46px] rounded-2xl',
  lg: 'px-6 py-3.5 text-base min-h-[52px] rounded-2xl'
};

export const DuoButton: React.FC<DuoButtonProps> = ({
  variant = 'green',
  size = 'md',
  full = false,
  className = '',
  children,
  disabled,
  ...rest
}) => (
  <button
    disabled={disabled}
    className={`duo-btn inline-flex items-center justify-center gap-2 font-black uppercase tracking-wide whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed disabled:grayscale-[0.4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1CB0F6] ${VARIANT_CLS[variant]} ${SIZE_CLS[size]} ${full ? 'w-full' : ''} ${className}`}
    {...rest}
  >
    {children}
  </button>
);

export const MusicWidget: React.FC<{ onLockedToast?: (msg: string) => void; compact?: boolean }> = ({
  onLockedToast,
  compact = false
}) => {
  const [, setTick] = useState(0);
  useEffect(() => Music.subscribe(() => setTick((t) => t + 1)), []);

  const icons = ['', '🐢', '🚶', '🏃', '🔥', '🕊️'];
  const curName = Music.cur ? Music.T[Music.cur].n : 'Pilih musik';

  return (
    <div className={`rounded-2xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-[#F7F7F7] dark:bg-[#1A2A31] ${compact ? 'p-3' : 'p-4'} flex flex-col gap-3`}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm font-extrabold text-[#3C3C3C] dark:text-[#F1F7F9] truncate">
          <Volume2 className="w-4 h-4 text-[#58CC02] shrink-0" />
          <span className="truncate">
            {curName}
            {Music.muted ? ' (jeda)' : ''}
          </span>
        </div>
        <button
          type="button"
          onClick={() => Music.toggle()}
          aria-label={Music.playing ? 'Jeda musik' : 'Putar musik'}
          className="duo-btn inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white dark:bg-[#1F2F36] border-2 border-b-4 border-[#E5E5E5] dark:border-[#37464F] text-[#58CC02] cursor-pointer shrink-0"
        >
          {Music.playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {[1, 2, 3, 4, 5].map((n) => {
          const open = trackOpen(n);
          const active = Music.cur === n && Music.playing;
          return (
            <button
              key={n}
              type="button"
              onClick={() => {
                if (!open) {
                  onLockedToast?.(`Track ${n} masih terkunci`);
                  return;
                }
                Music.play(n);
              }}
              aria-pressed={active}
              title={`Track ${n}: ${Music.T[n].n}`}
              className={`duo-btn flex-1 min-w-[44px] min-h-[38px] px-2 rounded-xl border-2 border-b-4 font-black text-xs inline-flex items-center justify-center gap-1 cursor-pointer ${
                !open
                  ? 'opacity-50 cursor-not-allowed bg-[#E5E5E5] dark:bg-[#24363E] border-[#D0D0D0] dark:border-[#37464F] text-[#777]'
                  : active
                  ? 'bg-[#58CC02] text-white border-[#58A700]'
                  : 'bg-white dark:bg-[#1F2F36] text-[#3C3C3C] dark:text-[#DCE6EC] border-[#E5E5E5] dark:border-[#37464F] hover:border-[#1CB0F6]'
              }`}
            >
              {open ? <span>{icons[n]}</span> : <Lock className="w-3 h-3" />}
              <span className="font-mono-num">{n}</span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2.5">
          <span className="text-[11px] font-black text-[#777777] dark:text-[#9DB0BA] w-10">BGM</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={Music.bgmVol}
            onChange={(e) => Music.setBgmVol(+e.target.value)}
            aria-label="Volume musik latar"
            className="flex-1 accent-[#58CC02] cursor-pointer h-2"
          />
          <span className="text-xs font-mono-num font-bold text-[#777777] dark:text-[#9DB0BA] w-9 text-right">
            {Math.round(Music.bgmVol * 100)}%
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              Music.toggleSfxMute();
              if (Music.sfxMuted) Music.sfx('ok');
            }}
            aria-label={Music.sfxMuted ? 'Nyalakan efek suara' : 'Bisukan efek suara'}
            title={Music.sfxMuted ? 'Nyalakan SFX' : 'Bisukan SFX'}
            className="inline-flex items-center gap-1 text-[11px] font-black text-[#777777] dark:text-[#9DB0BA] w-10 hover:text-[#1CB0F6] cursor-pointer"
          >
            {Music.sfxMuted ? <VolumeX className="w-3.5 h-3.5 text-[#FF4B4B]" /> : <Sparkles className="w-3.5 h-3.5 text-[#FFC800]" />}
            <span>SFX</span>
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={Music.sfxMuted ? 0 : Music.sfxVol}
            onChange={(e) => Music.setSfxVol(+e.target.value)}
            aria-label="Volume efek suara"
            className="flex-1 accent-[#1CB0F6] cursor-pointer h-2"
          />
          <span className="text-xs font-mono-num font-bold text-[#777777] dark:text-[#9DB0BA] w-9 text-right">
            {Music.sfxMuted ? '0%' : `${Math.round(Music.sfxVol * 100)}%`}
          </span>
        </div>
      </div>
    </div>
  );
};

export const OptionsModal: React.FC<{
  open: boolean;
  dark: boolean;
  onToggleTheme: () => void;
  onClose: () => void;
  onToast: (m: string) => void;
}> = ({ open, dark, onToggleTheme, onClose, onToast }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onFs = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  if (!open) return null;

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      onToast('Browser tidak mengizinkan mode layar penuh di mode ini.');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Pengaturan aplikasi"
      className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs grid place-items-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-6 flex flex-col gap-4 shadow-xl max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black">Pengaturan</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup pengaturan"
            className="w-10 h-10 rounded-xl border-2 border-[#E5E5E5] dark:border-[#37464F] grid place-items-center text-[#777] hover:text-[#3C3C3C] dark:hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-between gap-4 p-3.5 rounded-2xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-[#F7F7F7] dark:bg-[#1A2A31]">
          <div className="flex items-center gap-2.5">
            {dark ? <Moon className="w-5 h-5 text-[#CE82FF]" /> : <Sun className="w-5 h-5 text-[#FFC800]" />}
            <div>
              <div className="font-black text-sm">Mode Tampilan</div>
              <div className="text-xs font-bold text-[#777777] dark:text-[#9DB0BA]">{dark ? 'Gelap (Malam)' : 'Terang (Siang)'}</div>
            </div>
          </div>
          <DuoButton variant="ghost" size="sm" onClick={onToggleTheme} role="switch" aria-checked={dark}>
            {dark ? 'Ganti Terang' : 'Ganti Gelap'}
          </DuoButton>
        </div>

        <div className="flex items-center justify-between gap-4 p-3.5 rounded-2xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-[#F7F7F7] dark:bg-[#1A2A31]">
          <div className="flex items-center gap-2.5">
            {isFullscreen ? <Minimize2 className="w-5 h-5 text-[#1CB0F6]" /> : <Maximize2 className="w-5 h-5 text-[#1CB0F6]" />}
            <div>
              <div className="font-black text-sm">Mode Proyektor</div>
              <div className="text-xs font-bold text-[#777777] dark:text-[#9DB0BA]">Tampilan penuh untuk acara lomba</div>
            </div>
          </div>
          <DuoButton variant="ghost" size="sm" onClick={toggleFullscreen}>
            {isFullscreen ? 'Keluar Full' : 'Layar Penuh'}
          </DuoButton>
        </div>

        <div>
          <div className="text-sm font-black mb-2">Navigasi Musik &amp; Efek Suara</div>
          <MusicWidget onLockedToast={onToast} />
        </div>

        <PWAInstallButton />

        <DuoButton variant="green" size="lg" full onClick={onClose}>
          Selesai
        </DuoButton>
      </div>
    </div>
  );
};

export const ConfirmModal: React.FC<{
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({
  open,
  title,
  message,
  confirmLabel = 'Ya, Keluar',
  cancelLabel = 'Lanjut Main',
  onConfirm,
  onCancel
}) => {
  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [open, onCancel]);

  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs grid place-items-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className="w-full max-w-sm rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-6 flex flex-col gap-4 shadow-xl text-center">
        <div className="w-12 h-12 rounded-2xl bg-[#FFDFE0] dark:bg-[#40201F] text-[#EA2B2B] dark:text-[#FF8A8A] grid place-items-center mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-black">{title}</h3>
          <p className="text-sm font-bold text-[#777777] dark:text-[#9DB0BA] mt-1 leading-relaxed">{message}</p>
        </div>
        <div className="flex gap-2.5">
          <DuoButton variant="ghost" size="md" onClick={onCancel} className="flex-1">
            {cancelLabel}
          </DuoButton>
          <DuoButton variant="red" size="md" onClick={onConfirm} className="flex-1">
            {confirmLabel}
          </DuoButton>
        </div>
      </div>
    </div>
  );
};

export const ConfettiOverlay: React.FC<{ active: boolean; set?: string[] }> = ({
  active,
  set = ['🎉', '⭐', '✨', '🌟', '🎊']
}) => {
  if (!active) return null;
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-40" aria-hidden="true">
      {Array.from({ length: 34 }, (_, i) => (
        <span
          key={i}
          className="confetti-fall absolute -top-8 text-2xl"
          style={{
            left: `${(i * 3.1 + (i % 5) * 2) % 98}%`,
            animationDelay: `${(i % 10) * 0.12}s`
          }}
        >
          {set[i % set.length]}
        </span>
      ))}
    </div>
  );
};

export interface AskResult {
  status: 'correct' | 'wrong' | 'timeout';
  picked: number;
  elapsed: number;
}

export interface AskController {
  addTime: (s: number) => void;
  eliminate: () => void;
  setRate: (r: number) => void;
}

interface QuestionRunnerProps {
  question: Question;
  seconds: number;
  rate?: number;
  reveal?: boolean;
  onResult: (res: AskResult) => void;
  controllerRef?: React.MutableRefObject<AskController | null>;
  feedbackBanner?: { ok: boolean; text: string; insight?: string } | null;
}

export const QuestionRunner: React.FC<QuestionRunnerProps> = ({
  question,
  seconds,
  rate: initialRate = 1,
  reveal = true,
  onResult,
  controllerRef,
  feedbackBanner
}) => {
  const [displaySecs, setDisplaySecs] = useState(seconds);
  const [rate, setRate] = useState(initialRate);
  const [hidden, setHidden] = useState<number[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const [status, setStatus] = useState<AskResult['status'] | null>(null);

  const doneRef = useRef(false);
  const leftRef = useRef(seconds);
  const totalRef = useRef(seconds);
  const rateRef = useRef(initialRate);
  const t0Ref = useRef(performance.now());
  const hiddenRef = useRef<number[]>([]);
  const lastDisplayedRef = useRef(seconds);
  const barRef = useRef<HTMLDivElement>(null);
  const onResultRef = useRef(onResult);
  onResultRef.current = onResult;

  // Reset ONLY when a genuinely new question is mounted/passed (never on Frenzy rate change!)
  useEffect(() => {
    doneRef.current = false;
    leftRef.current = seconds;
    totalRef.current = seconds;
    rateRef.current = initialRate;
    hiddenRef.current = [];
    lastDisplayedRef.current = seconds;
    t0Ref.current = performance.now();
    setDisplaySecs(seconds);
    setRate(initialRate);
    setHidden([]);
    setPicked(null);
    setStatus(null);
    if (barRef.current) barRef.current.style.width = '100%';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question]);

  // Smoothly sync rate updates (e.g. Istiqomah Frenzy toggling) without resetting question state
  useEffect(() => {
    rateRef.current = initialRate;
    setRate(initialRate);
  }, [initialRate]);

  const finish = (st: AskResult['status'], pk: number) => {
    if (doneRef.current) return;
    doneRef.current = true;
    const elapsed = Math.min((performance.now() - t0Ref.current) / 1000, totalRef.current);
    setPicked(pk);
    setStatus(st);
    onResultRef.current({ status: st, picked: pk, elapsed });
  };

  useEffect(() => {
    let last = performance.now();
    const iv = setInterval(() => {
      if (doneRef.current) return;
      const now = performance.now();
      const dt = (now - last) / 1000;
      last = now;
      leftRef.current = Math.max(0, leftRef.current - dt * rateRef.current);

      const pctWidth = Math.max(0, Math.min(100, (leftRef.current / Math.max(1, totalRef.current)) * 100));
      if (barRef.current) barRef.current.style.width = `${pctWidth}%`;

      const ceilSec = Math.ceil(leftRef.current);
      if (ceilSec !== lastDisplayedRef.current) {
        lastDisplayedRef.current = ceilSec;
        setDisplaySecs(ceilSec);
      }

      if (leftRef.current <= 0) {
        finish('timeout', -1);
      }
    }, 120);
    return () => clearInterval(iv);
  }, [question]);

  useEffect(() => {
    if (!controllerRef) return;
    controllerRef.current = {
      addTime(s: number) {
        if (doneRef.current) return;
        leftRef.current += s;
        totalRef.current = Math.max(totalRef.current, leftRef.current);
        const ceilSec = Math.ceil(leftRef.current);
        lastDisplayedRef.current = ceilSec;
        setDisplaySecs(ceilSec);
        if (barRef.current) {
          const pctWidth = Math.max(0, Math.min(100, (leftRef.current / Math.max(1, totalRef.current)) * 100));
          barRef.current.style.width = `${pctWidth}%`;
        }
      },
      eliminate() {
        if (doneRef.current) return;
        const candidates = [0, 1, 2, 3].filter((i) => i !== question.a && !hiddenRef.current.includes(i));
        for (let i = candidates.length - 1; i > 0; i--) {
          const j = (Math.random() * (i + 1)) | 0;
          [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
        }
        const elim = candidates.slice(0, 2);
        const next = [...hiddenRef.current, ...elim];
        hiddenRef.current = next;
        setHidden(next);
      },
      setRate(r: number) {
        rateRef.current = r;
        setRate(r);
      }
    };
    return () => {
      controllerRef.current = null;
    };
  }, [controllerRef, question]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (doneRef.current || e.repeat || e.ctrlKey || e.metaKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      if (document.querySelector('[aria-modal="true"]')) return;
      const k = e.key.toLowerCase();
      const map: Record<string, number> = { '1': 0, a: 0, '2': 1, b: 1, '3': 2, c: 2, '4': 3, d: 3 };
      if (k in map) {
        const idx = map[k];
        if (!hiddenRef.current.includes(idx)) {
          e.preventDefault();
          finish(idx === question.a ? 'correct' : 'wrong', idx);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [question]);

  const letters = ['A', 'B', 'C', 'D'];
  const isLow = displaySecs < 10;
  const isCritical = displaySecs <= 6;
  const isFrenzy = rate < 1;
  const topic = getQuestionTopic(question);
  const useTwoCols = question.o.every((opt) => opt.length <= 42);

  return (
    <div className="flex flex-col gap-4 anim-slide-up">
      {/* Timer & Tempo Bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-4 rounded-full bg-[#E5E5E5] dark:bg-[#37464F] overflow-hidden p-0.5">
          <div
            ref={barRef}
            className={`h-full rounded-full transition-[width,background-color] duration-150 ${
              isLow ? 'bg-[#FF4B4B]' : isFrenzy ? 'bg-[#FFC800]' : 'bg-[#58CC02]'
            }`}
            style={{
              width: '100%',
              boxShadow: 'inset 0 3px 0 rgba(255,255,255,0.32)'
            }}
          />
        </div>
        <div
          className={`inline-flex items-center gap-1.5 font-mono-num text-sm font-black px-3 py-1 rounded-xl border-2 transition-colors ${
            isLow
              ? `bg-[#FFDFE0] dark:bg-[#40201F] border-[#FF4B4B] text-[#EA2B2B] dark:text-[#FF8A8A] ${isCritical ? 'anim-urgent-pulse' : ''}`
              : isFrenzy
              ? 'bg-[#FFF3BF] dark:bg-[#3A2A00] border-[#FFC800] text-[#8A6500] dark:text-[#FFE066]'
              : 'bg-[#F7F7F7] dark:bg-[#1A2A31] border-[#E5E5E5] dark:border-[#37464F] text-[#3C3C3C] dark:text-[#DCE6EC]'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>{displaySecs} dtk</span>
        </div>
      </div>

      {/* Topic & Difficulty Metadata + Keyboard Hint */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-[#777777] dark:text-[#9DB0BA]">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-extrabold text-[#1899D6] dark:text-[#6AD1FF]">{topic}</span>
          <span aria-hidden="true">·</span>
          <span>Tingkat {TIER_L[question.t]}</span>
          {isFrenzy && (
            <>
              <span aria-hidden="true">·</span>
              <span className="font-extrabold text-[#B57B00] dark:text-[#FFE066]">Waktu Melambat 2×</span>
            </>
          )}
        </div>
        <span className="hidden sm:inline text-[11px] font-bold opacity-80">Pintasan: A–D / 1–4</span>
      </div>

      {/* Question Prompt */}
      <h3 className="text-lg sm:text-xl font-extrabold leading-snug text-[#3C3C3C] dark:text-[#F1F7F9]">
        {question.q}
      </h3>

      {/* Interactive Tactile Options Grid */}
      <div className={`grid gap-2.5 ${useTwoCols ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
        {question.o.map((opt, i) => {
          const isHidden = hidden.includes(i);
          const isFinished = status !== null;
          const isRight = isFinished && reveal && i === question.a;
          const isWrong = isFinished && reveal && i === picked && i !== question.a;
          const isPickedOnly = isFinished && !reveal && i === picked;

          let cardCls =
            'bg-white dark:bg-[#1F2F36] border-[#E5E5E5] dark:border-[#37464F] text-[#3C3C3C] dark:text-[#F1F7F9] hover:-translate-y-0.5 hover:bg-[#F7FBFF] dark:hover:bg-[#22353E] hover:border-[#1CB0F6]';
          let keyCls = 'bg-[#F7F7F7] dark:bg-[#1A2A31] border-[#E5E5E5] dark:border-[#37464F] text-[#777777] dark:text-[#9DB0BA]';

          if (isHidden) {
            cardCls = 'opacity-25 line-through bg-[#F7F7F7] dark:bg-[#1A2A31] border-[#E5E5E5] dark:border-[#37464F] cursor-not-allowed';
          } else if (isRight) {
            cardCls = 'anim-pop-correct bg-[#D7FFB8] dark:bg-[#24400F] border-[#58CC02] text-[#3F8F00] dark:text-[#89E219]';
            keyCls = 'border-[#58A700] bg-[#58CC02] text-white';
          } else if (isWrong) {
            cardCls = 'anim-wrong-shake bg-[#FFDFE0] dark:bg-[#40201F] border-[#FF4B4B] text-[#EA2B2B] dark:text-[#FF8A8A]';
            keyCls = 'border-[#EA2B2B] bg-[#FF4B4B] text-white';
          } else if (isPickedOnly) {
            cardCls = 'anim-pop-correct bg-[#DDF4FF] dark:bg-[#17384A] border-[#1CB0F6] text-[#1480B5] dark:text-[#6AD1FF]';
            keyCls = 'border-[#1899D6] bg-[#1CB0F6] text-white';
          } else if (isFinished) {
            cardCls = 'opacity-65 bg-[#F7F7F7] dark:bg-[#1A2A31] border-[#E5E5E5] dark:border-[#37464F] text-[#777777] dark:text-[#9DB0BA]';
          }

          return (
            <button
              key={i}
              type="button"
              disabled={isFinished || isHidden}
              onClick={() => finish(i === question.a ? 'correct' : 'wrong', i)}
              className={`duo-btn group flex items-center gap-3 text-left p-3.5 rounded-2xl border-2 border-b-4 font-bold text-[15px] sm:text-base leading-snug min-h-[58px] cursor-pointer disabled:cursor-default active:border-b-2 ${cardCls}`}
            >
              <span className={`w-8 h-8 rounded-xl border-2 border-b-3 grid place-items-center font-black font-mono-num text-sm shrink-0 transition-colors ${keyCls}`}>
                {letters[i]}
              </span>
              <span className="flex-1 text-left">{opt}</span>
              {isRight && <CheckCircle2 className="w-5 h-5 text-[#58CC02] shrink-0" />}
              {isWrong && <XCircle className="w-5 h-5 text-[#FF4B4B] shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Duolingo-style Slide-Up Feedback Tray */}
      {feedbackBanner && (
        <div
          role="status"
          aria-live="polite"
          className={`anim-slide-up flex items-start gap-3 p-4 rounded-2xl border-2 border-b-4 font-black text-sm sm:text-base ${
            feedbackBanner.ok
              ? 'bg-[#D7FFB8] dark:bg-[#24400F] border-[#58CC02] text-[#3F8F00] dark:text-[#89E219]'
              : 'bg-[#FFDFE0] dark:bg-[#40201F] border-[#FF4B4B] text-[#EA2B2B] dark:text-[#FF8A8A]'
          }`}
        >
          {feedbackBanner.ok ? <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5" /> : <XCircle className="w-6 h-6 shrink-0 mt-0.5" />}
          <div className="flex flex-col gap-1 min-w-0">
            <span>{feedbackBanner.text}</span>
            {feedbackBanner.insight && (
              <span className="text-xs sm:text-sm font-bold opacity-90 leading-relaxed">{feedbackBanner.insight}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
