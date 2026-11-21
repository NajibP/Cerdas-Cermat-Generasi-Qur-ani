import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Play, Settings, Power, RotateCcw, ArrowRight, ArrowLeft, BookOpen, ShieldCheck, Sparkles, Eye, EyeOff, Check } from 'lucide-react';
import { CRED, PROLOG } from '../data/bank';
import { Music } from '../utils/audio';
import { DuoButton } from '../components/DuoUi';
import { MascotSvg } from '../components/Svgs';

export const GateScreen: React.FC<{ onAuthSuccess: () => void }> = ({ onAuthSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [infoTab, setInfoTab] = useState<'tentang' | 'isi' | 'hak'>('tentang');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === CRED.u && password === CRED.p) {
      setError('');
      Music.auto(1);
      Music.sfx('win');
      onAuthSuccess();
    } else {
      Music.sfx('no');
      setError('Username atau password belum cocok. Coba lagi ya.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#131F24] bg-edu-canvas py-8 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Mascot Hero & Information */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
            <MascotSvg size={116} className="shrink-0" />
            <div className="relative bg-[#F7F7F7] dark:bg-[#1F2F36] border-2 border-[#E5E5E5] dark:border-[#37464F] rounded-2xl px-5 py-3.5 max-w-md">
              <p className="text-sm sm:text-base font-extrabold text-[#58A700] dark:text-[#89E219]">
                Assalamu&apos;alaikum Warahmatullahi Wabarakatuh!
              </p>
              <p className="text-xs sm:text-sm font-bold text-[#777777] dark:text-[#9DB0BA] mt-0.5">
                Ayo asah ilmu Islam dengan petualangan seru bersama TPA Al-Munawwarah!
              </p>
            </div>
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#3C3C3C] dark:text-[#F1F7F9] leading-tight">
              Cerdas Cermat: <span className="text-[#58CC02]">Generasi Qur&apos;ani</span>
            </h1>
            <p className="mt-2 text-sm sm:text-base font-bold text-[#777777] dark:text-[#9DB0BA]">
              Oleh TPA Al-Munawwarah Pramuka · Karya Ustadz Farhan
            </p>
          </div>

          {/* Interactive Info Tabs */}
          <div className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-5">
            <div className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-[#F7F7F7] dark:bg-[#1A2A31] mb-4">
              <button
                type="button"
                onClick={() => setInfoTab('tentang')}
                className={`flex-1 min-w-[110px] py-2 px-3 rounded-xl text-xs sm:text-sm font-black transition-colors cursor-pointer whitespace-nowrap ${
                  infoTab === 'tentang'
                    ? 'bg-white dark:bg-[#24363E] text-[#58CC02] shadow-xs'
                    : 'text-[#777777] dark:text-[#9DB0BA] hover:text-[#3C3C3C] dark:hover:text-white'
                }`}
              >
                <BookOpen className="w-4 h-4 inline mr-1.5 -mt-0.5" />
                Tentang Kuis
              </button>
              <button
                type="button"
                onClick={() => setInfoTab('isi')}
                className={`flex-1 min-w-[110px] py-2 px-3 rounded-xl text-xs sm:text-sm font-black transition-colors cursor-pointer whitespace-nowrap ${
                  infoTab === 'isi'
                    ? 'bg-white dark:bg-[#24363E] text-[#1CB0F6] shadow-xs'
                    : 'text-[#777777] dark:text-[#9DB0BA] hover:text-[#3C3C3C] dark:hover:text-white'
                }`}
              >
                <Sparkles className="w-4 h-4 inline mr-1.5 -mt-0.5" />
                Fitur &amp; Isi
              </button>
              <button
                type="button"
                onClick={() => setInfoTab('hak')}
                className={`flex-1 min-w-[110px] py-2 px-3 rounded-xl text-xs sm:text-sm font-black transition-colors cursor-pointer whitespace-nowrap ${
                  infoTab === 'hak'
                    ? 'bg-white dark:bg-[#24363E] text-[#FFC800] shadow-xs'
                    : 'text-[#777777] dark:text-[#9DB0BA] hover:text-[#3C3C3C] dark:hover:text-white'
                }`}
              >
                <ShieldCheck className="w-4 h-4 inline mr-1.5 -mt-0.5" />
                Hak Cipta
              </button>
            </div>

            {infoTab === 'tentang' && (
              <p className="text-sm sm:text-base font-bold leading-relaxed text-[#4B4B4B] dark:text-[#DCE6EC]">
                Cerdas Cermat: Generasi Qur&apos;ani adalah permainan kuis interaktif tentang Rukun Islam, Rukun Iman, para nabi, malaikat, sirah Nabi Muhammad SAW, sifat Allah, dan surah-surah Al-Qur&apos;an. Soal diacak setiap kali bermain dengan batas waktu. Belajar jadi petualangan: kalahkan Hantu dan Iblis, gunakan Kartu Hikmah, dan raih sertifikat!
              </p>
            )}

            {infoTab === 'isi' && (
              <ul className="grid sm:grid-cols-2 gap-2.5 text-sm font-bold text-[#4B4B4B] dark:text-[#DCE6EC]">
                {[
                  'Prolog & pembukaan petualangan',
                  'Mode Pengajar & Soal Kustom',
                  'Peserta: 5 bundle vs Hantu + Final Boss',
                  'Umum: 8 bundle (maks. 2000 poin)',
                  'Kartu Hikmah & Istiqomah Frenzy',
                  'Regu Duel & Turnamen 1vs1 Lintas Kelas',
                  'Mode Latihan Mandiri & Pembahasan',
                  'Papan Skor, Sertifikat PNG & PWA Offline'
                ].map((feat) => (
                  <li key={feat} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#58CC02] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            )}

            {infoTab === 'hak' && (
              <div className="space-y-2 text-xs sm:text-sm font-bold leading-relaxed text-[#4B4B4B] dark:text-[#DCE6EC] bg-[#FFFDF2] dark:bg-[#24363E] p-4 rounded-2xl border-2 border-[#FFE98A] dark:border-[#37464F]">
                <p>
                  Karya ini dilindungi <strong>Undang-Undang Nomor 28 Tahun 2014 tentang Hak Cipta</strong>. Soal, desain, narasi, dan seluruh isi permainan adalah ciptaan Ustadz Farhan bersama TPA Al-Munawwarah Pramuka.
                </p>
                <p>
                  Menggandakan, menyebarkan, atau memakai karya ini untuk kepentingan komersial tanpa izin pencipta dilarang (Pasal 9) dan dapat dikenai sanksi pidana serta denda (Pasal 113). Silakan dipakai untuk belajar bersama dengan tetap mencantumkan nama pencipta.
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Right: Duolingo Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
          className="lg:col-span-5"
        >
          <div className="rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-6 sm:p-8 shadow-[0_6px_0_#E5E5E5] dark:shadow-[0_6px_0_#24363E]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-11 h-11 rounded-2xl bg-[#D7FFB8] dark:bg-[#24400F] text-[#58A700] dark:text-[#89E219] grid place-items-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-black">Kode Masuk</h2>
                <p className="text-xs font-bold text-[#777777] dark:text-[#9DB0BA]">Masukkan akun dari Ustadz</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
              <div>
                <label htmlFor="login-u" className="block text-xs font-black uppercase tracking-wider text-[#777777] dark:text-[#9DB0BA] mb-1.5">
                  Username
                </label>
                <input
                  id="login-u"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  autoCapitalize="off"
                  placeholder="Masukkan username"
                  className="w-full rounded-2xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-[#F7F7F7] dark:bg-[#1A2A31] px-4 py-3 text-base font-bold text-[#3C3C3C] dark:text-[#F1F7F9] focus:border-[#1CB0F6] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="login-p" className="block text-xs font-black uppercase tracking-wider text-[#777777] dark:text-[#9DB0BA] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="login-p"
                    type={showPw ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    placeholder="Masukkan password"
                    className="w-full rounded-2xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-[#F7F7F7] dark:bg-[#1A2A31] pl-4 pr-12 py-3 text-base font-bold text-[#3C3C3C] dark:text-[#F1F7F9] focus:border-[#1CB0F6] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    aria-label={showPw ? 'Sembunyikan password' : 'Lihat password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-[#777777] hover:text-[#3C3C3C] dark:text-[#9DB0BA] dark:hover:text-white cursor-pointer"
                  >
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div role="alert" className="text-sm font-extrabold text-[#EA2B2B] dark:text-[#FF8A8A] bg-[#FFDFE0] dark:bg-[#40201F] px-3.5 py-2.5 rounded-xl">
                  {error}
                </div>
              )}

              <DuoButton type="submit" variant="green" size="lg" full className="mt-1">
                Masuk &amp; Mulai
                <ArrowRight className="w-5 h-5" />
              </DuoButton>
            </form>

            <p className="mt-5 text-xs font-bold text-center text-[#777777] dark:text-[#9DB0BA]">
              Pengaturan tampilan dan musik tersedia setelah masuk di menu Opsi dan Admin.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const PrologScreen: React.FC<{ isReplay: boolean; onFinish: () => void }> = ({ isReplay, onFinish }) => {
  const [step, setStep] = useState(0);
  const s = PROLOG[step];
  const progress = ((step + 1) / PROLOG.length) * 100;

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#131F24] bg-edu-canvas flex flex-col justify-between py-6 px-4 sm:px-6 max-w-2xl mx-auto">
      {/* Top Progress Bar */}
      <div className="flex items-center gap-4 pt-2">
        <span className="text-xs font-black uppercase tracking-wider text-[#58CC02] whitespace-nowrap">Prolog</span>
        <div className="flex-1 h-4 rounded-full bg-[#E5E5E5] dark:bg-[#37464F] overflow-hidden">
          <div
            className="h-full rounded-full bg-[#58CC02] transition-all duration-300"
            style={{ width: `${progress}%`, boxShadow: 'inset 0 4px 0 rgba(255,255,255,0.28)' }}
          />
        </div>
        <span className="font-mono-num text-xs font-black text-[#777777] dark:text-[#9DB0BA]">
          {step + 1}/{PROLOG.length}
        </span>
      </div>

      {/* Story Card */}
      <motion.div
        key={step}
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="my-8 rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-8 sm:p-10 text-center flex flex-col items-center gap-4 shadow-[0_6px_0_#E5E5E5] dark:shadow-[0_6px_0_#24363E]"
      >
        <div className="text-6xl sm:text-7xl mascot-bob select-none">{s.e}</div>
        {s.ar && <div className="text-base sm:text-lg font-extrabold text-[#58CC02]">{s.ar}</div>}
        <h2 className="text-2xl sm:text-3xl font-black text-[#3C3C3C] dark:text-[#F1F7F9]">{s.t}</h2>
        <p className="text-base sm:text-lg font-bold text-[#4B4B4B] dark:text-[#DCE6EC] max-w-lg leading-relaxed">{s.p}</p>
      </motion.div>

      {/* Bottom Controls */}
      <div className="flex flex-col gap-4 pb-4">
        <div className="flex justify-center gap-2">
          {PROLOG.map((_, k) => (
            <button
              key={k}
              type="button"
              onClick={() => setStep(k)}
              aria-label={`Langkah prolog ${k + 1}`}
              className={`h-3 rounded-full transition-all cursor-pointer ${
                k === step ? 'w-8 bg-[#58CC02]' : 'w-3 bg-[#E5E5E5] dark:bg-[#37464F]'
              }`}
            />
          ))}
        </div>

        <div className="flex gap-3">
          {step > 0 && (
            <DuoButton variant="ghost" size="lg" onClick={() => setStep((v) => v - 1)} className="flex-1">
              <ArrowLeft className="w-5 h-5" />
              Kembali
            </DuoButton>
          )}
          <DuoButton
            variant={step === PROLOG.length - 1 ? 'green' : 'gold'}
            size="lg"
            onClick={() => {
              if (step < PROLOG.length - 1) setStep((v) => v + 1);
              else onFinish();
            }}
            className="flex-[2]"
          >
            {step < PROLOG.length - 1 ? 'Lanjut' : isReplay ? 'Kembali ke Menu' : 'Mulai Petualangan'}
            <ArrowRight className="w-5 h-5" />
          </DuoButton>
        </div>
      </div>
    </div>
  );
};

export const OpeningScreen: React.FC<{
  onStart: () => void;
  onOpenOptions: () => void;
}> = ({ onStart, onOpenOptions }) => {
  const [exited, setExited] = useState(false);

  if (exited) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#131F24] bg-edu-canvas grid place-items-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] p-8 text-center flex flex-col items-center gap-4 shadow-[0_6px_0_#E5E5E5] dark:shadow-[0_6px_0_#24363E]"
        >
          <div className="text-6xl">👋</div>
          <h2 className="text-2xl font-black">Aplikasi Ditutup</h2>
          <p className="text-sm font-bold text-[#777777] dark:text-[#9DB0BA]">
            Jazaakallahu khairan. Sampai jumpa lagi!
          </p>
          <DuoButton
            variant="green"
            size="lg"
            full
            onClick={() => {
              Music.play(1);
              setExited(false);
            }}
          >
            <RotateCcw className="w-5 h-5" />
            Buka Lagi
          </DuoButton>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#131F24] bg-edu-canvas grid place-items-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg text-center flex flex-col items-center gap-6"
      >
        <MascotSvg size={132} />

        <div className="w-full rounded-3xl border-2 border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#1F2F36] px-6 py-8 shadow-[0_6px_0_#58A700]">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-[#3C3C3C] dark:text-[#F1F7F9]">
            Cerdas Cermat
            <span className="block text-[#58CC02] mt-1">Generasi Qur&apos;ani</span>
          </h1>
          <p className="mt-3 text-sm font-bold text-[#777777] dark:text-[#9DB0BA]">
            TPA Al-Munawwarah Pramuka · Karya Ustadz Farhan
          </p>
        </div>

        <div className="w-full max-w-sm flex flex-col gap-3">
          <DuoButton
            variant="green"
            size="lg"
            full
            onClick={() => {
              Music.sfx('win');
              onStart();
            }}
          >
            <Play className="w-5 h-5" />
            Mulai Petualangan
          </DuoButton>
          <DuoButton variant="gold" size="lg" full onClick={onOpenOptions}>
            <Settings className="w-5 h-5" />
            Opsi &amp; Suara
          </DuoButton>
          <DuoButton
            variant="red"
            size="lg"
            full
            onClick={() => {
              Music.pause();
              setExited(true);
            }}
          >
            <Power className="w-5 h-5" />
            Keluar
          </DuoButton>
        </div>
      </motion.div>
    </div>
  );
};
