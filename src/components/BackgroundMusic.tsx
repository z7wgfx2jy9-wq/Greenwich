import React, { useEffect, useRef, useState } from 'react';

const BackgroundMusic: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.4;

    if (enabled) {
      // попытка воспроизвести, браузер может заблокировать до взаимодействия с пользователем
      void audio.play().catch(() => {
        // игнорируем — пользователь сможет включить вручную
      });
    } else {
      audio.pause();
    }
  }, [enabled]);

  return (
    <>
      <audio ref={audioRef} src="/greenwich-theme.mp3" />
      <button
        type="button"
        onClick={() => setEnabled((prev) => !prev)}
        className="fixed bottom-4 right-4 z-40 rounded-full border border-white/20 bg-slate-900/80 px-3 py-1.5 text-[0.7rem] text-slate-200 shadow-lg backdrop-blur hover:border-solanaTeal/70 hover:text-solanaTeal"
      >
        {enabled ? 'Mute music' : 'Play music'}
      </button>
    </>
  );
};

export default BackgroundMusic;
