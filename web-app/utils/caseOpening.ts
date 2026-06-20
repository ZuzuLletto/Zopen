import { Case, Skin, Rarity } from '@/types';

export const selectRandomSkin = (
  caseData: Case,
  availableSkins: Skin[]
): Skin | null => {
  const totalChance = caseData.possibleDrops.reduce((sum, drop) => sum + drop.chance, 0);
  if (totalChance <= 0) return null;

  const roll = Math.random() * totalChance;
  let cumulativeChance = 0;
  let selectedDropId: string | null = null;

  for (const drop of caseData.possibleDrops) {
    cumulativeChance += drop.chance;
    if (roll <= cumulativeChance) {
      selectedDropId = drop.skinId;
      break;
    }
  }

  if (!selectedDropId && caseData.possibleDrops.length > 0) {
    selectedDropId = caseData.possibleDrops[caseData.possibleDrops.length - 1].skinId;
  }

  return availableSkins.find((skin) => skin.id === selectedDropId) || null;
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
    caseData.possibleDrops.some((drop) => drop.skinId === skin.id)
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
