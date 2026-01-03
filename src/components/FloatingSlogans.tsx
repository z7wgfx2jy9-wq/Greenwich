import React, { useEffect, useState } from 'react';

interface SloganInstance {
  id: number;
  text: string;
  left: string;
  bottom: string;
  delay: number;
}

const PHRASES: string[] = [
  'HODL the Holiday Spirit! 🎄',
  'To the Moon & Merry 🚀',
  'Snow Much Gains ❄️🪙',
  'Sleigh All Day 🎁',
  '$GRIC Under the Tree 🎄',
  'Crypto Bells Ring 🔔',
  'Frosty HODL ❄️',
  'Jingle Bells, HODL Smells 🎅',
  'Rocketing Reindeer 🚀🦌',
  'Meme Coins, Merry Times 🪙🎄',
  'Santa’s Portfolio 🎁',
  'Snowflakes & Mooncakes ❄️🌙',
  'Ho-Ho-HODL 🎅',
  'Festive FOMO 🎄💎',
  'Candy Cane Gains 🍬🪙',
  'North Pole to the Moon 🗺️🚀',
  'Winter Wonderland of $GRIC ❄️🎄',
  'Sleigh Your Portfolio 🎁💰',
  'Merry Minting! 🎄🪙',
  'Ho-Ho-HODL Your Tokens 🎅🚀',
  'Green candles, red Santa 🎄🕯️',
  'All I want for Xmas is $GRIC 🎁🪙',
  'Silent Night, Loud Gains 🌙🚀'
];

const FloatingSlogans: React.FC = () => {
  const [items, setItems] = useState<SloganInstance[]>([]);

  useEffect(() => {
    let id = 0;
    const interval = window.setInterval(() => {
      const text = PHRASES[Math.floor(Math.random() * PHRASES.length)];
      const left = `${10 + Math.random() * 80}%`;
      const bottom = `${5 + Math.random() * 40}%`;
      const delay = Math.random() * 0.5; // небольшая вариация sparkles

      const next: SloganInstance = {
        id: id++,
        text,
        left,
        bottom,
        delay
      };

      setItems((prev) => [...prev, next]);

      // гарантированно удаляем элемент через ~2.2 секунды,
      // чтобы не копились невидимые узлы и не visели старые слоганы
      window.setTimeout(() => {
        setItems((prev) => prev.filter((item) => item.id !== next.id));
      }, 2200);
    }, 1500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[3] overflow-hidden">
      {items.map((item) => (
        <div
          key={item.id}
          className="gric-slogan absolute"
          style={{
            left: item.left,
            bottom: item.bottom,
            animationDelay: `${item.delay}s`
          }}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
};

export default FloatingSlogans;
