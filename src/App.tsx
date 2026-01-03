import React, { useEffect, useState } from 'react';
import HeroSection from './components/HeroSection';
import LiveChartSection from './components/LiveChartSection';
import AboutSection from './components/AboutSection';
import { Snowfall } from '@namnguyenthanhwork/react-snowfall-effect';
import PixelSnowBackground from './components/PixelSnowBackground';
import FloatingIslandHeader from './components/FloatingIslandHeader';
import HowToBuySection from './components/HowToBuySection';
import TokenomicsSection from './components/TokenomicsSection';
import RoadmapSection from './components/RoadmapSection';
import CommunitySection from './components/CommunitySection';
import Footer from './components/Footer';
import BackgroundMusic from './components/BackgroundMusic';
import CursorSnowTrail from './components/CursorSnowTrail';
import FloatingSlogans from './components/FloatingSlogans';

const App: React.FC = () => {
  const [booting, setBooting] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);

  useEffect(() => {
    const duration = 4600; // ~4.6s
    const stepMs = 80;
    const totalSteps = Math.ceil(duration / stepMs);

    let currentStep = 0;
    const interval = window.setInterval(() => {
      currentStep += 1;
      const ratio = Math.min(1, currentStep / totalSteps);
      setBootProgress(Math.round(ratio * 100));
      if (ratio >= 1) {
        window.clearInterval(interval);
        setBooting(false);
      }
    }, stepMs);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <PixelSnowBackground
        pixelResolution={500}
        speed={0.6}
        density={0.75}
        flakeSize={0.026}
        brightness={0.4}
        depthFade={13.5}
        direction={125}
      />

      <div className="pointer-events-none fixed inset-0 z-[1] bg-animated-dark" />

      <Snowfall
        className="pointer-events-none"
        snowflakeCount={45}
        fps={50}
        fadeEdges
        snowflakeShape="star"
        gravity={0.02}
        speed={{ min: 0.05, max: 0.25 }}
        opacity={{ min: 0.35, max: 0.9 }}
        size={{ min: 10, max: 26 }}
        colors={["#ffffff", "#e0f2fe", "#e4d2d2ff"]}
        zIndex={5}
      />

      <FloatingIslandHeader />
      <FloatingSlogans />

      {booting && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-3xl">
          <div className="pointer-events-auto glass-panel gradient-ring ny-glow-ring flex max-w-md flex-col items-center gap-5 border-white/20 bg-slate-950/95 px-10 py-7 text-center shadow-glow-teal">
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 rounded-full border border-solanaTeal/30" />
              <div className="absolute inset-2 rounded-full border-t-2 border-solanaTeal/80 border-r-2 border-transparent animate-spin" />
              <div className="absolute inset-3 rounded-full border border-solanaPurple/50 opacity-60" />
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.35em] text-solanaTeal">
                New Year on Solana
              </p>
              <p className="text-sm text-slate-200">
                Greenwich is syncing with DexScreener and warming up the winter sky.
              </p>
            </div>

            {/* прогресс загрузки */}
            <div className="mt-2 flex w-full flex-col items-stretch gap-1">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800/80">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-solanaTeal via-solanaPurple to-solanaMagenta transition-all duration-150 ease-out"
                  style={{ width: `${bootProgress}%` }}
                />
              </div>
              <p className="text-[0.65rem] uppercase tracking-[0.25em] text-slate-400">
                {bootProgress}% loaded
              </p>
            </div>
          </div>
        </div>
      )}

      <main className="relative z-[5] mx-auto w-full max-w-6xl flex-1 px-4 pb-16 pt-10 md:pt-14">
        <HeroSection />
        <LiveChartSection />
        <AboutSection />
        <HowToBuySection />
        <TokenomicsSection />
        <RoadmapSection />
        <CommunitySection />
      </main>

      <Footer />

      <BackgroundMusic />
      <CursorSnowTrail />
    </div>
  );
};

export default App;
