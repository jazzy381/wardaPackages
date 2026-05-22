'use client';
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useAppContext } from './Providers';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen, currency } = useAppContext();
  const router = useRouter();

  // Prevent scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  const total = cart.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);

  const proceedToCheckout = () => {
    setIsCartOpen(false);
    router.push('/checkout');
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0a1945]/40 backdrop-blur-sm z-[100]"
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-2xl font-heading font-bold text-[#4c1d95] flex items-center gap-2">
                <ShoppingBag className="w-6 h-6" />
                Your Cart
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 gap-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-gray-300" />
                  </div>
                  <p>Your cart is empty.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="text-[#4c1d95] font-semibold underline mt-2 hover:text-gold transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center bg-white border border-gray-100 rounded-2xl p-3 shadow-sm relative group">
                    <div className="relative w-24 h-24 bg-gray-50 rounded-xl overflow-hidden shrink-0">
                      <Image 
                        src={item.image} 
                        alt={item.title} 
                        fill 
                        referrerPolicy="no-referrer"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col flex-1">
                      <h3 className="font-bold text-[#4c1d95] text-sm leading-tight pr-6">{item.title}</h3>
                      <p className="text-gray-500 text-xs mt-1 mb-2">Price: {currency}{(item.price || 0).toFixed(2)}</p>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center bg-gray-50 rounded-lg p-0.5 border border-gray-200">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-[#4c1d95] hover:bg-white rounded transition-colors"><Minus className="w-3 h-3" /></button>
                          <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-[#4c1d95] hover:bg-white rounded transition-colors"><Plus className="w-3 h-3" /></button>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors p-1 opacity-0 group-hover:opacity-100"
                    >
                       <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-3 right-4 font-bold text-[#4c1d95]">
                       {currency}{((item.price || 0) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-600 font-medium">Subtotal</span>
                  <span className="text-2xl font-bold font-heading text-[#4c1d95]">{currency}{total.toFixed(2)}</span>
                </div>
                <button onClick={proceedToCheckout} className="w-full bg-[#581c87] hover:bg-gold text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-purple-900/20">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
