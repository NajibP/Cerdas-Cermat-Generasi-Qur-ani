import React, { useEffect, useRef, useState } from 'react';
import { Award, Bell, ChevronRight, LogOut, SkipForward, Swords, Trophy } from 'lucide-react';
import { BOSS_SPECS, ENDINGS, KELAS, Question } from '../data/bank';
import { Music } from '../utils/audio';
import {
  boardAdd,
  boardGet,
  CertData,
  cleanName,
  fmtT,
  getQuestionInsight,
  pct,
  pick,
  prep,
  shuffle,
  unlockKey
} from '../utils/helpers';
import { AskResult, ConfettiOverlay, ConfirmModal, DuoButton, QuestionRunner } from '../components/DuoUi';
import { AVATARS, AvatarSvg, BattleStage, BattleStageHandle, CrowdCheer, Podium, TrophySvg } from '../components/Svgs';
import { ScreenName } from './HubAndLearning';

interface BossPlayer {
  name: string;
  av: string;
  rank: number;
  score: number;
  correct: number;
  answered: number;
  time: number;
}

export const BossScreen: React.FC<{
  usedIds: Set<string>;
  onInGameChange: (active: boolean) => void;
  onCert: (c: CertData) => void;
  onGo: (s: ScreenName) => void;
  onToast: (m: string) => void;
}> = ({ usedIds, onInGameChange, onCert, onGo, onToast }) => {
  const fin = boardGet().peserta.slice(0, 3);
  const [phase, setPhase] = useState<'intro' | 'play' | 'end'>('intro');
  const [players, setPlayers] = useState<BossPlayer[]>(() =>
    fin.map((p, i) => ({ name: p.name, av: p.av, rank: i + 1, score: 0, correct: 0, answered: 0, time: 0 }))
  );
  const [bundleIdx, setBundleIdx] = useState(0);
  const [turn, setTurn] = useState(0);
  const [qs, setQs] = useState<Question[]>(() => pick(BOSS_SPECS[0], usedIds).map(prep));
  const [st, setSt] = useState<(null | 'correct' | 'wrong' | 'timeout')[]>(() => Array(5).fill(null));
  const [activeTile, setActiveTile] = useState<number | null>(null);
  const [hits, setHits] = useState(0);
  const [miss, setMiss] = useState(0);
  const [ults, setUlts] = useState(0);
  const [koDone, setKoDone] = useState(false);
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string; insight?: string } | null>(null);
  const [exitOpen, setExitOpen] = useState(false);

  const wrRef = useRef(0);
  const stageRef = useRef<BattleStageHandle>(null);
  const mountedRef = useRef(true);
  const timersRef = useRef<number[]>([]);

  const later = (fn: () => void, ms: number) => {
    const id = window.setTimeout(() => {
      if (mountedRef.current) fn();
    }, ms);
    timersRef.current.push(id);
  };

  const waitSafe = (ms: number) =>
    new Promise<boolean>((resolve) => {
      const id = window.setTimeout(() => resolve(mountedRef.current), ms);
      timersRef.current.push(id);
    });

  useEffect(() => {
    mountedRef.current = true;
    if (fin.length === 0) {
      onToast('Belum ada peserta di papan skor');
      onGo('hub');
      return;
    }
    unlockKey('t4');
    Music.auto(4);
    return () => {
      mountedRef.current = false;
      timersRef.current.forEach((id) => clearTimeout(id));
      timersRef.current = [];
      onInGameChange(false);
    };
  }, []);

  if (fin.length === 0) return null;

  const hpB = Math.max(0, 100 - hits * 10);
  const hpP = Math.max(0, 100 - (miss * 100) / 6 - ults * 25);

  const finishBoss = (finalPlayers: BossPlayer[], finalHits: number) => {
    onInGameChange(false);
    Music.auto(5);
    unlockKey('t5');
    unlockKey('epilog');
    unlockKey('boss');
    const win = finalHits >= 10 || 100 - finalHits * 10 <= 0;
    later(() => Music.sfx('cheer'), 1400);
    if (win) Music.sfx('win');
    const rk = finalPlayers.slice().sort((a, b) => b.score - a.score || a.time - b.time || a.rank - b.rank);
    rk.forEach((p, i) => boardAdd('regu', { name: p.name, av: p.av, score: p.score, time: 0, mode: `Final Boss · Juara ${i + 1}` }));
    setPlayers(finalPlayers);
    setHits(finalHits);
    setPhase('end');
  };

  const handleTileClick = (i: number) => {
    if (koDone || activeTile !== null || st[i] !== null) return;
    setFeedback(null);
    setActiveTile(i);
  };

  const handleQuestionResult = async (res: AskResult) => {
    if (activeTile === null || !mountedRef.current) return;
    const curQ = qs[activeTile];
    const insight = getQuestionInsight(curQ);
    const pIdx = turn % players.length;
    const nextPlayers = players.map((p) => ({ ...p }));
    const curP = nextPlayers[pIdx];
    curP.answered++;

    let pts = 0;
    let nextHits = hits;
    let nextMiss = miss;
    let nextUlts = ults;
    let fb: { ok: boolean; text: string; insight?: string };

    if (res.status === 'correct') {
      pts = 100;
      nextHits++;
      wrRef.current = 0;
      curP.correct++;
      Music.sfx('hit');
      fb = { ok: true, text: 'Benar! +100. Iblis terkena serangan!', insight };
      if (nextHits === 10) stageRef.current?.ultHero();
      else stageRef.current?.fxHero();
    } else {
      pts = res.status === 'wrong' ? -50 : -100;
      nextMiss++;
      wrRef.current++;
      Music.sfx('roar');
      fb = { ok: false, text: res.status === 'wrong' ? 'Belum tepat. −50 poin' : 'Waktu habis. −100 poin', insight };
      if (wrRef.current >= 5) {
        wrRef.current = 0;
        nextUlts++;
        stageRef.current?.ultEnemy(-1);
      } else {
        stageRef.current?.fxKaiju(-1);
      }
    }

    curP.score += pts;
    curP.time += res.elapsed;
    const nextSt = st.slice();
    nextSt[activeTile] = res.status;

    setPlayers(nextPlayers);
    setHits(nextHits);
    setMiss(nextMiss);
    setUlts(nextUlts);
    setSt(nextSt);
    setFeedback(fb);

    const newHpB = Math.max(0, 100 - nextHits * 10);
    const newHpP = Math.max(0, 100 - (nextMiss * 100) / 6 - nextUlts * 25);

    if (newHpB <= 0) {
      setKoDone(true);
      const remInBundle = nextSt.filter((v) => v === null).length;
      const remFutureBundles = Math.max(0, (2 - bundleIdx) * 5);
      const remTotal = remInBundle + remFutureBundles;
      const bonus = remTotal * 100;
      curP.score += bonus;
      setPlayers([...nextPlayers]);
      later(() => stageRef.current?.fxKO(), nextHits === 10 && res.status === 'correct' ? 1100 : 250);
      later(() => stageRef.current?.fxWin(), nextHits === 10 && res.status === 'correct' ? 1300 : 450);
      setFeedback({ ok: true, text: `Iblis KO! Bonus ${remTotal} sisa soal: +${bonus} poin!`, insight });
      if (!(await waitSafe(1800))) return;
      finishBoss(nextPlayers, nextHits);
      return;
    }

    if (newHpP <= 0) {
      setKoDone(true);
      stageRef.current?.fxHeroKO();
      const remInBundle = nextSt.filter((v) => v === null).length;
      const remFutureBundles = Math.max(0, (2 - bundleIdx) * 5);
      const remTotal = remInBundle + remFutureBundles;
      const pen = -(remTotal * 100);
      curP.score += pen;
      setPlayers([...nextPlayers]);
      setFeedback({ ok: false, text: `Tim Pahlawan KO! ${remTotal} sisa soal dikunci (${pen} poin).`, insight });
      if (!(await waitSafe(1800))) return;
      finishBoss(nextPlayers, nextHits);
      return;
    }

    const nextTurn = turn + 1;
    if (nextTurn >= 15) {
      later(() => {
        if (nextHits >= 10) stageRef.current?.fxWin();
        else stageRef.current?.fxFlee();
      }, 450);
    }
    if (!(await waitSafe(1600))) return;

    if (nextTurn >= 15) {
      finishBoss(nextPlayers, nextHits);
      return;
    }

    if (nextSt.every(Boolean)) {
      const nextBi = bundleIdx + 1;
      setBundleIdx(nextBi);
      setQs(pick(BOSS_SPECS[nextBi], usedIds).map(prep));
      setSt(Array(5).fill(null));
      onToast(`Bundle ${nextBi + 1} dimulai!`);
    }
    setTurn(nextTurn);
    setActiveTile(null);
    setFeedback(null);
  };

  if (phase === 'intro') {
    return (
      <div className="max-w-xl mx-auto text-center flex flex-col gap-5">
        <div className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-8 flex flex-col items-center gap-4 shadow-[0_6px_0_#E5E5E5] dark:shadow-[0_6px_0_#24363E]">
          <div className="text-6xl mascot-bob">😈</div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#EA2B2B] dark:text-[#FF8A8A]">Final Boss: Iblis</h1>
          <p className="text-sm sm:text-base font-bold text-[#4B4B4B] dark:text-[#DCE6EC] max-w-md">
            Tiga peringkat teratas maju bersama. Bergiliran sesuai peringkat, tiap pahlawan memilih 1 soal. Ada 3 bundle, 5 soal per bundle, soal mudah sampai sulit terbuka!
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {fin.map((p, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#F7F7F7] dark:bg-[#1A2A31] border-2 border-[#E5E5E5] dark:border-[#37464F] font-black text-sm"
              >
                <span>{['🥇', '🥈', '🥉'][i]}</span>
                <AvatarSvg code={p.av} size={26} />
                <span>{p.name}</span>
              </span>
            ))}
          </div>
          <DuoButton
            variant="red"
            size="lg"
            full
            onClick={() => {
              onInGameChange(true);
              setPhase('play');
            }}
          >
            <Swords className="w-5 h-5" />
            Hadapi Iblis
          </DuoButton>
        </div>
      </div>
    );
  }

  if (phase === 'end') {
    const win = hits >= 10 || hpB <= 0;
    const rk = players.slice().sort((a, b) => b.score - a.score || a.time - b.time || a.rank - b.rank);
    return (
      <div className="flex flex-col gap-6">
        <ConfettiOverlay active={win} set={['👑', '🎉', '🌟', '🏆']} />
        <div className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-7 text-center flex flex-col items-center gap-3 shadow-[0_6px_0_#E5E5E5] dark:shadow-[0_6px_0_#24363E]">
          <div className="text-6xl">{win ? '🏆' : '😱'}</div>
          <h1 className="text-2xl sm:text-3xl font-black">{win ? 'Iblis Tumbang!' : 'Pahlawan Kalah — Kota Panik!'}</h1>
          <p className="text-sm sm:text-base font-bold text-[#4B4B4B] dark:text-[#DCE6EC] max-w-lg">
            {win
              ? "Warga bersorak suka ria merayakan kemenangan! Kota Qur'ani selamat berkat kerja sama tiga pahlawan."
              : 'Para warga langsung berhamburan kabur menyelamatkan diri karena takut ikut dimusnahkan Iblis! Ayo bangkit dan berjuang lagi!'}
          </p>
          <div className="text-sm font-black font-mono-num text-[#58CC02]">{hits} serangan tepat</div>
        </div>

        <Podium list={rk.map((p) => ({ name: p.name, av: p.av, sc: p.score, t: p.time }))} />
        <CrowdCheer win={win} />

        <h2 className="text-xl font-black mt-2">Secret Ending Sang Juara</h2>
        <div className="flex flex-col gap-3">
          {rk.map((p, i) => {
            const denom = p.answered;
            return (
              <div key={p.name} className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-5 flex flex-col gap-2.5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-black text-sm text-[#E5B400]">{['🥇 Juara 1', '🥈 Juara 2', '🥉 Juara 3'][i]}</span>
                  <span className="inline-flex items-center gap-1.5 font-black">
                    <AvatarSvg code={p.av} size={26} />
                    {p.name}
                  </span>
                  <span className="text-xs font-mono-num font-bold text-[#777777] dark:text-[#9DB0BA]">
                    Skor {p.score} · Benar {p.correct}/{denom} ({pct(p.correct, denom)}%)
                  </span>
                </div>
                <h3 className="text-lg font-black">
                  {ENDINGS[i].e} {ENDINGS[i].t}
                </h3>
                <p className="text-sm font-bold text-[#4B4B4B] dark:text-[#DCE6EC] leading-relaxed">{ENDINGS[i].x}</p>
                <div>
                  <DuoButton
                    variant="gold"
                    size="sm"
                    onClick={() =>
                      onCert({
                        name: p.name,
                        av: p.av,
                        score: p.score,
                        nilai: pct(p.correct, denom),
                        time: p.time,
                        title: ENDINGS[i].t,
                        sub: `Final Boss · Juara ${i + 1} (${p.correct}/${denom} benar)`,
                        win: true
                      })
                    }
                  >
                    <Award className="w-4 h-4" />
                    Sertifikat {p.name}
                  </DuoButton>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-3">
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
  }

  const curPlayer = players[turn % players.length];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3 text-sm font-black font-mono-num">
          <span className="px-3 py-1.5 rounded-xl bg-[#FFE9C7] dark:bg-[#3A2810] text-[#B55400] dark:text-[#FFB347]">
            Bundle {bundleIdx + 1}/3
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-[#F7F7F7] dark:bg-[#1A2A31] border-2 border-[#E5E5E5] dark:border-[#37464F]">
            Soal {turn + 1}/15
          </span>
        </div>
        <button
          type="button"
          onClick={() => setExitOpen(true)}
          className="duo-btn inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 border-b-4 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] text-xs font-black text-[#EA2B2B] dark:text-[#FF8A8A] cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Keluar
        </button>
      </div>

      <BattleStage
        ref={stageRef}
        mega
        av={curPlayer.av}
        hname="Tim Pahlawan"
        kname="Iblis"
        hpH={hpP}
        hpK={hpB}
      />

      <div className="flex flex-wrap gap-2">
        {players.map((p, i) => {
          const active = i === turn % players.length;
          return (
            <div
              key={p.name}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl border-2 text-xs sm:text-sm font-black ${
                active
                  ? 'bg-[#FFF3BF] dark:bg-[#3A2A00] border-[#FFC800] text-[#5A4300] dark:text-[#FFE066]'
                  : 'bg-white dark:bg-[#1F2F36] border-[#E5E5E5] dark:border-[#37464F]'
              }`}
            >
              <span>{['🥇', '🥈', '🥉'][i]}</span>
              <AvatarSvg code={p.av} size={24} />
              <span>{p.name}</span>
              <span className="font-mono-num">· {p.score}</span>
            </div>
          );
        })}
      </div>

      <div className="text-sm font-bold text-[#777777] dark:text-[#9DB0BA]">
        Giliran <strong className="text-[#3C3C3C] dark:text-white">{curPlayer.name}</strong>: pilih 1 nomor soal.
      </div>

      <div className="grid grid-cols-5 gap-2.5 max-w-md">
        {st.map((val, i) => {
          const isCur = activeTile === i;
          const disabled = koDone || activeTile !== null || val !== null;
          let cls = 'bg-white dark:bg-[#1F2F36] border-[#E5E5E5] dark:border-[#37464F] text-[#1CB0F6] hover:border-[#1CB0F6] hover:-translate-y-0.5';
          let txt: React.ReactNode = i + 1;
          if (isCur) cls = 'bg-[#FFC800] border-[#E5B400] text-[#5A4300] scale-[1.04]';
          else if (val === 'correct') {
            cls = 'bg-[#58CC02] border-[#58A700] text-white';
            txt = '✓';
          } else if (val === 'wrong') {
            cls = 'bg-[#FF4B4B] border-[#EA2B2B] text-white';
            txt = '✗';
          } else if (val === 'timeout') {
            cls = 'bg-[#777777] border-[#555] text-white';
            txt = '⏱';
          }
          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => handleTileClick(i)}
              className={`duo-btn aspect-square rounded-2xl border-2 border-b-4 font-black font-mono-num text-base grid place-items-center cursor-pointer disabled:cursor-not-allowed ${cls}`}
            >
              {txt}
            </button>
          );
        })}
      </div>

      <div className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-5 sm:p-6 shadow-[0_4px_0_#E5E5E5] dark:shadow-[0_4px_0_#24363E]">
        {activeTile === null ? (
          <p className="text-center font-bold text-[#777777] dark:text-[#9DB0BA] py-6">
            {curPlayer.name}, pilih satu nomor soal di atas (60 detik).
          </p>
        ) : (
          <QuestionRunner
            key={`${bundleIdx}-${activeTile}`}
            question={qs[activeTile]}
            seconds={60}
            onResult={handleQuestionResult}
            feedbackBanner={feedback}
          />
        )}
      </div>

      <ConfirmModal
        open={exitOpen}
        title="Keluar dari Final Boss?"
        message="Progres pertarungan Final Boss saat ini akan dihentikan dan tidak tersimpan."
        onCancel={() => setExitOpen(false)}
        onConfirm={() => {
          setExitOpen(false);
          onInGameChange(false);
          onGo('hub');
        }}
      />
    </div>
  );
};

// ========================
// REGU DUEL (2v2, 3v3, 5v5)
// ========================
interface ReguTeam {
  name: string;
  av: string;
  score: number;
}

type ReguStep =
  | { kind: 'setup' }
  | { kind: 'starter-ready'; ti: number; k: number; q: Question; label: string }
  | { kind: 'starter-ask'; ti: number; k: number; q: Question; label: string; doneMsg?: { ok: boolean; text: string; insight?: string } }
  | { kind: 'rebutan-bell'; q: Question; secs: number; label: string; scored: boolean; nextFn: () => void }
  | {
      kind: 'rebutan-ask';
      q: Question;
      secs: number;
      label: string;
      scored: boolean;
      order: [number, number];
      attempt: number;
      fb?: { ok: boolean; text: string; insight?: string; done?: boolean };
      nextFn: () => void;
    }
  | { kind: 'end'; winner: number; sdRounds: number };

export const ReguScreen: React.FC<{
  usedIds: Set<string>;
  onInGameChange: (active: boolean) => void;
  onCert: (c: CertData) => void;
  onGo: (s: ScreenName) => void;
  onToast: (m: string) => void;
}> = ({ usedIds, onInGameChange, onCert, onGo, onToast }) => {
  const [size, setSize] = useState(2);
  const [nameA, setNameA] = useState('');
  const [nameB, setNameB] = useState('');
  const [avA, setAvA] = useState(AVATARS[0]);
  const [avB, setAvB] = useState(AVATARS[1]);
  const [setupErr, setSetupErr] = useState('');
  const [teams, setTeams] = useState<ReguTeam[]>([]);
  const [step, setStep] = useState<ReguStep>({ kind: 'setup' });
  const [exitOpen, setExitOpen] = useState(false);

  const teamsRef = useRef<ReguTeam[]>([]);
  const queueRef = useRef<(() => void)[]>([]);
  const sdCountRef = useRef(0);
  const mountedRef = useRef(true);
  const timersRef = useRef<number[]>([]);

  const later = (fn: () => void, ms: number) => {
    const id = window.setTimeout(() => {
      if (mountedRef.current) fn();
    }, ms);
    timersRef.current.push(id);
  };

  const waitSafe = (ms: number) =>
    new Promise<boolean>((resolve) => {
      const id = window.setTimeout(() => resolve(mountedRef.current), ms);
      timersRef.current.push(id);
    });

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      timersRef.current.forEach((id) => clearTimeout(id));
      timersRef.current = [];
      onInGameChange(false);
    };
  }, []);

  const runNextQueued = () => {
    const fn = queueRef.current.shift();
    if (fn) {
      fn();
      return;
    }
    const [t0, t1] = teamsRef.current;
    if (t0.score === t1.score) {
      onToast('Skor seri! Sudden Death dimulai');
      sdCountRef.current++;
      const q = prep(pick({ sedang: 1 }, usedIds)[0]);
      setStep({
        kind: 'rebutan-bell',
        q,
        secs: 15,
        label: `Sudden Death · soal ${sdCountRef.current}`,
        scored: false,
        nextFn: runNextQueued
      });
    } else {
      const winner = t0.score > t1.score ? 0 : 1;
      finishRegu(winner);
    }
  };

  const finishRegu = (winner: number) => {
    onInGameChange(false);
    Music.auto(5);
    unlockKey('t5');
    unlockKey('epilog');
    Music.sfx('win');
    later(() => Music.sfx('cheer'), 1400);
    const W = teamsRef.current[winner];
    boardAdd('regu', { name: W.name, av: W.av, score: W.score, time: 0, mode: `Regu Duel ${size}v${size}` });
    setStep({ kind: 'end', winner, sdRounds: sdCountRef.current });
  };

  const startDuel = () => {
    const a = cleanName(nameA, 12);
    const b = cleanName(nameB, 12);
    if (!a || !b) {
      setSetupErr('Isi nama kedua regu dulu.');
      return;
    }
    if (a.toLowerCase() === b.toLowerCase()) {
      setSetupErr('Nama kedua regu harus berbeda.');
      return;
    }
    setSetupErr('');
    const initTeams: ReguTeam[] = [
      { name: a, av: avA, score: 0 },
      { name: b, av: avB, score: 0 }
    ];
    teamsRef.current = initTeams;
    setTeams(initTeams);
    sdCountRef.current = 0;
    onInGameChange(true);
    Music.auto(2);

    const actions: (() => void)[] = [];
    for (let ti = 0; ti < 2; ti++) {
      const qs = pick({ mudah: 3 }, usedIds).map(prep);
      for (let k = 0; k < 3; k++) {
        actions.push(() => {
          Music.auto(2);
          setStep({
            kind: 'starter-ready',
            ti,
            k,
            q: qs[k],
            label: `Babak 1 · Starter Point · soal ${k + 1}/3`
          });
        });
      }
    }
    const rebQs = pick({ mudah: 5 }, usedIds).map(prep);
    rebQs.forEach((q, k) => {
      actions.push(() => {
        Music.auto(3);
        setStep({
          kind: 'rebutan-bell',
          q,
          secs: 20,
          label: `Babak 2 · Rebutan · soal ${k + 1}/5`,
          scored: true,
          nextFn: runNextQueued
        });
      });
    });
    const finQs = pick({ mudah: 2, sedang: 3 }, usedIds).map(prep);
    finQs.forEach((q, k) => {
      actions.push(() => {
        unlockKey('t4');
        Music.auto(4);
        setStep({
          kind: 'rebutan-bell',
          q,
          secs: 15,
          label: `Babak 3 · Final · soal ${k + 1}/5`,
          scored: true,
          nextFn: runNextQueued
        });
      });
    });

    queueRef.current = actions;
    runNextQueued();
  };

  useEffect(() => {
    if (step.kind !== 'rebutan-bell') return;
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat || e.ctrlKey || e.metaKey || e.altKey) return;
      if (document.querySelector('[aria-modal="true"]')) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      const k = e.key.toLowerCase();
      if (k === 'a') pickBell(0);
      if (k === 'l') pickBell(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [step]);

  const pickBell = (who: number) => {
    if (step.kind !== 'rebutan-bell') return;
    Music.sfx('bell');
    setStep({
      kind: 'rebutan-ask',
      q: step.q,
      secs: step.secs,
      label: step.label,
      scored: step.scored,
      order: [who, 1 - who],
      attempt: 0,
      nextFn: step.nextFn
    });
  };

  if (step.kind === 'setup') {
    return (
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black">Regu Duel</h1>
          <p className="text-sm font-bold text-[#777777] dark:text-[#9DB0BA]">
            Dua regu beradu dalam 3 babak: Starter Point, Rebutan, dan Final. Seri? Lanjut Sudden Death.
          </p>
        </div>

        <div className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-5">
          <label htmlFor="regu-sz" className="block text-sm font-black mb-2">
            Besar Regu
          </label>
          <select
            id="regu-sz"
            value={size}
            onChange={(e) => setSize(+e.target.value)}
            className="w-full rounded-2xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-[#F7F7F7] dark:bg-[#1A2A31] px-4 py-3 text-base font-bold"
          >
            <option value={2}>2 vs 2</option>
            <option value={3}>3 vs 3</option>
            <option value={5}>5 vs 5</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Regu A', val: nameA, setVal: setNameA, av: avA, setAv: setAvA },
            { label: 'Regu B', val: nameB, setVal: setNameB, av: avB, setAv: setAvB }
          ].map((cfg) => (
            <div key={cfg.label} className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-5 flex flex-col gap-4">
              <h2 className="text-lg font-black">{cfg.label}</h2>
              <div>
                <label className="block text-xs font-black uppercase text-[#777777] mb-1.5">Nama Regu (maks. 12)</label>
                <input
                  type="text"
                  maxLength={12}
                  value={cfg.val}
                  onChange={(e) => cfg.setVal(e.target.value)}
                  placeholder={`Nama ${cfg.label}`}
                  className="w-full rounded-2xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-[#F7F7F7] dark:bg-[#1A2A31] px-4 py-3 text-base font-bold focus:border-[#1CB0F6] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase text-[#777777] mb-2">Avatar</label>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {AVATARS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => cfg.setAv(a)}
                      className={`duo-btn rounded-xl p-1 border-2 border-b-4 grid place-items-center cursor-pointer ${
                        cfg.av === a
                          ? 'border-[#1CB0F6] bg-[#DDF4FF] dark:bg-[#17384A]'
                          : 'border-[#E5E5E5] dark:border-[#37464F] bg-[#F7F7F7] dark:bg-[#1A2A31]'
                      }`}
                    >
                      <AvatarSvg code={a} size={40} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {setupErr && <div className="text-sm font-extrabold text-[#EA2B2B] dark:text-[#FF8A8A]">{setupErr}</div>}

        <DuoButton variant="green" size="lg" full onClick={startDuel}>
          <Swords className="w-5 h-5" />
          Mulai Duel
        </DuoButton>
      </div>
    );
  }

  if (step.kind === 'end') {
    const W = teams[step.winner];
    const L = teams[1 - step.winner];
    return (
      <div className="max-w-xl mx-auto text-center flex flex-col gap-5">
        <ConfettiOverlay active set={['🏆', '🎉', '⭐', '🛡️']} />
        <div className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-7 flex flex-col items-center gap-3 shadow-[0_6px_0_#E5E5E5] dark:shadow-[0_6px_0_#24363E]">
          <div className="text-6xl">🏆</div>
          <h1 className="text-2xl sm:text-3xl font-black flex items-center gap-2 justify-center flex-wrap">
            <AvatarSvg code={W.av} size={36} />
            <span>{W.name} Juara!</span>
          </h1>
          <p className="text-sm sm:text-base font-bold text-[#4B4B4B] dark:text-[#DCE6EC] max-w-md">
            Selamat!{' '}
            {step.sdRounds > 0 ? 'Kemenangan diraih lewat Sudden Death yang menegangkan.' : 'Kerja sama regu yang kompak dan cermat.'}{' '}
            {L.name} juga hebat, terus semangat belajar!
          </p>
          <Podium
            list={[
              { name: W.name, av: W.av, sc: W.score },
              { name: L.name, av: L.av, sc: L.score }
            ]}
          />
          <CrowdCheer />
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <DuoButton
            variant="gold"
            size="lg"
            onClick={() =>
              onCert({
                name: W.name,
                av: W.av,
                score: W.score,
                nilai: null,
                time: 0,
                title: 'Juara Regu Duel',
                sub: `Regu Duel ${size} vs ${size} · mengalahkan ${L.name}`,
                win: true
              })
            }
          >
            <Award className="w-5 h-5" />
            Sertifikat
          </DuoButton>
          <DuoButton variant="green" size="lg" onClick={() => onGo('board')}>
            Papan Skor
          </DuoButton>
          <DuoButton variant="ghost" size="lg" onClick={() => onGo('hub')}>
            Menu Utama
          </DuoButton>
        </div>
      </div>
    );
  }

  const HudHeader = (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-3">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="inline-flex items-center gap-2 font-black text-sm px-3 py-1 rounded-xl bg-[#D7FFB8] dark:bg-[#24400F] text-[#3F8F00] dark:text-[#89E219]">
          <AvatarSvg code={teams[0].av} size={24} />
          {teams[0].name} · <span className="font-mono-num">{teams[0].score}</span>
        </span>
        <span className="font-black text-xs text-[#777777]">VS</span>
        <span className="inline-flex items-center gap-2 font-black text-sm px-3 py-1 rounded-xl bg-[#DDF4FF] dark:bg-[#17384A] text-[#1480B5] dark:text-[#6AD1FF]">
          <AvatarSvg code={teams[1].av} size={24} />
          {teams[1].name} · <span className="font-mono-num">{teams[1].score}</span>
        </span>
      </div>
      <button
        type="button"
        onClick={() => setExitOpen(true)}
        className="duo-btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-b-4 border-[#E5E5E5] dark:border-[#37464F] text-xs font-black text-[#EA2B2B] dark:text-[#FF8A8A] cursor-pointer"
      >
        <LogOut className="w-4 h-4" />
        Keluar
      </button>
    </div>
  );

  return (
    <div className="flex flex-col gap-5">
      {HudHeader}

      <div className="text-xs font-black uppercase tracking-wider text-[#1CB0F6]">{step.label}</div>

      {step.kind === 'starter-ready' && (
        <div className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-6 flex flex-col gap-4 items-center text-center">
          <AvatarSvg code={teams[step.ti].av} size={56} />
          <p className="text-base sm:text-lg font-extrabold">
            <strong>{teams[step.ti].name}</strong>, penjawab: <strong>Anggota {(step.k % size) + 1}</strong>
          </p>
          <p className="text-sm font-bold text-[#777777] dark:text-[#9DB0BA]">30 detik · Benar +50, salah 0</p>
          <DuoButton
            variant="green"
            size="lg"
            full
            onClick={() => setStep({ kind: 'starter-ask', ti: step.ti, k: step.k, q: step.q, label: step.label })}
          >
            Mulai Soal
          </DuoButton>
        </div>
      )}

      {step.kind === 'starter-ask' && (
        <div className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-6 flex flex-col gap-4">
          <QuestionRunner
            question={step.q}
            seconds={30}
            feedbackBanner={step.doneMsg ? { ok: step.doneMsg.ok, text: step.doneMsg.text, insight: step.doneMsg.insight } : null}
            onResult={(res) => {
              const insight = getQuestionInsight(step.q);
              if (res.status === 'correct') {
                teamsRef.current[step.ti].score += 50;
                setTeams(teamsRef.current.map((t) => ({ ...t })));
                Music.sfx('ok');
                setStep({ ...step, doneMsg: { ok: true, text: 'Benar! +50 poin', insight } });
              } else {
                Music.sfx('no');
                setStep({
                  ...step,
                  doneMsg: { ok: false, text: res.status === 'wrong' ? 'Belum tepat. 0 poin' : 'Waktu habis. 0 poin', insight }
                });
              }
            }}
          />
          {step.doneMsg && (
            <DuoButton variant="green" size="md" onClick={runNextQueued} className="self-end">
              Lanjut
              <ChevronRight className="w-4 h-4" />
            </DuoButton>
          )}
        </div>
      )}

      {step.kind === 'rebutan-bell' && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => pickBell(0)}
              className="duo-btn rounded-3xl bg-[#FFC800] text-[#5A4300] border-b-4 border-[#E5B400] hover:-translate-y-0.5 hover:brightness-105 p-6 flex flex-col items-center gap-1.5 font-black cursor-pointer active:border-b-0 active:mt-1"
            >
              <Bell className="w-8 h-8" />
              <span className="text-lg">{teams[0].name}</span>
              <span className="text-xs opacity-85">Tekan Tombol [A]</span>
            </button>
            <button
              type="button"
              onClick={() => pickBell(1)}
              className="duo-btn rounded-3xl bg-[#1CB0F6] text-white border-b-4 border-[#1899D6] hover:-translate-y-0.5 hover:brightness-105 p-6 flex flex-col items-center gap-1.5 font-black cursor-pointer active:border-b-0 active:mt-1"
            >
              <Bell className="w-8 h-8" />
              <span className="text-lg">{teams[1].name}</span>
              <span className="text-xs opacity-85">Tekan Tombol [L]</span>
            </button>
          </div>

          <div className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-6">
            <p className="text-xs font-extrabold text-[#777777] dark:text-[#9DB0BA] mb-2">
              Baca soalnya, lalu tekan lonceng regumu paling cepat!
            </p>
            <h3 className="text-lg sm:text-xl font-black">{step.q.q}</h3>
          </div>

          <div>
            <DuoButton
              variant="ghost"
              size="sm"
              onClick={() => {
                onToast('Soal dilewati');
                step.nextFn();
              }}
            >
              <SkipForward className="w-4 h-4" />
              Lewati Soal
            </DuoButton>
          </div>
        </div>
      )}

      {step.kind === 'rebutan-ask' && (
        <div className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2 font-black text-sm text-[#FF9600]">
            <Bell className="w-4 h-4" />
            <span>
              Giliran {teams[step.order[step.attempt]].name} menjawab
              {step.attempt === 1 ? ' (lemparan dari lawan)' : ''}
            </span>
          </div>

          <QuestionRunner
            key={`${step.label}-${step.attempt}`}
            question={step.q}
            seconds={step.secs}
            feedbackBanner={step.fb ? { ok: step.fb.ok, text: step.fb.text, insight: step.fb.insight } : null}
            onResult={async (res) => {
              const tm = step.order[step.attempt];
              const tmName = teamsRef.current[tm].name;
              const insight = getQuestionInsight(step.q);
              if (res.status === 'correct') {
                if (step.scored) teamsRef.current[tm].score += 100;
                setTeams(teamsRef.current.map((t) => ({ ...t })));
                Music.sfx('ok');
                const winText = `${tmName} benar!${step.scored ? ' +100 poin' : ''}`;
                if (!step.scored) {
                  setStep({ ...step, fb: { ok: true, text: winText, insight, done: true } });
                  if (!(await waitSafe(1200))) return;
                  finishRegu(tm);
                  return;
                }
                setStep({ ...step, fb: { ok: true, text: winText, insight, done: true } });
              } else {
                if (step.scored) teamsRef.current[tm].score -= 50;
                setTeams(teamsRef.current.map((t) => ({ ...t })));
                Music.sfx('no');
                const failText = `${tmName} ${res.status === 'wrong' ? 'belum tepat' : 'kehabisan waktu'}${
                  step.scored ? '. −50' : ''
                }${step.attempt === 0 ? '. Soal dilempar ke regu lawan!' : ''}`;
                if (step.attempt === 0) {
                  setStep({ ...step, fb: { ok: false, text: failText, done: false } });
                  if (!(await waitSafe(1600))) return;
                  setStep({ ...step, attempt: 1, fb: undefined });
                } else {
                  setStep({ ...step, fb: { ok: false, text: failText, insight, done: true } });
                }
              }
            }}
          />

          {step.fb?.done && (
            <DuoButton variant="green" size="md" onClick={step.nextFn} className="self-end">
              Lanjut
              <ChevronRight className="w-4 h-4" />
            </DuoButton>
          )}
        </div>
      )}

      <ConfirmModal
        open={exitOpen}
        title="Keluar dari Regu Duel?"
        message="Progres pertandingan regu saat ini akan dihentikan."
        onCancel={() => setExitOpen(false)}
        onConfirm={() => {
          setExitOpen(false);
          onInGameChange(false);
          onGo('hub');
        }}
      />
    </div>
  );
};

// ========================
// TURNAMEN 1vs1 LINTAS KELAS
// ========================
interface TourPlayer {
  name: string;
  k: string;
  av: string;
}

interface TourMatch {
  a: TourPlayer | null;
  b: TourPlayer | null;
  w: TourPlayer | null;
  sa: number | null;
  sb: number | null;
}

function pairCross(pl: TourPlayer[]): [TourPlayer, TourPlayer][] {
  const pool = shuffle(pl);
  const out: [TourPlayer, TourPlayer][] = [];
  while (pool.length) {
    const a = pool.shift()!;
    let j = pool.findIndex((p) => p.k !== a.k);
    if (j < 0) j = 0;
    out.push([a, pool.splice(j, 1)[0]]);
  }
  return out;
}

export const TurnamenScreen: React.FC<{
  onInGameChange: (active: boolean) => void;
  onCert: (c: CertData) => void;
  onGo: (s: ScreenName) => void;
}> = ({ onInGameChange, onCert, onGo }) => {
  const [size, setSize] = useState(4);
  const [formPlayers, setFormPlayers] = useState<TourPlayer[]>(() =>
    Array.from({ length: 8 }, (_, i) => ({ name: '', k: KELAS[0], av: AVATARS[i % AVATARS.length] }))
  );
  const [formErr, setFormErr] = useState('');

  const [rounds, setRounds] = useState<TourMatch[][]>([]);
  const [rIdx, setRIdx] = useState(0);
  const [mIdx, setMIdx] = useState(0);
  const [subPhase, setSubPhase] = useState<'setup' | 'ready' | 'play' | 'match-done' | 'champ'>('setup');
  const [matchQs, setMatchQs] = useState<Question[]>([]);
  const [sideTurn, setSideTurn] = useState<0 | 1>(0);
  const [qIdx, setQIdx] = useState(0);
  const [sideScore, setSideScore] = useState(0);
  const [sideTime, setSideTime] = useState(0);
  const [scoreA, setScoreA] = useState<{ sc: number; tTot: number } | null>(null);
  const [fb, setFb] = useState<{ ok: boolean; text: string; insight?: string } | null>(null);
  const [champ, setChamp] = useState<TourPlayer | null>(null);
  const [champFinalScore, setChampFinalScore] = useState(0);
  const [lastWinTime, setLastWinTime] = useState(0);
  const [exitOpen, setExitOpen] = useState(false);

  const tourUsedRef = useRef(new Set<string>());
  const mountedRef = useRef(true);
  const timersRef = useRef<number[]>([]);

  const later = (fn: () => void, ms: number) => {
    const id = window.setTimeout(() => {
      if (mountedRef.current) fn();
    }, ms);
    timersRef.current.push(id);
  };

  const waitSafe = (ms: number) =>
    new Promise<boolean>((resolve) => {
      const id = window.setTimeout(() => resolve(mountedRef.current), ms);
      timersRef.current.push(id);
    });

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      timersRef.current.forEach((id) => clearTimeout(id));
      timersRef.current = [];
      onInGameChange(false);
    };
  }, []);

  const roundNames = size === 8 ? ['Perempat Final', 'Semifinal', 'Final'] : ['Semifinal', 'Final'];
  const specs = size === 8 ? [{ mudah: 5 }, { mudah: 2, sedang: 3 }, { sedang: 5 }] : [{ mudah: 5 }, { sedang: 5 }];
  const bgm = size === 8 ? [3, 3, 4] : [2, 4];

  const startTournament = () => {
    const active = formPlayers.slice(0, size).map((p) => ({ ...p, name: cleanName(p.name) }));
    if (active.some((p) => !p.name)) {
      setFormErr('Semua nama pemain harus diisi.');
      return;
    }
    if (new Set(active.map((p) => p.name.toLowerCase())).size < size) {
      setFormErr('Nama pemain tidak boleh sama.');
      return;
    }
    setFormErr('');
    tourUsedRef.current = new Set();

    const r0: TourMatch[] = pairCross(active).map(([a, b]) => ({ a, b, w: null, sa: null, sb: null }));
    const initRounds: TourMatch[][] = [r0];
    for (let r = 1; r < roundNames.length; r++) {
      initRounds.push(
        Array.from({ length: initRounds[r - 1].length / 2 }, () => ({ a: null, b: null, w: null, sa: null, sb: null }))
      );
    }

    setRounds(initRounds);
    setRIdx(0);
    setMIdx(0);
    onInGameChange(true);
    Music.auto(bgm[0]);
    setSubPhase('ready');
  };

  const renderBracket = (cur?: [number, number]) => {
    const R = rounds.length;
    const lineColor = 'border-[#D0D7DE] dark:border-[#465965]';
    const lineBg = 'bg-[#D0D7DE] dark:bg-[#465965]';

    const renderMatch = (mt: TourMatch, ri: number, mi: number) => {
      const isCur = cur && cur[0] === ri && cur[1] === mi;
      return (
        <div
          key={`${ri}-${mi}`}
          className={`w-[172px] h-[76px] rounded-2xl border-2 p-1.5 flex flex-col justify-between transition-colors ${
            isCur
              ? 'border-[#FFC800] bg-[#FFFDF2] dark:bg-[#2A2410] shadow-[0_4px_0_#E5B400]'
              : 'border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] shadow-[0_3px_0_#E5E5E5] dark:shadow-[0_3px_0_#24363E]'
          }`}
        >
          {[mt.a, mt.b].map((p, k) =>
            p ? (
              <div
                key={k}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-xl text-xs font-black leading-none ${
                  mt.w
                    ? mt.w === p
                      ? 'bg-[#58CC02] text-white'
                      : 'opacity-45 line-through'
                    : 'text-[#3C3C3C] dark:text-[#F1F7F9]'
                }`}
              >
                <AvatarSvg code={p.av} size={20} />
                <span className="truncate">{p.name}</span>
                <span className="ml-auto font-mono-num text-[11px] opacity-80 shrink-0">
                  {p.k}
                  {mt.w && mt.sa != null ? ` · ${k === 0 ? mt.sa : mt.sb}` : ''}
                </span>
              </div>
            ) : (
              <div key={k} className="px-2 py-1 text-xs font-bold text-[#9DB0BA] dark:text-[#6B808C] leading-none">
                menunggu…
              </div>
            )
          )}
        </div>
      );
    };

    const renderWing = (side: 'L' | 'R') => {
      const indices = Array.from({ length: R - 1 }, (_, ri) => ri);
      const ordered = side === 'L' ? indices : [...indices].reverse();

      return (
        <div className="flex items-stretch gap-7">
          {ordered.map((ri) => {
            const rd = rounds[ri];
            const half = rd.length / 2;
            const sliceIdx = Array.from({ length: half }, (_, i) => i + (side === 'R' ? half : 0));
            const needsPairFork = ri < R - 2;

            return (
              <div key={`${side}-${ri}`} className="flex flex-col items-center">
                <div className="mb-3 text-[11px] font-black uppercase tracking-widest text-[#777777] dark:text-[#9DB0BA]">
                  {roundNames[ri]}
                </div>
                <div className={`flex-1 flex flex-col justify-center ${R === 2 ? 'pt-20' : 'pt-10'}`}>
                  {needsPairFork ? (
                    <div className="flex flex-col gap-6">
                      {Array.from({ length: sliceIdx.length / 2 }, (_, pairIdx) => {
                        const m1 = sliceIdx[pairIdx * 2];
                        const m2 = sliceIdx[pairIdx * 2 + 1];
                        return (
                          <div key={pairIdx} className="relative flex flex-col gap-4">
                            <div className="relative">
                              {renderMatch(rd[m1], ri, m1)}
                              <div
                                className={`block absolute top-1/2 -translate-y-1/2 w-3.5 h-[2px] ${lineBg} ${
                                  side === 'L' ? '-right-3.5' : '-left-3.5'
                                }`}
                              />
                            </div>
                            <div className="relative">
                              {renderMatch(rd[m2], ri, m2)}
                              <div
                                className={`block absolute top-1/2 -translate-y-1/2 w-3.5 h-[2px] ${lineBg} ${
                                  side === 'L' ? '-right-3.5' : '-left-3.5'
                                }`}
                              />
                            </div>
                            {/* Vertical fork connecting top & bottom match centers (38px from top/bottom of 76px cards) */}
                            <div
                              className={`block absolute top-[38px] bottom-[38px] w-3.5 ${
                                side === 'L'
                                  ? `-right-3.5 border-r-2 ${lineColor}`
                                  : `-left-3.5 border-l-2 ${lineColor}`
                              }`}
                            />
                            {/* Outgoing midpoint line into next round */}
                            <div
                              className={`block absolute top-1/2 -translate-y-1/2 w-3.5 h-[2px] ${lineBg} ${
                                side === 'L' ? '-right-7' : '-left-7'
                              }`}
                            />
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex flex-col justify-around gap-4">
                      {sliceIdx.map((mi) => (
                        <div key={mi} className="relative">
                          {renderMatch(rd[mi], ri, mi)}
                          <div
                            className={`block absolute top-1/2 -translate-y-1/2 w-7 h-[2px] ${lineBg} ${
                              side === 'L' ? '-right-7' : '-left-7'
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      );
    };

    const fin = rounds[R - 1][0];

    return (
      <div className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-[#F7F7F7]/70 dark:bg-[#1A2A31]/70 p-4 sm:p-6 overflow-x-auto">
        <div className="flex items-stretch justify-center gap-7 min-w-max mx-auto">
          {renderWing('L')}

          {/* Center Final Column */}
          <div className="flex flex-col items-center">
            <div className="mb-3 text-[11px] font-black uppercase tracking-widest text-[#E5B400]">
              {roundNames[R - 1]}
            </div>
            <div className={`flex-1 flex flex-col justify-center items-center ${R === 2 ? 'pt-20' : 'pt-10'}`}>
              <div className="relative">
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 pb-2 pointer-events-none">
                  <div className="scale-90 origin-bottom">
                    <TrophySvg />
                  </div>
                </div>
                {renderMatch(fin, R - 1, 0)}
              </div>
            </div>
          </div>

          {renderWing('R')}
        </div>
      </div>
    );
  };

  if (subPhase === 'setup') {
    return (
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black">Turnamen 1vs1 Lintas Kelas</h1>
          <p className="text-sm font-bold text-[#777777] dark:text-[#9DB0BA]">
            Sistem gugur. Isi nama, pilih kelas, dan avatar tiap pemain. Waktu 15 detik/soal (5 soal per pemain), benar +100, salah −50.
          </p>
        </div>

        <div className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-5">
          <label htmlFor="tour-sz" className="block text-sm font-black mb-2">
            Jumlah Pemain
          </label>
          <select
            id="tour-sz"
            value={size}
            onChange={(e) => setSize(+e.target.value)}
            className="w-full rounded-2xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-[#F7F7F7] dark:bg-[#1A2A31] px-4 py-3 text-base font-bold"
          >
            <option value={4}>4 Pemain</option>
            <option value={8}>8 Pemain</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {formPlayers.slice(0, size).map((p, i) => (
            <div key={i} className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-4 flex flex-col gap-3">
              <div className="text-xs font-black uppercase text-[#777777]">Pemain {i + 1}</div>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={10}
                  value={p.name}
                  onChange={(e) => {
                    const next = formPlayers.slice();
                    next[i] = { ...next[i], name: e.target.value };
                    setFormPlayers(next);
                  }}
                  placeholder="Nama"
                  className="flex-[2] min-w-0 rounded-2xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-[#F7F7F7] dark:bg-[#1A2A31] px-3 py-2.5 text-sm font-bold"
                />
                <select
                  value={p.k}
                  onChange={(e) => {
                    const next = formPlayers.slice();
                    next[i] = { ...next[i], k: e.target.value };
                    setFormPlayers(next);
                  }}
                  aria-label={`Kelas pemain ${i + 1}`}
                  className="flex-1 rounded-2xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-[#F7F7F7] dark:bg-[#1A2A31] px-2.5 py-2.5 text-sm font-bold"
                >
                  {KELAS.map((kl) => (
                    <option key={kl}>{kl}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-6 gap-1.5">
                {AVATARS.map((avCode) => (
                  <button
                    key={avCode}
                    type="button"
                    onClick={() => {
                      const next = formPlayers.slice();
                      next[i] = { ...next[i], av: avCode };
                      setFormPlayers(next);
                    }}
                    className={`duo-btn rounded-xl p-1 border-2 border-b-4 grid place-items-center cursor-pointer ${
                      p.av === avCode
                        ? 'border-[#1CB0F6] bg-[#DDF4FF] dark:bg-[#17384A]'
                        : 'border-[#E5E5E5] dark:border-[#37464F] bg-[#F7F7F7] dark:bg-[#1A2A31]'
                    }`}
                  >
                    <AvatarSvg code={avCode} size={32} />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {formErr && <div className="text-sm font-extrabold text-[#EA2B2B] dark:text-[#FF8A8A]">{formErr}</div>}

        <DuoButton variant="green" size="lg" full onClick={startTournament}>
          Undi Bagan &amp; Mulai
        </DuoButton>
      </div>
    );
  }

  if (subPhase === 'champ' && champ) {
    return (
      <div className="flex flex-col gap-6 text-center">
        <ConfettiOverlay active set={['🏆', '🎉', '🌟', '🏟️']} />
        <div className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-7 flex flex-col items-center gap-3 shadow-[0_6px_0_#E5E5E5] dark:shadow-[0_6px_0_#24363E]">
          <div className="text-6xl">🏆</div>
          <h1 className="text-2xl sm:text-3xl font-black flex items-center justify-center gap-2 flex-wrap">
            <AvatarSvg code={champ.av} size={36} />
            <span>Juara: {champ.name}!</span>
          </h1>
          <p className="text-sm sm:text-base font-bold text-[#4B4B4B] dark:text-[#DCE6EC] max-w-md">
            Selamat kepada {champ.name} dari kelas {champ.k}! Semua peserta sudah bertanding dengan sportif dan penuh semangat.
          </p>
          <CrowdCheer />
        </div>

        {renderBracket()}

        <div className="flex flex-wrap justify-center gap-3">
          <DuoButton
            variant="gold"
            size="lg"
            onClick={() =>
              onCert({
                name: champ.name,
                av: champ.av,
                score: champFinalScore,
                nilai: null,
                time: lastWinTime,
                title: 'Juara Turnamen 1vs1',
                sub: `Kelas ${champ.k} · ${size} pemain lintas kelas`,
                win: true
              })
            }
          >
            <Award className="w-5 h-5" />
            Sertifikat
          </DuoButton>
          <DuoButton variant="green" size="lg" onClick={() => onGo('board')}>
            Papan Skor
          </DuoButton>
          <DuoButton variant="ghost" size="lg" onClick={() => onGo('hub')}>
            Menu Utama
          </DuoButton>
        </div>
      </div>
    );
  }

  const curMatch = rounds[rIdx]?.[mIdx];
  if (!curMatch || !curMatch.a || !curMatch.b) return null;

  const activePlayer = sideTurn === 0 ? curMatch.a : curMatch.b;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-xl sm:text-2xl font-black">{roundNames[rIdx]}</h1>
        <button
          type="button"
          onClick={() => setExitOpen(true)}
          className="duo-btn inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 border-b-4 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] text-xs font-black text-[#EA2B2B] dark:text-[#FF8A8A] cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Keluar
        </button>
      </div>

      {subPhase !== 'play' && renderBracket(subPhase === 'ready' ? [rIdx, mIdx] : undefined)}

      {subPhase === 'ready' && (
        <div className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-6 text-center flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 flex-wrap justify-center font-black text-lg">
            <span className="inline-flex items-center gap-2">
              <AvatarSvg code={curMatch.a.av} size={32} />
              {curMatch.a.name} ({curMatch.a.k})
            </span>
            <span className="text-xs text-[#777777]">VS</span>
            <span className="inline-flex items-center gap-2">
              <AvatarSvg code={curMatch.b.av} size={32} />
              {curMatch.b.name} ({curMatch.b.k})
            </span>
          </div>
          <DuoButton
            variant="green"
            size="lg"
            full
            onClick={() => {
              setMatchQs(pick(specs[rIdx], tourUsedRef.current).map(prep));
              setSideTurn(0);
              setQIdx(0);
              setSideScore(0);
              setSideTime(0);
              setScoreA(null);
              setFb(null);
              setSubPhase('play');
            }}
          >
            Mulai Pertandingan
          </DuoButton>
        </div>
      )}

      {subPhase === 'play' && matchQs[qIdx] && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-3">
            <div className="flex items-center gap-2 font-black text-sm">
              <AvatarSvg code={activePlayer.av} size={28} />
              <span>{activePlayer.name}</span>
              <span className="text-xs text-[#777777]">· Soal {qIdx + 1}/5</span>
            </div>
            <div className="font-mono-num font-black text-sm text-[#58CC02]">Skor {sideScore}</div>
          </div>

          <div className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-6">
            <QuestionRunner
              key={`${rIdx}-${mIdx}-${sideTurn}-${qIdx}`}
              question={matchQs[qIdx]}
              seconds={15}
              feedbackBanner={fb}
              onResult={async (res) => {
                const nextTime = sideTime + res.elapsed;
                const nextSc = sideScore + (res.status === 'correct' ? 100 : -50);
                const insight = getQuestionInsight(matchQs[qIdx]);
                if (res.status === 'correct') {
                  Music.sfx('ok');
                  setFb({ ok: true, text: 'Benar! +100 poin', insight });
                } else {
                  Music.sfx('no');
                  setFb({ ok: false, text: `${res.status === 'wrong' ? 'Belum tepat' : 'Waktu habis'}. −50 poin`, insight });
                }
                setSideScore(nextSc);
                setSideTime(nextTime);

                if (!(await waitSafe(1050))) return;
                setFb(null);

                if (qIdx + 1 < 5) {
                  setQIdx((q) => q + 1);
                } else if (sideTurn === 0) {
                  setScoreA({ sc: nextSc, tTot: nextTime });
                  setSideTurn(1);
                  setQIdx(0);
                  setSideScore(0);
                  setSideTime(0);
                } else if (scoreA) {
                  const A = scoreA;
                  const B = { sc: nextSc, tTot: nextTime };
                  let w = curMatch.a!;
                  let tW = A.tTot;
                  let scW = A.sc;
                  if (B.sc > A.sc || (B.sc === A.sc && B.tTot < A.tTot)) {
                    w = curMatch.b!;
                    tW = B.tTot;
                    scW = B.sc;
                  } else if (B.sc === A.sc && B.tTot === A.tTot && Math.random() < 0.5) {
                    w = curMatch.b!;
                    tW = B.tTot;
                    scW = B.sc;
                  }
                  const nextRounds = rounds.map((rd) => rd.map((m) => ({ ...m })));
                  nextRounds[rIdx][mIdx].w = w;
                  nextRounds[rIdx][mIdx].sa = A.sc;
                  nextRounds[rIdx][mIdx].sb = B.sc;
                  if (rIdx + 1 < nextRounds.length) {
                    const nxt = nextRounds[rIdx + 1][mIdx >> 1];
                    if (mIdx % 2 === 0) nxt.a = w;
                    else nxt.b = w;
                  } else {
                    setChamp(w);
                    setChampFinalScore(scW);
                  }
                  setLastWinTime(tW);
                  setRounds(nextRounds);
                  setSubPhase('match-done');
                }
              }}
            />
          </div>
        </div>
      )}

      {subPhase === 'match-done' && curMatch.w && (
        <div className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-6 text-center flex flex-col items-center gap-3">
          <h2 className="text-xl font-black flex items-center gap-2">
            <span>Pemenang:</span>
            <AvatarSvg code={curMatch.w.av} size={28} />
            <span>
              {curMatch.w.name} ({curMatch.w.k})
            </span>
          </h2>
          <p className="text-sm font-bold text-[#777777] dark:text-[#9DB0BA]">
            Skor {curMatch.a.name} {curMatch.sa} · {curMatch.b.name} {curMatch.sb}. Semangat terus untuk{' '}
            {(curMatch.w === curMatch.a ? curMatch.b : curMatch.a).name}!
          </p>
          <DuoButton
            variant="green"
            size="md"
            onClick={() => {
              if (mIdx + 1 < rounds[rIdx].length) {
                setMIdx((m) => m + 1);
                setSubPhase('ready');
              } else if (rIdx + 1 < rounds.length) {
                const nextR = rIdx + 1;
                if (bgm[nextR] === 4) unlockKey('t4');
                Music.auto(bgm[nextR]);
                setRIdx(nextR);
                setMIdx(0);
                setSubPhase('ready');
              } else {
                onInGameChange(false);
                Music.auto(5);
                unlockKey('t5');
                unlockKey('epilog');
                Music.sfx('win');
                later(() => Music.sfx('cheer'), 1400);
                const finalWinner = curMatch.w!;
                const finalSc = finalWinner === curMatch.b ? curMatch.sb ?? champFinalScore : curMatch.sa ?? champFinalScore;
                setChampFinalScore(finalSc);
                boardAdd('regu', {
                  name: finalWinner.name,
                  av: finalWinner.av,
                  score: finalSc,
                  time: lastWinTime,
                  mode: `Juara Turnamen (${finalWinner.k}) · Skor ${finalSc}`
                });
                setChamp(finalWinner);
                setSubPhase('champ');
              }
            }}
          >
            Lanjut
            <ChevronRight className="w-4 h-4" />
          </DuoButton>
        </div>
      )}

      <ConfirmModal
        open={exitOpen}
        title="Keluar dari Turnamen?"
        message="Bagan dan progres turnamen yang sedang berjalan akan dihentikan."
        onCancel={() => setExitOpen(false)}
        onConfirm={() => {
          setExitOpen(false);
          onInGameChange(false);
          onGo('hub');
        }}
      />
    </div>
  );
};
