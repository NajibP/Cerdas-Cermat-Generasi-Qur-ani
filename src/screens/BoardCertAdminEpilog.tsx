import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Download, Lock, Plus, RotateCcw, Send, Trash2, Trophy, Unlock, Upload } from 'lucide-react';
import { BankCode, ChatEntry, Question, TEACHER_PW, Tier, TIER_L } from '../data/bank';
import { Music } from '../utils/audio';
import {
  boardGet,
  CertData,
  cleanName,
  exportAppBackup,
  fmtT,
  fmtTimeAgo,
  getChatList,
  getCustomQuestions,
  getLocks,
  importAppBackup,
  isOpen,
  LockKey,
  makeCertPNG,
  resetUsedBundles,
  saveChatList,
  saveCustomQuestions,
  setLockState,
  store
} from '../utils/helpers';
import { DuoButton, MusicWidget } from '../components/DuoUi';
import { AvatarSvg } from '../components/Svgs';
import { ScreenName } from './HubAndLearning';

export const BoardScreen: React.FC<{ onGo: (s: ScreenName) => void }> = ({ onGo }) => {
  const [tab, setTab] = useState<'peserta' | 'umum' | 'regu'>('peserta');
  const b = boardGet();
  const rows = b[tab];
  const bossReady = tab === 'peserta' && rows.length >= 3;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black">Papan Skor</h1>
        <p className="text-sm font-bold text-[#777777] dark:text-[#9DB0BA]">
          Skor tertinggi di atas; jika sama, waktu tersingkat lebih dulu.
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-[#F7F7F7] dark:bg-[#1A2A31] border-2 border-[#E5E5E5] dark:border-[#37464F]">
        {(
          [
            ['peserta', 'Peserta'],
            ['umum', 'Umum'],
            ['regu', 'Regu & Boss']
          ] as const
        ).map(([k, label]) => (
          <button
            key={k}
            type="button"
            onClick={() => setTab(k)}
            className={`flex-1 min-w-[100px] px-3 py-2 rounded-xl text-xs sm:text-sm font-black transition-colors cursor-pointer whitespace-nowrap ${
              tab === k
                ? 'bg-white dark:bg-[#24363E] text-[#1CB0F6] shadow-xs'
                : 'text-[#777777] dark:text-[#9DB0BA] hover:text-[#3C3C3C] dark:hover:text-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab !== 'regu' && rows.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {rows.slice(0, 3).map((e, i) => {
            const rankStyles = [
              'border-[#FFC800] bg-[#FFFDF0] dark:bg-[#2B2308]',
              'border-[#CBD5E1] dark:border-[#64748B] bg-[#F8FAFC] dark:bg-[#1C2A32]',
              'border-[#FDBA74] dark:border-[#9A3412] bg-[#FFF7ED] dark:bg-[#2B1D14]'
            ];
            return (
              <div
                key={`top-${e.name}-${e.at}-${i}`}
                className={`rounded-2xl border-2 border-b-4 p-4 flex items-center gap-3 ${rankStyles[i]}`}
              >
                <div className="text-2xl shrink-0">{['🥇', '🥈', '🥉'][i]}</div>
                <AvatarSvg code={e.av} size={38} />
                <div className="min-w-0 flex-1">
                  <div className="font-black text-sm truncate">{e.name}</div>
                  <div className="text-xs font-mono-num font-bold text-[#777777] dark:text-[#9DB0BA]">
                    {e.score} pt · {e.nilai != null ? `${e.nilai}%` : '—'} · {fmtT(e.time)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-[#E5E5E5] dark:border-[#37464F] text-xs font-black uppercase tracking-wider text-[#777777] dark:text-[#9DB0BA]">
              <th className="py-3.5 px-4">#</th>
              <th className="py-3.5 px-4">Nama</th>
              <th className="py-3.5 px-4">{tab === 'regu' ? 'Keterangan' : 'Skor'}</th>
              {tab !== 'regu' && (
                <>
                  <th className="py-3.5 px-4">Nilai</th>
                  <th className="py-3.5 px-4">Waktu</th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="font-mono-num text-sm font-bold">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-[#777777] dark:text-[#9DB0BA] font-sans">
                  Belum ada data peringkat.
                </td>
              </tr>
            ) : (
              rows.map((e, i) => (
                <tr
                  key={`${e.name}-${e.at}-${i}`}
                  className={`border-b border-[#E5E5E5] dark:border-[#37464F] last:border-b-0 ${
                    tab !== 'regu' && e.score < 0 ? 'text-[#EA2B2B] dark:text-[#FF8A8A]' : ''
                  }`}
                >
                  <td className="py-3 px-4 font-black text-base">
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}
                  </td>
                  <td className="py-3 px-4 font-sans font-extrabold">
                    <div className="flex items-center gap-2.5">
                      <AvatarSvg code={e.av} size={28} />
                      <span>{e.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">{tab === 'regu' ? e.mode || '' : e.score}</td>
                  {tab !== 'regu' && (
                    <>
                      <td className="py-3 px-4">{e.nilai != null ? `${e.nilai}%` : ''}</td>
                      <td className="py-3 px-4">{fmtT(e.time)}</td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {bossReady && (
        <div className="rounded-3xl border-2 border-[#FF4B4B] bg-[#FFF2F2] dark:bg-[#351B1F] p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-black text-base text-[#EA2B2B] dark:text-[#FF8A8A]">
            3 peringkat teratas siap menghadapi Final Boss!
          </div>
          <DuoButton variant="red" size="md" onClick={() => onGo('boss')}>
            😈 Tantang Final Boss
          </DuoButton>
        </div>
      )}
    </div>
  );
};

export const CertScreen: React.FC<{
  cert: CertData | null;
  onGo: (s: ScreenName) => void;
  onToast: (m: string) => void;
}> = ({ cert, onGo, onToast }) => {
  useEffect(() => {
    if (!cert) {
      onToast('Selesaikan permainan dulu untuk mendapat sertifikat');
      onGo('hub');
    }
  }, [cert, onGo, onToast]);

  const url = useMemo(() => (cert ? makeCertPNG(cert) : ''), [cert]);
  if (!cert) return null;

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-5 text-center">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black">Sertifikat Penghargaan</h1>
        <p className="text-sm font-bold text-[#777777] dark:text-[#9DB0BA]">Simpan gambarmu sebagai kenang-kenangan.</p>
      </div>

      <div className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] overflow-hidden bg-white p-2 shadow-[0_6px_0_#E5E5E5] dark:shadow-[0_6px_0_#24363E]">
        <img src={url} alt={`Sertifikat untuk ${cert.name}`} className="w-full h-auto rounded-2xl block" />
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <a
          download={`sertifikat-${cert.name.toLowerCase().replace(/\s+/g, '-')}.png`}
          href={url}
          className="duo-btn inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base min-h-[52px] rounded-2xl font-black uppercase tracking-wide bg-[#FFC800] text-[#5A4300] border-b-4 border-[#E5B400] hover:brightness-105"
        >
          <Download className="w-5 h-5" />
          Unduh PNG
        </a>
        <DuoButton variant="ghost" size="lg" onClick={() => onGo('hub')}>
          Menu Utama
        </DuoButton>
      </div>
    </div>
  );
};

export const AdminScreen: React.FC<{
  authed: boolean;
  onAuth: () => void;
  onLocksChanged: () => void;
  onToast: (m: string) => void;
}> = ({ authed, onAuth, onLocksChanged, onToast }) => {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [msg, setMsg] = useState('');
  const [, setTick] = useState(0);

  const [customList, setCustomList] = useState<Question[]>(() => getCustomQuestions());
  const [qBank, setQBank] = useState<BankCode>('A');
  const [qTier, setQTier] = useState<Tier>('mudah');
  const [qText, setQText] = useState('');
  const [qOpts, setQOpts] = useState<[string, string, string, string]>(['', '', '', '']);
  const [qAns, setQAns] = useState<number>(0);
  const [qExp, setQExp] = useState('');
  const [qErr, setQErr] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!authed) {
    return (
      <div className="max-w-lg mx-auto flex flex-col gap-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black">Panel Admin</h1>
          <p className="text-sm font-bold text-[#777777] dark:text-[#9DB0BA]">Masukkan kata sandi pengajar.</p>
        </div>
        <div className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (pw === TEACHER_PW) onAuth();
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
              className="w-full rounded-2xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-[#F7F7F7] dark:bg-[#1A2A31] px-4 py-3 text-base font-bold"
            />
            {err && <div className="text-sm font-extrabold text-[#EA2B2B] dark:text-[#FF8A8A]">{err}</div>}
            <DuoButton type="submit" variant="green" size="lg" full>
              Masuk Admin
            </DuoButton>
          </form>
        </div>
      </div>
    );
  }

  const L = getLocks();
  const items: [LockKey, string][] = [
    ['all', 'Buka semua kunci'],
    ['t4', 'Musik Track 4'],
    ['t5', 'Musik Track 5'],
    ['boss', 'Final Boss: Iblis'],
    ['epilog', 'Halaman Epilog']
  ];

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black">Panel Admin</h1>
        <p className="text-sm font-bold text-[#777777] dark:text-[#9DB0BA]">Kelola musik, kunci fitur, dan data permainan.</p>
      </div>

      <div className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-5 flex flex-col gap-3">
        <h2 className="text-lg font-black">Musik &amp; Volume</h2>
        <MusicWidget onLockedToast={onToast} />
      </div>

      <div className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-5 flex flex-col gap-2">
        <h2 className="text-lg font-black mb-1">Kunci Konten</h2>
        {items.map(([k, label]) => {
          const on = !!(L.all || L[k]);
          return (
            <div
              key={k}
              className="flex items-center justify-between gap-4 py-2.5 border-b border-[#E5E5E5] dark:border-[#37464F] last:border-b-0"
            >
              <span className="font-extrabold text-sm sm:text-base">{label}</span>
              <button
                type="button"
                role="switch"
                aria-checked={on}
                onClick={() => {
                  setLockState(k, !on);
                  onLocksChanged();
                  setTick((t) => t + 1);
                  onToast(`${!on ? 'Dibuka' : 'Dikunci'}: ${label}`);
                }}
                className={`duo-btn px-3.5 py-1.5 rounded-xl border-2 border-b-4 text-xs font-black cursor-pointer whitespace-nowrap ${
                  on
                    ? 'bg-[#D7FFB8] dark:bg-[#24400F] border-[#58CC02] text-[#3F8F00] dark:text-[#89E219]'
                    : 'bg-[#F7F7F7] dark:bg-[#1A2A31] border-[#E5E5E5] dark:border-[#37464F] text-[#777777]'
                }`}
              >
                {on ? 'Terbuka' : 'Terkunci'}
              </button>
            </div>
          );
        })}
      </div>

      <div className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-5 flex flex-col gap-3">
        <h2 className="text-lg font-black">Hapus &amp; Reset Data</h2>
        <p className="text-xs sm:text-sm font-bold text-[#777777] dark:text-[#9DB0BA]">
          Gunakan jika ada peserta yang keluar sebelum selesai atau papan skor perlu dirapikan.
        </p>
        <div className="flex flex-wrap gap-2.5">
          <DuoButton
            variant="ghost"
            size="sm"
            onClick={() => {
              resetUsedBundles();
              setMsg('Semua bundle terpilih sudah dibuka kembali.');
            }}
          >
            <RotateCcw className="w-4 h-4" />
            Buka Ulang Bundle
          </DuoButton>
          <DuoButton
            variant="red"
            size="sm"
            onClick={() => {
              store.set('board', { peserta: [], umum: [], regu: [] });
              onLocksChanged();
              setTick((t) => t + 1);
              setMsg('Papan skor dikosongkan.');
            }}
          >
            <Trash2 className="w-4 h-4" />
            Kosongkan Papan Skor
          </DuoButton>
          <DuoButton
            variant="red"
            size="sm"
            onClick={() => {
              store.set('board', { peserta: [], umum: [], regu: [] });
              store.set('locks', {});
              resetUsedBundles();
              onLocksChanged();
              setTick((t) => t + 1);
              setMsg('Semua data direset.');
            }}
          >
            Reset Semua Data
          </DuoButton>
        </div>
        {msg && <div className="text-sm font-extrabold text-[#46A302] dark:text-[#89E219]">{msg}</div>}
      </div>

      <div className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-5 flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-black">Kelola Soal Kustom ({customList.length})</h2>
            <p className="text-xs sm:text-sm font-bold text-[#777777] dark:text-[#9DB0BA]">
              Tambahkan soal buatan pengajar langsung ke bank soal, latihan mandiri, dan mode permainan.
            </p>
          </div>
          {customList.length > 0 && (
            <DuoButton
              variant="red"
              size="sm"
              onClick={() => {
                saveCustomQuestions([]);
                setCustomList([]);
                onLocksChanged();
                onToast('Semua soal kustom dihapus');
              }}
            >
              <Trash2 className="w-3.5 h-3.5" />
              Hapus Semua
            </DuoButton>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const cleanQ = qText.trim();
            const cleanO = qOpts.map((o) => o.trim());
            if (!cleanQ) {
              setQErr('Pertanyaan wajib diisi.');
              return;
            }
            if (cleanO.some((o) => !o)) {
              setQErr('Keempat pilihan jawaban (A–D) harus diisi.');
              return;
            }
            setQErr('');
            const item: Question = {
              id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
              b: qBank,
              n: 51 + customList.length,
              t: qTier,
              q: cleanQ,
              o: cleanO,
              a: qAns,
              e: qExp.trim() || undefined,
              custom: true
            };
            const next = [item, ...customList];
            saveCustomQuestions(next);
            setCustomList(next);
            setQText('');
            setQOpts(['', '', '', '']);
            setQAns(0);
            setQExp('');
            onLocksChanged();
            Music.sfx('ok');
            onToast('Soal kustom berhasil ditambahkan!');
          }}
          className="flex flex-col gap-3 rounded-2xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-[#F7F7F7] dark:bg-[#1A2A31] p-4"
        >
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-xs font-black uppercase text-[#777777] mb-1">Bank</label>
              <select
                value={qBank}
                onChange={(e) => setQBank(e.target.value as BankCode)}
                className="w-full rounded-xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] px-3 py-2 text-sm font-bold"
              >
                <option value="A">Bank A</option>
                <option value="B">Bank B</option>
                <option value="C">Bank C</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-black uppercase text-[#777777] mb-1">Tingkat</label>
              <select
                value={qTier}
                onChange={(e) => setQTier(e.target.value as Tier)}
                className="w-full rounded-xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] px-3 py-2 text-sm font-bold"
              >
                <option value="mudah">Mudah</option>
                <option value="sedang">Sedang</option>
                <option value="sulit">Sulit</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-[#777777] mb-1">Pertanyaan</label>
            <textarea
              value={qText}
              onChange={(e) => setQText(e.target.value)}
              placeholder="Tulis pertanyaan cerdas cermat di sini..."
              className="w-full min-h-[76px] rounded-xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] px-3 py-2 text-sm font-bold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[0, 1, 2, 3].map((idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setQAns(idx)}
                  title="Tandai sebagai kunci jawaban benar"
                  className={`w-8 h-9 rounded-xl border-2 font-black text-xs shrink-0 cursor-pointer ${
                    qAns === idx
                      ? 'bg-[#58CC02] border-[#58A700] text-white'
                      : 'bg-white dark:bg-[#1F2F36] border-[#E5E5E5] dark:border-[#37464F] text-[#777777]'
                  }`}
                >
                  {'ABCD'[idx]}
                </button>
                <input
                  type="text"
                  value={qOpts[idx]}
                  onChange={(e) => {
                    const next: [string, string, string, string] = [...qOpts] as [string, string, string, string];
                    next[idx] = e.target.value;
                    setQOpts(next);
                  }}
                  placeholder={`Pilihan ${'ABCD'[idx]}${qAns === idx ? ' (Benar)' : ''}`}
                  className="flex-1 min-w-0 rounded-xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] px-3 py-2 text-sm font-bold"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-[#777777] mb-1">
              Hikmah / Pembahasan (opsional)
            </label>
            <input
              type="text"
              value={qExp}
              onChange={(e) => setQExp(e.target.value)}
              placeholder="Penjelasan singkat setelah menjawab..."
              className="w-full rounded-xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] px-3 py-2 text-sm font-bold"
            />
          </div>

          {qErr && <div className="text-xs font-extrabold text-[#EA2B2B] dark:text-[#FF8A8A]">{qErr}</div>}

          <DuoButton type="submit" variant="green" size="md">
            <Plus className="w-4 h-4" />
            Tambah Soal Kustom
          </DuoButton>
        </form>

        {customList.length > 0 && (
          <div className="flex flex-col gap-2 max-h-[280px] overflow-y-auto pr-1">
            {customList.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-[#F7F7F7] dark:bg-[#1A2A31] p-3 flex items-start justify-between gap-3"
              >
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-[11px] font-black">
                    <span className="px-2 py-0.5 rounded-lg bg-[#DDF4FF] dark:bg-[#17384A] text-[#1480B5] dark:text-[#6AD1FF]">
                      Bank {item.b}
                    </span>
                    <span className="px-2 py-0.5 rounded-lg bg-[#D7FFB8] dark:bg-[#24400F] text-[#3F8F00] dark:text-[#89E219]">
                      {TIER_L[item.t]}
                    </span>
                  </div>
                  <div className="text-sm font-extrabold">{item.q}</div>
                  <div className="text-xs font-bold text-[#46A302] dark:text-[#89E219]">
                    Kunci ({'ABCD'[item.a]}): {item.o[item.a]}
                  </div>
                  {item.e && <div className="text-xs font-bold text-[#777777] dark:text-[#9DB0BA]">Hikmah: {item.e}</div>}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const next = customList.filter((x) => x.id !== item.id);
                    saveCustomQuestions(next);
                    setCustomList(next);
                    onLocksChanged();
                    onToast('Soal kustom dihapus');
                  }}
                  aria-label="Hapus soal kustom"
                  className="p-2 rounded-xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] text-[#EA2B2B] dark:text-[#FF8A8A] shrink-0 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-5 flex flex-col gap-3">
        <h2 className="text-lg font-black">Backup &amp; Restore Data (JSON)</h2>
        <p className="text-xs sm:text-sm font-bold text-[#777777] dark:text-[#9DB0BA]">
          Ekspor papan skor, soal kustom, kunci fitur, dan pesan epilog ke satu file JSON untuk cadangan atau dipindah ke perangkat lain.
        </p>
        <div className="flex flex-wrap gap-2.5">
          <DuoButton
            variant="blue"
            size="sm"
            onClick={() => {
              const payload = exportAppBackup();
              const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(payload, null, 2));
              const a = document.createElement('a');
              a.href = dataStr;
              a.download = `backup-cerdas-cermat-${new Date().toISOString().slice(0, 10)}.json`;
              document.body.appendChild(a);
              a.click();
              a.remove();
              onToast('File backup JSON berhasil diunduh');
            }}
          >
            <Download className="w-4 h-4" />
            Unduh Backup JSON
          </DuoButton>

          <input
            ref={fileInputRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              e.target.value = '';
              if (!file) return;
              try {
                const rawText = await file.text();
                const parsed = JSON.parse(rawText);
                const res = importAppBackup(parsed);
                if (!res.ok) {
                  setMsg(res.error || 'Gagal memulihkan data.');
                  onToast(res.error || 'Format backup tidak valid');
                  return;
                }
                setCustomList(getCustomQuestions());
                onLocksChanged();
                setTick((t) => t + 1);
                setMsg('Data berhasil dipulihkan dari file backup JSON.');
                Music.sfx('ok');
                onToast('Backup JSON berhasil dipulihkan!');
              } catch {
                setMsg('File JSON rusak atau tidak valid.');
                onToast('Gagal membaca file JSON');
              }
            }}
          />

          <DuoButton
            variant="gold"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-4 h-4" />
            Pulihkan dari JSON
          </DuoButton>
        </div>
      </div>
    </div>
  );
};

export const EpilogScreen: React.FC<{
  onGo: (s: ScreenName) => void;
  onToast: (m: string) => void;
}> = ({ onGo, onToast }) => {
  const [list, setList] = useState<ChatEntry[]>(() => getChatList());
  const [sender, setSender] = useState('');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [admPw, setAdmPw] = useState('');

  useEffect(() => {
    if (!isOpen('epilog')) {
      onToast('Epilog masih terkunci');
      onGo('hub');
      return;
    }
    Music.auto(5);
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = msg.trim();
    if (!raw) {
      setErr('Tulis kritik atau saran terlebih dahulu ya.');
      return;
    }
    setErr('');
    const next: ChatEntry[] = [
      {
        id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        name: cleanName(sender, 24) || "Sahabat Qur'ani",
        role: '',
        msg: raw,
        at: Date.now()
      },
      ...list
    ];
    saveChatList(next);
    setList(next);
    setMsg('');
    Music.sfx('card');
    onToast('Pesan terkirim ke papan kritik & saran');
  };

  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(list, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = 'kritik-saran-cerdas-cermat.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    onToast('File kritik & saran diunduh');
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-7 text-center flex flex-col items-center gap-3 shadow-[0_6px_0_#E5E5E5] dark:shadow-[0_6px_0_#24363E]">
        <div className="text-6xl mascot-bob">💌</div>
        <h1 className="text-2xl sm:text-3xl font-black">Terima Kasih, Sahabat Qur&apos;ani!</h1>
        <p className="text-sm sm:text-base font-bold text-[#4B4B4B] dark:text-[#DCE6EC] max-w-xl leading-relaxed">
          Jazaakumullahu khairan katsira atas semangat belajar, kejujuran, dan kebersamaan hari ini. Semoga setiap ayat, kisah nabi, dan ilmu yang dipelajari menjadi cahaya kebaikan dalam kehidupan sehari-hari.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-5">
          <div className="text-xs font-black uppercase tracking-wider text-[#58CC02] mb-1">Penggagas &amp; Pengembang</div>
          <h2 className="text-lg font-black">Ustadz Farhan</h2>
          <p className="text-sm font-bold text-[#777777] dark:text-[#9DB0BA] mt-1">
            Menyusun soal, alur permainan, ilustrasi, dan sistem interaktif Cerdas Cermat: Generasi Qur&apos;ani.
          </p>
        </div>
        <div className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-5">
          <div className="text-xs font-black uppercase tracking-wider text-[#1CB0F6] mb-1">Mitra Pembinaan</div>
          <h2 className="text-lg font-black">TPA Al-Munawwarah Pramuka</h2>
          <p className="text-sm font-bold text-[#777777] dark:text-[#9DB0BA] mt-1">
            Wadah pembinaan generasi Qur&apos;ani yang berakhlak mulia, tangguh, dan berjiwa kepramukaan.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-5 sm:p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-lg font-black">Papan Kritik &amp; Saran</h2>
            <p className="text-xs font-bold text-[#777777] dark:text-[#9DB0BA]">
              Pesan tampil langsung dan tersimpan di perangkat ini.
            </p>
          </div>
          <span className="text-xs font-black text-[#46A302] dark:text-[#89E219]">Papan Publik</span>
        </div>

        <form onSubmit={handleSend} className="flex flex-col gap-3">
          <div>
            <label htmlFor="cn" className="block text-xs font-black uppercase text-[#777777] mb-1">
              Nama Pengirim (opsional)
            </label>
            <input
              id="cn"
              type="text"
              maxLength={24}
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              placeholder="contoh: Fatih / Peserta TPA"
              className="w-full rounded-2xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-[#F7F7F7] dark:bg-[#1A2A31] px-4 py-2.5 text-sm font-bold"
            />
          </div>
          <div>
            <label htmlFor="cm" className="block text-xs font-black uppercase text-[#777777] mb-1">
              Kritik, Saran, atau Pesan
            </label>
            <textarea
              id="cm"
              maxLength={400}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Tulis kritik, saran, atau kesan bermain di sini..."
              className="w-full min-h-[100px] rounded-2xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-[#F7F7F7] dark:bg-[#1A2A31] px-4 py-2.5 text-sm font-bold"
            />
          </div>
          {err && <div className="text-sm font-extrabold text-[#EA2B2B] dark:text-[#FF8A8A]">{err}</div>}
          <DuoButton type="submit" variant="green" size="md">
            <Send className="w-4 h-4" />
            Kirim ke Papan Saran
          </DuoButton>
        </form>

        <div className="flex flex-col gap-2.5 max-h-[380px] overflow-y-auto pr-1" aria-live="polite">
          {list.length === 0 ? (
            <p className="text-center text-sm font-bold text-[#777777] py-4">
              Belum ada pesan kritik atau saran. Jadilah yang pertama mengirim pesan!
            </p>
          ) : (
            list.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-[#F7F7F7] dark:bg-[#1A2A31] p-3.5 flex flex-col gap-1"
              >
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-black text-[#3C3C3C] dark:text-[#F1F7F9]">
                    {item.name || "Sahabat Qur'ani"}
                    {item.role ? <span className="text-[#58CC02] ml-1.5">· {item.role}</span> : ''}
                  </span>
                  <span className="font-bold text-[#777777] dark:text-[#9DB0BA]">{fmtTimeAgo(item.at)}</span>
                </div>
                <p className="text-sm font-bold text-[#4B4B4B] dark:text-[#DCE6EC] whitespace-pre-line break-words">
                  {item.msg}
                </p>
                {adminUnlocked && (
                  <div className="mt-1">
                    <DuoButton
                      variant="red"
                      size="sm"
                      onClick={() => {
                        const next = list.filter((x) => x.id !== item.id);
                        saveChatList(next);
                        setList(next);
                        onToast('Pesan dihapus');
                      }}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Hapus
                    </DuoButton>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="rounded-2xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-[#F7F7F7] dark:bg-[#1A2A31] p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-black text-sm">Kelola Pesan (Admin)</span>
            <span className="text-xs font-bold text-[#777777] dark:text-[#9DB0BA]">
              {adminUnlocked ? 'Mode Admin aktif' : 'Terkunci'}
            </span>
          </div>
          {!adminUnlocked ? (
            <div className="flex flex-wrap gap-2">
              <input
                type="password"
                value={admPw}
                onChange={(e) => setAdmPw(e.target.value)}
                placeholder="Kata sandi pengajar"
                className="flex-1 min-w-[160px] rounded-xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] px-3 py-2 text-sm font-bold"
              />
              <DuoButton
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (admPw === TEACHER_PW) {
                    setAdminUnlocked(true);
                    setAdmPw('');
                    onToast('Mode kelola pesan Admin terbuka');
                  } else {
                    onToast('Kata sandi pengajar belum tepat');
                  }
                }}
              >
                <Unlock className="w-4 h-4" />
                Buka Kelola
              </DuoButton>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              <DuoButton variant="gold" size="sm" onClick={handleDownloadJson}>
                <Download className="w-4 h-4" />
                Unduh JSON
              </DuoButton>
              <DuoButton
                variant="red"
                size="sm"
                onClick={() => {
                  saveChatList([]);
                  setList([]);
                  onToast('Semua pesan kritik & saran dihapus');
                }}
              >
                <Trash2 className="w-4 h-4" />
                Hapus Semua
              </DuoButton>
              <DuoButton variant="ghost" size="sm" onClick={() => setAdminUnlocked(false)}>
                <Lock className="w-4 h-4" />
                Kunci Lagi
              </DuoButton>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <DuoButton variant="green" size="lg" onClick={() => onGo('hub')}>
          Kembali ke Menu
        </DuoButton>
        <DuoButton variant="ghost" size="lg" onClick={() => onGo('board')}>
          <Trophy className="w-5 h-5" />
          Papan Skor
        </DuoButton>
      </div>
    </div>
  );
};
