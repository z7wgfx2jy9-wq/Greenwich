import React, { useEffect, useRef } from 'react';

const CursorSnowTrail: React.FC = () => {
  const lastSpawnRef = useRef(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const now = performance.now();
      // троттлинг: не чаще одного раза в ~15ms
      if (now - lastSpawnRef.current < 15) return;
      lastSpawnRef.current = now;

      const snowflake = document.createElement('div');
      snowflake.className = 'cursor-snowflake';

      const size = Math.random() * 8 + 5;
      snowflake.style.width = `${size}px`;
      snowflake.style.height = `${size}px`;
      snowflake.style.left = `${e.pageX - size / 2}px`;
      snowflake.style.top = `${e.pageY - size / 2}px`;

      document.body.appendChild(snowflake);

      window.setTimeout(() => {
        snowflake.remove();
      }, 1000);
    };

    document.addEventListener('mousemove', handleMove);
    return () => document.removeEventListener('mousemove', handleMove);
  }, []);

  return null;
};

export default CursorSnowTrail;
