import { Rarity } from '@/types';

export const rarityColors: Record<Rarity, string> = {
  common: 'text-common',
  uncommon: 'text-uncommon',
  rare: 'text-rare',
  epic: 'text-epic',
  legendary: 'text-legendary',
};

export const rarityBgColors: Record<Rarity, string> = {
  common: 'bg-common',
  uncommon: 'bg-uncommon',
  rare: 'bg-rare',
  epic: 'bg-epic',
  legendary: 'bg-legendary',
};

export const rarityBorderColors: Record<Rarity, string> = {
  common: 'border-common',
  uncommon: 'border-uncommon',
  rare: 'border-rare',
  epic: 'border-epic',
  legendary: 'border-legendary',
};

export const rarityGlowColors: Record<Rarity, string> = {
  common: 'shadow-common/50',
  uncommon: 'shadow-uncommon/50',
  rare: 'shadow-rare/50',
  epic: 'shadow-epic/50',
  legendary: 'shadow-legendary/50',
};

export const getRarityLabel = (rarity: Rarity): string => {
  return rarity.charAt(0).toUpperCase() + rarity.slice(1);
};

export const rarityOrder: Record<Rarity, number> = {
  common: 1,
  uncommon: 2,
  rare: 3,
  epic: 4,
  legendary: 5,
};
