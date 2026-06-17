# ZOPEN Architecture Guide

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        BROWSER                               │
│  ┌────────────────────────────────────────────────────┐    │
│  │              Next.js Application                    │    │
│  │                                                      │    │
│  │  ┌──────────────┐        ┌──────────────┐         │    │
│  │  │   Pages      │◄──────►│  Components  │         │    │
│  │  │              │        │              │         │    │
│  │  │ • Home       │        │ • Navbar     │         │    │
│  │  │ • Case Open  │        │ • CaseCard   │         │    │
│  │  │ • Market     │        │ • SkinCard   │         │    │
│  │  │ • Inventory  │        │ • Roulette   │         │    │
│  │  └──────┬───────┘        └──────────────┘         │    │
│  │         │                                           │    │
│  │         ▼                                           │    │
│  │  ┌──────────────────────────────────────┐         │    │
│  │  │      Zustand Store (Global State)    │         │    │
│  │  │  • balance: number                    │         │    │
│  │  │  • inventory: InventoryItem[]         │         │    │
│  │  │  • addBalance()                       │         │    │
│  │  │  • deductBalance()                    │         │    │
│  │  │  • addToInventory()                   │         │    │
│  │  │  • removeFromInventory()              │         │    │
│  │  └──────────────┬───────────────────────┘         │    │
│  │                 │                                   │    │
│  │                 ▼                                   │    │
│  │  ┌──────────────────────────────────────┐         │    │
│  │  │        LocalStorage                   │         │    │
│  │  │  Key: "zopen-user-data"               │         │    │
│  │  │  Value: { balance, inventory }        │         │    │
│  │  └──────────────────────────────────────┘         │    │
│  │                                                      │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## 📊 Data Flow

### Opening a Case
```
User clicks "Open Case"
    ↓
Check balance >= case.price
    ↓
Deduct balance (Zustand)
    ↓
Save to LocalStorage
    ↓
Calculate winning skin (Drop Rate Algorithm)
    ↓
Generate roulette items (50 items with winner)
    ↓
Animate roulette (Framer Motion)
    ↓
Show result modal
    ↓
Add skin to inventory (Zustand)
    ↓
Save to LocalStorage
    ↓
Update UI
```

### Buying from Market
```
User clicks "Buy"
    ↓
Check balance >= skin.price
    ↓
Deduct balance (Zustand)
    ↓
Add skin to inventory (Zustand)
    ↓
Save to LocalStorage
    ↓
Update UI
```

### Selling to Market
```
User clicks "Sell"
    ↓
Calculate sell price (80% of value)
    ↓
Remove from inventory (Zustand)
    ↓
Add balance (Zustand)
    ↓
Save to LocalStorage
    ↓
Update UI
```

## 🗂️ File Organization

```
web-app/
│
├── 📱 PAGES (app/)
│   ├── page.tsx                    → Home: Case grid
│   ├── case/[id]/page.tsx          → Dynamic: Case opening
│   ├── market/page.tsx             → Market: Buy/Sell
│   ├── inventory/page.tsx          → Inventory: Collection
│   └── layout.tsx                  → Root: Global layout
│
├── 🧩 COMPONENTS (components/)
│   ├── Layout.tsx                  → Wrapper with LocalStorage init
│   ├── Navbar.tsx                  → Nav with balance display
│   ├── CaseCard.tsx                → Case display
│   ├── SkinCard.tsx                → Skin display with action
│   └── CaseRoulette.tsx            → Roulette animation
│
├── 💾 STATE (store/)
│   └── useStore.ts                 → Zustand store + LocalStorage
│
├── 📊 DATA (data/)
│   ├── skins.json                  → 15 mock skins
│   └── cases.json                  → 3 mock cases
│
├── 🎯 TYPES (types/)
│   └── index.ts                    → TypeScript interfaces
│
├── 🔧 UTILS (utils/)
│   ├── rarity.ts                   → Rarity colors & helpers
│   ├── caseOpening.ts              → Drop rate algorithm
│   └── format.ts                   → Number formatting
│
└── 🖼️ ASSETS (public/assets/)
    ├── cases/                      → Case images (YOU ADD)
    └── skins/                      → Skin images (YOU ADD)
```

## 🎨 Component Hierarchy

```
RootLayout
└── Layout
    ├── Navbar
    │   └── Z-Coin Balance Display
    │
    └── Page Content
        │
        ├── HomePage
        │   └── CaseCard (×3)
        │
        ├── CaseOpeningPage
        │   ├── Case Info
        │   ├── Open Button
        │   ├── CaseRoulette (when opening)
        │   └── Result Modal (when complete)
        │
        ├── MarketPage
        │   ├── Buy/Sell Toggle
        │   ├── Filter & Sort Controls
        │   └── SkinCard Grid (with actions)
        │
        └── InventoryPage
            ├── Stats Dashboard
            ├── Filter & Sort Controls
            └── SkinCard Grid (with sell action)
```

