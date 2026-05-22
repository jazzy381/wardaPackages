'use client';
import React from 'react';
import { motion } from 'motion/react';
import { FlaskConical, Sparkles, UserCheck, ShieldCheck } from 'lucide-react';

const benefits = [
  {
    icon: FlaskConical,
    title: 'Dermatologist Tested',
    desc: 'Tested caring protection for your skincare.'
  },
  {
    icon: Sparkles,
    title: 'Botanical Ingredients',
    desc: 'Botanical ancisers britns and ingredients.'
  },
  {
    icon: UserCheck,
    title: 'Personalized Solutions',
    desc: 'Promize your own personalized solutions.'
  },
  {
    icon: ShieldCheck,
    title: 'Guaranteed Quality',
    desc: 'Premium quality guaranteed quality'
  }
];

export default function BenefitsBar() {
  return (
    <section className="px-4 lg:px-12 mb-16 max-w-[1400px] mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-[#fcfaf9] rounded-[2rem] p-8 md:p-12 shadow-sm border border-gray-100"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200/60 transition-all">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex flex-col items-center sm:items-start text-center sm:text-left px-4 pt-6 sm:pt-0 first:pt-0">
              <benefit.icon className="w-10 h-10 text-gold stroke-[1.5] mb-5" />
              <h3 className="text-[#4c1d95] font-heading font-bold text-lg mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-[200px] sm:max-w-xs">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
