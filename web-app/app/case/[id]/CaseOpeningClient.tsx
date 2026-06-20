'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import CaseRoulette from '@/components/CaseRoulette';
import SkinImage from '@/components/SkinImage';
import { useStore } from '@/store/useStore';
import { selectRandomSkin, generateRouletteItems } from '@/utils/caseOpening';
import { formatZCoins } from '@/utils/format';
import { rarityBorderColors, rarityColors, getRarityLabel } from '@/utils/rarity';
import skinsData from '@/data/skins.json';
import { Skin, Rarity, Case } from '@/types';
import { getCasePrice, getSkinPrice } from '@/utils/prices';
import { formatFloatValue, generateSkinFloat, getWearCondition } from '@/utils/float';

interface CaseOpeningClientProps {
  caseData: Case;
}

export default function CaseOpeningClient({ caseData }: CaseOpeningClientProps) {
  const router = useRouter();
  const casePrice = getCasePrice(caseData.id);
  
  const balance = useStore((state: any) => state.balance);
  const deductBalance = useStore((state: any) => state.deductBalance);
  const addToInventory = useStore((state: any) => state.addToInventory);

  const [isOpening, setIsOpening] = useState(false);
  const [wonSkin, setWonSkin] = useState<Skin | null>(null);
  const [wonFloat, setWonFloat] = useState<number | null>(null);
  const [rouletteItems, setRouletteItems] = useState<Skin[]>([]);
  const [rouletteWinningIndex, setRouletteWinningIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const allSkins = useMemo(() => skinsData as Skin[], []);

  const computedDropRates = useMemo(() => {
    const rates: Record<Rarity, number> = {
      white: 0,
      lightblue: 0,
      darkblue: 0,
      purple: 0,
      pink: 0,
      red: 0,
      gold: 0,
    };
    
    let totalChance = 0;
    for (const drop of caseData.possibleDrops) {
      const skin = allSkins.find((s) => s.id === drop.skinId);
      if (skin) {
        rates[skin.rarity] += drop.chance;
        totalChance += drop.chance;
      }
    }
    
    if (totalChance > 0) {
      for (const rarity of Object.keys(rates) as Rarity[]) {
        rates[rarity] = parseFloat(((rates[rarity] / totalChance) * 100).toFixed(2));
      }
    }
    
    return rates;
  }, [caseData, allSkins]);

  const handleOpenCase = () => {
    if (isOpening || showResult) return;
    
    if (!deductBalance(casePrice)) {
      alert('Insufficient Z-Coins!');
      return;
    }

    // Select winning skin
    const selectedSkin = selectRandomSkin(caseData, allSkins);
    if (!selectedSkin) {
      alert('Error selecting skin. Please try again.');
      return;
    }

    const dropConfig = caseData.possibleDrops.find(d => d.skinId === selectedSkin.id);
    const floatRange = dropConfig?.floatRange;

    setWonSkin(selectedSkin);
    setWonFloat(generateSkinFloat(selectedSkin, floatRange));
    const { items, winningIndex } = generateRouletteItems(selectedSkin, allSkins, caseData, 50);
    setRouletteItems(items);
    setRouletteWinningIndex(winningIndex);
    setIsOpening(true);
  };

  const handleRouletteComplete = () => {
    setIsOpening(false);
    setShowResult(true);
    if (wonSkin) {
      addToInventory(wonSkin, wonFloat);
    }
  };

  const handleOpenAnother = () => {
    setShowResult(false);
    setWonSkin(null);
    setWonFloat(null);
    setRouletteItems([]);
    setRouletteWinningIndex(0);
  };

  const canAfford = balance >= casePrice;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Back Button */}
      <motion.button
        onClick={() => router.push('/')}
        className="mb-6 text-gray-400 hover:text-primary flex items-center space-x-2"
        whileHover={{ x: -5 }}
      >
        <span>←</span>
        <span>Back to Cases</span>
      </motion.button>

      {/* Case Info */}
      <motion.div
        className="bg-surface-light rounded-lg p-8 mb-8 border-2 border-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">{caseData.name}</h1>
            <div className="flex items-center space-x-3">
              <span className="text-gray-400">Cost:</span>
              <div className="flex items-center space-x-2 text-primary text-2xl font-bold">
                <span className="text-lg">Z</span>
                <span>{formatZCoins(casePrice)}</span>
              </div>
            </div>
          </div>
          <div
            className="w-40 h-40 bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${caseData.imagePath})` }}
          />
        </div>

        {/* Drop Rates */}
        <div className="bg-surface p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3">Drop Rates</h3>
          <div className="flex flex-wrap justify-between gap-4">
            {Object.entries(computedDropRates)
              .filter(([_, rate]) => rate > 0)
              .map(([rarity, rate]) => (
                <div key={rarity} className="text-center min-w-[80px] flex-1">
                  <div className={`text-lg font-bold ${rarityColors[rarity as Rarity]}`}>
                    {rate}%
                  </div>
                  <div className="text-xs text-gray-400 uppercase">{rarity}</div>
                </div>
              ))}
          </div>
        </div>
      </motion.div>

      {/* Roulette or Open Button */}
      {!isOpening && !showResult && (
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.button
            onClick={handleOpenCase}
            disabled={!canAfford}
            className={`px-12 py-4 rounded-lg text-xl font-bold ${
              canAfford
                ? 'bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-purple-600 text-black'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            } transition-all shadow-lg`}
            whileHover={canAfford ? { scale: 1.05 } : {}}
            whileTap={canAfford ? { scale: 0.95 } : {}}
          >
            {canAfford ? `Open Case (${formatZCoins(casePrice)} Z-Coins)` : 'Insufficient Z-Coins'}
          </motion.button>
          {!canAfford && (
            <p className="text-red-400 mt-4">
              You need {formatZCoins(casePrice - balance)} more Z-Coins
            </p>
          )}
        </motion.div>
      )}

      {/* Roulette Animation */}
      <AnimatePresence>
        {isOpening && wonSkin && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <CaseRoulette
              items={rouletteItems}
              winningIndex={rouletteWinningIndex}
              onComplete={handleRouletteComplete}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result Display */}
      <AnimatePresence>
        {showResult && wonSkin && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleOpenAnother}
          >
            <motion.div
              className={`bg-surface-light rounded-lg p-8 max-w-md w-full mx-4 border-4 ${rarityBorderColors[wonSkin.rarity as Rarity]} relative`}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', duration: 0.5 }}
              onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            >
              {/* Confetti effect */}
              <motion.div
                className="absolute inset-0 rounded-lg animate-pulse-glow"
                style={{
                  background: `radial-gradient(circle at center, ${
                    wonSkin.rarity === 'gold' ? 'rgba(255, 215, 0, 0.15)' : 'transparent'
                  } 0%, transparent 70%)`
                }}
              />

              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-center mb-6 text-white">
                  🎉 You Won! 🎉
                </h2>
                
                <div className="bg-surface p-6 rounded-lg mb-6">
                  <SkinImage
                    src={wonSkin.imagePath}
                    alt={wonSkin.name}
                    fallbackText={wonSkin.name[0]}
                    className="w-48 h-48 mx-auto mb-4"
                  />
                  <div className={`text-center text-sm font-bold uppercase ${rarityColors[wonSkin.rarity as Rarity]} mb-2`}>
                    {getRarityLabel(wonSkin.rarity as Rarity)}
                  </div>
                  {formatFloatValue(wonFloat) && (() => {
                    const wear = getWearCondition(wonFloat);
                    return (
                      <div className="text-center text-sm text-gray-400 mb-2">
                        Float: <span className="text-white font-mono">{formatFloatValue(wonFloat)}</span>
                        {wear && (
                          <span className="ml-2 text-xs font-semibold text-primary bg-surface-light px-2 py-0.5 rounded border border-border">
                            {wear.label}
                          </span>
                        )}
                        {wear && (
                          <span className="block text-xs text-gray-500 mt-1">
                            {wear.name}
                          </span>
                        )}
                      </div>
                    );
                  })()}
                  <h3 className="text-2xl font-bold text-center text-white mb-2">
                    {wonSkin.name}
                  </h3>
                  <div className="text-center text-primary text-xl font-bold">
                    <span className="text-sm">Z</span> {formatZCoins(getSkinPrice(wonSkin.id))}
                  </div>
                </div>

                <div className="space-y-3">
                  <motion.button
                    onClick={handleOpenAnother}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-black py-3 rounded-lg font-bold hover:from-primary-dark hover:to-purple-600"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Open Another
                  </motion.button>
                  <motion.button
                    onClick={() => router.push('/inventory')}
                    className="w-full bg-surface border-2 border-primary text-primary py-3 rounded-lg font-bold hover:bg-primary hover:text-black"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Inventory
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
