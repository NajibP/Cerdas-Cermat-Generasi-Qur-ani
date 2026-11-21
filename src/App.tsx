import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Home, Trophy, BookOpen, Mail, Wrench, Settings, Sun, Moon, Lock, Swords } from 'lucide-react';
import { Music } from './utils/audio';
import { boardGet, CertData, isBundleUsed, isOpen, lockBundle, store } from './utils/helpers';
import { MusicWidget, OptionsModal } from './components/DuoUi';
import { OfflineIndicator, PWAInstallButton } from './components/PwaUi';
import { AvatarSvg, MascotSvg } from './components/Svgs';
import { GateScreen, OpeningScreen, PrologScreen } from './screens/GateAndIntro';
import {
  BundleGameScreen,
  HubScreen,
  KeysScreen,
  LatihanScreen,
  PengajarScreen,
  PesertaListScreen,
  ResultScreen,
  ScreenName,
  SessionState,
  SetupPlayerScreen,
  UmumListScreen
} from './screens/HubAndLearning';
import { BossScreen, ReguScreen, TurnamenScreen } from './screens/BossAndArena';
import { AdminScreen, BoardScreen, CertScreen, EpilogScreen } from './screens/BoardCertAdminEpilog';

function getSessionFlag(key: string): boolean {
  try {
    return typeof sessionStorage !== 'undefined' && sessionStorage.getItem(key) === '1';
  } catch {
    return false;
  }
}

function setSessionFlag(key: string, val: boolean) {
  try {
    if (typeof sessionStorage === 'undefined') return;
    if (val) sessionStorage.setItem(key, '1');
    else sessionStorage.removeItem(key);
  } catch {}
}

