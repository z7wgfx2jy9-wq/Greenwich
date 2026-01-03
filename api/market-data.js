const PAIR_ADDRESS = 'MVuxtBQJP2EhQnoTuPdNJuXemCtLyn6SzqGjL2upump';
const DEXSCREENER_URL = `https://api.dexscreener.com/latest/dex/pairs/solana/${PAIR_ADDRESS}`;

const generateChartPoints = (priceUsd, length = 60, change5m = null, change1h = null) => {
  const now = Date.now();
  const basePrice = typeof priceUsd === 'number' && priceUsd > 0 ? priceUsd : 0;
  const points = [];

  if (!basePrice) {
    for (let i = 0; i < length; i++) {
      const time = now - (length - 1 - i) * 60_000;
      points.push({ time, price: 0 });
    }
    return points;
  }

  const h1 = typeof change1h === 'number' ? change1h : null;
  const m5 = typeof change5m === 'number' ? change5m : null;

  if (h1 == null || m5 == null) {
    let current = basePrice;
    for (let i = 0; i < length; i++) {
      const time = now - (length - 1 - i) * 60_000;
      if (i === 0) {
        points.push({ time, price: current });
        continue;
      }
      const maxMovePerc = 0.01;
      const deltaPerc = (Math.sin(i * 1.2345) * 0.5) * 2 * maxMovePerc;
      const minPrice = basePrice * 0.7;
      const maxPrice = basePrice * 1.3;
      current = Math.max(minPrice, Math.min(maxPrice, current * (1 + deltaPerc)));
      points.push({ time, price: current });
    }
    return points;
  }

  const h1Factor = 1 + h1 / 100;
  const m5Factor = 1 + m5 / 100;

  const price60 = basePrice / (h1Factor || 1);
  const price5 = basePrice / (m5Factor || 1);

  for (let i = 0; i < length; i++) {
    const minutesAgo = length - 1 - i;
    const time = now - minutesAgo * 60_000;

    let targetPrice;
    if (minutesAgo >= 5) {
      const span = 60 - 5;
      const pos = minutesAgo - 5;
      const t = span ? pos / span : 0;
      targetPrice = price60 + (price5 - price60) * (1 - t);
    } else if (minutesAgo > 0) {
      const span = 5;
      const pos = minutesAgo;
      const t = span ? pos / span : 0;
      targetPrice = price5 + (basePrice - price5) * (1 - t);
    } else {
      targetPrice = basePrice;
    }

    const jitterPerc = 0.0025 * Math.sin(i * 0.9);
    const finalPrice = Math.max(
      price60 * 0.6,
      Math.min(basePrice * 1.5, targetPrice * (1 + jitterPerc))
    );

    points.push({ time, price: finalPrice });
  }

  return points;
};

// Vercel handler
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const response = await fetch(DEXSCREENER_URL, {
      headers: { Accept: 'application/json' },
    });

    let priceUsd = 0;
    let volume24h = null;
    let liquidityUsd = null;
    let imageUrl = null;
    let change5m = null;
    let change1h = null;

    if (response.ok) {
      const data = await response.json();
      const pair = data?.pair ?? data?.pairs?.[0];

      if (pair) {
        priceUsd = parseFloat(pair.priceUsd ?? '0');
        volume24h = typeof pair.volume?.h24 === 'number' ? pair.volume.h24 : null;
        liquidityUsd = typeof pair.liquidity?.usd === 'number' ? pair.liquidity.usd : null;
        imageUrl = pair?.info?.imageUrl ?? null;
        change5m = typeof pair.priceChange?.m5 === 'number' ? pair.priceChange.m5 : null;
        change1h = typeof pair.priceChange?.h1 === 'number' ? pair.priceChange.h1 : null;
      }
    }

    const chartPoints = generateChartPoints(priceUsd, 60, change5m, change1h);

    res.status(200).json({
      pairAddress: PAIR_ADDRESS,
      priceUsd,
      volume24h,
      liquidityUsd,
      imageUrl,
      change5m,
      change1h,
      lastUpdated: new Date().toISOString(),
      chart: { points: chartPoints },
    });
  } catch (error) {
    console.error('Error fetching DexScreener data:', error);

    const now = Date.now();
    const fallbackPoints = Array.from({ length: 30 }, (_, index) => ({
      time: now - (29 - index) * 60_000,
      price: 0,
    }));

    res.status(200).json({
      pairAddress: PAIR_ADDRESS,
      priceUsd: 0,
      volume24h: null,
      liquidityUsd: null,
      imageUrl: null,
      change5m: null,
      change1h: null,
      lastUpdated: new Date().toISOString(),
      chart: { points: fallbackPoints },
    });
  }
}