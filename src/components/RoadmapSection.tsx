import React from 'react';
import ScrollReveal from './ScrollReveal';

const phases = [
  {
    title: 'Phase I — First Snow',
    body: 'Launch of Greenwich on Solana, initial community formation, art reveal for the floating island and Greenwich character, and first New Year watch party.',
    timeframe: 'Current winter season'
  },
  {
    title: 'Phase II — Frostbite Growth',
    body: 'Listings on community trackers, collaborative winter spaces, meme contests, and community-voted seasonal quests for holders.',
    timeframe: 'Following months'
  },
  {
    title: 'Phase III — Eternal Midnight',
    body: 'Yearly countdown events anchored around Greenwich, cross-project holiday collaborations, and evolving winter lore for the guardian of the island.',
    timeframe: 'Future seasons'
  }
] as const;

const RoadmapSection: React.FC = () => {
  return (
    <section id="roadmap" className="section-padding">
      <ScrollReveal className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-solanaTeal">
          Roadmap
        </p>
        <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
          A neon-lit path through the winter season.
        </h2>
      </ScrollReveal>

      <div className="relative mx-auto max-w-3xl">
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-solanaTeal via-solanaPurple to-transparent md:left-1/2" />
        <div className="space-y-10">
          {phases.map((phase, index) => (
            <ScrollReveal
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className={`relative flex ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}
            >
              <div
                className={`glass-panel relative w-full bg-slate-950/85 p-5 md:w-[47%] ${
                  index % 2 === 0 ? 'md:ml-10' : 'md:mr-10'
                }`}
              >
                <p className="text-xs uppercase tracking-[0.16em] text-solanaTeal">
                  {phase.timeframe}
                </p>
                <h3 className="mt-2 text-sm font-semibold text-slate-100">
                  {phase.title}
                </h3>
                <p className="mt-2 text-sm text-slate-300">{phase.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
