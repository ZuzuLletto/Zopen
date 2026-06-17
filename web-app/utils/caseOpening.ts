import { Case, Skin, Rarity } from '@/types';

export const selectRandomSkin = (
  caseData: Case,
  availableSkins: Skin[]
): Skin | null => {
  const random = Math.random() * 100;
  let cumulativeProbability = 0;
  let selectedRarity: Rarity | null = null;

  // Determine rarity based on drop rates
  for (const [rarity, rate] of Object.entries(caseData.dropRates)) {
    cumulativeProbability += rate;
    if (random <= cumulativeProbability) {
      selectedRarity = rarity as Rarity;
      break;
    }
  }

  if (!selectedRarity) {
    selectedRarity = 'common';
  }

  // Filter skins by the selected rarity and those available in this case
  const possibleSkins = availableSkins.filter(
    (skin) =>
      skin.rarity === selectedRarity &&
      caseData.possibleDrops.includes(skin.id)
  );

  if (possibleSkins.length === 0) {
    // Fallback to any skin in the case
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
): Skin[] => {
  const items: Skin[] = [];
  const winningIndex = Math.floor(count * 0.75); // Place winner at 75% position

  for (let i = 0; i < count; i++) {
    if (i === winningIndex) {
      items.push(winningItem);
    } else {
      // Add random items from the case's possible drops
      const caseSkins = allSkins.filter((skin) =>
        caseData.possibleDrops.includes(skin.id)
      );
      const randomSkin = caseSkins[Math.floor(Math.random() * caseSkins.length)];
      items.push(randomSkin);
    }
  }

  return items;
};
