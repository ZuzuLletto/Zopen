# Quick Reference Guide

## 🚀 Common Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

## 📂 Where to Find Things

| What you need | File Location |
|--------------|---------------|
| Add new skin | `/data/skins.json` |
| Add new case | `/data/cases.json` |
| Change initial balance | `/store/useStore.ts` |
| Change colors | `/tailwind.config.ts` |
| Change sell percentage | `/utils/format.ts` |
| Add skin images | `/public/assets/skins/` |
| Add case images | `/public/assets/cases/` |

## 🎨 Color Codes

```typescript
Primary (Cyan): #00d4ff
Secondary (Purple): #8b5cf6
Background: #0a0e17
Surface: #13161f
Border: #252a3a

Rarity Colors:
Common: #6b7280 (gray)
Uncommon: #3b82f6 (blue)
Rare: #8b5cf6 (purple)
Epic: #ef4444 (red)
Legendary: #f59e0b (gold)
```

## 📝 Adding a New Skin

1. Open `/data/skins.json`
2. Add new entry:
```json
{
  "id": "skin-16",
  "name": "Your Skin Name",
  "rarity": "epic",
  "price": 850,
  "imagePath": "/assets/skins/skin16.png"
}
```
3. Place image at `/public/assets/skins/skin16.png`

## 📦 Adding a New Case

1. Open `/data/cases.json`
2. Add new entry:
```json
{
  "id": "case-4",
  "name": "Your Case",
  "price": 300,
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
3. Place image at `/public/assets/cases/yourcase.png`

## 🔧 Common Modifications

### Change Starting Balance
File: `/store/useStore.ts`
```typescript
const INITIAL_BALANCE = 10000; // Change this number
```

### Change Sell Percentage (currently 80%)
File: `/utils/format.ts`
```typescript
export const calculateSellPrice = (price: number): number => {
  return Math.floor(price * 0.8); // Change 0.8 to desired percentage
};
```

### Change Primary Color
File: `/tailwind.config.ts`
```typescript
colors: {
  primary: "#00d4ff", // Change this hex code
}
```

## 🐛 Troubleshooting

### Images Not Loading
- Check file path exactly matches JSON
- File names are case-sensitive
- Must be in `/public/assets/` folder
- Supported: PNG, JPG, WEBP

### Reset User Data
1. Open browser DevTools (F12)
2. Go to Application tab
3. Expand Local Storage
4. Find "zopen-user-data"
5. Right-click → Delete

### Build Fails
```bash
# Delete and reinstall
rm -rf node_modules .next
npm install
npm run build
```

## 📊 Default Drop Rates

| Case Type | Common | Uncommon | Rare | Epic | Legendary |
|-----------|--------|----------|------|------|-----------|
| Starter   | 70%    | 20%      | 9%   | 0.9% | 0.1%      |
| Premium   | 60%    | 25%      | 12%  | 2.5% | 0.5%      |
| Elite     | 50%    | 30%      | 15%  | 4%   | 1%        |

## 🎯 Testing Checklist

- [ ] Open each case type
- [ ] Buy a skin from market
- [ ] Sell a skin to market
- [ ] Filter by rarity
- [ ] Sort by price
- [ ] Check balance updates
- [ ] Test on mobile view
- [ ] Refresh page (data persists?)
- [ ] Open case with insufficient funds

## 📱 Responsive Breakpoints

```
Mobile: < 640px
Tablet: 640px - 1024px
Desktop: > 1024px
```

## 🎨 Component Usage Examples

### Using SkinCard
```tsx
<SkinCard
  skin={skinData}
  action={{
    label: "Buy for 100 Z",
    onClick: () => handleBuy(),
    disabled: false
  }}
/>
```

### Using CaseCard
```tsx
<CaseCard caseData={caseData} />
```

## 🔐 LocalStorage Structure

```javascript
// Key
'zopen-user-data'

// Value
{
  "balance": 10000,
  "inventory": [
    {
      "id": "inv-1234567890-abc",
      "skinId": "skin-1",
      "acquiredAt": 1703001234567
    }
  ]
}
```

## 🚀 Deployment Checklist

- [ ] All images added to `/public/assets/`
- [ ] Customized skins and cases
- [ ] Tested locally
- [ ] Run `npm run build` successfully
- [ ] Choose hosting platform
- [ ] Deploy
- [ ] Test production site
- [ ] Share with community!

## 💡 Pro Tips

1. **Start Simple**: Use provided mock data first
2. **Test Frequently**: Run dev server after changes
3. **Mobile First**: Always check mobile view
4. **Clear Cache**: Hard refresh (Ctrl+F5) if changes don't show
5. **Use TypeScript**: It'll catch errors before runtime
6. **Image Size**: Keep under 500KB for fast loading
7. **Backup Data**: Export localStorage before major changes

## 📞 Quick Links

- **Home**: http://localhost:3000
- **Market**: http://localhost:3000/market
- **Inventory**: http://localhost:3000/inventory
- **Case 1**: http://localhost:3000/case/case-1

---

**Need More Help?** Check the full README.md or SETUP.md files!
