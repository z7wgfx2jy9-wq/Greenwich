import React from 'react';
import ScrollReveal from './ScrollReveal';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="section-padding space-y-10">
      <ScrollReveal className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-solanaTeal">
          About Greenwich
        </p>
        <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
          The meme token that lives in the New Year time zone.
        </h2>
      </ScrollReveal>

      <div className="grid gap-6 md:grid-cols-3">
        <ScrollReveal className="glass-panel bg-slate-950/80 p-5 text-sm text-slate-200">
          <h3 className="mb-2 text-sm font-semibold text-solanaTeal">Meme token, serious craft</h3>
          <p className="text-slate-300">
            Greenwich is pure meme energy. No road-to-riches pitch, no
            guaranteed future. Just a carefully designed, premium-feeling home
            for the New Year crowd that loves Solana speed and winter volatility.
          </p>
          <p className="mt-3 text-slate-300">
            The brand is built around the moment when the year flips. Neon
            gradients, floating islands, snowfall, and a guardian character
            who holds the Solana logo like a midnight firework.
          </p>
        </ScrollReveal>

        <ScrollReveal className="glass-panel bg-slate-950/80 p-5 text-sm text-slate-200">
          <h3 className="mb-2 text-sm font-semibold text-solanaTeal">New Year narrative</h3>
          <p className="text-slate-300">
            Every year, traders hunt for the "first meme of the year".
            Greenwich leans into that moment with a dedicated winter–holiday
            aesthetic: snow particles, glass panels, and a cinematic scroll that
            feels like a countdown to midnight.
          </p>
          <p className="mt-3 text-slate-300">
            The story is simple: Greenwich stands where the calendar actually
            flips first. The token is a playful monument to fresh starts, new
            bags, and the yearly tradition of aping into something just because
            the vibes feel right.
          </p>
        </ScrollReveal>

        <ScrollReveal className="glass-panel bg-slate-950/80 p-5 text-sm text-slate-200">
          <h3 className="mb-2 text-sm font-semibold text-solanaTeal">Solana culture, community first</h3>
          <p className="text-slate-300">
            Solana culture is fast, loud, and brutally honest. Greenwich leans
            into that with transparent meme branding and zero illusions. It is a
            community playground, not a bank.
          </p>
          <p className="mt-3 text-slate-300">
            Holders decide where the winter narrative goes: seasonal art,
            quests, New Year countdown spaces, and co-created lore around
            Greenwich and his floating island. Everything is powered by the
            same chain that made meme seasons legendary.
          </p>
        </ScrollReveal>
      </div>

      <ScrollReveal className="glass-panel gradient-ring mt-4 grid gap-6 bg-slate-950/80 p-5 text-sm md:grid-cols-2 md:p-7">
        <div>
          <h3 className="mb-3 text-sm font-semibold text-solanaTeal">Community-driven vision</h3>
          <p className="text-slate-300">
            Greenwich is intentionally lightweight on promises and heavy on raw
            meme culture. The goal is to keep building an environment where the
            community can celebrate the New Year on-chain every single day of
            winter, not just one night.
          </p>
          <p className="mt-3 text-slate-300">
            The vision is to become the go-to symbol for "year flip" energy on
            Solana: countdown events, seasonal art drops, and winter-themed
            collaborations across the ecosystem.
          </p>
        </div>
        <div className="space-y-3 text-slate-300">
          <p>
            There is no roadmap of financial promises. There is only a canvas:
            a premium interface, a clean contract, and a community that enjoys
            building something that looks and feels too expensive for a meme.
          </p>
          <p>
            Every visitor is reminded that this is a meme token. Fun first,
            responsibility always. No one should confuse neon gradients with
            financial guarantees.
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default AboutSection;
