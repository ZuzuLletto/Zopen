'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Skin } from '@/types';
import { rarityBorderColors, rarityColors, rarityHexColors, rarityGlowIntensity, getRarityLabel } from '@/utils/rarity';
import SkinImage from '@/components/SkinImage';

interface CaseRouletteProps {
  items: Skin[];
  onComplete: () => void;
  winningIndex: number;
}

export default function CaseRoulette({ items, onComplete, winningIndex }: CaseRouletteProps) {
  const controls = useAnimation();
  const [isSpinning, setIsSpinning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const spin = async () => {
      setIsSpinning(true);

      const containerWidth = containerRef.current?.offsetWidth || 1200;
      const centerOffset = containerWidth / 2;
      const winningElement = itemRefs.current[winningIndex];
      const winningItemCenter = winningElement
        ? winningElement.offsetLeft + winningElement.offsetWidth / 2
        : winningIndex * 176 + 88;
      const targetPosition = centerOffset - winningItemCenter;

      await controls.start({
        x: targetPosition,
        transition: {
          duration: 5,
          ease: [0.22, 1, 0.36, 1],
        },
      });

      setIsSpinning(false);

      setTimeout(() => {
        onComplete();
      }, 1000);
    };

    spin();
  }, [controls, items, winningIndex, onComplete]);

  return (
    <div className="relative w-full overflow-hidden bg-surface rounded-lg border-2 border-border">
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 bg-primary z-20 shadow-lg shadow-primary/50">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full">
          <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-primary" />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full">
          <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-primary" />
        </div>
      </div>

      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-surface to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-surface to-transparent z-10" />

      <div ref={containerRef} className="relative h-56 py-4 overflow-hidden">
        <motion.div
          className="flex space-x-4 absolute left-0"
          animate={controls}
          initial={{ x: 0 }}
        >
          {items.map((item, index) => {
            const glowColor = rarityHexColors[item.rarity];
            const glowIntensity = rarityGlowIntensity[item.rarity];

            return (
              <div
                key={`${item.id}-${index}`}
                ref={(element) => {
                  itemRefs.current[index] = element;
                }}
                className={`flex-shrink-0 w-40 h-48 bg-surface-light rounded-lg border-2 ${rarityBorderColors[item.rarity]} p-3 flex flex-col items-center justify-center relative`}
                style={{
                  boxShadow: `0 0 ${10 * glowIntensity}px ${glowColor}${Math.floor(glowIntensity * 80).toString(16)}`,
                }}
              >
                <div
                  className="absolute inset-0 opacity-15 blur-lg rounded-lg"
                  style={{
                    background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`,
                  }}
                />

                <SkinImage
                  src={item.imagePath}
                  alt={item.name}
                  fallbackText={item.name[0]}
                  className="w-24 h-24 mb-2 relative z-10"
                  style={{
                    filter: `drop-shadow(0 0 ${6 * glowIntensity}px ${glowColor})`,
                  }}
                />
                <div className={`text-xs font-bold uppercase ${rarityColors[item.rarity]} text-center relative z-10`}>
                  {getRarityLabel(item.rarity)}
                </div>
                <div className="text-sm font-semibold text-white text-center truncate w-full relative z-10">
                  {item.name}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
