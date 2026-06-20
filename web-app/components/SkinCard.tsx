'use client';

import { motion } from 'framer-motion';
import { Skin } from '@/types';
import { rarityBorderColors, rarityColors, getRarityLabel, rarityHexColors, rarityGlowIntensity } from '@/utils/rarity';
import { formatZCoins } from '@/utils/format';
import { getSkinPrice } from '@/utils/prices';
import SkinImage from '@/components/SkinImage';

interface SkinCardProps {
  skin: Skin;
  floatValue?: number | null;
  action?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  };
  showPrice?: boolean;
}

export default function SkinCard({ skin, floatValue, action, showPrice = true }: SkinCardProps) {
  const price = getSkinPrice(skin.id);
  const glowColor = rarityHexColors[skin.rarity];
  const glowIntensity = rarityGlowIntensity[skin.rarity];
  
  return (
    <motion.div
      className={`bg-surface-light rounded-lg border-2 ${rarityBorderColors[skin.rarity]} overflow-hidden hover:shadow-lg transition-all relative`}
      style={{
        boxShadow: `0 0 ${15 * glowIntensity}px ${glowColor}${Math.floor(glowIntensity * 100).toString(16)}`
      }}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Glow effect background */}
      <div 
        className="absolute inset-0 opacity-20 blur-xl"
        style={{
          background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`
        }}
      />
      
      {/* Image */}
      <div className="relative aspect-square bg-gradient-to-br from-surface to-surface-light flex items-center justify-center p-4">
        <SkinImage
          src={skin.imagePath}
          alt={skin.name}
          fallbackText={skin.name[0]}
          className="w-full h-full"
          style={{
            filter: `drop-shadow(0 0 ${8 * glowIntensity}px ${glowColor})`
          }}
        />
      </div>

      {/* Info */}
      <div className="p-3 relative z-10">
        <div className={`text-xs font-semibold uppercase ${rarityColors[skin.rarity]} mb-1`}>
          {getRarityLabel(skin.rarity)}
        </div>
        <h3 className="font-semibold text-white mb-2 truncate">{skin.name}</h3>
        {typeof floatValue === 'number' && (
          <div className="text-xs text-gray-400 mb-2">
            Float: <span className="text-white font-mono">{floatValue.toFixed(4)}</span>
          </div>
        )}
        
        {showPrice && (
          <div className="flex items-center justify-between mb-2">
            <span className="text-primary font-bold flex items-center">
              <span className="text-xs mr-1">Z</span>
              {formatZCoins(price)}
            </span>
          </div>
        )}

        {action && (
          <motion.button
            onClick={action.onClick}
            disabled={action.disabled}
            className={`w-full py-2 px-4 rounded font-medium text-sm ${
              action.disabled
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-primary hover:bg-primary-dark text-black'
            } transition-colors`}
            whileHover={action.disabled ? {} : { scale: 1.02 }}
            whileTap={action.disabled ? {} : { scale: 0.98 }}
          >
            {action.label}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
