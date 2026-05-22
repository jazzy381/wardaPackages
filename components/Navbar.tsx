'use client';
import React, { useEffect, useState } from 'react';
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useAppContext } from './Providers';

export default function Navbar() {
  const [logoUrl, setLogoUrl] = useState("https://s3.amazonaws.com/uploads.aistudio.google.com/9788be45-8f43-448f-aa6a-6f028cf5dc9c/logo.jpg");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isCartOpen, setIsCartOpen, setIsSearchOpen, cart } = useAppContext();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'logoUrl'), (docSnap) => {
      if (docSnap.exists() && docSnap.data().value) {
        setLogoUrl(docSnap.data().value);
      }
    });
    return () => unsub();
  }, []);

  // Close mobile menu on route change / scroll
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About Us' },
    { href: '/why-us', label: 'Why Us' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-4 lg:px-12 bg-transparent">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* Logo Area */}
          <div className="flex items-center gap-3">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="w-24 h-24 md:w-32 md:h-32 relative overflow-hidden flex items-center justify-center">
                <Image
                  src={logoUrl}
                  alt="Warda Packages Logo"
                  fill
                  className="object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 font-medium text-sm">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="text-white/80 hover:text-white transition-colors pb-1">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-5 md:gap-6 text-white/90">
            <button onClick={() => setIsSearchOpen(true)} aria-label="Search" className="hover:text-gold transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link href="/admin" aria-label="User Profile" className="hover:text-gold transition-colors hidden sm:block">
              <User className="w-5 h-5" />
            </Link>
            <button onClick={() => setIsCartOpen(!isCartOpen)} aria-label="Shopping Cart" className="relative hover:text-gold transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2.5 bg-gold text-[#4c1d95] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cartItemsCount}</span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="md:hidden ml-2 hover:text-gold transition-colors"
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-[#3b0764] to-[#581c87] z-50 md:hidden transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full px-6 pt-8 pb-10">
          {/* Logo in drawer */}
          <div className="flex items-center justify-between mb-10">
            <div className="w-20 h-20 relative">
              <Image src={logoUrl} alt="Warda Packages Logo" fill className="object-contain" referrerPolicy="no-referrer" />
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-white/70 hover:text-white p-2">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white/80 hover:text-white hover:bg-white/10 transition-colors text-lg font-medium px-4 py-3 rounded-xl"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white/80 hover:text-white hover:bg-white/10 transition-colors text-lg font-medium px-4 py-3 rounded-xl mt-2 border-t border-white/10 pt-5"
            >
              Admin Panel
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
