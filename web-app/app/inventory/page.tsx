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

type SortOption = 'recent' | 'rarity-asc' | 'rarity-desc' | 'price-asc' | 'price-desc';

export default function InventoryPage() {
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [filterRarity, setFilterRarity] = useState<Rarity | 'all'>('all');

  const inventory = useStore((state) => state.inventory);
  const addBalance = useStore((state) => state.addBalance);
  const removeFromInventory = useStore((state) => state.removeFromInventory);

  const allSkins = useMemo(() => skinsData as Skin[], []);

  // Get inventory with skin data
  const inventoryWithSkins = useMemo(() => {
    return inventory
      .map((item) => {
        const skin = allSkins.find((s) => s.id === item.skinId);
        return { ...item, skin };
      })
      .filter((item) => item.skin !== undefined);
  }, [inventory, allSkins]);

  // Filter and sort
  const displayedItems = useMemo(() => {
    let items = [...inventoryWithSkins];

    // Filter by rarity
    if (filterRarity !== 'all') {
      items = items.filter((item) => item.skin!.rarity === filterRarity);
    }

    // Sort
    items.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return b.acquiredAt - a.acquiredAt;
        case 'rarity-asc':
          return rarityOrder[a.skin!.rarity] - rarityOrder[b.skin!.rarity];
        case 'rarity-desc':
          return rarityOrder[b.skin!.rarity] - rarityOrder[a.skin!.rarity];
        case 'price-asc':
          return getSkinPrice(a.skin!.id) - getSkinPrice(b.skin!.id);
        case 'price-desc':
          return getSkinPrice(b.skin!.id) - getSkinPrice(a.skin!.id);
        default:
          return 0;
      }
    });

    return items;
  }, [inventoryWithSkins, filterRarity, sortBy]);

  // Calculate total value
  const totalValue = useMemo(() => {
    return displayedItems.reduce((sum, item) => sum + getSkinPrice(item.skin!.id), 0);
  }, [displayedItems]);

  const handleSell = (itemId: string, skin: Skin) => {
    const price = getSkinPrice(skin.id);
    const sellPrice = calculateSellPrice(price);
    removeFromInventory(itemId);
    addBalance(sellPrice);
    alert(`Sold ${skin.name} for ${formatZCoins(sellPrice)} Z-Coins!`);
  };

  const rarities: (Rarity | 'all')[] = ['all', 'white', 'lightblue', 'darkblue', 'purple', 'pink', 'red', 'gold'];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2 text-white">Your Inventory</h1>
        <p className="text-gray-400">Manage your collection of skins</p>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="bg-surface-light rounded-lg p-6 border border-border">
          <div className="text-gray-400 text-sm mb-1">Total Items</div>
          <div className="text-3xl font-bold text-white">
            {displayedItems.length}
          </div>
        </div>
        <div className="bg-surface-light rounded-lg p-6 border border-border">
          <div className="text-gray-400 text-sm mb-1">Total Value</div>
          <div className="text-3xl font-bold text-primary flex items-center">
            <span className="text-xl mr-1">Z</span>
            {formatZCoins(totalValue)}
          </div>
        </div>
        <div className="bg-surface-light rounded-lg p-6 border border-border">
          <div className="text-gray-400 text-sm mb-1">Sell Value (80%)</div>
          <div className="text-3xl font-bold text-secondary flex items-center">
            <span className="text-xl mr-1">Z</span>
            {formatZCoins(calculateSellPrice(totalValue))}
          </div>
        </div>
      </motion.div>

      {/* Controls */}
      <div className="bg-surface-light rounded-lg p-6 mb-8 border border-border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-white font-semibold">
            Showing {displayedItems.length} of {inventoryWithSkins.length} items
          </div>

          <div className="flex gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-surface text-white px-4 py-2 rounded-lg border border-border focus:outline-none focus:border-primary"
            >
              <option value="recent">Recently Acquired</option>
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
      {displayedItems.length === 0 ? (
        <motion.div
          className="text-center py-20 bg-surface-light rounded-lg border border-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-6xl mb-4">📦</div>
          <p className="text-gray-400 text-xl mb-4">Your inventory is empty</p>
          <p className="text-gray-500 mb-6">
            {filterRarity !== 'all' 
              ? 'No items match your filter' 
              : 'Start opening cases to collect skins!'
            }
          </p>
          <motion.a
            href="/"
            className="inline-block bg-primary text-black px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Open Cases
          </motion.a>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {displayedItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <SkinCard
                skin={item.skin!}
                floatValue={item.floatValue}
                action={{
                  label: `Sell for ${formatZCoins(calculateSellPrice(getSkinPrice(item.skin!.id)))} Z`,
                  onClick: () => handleSell(item.id, item.skin!),
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
