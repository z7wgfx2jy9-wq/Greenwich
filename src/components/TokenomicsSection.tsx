import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';

const slices = [
  {
    label: 'Liquidity Pool',
    value: 55,
    color: '#00f5a0'
  },
  {
    label: 'Community Treasury',
    value: 20,
    color: '#6b5bff'
  },
  {
    label: 'Seasonal Events',
    value: 15,
    color: '#ff3e9e'
  },
  {
    label: 'Team & Ops',
    value: 10,
    color: '#38bdf8'
  }
] as const;

const ARC_RADIUS = 64;
const circumference = 2 * Math.PI * ARC_RADIUS;

const TokenomicsSection: React.FC = () => {
  let offset = 0;
  const [logoSrc, setLogoSrc] = useState('/GRIC.png');

  return (
    <section id="tokenomics" className="section-padding">
      <ScrollReveal className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-solanaTeal">
          Tokenomics
        </p>
        <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
          A clean layout for a chaotic meme.
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
          Percentages are designed around liquidity first and flexible
          community growth. No complex diagrams, just transparent slices.
        </p>
      </ScrollReveal>

      <div className="grid items-center gap-10 md:grid-cols-2">
        <ScrollReveal className="flex justify-center">
          <div className="relative h-72 w-72 animate-pulse-soft md:h-80 md:w-80">
            <svg viewBox="0 0 140 140" className="h-full w-full rotate-[-90deg]">
              <defs>
                <radialGradient id="ring-glow" cx="50%" cy="50%" r="60%">
                  <stop offset="0%" stopColor="rgba(56,189,248,0.18)" />
                  <stop offset="40%" stopColor="rgba(56,189,248,0.05)" />
                  <stop offset="100%" stopColor="rgba(15,23,42,1)" />
                </radialGradient>
                <radialGradient id="ring-core" cx="50%" cy="50%" r="55%">
                  <stop offset="0%" stopColor="rgba(15,23,42,1)" />
                  <stop offset="100%" stopColor="rgba(15,23,42,0.8)" />
                </radialGradient>
              </defs>
              <circle
                cx={70}
                cy={70}
                r={68}
                fill="url(#ring-glow)"
                stroke="rgba(148,163,184,0.24)"
                strokeWidth={1.5}
              />
              <g className="tokenomics-ring">
                {slices.map((slice) => {
                  const sliceLength = (slice.value / 100) * circumference;
                  const dashArray = `${sliceLength} ${circumference - sliceLength}`;
                  const strokeDashoffset = offset;
                  offset -= sliceLength;
                  return (
                    <circle
                      key={slice.label}
                      cx={70}
                      cy={70}
                      r={ARC_RADIUS}
                      fill="transparent"
                      stroke={slice.color}
                      strokeWidth={12}
                      strokeDasharray={dashArray}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      className="[filter:drop-shadow(0_0_18px_rgba(56,189,248,0.45))]"
                    />
                  );
                })}
              </g>
            </svg>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-20 w-20 overflow-hidden rounded-full border border-white/15 bg-slate-950/90 shadow-[0_0_25px_rgba(56,189,248,0.4)] md:h-40 md:w-40">
                <img
                  src={logoSrc}
                  onError={() => {
                    if (logoSrc !== '/GRIC.jpg') {
                      setLogoSrc('/GRIC.jpg');
                    }
                  }}
                  alt="$GRIC token logo"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="space-y-4 text-sm text-slate-200">
          {slices.map((slice) => (
            <div
              key={slice.label}
              className="glass-panel flex items-center justify-between bg-slate-950/80 p-3 md:p-4"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: slice.color }}
                />
                <div>
                  <p className="text-sm font-semibold text-slate-100">
                    {slice.label}
                  </p>
                  <p className="text-[0.7rem] text-slate-400">
                    Focused on seasonal events, depth on Solana, and keeping
                    Greenwich actively glowing during winter meta.
                  </p>
                </div>
              </div>
              <p className="text-sm font-semibold text-solanaTeal">
                {slice.value}%
              </p>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TokenomicsSection;
