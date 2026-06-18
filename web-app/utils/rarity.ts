import { Rarity } from '@/types';

// Rarity renk kodları (hex)
export const rarityHexColors: Record<Rarity, string> = {
  white: '#B0C3D9',
  lightblue: '#5E98D9',
  darkblue: '#4B69FF',
  purple: '#8847FF',
  pink: '#D32CE6',
  red: '#EB4B4B',
  gold: '#FFD700',
};

// Tailwind text renkleri
export const rarityColors: Record<Rarity, string> = {
  white: 'text-[#B0C3D9]',
  lightblue: 'text-[#5E98D9]',
  darkblue: 'text-[#4B69FF]',
  purple: 'text-[#8847FF]',
  pink: 'text-[#D32CE6]',
  red: 'text-[#EB4B4B]',
  gold: 'text-[#FFD700]',
};

// Tailwind bg renkleri
export const rarityBgColors: Record<Rarity, string> = {
  white: 'bg-[#B0C3D9]',
  lightblue: 'bg-[#5E98D9]',
  darkblue: 'bg-[#4B69FF]',
  purple: 'bg-[#8847FF]',
  pink: 'bg-[#D32CE6]',
  red: 'bg-[#EB4B4B]',
  gold: 'bg-[#FFD700]',
};

// Tailwind border renkleri
export const rarityBorderColors: Record<Rarity, string> = {
  white: 'border-[#B0C3D9]',
  lightblue: 'border-[#5E98D9]',
  darkblue: 'border-[#4B69FF]',
  purple: 'border-[#8847FF]',
  pink: 'border-[#D32CE6]',
  red: 'border-[#EB4B4B]',
  gold: 'border-[#FFD700]',
};

// Glow yoğunluğu (rarity'ye göre)
export const rarityGlowIntensity: Record<Rarity, number> = {
  white: 0.15,     // En düşük
  lightblue: 0.20,
  darkblue: 0.25,
  purple: 0.30,
  pink: 0.35,
  red: 0.40,
  gold: 0.45,      // En yüksek (ama hala abartılı değil)
};

// Rarity label (görünen isim)
export const getRarityLabel = (rarity: Rarity): string => {
  const labels: Record<Rarity, string> = {
    white: 'Common',
    lightblue: 'Uncommon',
    darkblue: 'Rare',
    purple: 'Epic',
    pink: 'Mythical',
    red: 'Legendary',
    gold: 'Ancient',
  };
  return labels[rarity];
};

// Rarity sıralaması (sorting için)
export const rarityOrder: Record<Rarity, number> = {
  white: 1,
  lightblue: 2,
  darkblue: 3,
  purple: 4,
  pink: 5,
  red: 6,
  gold: 7,
};

// Glow CSS oluştur
export const getRarityGlow = (rarity: Rarity): string => {
  const color = rarityHexColors[rarity];
  const intensity = rarityGlowIntensity[rarity];
  
  return `0 0 ${10 * intensity}px rgba(${hexToRgb(color)}, ${intensity}), 
          0 0 ${20 * intensity}px rgba(${hexToRgb(color)}, ${intensity * 0.7}), 
          0 0 ${30 * intensity}px rgba(${hexToRgb(color)}, ${intensity * 0.4})`;
};

// Hex to RGB helper
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0, 0, 0';
  
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}
