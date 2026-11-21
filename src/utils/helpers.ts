import { BANK, ChatEntry, DEFAULT_CHAT, Question, Tier } from '../data/bank';

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function shuffle<T>(a: T[]): T[] {
  const copy = a.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function fmtT(s: number) {
  const sec = Math.max(0, Math.round(s || 0));
  return `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;
}

export function cleanName(s: string, n = 10) {
  return String(s)
    .replace(/[^\p{L}\p{N} ]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, n);
}

export function fmtTimeAgo(ts: number) {
  const diff = Math.max(0, Math.floor((Date.now() - (ts || Date.now())) / 1000));
  if (diff < 15) return 'Baru saja';
  if (diff < 60) return `${diff} dtk lalu`;
  if (diff < 3600) return `${Math.floor(diff / 60)} mnt lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
  try {
    return new Date(ts).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return '';
  }
}

export const pct = (c: number, n: number) => (n > 0 ? Math.round((c / n) * 100) : 0);

const mem: Record<string, unknown> = {};
export const store = {
  get<T>(k: string, d: T): T {
    try {
      const v = localStorage.getItem('ccgq:' + k);
      return v == null ? (k in mem ? (mem[k] as T) : d) : (JSON.parse(v) as T);
    } catch {
      return k in mem ? (mem[k] as T) : d;
    }
  },
  set<T>(k: string, v: T) {
    mem[k] = v;
    try {
      localStorage.setItem('ccgq:' + k, JSON.stringify(v));
    } catch {}
  }
};

export interface UsedBundles {
  peserta: number[];
  umum: number[];
}

export const getUsedBundles = (): UsedBundles => store.get<UsedBundles>('used_bundles', { peserta: [], umum: [] });

export const isBundleUsed = (cat: 'peserta' | 'umum', idx: number) => (getUsedBundles()[cat] || []).includes(idx);

export function lockBundle(cat: 'peserta' | 'umum', idx: number) {
  const ub = getUsedBundles();
  if (!Array.isArray(ub[cat])) ub[cat] = [];
  if (!ub[cat].includes(idx)) {
    ub[cat].push(idx);
    store.set('used_bundles', ub);
  }
}

export function resetUsedBundles() {
  store.set('used_bundles', { peserta: [], umum: [] });
}

export type LockKey = 'all' | 't4' | 't5' | 'boss' | 'epilog';
export type LocksMap = Partial<Record<LockKey, boolean>>;

export const getLocks = (): LocksMap => store.get<LocksMap>('locks', {});

export const isOpen = (k: LockKey) => {
  const L = getLocks();
  return !!(L.all || L[k]);
};

export function setLockState(k: LockKey, open: boolean) {
  const L = { ...getLocks() };
  if (k === 'all') {
    if (open) L.all = true;
    else delete L.all;
  } else {
    if (L.all && !open) {
      (['boss', 'epilog', 't4', 't5'] as LockKey[]).forEach((key) => {
        L[key] = true;
      });
      delete L.all;
    }
    L[k] = !!open;
  }
  store.set('locks', L);
}

export const unlockKey = (k: LockKey) => setLockState(k, true);

export const trackOpen = (n: number) => n <= 3 || (n === 4 ? isOpen('t4') : isOpen('t5'));

// Custom Questions CRUD (stored locally so Ustadz/Admin can manage without code edits)
export function getCustomQuestions(): Question[] {
  const list = store.get<Question[]>('custom_bank', []);
  return Array.isArray(list) ? list : [];
}

export function saveCustomQuestions(list: Question[]) {
  store.set('custom_bank', list);
}

export function getFullBank(): Question[] {
  const custom = getCustomQuestions();
  if (!custom.length) return BANK;
  return [...BANK, ...custom];
}

export function getQuestionTopic(q: Question): string {
  if (q.custom) return 'Soal Kustom';
  const n = q.n;
  if (n >= 1 && n <= 4) return 'Rukun Islam & Rukun Iman';
  if (n >= 5 && n <= 8) return 'Thaharah & Rukun Wudhu';
  if (n >= 9 && n <= 12) return 'Tata Cara & Rukun Sholat';
  if (n >= 13 && n <= 16) return 'Mengenal Para Malaikat';
  if (n >= 17 && n <= 21) return 'Kisah & Mukjizat Para Nabi';
  if (n >= 22 && n <= 25) return 'Kalender Hijriah & Ibadah';
  if (n >= 26 && n <= 29) return 'Sirah Nabawiyah & Sejarah Islam';
  if (n >= 30 && n <= 33) return 'Keluarga Nabi Muhammad SAW';
  if (n >= 34 && n <= 37) return 'Aqidah & Sifat Allah SWT';
  if (n >= 38 && n <= 41) return 'Pengetahuan Akhirat (Surga & Neraka)';
  if (n >= 42 && n <= 50) return "Kandungan Surah Al-Qur'an";
  return 'Pengetahuan Islam';
}

export function getQuestionInsight(q: Question): string {
  if (q.e && q.e.trim()) return q.e.trim();
  const topic = getQuestionTopic(q);
  return `${topic} · Jawaban yang tepat: "${q.o[q.a]}"`;
}

export function pick(
  spec: Partial<Record<Tier, number>>,
  used: Set<string>,
  excludeIds: Set<string> = new Set(),
  markUsed = true
): Question[] {
  const bank = getFullBank();
  const out: Question[] = [];
  for (const [t, n] of Object.entries(spec) as [Tier, number][]) {
    if (!n || n <= 0) continue;
    let pool = bank.filter((q) => q.t === t && !out.includes(q) && !excludeIds.has(q.id));
    if (pool.length < n) pool = bank.filter((q) => q.t === t && !out.includes(q));
    let fresh = pool.filter((q) => !used.has(q.id));
    if (fresh.length < n) {
      pool.forEach((q) => used.delete(q.id));
      fresh = pool.filter((q) => !out.includes(q));
    }
    shuffle(fresh)
      .slice(0, n)
      .forEach((q) => {
        out.push(q);
        if (markUsed) used.add(q.id);
      });
  }
  return shuffle(out);
}

export function prep(q: Question): Question {
  const idx = [0, 1, 2, 3];
  const numeric = q.o.every((o) => /^\d+$/.test(o));
  const order = numeric ? idx : shuffle(idx);
  return { ...q, o: order.map((i) => q.o[i]), a: order.indexOf(q.a) };
}

export interface BoardEntry {
  name: string;
  av: string;
  score: number;
  time: number;
  nilai?: number | null;
  mode?: string;
  at: number;
}

export interface BoardData {
  peserta: BoardEntry[];
  umum: BoardEntry[];
  regu: BoardEntry[];
}

export const cmpBoard = (a: BoardEntry, b: BoardEntry) => b.score - a.score || a.time - b.time || a.at - b.at;

export function boardGet(): BoardData {
  return store.get<BoardData>('board', { peserta: [], umum: [], regu: [] });
}

export function boardAdd(list: keyof BoardData, e: Omit<BoardEntry, 'at'> & { at?: number }) {
  const b = boardGet();
  const entry: BoardEntry = { ...e, at: e.at ?? Date.now() };
  if (list === 'regu') {
    b.regu.unshift(entry);
    b.regu = b.regu.slice(0, 10);
    store.set('board', b);
    return { kept: true, rank: 0 };
  }
  const arr = [...b[list], entry];
  arr.sort(cmpBoard);
  let kept = true;
  if (arr.length > 10) {
    const drop = arr.pop();
    kept = drop !== entry;
  }
  b[list] = arr;
  store.set('board', b);
  return { kept, rank: arr.indexOf(entry) + 1 };
}

export interface CertData {
  name: string;
  av: string;
  score: number | null;
  nilai: number | null;
  time: number;
  title: string;
  sub: string;
  win: boolean;
  max?: number;
}

export function makeCertPNG(c: CertData): string {
  const W = 1200;
  const H = 840;
  const cv = document.createElement('canvas');
  cv.width = W;
  cv.height = H;
  const g = cv.getContext('2d')!;
  const win = c.win !== false;
  g.fillStyle = win ? '#FFFDF5' : '#F4FBF7';
  g.fillRect(0, 0, W, H);
  g.strokeStyle = win ? '#FFC800' : '#58CC02';
  g.lineWidth = 18;
  g.strokeRect(28, 28, W - 56, H - 56);
  g.strokeStyle = win ? '#58CC02' : '#1CB0F6';
  g.lineWidth = 4;
  g.strokeRect(48, 48, W - 96, H - 96);
  g.fillStyle = win ? '#58A700' : '#1899D6';
  g.textAlign = 'center';
  g.font = '900 22px Nunito, sans-serif';
  g.fillText("TPA AL-MUNAWWARAH PRAMUKA · CERDAS CERMAT GENERASI QUR'ANI", W / 2, 125);
  g.fillStyle = '#2B2B2B';
  g.font = '900 54px Nunito, sans-serif';
  g.fillText(win ? 'SERTIFIKAT PENGHARGAAN' : 'SERTIFIKAT SEMANGAT BELAJAR', W / 2, 195);
  g.fillStyle = '#666';
  g.font = '700 24px Nunito, sans-serif';
  g.fillText('Diberikan dengan bangga kepada', W / 2, 260);
  g.fillStyle = '#2B2B2B';
  g.font = '900 62px Nunito, sans-serif';
  g.fillText(c.name, W / 2, 338);
  g.fillStyle = win ? '#46A302' : '#1480B5';
  g.font = '900 34px Nunito, sans-serif';
  g.fillText(c.title, W / 2, 396);
  g.fillStyle = '#555';
  g.font = '700 24px Nunito, sans-serif';
  g.fillText(c.sub || '', W / 2, 440);
  const st: string[] = [];
  if (c.score != null) st.push('Skor: ' + c.score + (c.max ? ' / ' + c.max : ''));
  if (c.nilai != null) st.push('Nilai: ' + c.nilai + '%');
  if (c.time > 0) st.push('Waktu: ' + fmtT(c.time));
  if (st.length) {
    g.fillStyle = '#2B2B2B';
    g.font = '800 26px Nunito, sans-serif';
    g.fillText(st.join('   ·   '), W / 2, 510);
  }
  g.fillStyle = '#444';
  g.font = '700 22px Nunito, sans-serif';
  const msg = win
    ? "Semoga ilmu Qur'ani yang diraih menjadi cahaya kebaikan dan bekal akhlak mulia setiap hari."
    : 'Setiap langkah belajar adalah kebaikan. Terus berlatih dengan gembira, kamu pasti bisa!';
  g.fillText(msg, W / 2, 580);
  g.fillStyle = '#666';
  g.font = '700 20px Nunito, sans-serif';
  g.fillText(new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }), 270, 710);
  g.fillText('Ustadz Farhan', W - 270, 710);
  g.strokeStyle = '#bbb';
  g.lineWidth = 2;
  g.beginPath();
  g.moveTo(W - 390, 682);
  g.lineTo(W - 150, 682);
  g.stroke();
  return cv.toDataURL('image/png');
}

