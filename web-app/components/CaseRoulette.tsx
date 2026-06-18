'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Skin } from '@/types';
import { rarityBorderColors, rarityColors, rarityHexColors, rarityGlowIntensity, getRarityLabel } from '@/utils/rarity';

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
      
      // Winning item'ın items array'inde KESIN index'ini bul
      // generateRouletteItems tam olarak 75% pozisyonuna koyuyor
      const expectedWinningIndex = Math.floor(items.length * 0.75);
      
      // Önce beklenen index'e bak
      let actualWinningIndex = expectedWinningIndex;
      
      // Eğer beklenen yerde yoksa çevresinde ara (±3 index)
      if (items[expectedWinningIndex]?.id !== winningItem.id) {
        let found = false;
        for (let offset = 1; offset <= 3; offset++) {
          if (items[expectedWinningIndex + offset]?.id === winningItem.id) {
            actualWinningIndex = expectedWinningIndex + offset;
            found = true;
            break;
          }
          if (items[expectedWinningIndex - offset]?.id === winningItem.id) {
            actualWinningIndex = expectedWinningIndex - offset;
            found = true;
            break;
          }
        }
        
        // Hala bulamadıysa tüm array'de ara
        if (!found) {
          const foundIndex = items.findIndex(item => item.id === winningItem.id);
          if (foundIndex !== -1) {
            actualWinningIndex = foundIndex;
          }
        }
      }
      
      // TAM HESAPLAMA:
      // Her item: width=160px (w-40) + margin-right=16px (space-x-4) = 176px
      const ITEM_WIDTH = 176;
      
      // Container'ın genişliği
      const containerWidth = containerRef.current?.offsetWidth || 1200;
      
      // Container'ın merkezi
      const centerOffset = containerWidth / 2;
      
      // Winning item'ın sol kenarının pozisyonu
      const winningItemLeftPosition = actualWinningIndex * ITEM_WIDTH;
      
      // Winning item'ın merkezini bul (sol kenar + yarı genişlik)
      const winningItemCenter = winningItemLeftPosition + (ITEM_WIDTH / 2);
      
      // Hedef: winning item'ın merkezi = container'ın merkezi
      // x pozisyonu negative olmalı (sola kaydırıyoruz)
      const targetPosition = centerOffset - winningItemCenter;

      // Spin animation
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
  }, [controls, items, winningItem, onComplete]);

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
          {items.map((item, index) => {
            const glowColor = rarityHexColors[item.rarity];
            const glowIntensity = rarityGlowIntensity[item.rarity];
            
            return (
              <div
                key={`${item.id}-${index}`}
                className={`flex-shrink-0 w-40 h-48 bg-surface-light rounded-lg border-2 ${rarityBorderColors[item.rarity]} p-3 flex flex-col items-center justify-center relative`}
                style={{
                  boxShadow: `0 0 ${10 * glowIntensity}px ${glowColor}${Math.floor(glowIntensity * 80).toString(16)}`
                }}
              >
                {/* Glow background */}
                <div 
                  className="absolute inset-0 opacity-15 blur-lg rounded-lg"
                  style={{
                    background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`
                  }}
                />
                
                <div
                  className="w-24 h-24 bg-contain bg-center bg-no-repeat mb-2 relative z-10"
                  style={{ 
                    backgroundImage: `url(${item.imagePath})`,
                    filter: `drop-shadow(0 0 ${6 * glowIntensity}px ${glowColor})`
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
