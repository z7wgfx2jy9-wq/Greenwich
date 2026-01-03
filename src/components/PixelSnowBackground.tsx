import React, { useEffect, useRef } from 'react';

interface PixelParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  driftX: number;
  color: string;
  depth: number;
}

export type PixelSnowVariant = 'square' | 'round' | 'snowflake';

export interface PixelSnowBackgroundProps {
  color?: string; // base color
  flakeSize?: number; // size in scene units (multiplier)
  minFlakeSize?: number; // min px on screen
  pixelResolution?: number; // controls density/scale
  speed?: number; // speed multiplier
  depthFade?: number; // depth fade intensity
  brightness?: number; // brightness multiplier
  gamma?: number; // gamma correction
  density?: number; // 0-1 probability/density
  variant?: PixelSnowVariant; // shape
  direction?: number; // wind direction in degrees
  className?: string;
  style?: React.CSSProperties;
}

const createParticle = (
  width: number,
  height: number,
  baseColor: string,
  minSize: number,
  flakeScale: number,
  speedMul: number,
  directionRad: number
): PixelParticle => {
  const depth = Math.random();
  const size = minSize + Math.random() * minSize * flakeScale * (0.5 + depth);
  const baseSpeed = 0.4 + Math.random() * 1.4;
  const speedY = (baseSpeed + depth * 0.6) * speedMul;
  const speed = speedY;
  const driftX = Math.cos(directionRad) * speed * 0.35;
  const color = baseColor;

  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size,
    speedY,
    driftX,
    color,
    depth
  };
};

const PixelSnowBackground: React.FC<PixelSnowBackgroundProps> = ({
  color = '#e5f3ff',
  flakeSize = 0.01,
  minFlakeSize = 1.25,
  pixelResolution = 200,
  speed = 1.25,
  depthFade = 8,
  brightness = 1,
  gamma = 0.4545,
  density = 0.3,
  variant = 'square',
  direction = 125,
  className = '',
  style
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId: number;

    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setSize();

    const area = (width * height) / (pixelResolution || 200);
    const baseCount = Math.max(40, area * 0.02);
    const particleCount = Math.min(400, Math.floor(baseCount * Math.min(Math.max(density, 0), 1)));

    const dirRad = (direction * Math.PI) / 180;

    let particles: PixelParticle[] = Array.from({ length: particleCount }, () =>
      createParticle(width, height, color, minFlakeSize, flakeSize, speed, dirRad)
    );

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // тёмный фон с лёгким шумом
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.driftX;

        if (p.y - p.size > height) {
          const reset = createParticle(width, height, color, minFlakeSize, flakeSize, speed, dirRad);
          p.x = reset.x;
          p.y = -reset.size;
          p.size = reset.size;
          p.speedY = reset.speedY;
          p.driftX = reset.driftX;
          p.color = reset.color;
        }
        if (p.x < -p.size) p.x = width + p.size;
        if (p.x > width + p.size) p.x = -p.size;

        // depth fade + brightness
        const depthAlpha = Math.max(0, 1 - p.depth * (depthFade / 10));
        const alpha = Math.min(1, depthAlpha * brightness);

        ctx.save();
        ctx.globalAlpha = Math.pow(alpha, gamma);
        ctx.fillStyle = p.color;

        const x = Math.round(p.x);
        const y = Math.round(p.y);

        if (variant === 'round') {
          ctx.beginPath();
          ctx.arc(x + p.size / 2, y + p.size / 2, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (variant === 'snowflake') {
          const half = p.size / 2;
          ctx.fillRect(x, y + half - 1, p.size, 2);
          ctx.fillRect(x + half - 1, y, 2, p.size);
          ctx.fillRect(x + 1, y + 1, p.size - 2, p.size - 2);
        } else {
          // square / default
          ctx.fillRect(x, y, p.size, p.size);
        }

        ctx.restore();
      });

      animationFrameId = window.requestAnimationFrame(render);
    };

    animationFrameId = window.requestAnimationFrame(render);

    const onResize = () => {
      setSize();
      const areaNew = (width * height) / (pixelResolution || 200);
      const baseCountNew = Math.max(40, areaNew * 0.02);
      const particleCountNew = Math.min(400, Math.floor(baseCountNew * Math.min(Math.max(density, 0), 1)));
      particles = Array.from({ length: particleCountNew }, () =>
        createParticle(width, height, color, minFlakeSize, flakeSize, speed, dirRad)
      );
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-0 block h-full w-full ${className}`}
      style={style}
    />
  );
};

export default PixelSnowBackground;
