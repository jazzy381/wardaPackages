'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useAppContext } from './Providers';

const fallbackProducts = [
  {
    id: 1,
    title: 'Natural Mosquito Coil',
    subtitle: 'Efficient long-lasting defense',
    image: 'https://images.unsplash.com/photo-1616853768224-b1eb213236e7?q=80&w=800&auto=format&fit=crop', // Spiral/incense vibe
    btnText: 'Shop Now'
  },
  {
    id: 2,
    title: 'Mosquito Repellent Lotion',
    subtitle: 'Gentle, effective body lotion',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&auto=format&fit=crop', // Lotion bottles
    btnText: 'Shop Now'
  },
  {
    id: 3,
    title: 'Luxury Spa Diffuser',
    subtitle: 'Premium device',
    image: 'https://images.unsplash.com/photo-1602928321679-5606dcf5a75e?q=80&w=800&auto=format&fit=crop', // Diffuser/device
    btnText: 'Shop Now'
  },
  {
    id: 4,
    title: 'Silken Skin Soap Bar Collection',
    subtitle: 'Mosquito-repelling properties',
    image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?q=80&w=800&auto=format&fit=crop', // Soap bars
    btnText: 'Shop Now'
  }
];

export default function ProductCards() {
  const [products, setProducts] = useState<any[]>([]);
  const { addToCart, searchValue, currency } = useAppContext();

  useEffect(() => {
    const q = query(collection(db, 'products'));
    const unsub = onSnapshot(q, (snapshot) => {
      const prods: any[] = [];
      snapshot.forEach(doc => {
        prods.push({ id: doc.id, ...doc.data() });
      });
      setProducts(prods.length > 0 ? prods : fallbackProducts);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'products');
    });
    return () => unsub();
  }, []);

  const filteredProducts = products.filter(p => 
    searchValue === '' ? true : p.title?.toLowerCase().includes(searchValue.toLowerCase()) || p.subtitle?.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 -mt-24 md:-mt-32 mb-20 min-h-[400px]">
      {filteredProducts.length === 0 ? (
         <div className="text-center py-20 bg-white/80 backdrop-blur rounded-[2rem] shadow-sm">
           <h3 className="text-2xl text-[#4c1d95] font-semibold mb-2">No products found for &quot;{searchValue}&quot;</h3>
           <p className="text-gray-500">Try adjusting your search criteria.</p>
         </div>
      ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-[2rem] p-6 shadow-xl shadow-black/10 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300 relative"
          >
            {/* Add to Cart Quick Button */}
            <button 
                onClick={() => addToCart(product)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-[#4c1d95] hover:bg-gold opacity-0 group-hover:opacity-100 transition-all -translate-y-2 group-hover:translate-y-0"
                aria-label="Add to cart"
            >
                <ShoppingBag className="w-5 h-5" />
            </button>

            {/* Product Image Area */}
            <div className="w-full h-48 relative mb-6 rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center p-4">
              <Image 
                src={product.image} 
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                referrerPolicy="no-referrer"
                className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl"
              />
            </div>
            
            {/* Product Info */}
            <h3 className="text-[#4c1d95] font-heading font-bold text-lg mb-1 leading-tight px-2">
              {product.title}
            </h3>
            <p className="text-gray-500 text-sm mb-2 min-h-[40px]">
              {product.subtitle}
            </p>
            {product.price !== undefined && (
              <div className="font-bold text-lg mb-4 text-[#4c1d95]">{currency}{product.price}</div>
            )}
            
            {/* CTA Button */}
            <button 
              onClick={() => addToCart(product)}
              className="mt-auto bg-purple-cta hover:bg-purple-cta-hover text-white font-medium py-2.5 px-6 rounded-full flex items-center justify-center gap-2 transition-colors w-10/12 text-sm group-hover:shadow-lg shadow-purple-cta/30"
            >
              {product.btnText || 'Add To Cart'}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </div>
      )}
    </section>
  );
}
