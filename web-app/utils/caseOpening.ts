import { Case, Skin, Rarity } from '@/types';

export const selectRandomSkin = (
  caseData: Case,
  availableSkins: Skin[]
): Skin | null => {
  const random = Math.random() * 100;
  let cumulativeProbability = 0;
  let selectedRarity: Rarity | null = null;

  for (const [rarity, rate] of Object.entries(caseData.dropRates)) {
    cumulativeProbability += rate;
    if (random <= cumulativeProbability) {
      selectedRarity = rarity as Rarity;
      break;
    }
  }

  if (!selectedRarity) {
    selectedRarity = 'white';
  }

  const possibleSkins = availableSkins.filter(
    (skin) =>
      skin.rarity === selectedRarity &&
      caseData.possibleDrops.includes(skin.id)
  );

  if (possibleSkins.length === 0) {
    const fallbackSkins = availableSkins.filter((skin) =>
      caseData.possibleDrops.includes(skin.id)
    );
    return fallbackSkins[Math.floor(Math.random() * fallbackSkins.length)] || null;
  }

  return possibleSkins[Math.floor(Math.random() * possibleSkins.length)];
};

export const generateRouletteItems = (
  winningItem: Skin,
  allSkins: Skin[],
  caseData: Case,
  count: number = 50
): { items: Skin[]; winningIndex: number } => {
  const items: Skin[] = [];
  const winningIndex = Math.floor(count * 0.75);
  const caseSkins = allSkins.filter((skin) =>
    caseData.possibleDrops.includes(skin.id)
  );

  for (let i = 0; i < count; i++) {
    if (i === winningIndex) {
      items.push(winningItem);
    } else {
      const randomSkin = caseSkins[Math.floor(Math.random() * caseSkins.length)];
      items.push(randomSkin);
    }
  }

  return { items, winningIndex };
};
