import React from 'react';
import ScrollReveal from './ScrollReveal';
import CopyAddressButton from './CopyAddressButton';

const CONTRACT_ADDRESS = 'MVuxtBQJP2EhQnoTuPdNJuXemCtLyn6SzqGjL2upump';

const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="section-padding flex items-center justify-center"
    >
      <ScrollReveal className="relative z-10 w-full max-w-4xl">
        <div className="space-y-8 md:space-y-10">
          <h1 className="text-balance text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
            <span className="gradient-text">Greenwich</span>{' '}
            turns the New Year into a Solana light show.
          </h1>
          <p className="text-balance text-sm text-slate-300 md:text-base">
            A winter–holiday meme token born exactly where the year flips:
            Greenwich. Neon Solana gradients, snowfall, and a community that
            never sleeps through midnight. Zero promises, maximum vibes.
          </p>

          <div className="glass-panel-strong gradient-ring ny-glow-ring mt-8 space-y-4 p-4 shadow-glow-teal md:p-6">
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <a
href="https://dexscreener.com/solana/MVuxtBQJP2EhQnoTuPdNJuXemCtLyn6SzqGjL2upump"
                target="_blank"
                rel="noreferrer"
                className="primary-btn text-sm md:text-base"
              >
                Buy on Dex
              </a>
              {/* оставляем только одну кнопку Copy CA в hero, в шапке будет своя */}
              <CopyAddressButton address={CONTRACT_ADDRESS} />
            </div>
            <div className="flex flex-wrap items-center gap-3 text-[0.68rem] text-slate-300 md:text-xs">
              <span className="font-semibold uppercase tracking-[0.2em] text-solanaTeal">
                Contract
              </span>
              <span className="font-mono break-all">{CONTRACT_ADDRESS}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-xs text-slate-300 md:text-sm">
            <span className="rounded-full bg-white/5 px-3 py-1">
              New Year + Winter meme meta
            </span>
            <span className="rounded-full bg-white/5 px-3 py-1">
              Powered by Solana speed
            </span>
            <span className="rounded-full bg-white/5 px-3 py-1">
              Community–driven chaos only
            </span>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default HeroSection;
