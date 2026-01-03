import React from 'react';

export interface ChartPoint {
  time: number;
  price: number;
}

interface PriceChartProps {
  points: ChartPoint[];
  loading: boolean;
  error: string;
  lastPrice: number | null;
}

const buildFallbackSeries = (basePrice: number, length = 40): ChartPoint[] => {
  const now = Date.now();
  const safeBase = basePrice > 0 ? basePrice : 0.0008;
  const points: ChartPoint[] = [];
  let current = safeBase;

  for (let i = 0; i < length; i++) {
    const time = now - (length - 1 - i) * 60_000;
    if (i === 0) {
      points.push({ time, price: current });
      continue;
    }
    const maxMovePerc = 0.02; // ~±2% на шаг
    const deltaPerc = (Math.random() - 0.5) * 2 * maxMovePerc;
    const minPrice = safeBase * 0.6;
    const maxPrice = safeBase * 1.4;
    current = Math.max(minPrice, Math.min(maxPrice, current * (1 + deltaPerc)));
    points.push({ time, price: current });
  }

  return points;
};

const PriceChart: React.FC<PriceChartProps> = ({ points, loading: _loading, error: _error, lastPrice }) => {
  const hasBackendSeries = points.length > 0;
  const baseForFallback = lastPrice ?? (hasBackendSeries ? points[points.length - 1]?.price ?? 0 : 0);

  const usedPoints = (hasBackendSeries ? points : buildFallbackSeries(baseForFallback)).slice(-60);

  const prices = usedPoints.map((p) => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const padding = (maxPrice - minPrice || (lastPrice ?? 0) * 0.01) * 0.35;
  const chartMin = minPrice - padding;
  const chartMax = maxPrice + padding;

  const width = 100;
  const height = 100;

  const toX = (index: number) => {
    const n = usedPoints.length;
    if (n <= 1) return width / 2;
    return (index / (n - 1)) * width;
  };

  const toY = (price: number) => {
    if (chartMax === chartMin) return height / 2;
    const ratio = (price - chartMin) / (chartMax - chartMin);
    return height - ratio * height;
  };

  return (
    <svg
      viewBox="0 0 100 100"
      className="h-full w-full rounded-3xl bg-slate-950/70 ring-1 ring-emerald-300/30"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="winter-grid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(148,163,184,0.18)" />
          <stop offset="100%" stopColor="rgba(148,163,184,0.05)" />
        </linearGradient>
        <radialGradient id="chart-glow" cx="50%" cy="0%" r="70%">
          <stop offset="0%" stopColor="rgba(56,189,248,0.35)" />
          <stop offset="45%" stopColor="rgba(56,189,248,0.08)" />
          <stop offset="100%" stopColor="rgba(15,23,42,0.9)" />
        </radialGradient>
        <linearGradient id="price-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>

      {/* фон */}
      <rect x={0} y={0} width={100} height={100} fill="url(#chart-glow)" />

      {/* снежная сетка */}
      <g opacity={0.45} stroke="url(#winter-grid)" strokeWidth={0.18}>
        <line x1={0} x2={100} y1={15} y2={15} />
        <line x1={0} x2={100} y1={50} y2={50} />
        <line x1={0} x2={100} y1={85} y2={85} />
      </g>

      {/* свечной график */}
      {usedPoints.length > 0 && (
        <g>
          {usedPoints.map((p, index) => {
            const xCenter = toX(index);
            const candleWidth = Math.max(0.8, 80 / Math.max(usedPoints.length, 16));

            const open = index === 0 ? p.price : usedPoints[index - 1].price;
            const close = p.price;
            const high = Math.max(open, close);
            const low = Math.min(open, close);

            const openY = toY(open);
            const closeY = toY(close);
            const highY = toY(high);
            const lowY = toY(low);

            const bodyTop = Math.min(openY, closeY);
            const bodyBottom = Math.max(openY, closeY);
            const bodyHeight = Math.max(0.7, bodyBottom - bodyTop);

            const colorUp = '#22c55e';
            const colorDown = '#ef4444';
            const color = close >= open ? colorUp : colorDown;

            return (
              <g key={p.time}>
                {/* тень (wick) */}
                <line
                  x1={xCenter}
                  x2={xCenter}
                  y1={highY}
                  y2={lowY}
                  stroke={color}
                  strokeWidth={0.6}
                  strokeLinecap="round"
                />
                {/* тело свечи */}
                <rect
                  x={xCenter - candleWidth / 2}
                  y={bodyTop}
                  width={candleWidth}
                  height={bodyHeight}
                  fill={color}
                  rx={0.6}
                />
              </g>
            );
          })}
        </g>
      )}

      {/* подпись цены в углу */}
      <text
        x={4}
        y={12}
        fontSize={4}
        fill="rgba(226,232,240,0.9)"
      >

      </text>
    </svg>
  );
};

export default PriceChart;
