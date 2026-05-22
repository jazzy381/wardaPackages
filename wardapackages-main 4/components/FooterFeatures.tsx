'use client';
import React from 'react';
import { Truck, Lock, Star, Headset } from 'lucide-react';
import { motion } from 'motion/react';

const features = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    desc: 'Quick & reliable shipping'
  },
  {
    icon: Lock,
    title: 'Secure Payment',
    desc: '100% secure checkout'
  },
  {
    icon: Star,
    title: 'Premium Quality',
    desc: 'Best quality solutions'
  },
  {
    icon: Headset,
    title: 'Customer Support',
    desc: "We're here to help you"
  }
];

export default function FooterFeatures() {
  return (
    <section className="px-4 lg:px-12 pb-12 max-w-[1400px] mx-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-[#21163d] via-[#2a1d4c] to-[#21163d] rounded-[2rem] p-8 lg:p-10 shadow-lg relative overflow-hidden"
      >
        {/* Subtle background pattern for footer bar */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 20px 20px, white 2%, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative z-10">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center shrink-0 group hover:border-gold/50 transition-colors">
                <feature.icon className="w-6 h-6 text-gold/80 group-hover:text-gold transition-colors stroke-[1.5]" />
              </div>
              <div>
                <h4 className="text-white font-heading font-medium text-base mb-1">
                  {feature.title}
                </h4>
                <p className="text-blue-100/60 text-sm">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
