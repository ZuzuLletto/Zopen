'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Skin } from '@/types';
import { rarityBorderColors, rarityColors } from '@/utils/rarity';

interface CaseRouletteProps {
  items: Skin[];
  onComplete: () => void;
  winningItem: Skin;
}

export default function CaseRoulette({ items, onComplete, winningItem }: CaseRouletteProps) {
  const controls = useAnimation();
  const [isSpinning, setIsSpinning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spin = async () => {
      setIsSpinning(true);
      
      // Calculate the position to land on the winning item
      const itemWidth = 180; // width + margin
      const winningIndex = Math.floor(items.length * 0.75);
      const centerOffset = containerRef.current ? containerRef.current.offsetWidth / 2 - itemWidth / 2 : 0;
      const targetPosition = -(winningIndex * itemWidth - centerOffset);

      // Spin animation with easing
      await controls.start({
        x: targetPosition,
        transition: {
          duration: 5,
          ease: [0.22, 1, 0.36, 1], // Custom easing for smooth deceleration
        },
      });

      setIsSpinning(false);
      
      // Delay before calling onComplete to show the result
      setTimeout(() => {
        onComplete();
      }, 1000);
    };

    spin();
  }, [controls, items.length, onComplete]);

  return (
    <div className="relative w-full overflow-hidden bg-surface rounded-lg border-2 border-border">
      {/* Center indicator */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 bg-primary z-20 shadow-lg shadow-primary/50">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full">
          <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-primary" />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full">
          <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-primary" />
        </div>
      </div>

      {/* Gradient overlays for fade effect */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-surface to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-surface to-transparent z-10" />

      {/* Items container */}
      <div ref={containerRef} className="relative h-56 py-4 overflow-hidden">
        <motion.div
          className="flex space-x-4 absolute left-0"
          animate={controls}
          initial={{ x: 0 }}
        >
          {items.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className={`flex-shrink-0 w-40 h-48 bg-surface-light rounded-lg border-2 ${rarityBorderColors[item.rarity]} p-3 flex flex-col items-center justify-center`}
            >
              <div
                className="w-24 h-24 bg-contain bg-center bg-no-repeat mb-2"
                style={{ backgroundImage: `url(${item.imagePath})` }}
              />
              <div className={`text-xs font-bold uppercase ${rarityColors[item.rarity]} text-center`}>
                {item.rarity}
              </div>
              <div className="text-sm font-semibold text-white text-center truncate w-full">
                {item.name}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
