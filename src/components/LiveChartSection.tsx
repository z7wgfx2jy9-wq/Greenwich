import React, { useEffect, useState } from 'react';
import ScrollReveal from './ScrollReveal';
import type { ChartPoint } from './PriceChart';

interface MarketData {
  pairAddress: string;
  priceUsd: number | null;
  volume24h: number | null;
  liquidityUsd: number | null;
  imageUrl?: string | null;
  lastUpdated: string | null;
  change5m: number | null;
  change1h: number | null;
  chart: {
    points: ChartPoint[];
  };
}

const computeChangePercent = (points: ChartPoint[] | undefined, stepsBack: number): number | null => {
  if (!points || points.length < 2) return null;
  const used = points.slice(-60);
  const n = used.length;
  if (n < 2) return null;
  const idxBase = Math.max(0, n - 1 - stepsBack);
  const current = used[n - 1].price;
  const base = used[idxBase].price;
  if (!base) return null;
  return ((current - base) / base) * 100;
};

const formatChange = (value: number | null | undefined): string => {
  if (value == null || !Number.isFinite(value)) return '-';
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
};

const LiveChartSection: React.FC = () => {
  const [market, setMarket] = useState<MarketData | null>(null);

  const fetchMarket = async () => {
    try {
      const response = await fetch('/api/market-data');
      if (!response.ok) {
        throw new Error('Failed to load market data');
      }
      const json = (await response.json()) as MarketData;
      setMarket(json);
    } catch {
      // ignore errors; UI will just show last known values
    }
  };

  useEffect(() => {
    fetchMarket();
    const handle = window.setInterval(fetchMarket, 5_000);
    return () => window.clearInterval(handle);
  }, []);

  const change1h = market?.change1h ?? computeChangePercent(market?.chart?.points, 60);
  const change5m = market?.change5m ?? computeChangePercent(market?.chart?.points, 5);

  const formatUsd = (value: number | null | undefined) => {
    if (value == null) return '-';
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
    if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
    return `$${value.toFixed(2)}`;
  };

  return (
    <section id="chart" className="section-padding">
      <ScrollReveal className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-solanaTeal">
          Live Market
        </p>
        <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
          Real-time glow straight from DexScreener.
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
          Greenwich listens directly to the Solana markets. Price, volume, and
          liquidity data are mirrored from DexScreener to keep the winter
          candles honest.
        </p>
      </ScrollReveal>

      <ScrollReveal className="glass-panel gradient-ring ny-glow-ring grid gap-8 border-emerald-300/40 bg-slate-950/80 p-5 shadow-2xl md:grid-cols-[1.6fr,1fr] md:p-7">
        <div>
          <div className="mb-3 flex items-center justify-between gap-2">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-solanaTeal">
                Greenwich / SOL
              </p>
              <p className="mt-1 text-sm text-slate-300">
                Data relayed through DexScreener API
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400">Last update</p>
              <p className="text-xs font-mono text-slate-200">
                {market?.lastUpdated
                  ? new Date(market.lastUpdated).toLocaleTimeString()
                  : '-'}
              </p>
            </div>
          </div>
          <div className="h-80 md:h-50 overflow-hidden rounded-3xl ring-1 ring-emerald-300/40 bg-slate-950/80">
            <iframe
src="https://dexscreener.com/solana/MWKqARwwmCuag1K6siRG5NWgUWJV6V5uizbwLtppump?embed=1&theme=dark&trades=0&info=0"
              title="Greenwich / SOL chart"
              className="h-full w-full"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>

        <div className="flex flex-col justify-between gap-6">
          <div className="space-y-2 text-xs">
            <p className="uppercase tracking-[0.3em] text-solanaTeal">
              Greenwich / SOL
            </p>
            <p className="text-[0.7rem] text-slate-400">
              Data relayed through DexScreener API
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-baseline justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Price (USD)
              </p>
              <p className="text-xs font-mono text-slate-400">DexScreener pair</p>
            </div>
            <p className="text-3xl font-semibold text-solanaTeal">
              {market?.priceUsd != null ? `$${market.priceUsd.toFixed(6)}` : '-'}
            </p>
            <div className="mt-2 flex flex-wrap gap-2 text-[0.7rem] md:text-xs">
              <span
                className={`rounded-full px-2.5 py-0.5 ${
                  (change1h ?? 0) >= 0
                    ? 'bg-emerald-500/10 text-emerald-300'
                    : 'bg-rose-500/10 text-rose-300'
                }`}
              >
                1h: {formatChange(change1h)}
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 ${
                  (change5m ?? 0) >= 0
                    ? 'bg-sky-500/10 text-sky-300'
                    : 'bg-rose-500/10 text-rose-300'
                }`}
              >
                5m: {formatChange(change5m)}
              </span>
            </div>
          </div>

          <div className="grid gap-3 text-sm md:grid-cols-2">
            <div className="glass-panel border-white/10 bg-slate-900/80 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                24h Volume
              </p>
              <p className="mt-2 text-lg font-semibold">
                {formatUsd(market?.volume24h ?? null)}
              </p>
              <p className="mt-1 text-[0.68rem] text-slate-400">
                Winter volatility brought by the Solana degen crowd.
              </p>
            </div>
            <div className="glass-panel border-white/10 bg-slate-900/80 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                Liquidity (USD)
              </p>
              <p className="mt-2 text-lg font-semibold">
                {formatUsd(market?.liquidityUsd ?? null)}
              </p>
              <p className="mt-1 text-[0.68rem] text-slate-400">
                Pool depth on Solana, mirrored from DexScreener.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-3 text-[0.72rem] text-emerald-100">
            <span className="font-semibold">Live feed notice:</span>{' '}
            Data is fetched directly from DexScreener for pair{' '}
            <span className="font-mono">{market?.pairAddress ?? 'loading'}</span>.
            Numbers may reflect the brief delay of public DEX feeds.
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default LiveChartSection;
