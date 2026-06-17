# Quick Setup Guide

## Step 1: Install Dependencies

```bash
cd web-app
npm install
```

## Step 2: Add Your Images

Place your images in the `/public/assets` folder:

### Cases (3 images):
- `/public/assets/cases/starter.png`
- `/public/assets/cases/premium.png`
- `/public/assets/cases/elite.png`

### Skins (15+ images):
- `/public/assets/skins/skin1.png`
- `/public/assets/skins/skin2.png`
- ... through skin15.png

**Image Requirements:**
- PNG format recommended
- Square aspect ratio (e.g., 500x500px)
- Transparent background works best
- Keep file sizes under 500KB for fast loading

## Step 3: Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## Step 4: Customize (Optional)

### Change Initial Balance
Edit `/store/useStore.ts`:
```typescript
const INITIAL_BALANCE = 10000; // Change this
```

### Add More Skins
Edit `/data/skins.json` and add new entries:
```json
{
  "id": "skin-16",
  "name": "New Skin",
  "rarity": "epic",
  "price": 850,
  "imagePath": "/assets/skins/skin16.png"
}
```

### Add More Cases
Edit `/data/cases.json` and add new cases with their drop rates.

### Customize Colors
Edit `/tailwind.config.ts` to change the theme colors.

## Step 5: Build for Production

```bash
npm run build
npm run start
```

## Step 6: Deploy

### Option A: Vercel (Easiest)
1. Push to GitHub
2. Import on vercel.com
3. Deploy automatically

### Option B: Any Static Host
1. Run `npm run build`
2. Deploy the `.next` folder
3. Set Node.js version to 18+

## Troubleshooting

### Images Not Showing
- Verify images are in `/public/assets/` folder
- Check file names match exactly (case-sensitive)
- Clear browser cache

### "Insufficient Z-Coins"
- Open browser DevTools > Application > Local Storage
- Find "zopen-user-data"
- Delete it to reset balance to 10,000

### Build Errors
- Delete `node_modules` and `.next` folders
- Run `npm install` again
- Run `npm run build`

## Support

For issues or questions, check the main README.md file.
