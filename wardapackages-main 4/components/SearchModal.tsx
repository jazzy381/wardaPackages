'use client';
import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useAppContext } from './Providers';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, searchValue, setSearchValue } = useAppContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSearchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchOpen(false);
    router.push('/shop');
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#0a1945]/80 backdrop-blur-md z-[110] flex flex-col"
        >
          <div className="flex justify-end p-6 lg:p-10">
             <button 
                onClick={() => setIsSearchOpen(false)}
                className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              >
                <X className="w-6 h-6" />
             </button>
          </div>
          
          <div className="flex-1 flex flex-col items-center pt-[10vh] px-6">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="w-full max-w-3xl relative"
            >
              <form onSubmit={handleSearch}>
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 text-gold/80" />
                <input 
                  ref={inputRef}
                  type="text" 
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search products..." 
                  className="w-full bg-white/10 border-2 border-white/20 hover:border-gold/50 focus:border-gold outline-none text-white text-2xl lg:text-4xl px-20 py-6 lg:py-8 rounded-[2.5rem] transition-colors placeholder:text-white/40"
                />
                <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 bg-gold hover:bg-gold-hover text-[#4c1d95] p-3 rounded-full transition-colors hidden sm:block">
                   <ArrowRight className="w-6 h-6" />
                </button>
              </form>
            </motion.div>
            
            {/* Quick links */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-12 flex flex-wrap justify-center gap-4 text-white/60"
            >
              <span>Popular:</span>
              <button onClick={() => { setSearchValue('Mosquito Coil'); handleSearch({preventDefault: ()=>{}} as any) }} className="hover:text-gold transition-colors">Mosquito Coil</button>
              <button onClick={() => { setSearchValue('Lotion'); handleSearch({preventDefault: ()=>{}} as any) }} className="hover:text-gold transition-colors">Lotion</button>
              <button onClick={() => { setSearchValue('Diffuser'); handleSearch({preventDefault: ()=>{}} as any) }} className="hover:text-gold transition-colors">Diffuser</button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
