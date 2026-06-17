'use client';

import { motion } from 'framer-motion';
import CaseCard from '@/components/CaseCard';
import casesData from '@/data/cases.json';

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.div
        className="text-center mb-12 pt-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
          Welcome to ZOPEN
        </h1>
        <p className="text-xl text-gray-400">
          Open cases, collect legendary skins, and build your collection!
        </p>
      </motion.div>

      {/* Cases Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {casesData.map((caseItem) => (
          <motion.div key={caseItem.id} variants={item}>
            <CaseCard caseData={caseItem} />
          </motion.div>
        ))}
      </motion.div>

      {/* Info Section */}
      <motion.div
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="bg-surface-light p-6 rounded-lg border border-border">
          <div className="text-4xl mb-3">🎰</div>
          <h3 className="text-xl font-bold mb-2 text-primary">Open Cases</h3>
          <p className="text-gray-400">
            Choose from various cases and test your luck to win rare skins!
          </p>
        </div>
        <div className="bg-surface-light p-6 rounded-lg border border-border">
          <div className="text-4xl mb-3">💎</div>
          <h3 className="text-xl font-bold mb-2 text-secondary">Collect Skins</h3>
          <p className="text-gray-400">
            Build your inventory with common to legendary rarity items.
          </p>
        </div>
        <div className="bg-surface-light p-6 rounded-lg border border-border">
          <div className="text-4xl mb-3">🏪</div>
          <h3 className="text-xl font-bold mb-2 text-accent">Trade Smart</h3>
          <p className="text-gray-400">
            Buy and sell skins in the marketplace to manage your Z-Coins.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
