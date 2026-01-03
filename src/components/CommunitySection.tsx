import React from 'react';
import ScrollReveal from './ScrollReveal';

const CommunitySection: React.FC = () => {
  return (
    <section id="community" className="section-padding">
      <ScrollReveal className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-solanaTeal">
          Community
        </p>
        <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
          The winter island is only fun when it is crowded.
        </h2>
      </ScrollReveal>

      <ScrollReveal className="glass-panel gradient-ring mx-auto max-w-4xl bg-slate-950/85 p-6 md:p-8">
        <div className="grid gap-6 md:grid-cols-[2fr,1fr] md:items-center">
          <div className="space-y-4 text-sm text-slate-200">
            <p>
              Greenwich lives where degens gather to count down the last blocks
              of the year. X is the main campfire, filled with Solana memes,
              winter art, and countdown noise.
            </p>
            <p className="text-slate-300">
              Join the conversation, share ideas for seasonal events, and help
              decide what the island should look like next New Year. Everyone is
              invited, but personal responsibility is non‑negotiable.
            </p>
          </div>
          <div className="space-y-4">
            <a
              href="https://x.com/SolanaGreenwich"
              target="_blank"
              rel="noreferrer"
              className="primary-btn w-full justify-center"
            >
              Join X
            </a>
            <p className="text-[0.7rem] text-slate-400">
              Community channels are for entertainment and coordination only.
              No guaranteed returns, no secret signals, no hidden roadmaps.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default CommunitySection;