export function getChatList(): ChatEntry[] {
  const saved = store.get<ChatEntry[] | null>('epilog_chat', null);
  if (Array.isArray(saved)) return saved;
  store.set('epilog_chat', DEFAULT_CHAT);
  return DEFAULT_CHAT.slice();
}

export function saveChatList(list: ChatEntry[]) {
  store.set('epilog_chat', list);
}

export interface BackupPayload {
  version: number;
  exportedAt: string;
  board: BoardData;
  locks: LocksMap;
  used_bundles: UsedBundles;
  custom_bank: Question[];
  epilog_chat: ChatEntry[];
}

export function exportAppBackup(): BackupPayload {
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    board: boardGet(),
    locks: getLocks(),
    used_bundles: getUsedBundles(),
    custom_bank: getCustomQuestions(),
    epilog_chat: getChatList()
  };
}

export function importAppBackup(raw: unknown): { ok: boolean; error?: string } {
  if (!raw || typeof raw !== 'object') return { ok: false, error: 'Format file JSON tidak valid.' };
  const data = raw as Partial<BackupPayload>;
  if (data.board && Array.isArray(data.board.peserta) && Array.isArray(data.board.umum) && Array.isArray(data.board.regu)) {
    store.set('board', data.board);
  }
  if (data.locks && typeof data.locks === 'object') {
    store.set('locks', data.locks);
  }
  if (data.used_bundles && Array.isArray(data.used_bundles.peserta) && Array.isArray(data.used_bundles.umum)) {
    store.set('used_bundles', data.used_bundles);
  }
  if (Array.isArray(data.custom_bank)) {
    const valid = data.custom_bank.filter(
      (q) => q && typeof q.q === 'string' && Array.isArray(q.o) && q.o.length === 4 && typeof q.a === 'number' && q.a >= 0 && q.a <= 3
    );
    saveCustomQuestions(valid);
  }
  if (Array.isArray(data.epilog_chat)) {
    saveChatList(data.epilog_chat);
  }
  return { ok: true };
}
