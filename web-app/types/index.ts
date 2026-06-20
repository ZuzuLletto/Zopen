export type Rarity = 'white' | 'lightblue' | 'darkblue' | 'purple' | 'pink' | 'red' | 'gold';

export interface Skin {
  id: string;
  name: string;
  rarity: Rarity;
  imagePath: string;
  hasFloat: boolean;
}

export interface CaseDrop {
  skinId: string;
  chance: number;
  floatRange?: {
    min: number;
    max: number;
  };
}

export interface Case {
  id: string;
  name: string;
  imagePath: string;
  possibleDrops: CaseDrop[];
}

export interface Prices {
  skins: Record<string, number>;
  cases: Record<string, number>;
}

export interface InventoryItem {
  id: string;
  skinId: string;
  acquiredAt: number;
  floatValue?: number | null;
}

export interface UserData {
  balance: number;
  inventory: InventoryItem[];
}
