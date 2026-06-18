'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Case } from '@/types';
import { formatZCoins } from '@/utils/format';
import { getCasePrice } from '@/utils/prices';

interface CaseCardProps {
  caseData: Case;
}

export default function CaseCard({ caseData }: CaseCardProps) {
  const price = getCasePrice(caseData.id);
  
  return (
    <Link href={`/case/${caseData.id}`}>
      <motion.div
        className="bg-surface-light rounded-lg border-2 border-border overflow-hidden hover:border-primary hover:shadow-xl hover:shadow-primary/30 transition-all cursor-pointer"
        whileHover={{ y: -8, scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Image */}
        <div className="relative aspect-square bg-gradient-to-br from-surface to-background flex items-center justify-center p-8">
          <div
            className="w-full h-full bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${caseData.imagePath})` }}
          />
          {/* Fallback */}
          <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-gray-700 -z-10">
            📦
          </div>
          
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-bold text-xl text-white mb-2">{caseData.name}</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold">
                Z
              </div>
              <span className="text-primary font-bold text-lg">
                {formatZCoins(price)}
              </span>
            </div>
            <motion.div
              className="bg-primary text-black px-4 py-1 rounded-full text-sm font-semibold"
              whileHover={{ scale: 1.1 }}
            >
              Open
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