function getInitialDark(): boolean {
  const saved = store.get<string | null>('theme', null);
  if (saved === 'dark') return true;
  if (saved === 'light') return false;
  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export default function App() {
  const [authed, setAuthed] = useState<boolean>(() => getSessionFlag('ccgq:authed'));
  const [adminAuthed, setAdminAuthed] = useState<boolean>(() => getSessionFlag('ccgq:admin_authed'));
  const [screen, setScreen] = useState<ScreenName>(() => (getSessionFlag('ccgq:authed') ? 'hub' : 'gate'));
  const [inGame, setInGame] = useState(false);
  const [lockedIn, setLockedIn] = useState(false);
  const [isReplayProlog, setIsReplayProlog] = useState(false);
  const [sess, setSess] = useState<SessionState | null>(null);
  const [cert, setCert] = useState<CertData | null>(null);
  const [dark, setDark] = useState<boolean>(getInitialDark);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [, setLockVersion] = useState(0);

  const usedIdsRef = useRef<Set<string>>(new Set());
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  }, [dark]);

  const toggleTheme = useCallback(() => {
    setDark((prev) => {
      const next = !prev;
      store.set('theme', next ? 'dark' : 'light');
      return next;
    });
  }, []);

  const toast = useCallback((m: string) => {
    setToastMsg(m);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToastMsg(null), 2600);
  }, []);

  const go = useCallback(
    (target: ScreenName) => {
      if (!authed && target !== 'gate') {
        setScreen('gate');
        return;
      }
      if (inGame) {
        toast('Selesaikan permainan dulu atau klik Keluar');
        return;
      }
      if (target === 'epilog' && !isOpen('epilog')) {
        toast('Epilog masih terkunci');
        return;
      }
      if (lockedIn && !/^(umum|cert)/.test(target)) {
        toast('Selesaikan 2 bundle Umum dulu ya');
        return;
      }
      window.scrollTo(0, 0);
      if (target === 'prolog-r') {
        setIsReplayProlog(true);
        setScreen('prolog');
        return;
      }
      setScreen(target);
    },
    [authed, inGame, lockedIn, toast]
  );

  const hideShell = screen === 'gate' || screen === 'prolog' || screen === 'opening';
  const epilogOpen = isOpen('epilog');
  const board = boardGet();
  const top3 = board.peserta.slice(0, 3);

  const navItems: Array<{ id: ScreenName; label: string; icon: React.ReactNode; locked?: boolean }> = [
    { id: 'hub', label: 'Belajar', icon: <Home className="w-5 h-5" /> },
    { id: 'board', label: 'Papan Skor', icon: <Trophy className="w-5 h-5" /> },
    { id: 'prolog-r', label: 'Prolog', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'epilog', label: 'Epilog', icon: epilogOpen ? <Mail className="w-5 h-5" /> : <Lock className="w-5 h-5" />, locked: !epilogOpen },
    { id: 'admin', label: 'Admin', icon: <Wrench className="w-5 h-5" /> }
  ];

  const renderMain = () => {
    switch (screen) {
      case 'gate':
        return (
          <GateScreen
            onAuthSuccess={() => {
              setAuthed(true);
              setSessionFlag('ccgq:authed', true);
              setIsReplayProlog(false);
              setScreen('prolog');
            }}
          />
        );
      case 'prolog':
        return (
          <PrologScreen
            isReplay={isReplayProlog}
            onFinish={() => {
              if (isReplayProlog) {
                setIsReplayProlog(false);
                go('hub');
              } else {
                setScreen('opening');
              }
            }}
          />
        );
      case 'opening':
        return (
          <OpeningScreen
            onStart={() => setScreen('hub')}
            onOpenOptions={() => setOptionsOpen(true)}
          />
        );
      case 'hub':
        return <HubScreen onGo={go} onToast={toast} />;
      case 'practice':
        return <LatihanScreen onInGameChange={setInGame} onGo={go} />;
      case 'cat-pengajar':
        return <PengajarScreen onUnlock={() => setScreen('keys')} />;
      case 'keys':
        return <KeysScreen />;
      case 'cat-peserta':
        return (
          <SetupPlayerScreen
            kind="peserta"
            onContinue={(name, av) => {
              setSess({ kind: 'peserta', name, av, done: [], score: 0, correct: 0, total: 0, time: 0, streak: 0, frenzy: 0 });
              setScreen('pes-list');
            }}
          />
        );
      case 'cat-umum':
        return (
          <SetupPlayerScreen
            kind="umum"
            onContinue={(name, av) => {
              setLockedIn(false);
              setSess({ kind: 'umum', name, av, done: [], score: 0, correct: 0, total: 0, time: 0, streak: 0, frenzy: 0 });
              setScreen('umum-list');
            }}
          />
        );
      case 'pes-list':
        return sess ? (
          <PesertaListScreen
            sess={sess}
            onToast={toast}
            onPickBundle={(idx) => {
              if (isBundleUsed('peserta', idx)) return;
              setSess({ ...sess, cur: idx });
              setInGame(true);
              setScreen('pes-game');
            }}
          />
        ) : null;
      case 'umum-list':
        return sess ? (
          <UmumListScreen
            sess={sess}
            onToast={toast}
            onPickBundle={(idx) => {
              if (sess.done.includes(idx) || isBundleUsed('umum', idx)) return;
              setSess({ ...sess, cur: idx });
              setInGame(true);
              setScreen('umum-game');
            }}
          />
        ) : null;
      case 'pes-game':
      case 'umum-game':
        return sess ? (
          <BundleGameScreen
            key={`${screen}-${sess.cur}-${sess.done.length}`}
            sess={sess}
            usedIds={usedIdsRef.current}
            onFirstAnswer={() => {
              lockBundle(sess.kind, sess.cur ?? 0);
              if (sess.kind === 'umum') setLockedIn(true);
            }}
            onUpdateSess={(next) => setSess(next)}
            onToast={toast}
            onExit={() => {
              setInGame(false);
              setLockedIn(false);
              toast('Keluar dari permainan');
              setScreen('hub');
            }}
            onFinishBundle={(finalSess) => {
              setInGame(false);
              if (finalSess.kind === 'peserta') {
                setSess(finalSess);
                setScreen('pes-res');
              } else {
                const updated: SessionState = {
                  ...finalSess,
                  done: [...finalSess.done, finalSess.cur ?? 0]
                };
                setSess(updated);
                if (updated.done.length < 2) {
                  toast('Bundle selesai! Kartu Hikmah terisi lagi. Pilih 1 bundle lagi.');
                  setScreen('umum-list');
                } else {
                  setLockedIn(false);
                  setScreen('umum-res');
                }
              }
            }}
          />
        ) : null;
      case 'pes-res':
        return sess ? (
          <ResultScreen
            kind="peserta"
            sess={sess}
            onCert={(c) => {
              setCert(c);
              setScreen('cert');
            }}
            onGo={go}
          />
        ) : null;
      case 'umum-res':
        return sess ? (
          <ResultScreen
            kind="umum"
            sess={sess}
            onCert={(c) => {
              setCert(c);
              setScreen('cert');
            }}
            onGo={go}
          />
        ) : null;
      case 'boss':
        return (
          <BossScreen
            usedIds={usedIdsRef.current}
            onInGameChange={setInGame}
            onCert={(c) => {
              setCert(c);
              setScreen('cert');
            }}
            onGo={go}
            onToast={toast}
          />
        );
      case 'regu':
        return (
          <ReguScreen
            usedIds={usedIdsRef.current}
            onInGameChange={setInGame}
            onCert={(c) => {
              setCert(c);
              setScreen('cert');
            }}
            onGo={go}
            onToast={toast}
          />
        );
      case 'turnamen':
        return (
          <TurnamenScreen
            onInGameChange={setInGame}
            onCert={(c) => {
              setCert(c);
              setScreen('cert');
            }}
            onGo={go}
          />
        );
      case 'board':
        return <BoardScreen onGo={go} />;
      case 'cert':
        return <CertScreen cert={cert} onGo={go} onToast={toast} />;
      case 'admin':
        return (
          <AdminScreen
            authed={adminAuthed}
            onAuth={() => {
              setAdminAuthed(true);
              setSessionFlag('ccgq:admin_authed', true);
            }}
            onLocksChanged={() => setLockVersion((v) => v + 1)}
            onToast={toast}
          />
        );
      case 'epilog':
        return <EpilogScreen onGo={go} onToast={toast} />;
      default:
        return <HubScreen onGo={go} onToast={toast} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#131F24] bg-edu-canvas text-[#3C3C3C] dark:text-[#F1F7F9]">
      {hideShell ? (
        renderMain()
      ) : (
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row min-h-screen">
          {/* Desktop Left Sidebar (Duolingo iconic rail) */}
          <aside className="hidden lg:flex lg:w-64 xl:w-72 shrink-0 flex-col justify-between bg-white/85 dark:bg-[#131F24]/90 backdrop-blur-xs border-r-2 border-[#E5E5E5] dark:border-[#37464F] p-5 sticky top-0 h-screen">
            <div className="flex flex-col gap-6">
              <button
                type="button"
                onClick={() => go('hub')}
                className="flex items-center gap-3 text-left cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#58CC02] border-b-4 border-[#58A700] grid place-items-center text-white font-black text-base shrink-0">
                  CC
                </div>
                <span className="font-black text-xl tracking-tight text-[#58CC02] whitespace-nowrap">
                  Generasi Qur&apos;ani
                </span>
              </button>

              <nav className="flex flex-col gap-2" aria-label="Navigasi utama">
                {navItems.map((item) => {
                  const active =
                    screen === item.id ||
                    (item.id === 'hub' &&
                      /^(cat-|pes-|umum-|practice|boss|regu|turnamen|keys|cert)/.test(screen));
                  return (
                    <button
                      key={item.id}
                      type="button"
                      disabled={inGame}
                      onClick={() => go(item.id)}
                      className={`duo-btn flex items-center gap-3.5 px-4 py-3 rounded-2xl border-2 font-black text-sm uppercase tracking-wider text-left transition-colors cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed whitespace-nowrap ${
                        item.locked
                          ? 'border-transparent text-[#777777] opacity-55'
                          : active
                          ? 'bg-[#DDF4FF] dark:bg-[#17384A] border-[#84D8FF] dark:border-[#1CB0F6] text-[#1899D6] dark:text-[#6AD1FF]'
                          : 'border-transparent hover:bg-[#F7F7F7] dark:hover:bg-[#1F2F36] text-[#777777] dark:text-[#9DB0BA]'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="flex flex-col gap-2.5">
              <PWAInstallButton compact />
              <button
                type="button"
                onClick={() => setOptionsOpen(true)}
                className="duo-btn flex items-center gap-3 px-4 py-3 rounded-2xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-[#F7F7F7] dark:bg-[#1A2A31] hover:border-[#1CB0F6] font-black text-sm text-[#4B4B4B] dark:text-[#DCE6EC] cursor-pointer"
              >
                <Settings className="w-5 h-5 text-[#1CB0F6]" />
                <span>Opsi &amp; Suara</span>
              </button>
            </div>
          </aside>

          {/* Mobile Compact Header (<15% viewport height) */}
          <header className="lg:hidden sticky top-0 z-30 bg-white/95 dark:bg-[#131F24]/95 backdrop-blur-xs border-b-2 border-[#E5E5E5] dark:border-[#37464F] px-3 py-2">
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => go('hub')}
                className="flex items-center gap-2 font-black text-base text-[#58CC02] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span className="px-2 py-0.5 rounded-lg bg-[#58CC02] text-white text-xs font-black">CC</span>
                <span>Generasi Qur&apos;ani</span>
              </button>

              <div className="flex items-center gap-1.5 overflow-x-auto">
                {navItems.map((item) => {
                  const active = screen === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      disabled={inGame}
                      onClick={() => go(item.id)}
                      aria-label={item.label}
                      title={item.label}
                      className={`p-2 rounded-xl border-2 text-xs font-black whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-45 ${
                        active
                          ? 'bg-[#DDF4FF] dark:bg-[#17384A] border-[#1CB0F6] text-[#1899D6] dark:text-[#6AD1FF]'
                          : 'border-[#E5E5E5] dark:border-[#37464F] text-[#777777] dark:text-[#9DB0BA]'
                      }`}
                    >
                      {item.icon}
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => setOptionsOpen(true)}
                  aria-label="Opsi"
                  className="p-2 rounded-xl border-2 border-[#E5E5E5] dark:border-[#37464F] text-[#777777] dark:text-[#9DB0BA] shrink-0 cursor-pointer"
                >
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </header>

          {/* Center Learning Stage */}
          <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-6 pb-16">
            <motion.div
              key={screen}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl mx-auto"
            >
              {renderMain()}
            </motion.div>
          </main>

          {/* Desktop Right Sidebar (Theme, Audio, Top 3 League Snapshot) */}
          <aside className="hidden xl:flex xl:w-80 shrink-0 flex-col gap-5 p-5 bg-white/70 dark:bg-[#131F24]/85 border-l-2 border-[#E5E5E5] dark:border-[#37464F]">
            {/* Theme & Quick Status */}
            <div className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                {dark ? <Moon className="w-5 h-5 text-[#CE82FF]" /> : <Sun className="w-5 h-5 text-[#FFC800]" />}
                <span className="font-black text-sm">{dark ? 'Mode Malam' : 'Mode Siang'}</span>
              </div>
              <button
                type="button"
                onClick={toggleTheme}
                role="switch"
                aria-checked={dark}
                className="duo-btn px-3 py-1.5 rounded-xl border-2 border-b-4 border-[#E5E5E5] dark:border-[#37464F] bg-[#F7F7F7] dark:bg-[#1A2A31] text-xs font-black cursor-pointer whitespace-nowrap"
              >
                {dark ? 'Terang' : 'Gelap'}
              </button>
            </div>

            {/* Music Controller */}
            <MusicWidget compact onLockedToast={toast} />

            {/* Top 3 Peserta Snapshot */}
            <div className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-sm uppercase tracking-wider text-[#777777] dark:text-[#9DB0BA]">
                  3 Besar Peserta
                </h3>
                <button
                  type="button"
                  disabled={inGame}
                  onClick={() => go('board')}
                  className="text-xs font-black text-[#1CB0F6] hover:underline cursor-pointer disabled:opacity-40"
                >
                  Semua
                </button>
              </div>

              {top3.length === 0 ? (
                <div className="flex items-center gap-3 py-2">
                  <MascotSvg size={48} />
                  <p className="text-xs font-bold text-[#777777] dark:text-[#9DB0BA]">
                    Belum ada pahlawan Peserta di papan skor. Ayo jadi yang pertama!
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {top3.map((p, i) => (
                    <div
                      key={`${p.name}-${p.at}`}
                      className="flex items-center gap-2.5 p-2 rounded-2xl bg-[#F7F7F7] dark:bg-[#1A2A31]"
                    >
                      <span className="text-base w-6 text-center">{['🥇', '🥈', '🥉'][i]}</span>
                      <AvatarSvg code={p.av} size={28} />
                      <span className="font-extrabold text-sm truncate flex-1">{p.name}</span>
                      <span className="font-mono-num font-black text-xs text-[#58CC02]">{p.score}</span>
                    </div>
                  ))}
                </div>
              )}

              {isOpen('boss') && (
                <button
                  type="button"
                  disabled={inGame}
                  onClick={() => go('boss')}
                  className="duo-btn w-full mt-1 py-2.5 px-3 rounded-2xl bg-[#FF4B4B] text-white border-b-4 border-[#EA2B2B] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-45"
                >
                  <Swords className="w-4 h-4" />
                  Tantang Final Boss
                </button>
              )}
            </div>
          </aside>
        </div>
      )}

      <OptionsModal
        open={optionsOpen}
        dark={dark}
        onToggleTheme={toggleTheme}
        onClose={() => setOptionsOpen(false)}
        onToast={toast}
      />

      <OfflineIndicator />

      {toastMsg && (
        <div
          role="status"
          className="fixed left-1/2 -translate-x-1/2 bottom-6 z-50 px-5 py-3 rounded-2xl bg-[#3C3C3C] dark:bg-[#F1F7F9] text-white dark:text-[#131F24] font-black text-sm shadow-lg max-w-[90vw] text-center"
        >
          {toastMsg}
        </div>
      )}
    </div>
  );
}
