import { Skin } from '@/types';

export interface WearCondition {
  label: string;
  name: string;
}

export const getWearCondition = (floatValue?: number | null): WearCondition | null => {
  if (typeof floatValue !== 'number' || isNaN(floatValue)) return null;

  const f = floatValue;
  if (f >= 0.00 && f < 0.07) return { label: 'FN', name: 'Factory New' };
  if (f >= 0.07 && f < 0.15) return { label: 'MW', name: 'Minimal Wear' };
  if (f >= 0.15 && f < 0.38) return { label: 'FT', name: 'Field-Tested' };
  if (f >= 0.38 && f < 0.45) return { label: 'WW', name: 'Well-Worn' };
  if (f >= 0.45 && f <= 1.00) return { label: 'BS', name: 'Battle-Scarred' };
  
  // Fallbacks for float ranges slightly out of standard [0, 1] bounds
  if (f < 0.00) return { label: 'FN', name: 'Factory New' };
  if (f > 1.00) return { label: 'BS', name: 'Battle-Scarred' };

  return null;
};

export const generateSkinFloat = (
  skin: Skin,
  customRange?: { min: number; max: number } | null
): number | null => {
  if (!skin.hasFloat) return null;

  const range = customRange ?? { min: 0.0, max: 1.0 };
  const min = Math.max(0.0, Math.min(range.min, range.max));
  const max = Math.min(1.0, Math.max(range.min, range.max));
  return min + Math.random() * (max - min);
};

export const formatFloatValue = (floatValue?: number | null): string | null => {
  if (typeof floatValue !== 'number') return null;
  return floatValue.toFixed(4);
};
