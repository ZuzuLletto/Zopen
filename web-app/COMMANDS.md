# Command Reference

## 🚀 Getting Started

```bash
# Navigate to project
cd c:\Users\Zuzu\Desktop\Projeler\caseopensim\web-app

# Install all dependencies
npm install

# Start development server
npm run dev

# Open in browser
# Visit: http://localhost:3000
```

## 💻 Development Commands

```bash
# Start dev server (with auto-reload)
npm run dev

# Build for production
npm run build

# Start production server (after build)
npm run start

# Run ESLint
npm run lint
```

## 🔧 Troubleshooting Commands

```bash
# Clean install (if errors occur)
rmdir /s /q node_modules
rmdir /s /q .next
npm install

# Alternative for PowerShell
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force .next
npm install

# Check Node version (need 18+)
node --version

# Check npm version
npm --version

# Clear npm cache
npm cache clean --force
```

## 🐛 PowerShell Issues

If PowerShell blocks npm commands:

```bash
# Option 1: Use CMD instead
cmd
npm install
npm run dev

# Option 2: Run through cmd
cmd /c "npm install"
cmd /c "npm run dev"

# Option 3: Change execution policy (admin required)
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

## 📦 Package Management

```bash
# Install new package
npm install package-name

# Install dev dependency
npm install --save-dev package-name

# Update all packages
npm update

# Check for outdated packages
npm outdated

# View installed packages
npm list --depth=0
```

## 🏗️ Build Commands

```bash
# Development build
npm run dev

# Production build (optimized)
npm run build

# Test production build locally
npm run build
npm run start

# Export static site (if needed)
npm run build
npx next export
```

## 🧪 Testing & Debugging

```bash
# Run in development mode (with debugging)
npm run dev

# Build and check for errors
npm run build

# Lint check
npm run lint

# Lint and fix
npm run lint -- --fix

# Check TypeScript errors
npx tsc --noEmit
```

## 🗑️ Cleanup Commands

```bash
# Remove build artifacts
rmdir /s /q .next

# Remove dependencies
rmdir /s /q node_modules

# Complete clean slate
rmdir /s /q node_modules
rmdir /s /q .next
del package-lock.json
npm install
```

## 📝 File Operations

```bash
# View file contents
type README.md

# List files in directory
dir

# Navigate folders
cd foldername
cd ..

# Create directory
mkdir newfolder

# Copy file
copy source.txt destination.txt
```

## 🔍 Inspection Commands

```bash
# Check what's running on port 3000
netstat -ano | findstr :3000

# Kill process on port (replace PID)
taskkill /PID <process_id> /F

# View environment variables
echo %PATH%

# Check disk space
dir
```

## 🌐 Network Commands

```bash
# Test if site is accessible
curl http://localhost:3000

# Check network connectivity
ping google.com

# View local IP
ipconfig
```

## 📊 Git Commands (Optional)

```bash
# Initialize git repo
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit"

# Add remote
git remote add origin <your-repo-url>

# Push to GitHub
git push -u origin main

# Check status
git status

# View changes
git diff
```

## 🚀 Deployment Commands

### Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

## 🔄 Update Commands

```bash
# Update npm
npm install -g npm@latest

# Update Node.js
# Download from: https://nodejs.org

# Update Next.js
npm install next@latest react@latest react-dom@latest

# Update all dependencies
npm update
```

## 📱 Mobile Testing

```bash
# Run dev server
npm run dev

# Find local IP
ipconfig
# Look for IPv4 Address (e.g., 192.168.1.100)

# Access from phone
# http://192.168.1.100:3000
```

## 🎯 Quick Tasks

### Reset User Data (in browser)
1. Press F12 to open DevTools
2. Go to Application tab
3. Expand Local Storage
4. Find "zopen-user-data"
5. Right-click → Delete
6. Refresh page (F5)

### Change Port (if 3000 is taken)
```bash
# Run on different port
npm run dev -- -p 3001

# Or set in package.json
# "dev": "next dev -p 3001"
```

### View Build Size
```bash
npm run build
# Check the output for bundle sizes
```

### Generate Production Build Stats
```bash
npm run build
# Look for bundle analyzer output
```

## ⚡ Performance Commands

```bash
# Analyze bundle size
npm run build

# Clean cache before build
rmdir /s /q .next
npm run build

# Run production mode locally
npm run build
npm run start
```

## 🆘 Emergency Commands

```bash
# If everything breaks, start fresh:
rmdir /s /q node_modules
rmdir /s /q .next
del package-lock.json
npm cache clean --force
npm install
npm run dev
```

## 📋 Useful Shortcuts

```bash
# Stop dev server
Ctrl + C

# Clear terminal
cls

# Previous command
↑ (Up Arrow)

# Auto-complete
Tab

# Cancel operation
Ctrl + C
```

## 🔗 Quick Links Commands

```bash
# Open project in VS Code
code .

# Open in file explorer
explorer .

# Open in browser (after starting server)
start http://localhost:3000
```

## 💡 Pro Tips

```bash
# Run multiple commands at once
npm install & npm run dev

# Run in background (PowerShell)
Start-Process -NoNewWindow npm "run dev"

# Check if server is running
curl http://localhost:3000 -UseBasicParsing

# Quick restart
# Press Ctrl+C then run:
npm run dev
```

---

## 🆘 Common Issues & Solutions

### "npm not found"
```bash
# Install Node.js from: https://nodejs.org
# Restart terminal after installation
```

### "Port already in use"
```bash
# Option 1: Use different port
npm run dev -- -p 3001

# Option 2: Kill process
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### "Module not found"
```bash
# Reinstall dependencies
rmdir /s /q node_modules
npm install
```

### "Build fails"
```bash
# Clean everything
rmdir /s /q .next
rmdir /s /q node_modules
npm install
npm run build
```

---

**Need more help?** Check README.md or SETUP.md!
