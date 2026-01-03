import React from 'react';

const flakes = Array.from({ length: 96 });

const positions = [
  'left-[2%]',
  'left-[7%]',
  'left-[12%]',
  'left-[17%]',
  'left-[22%]',
  'left-[27%]',
  'left-[32%]',
  'left-[37%]',
  'left-[42%]',
  'left-[47%]',
  'left-[52%]',
  'left-[57%]',
  'left-[62%]',
  'left-[67%]',
  'left-[72%]',
  'left-[77%]',
  'left-[82%]',
  'left-[87%]',
  'left-[92%]'
];

const Snowfall: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {flakes.map((_, index) => {
        const sizeWrapper =
          index % 3 === 0
            ? 'h-3 w-3 opacity-80'
            : index % 3 === 1
              ? 'h-2.5 w-2.5 opacity-70'
              : 'h-2 w-2 opacity-60';
        const speedClass =
          index % 3 === 0
            ? 'animate-snow-slow'
            : index % 3 === 1
              ? 'animate-snow-medium'
              : 'animate-snow-fast';
        const horizontalClass = positions[index % positions.length];

        return (
          <div
            key={index}
            className={`absolute -top-10 ${speedClass} ${horizontalClass}`}
          >
            <div className={`relative ${sizeWrapper}`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-full w-px bg-cyan-100/80" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-px w-full bg-cyan-100/80" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center rotate-45">
                <div className="h-full w-px bg-cyan-100/60" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center rotate-45">
                <div className="h-px w-full bg-cyan-100/60" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Snowfall;
