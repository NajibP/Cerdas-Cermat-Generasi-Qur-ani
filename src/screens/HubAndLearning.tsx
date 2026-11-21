import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Lock,
  KeyRound,
  Search,
  Swords,
  Star,
  Flame,
  Shield,
  Lightbulb,
  Clock,
  Trophy,
  Award,
  LogOut,
  RotateCcw,
  ChevronRight,
  GraduationCap,
  Eye,
  EyeOff,
  Zap
} from 'lucide-react';
import { BankCode, PES_B, Question, TEACHER_PW, TIER_L, Tier, UMUM_B, UMUM_SPEC } from '../data/bank';
import { Music } from '../utils/audio';
import {
  boardAdd,
  boardGet,
  CertData,
  cleanName,
  fmtT,
  getFullBank,
  getQuestionInsight,
  isBundleUsed,
  isOpen,
  pct,
  pick,
  prep,
  resetUsedBundles,
  unlockKey
} from '../utils/helpers';
import { AskController, AskResult, ConfettiOverlay, ConfirmModal, DuoButton, QuestionRunner } from '../components/DuoUi';
import { AVATARS, AvatarSvg, BattleStage, BattleStageHandle, CrowdCheer, MascotSvg, SYV } from '../components/Svgs';

export type ScreenName =
  | 'gate'
  | 'prolog'
  | 'prolog-r'
  | 'opening'
  | 'hub'
  | 'practice'
  | 'cat-pengajar'
  | 'keys'
  | 'cat-peserta'
  | 'cat-umum'
  | 'pes-list'
  | 'umum-list'
  | 'pes-game'
  | 'umum-game'
  | 'pes-res'
  | 'umum-res'
  | 'boss'
  | 'regu'
  | 'turnamen'
  | 'board'
  | 'cert'
  | 'admin'
  | 'epilog';

export interface SessionState {
  kind: 'peserta' | 'umum';
  name: string;
  av: string;
  done: number[];
  cur?: number;
  score: number;
  correct: number;
  total: number;
  time: number;
  streak: number;
  frenzy: number;
  nilai?: number;
  rec?: { kept: boolean; rank: number };
}

