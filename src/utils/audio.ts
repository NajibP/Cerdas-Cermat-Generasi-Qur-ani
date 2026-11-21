export type SfxKind = 'ok' | 'no' | 'bell' | 'hit' | 'roar' | 'win' | 'card' | 'cheer' | 'tick';

interface TrackDef {
  n: string;
  bpm: number;
  root: number;
  sc: number[];
  ch: number[][];
  lead: OscillatorType;
  bass: OscillatorType;
  drums: number;
  div: number;
  g: number;
}

const TRACKS: Record<number, TrackDef> = {
  1: { n: 'Slow Pace', bpm: 68, root: 60, sc: [0, 2, 4, 7, 9], ch: [[0, 4, 7], [-3, 0, 4], [-7, -3, 0], [-5, -1, 2]], lead: 'triangle', bass: 'sine', drums: 0, div: 2, g: 0.16 },
  2: { n: 'Normal Pace', bpm: 104, root: 62, sc: [0, 2, 4, 7, 9], ch: [[0, 4, 7], [-5, -1, 2], [-3, 0, 4], [-7, -3, 0]], lead: 'square', bass: 'triangle', drums: 1, div: 2, g: 0.07 },
  3: { n: 'Fast Pace', bpm: 146, root: 57, sc: [0, 3, 5, 7, 10], ch: [[0, 3, 7], [-4, 0, 3], [3, 7, 10], [-2, 2, 5]], lead: 'sawtooth', bass: 'sawtooth', drums: 2, div: 4, g: 0.05 },
  4: { n: 'Ultimate Pace', bpm: 168, root: 50, sc: [0, 3, 5, 6, 7, 10], ch: [[0, 3, 7], [-4, 0, 3], [-2, 2, 5], [-5, -1, 4]], lead: 'sawtooth', bass: 'square', drums: 3, div: 4, g: 0.06 },
  5: { n: 'End Pace', bpm: 76, root: 67, sc: [0, 2, 4, 7, 9], ch: [[0, 4, 7], [7, 11, 14], [-3, 0, 4], [-7, -3, 0]], lead: 'sine', bass: 'sine', drums: 0, div: 2, g: 0.2 }
};

interface ActiveTrack {
  n: number;
  tr: TrackDef;
  step: number;
  nextT: number;
  bus: GainNode;
  timer: ReturnType<typeof setInterval>;
}

interface AudioPrefs {
  bgmVol: number;
  sfxVol: number;
  sfxMuted: boolean;
}

const AUDIO_STORAGE_KEY = 'ccgq:audio_prefs';

function loadAudioPrefs(): AudioPrefs {
  try {
    const raw = localStorage.getItem(AUDIO_STORAGE_KEY);
    if (raw) {
      const p = JSON.parse(raw) as Partial<AudioPrefs>;
      return {
        bgmVol: typeof p.bgmVol === 'number' ? Math.max(0, Math.min(1, p.bgmVol)) : 0.55,
        sfxVol: typeof p.sfxVol === 'number' ? Math.max(0, Math.min(1, p.sfxVol)) : 0.8,
        sfxMuted: !!p.sfxMuted
      };
    }
  } catch {}
  return { bgmVol: 0.55, sfxVol: 0.8, sfxMuted: false };
}

const N = (m: number) => 440 * Math.pow(2, (m - 69) / 12);

class MusicEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private sfxBus: GainNode | null = null;
  private noiseBuf: AudioBuffer | null = null;
  private _bgmVol = 0.55;
  private _sfxVol = 0.8;
  private _muted = false;
  private _sfxMuted = false;
  private _started = false;
  private _cur = 0;
  private active: ActiveTrack | null = null;
  private listeners = new Set<() => void>();

  readonly T = TRACKS;

  constructor() {
    const prefs = loadAudioPrefs();
    this._bgmVol = prefs.bgmVol;
    this._sfxVol = prefs.sfxVol;
    this._sfxMuted = prefs.sfxMuted;

    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden && this.active && this.ctx) {
          this.active.nextT = this.ctx.currentTime + 0.06;
        }
      });
    }
  }

  private savePrefs() {
    try {
      localStorage.setItem(
        AUDIO_STORAGE_KEY,
        JSON.stringify({
          bgmVol: this._bgmVol,
          sfxVol: this._sfxVol,
          sfxMuted: this._sfxMuted
        })
      );
    } catch {}
  }

  subscribe(fn: () => void) {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn());
  }

  get cur() {
    return this._cur;
  }
  get playing() {
    return !!this.active;
  }
  get muted() {
    return this._muted;
  }
  get sfxMuted() {
    return this._sfxMuted;
  }
  get vol() {
    return this._bgmVol;
  }
  get bgmVol() {
    return this._bgmVol;
  }
  get sfxVol() {
    return this._sfxVol;
  }

  private init(): boolean {
    if (this.ctx) return true;
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AC) return false;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = this._bgmVol;
      this.master.connect(this.ctx.destination);
      this.sfxBus = this.ctx.createGain();
      this.sfxBus.gain.value = this._sfxMuted ? 0 : this._sfxVol;
      this.sfxBus.connect(this.ctx.destination);
      this.noiseBuf = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.5, this.ctx.sampleRate);
      const d = this.noiseBuf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      return true;
    } catch {
      return false;
    }
  }

  private tone(f: number, t: number, dur: number, type: OscillatorType, g: number, dest?: AudioNode | null) {
    if (!this.ctx) return;
    const o = this.ctx.createOscillator();
    const a = this.ctx.createGain();
    o.type = type;
    o.frequency.value = f;
    a.gain.setValueAtTime(0, t);
    a.gain.linearRampToValueAtTime(g, t + 0.012);
    a.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(a);
    a.connect(dest || this.master!);
    o.start(t);
    o.stop(t + dur + 0.06);
  }

  private noise(t: number, dur: number, g: number, hp: number, dest?: AudioNode | null) {
    if (!this.ctx || !this.noiseBuf) return;
    const s = this.ctx.createBufferSource();
    const a = this.ctx.createGain();
    const f = this.ctx.createBiquadFilter();
    s.buffer = this.noiseBuf;
    f.type = 'highpass';
    f.frequency.value = hp;
    a.gain.setValueAtTime(g, t);
    a.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f);
    f.connect(a);
    a.connect(dest || this.master!);
    s.start(t);
    s.stop(t + dur + 0.02);
  }

  private kick(t: number, dest?: AudioNode | null) {
    if (!this.ctx) return;
    const o = this.ctx.createOscillator();
    const a = this.ctx.createGain();
    o.frequency.setValueAtTime(140, t);
    o.frequency.exponentialRampToValueAtTime(40, t + 0.15);
    a.gain.setValueAtTime(0.5, t);
    a.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    o.connect(a);
    a.connect(dest || this.master!);
    o.start(t);
    o.stop(t + 0.25);
  }

  private schedule(tr: TrackDef, s: number, t: number, dur: number, bus: GainNode) {
    const per = tr.div * 4;
    const bar = Math.floor(s / per) % tr.ch.length;
    const pos = s % per;
    const ch = tr.ch[bar];
    const beat = pos / tr.div;
    if (pos % 2 === 0) this.tone(N(tr.root + ch[0] - 12), t, dur * (tr.div === 4 ? 1.6 : 3), tr.bass, tr.g * 1.8, bus);
    const idx = (pos + bar * 3) % ch.length;
    let note = tr.root + ch[idx] + 12;
    if ((s >> 1) % 5 === 3 || pos % 6 === 5) note = tr.root + 12 + tr.sc[(pos * 2 + bar) % tr.sc.length] + 12;
    if (!(tr.drums === 0 && pos % 2 === 1 && Math.random() < 0.3)) {
      this.tone(N(note), t, dur * (tr.div === 4 ? 1.2 : 2.2), tr.lead, tr.g, bus);
    }
    if (tr.lead === 'sine' && pos === 0) {
      this.tone(N(tr.root + ch[2] + 24), t, dur * 6, 'sine', tr.g * 0.7, bus);
    }
    if (tr.drums >= 1) {
      if (pos % tr.div === 0 && (beat % 2 === 0 || tr.drums >= 2)) this.kick(t, bus);
      if (beat % 2 === 1 && pos % tr.div === 0) this.noise(t, 0.12, 0.18, 1800, bus);
      if (tr.drums >= 2 && pos % 2 === 1) this.noise(t, 0.04, 0.06, 7000, bus);
      if (tr.drums === 3 && pos % 4 === 2) this.noise(t, 0.05, 0.1, 5000, bus);
    }
  }

  private fadeOut(inst: ActiveTrack | null, fade = 1.4) {
    if (!inst) return;
    clearInterval(inst.timer);
    if (this.ctx && inst.bus) {
      const now = this.ctx.currentTime;
      try {
        inst.bus.gain.cancelScheduledValues(now);
        inst.bus.gain.setValueAtTime(Math.max(0.0001, inst.bus.gain.value), now);
        inst.bus.gain.exponentialRampToValueAtTime(0.0001, now + fade);
      } catch {}
      setTimeout(() => {
        try {
          inst.bus.disconnect();
        } catch {}
      }, (fade + 0.3) * 1000);
    }
  }

  private startTrack(n: number, fade = 0) {
    if (!TRACKS[n] || !this.init() || !this.ctx || !this.master) return;
    if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
    this.fadeOut(this.active, fade > 0 ? fade : 0.15);
    const bus = this.ctx.createGain();
    const now = this.ctx.currentTime;
    if (fade > 0) {
      bus.gain.setValueAtTime(0.0001, now);
      bus.gain.exponentialRampToValueAtTime(1, now + fade);
    } else {
      bus.gain.setValueAtTime(1, now);
    }
    bus.connect(this.master);
    const inst: ActiveTrack = {
      n,
      tr: TRACKS[n],
      step: 0,
      nextT: now + 0.06,
      bus,
      timer: setInterval(() => {
        if (!this.ctx) return;
        if (typeof document !== 'undefined' && document.hidden) {
          inst.nextT = this.ctx.currentTime + 0.06;
          return;
        }
        if (this.ctx.state === 'suspended') {
          this.ctx.resume().catch(() => {});
          inst.nextT = this.ctx.currentTime + 0.06;
          return;
        }
        // Prevent catch-up oscillator bursts after tab throttling / sleep
        if (inst.nextT < this.ctx.currentTime - 0.12) {
          inst.nextT = this.ctx.currentTime + 0.05;
        }
        const dur = 60 / inst.tr.bpm / inst.tr.div;
        let guard = 0;
        while (inst.nextT < this.ctx.currentTime + 0.25 && guard < 12) {
          this.schedule(inst.tr, inst.step, inst.nextT, dur, inst.bus);
          inst.nextT += dur;
          inst.step++;
          guard++;
        }
      }, 55)
    };
    this.active = inst;
    this._cur = n;
    this._started = true;
    this._muted = false;
    this.notify();
  }

  play(n: number) {
    this.startTrack(n, 0.35);
  }

  pause() {
    this.fadeOut(this.active, 0.35);
    this.active = null;
    this._muted = true;
    this.notify();
  }

  toggle() {
    if (this.active) this.pause();
    else this.startTrack(this._cur || 1, 0.35);
  }

  auto(n: number) {
    if (this.active && this._cur === n) {
      this.notify();
      return;
    }
    const prev = this._cur;
    this._cur = n;
    if (!this._muted || !this._started) {
      this.startTrack(n, prev && prev !== n ? 1.6 : 0.4);
    } else {
      this.notify();
    }
  }

  setVol(v: number) {
    this.setBgmVol(v);
  }

  setBgmVol(v: number) {
    this._bgmVol = Math.max(0, Math.min(1, v));
    if (this.master) this.master.gain.value = this._bgmVol;
    this.savePrefs();
    this.notify();
  }

  setSfxVol(v: number) {
    this._sfxVol = Math.max(0, Math.min(1, v));
    if (this._sfxVol > 0 && this._sfxMuted) this._sfxMuted = false;
    if (this.sfxBus) this.sfxBus.gain.value = this._sfxMuted ? 0 : this._sfxVol;
    this.savePrefs();
    this.notify();
  }

  toggleSfxMute() {
    this._sfxMuted = !this._sfxMuted;
    if (this.sfxBus) this.sfxBus.gain.value = this._sfxMuted ? 0 : this._sfxVol;
    this.savePrefs();
    this.notify();
  }

  sfx(kind: SfxKind) {
    if (this._sfxMuted || this._sfxVol <= 0 || !this.init() || !this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
    const t = this.ctx.currentTime;
    if (kind === 'ok') {
      this.tone(N(79), t, 0.18, 'triangle', 0.25, this.sfxBus);
      this.tone(N(84), t + 0.1, 0.3, 'triangle', 0.25, this.sfxBus);
    } else if (kind === 'no') {
      this.tone(N(52), t, 0.3, 'sawtooth', 0.18, this.sfxBus);
      this.tone(N(49), t + 0.12, 0.35, 'sawtooth', 0.18, this.sfxBus);
    } else if (kind === 'bell') {
      this.tone(N(88), t, 0.8, 'sine', 0.3, this.sfxBus);
      this.tone(N(95), t, 0.8, 'sine', 0.18, this.sfxBus);
    } else if (kind === 'hit') {
      this.noise(t, 0.2, 0.4, 300, this.sfxBus);
      this.kick(t, this.sfxBus);
    } else if (kind === 'roar') {
      this.tone(N(36), t, 0.6, 'sawtooth', 0.25, this.sfxBus);
      this.tone(N(35), t, 0.6, 'square', 0.12, this.sfxBus);
    } else if (kind === 'win') {
      [72, 76, 79, 84, 88].forEach((m, i) => this.tone(N(m), t + i * 0.12, 0.4, 'triangle', 0.25, this.sfxBus));
    } else if (kind === 'card') {
      this.tone(N(81), t, 0.15, 'sine', 0.25, this.sfxBus);
      this.tone(N(93), t + 0.08, 0.25, 'sine', 0.2, this.sfxBus);
    } else if (kind === 'cheer') {
      for (let i = 0; i < 16; i++) this.noise(t + i * 0.1, 0.3, 0.1, 500 + (i % 4) * 300, this.sfxBus);
      [67, 72, 76, 79].forEach((m, i) => this.tone(N(m), t + i * 0.1, 0.5, 'triangle', 0.12, this.sfxBus));
    } else if (kind === 'tick') {
      this.tone(N(96), t, 0.05, 'square', 0.06, this.sfxBus);
    }
  }
}

export const Music = new MusicEngine();
