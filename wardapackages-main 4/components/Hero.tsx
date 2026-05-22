'use client';
import React from 'react';
import { motion } from 'motion/react';
import { Award, Heart, Leaf, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-48 lg:pt-40 lg:pb-56 px-6 lg:px-12 bg-gradient-to-br from-[#7e22ce] via-[#581c87] to-[#3b0764] overflow-hidden">
      {/* Decorative Dots Pattern */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-dots opacity-40 pointer-events-none -translate-x-1/4 -translate-y-1/4 rounded-full" style={{ maskImage: 'radial-gradient(circle, black 30%, transparent 70%)', WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)' }}></div>
      
      {/* Soft Glow */}
      <div className="absolute top-1/4 left-1/2 w-[800px] h-[800px] bg-purple-500/15 blur-[120px] rounded-full pointer-events-none -translate-x-1/2"></div>
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542382156909-92f80164c01d')" }}></div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.1] font-bold font-heading mb-6 tracking-tight">
            Protect Your <br />
            Home <span className="text-gold font-normal">Naturally</span>
          </h1>
          
          <p className="text-lg md:text-xl text-blue-100/80 mb-10 max-w-[90%] leading-relaxed">
            Premium mosquito protection and organic insect repellent products, for your health and comfort.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-14">
            <Link href="/shop" className="bg-gold hover:bg-gold-hover text-[#4c1d95] font-semibold py-3.5 px-8 rounded-full transition-all duration-300 flex items-center gap-2 group shadow-[0_0_20px_rgba(206,170,107,0.3)]">
              Shop Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/shop" className="bg-transparent hover:bg-white/5 border-2 border-gold/40 hover:border-gold text-white font-medium py-3.5 px-8 rounded-full transition-all duration-300">
              Explore Products
            </Link>
          </div>

          {/* Feature Icons Row */}
          <div className="flex flex-wrap gap-6 md:gap-8 lg:gap-10 border-t border-white/10 pt-8">
            <div className="flex flex-col gap-2 max-w-[140px]">
              <Award className="w-8 h-8 text-gold stroke-1" />
              <h3 className="font-semibold text-white font-heading leading-tight">Certified<br/>Organic</h3>
              <p className="text-xs text-blue-100/60 leading-snug">Tested and proven in natural herbs.</p>
            </div>
            <div className="flex flex-col gap-2 max-w-[140px]">
              <Heart className="w-8 h-8 text-gold stroke-1" />
              <h3 className="font-semibold text-white font-heading leading-tight">Holistic<br/>Wellness</h3>
              <p className="text-xs text-blue-100/60 leading-snug">Prevents and holistic protection.</p>
            </div>
            <div className="flex flex-col gap-2 max-w-[140px]">
              <Leaf className="w-8 h-8 text-gold stroke-1" />
              <h3 className="font-semibold text-white font-heading leading-tight">Ethical<br/>Sourcing</h3>
              <p className="text-xs text-blue-100/60 leading-snug">Ethical sourcing products.</p>
            </div>
          </div>
        </motion.div>

        {/* Right Product Composition */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative h-[500px] lg:h-[600px] flex items-center justify-center mt-12 lg:mt-0"
        >
           {/* Glowing Background Ring */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[450px] md:h-[450px] border border-gold/20 rounded-full shadow-[0_0_80px_rgba(206,170,107,0.15)] bg-gradient-to-tr from-gold/5 to-transparent"></div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[520px] md:h-[520px] border border-white/5 rounded-full"></div>

           {/* Central Product Image Placeholder (Composite) */}
           <div className="relative z-10 w-full max-w-lg mx-auto aspect-square rounded-2xl overflow-hidden pointer-events-none group">
               {/* Using a sophisticated wellness/spa placeholder image to simulate the general feel */}
               <Image 
                 src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=1200&auto=format&fit=crop"
                 alt="Premium Product Composition"
                 fill
                 sizes="(max-width: 1024px) 100vw, 50vw"
                 referrerPolicy="no-referrer"
                 className="object-cover object-center bg-transparent drop-shadow-2xl mix-blend-normal"
                 style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
                 priority
               />
           </div>
           
           {/* Foreground Floating Leaves */}
           <div className="absolute bottom-10 -left-10 w-32 h-32 opacity-80 blur-[2px] z-20">
              <Image src="https://images.unsplash.com/photo-1598514981775-812111d4da34?q=80&w=400&auto=format&fit=crop" alt="Leaf" fill sizes="128px" referrerPolicy="no-referrer" className="object-cover rounded-full mix-blend-multiply opacity-20" />
           </div>
           <div className="absolute top-10 -right-5 w-40 h-40 opacity-70 blur-[4px] z-0">
              <Image src="https://images.unsplash.com/photo-1598514981775-812111d4da34?q=80&w=400&auto=format&fit=crop" alt="Leaf" fill sizes="160px" referrerPolicy="no-referrer" className="object-cover rounded-full mix-blend-multiply opacity-10" />
           </div>
        </motion.div>

      </div>
    </section>
  );
}