## 🔄 State Management Flow

```typescript
// Zustand Store Structure
{
  // State
  balance: number,
  inventory: InventoryItem[],
  
  // Actions
  addToInventory: (skin) => void,
  removeFromInventory: (id) => void,
  addBalance: (amount) => void,
  deductBalance: (amount) => boolean,
  loadFromLocalStorage: () => void,
  saveToLocalStorage: () => void
}

// Usage in Components
const balance = useStore(state => state.balance);
const addToInventory = useStore(state => state.addToInventory);
```

## 🎲 Drop Rate Algorithm

```typescript
// Weighted Random Selection
function selectRandomSkin(case, skins) {
  1. Generate random number (0-100)
  2. Check cumulative probabilities:
     - 0-70: Common
     - 71-90: Uncommon
     - 91-99: Rare
     - 99-99.9: Epic
     - 99.9-100: Legendary
  3. Filter skins by selected rarity
  4. Filter by case's possible drops
  5. Pick random skin from filtered list
  6. Return selected skin
}

// Roulette Generation
function generateRouletteItems(winningSkin, allSkins, case) {
  1. Create array of 50 items
  2. Place winner at index 37 (75% position)
  3. Fill other positions with random case skins
  4. Return array for animation
}
```

## 🎨 Styling System

```typescript
// Tailwind Custom Theme
colors: {
  // Background layers
  background: '#0a0e17'  → Darkest (page bg)
  surface: '#13161f'     → Middle (cards)
  surface-light: '#1a1e2e' → Lightest (hover)
  
  // Accents
  primary: '#00d4ff'     → Cyan (main actions)
  secondary: '#8b5cf6'   → Purple (secondary actions)
  
  // Rarity colors
  common: '#6b7280'      → Gray
  uncommon: '#3b82f6'    → Blue
  rare: '#8b5cf6'        → Purple
  epic: '#ef4444'        → Red
  legendary: '#f59e0b'   → Gold
}
```

## 🚀 Performance Optimizations

1. **Memoization**: useMemo for expensive calculations
2. **Code Splitting**: Next.js automatic code splitting
3. **Image Optimization**: Next.js Image component ready
4. **State Batching**: React 18 automatic batching
5. **LocalStorage**: Debounced saves (on state change)

## 🔐 Data Persistence

```javascript
// LocalStorage Schema
{
  key: "zopen-user-data",
  value: {
    balance: 10000,
    inventory: [
      {
        id: "inv-timestamp-random",
        skinId: "skin-1",
        acquiredAt: 1703001234567
      }
    ]
  }
}

// Auto-save triggers:
- Balance change
- Inventory addition
- Inventory removal
```

## 📱 Responsive Design

```css
/* Breakpoints */
Mobile:  < 640px   → 1 column
Tablet:  640-1024  → 2-3 columns
Desktop: > 1024    → 3-4 columns

/* Grid System */
Cases:     1 → 2 → 3 columns
Skins:     1 → 2 → 3 → 4 columns
Stats:     1 → 3 columns
```

## 🎯 Type System

```typescript
// Core Types
interface Skin {
  id: string;
  name: string;
  rarity: Rarity;
  price: number;
  imagePath: string;
}

interface Case {
  id: string;
  name: string;
  price: number;
  imagePath: string;
  dropRates: Record<Rarity, number>;
  possibleDrops: string[];
}

interface InventoryItem {
  id: string;
  skinId: string;
  acquiredAt: number;
}

type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
```

## 🔄 Lifecycle

```
App Start
  ↓
Layout mounts
  ↓
Load from LocalStorage
  ↓
Initialize Zustand store
  ↓
Render UI with state
  ↓
User interacts
  ↓
State updates
  ↓
Save to LocalStorage
  ↓
Re-render components
```

## 🎬 Animation System

```typescript
// Framer Motion Usage
- Page transitions: fadeIn
- Card hover: scale + translateY
- Button press: scale down
- Roulette: translateX with easing
- Result modal: scale + fade

// Timing
- Hover: 0.2s
- Page load: 0.3s
- Roulette: 5s
- Modal: 0.5s
```

## 🧪 Testing Points

- [ ] Balance updates correctly
- [ ] Inventory persists after refresh
- [ ] Can't buy with insufficient funds
- [ ] Sell gives 80% value
- [ ] Drop rates feel correct
- [ ] Responsive on mobile
- [ ] Animations are smooth
- [ ] LocalStorage saves/loads

## 🚀 Deployment Architecture

```
Source Code (GitHub)
    ↓
Build Process (npm run build)
    ↓
Static Files (.next folder)
    ↓
Deploy to Host (Vercel/Netlify)
    ↓
CDN Distribution
    ↓
User's Browser
```

---

This architecture is designed for:
✅ Simplicity (no backend complexity)
✅ Performance (static site, cached)
✅ Reliability (client-side only)
✅ Scalability (stateless, CDN-ready)
✅ Maintainability (modular, typed)
