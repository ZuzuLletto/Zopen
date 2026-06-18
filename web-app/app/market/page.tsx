'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import SkinCard from '@/components/SkinCard';
import { useStore } from '@/store/useStore';
import { calculateSellPrice, formatZCoins } from '@/utils/format';
import { rarityOrder } from '@/utils/rarity';
import skinsData from '@/data/skins.json';
import { Skin, Rarity } from '@/types';
import { getSkinPrice } from '@/utils/prices';

type ViewMode = 'buy' | 'sell';
type SortOption = 'rarity-asc' | 'rarity-desc' | 'price-asc' | 'price-desc';

export default function MarketPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('buy');
  const [sortBy, setSortBy] = useState<SortOption>('rarity-desc');
  const [filterRarity, setFilterRarity] = useState<Rarity | 'all'>('all');

  const balance = useStore((state) => state.balance);
  const inventory = useStore((state) => state.inventory);
  const deductBalance = useStore((state) => state.deductBalance);
  const addBalance = useStore((state) => state.addBalance);
  const addToInventory = useStore((state) => state.addToInventory);
  const removeFromInventory = useStore((state) => state.removeFromInventory);

  const allSkins = useMemo(() => skinsData as Skin[], []);

  // Get user's inventory skins for sell mode
  const inventorySkins = useMemo(() => {
    return inventory.map((item) => {
      const skin = allSkins.find((s) => s.id === item.skinId);
      return { ...item, skin };
    }).filter((item) => item.skin !== undefined);
  }, [inventory, allSkins]);

  // Filter and sort skins
  const displayedSkins = useMemo(() => {
    let skins = viewMode === 'buy' ? allSkins : inventorySkins.map((item) => item.skin!);

    // Filter by rarity
    if (filterRarity !== 'all') {
      skins = skins.filter((skin) => skin.rarity === filterRarity);
    }

    // Sort
    skins = [...skins].sort((a, b) => {
      switch (sortBy) {
        case 'rarity-asc':
          return rarityOrder[a.rarity] - rarityOrder[b.rarity];
        case 'rarity-desc':
          return rarityOrder[b.rarity] - rarityOrder[a.rarity];
        case 'price-asc':
          return getSkinPrice(a.id) - getSkinPrice(b.id);
        case 'price-desc':
          return getSkinPrice(b.id) - getSkinPrice(a.id);
        default:
          return 0;
      }
    });

    return skins;
  }, [viewMode, allSkins, inventorySkins, filterRarity, sortBy]);

  const handleBuy = (skin: Skin) => {
    const price = getSkinPrice(skin.id);
    if (deductBalance(price)) {
      addToInventory(skin);
      alert(`Successfully purchased ${skin.name}!`);
    } else {
      alert('Insufficient Z-Coins!');
    }
  };

  const handleSell = (skin: Skin) => {
    const inventoryItem = inventorySkins.find((item) => item.skin?.id === skin.id);
    if (!inventoryItem) return;

    const price = getSkinPrice(skin.id);
    const sellPrice = calculateSellPrice(price);
    removeFromInventory(inventoryItem.id);
    addBalance(sellPrice);
    alert(`Sold ${skin.name} for ${formatZCoins(sellPrice)} Z-Coins!`);
  };

  const rarities: (Rarity | 'all')[] = ['all', 'common', 'uncommon', 'rare', 'epic', 'legendary'];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2 text-white">Marketplace</h1>
        <p className="text-gray-400">Buy skins directly or sell your inventory</p>
      </motion.div>

      {/* Controls */}
      <div className="bg-surface-light rounded-lg p-6 mb-8 border border-border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* View Mode Toggle */}
          <div className="flex bg-surface rounded-lg p-1">
            <button
              onClick={() => setViewMode('buy')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                viewMode === 'buy'
                  ? 'bg-primary text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Buy from Bot
            </button>
            <button
              onClick={() => setViewMode('sell')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                viewMode === 'sell'
                  ? 'bg-secondary text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sell to Bot (80%)
            </button>
          </div>

          {/* Sort and Filter */}
          <div className="flex gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-surface text-white px-4 py-2 rounded-lg border border-border focus:outline-none focus:border-primary"
            >
              <option value="rarity-desc">Rarity: High to Low</option>
              <option value="rarity-asc">Rarity: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="price-asc">Price: Low to High</option>
            </select>

            <select
              value={filterRarity}
              onChange={(e) => setFilterRarity(e.target.value as Rarity | 'all')}
              className="bg-surface text-white px-4 py-2 rounded-lg border border-border focus:outline-none focus:border-primary"
            >
              {rarities.map((rarity) => (
                <option key={rarity} value={rarity}>
                  {rarity === 'all' ? 'All Rarities' : rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      {displayedSkins.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-xl">
            {viewMode === 'sell' ? 'No items in your inventory' : 'No items found'}
          </p>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {displayedSkins.map((skin, index) => {
            const inventoryItem = viewMode === 'sell' 
              ? inventorySkins.find((item) => item.skin?.id === skin.id)
              : null;
            const price = getSkinPrice(skin.id);

            return (
              <motion.div
                key={viewMode === 'sell' && inventoryItem ? inventoryItem.id : `${skin.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <SkinCard
                  skin={skin}
                  action={{
                    label:
                      viewMode === 'buy'
                        ? `Buy for ${formatZCoins(price)} Z`
                        : `Sell for ${formatZCoins(calculateSellPrice(price))} Z`,
                    onClick: () =>
                      viewMode === 'buy' ? handleBuy(skin) : handleSell(skin),
                    disabled: viewMode === 'buy' && balance < price,
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
