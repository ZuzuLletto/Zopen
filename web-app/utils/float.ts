import { Skin } from '@/types';

export const getSkinFloatRange = (skin: Skin) => {
  if (!skin.hasFloat) return null;

  return skin.floatRange ?? { min: 0, max: 1 };
};

export const generateSkinFloat = (skin: Skin): number | null => {
  const range = getSkinFloatRange(skin);
  if (!range) return null;

  const min = Math.max(0, Math.min(range.min, range.max));
  const max = Math.min(1, Math.max(range.min, range.max));
  return min + Math.random() * (max - min);
};

export const formatFloatValue = (floatValue?: number | null): string | null => {
  if (typeof floatValue !== 'number') return null;

  return floatValue.toFixed(4);
};
