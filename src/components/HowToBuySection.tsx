import React from 'react';
import ScrollReveal from './ScrollReveal';
import CopyAddressButton from './CopyAddressButton';

const CONTRACT_ADDRESS = 'MWKqARwwmCuag1K6siRG5NWgUWJV6V5uizbwLtppump';

const steps = [
  {
    title: '1. Install a Solana wallet',
    body: 'Use a trusted Solana wallet such as Phantom or Backpack. Create a new wallet, secure your seed phrase offline, and enable browser extension access.'
  },
  {
    title: '2. Fund with SOL',
    body: 'Buy SOL on a centralized exchange or bridge from another chain. Send SOL to your wallet address on Solana mainnet to cover both swaps and fees.'
  },
  {
    title: '3. Open the Dex link',
    body: 'Click the “Buy on Dex” button or open the official DexScreener pair. Verify that the contract address matches the one displayed below before swapping.'
  },
  {
    title: '4. Swap for Greenwich',
    body: 'Connect your wallet, choose the SOL → Greenwich pair, and confirm the swap. Start small, watch slippage, and remember that this is a pure meme token.'
  }
] as const;

const HowToBuySection: React.FC = () => {
  return (
    <section id="how-to-buy" className="section-padding">
      <ScrollReveal className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-solanaTeal">
          How to Buy
        </p>
        <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
          Four simple steps to join the winter island.
        </h2>
      </ScrollReveal>

      <div className="grid gap-6 md:grid-cols-4">
        {steps.map((step) => (
          <ScrollReveal key={step.title} className="glass-panel bg-slate-950/80 p-5 text-sm">
            <h3 className="mb-2 text-sm font-semibold text-solanaTeal">{step.title}</h3>
            <p className="text-slate-300">{step.body}</p>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal className="mt-10 glass-panel gradient-ring bg-slate-950/80 p-5 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-solanaTeal">
              Official Contract
            </p>
            <p className="mt-2 font-mono text-xs text-slate-100 md:text-sm">
              {CONTRACT_ADDRESS}
            </p>
            <p className="mt-1 text-[0.7rem] text-slate-400">
              Always double-check this contract before swapping. If it does not
              match, you are not buying the real Greenwich token.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <CopyAddressButton address={CONTRACT_ADDRESS} />
            <a
href="https://dexscreener.com/solana/MWKqARwwmCuag1K6siRG5NWgUWJV6V5uizbwLtppump"
              target="_blank"
              rel="noreferrer"
              className="secondary-btn"
            >
              Open Dex Pair
            </a>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default HowToBuySection;