export const HubScreen: React.FC<{
  onGo: (s: ScreenName) => void;
  onToast: (m: string) => void;
}> = ({ onGo, onToast }) => {
  useEffect(() => {
    Music.auto(2);
  }, []);

  const bossOpen = isOpen('boss');
  const epilogOpen = isOpen('epilog');
  const pesertaCount = boardGet().peserta.length;
  const totalSoal = useMemo(() => getFullBank().length, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Duolingo-style Unit Hero Banner */}
      <div className="rounded-3xl bg-[#58CC02] border-b-4 border-[#58A700] text-white p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_6px_0_rgba(88,167,0,0.22)]">
        <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
          <div className="bg-white/20 rounded-2xl p-2 shrink-0">
            <MascotSvg size={68} />
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-white/85">Jalur Petualangan Ilmu</div>
            <h1 className="text-2xl sm:text-3xl font-black leading-tight">Pilih Petualanganmu</h1>
            <p className="text-sm font-bold text-white/90 mt-1">
              Selesaikan misi belajar, kumpulkan skor tertinggi, dan taklukkan pasukan kegelapan!
            </p>
            <div className="mt-2.5 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs font-extrabold text-white/90 font-mono-num">
              <span>{totalSoal} Soal</span>
              <span aria-hidden="true">·</span>
              <span>{pesertaCount}/3 Pahlawan Papan Skor</span>
              <span aria-hidden="true">·</span>
              <span>{bossOpen ? 'Final Boss Siap' : 'Final Boss Terkunci'}</span>
            </div>
          </div>
        </div>
        <DuoButton variant="gold" size="md" onClick={() => onGo('cat-peserta')} className="shrink-0">
          <Swords className="w-4 h-4" />
          Main Sekarang
        </DuoButton>
      </div>

      {/* Section 1: Main Learning Modes (Pengajar -> Peserta -> Boss -> Umum) */}
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-black text-[#3C3C3C] dark:text-[#F1F7F9]">Kategori Pengerjaan</h2>

        {/* Pengajar */}
        <button
          type="button"
          onClick={() => onGo('cat-pengajar')}
          className="duo-btn group w-full text-left rounded-2xl border-2 border-b-4 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] hover:-translate-y-0.5 hover:border-[#FFC800] p-4 flex items-center gap-4 cursor-pointer active:border-b-2"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#FFF3BF] dark:bg-[#3A2A00] text-[#E5B400] grid place-items-center text-2xl shrink-0">
            🔐
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-black">Pengajar</h3>
              <span className="text-xs font-extrabold text-[#777777] dark:text-[#9DB0BA]">· Kata Sandi</span>
            </div>
            <p className="text-sm font-bold text-[#777777] dark:text-[#9DB0BA] mt-0.5">
              Bundle rahasia Kunci Jawaban untuk Ustadz dan pembina TPA.
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-[#777777] shrink-0 transition-transform group-hover:translate-x-1" />
        </button>

        {/* Peserta */}
        <button
          type="button"
          onClick={() => onGo('cat-peserta')}
          className="duo-btn group w-full text-left rounded-2xl border-2 border-b-4 border-[#58CC02] bg-[#F4FFE8] dark:bg-[#1B2F16] hover:-translate-y-0.5 p-4 flex items-center gap-4 cursor-pointer active:border-b-2"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#58CC02] text-white grid place-items-center text-2xl shrink-0 shadow-xs">
            👻
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-black text-[#46A302] dark:text-[#89E219]">Peserta</h3>
              <span className="text-xs font-black text-[#EA2B2B] dark:text-[#FF8A8A]">· vs Hantu · 5 Bundle Mudah</span>
            </div>
            <p className="text-sm font-bold text-[#4B4B4B] dark:text-[#DCE6EC] mt-0.5">
              Pilih jagoanmu, hadapi Hantu di arena pertarungan, dan raih 3 besar menuju Final Boss!
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-[#58A700] shrink-0 transition-transform group-hover:translate-x-1" />
        </button>

        {/* Final Boss: Iblis */}
        {bossOpen ? (
          <button
            type="button"
            onClick={() => onGo('boss')}
            className="duo-btn group w-full text-left rounded-2xl border-2 border-b-4 border-[#FF4B4B] bg-[#FFF2F2] dark:bg-[#351B1F] hover:-translate-y-0.5 p-4 flex items-center gap-4 cursor-pointer active:border-b-2"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#FF4B4B] text-white grid place-items-center text-2xl shrink-0">
              😈
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-black text-[#EA2B2B] dark:text-[#FF8A8A]">Final Boss: Iblis</h3>
                <span className="text-xs font-black text-[#777777] dark:text-[#9DB0BA]">· Kooperatif 3 Pahlawan</span>
              </div>
              <p className="text-sm font-bold text-[#4B4B4B] dark:text-[#DCE6EC] mt-0.5">
                Pertarungan puncak untuk peringkat 1, 2, dan 3 dari kategori Peserta!
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-[#EA2B2B] shrink-0 transition-transform group-hover:translate-x-1" />
          </button>
        ) : (
          <div
            aria-disabled="true"
            className="w-full text-left rounded-2xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-[#F7F7F7] dark:bg-[#1A2A31] p-4 flex items-center gap-4 opacity-60"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#E5E5E5] dark:bg-[#24363E] text-[#777777] grid place-items-center shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-black">Final Boss: Iblis</h3>
              <p className="text-sm font-bold text-[#777777] dark:text-[#9DB0BA] mt-0.5">
                Terkunci ({pesertaCount}/3 peserta di papan skor) atau dapat dibuka lewat Admin.
              </p>
            </div>
          </div>
        )}

        {/* Umum */}
        <button
          type="button"
          onClick={() => onGo('cat-umum')}
          className="duo-btn group w-full text-left rounded-2xl border-2 border-b-4 border-[#1CB0F6] bg-[#EFFAFF] dark:bg-[#152D38] hover:-translate-y-0.5 p-4 flex items-center gap-4 cursor-pointer active:border-b-2"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#1CB0F6] text-white grid place-items-center text-2xl shrink-0">
            🌟
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-black text-[#1899D6] dark:text-[#6AD1FF]">Umum</h3>
              <span className="text-xs font-black text-[#777777] dark:text-[#9DB0BA]">· 8 Bundle · Maks. 2000 Poin</span>
            </div>
            <p className="text-sm font-bold text-[#4B4B4B] dark:text-[#DCE6EC] mt-0.5">
              Tingkat Mudah sampai Sulit. Kerjakan 2 bundle pilihanmu untuk meraih poin tertinggi!
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-[#1899D6] shrink-0 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Section 2: Arena Tambahan */}
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-black text-[#3C3C3C] dark:text-[#F1F7F9]">Arena Tambahan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onGo('practice')}
            className="duo-btn group sm:col-span-2 text-left rounded-2xl border-2 border-b-4 border-[#CE82FF] bg-[#FAF2FF] dark:bg-[#251A36] hover:-translate-y-0.5 p-4 flex items-center gap-3.5 cursor-pointer active:border-b-2"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#CE82FF] text-white grid place-items-center shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-black text-base text-[#8C3CD6] dark:text-[#DFB4FF]">Mode Latihan Mandiri</h3>
                <span className="text-xs font-extrabold text-[#777777] dark:text-[#9DB0BA]">· Tanpa Pengurangan Skor</span>
              </div>
              <p className="text-xs font-bold text-[#4B4B4B] dark:text-[#DCE6EC] mt-0.5">
                Pilih tingkat soal Mudah–Sulit, berlatih santai lengkap dengan Hikmah &amp; Pembahasan jawaban.
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-[#A55EEA] shrink-0 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            type="button"
            onClick={() => onGo('regu')}
            className="duo-btn text-left rounded-2xl border-2 border-b-4 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] hover:bg-[#F7F7F7] dark:hover:bg-[#24363E] p-4 flex items-center gap-3.5 cursor-pointer active:border-b-2"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#E9E1FF] dark:bg-[#2B204A] text-[#A55EEA] grid place-items-center text-2xl shrink-0">
              🛡️
            </div>
            <div className="min-w-0">
              <h3 className="font-black text-base">Regu Duel</h3>
              <p className="text-xs font-bold text-[#777777] dark:text-[#9DB0BA]">2v2, 3v3, atau 5v5 · 3 Babak</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onGo('turnamen')}
            className="duo-btn text-left rounded-2xl border-2 border-b-4 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] hover:bg-[#F7F7F7] dark:hover:bg-[#24363E] p-4 flex items-center gap-3.5 cursor-pointer active:border-b-2"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#FFE9C7] dark:bg-[#3A2810] text-[#FF9600] grid place-items-center text-2xl shrink-0">
              🏟️
            </div>
            <div className="min-w-0">
              <h3 className="font-black text-base">Turnamen 1vs1</h3>
              <p className="text-xs font-bold text-[#777777] dark:text-[#9DB0BA]">Knockout lintas TKA, TPA, Tadarrus</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onGo('board')}
            className="duo-btn text-left rounded-2xl border-2 border-b-4 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] hover:bg-[#F7F7F7] dark:hover:bg-[#24363E] p-4 flex items-center gap-3.5 cursor-pointer active:border-b-2"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#FFF3BF] dark:bg-[#3A2A00] text-[#E5B400] grid place-items-center text-2xl shrink-0">
              🏆
            </div>
            <div className="min-w-0">
              <h3 className="font-black text-base">Papan Skor</h3>
              <p className="text-xs font-bold text-[#777777] dark:text-[#9DB0BA]">10 peringkat terbaik &amp; tercepat</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              if (!epilogOpen) {
                onToast('Epilog masih terkunci. Selesaikan 1 permainan atau buka di Admin.');
                return;
              }
              onGo('epilog');
            }}
            className={`duo-btn text-left rounded-2xl border-2 p-4 flex items-center gap-3.5 ${
              epilogOpen
                ? 'border-b-4 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] hover:bg-[#F7F7F7] dark:hover:bg-[#24363E] cursor-pointer active:border-b-2'
                : 'border-[#E5E5E5] dark:border-[#37464F] bg-[#F7F7F7] dark:bg-[#1A2A31] opacity-60 cursor-not-allowed'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-[#FFE0F0] dark:bg-[#3A1E2D] text-[#FF4B4B] grid place-items-center text-2xl shrink-0">
              {epilogOpen ? '💌' : '🔒'}
            </div>
            <div className="min-w-0">
              <h3 className="font-black text-base">Epilog</h3>
              <p className="text-xs font-bold text-[#777777] dark:text-[#9DB0BA]">
                {epilogOpen ? 'Terima kasih & Live Chat Saran' : 'Selesaikan 1 permainan untuk membuka'}
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export const PengajarScreen: React.FC<{ onUnlock: () => void }> = ({ onUnlock }) => {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');

  return (
    <div className="max-w-lg mx-auto flex flex-col gap-5">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black">Mode Pengajar</h1>
        <p className="text-sm font-bold text-[#777777] dark:text-[#9DB0BA]">Akses khusus Ustadz &amp; pembina TPA</p>
      </div>

      <div className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-6 shadow-[0_4px_0_#E5E5E5] dark:shadow-[0_4px_0_#24363E]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-[#FFF3BF] dark:bg-[#3A2A00] text-[#E5B400] grid place-items-center">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black">Kunci Jawaban</h2>
            <p className="text-xs font-bold text-[#777777] dark:text-[#9DB0BA]">Masukkan kata sandi pengajar</p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (pw === TEACHER_PW) onUnlock();
            else setErr('Kata sandi belum tepat.');
          }}
          className="flex flex-col gap-4"
        >
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Kata sandi pengajar"
            autoComplete="off"
            className="w-full rounded-2xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-[#F7F7F7] dark:bg-[#1A2A31] px-4 py-3 text-base font-bold focus:border-[#1CB0F6] focus:outline-none"
          />
          {err && <div className="text-sm font-extrabold text-[#EA2B2B] dark:text-[#FF8A8A]">{err}</div>}
          <DuoButton type="submit" variant="green" size="lg" full>
            Buka Kunci Jawaban
          </DuoButton>
        </form>
      </div>
    </div>
  );
};

export const KeysScreen: React.FC = () => {
  const [bank, setBank] = useState<BankCode>('A');
  const [tierFilter, setTierFilter] = useState<Tier | 'semua'>('semua');
  const [term, setTerm] = useState('');
  const [quizMode, setQuizMode] = useState(false);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const names: Record<BankCode, string> = {
    A: 'Peserta · Mudah',
    B: 'Peserta · Sedang-Sulit',
    C: 'Umum · Campuran'
  };

  const fullBank = useMemo(() => getFullBank(), []);
  const list = useMemo(() => {
    const qLower = term.trim().toLowerCase();
    return fullBank.filter(
      (q) =>
        q.b === bank &&
        (tierFilter === 'semua' || q.t === tierFilter) &&
        (!qLower || q.q.toLowerCase().includes(qLower))
    );
  }, [fullBank, bank, tierFilter, term]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black">Kunci Jawaban</h1>
          <p className="text-sm font-bold text-[#777777] dark:text-[#9DB0BA]">
            {fullBank.length} soal lengkap dari Bank A, B, dan C{fullBank.length > 150 ? ' (termasuk soal kustom)' : ''}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setQuizMode((v) => !v);
            setRevealed({});
          }}
          className={`duo-btn inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border-2 border-b-4 text-xs font-black cursor-pointer ${
            quizMode
              ? 'border-[#CE82FF] bg-[#FAF2FF] dark:bg-[#2E1F47] text-[#8C3CD6] dark:text-[#DFB4FF]'
              : 'border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] text-[#3C3C3C] dark:text-[#DCE6EC]'
          }`}
        >
          {quizMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {quizMode ? 'Mode Flashcard Aktif' : 'Mode Flashcard (Sembunyikan Kunci)'}
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-[#F7F7F7] dark:bg-[#1A2A31] border-2 border-[#E5E5E5] dark:border-[#37464F]">
        {(Object.keys(names) as BankCode[]).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setBank(k)}
            className={`flex-1 min-w-[140px] px-3 py-2 rounded-xl text-xs sm:text-sm font-black transition-colors cursor-pointer whitespace-nowrap ${
              bank === k
                ? 'bg-white dark:bg-[#24363E] text-[#1CB0F6] shadow-xs'
                : 'text-[#777777] dark:text-[#9DB0BA] hover:text-[#3C3C3C] dark:hover:text-white'
            }`}
          >
            {names[k]}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-5 h-5 text-[#777777] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Cari kata kunci soal..."
            className="w-full rounded-2xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] pl-11 pr-4 py-2.5 text-sm sm:text-base font-bold focus:border-[#1CB0F6] focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#F7F7F7] dark:bg-[#1A2A31] border-2 border-[#E5E5E5] dark:border-[#37464F]">
          {(['semua', 'mudah', 'sedang', 'sulit'] as const).map((tf) => (
            <button
              key={tf}
              type="button"
              onClick={() => setTierFilter(tf)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-black capitalize cursor-pointer transition-colors ${
                tierFilter === tf
                  ? 'bg-white dark:bg-[#24363E] text-[#58CC02] shadow-xs'
                  : 'text-[#777777] dark:text-[#9DB0BA]'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {list.length === 0 ? (
          <div className="rounded-2xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-8 text-center font-bold text-[#777777]">
            Tidak ada soal yang cocok.
          </div>
        ) : (
          list.map((q) => {
            const showAnswer = !quizMode || !!revealed[q.id];
            return (
              <div key={q.id} className="rounded-2xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-4 sm:p-5">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="text-xs font-extrabold text-[#777777] dark:text-[#9DB0BA]">
                    No. {q.n} · {TIER_L[q.t]}
                    {q.custom ? ' · Kustom' : ''}
                  </div>
                  {quizMode && (
                    <button
                      type="button"
                      onClick={() => setRevealed((r) => ({ ...r, [q.id]: !r[q.id] }))}
                      className="text-xs font-black text-[#1CB0F6] hover:underline cursor-pointer"
                    >
                      {showAnswer ? 'Sembunyikan Kunci' : 'Buka Kunci'}
                    </button>
                  )}
                </div>
                <p className="font-extrabold text-base mb-3">{q.q}</p>
                <div className="grid sm:grid-cols-2 gap-1.5 text-sm font-bold text-[#777777] dark:text-[#9DB0BA]">
                  {q.o.map((opt, idx) => (
                    <div
                      key={idx}
                      className={
                        showAnswer && idx === q.a
                          ? 'text-[#3F8F00] dark:text-[#89E219] font-black bg-[#D7FFB8]/70 dark:bg-[#24400F] px-2.5 py-1.5 rounded-xl'
                          : 'px-2.5 py-1.5'
                      }
                    >
                      {'ABCD'[idx]}. {opt}
                    </div>
                  ))}
                </div>
                {showAnswer && q.e && (
                  <div className="mt-2.5 text-xs font-bold text-[#1480B5] dark:text-[#6AD1FF]">
                    Hikmah: {q.e}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export const SetupPlayerScreen: React.FC<{
  kind: 'peserta' | 'umum';
  onContinue: (name: string, av: string) => void;
}> = ({ kind, onContinue }) => {
  const [name, setName] = useState('');
  const [av, setAv] = useState(AVATARS[0]);
  const [err, setErr] = useState('');

  const handleGo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = cleanName(name);
    if (!cleaned) {
      setErr('Isi namamu dulu ya.');
      return;
    }
    onContinue(cleaned, av);
  };

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-5">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black">{kind === 'peserta' ? 'Mode Peserta' : 'Mode Umum'}</h1>
        <p className="text-sm font-bold text-[#777777] dark:text-[#9DB0BA]">
          Pilih karakter pahlawanmu dan tulis namamu sebelum memilih bundle.
        </p>
      </div>

      <form
        onSubmit={handleGo}
        className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-6 flex flex-col gap-5 shadow-[0_4px_0_#E5E5E5] dark:shadow-[0_4px_0_#24363E]"
      >
        <div>
          <label className="block text-sm font-black mb-2.5">Pilih Avatar</label>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
            {AVATARS.map((a, i) => {
              const selected = av === a;
              return (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAv(a)}
                  aria-pressed={selected}
                  aria-label={`Avatar ${i + 1}`}
                  className={`duo-btn rounded-2xl p-1.5 border-2 border-b-4 grid place-items-center cursor-pointer ${
                    selected
                      ? 'border-[#1CB0F6] bg-[#DDF4FF] dark:bg-[#17384A]'
                      : 'border-[#E5E5E5] dark:border-[#37464F] bg-[#F7F7F7] dark:bg-[#1A2A31] hover:border-[#1CB0F6]'
                  }`}
                >
                  <AvatarSvg code={a} size={50} />
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label htmlFor="player-nm" className="block text-sm font-black mb-1.5">
            Nama (maksimal 10 huruf)
          </label>
          <input
            id="player-nm"
            type="text"
            maxLength={10}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="contoh: Farhan"
            autoComplete="off"
            className="w-full rounded-2xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-[#F7F7F7] dark:bg-[#1A2A31] px-4 py-3 text-base font-bold focus:border-[#1CB0F6] focus:outline-none"
          />
        </div>

        {err && <div className="text-sm font-extrabold text-[#EA2B2B] dark:text-[#FF8A8A]">{err}</div>}

        <DuoButton type="submit" variant="green" size="lg" full>
          Lanjut Pilih Bundle
          <ChevronRight className="w-5 h-5" />
        </DuoButton>
      </form>
    </div>
  );
};

export const PesertaListScreen: React.FC<{
  sess: SessionState;
  onPickBundle: (idx: number) => void;
  onToast: (m: string) => void;
}> = ({ sess, onPickBundle, onToast }) => {
  const [, setTick] = useState(0);
  const allLocked = PES_B.every((_, i) => isBundleUsed('peserta', i));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <AvatarSvg code={sess.av} size={44} />
        <div>
          <h1 className="text-2xl sm:text-3xl font-black">Pilih Bundle · {sess.name}</h1>
          <p className="text-sm font-bold text-[#777777] dark:text-[#9DB0BA]">
            Kerjakan 1 bundle untuk melawan Hantu. Bundle yang sudah dipilih terkunci otomatis.
          </p>
        </div>
      </div>

      {/* Duolingo Winding Stepping-Stone Path */}
      <div className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-[#F7F7F7] dark:bg-[#1A2A31] p-6 sm:p-8 flex flex-col items-center gap-5">
        {PES_B.map(([emoji, title], idx) => {
          const used = isBundleUsed('peserta', idx);
          const offsets = ['translate-x-0', 'sm:translate-x-10', 'sm:translate-x-16', 'sm:translate-x-10', 'translate-x-0'];
          return (
            <div key={idx} className={`w-full max-w-md transition-transform ${offsets[idx]}`}>
              <button
                type="button"
                disabled={used}
                onClick={() => onPickBundle(idx)}
                className={`duo-btn w-full rounded-2xl border-2 border-b-4 p-4 flex items-center gap-4 text-left ${
                  used
                    ? 'bg-[#E5E5E5]/60 dark:bg-[#24363E]/60 border-[#D0D0D0] dark:border-[#37464F] opacity-60 cursor-not-allowed'
                    : 'bg-white dark:bg-[#1F2F36] border-[#58CC02] hover:bg-[#F4FFE8] dark:hover:bg-[#1F3520] cursor-pointer active:border-b-2'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-full grid place-items-center text-2xl shrink-0 border-b-4 ${
                    used
                      ? 'bg-[#D0D0D0] dark:bg-[#37464F] border-[#B0B0B0] dark:border-[#24363E]'
                      : 'bg-[#58CC02] border-[#58A700] text-white'
                  }`}
                >
                  {used ? '🔒' : emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-black uppercase tracking-wider text-[#58A700] dark:text-[#89E219]">
                    Lawan {SYV[idx].n}
                  </div>
                  <h3 className="text-lg font-black">{title}</h3>
                  <div className="text-xs font-bold text-[#777777] dark:text-[#9DB0BA]">
                    {used ? 'Sudah dipilih · Terkunci' : 'Mudah · 10 Soal'}
                  </div>
                </div>
                {!used && <ChevronRight className="w-5 h-5 text-[#58CC02] shrink-0" />}
              </button>
            </div>
          );
        })}
      </div>

      {allLocked && (
        <div className="rounded-2xl border-2 border-[#E5E5E5] dark:border-[#37464F] p-5 text-center flex flex-col items-center gap-3">
          <p className="text-sm font-bold text-[#777777] dark:text-[#9DB0BA]">Semua bundle Peserta sudah terkunci.</p>
          <DuoButton
            variant="ghost"
            size="sm"
            onClick={() => {
              resetUsedBundles();
              setTick((t) => t + 1);
              onToast('Semua bundle dibuka kembali');
            }}
          >
            <RotateCcw className="w-4 h-4" />
            Buka Ulang Semua Bundle
          </DuoButton>
        </div>
      )}
    </div>
  );
};

export const UmumListScreen: React.FC<{
  sess: SessionState;
  onPickBundle: (idx: number) => void;
  onToast: (m: string) => void;
}> = ({ sess, onPickBundle, onToast }) => {
  const [, setTick] = useState(0);
  const allLocked = UMUM_B.every((_, i) => sess.done.includes(i) || isBundleUsed('umum', i));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <AvatarSvg code={sess.av} size={44} />
          <div>
            <h1 className="text-2xl sm:text-3xl font-black">Pilih Bundle · {sess.name}</h1>
            <p className="text-sm font-bold text-[#777777] dark:text-[#9DB0BA]">
              Kerjakan <strong>2 bundle</strong> untuk menyelesaikan tantangan (selesai: {sess.done.length}/2).
            </p>
          </div>
        </div>
        <div className="px-4 py-2 rounded-2xl bg-[#DDF4FF] dark:bg-[#17384A] text-[#1480B5] dark:text-[#6AD1FF] font-black text-sm font-mono-num">
          Progres {sess.done.length}/2
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {UMUM_B.map(([emoji, title, tier], idx) => {
          const used = sess.done.includes(idx) || isBundleUsed('umum', idx);
          const tierColors =
            tier === 'mudah'
              ? 'text-[#46A302] dark:text-[#89E219]'
              : tier === 'sedang'
              ? 'text-[#B57B00] dark:text-[#FFE066]'
              : 'text-[#EA2B2B] dark:text-[#FF8A8A]';

          return (
            <button
              key={idx}
              type="button"
              disabled={used}
              onClick={() => onPickBundle(idx)}
              className={`duo-btn rounded-2xl border-2 border-b-4 p-4 flex items-center gap-4 text-left ${
                used
                  ? 'bg-[#F7F7F7] dark:bg-[#1A2A31] border-[#E5E5E5] dark:border-[#37464F] opacity-55 cursor-not-allowed'
                  : 'bg-white dark:bg-[#1F2F36] border-[#E5E5E5] dark:border-[#37464F] hover:border-[#1CB0F6] cursor-pointer active:border-b-2'
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-[#F7F7F7] dark:bg-[#24363E] grid place-items-center text-2xl shrink-0">
                {used ? '🔒' : emoji}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-black truncate">{title}</h3>
                <div className={`text-xs font-black mt-0.5 ${used ? 'text-[#777777]' : tierColors}`}>
                  {used ? 'Terkunci · Sudah dipilih' : `${TIER_L[tier]} · 10 Soal`}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {allLocked && (
        <div className="rounded-2xl border-2 border-[#E5E5E5] dark:border-[#37464F] p-5 text-center flex flex-col items-center gap-3">
          <p className="text-sm font-bold text-[#777777] dark:text-[#9DB0BA]">Semua bundle Umum sudah terkunci.</p>
          <DuoButton
            variant="ghost"
            size="sm"
            onClick={() => {
              resetUsedBundles();
              setTick((t) => t + 1);
              onToast('Semua bundle dibuka kembali');
            }}
          >
            <RotateCcw className="w-4 h-4" />
            Buka Ulang Semua Bundle
          </DuoButton>
        </div>
      )}
    </div>
  );
};

export const BundleGameScreen: React.FC<{
  sess: SessionState;
  usedIds: Set<string>;
  onUpdateSess: (next: SessionState) => void;
  onFinishBundle: (finalSess: SessionState) => void;
  onFirstAnswer?: () => void;
  onExit: () => void;
  onToast: (m: string) => void;
}> = ({ sess, usedIds, onUpdateSess, onFinishBundle, onFirstAnswer, onExit, onToast }) => {
  const isPeserta = sess.kind === 'peserta';
  const curIdx = sess.cur ?? 0;
  const spec = isPeserta ? { mudah: 10 } : UMUM_SPEC[UMUM_B[curIdx][2]];
  const label = isPeserta ? PES_B[curIdx][1] : UMUM_B[curIdx][1];

  // Defer marking IDs as used until player actually selects each tile
  const [questions] = useState<Question[]>(() => pick(spec, usedIds, new Set(), false).map(prep));
  const [tileStates, setTileStates] = useState<(null | 'correct' | 'wrong' | 'timeout' | 'bonus' | 'ko')[]>(() =>
    Array(10).fill(null)
  );
  const [activeTile, setActiveTile] = useState<number | null>(null);
  const [cardsUsed, setCardsUsed] = useState<Record<'tameng' | 'cahaya' | 'sabar', boolean>>({
    tameng: false,
    cahaya: false,
    sabar: false
  });
  const [shield, setShield] = useState(false);
  const [hits, setHits] = useState(0);
  const [miss, setMiss] = useState(0);
  const [ults, setUlts] = useState(0);
  const [koDone, setKoDone] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string; insight?: string } | null>(null);

  const wrRef = useRef(0);
  const answeredRef = useRef(0);
  const firstAnswerFiredRef = useRef(false);
  const hitsRef = useRef(0);
  const missRef = useRef(0);
  const ultsRef = useRef(0);
  const tileStatesRef = useRef(tileStates);
  tileStatesRef.current = tileStates;

  const sessRef = useRef(sess);
  sessRef.current = sess;
  const stageRef = useRef<BattleStageHandle>(null);
  const askCtrlRef = useRef<AskController | null>(null);
  const mountedRef = useRef(true);
  const timersRef = useRef<Set<number>>(new Set());

  const later = (fn: () => void, ms: number) => {
    const tid = window.setTimeout(() => {
      timersRef.current.delete(tid);
      if (!mountedRef.current) return;
      fn();
    }, ms);
    timersRef.current.add(tid);
  };

  const waitSafe = (ms: number) =>
    new Promise<boolean>((resolve) => {
      const tid = window.setTimeout(() => {
        timersRef.current.delete(tid);
        resolve(mountedRef.current);
      }, ms);
      timersRef.current.add(tid);
    });

  useEffect(() => {
    mountedRef.current = true;
    Music.auto(isPeserta ? 3 : 2);
    return () => {
      mountedRef.current = false;
      timersRef.current.forEach((tid) => window.clearTimeout(tid));
      timersRef.current.clear();
    };
  }, [isPeserta]);

  const hpK = Math.max(0, 100 - hits * 10);
  const hpH = Math.max(0, 100 - miss * 10 - ults * 25);
  const completedCount = tileStates.filter((s) => s !== null).length;

  const handleSelectTile = (idx: number) => {
    if (koDone || activeTile !== null || tileStates[idx] !== null) return;
    if (questions[idx]) {
      usedIds.add(questions[idx].id);
    }
    setShield(false);
    setFeedback(null);
    setActiveTile(idx);
  };

  const handleUseCard = (k: 'tameng' | 'cahaya' | 'sabar') => {
    if (activeTile === null || cardsUsed[k] || koDone) return;
    setCardsUsed((prev) => ({ ...prev, [k]: true }));
    Music.sfx('card');
    if (k === 'tameng') {
      setShield(true);
      onToast('Tameng Dosa siap menahan serangan!');
    } else if (k === 'cahaya') {
      askCtrlRef.current?.eliminate();
    } else if (k === 'sabar') {
      askCtrlRef.current?.addTime(15);
    }
  };

  const handleQuestionResult = async (res: AskResult) => {
    if (activeTile === null || !mountedRef.current) return;
    const activeQ = questions[activeTile];
    const insight = activeQ ? getQuestionInsight(activeQ) : undefined;
    const curS = { ...sessRef.current };
    const wasFrenzy = curS.frenzy > 0;
    if (wasFrenzy) curS.frenzy--;

    let pts = 0;
    let nextHits = hitsRef.current;
    let nextMiss = missRef.current;
    let nextUlts = ultsRef.current;
    let fb: { ok: boolean; text: string; insight?: string };

    if (res.status === 'correct') {
      pts = 100;
      curS.correct++;
      nextHits++;
      wrRef.current = 0;
      curS.streak++;
      Music.sfx('ok');
      fb = { ok: true, text: 'Benar! +100 poin', insight };
      if (isPeserta) {
        if (nextHits === 10) stageRef.current?.ultHero();
        else stageRef.current?.fxHero();
        stageRef.current?.floatText('−1 Hantu!');
      }
      if (curS.streak % 3 === 0) {
        curS.frenzy = 3;
        onToast('Istiqomah Frenzy! 3 soal berikutnya waktu berjalan pelan.');
        Music.sfx('card');
      }
      if (curS.streak % 5 === 0) {
        setCardsUsed({ tameng: false, cahaya: false, sabar: false });
        onToast('Kartu Hikmah terisi lagi!');
      }
    } else {
      curS.streak = 0;
      const shieldedWrong = res.status === 'wrong' && shield;
      if (res.status === 'wrong') {
        pts = shieldedWrong ? 0 : -50;
        fb = {
          ok: false,
          text: shieldedWrong ? 'Salah, tapi Tameng Dosa menahan serangan! 0 poin' : 'Belum tepat. −50 poin',
          insight
        };
      } else {
        pts = -100;
        fb = { ok: false, text: 'Waktu habis. −100 poin', insight };
      }

      if (!shieldedWrong) {
        nextMiss++;
        wrRef.current++;
      } else {
        wrRef.current = 0;
      }

      Music.sfx('no');
      if (isPeserta) {
        if (wrRef.current >= 5) {
          wrRef.current = 0;
          nextUlts++;
          stageRef.current?.ultEnemy(curIdx);
          stageRef.current?.floatText('Ultimate!');
        } else if (!shieldedWrong) {
          stageRef.current?.fxKaiju(curIdx);
          stageRef.current?.floatText('Aduh!');
        }
      }
    }

    curS.score += pts;
    curS.time += res.elapsed;
    curS.total++;
    answeredRef.current++;

    if (!firstAnswerFiredRef.current) {
      firstAnswerFiredRef.current = true;
      onFirstAnswer?.();
    }

    hitsRef.current = nextHits;
    missRef.current = nextMiss;
    ultsRef.current = nextUlts;

    const nextTiles = tileStatesRef.current.slice();
    nextTiles[activeTile] = res.status;

    setHits(nextHits);
    setMiss(nextMiss);
    setUlts(nextUlts);
    setFeedback(fb);
    setTileStates(nextTiles);
    onUpdateSess(curS);

    const newHpK = Math.max(0, 100 - nextHits * 10);
    const newHpH = Math.max(0, 100 - nextMiss * 10 - nextUlts * 25);

    if (isPeserta && newHpK <= 0) {
      setKoDone(true);
      const remCount = nextTiles.filter((v) => v === null).length;
      const bonus = remCount * 100;
      curS.score += bonus;
      const koTiles = nextTiles.map((v) => (v === null ? 'bonus' : v));
      setTileStates(koTiles);
      onUpdateSess({ ...curS });
      later(() => stageRef.current?.fxKO(), nextHits === 10 && res.status === 'correct' ? 1100 : 250);
      later(() => stageRef.current?.fxWin(), nextHits === 10 && res.status === 'correct' ? 1300 : 450);
      setFeedback({ ok: true, text: `${SYV[curIdx].n} KO! Bonus ${remCount} sisa soal: +${bonus} poin!`, insight });
      if (!(await waitSafe(1800))) return;
      onFinishBundle(curS);
      return;
    }

    if (isPeserta && newHpH <= 0) {
      setKoDone(true);
      stageRef.current?.fxHeroKO();
      const remCount = nextTiles.filter((v) => v === null).length;
      const pen = -(remCount * 100);
      curS.score += pen;
      const koTiles = nextTiles.map((v) => (v === null ? 'ko' : v));
      setTileStates(koTiles);
      onUpdateSess({ ...curS });
      setFeedback({ ok: false, text: `Kamu KO! ${remCount} sisa soal dikunci (${pen} poin).`, insight });
      if (!(await waitSafe(1800))) return;
      onFinishBundle(curS);
      return;
    }

    if (answeredRef.current === 10) {
      if (isPeserta) {
        later(() => {
          if (curS.correct >= 7) stageRef.current?.fxWin();
          else stageRef.current?.fxFlee();
        }, 450);
      }
      if (!(await waitSafe(1650))) return;
      onFinishBundle(curS);
      return;
    }

    if (!(await waitSafe(1350))) return;
    setActiveTile(null);
    setFeedback(null);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Duolingo Lesson Top Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setExitOpen(true)}
          className="duo-btn inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 border-b-4 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] text-xs font-black text-[#EA2B2B] dark:text-[#FF8A8A] cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Keluar
        </button>

        <div className="flex-1 min-w-[140px] h-4 rounded-full bg-[#E5E5E5] dark:bg-[#37464F] overflow-hidden">
          <div
            className="h-full rounded-full bg-[#58CC02] transition-all duration-300"
            style={{
              width: `${(completedCount / 10) * 100}%`,
              boxShadow: 'inset 0 4px 0 rgba(255,255,255,0.28)'
            }}
          />
        </div>

        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1 font-mono-num text-sm font-black text-[#FF9600]">
            <Flame className="w-4 h-4 fill-current" />
            {sess.streak}
            {sess.streak >= 2 && <span className="text-[11px] font-black">Combo!</span>}
          </span>
          <span className="text-[#E5E5E5] dark:text-[#37464F]">|</span>
          <span className="inline-flex items-center gap-1 font-mono-num text-sm font-black text-[#FFC800]">
            <Star className="w-4 h-4 fill-current" />
            {sess.score}
          </span>
          {sess.frenzy > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#FFF3BF] dark:bg-[#3A2A00] text-[#8A6500] dark:text-[#FFE066] text-xs font-black">
              <Zap className="w-3.5 h-3.5 fill-current" />
              Frenzy ({sess.frenzy})
            </span>
          )}
        </div>
      </div>

      {/* Battle Stage for Peserta */}
      {isPeserta && (
        <BattleStage
          ref={stageRef}
          av={sess.av}
          hname={sess.name}
          kname={SYV[curIdx].n}
          v={curIdx}
          hpH={hpH}
          hpK={hpK}
        />
      )}

      {/* Tile Selector */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-black uppercase tracking-wider text-[#777777] dark:text-[#9DB0BA]">
            {label} · Pilih Nomor Soal
          </span>
          <span className="font-mono-num text-xs font-bold text-[#777777] dark:text-[#9DB0BA]">
            {completedCount}/10 Selesai
          </span>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {tileStates.map((st, idx) => {
            const isCurrent = activeTile === idx;
            const disabled = koDone || activeTile !== null || st !== null;
            let cls =
              'bg-white dark:bg-[#1F2F36] border-[#E5E5E5] dark:border-[#37464F] text-[#1CB0F6] hover:border-[#1CB0F6] hover:-translate-y-0.5';
            let text: React.ReactNode = idx + 1;

            if (isCurrent) {
              cls = 'bg-[#FFC800] border-[#E5B400] text-[#5A4300] scale-[1.04]';
            } else if (st === 'correct' || st === 'bonus') {
              cls = 'bg-[#58CC02] border-[#58A700] text-white';
              text = st === 'bonus' ? '★' : '✓';
            } else if (st === 'wrong' || st === 'ko') {
              cls = 'bg-[#FF4B4B] border-[#EA2B2B] text-white';
              text = st === 'ko' ? '💀' : '✗';
            } else if (st === 'timeout') {
              cls = 'bg-[#777777] border-[#555555] text-white';
              text = '⏱';
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={disabled}
                onClick={() => handleSelectTile(idx)}
                className={`duo-btn aspect-square rounded-2xl border-2 border-b-4 font-black text-base font-mono-num grid place-items-center cursor-pointer disabled:cursor-not-allowed active:border-b-2 ${cls}`}
              >
                {text}
              </button>
            );
          })}
        </div>
      </div>

      {/* Question Card */}
      <div className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-5 sm:p-6 shadow-[0_4px_0_#E5E5E5] dark:shadow-[0_4px_0_#24363E]">
        {activeTile === null ? (
          <div className="py-8 text-center flex flex-col items-center gap-2">
            <div className="text-3xl mascot-bob">🎯</div>
            <p className="font-extrabold text-[#777777] dark:text-[#9DB0BA]">
              Pilih satu nomor soal di atas untuk memulai (60 detik per soal).
            </p>
          </div>
        ) : (
          <QuestionRunner
            key={activeTile}
            question={questions[activeTile]}
            seconds={60}
            rate={sess.frenzy > 0 ? 0.5 : 1}
            onResult={handleQuestionResult}
            controllerRef={askCtrlRef}
            feedbackBanner={feedback}
          />
        )}
      </div>

      {/* Kartu Hikmah */}
      <div>
        <div className="text-xs font-black uppercase tracking-wider text-[#777777] dark:text-[#9DB0BA] mb-2">
          Kartu Hikmah (Terisi kembali tiap 5 jawaban benar beruntun)
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {[
            { k: 'tameng' as const, icon: <Shield className="w-5 h-5 text-[#1CB0F6]" />, title: 'Tameng Dosa', desc: 'Salah = 0 poin hilang' },
            { k: 'cahaya' as const, icon: <Lightbulb className="w-5 h-5 text-[#FFC800]" />, title: 'Cahaya Iman', desc: 'Sisakan 2 pilihan' },
            { k: 'sabar' as const, icon: <Clock className="w-5 h-5 text-[#58CC02]" />, title: 'Buah Sabar', desc: '+15 detik waktu' }
          ].map((item) => {
            const used = cardsUsed[item.k];
            const disabled = activeTile === null || used || koDone || feedback !== null;
            const armed = shield && item.k === 'tameng';
            return (
              <button
                key={item.k}
                type="button"
                disabled={disabled}
                onClick={() => handleUseCard(item.k)}
                className={`duo-btn rounded-2xl border-2 border-b-4 p-3.5 text-left flex items-center gap-3 cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed active:border-b-2 ${
                  armed
                    ? 'border-[#1CB0F6] bg-[#DDF4FF] dark:bg-[#17384A]'
                    : 'border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] hover:-translate-y-0.5 hover:border-[#1CB0F6]'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#F7F7F7] dark:bg-[#24363E] grid place-items-center shrink-0">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <div className="font-black text-sm">{item.title}</div>
                  <div className="text-xs font-bold text-[#777777] dark:text-[#9DB0BA]">
                    {armed ? 'Tameng Aktif!' : used ? 'Sudah dipakai' : item.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <ConfirmModal
        open={exitOpen}
        title="Keluar dari Pertarungan?"
        message="Progres soal pada bundle ini akan hilang dan kamu akan kembali ke Menu Utama."
        confirmLabel="Ya, Keluar"
        onConfirm={() => {
          setExitOpen(false);
          onExit();
        }}
        onCancel={() => setExitOpen(false)}
      />
    </div>
  );
};

export const ResultScreen: React.FC<{
  kind: 'peserta' | 'umum';
  sess: SessionState;
  onCert: (cert: CertData) => void;
  onGo: (s: ScreenName) => void;
}> = ({ kind, sess, onCert, onGo }) => {
  const totalQ = kind === 'peserta' ? 10 : 20;
  const nilai = pct(sess.correct, totalQ);
  const win = nilai >= 70;
  const [meta, setMeta] = useState<{ kept: boolean; rank: number; bossUnlocked: boolean }>({
    kept: true,
    rank: 1,
    bossUnlocked: false
  });
  const savedRef = useRef(false);

  useEffect(() => {
    Music.auto(5);
    if (!savedRef.current) {
      savedRef.current = true;
      const rec = boardAdd(kind, {
        name: sess.name,
        av: sess.av,
        score: sess.score,
        time: Math.round(sess.time),
        nilai
      });
      const cnt = boardGet().peserta.length;
      if (kind === 'peserta' && cnt >= 3) unlockKey('boss');
      unlockKey('t5');
      unlockKey('epilog');
      setMeta({ kept: rec.kept, rank: rec.rank, bossUnlocked: kind === 'peserta' && cnt >= 3 });
      if (win) Music.sfx('win');
    }
  }, [kind, sess, nilai, win]);

  const certPayload: CertData =
    kind === 'peserta'
      ? {
          name: sess.name,
          av: sess.av,
          score: sess.score,
          nilai,
          time: sess.time,
          title: "Pahlawan Qur'ani",
          sub: 'Peserta · melawan Hantu',
          win
        }
      : {
          name: sess.name,
          av: sess.av,
          score: sess.score,
          nilai,
          time: sess.time,
          title: "Bintang Qur'ani",
          sub: 'Kategori Umum',
          win,
          max: 2000
        };

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-5 text-center">
      <ConfettiOverlay active={win} />

      <div className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-8 flex flex-col items-center gap-4 shadow-[0_6px_0_#E5E5E5] dark:shadow-[0_6px_0_#24363E]">
        <div className="text-6xl mascot-bob">{win ? (kind === 'peserta' ? '🏆' : '🌟') : '🌱'}</div>
        <h1 className="text-2xl sm:text-3xl font-black">
          {kind === 'peserta'
            ? win
              ? 'Hantu Tumbang! Kamu Hebat!'
              : 'Hantu Mundur, Tapi Kamu Berani!'
            : win
            ? 'Selamat, Hasilmu Cemerlang!'
            : 'Semangat, Kamu Sudah Berusaha!'}
        </h1>
        <p className="text-sm sm:text-base font-bold text-[#4B4B4B] dark:text-[#DCE6EC] max-w-md">
          {kind === 'peserta'
            ? win
              ? 'Warga kota bersorak gembira: “Alhamdulillah! Terima kasih, pahlawan Qur\'ani! Ilmumu menyelamatkan kami!”'
              : 'Para warga langsung berhamburan kabur menyelamatkan diri karena takut ikut dimusnahkan! Ayo belajar lagi dan balas kekalahan!'
            : win
            ? 'Dua bundle selesai dengan nilai yang membanggakan. Terus jaga istiqomah belajarnya ya.'
            : 'Dua bundle sudah kamu selesaikan. Ilmu itu tumbuh sedikit demi sedikit, ayo coba lagi dan pasti lebih baik.'}
        </p>

        {kind === 'peserta' && <CrowdCheer win={win} />}

        <div className="grid grid-cols-3 gap-2.5 w-full mt-2">
          <div className="rounded-2xl bg-[#FFF3BF] dark:bg-[#3A2A00] p-3">
            <div className="text-xs font-black uppercase text-[#8A6500] dark:text-[#FFE066]">Skor</div>
            <div className="text-xl font-black font-mono-num text-[#5A4300] dark:text-white">
              {sess.score}
              {kind === 'umum' ? '/2000' : ''}
            </div>
          </div>
          <div className="rounded-2xl bg-[#D7FFB8] dark:bg-[#24400F] p-3">
            <div className="text-xs font-black uppercase text-[#46A302] dark:text-[#89E219]">Nilai</div>
            <div className="text-xl font-black font-mono-num text-[#3F8F00] dark:text-white">{nilai}%</div>
          </div>
          <div className="rounded-2xl bg-[#DDF4FF] dark:bg-[#17384A] p-3">
            <div className="text-xs font-black uppercase text-[#1480B5] dark:text-[#6AD1FF]">Waktu</div>
            <div className="text-xl font-black font-mono-num text-[#1480B5] dark:text-white">{fmtT(sess.time)}</div>
          </div>
        </div>

        <p className="text-xs font-bold text-[#777777] dark:text-[#9DB0BA]">
          {meta.kept
            ? `Tercatat di Papan Skor peringkat ${meta.rank}.`
            : 'Papan skor sudah penuh 10 nama dan skormu belum menembusnya.'}
          {meta.bossUnlocked ? ' Final Boss: Iblis sekarang sudah terbuka!' : ''}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <DuoButton variant="gold" size="lg" onClick={() => onCert(certPayload)}>
          <Award className="w-5 h-5" />
          Lihat Sertifikat
        </DuoButton>
        <DuoButton variant="green" size="lg" onClick={() => onGo('board')}>
          <Trophy className="w-5 h-5" />
          Papan Skor
        </DuoButton>
        <DuoButton variant="ghost" size="lg" onClick={() => onGo('hub')}>
          Menu Utama
        </DuoButton>
      </div>
    </div>
  );
};

export const LatihanScreen: React.FC<{
  onInGameChange: (active: boolean) => void;
  onGo: (s: ScreenName) => void;
}> = ({ onInGameChange, onGo }) => {
  const [tier, setTier] = useState<Tier | 'campuran'>('mudah');
  const [count, setCount] = useState(10);
  const [phase, setPhase] = useState<'setup' | 'play' | 'done'>('setup');
  const [qs, setQs] = useState<Question[]>([]);
  const [idx, setIdx] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [time, setTime] = useState(0);
  const [fb, setFb] = useState<{ ok: boolean; text: string; insight?: string } | null>(null);
  const [exitOpen, setExitOpen] = useState(false);

  const practiceUsedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    Music.auto(2);
    return () => {
      onInGameChange(false);
    };
  }, []);

  const startPractice = () => {
    const spec: Partial<Record<Tier, number>> =
      tier === 'campuran'
        ? {
            mudah: Math.ceil(count * 0.4),
            sedang: Math.ceil(count * 0.3),
            sulit: Math.max(1, count - Math.ceil(count * 0.4) - Math.ceil(count * 0.3))
          }
        : { [tier]: count };
    const picked = pick(spec, practiceUsedRef.current, new Set(), true).slice(0, count).map(prep);
    setQs(picked);
    setIdx(0);
    setCorrect(0);
    setTime(0);
    setFb(null);
    onInGameChange(true);
    setPhase('play');
  };

  if (phase === 'setup') {
    return (
      <div className="max-w-xl mx-auto flex flex-col gap-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black">Mode Latihan Mandiri</h1>
          <p className="text-sm font-bold text-[#777777] dark:text-[#9DB0BA]">
            Berlatih tanpa mengunci bundle atau mengurangi skor. Setiap soal disertai hikmah &amp; pembahasan!
          </p>
        </div>

        <div className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-6 flex flex-col gap-5">
          <div>
            <div className="text-sm font-black mb-2">Pilih Tingkat Kesulitan</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(
                [
                  ['mudah', 'Mudah'],
                  ['sedang', 'Sedang'],
                  ['sulit', 'Sulit'],
                  ['campuran', 'Campuran']
                ] as const
              ).map(([val, label]) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setTier(val)}
                  className={`duo-btn px-3 py-2.5 rounded-2xl border-2 border-b-4 text-xs font-black cursor-pointer ${
                    tier === val
                      ? 'border-[#CE82FF] bg-[#FAF2FF] dark:bg-[#2E1F47] text-[#8C3CD6] dark:text-[#DFB4FF]'
                      : 'border-[#E5E5E5] dark:border-[#37464F] bg-[#F7F7F7] dark:bg-[#1A2A31] text-[#777777]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-black mb-2">Jumlah Soal</div>
            <div className="grid grid-cols-2 gap-2">
              {[5, 10].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCount(c)}
                  className={`duo-btn px-3 py-2.5 rounded-2xl border-2 border-b-4 text-sm font-black cursor-pointer ${
                    count === c
                      ? 'border-[#1CB0F6] bg-[#DDF4FF] dark:bg-[#17384A] text-[#1480B5] dark:text-[#6AD1FF]'
                      : 'border-[#E5E5E5] dark:border-[#37464F] bg-[#F7F7F7] dark:bg-[#1A2A31] text-[#777777]'
                  }`}
                >
                  {c} Soal
                </button>
              ))}
            </div>
          </div>

          <DuoButton variant="purple" size="lg" full onClick={startPractice}>
            <GraduationCap className="w-5 h-5" />
            Mulai Latihan
          </DuoButton>
        </div>
      </div>
    );
  }

  if (phase === 'done') {
    const nilai = pct(correct, qs.length);
    const avgSec = qs.length > 0 ? (time / qs.length).toFixed(1) : '0.0';
    return (
      <div className="max-w-xl mx-auto flex flex-col gap-5 text-center">
        <ConfettiOverlay active={nilai >= 70} />
        <div className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-7 flex flex-col items-center gap-4 shadow-[0_6px_0_#E5E5E5] dark:shadow-[0_6px_0_#24363E]">
          <div className="text-6xl mascot-bob">{nilai >= 70 ? '📖' : '🌱'}</div>
          <h1 className="text-2xl sm:text-3xl font-black">Latihan Selesai!</h1>
          <p className="text-sm sm:text-base font-bold text-[#4B4B4B] dark:text-[#DCE6EC] max-w-md">
            Kamu menjawab tepat {correct} dari {qs.length} soal dalam {fmtT(time)} (rata-rata {avgSec} dtk/soal).
          </p>
          <div className="grid grid-cols-3 gap-2.5 w-full mt-1">
            <div className="rounded-2xl bg-[#FAF2FF] dark:bg-[#2E1F47] p-3">
              <div className="text-xs font-black uppercase text-[#8C3CD6] dark:text-[#DFB4FF]">Benar</div>
              <div className="text-xl font-black font-mono-num">{correct}/{qs.length}</div>
            </div>
            <div className="rounded-2xl bg-[#D7FFB8] dark:bg-[#24400F] p-3">
              <div className="text-xs font-black uppercase text-[#46A302] dark:text-[#89E219]">Nilai</div>
              <div className="text-xl font-black font-mono-num">{nilai}%</div>
            </div>
            <div className="rounded-2xl bg-[#DDF4FF] dark:bg-[#17384A] p-3">
              <div className="text-xs font-black uppercase text-[#1480B5] dark:text-[#6AD1FF]">Rata-rata</div>
              <div className="text-xl font-black font-mono-num">{avgSec}s</div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <DuoButton variant="purple" size="lg" onClick={startPractice}>
            <RotateCcw className="w-5 h-5" />
            Acak Soal Baru
          </DuoButton>
          <DuoButton variant="ghost" size="lg" onClick={() => setPhase('setup')}>
            Ubah Pengaturan
          </DuoButton>
          <DuoButton variant="ghost" size="lg" onClick={() => onGo('hub')}>
            Menu Utama
          </DuoButton>
        </div>
      </div>
    );
  }

  const curQ = qs[idx];
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setExitOpen(true)}
          className="duo-btn inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 border-b-4 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] text-xs font-black text-[#EA2B2B] dark:text-[#FF8A8A] cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Keluar
        </button>

        <div className="flex-1 min-w-[140px] h-4 rounded-full bg-[#E5E5E5] dark:bg-[#37464F] overflow-hidden">
          <div
            className="h-full rounded-full bg-[#CE82FF] transition-all duration-300"
            style={{ width: `${((idx + (fb ? 1 : 0)) / qs.length) * 100}%` }}
          />
        </div>

        <span className="font-mono-num text-sm font-black text-[#8C3CD6] dark:text-[#DFB4FF]">
          Soal {idx + 1}/{qs.length} · Benar {correct}
        </span>
      </div>

      {curQ && (
        <div className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-5 sm:p-6 flex flex-col gap-4">
          <QuestionRunner
            key={curQ.id + '-' + idx}
            question={curQ}
            seconds={90}
            feedbackBanner={fb}
            onResult={(res) => {
              const insight = getQuestionInsight(curQ);
              setTime((t) => t + res.elapsed);
              if (res.status === 'correct') {
                Music.sfx('ok');
                setCorrect((c) => c + 1);
                setFb({ ok: true, text: 'Masya Allah, Benar!', insight });
              } else {
                Music.sfx('no');
                setFb({
                  ok: false,
                  text: res.status === 'wrong' ? 'Belum tepat, yuk simak hikmahnya!' : 'Waktu habis!',
                  insight
                });
              }
            }}
          />

          {fb && (
            <DuoButton
              variant="purple"
              size="md"
              className="self-end"
              onClick={() => {
                if (idx + 1 >= qs.length) {
                  onInGameChange(false);
                  if (pct(correct, qs.length) >= 70) Music.sfx('win');
                  setPhase('done');
                } else {
                  setFb(null);
                  setIdx((i) => i + 1);
                }
              }}
            >
              {idx + 1 >= qs.length ? 'Lihat Hasil Latihan' : 'Soal Berikutnya'}
              <ChevronRight className="w-4 h-4" />
            </DuoButton>
          )}
        </div>
      )}

      <ConfirmModal
        open={exitOpen}
        title="Akhiri Latihan?"
        message="Kamu akan kembali ke Menu Utama."
        confirmLabel="Ya, Keluar"
        onConfirm={() => {
          setExitOpen(false);
          onInGameChange(false);
          onGo('hub');
        }}
        onCancel={() => setExitOpen(false)}
      />
    </div>
  );
};
