import { create } from 'zustand';
import { Skin, InventoryItem, UserData } from '@/types';

interface StoreState extends UserData {
  addToInventory: (skin: Skin) => void;
  removeFromInventory: (itemId: string) => void;
  addBalance: (amount: number) => void;
  deductBalance: (amount: number) => boolean;
  loadFromLocalStorage: () => void;
  saveToLocalStorage: () => void;
}

const INITIAL_BALANCE = 10000;
const STORAGE_KEY = 'zopen-user-data';

export const useStore = create<StoreState>((set, get) => ({
  balance: INITIAL_BALANCE,
  inventory: [],

  addToInventory: (skin: Skin) => {
    const newItem: InventoryItem = {
      id: `inv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      skinId: skin.id,
      acquiredAt: Date.now(),
    };
    
    set((state) => ({
      inventory: [...state.inventory, newItem],
    }));
    
    get().saveToLocalStorage();
  },

  removeFromInventory: (itemId: string) => {
    set((state) => ({
      inventory: state.inventory.filter((item) => item.id !== itemId),
    }));
    
    get().saveToLocalStorage();
  },

  addBalance: (amount: number) => {
    set((state) => ({
      balance: state.balance + amount,
    }));
    
    get().saveToLocalStorage();
  },

  deductBalance: (amount: number) => {
    const currentBalance = get().balance;
    
    if (currentBalance >= amount) {
      set({ balance: currentBalance - amount });
      get().saveToLocalStorage();
      return true;
    }
    
    return false;
  },

  loadFromLocalStorage: () => {
    if (typeof window === 'undefined') return;
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data: UserData = JSON.parse(stored);
        set({
          balance: data.balance,
          inventory: data.inventory,
        });
      }
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
    }
  },

  saveToLocalStorage: () => {
    if (typeof window === 'undefined') return;
    
    try {
      const data: UserData = {
        balance: get().balance,
        inventory: get().inventory,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  },
}));
