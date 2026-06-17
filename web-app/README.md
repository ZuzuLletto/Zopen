# ZOPEN - Case Opening Simulator

A modern web-based case opening simulator built for streamers and their communities. Features virtual currency (Z-Coins), roulette-style case opening animations, marketplace trading, and inventory management.

## 🚀 Features

- **Case Opening System**: Smooth roulette animations with realistic drop rates
- **Virtual Economy**: Z-Coin currency system with persistent local storage
- **Marketplace**: Buy skins directly or sell from inventory (80% value)
- **Inventory Management**: Filter, sort, and manage your collection
- **Modern UI**: Dark cyber/esports theme with Tailwind CSS
- **Smooth Animations**: Powered by Framer Motion
- **Fully Responsive**: Works perfectly on all devices

## 📦 Tech Stack

- **Framework**: Next.js 14
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Language**: TypeScript
- **Data Persistence**: LocalStorage

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the web-app directory:
```bash
cd web-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:3000
```

## 📁 Project Structure

```
web-app/
├── app/                    # Next.js app directory
│   ├── case/[id]/         # Dynamic case opening pages
│   ├── market/            # Marketplace page
│   ├── inventory/         # Inventory page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Layout.tsx         # Main layout wrapper
│   ├── Navbar.tsx         # Navigation bar
│   ├── CaseCard.tsx       # Case display card
│   ├── SkinCard.tsx       # Skin display card
│   └── CaseRoulette.tsx   # Roulette animation
├── store/                 # State management
│   └── useStore.ts        # Zustand store
├── data/                  # Mock data
│   ├── skins.json         # All available skins
│   └── cases.json         # All available cases
├── types/                 # TypeScript types
│   └── index.ts           # Type definitions
├── utils/                 # Utility functions
│   ├── rarity.ts          # Rarity colors & helpers
│   ├── caseOpening.ts     # Case opening logic
│   └── format.ts          # Formatting helpers
└── public/               # Static assets
    └── assets/           # Your images go here
        ├── cases/        # Case images
        └── skins/        # Skin images
```

## 🎨 Customization Guide

### Adding Your Own Images

1. Place case images in: `/public/assets/cases/`
   - Name them: `starter.png`, `premium.png`, `elite.png`

2. Place skin images in: `/public/assets/skins/`
   - Name them: `skin1.png`, `skin2.png`, etc.

### Modifying Skins

Edit `/data/skins.json`:

```json
{
  "id": "skin-16",
  "name": "Your Skin Name",
  "rarity": "legendary",
  "price": 3000,
  "imagePath": "/assets/skins/skin16.png"
}
```

### Modifying Cases

Edit `/data/cases.json`:

```json
{
  "id": "case-4",
  "name": "Your Case Name",
  "price": 750,
  "imagePath": "/assets/cases/yourcase.png",
  "dropRates": {
    "common": 60,
    "uncommon": 25,
    "rare": 12,
    "epic": 2.5,
    "legendary": 0.5
  },
  "possibleDrops": ["skin-1", "skin-2", "skin-3"]
}
```

### Adjusting Initial Balance

Edit `/store/useStore.ts`:

```typescript
const INITIAL_BALANCE = 10000; // Change this value
```

### Color Customization

Edit `/tailwind.config.ts` to change the color scheme:

```typescript
colors: {
  primary: "#00d4ff",      // Main accent color
  secondary: "#8b5cf6",    // Secondary accent
  background: "#0a0e17",   // Main background
  // ... more colors
}
```

## 🎮 How It Works

### Economy System

- Users start with 10,000 Z-Coins
- Opening cases costs Z-Coins (varies by case)
- Skins can be bought from or sold to the marketplace
- Selling to bot returns 80% of market value
- All data persists in browser localStorage

### Drop Rate System

Cases have configurable drop rates for each rarity:
- **Common**: 50-70%
- **Uncommon**: 20-30%
- **Rare**: 9-15%
- **Epic**: 1-4%
- **Legendary**: 0.1-1%

The system randomly selects a rarity based on these rates, then picks a random skin of that rarity from the case's possible drops.

### Data Persistence

All user data (balance and inventory) is automatically saved to browser localStorage:
- Survives page refreshes
- No backend required
- Cleared only when user clears browser data

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Deploy automatically

### Deploy to Netlify

1. Build the project: `npm run build`
2. Deploy the `.next` folder to Netlify

### Deploy Anywhere

The app is a static Next.js site that can be deployed to any hosting platform:
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront
- Any static hosting service

## 🔧 Development Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📝 Notes

- No real money is involved - this is purely for entertainment
- All transactions are virtual using Z-Coins
- Images are placeholders - replace with your own assets
- The app works entirely in the browser (no backend needed)
- Data persists in localStorage (per-browser, per-device)

## 🎯 Future Enhancement Ideas

- [ ] Add sound effects for case opening
- [ ] Add user authentication
- [ ] Add leaderboards
- [ ] Add trade history
- [ ] Add daily rewards
- [ ] Add achievements system
- [ ] Add skin trade-ups (combine multiple skins for higher tier)
- [ ] Add animations for rare drops

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

---

Built with ❤️ for the streaming community
