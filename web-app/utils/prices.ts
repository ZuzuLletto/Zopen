import pricesData from '@/data/prices.json';
import { Skin, Case } from '@/types';

// Skin fiyatını getir
export const getSkinPrice = (skinId: string): number => {
  return (pricesData.skins as Record<string, number>)[skinId] || 0;
};

// Case fiyatını getir
export const getCasePrice = (caseId: string): number => {
  return (pricesData.cases as Record<string, number>)[caseId] || 0;
};

// Skin objesine fiyat ekle
export const enrichSkinWithPrice = (skin: Skin) => {
  return {
    ...skin,
    price: getSkinPrice(skin.id),
  };
};

// Case objesine fiyat ekle
export const enrichCaseWithPrice = (caseItem: Case) => {
  return {
    ...caseItem,
    price: getCasePrice(caseItem.id),
  };
};

// Tüm skinleri fiyatlarıyla birlikte getir
export const getSkinsWithPrices = (skins: Skin[]) => {
  return skins.map(enrichSkinWithPrice);
};

// Tüm case'leri fiyatlarıyla birlikte getir
export const getCasesWithPrices = (cases: Case[]) => {
  return cases.map(enrichCaseWithPrice);
};
