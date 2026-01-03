import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 4001;

const PAIR_ADDRESS = 'MWKqARwwmCuag1K6siRG5NWgUWJV6V5uizbwLtppump';
const DEXSCREENER_URL = `https://api.dexscreener.com/latest/dex/pairs/solana/${PAIR_ADDRESS}`;

app.use(cors());
app.use(express.json());

const generateChartPoints = (priceUsd, length = 60, change5m = null, change1h = null) => {
  const now = Date.now();
  const basePrice = typeof priceUsd === 'number' && priceUsd > 0 ? priceUsd : 0;
  const points = [];

  if (!basePrice) {
    // без цены просто возвращаем плоскую линию по нулям
    for (let i = 0; i < length; i++) {
      const time = now - (length - 1 - i) * 60_000;
      points.push({ time, price: 0 });
    }
    return points;
  }

  const h1 = typeof change1h === 'number' ? change1h : null;
  const m5 = typeof change5m === 'number' ? change5m : null;

  // если нет реальных change-ов, делаем мягкую небольшую волатильность вокруг цены
  if (h1 == null || m5 == null) {
    let current = basePrice;
    for (let i = 0; i < length; i++) {
      const time = now - (length - 1 - i) * 60_000;
      if (i === 0) {
        points.push({ time, price: current });
        continue;
      }
      const maxMovePerc = 0.01; // ~±1% на шаг
      const deltaPerc = (Math.sin(i * 1.2345) * 0.5) * 2 * maxMovePerc;
      const minPrice = basePrice * 0.7;
      const maxPrice = basePrice * 1.3;
      current = Math.max(minPrice, Math.min(maxPrice, current * (1 + deltaPerc)));
      points.push({ time, price: current });
    }
    return points;
  }

  // строим серию, которая согласуется с change1h и change5m из DexScreener
  const h1Factor = 1 + h1 / 100;
  const m5Factor = 1 + m5 / 100;

  const price60 = basePrice / (h1Factor || 1);
  const price5 = basePrice / (m5Factor || 1);

  for (let i = 0; i < length; i++) {
    const minutesAgo = length - 1 - i; // 59..0
    const time = now - minutesAgo * 60_000;

    let targetPrice;
    if (minutesAgo >= 5) {
      // от -60 до -5 минут: плавный ход от price60 к price5
      const span = 60 - 5;
      const pos = minutesAgo - 5; // 55..0
      const t = span ? pos / span : 0;
      targetPrice = price60 + (price5 - price60) * (1 - t);
    } else if (minutesAgo > 0) {
      // от -5 до 0 минут: плавный ход от price5 к basePrice
      const span = 5;
      const pos = minutesAgo; // 5..1
      const t = span ? pos / span : 0;
      targetPrice = price5 + (basePrice - price5) * (1 - t);
    } else {
      targetPrice = basePrice;
    }

    // лёгкий детерминированный шум, чтобы линия не была идеально прямой
    const jitterPerc = 0.0025 * Math.sin(i * 0.9);
    const finalPrice = Math.max(price60 * 0.6, Math.min(basePrice * 1.5, targetPrice * (1 + jitterPerc)));

    points.push({ time, price: finalPrice });
  }

  return points;
};

app.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'Greenwich backend running' });
});

app.get('/api/market-data', async (_req, res) => {
  try {
    const response = await fetch(DEXSCREENER_URL, {
      headers: {
        Accept: 'application/json'
      }
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
      } else {
        console.error('DexScreener response missing pair data');
      }
    } else {
      console.error('DexScreener error status:', response.status);
    }

    const chartPoints = generateChartPoints(priceUsd, 60, change5m, change1h);

    res.json({
      pairAddress: PAIR_ADDRESS,
      priceUsd,
      volume24h,
      liquidityUsd,
      imageUrl,
      change5m,
      change1h,
      lastUpdated: new Date().toISOString(),
      chart: {
        points: chartPoints
      }
    });
  } catch (error) {
    console.error('Error fetching DexScreener data:', error);

    const now = Date.now();
    const fallbackPoints = Array.from({ length: 30 }, (_, index) => ({
      time: now - (29 - index) * 60_000,
      price: 0
    }));

    res.json({
      pairAddress: PAIR_ADDRESS,
      priceUsd: 0,
      volume24h: null,
      liquidityUsd: null,
      imageUrl: null,
      change5m: null,
      change1h: null,
      lastUpdated: new Date().toISOString(),
      chart: {
        points: fallbackPoints
      }
    });
  }
});

app.listen(PORT, () => {
  console.log(`Greenwich backend listening on port ${PORT}`);
});
