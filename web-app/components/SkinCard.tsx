'use client';

import { motion } from 'framer-motion';
import { Skin } from '@/types';
import { rarityBorderColors, rarityColors, getRarityLabel } from '@/utils/rarity';
import { formatZCoins } from '@/utils/format';

interface SkinCardProps {
  skin: Skin;
  action?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  };
  showPrice?: boolean;
}

export default function SkinCard({ skin, action, showPrice = true }: SkinCardProps) {
  return (
    <motion.div
      className={`bg-surface-light rounded-lg border-2 ${rarityBorderColors[skin.rarity]} overflow-hidden hover:shadow-lg hover:shadow-${skin.rarity}/20 transition-all`}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image */}
      <div className="relative aspect-square bg-gradient-to-br from-surface to-surface-light flex items-center justify-center p-4">
        <div
          className="w-full h-full bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${skin.imagePath})` }}
        />
        {/* Fallback if image doesn't exist */}
        <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-gray-600 -z-10">
          {skin.name[0]}
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <div className={`text-xs font-semibold uppercase ${rarityColors[skin.rarity]} mb-1`}>
          {getRarityLabel(skin.rarity)}
        </div>
        <h3 className="font-semibold text-white mb-2 truncate">{skin.name}</h3>
        
        {showPrice && (
          <div className="flex items-center justify-between mb-2">
            <span className="text-primary font-bold flex items-center">
              <span className="text-xs mr-1">Z</span>
              {formatZCoins(skin.price)}
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
