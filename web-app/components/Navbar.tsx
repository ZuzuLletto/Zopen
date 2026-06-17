'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { formatZCoins } from '@/utils/format';

export default function Navbar() {
  const pathname = usePathname();
  const balance = useStore((state) => state.balance);

  const navLinks = [
    { href: '/', label: 'Cases' },
    { href: '/market', label: 'Market' },
    { href: '/inventory', label: 'Inventory' },
  ];

  return (
    <nav className="bg-surface border-b border-border sticky top-0 z-50 backdrop-blur-lg bg-opacity-90">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <motion.div
              className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ZOPEN
            </motion.div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href}>
                  <motion.div
                    className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                      isActive ? 'text-primary' : 'text-gray-300 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        layoutId="navbar-indicator"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Z-Coin Balance */}
          <motion.div
            className="flex items-center space-x-2 bg-surface-light px-4 py-2 rounded-lg border border-primary/30"
            whileHover={{ scale: 1.02, borderColor: 'rgba(0, 212, 255, 0.5)' }}
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold">
              Z
            </div>
            <span className="text-lg font-bold text-primary">
              {formatZCoins(balance)}
            </span>
          </motion.div>
        </div>
      </div>
    </nav>
  );
}
