export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface Skin {
  id: string;
  name: string;
  rarity: Rarity;
  price: number;
  imagePath: string;
}

export interface Case {
  id: string;
  name: string;
  price: number;
  imagePath: string;
  dropRates: Record<Rarity, number>;
  possibleDrops: string[];
}

export interface InventoryItem {
  id: string;
  skinId: string;
  acquiredAt: number;
}

export interface UserData {
  balance: number;
  inventory: InventoryItem[];
}
