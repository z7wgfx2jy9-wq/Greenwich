import React from 'react';

const CONTRACT_ADDRESS = 'MWKqARwwmCuag1K6siRG5NWgUWJV6V5uizbwLtppump';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-slate-950/90">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2 text-xs text-slate-300">
          <p className="font-semibold text-solanaTeal">
            Greenwich • New Year Solana Meme Token
          </p>
          <p className="font-mono">Contract: {CONTRACT_ADDRESS}</p>
          <p className="flex flex-wrap items-center gap-2 text-[0.7rem] text-slate-400">
            <span>Socials:</span>
            <a
              href="https://x.com/SolanaGreenwich"
              target="_blank"
              rel="noreferrer"
              className="underline-offset-2 hover:text-solanaTeal hover:underline"
            >
              X
            </a>
          </p>
        </div>
        <div className="space-y-2 text-[0.7rem] text-slate-400 md:text-xs">
          <p>
            This is a meme token. No financial advice. Do your own research
            (DYOR). Tokens like this can be highly volatile and may go to zero.
          </p>
          <p>
            Nothing on this site is an invitation, recommendation, or promise of
            future value. Participation is entirely at your own risk.
          </p>
        </div>
      </div>

      {/* нижняя праздничная плашка */}
      <div className="border-t border-white/10 bg-gradient-to-r from-solanaTeal/10 via-solanaPurple/15 to-solanaMagenta/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-center text-[0.7rem] text-slate-200 md:flex-row md:items-center md:justify-between md:text-xs">
          <div className="flex items-center justify-center gap-3 md:justify-start">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-solanaTeal via-solanaPurple to-solanaMagenta text-[0.7rem] font-bold text-slate-950 shadow-glow-teal/60">
              $GRIC
            </div>
            <p className="font-medium tracking-wide">
              $GRIC - Greenwich | HODL the Holiday Spirit! 🎄
            </p>
          </div>
          <p className="text-[0.68rem] text-slate-300 md:text-[0.7rem]">
            © 2025 $GRIC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
