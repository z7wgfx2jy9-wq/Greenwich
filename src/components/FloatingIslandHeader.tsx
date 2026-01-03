import React, { useEffect, useRef, useState } from 'react';
import CopyAddressButton from './CopyAddressButton';

const CONTRACT_ADDRESS = 'MWKqARwwmCuag1K6siRG5NWgUWJV6V5uizbwLtppump';

const FloatingIslandHeader: React.FC = () => {
  const [compact, setCompact] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // загрузка логотипа токена из backend API (DexScreener)
    const loadLogo = async () => {
      try {
        const res = await fetch('/api/market-data');
        if (!res.ok) return;
        const data = (await res.json()) as { imageUrl?: string | null };
        if (data.imageUrl) {
          setLogoUrl(data.imageUrl);
        }
      } catch {
        // игнорируем ошибки — просто оставим градиентный fallback
      }
    };

    loadLogo();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setCompact(currentY > 80);

      // если прокручиваем вниз и ушли ниже шапки — спрятать
      if (currentY > 140 && currentY > lastScrollY.current) {
        setHidden(true);
      } else if (currentY < 80 || currentY < lastScrollY.current) {
        // при прокрутке вверх или возле верха показываем снова
        setHidden(false);
      }

      lastScrollY.current = currentY;
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);


  return (
    <header
      className={`fixed left-1/2 z-40 flex w-full max-w-5xl -translate-x-1/2 transition-all duration-500 ${
        compact ? 'top-2 md:top-4' : 'top-4 md:top-8'
      } ${hidden ? '-translate-y-full opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <div
        className={`glass-panel gradient-ring pointer-events-auto flex w-full items-center gap-2 border-white/20 bg-slate-900/70 px-2.5 py-1.5 shadow-2xl backdrop-blur-2xl md:px-5 md:py-3 ${
          compact ? 'scale-95 rounded-2xl' : 'scale-100 rounded-3xl'
        } transition-all duration-500`}
      >
        {/* Левая часть: логотип + название */}
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-solanaTeal via-solanaPurple to-solanaMagenta shadow-glow-teal">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Token logo"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-lg font-bold text-slate-950">G</span>
            )}
          </div>
          <div className="hidden flex-col md:flex">
            <span className="text-xs uppercase tracking-[0.2em] text-solanaTeal">
              Greenwich
            </span>
            <span className="text-[0.68rem] text-slate-300">
              New Year Solana Meme Token
            </span>
          </div>
        </div>

        {/* Центр: навигация (Dex / Pumpfun / X) — только десктоп */}
        <div className="hidden flex-1 items-center justify-center gap-2 md:flex">
          <a
href="https://dexscreener.com/solana/MWKqARwwmCuag1K6siRG5NWgUWJV6V5uizbwLtppump"
            target="_blank"
            rel="noreferrer"
            className="secondary-btn text-xs"
          >
            Dex
          </a>
          <a
href="https://pump.fun/coin/MWKqARwwmCuag1K6siRG5NWgUWJV6V5uizbwLtppump"
            target="_blank"
            rel="noreferrer"
            className="secondary-btn text-xs"
          >
            Pumpfun
          </a>
          <a
            href="https://x.com/SolanaGreenwich"
            target="_blank"
            rel="noreferrer"
            className="secondary-btn text-xs"
          >
            X
          </a>
        </div>

        {/* Правая часть: на мобиле Dex + TG, на десктопе контракт + Copy CA */}
        <div className="flex flex-1 items-center justify-end gap-1.5 md:gap-3">
          {/* Мобильные быстрые кнопки */}
          <div className="flex items-center gap-1.5 md:hidden">
            <a
href="https://dexscreener.com/solana/MWKqARwwmCuag1K6siRG5NWgUWJV6V5uizbwLtppump"
              target="_blank"
              rel="noreferrer"
              className="secondary-btn px-2 py-1 text-[0.6rem]"
            >
              Dex
            </a>
            <a
              href="https://x.com/SolanaGreenwich"
              target="_blank"
              rel="noreferrer"
              className="secondary-btn px-2 py-1 text-[0.6rem]"
            >
              X
            </a>
          </div>

          {/* Контракт и копирование — всегда справа, но текст контракта прячем на совсем маленьких экранах */}
          <div className="hidden flex-col text-right text-[0.6rem] leading-tight text-slate-300 sm:flex">
            <span className="font-semibold text-solanaTeal">Contract</span>
            <span className="font-mono">
              {CONTRACT_ADDRESS.slice(0, 6)}...{CONTRACT_ADDRESS.slice(-4)}
            </span>
          </div>
          <CopyAddressButton address={CONTRACT_ADDRESS} size="sm" className="shrink-0" />
        </div>
      </div>
    </header>
  );
};

export default FloatingIslandHeader;
