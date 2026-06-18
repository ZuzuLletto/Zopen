export type Rarity = 'white' | 'lightblue' | 'darkblue' | 'purple' | 'pink' | 'red' | 'gold';

export interface Skin {
  id: string;
  name: string;
  rarity: Rarity;
  imagePath: string;
}

export interface Case {
  id: string;
  name: string;
  imagePath: string;
  dropRates: Record<Rarity, number>;
  possibleDrops: string[];
}

export interface Prices {
  skins: Record<string, number>;
  cases: Record<string, number>;
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
