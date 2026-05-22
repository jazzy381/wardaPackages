'use client';
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { useAppContext } from '@/components/Providers';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart, clearCart, currency, paymentMethods } = useAppContext();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: paymentMethods.length > 0 ? paymentMethods[0] : 'Cash on Delivery'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = cart.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setIsSubmitting(true);

    try {
      // 1. Create order in Firestore
      const newOrder = {
        customerName: formData.name,
        phone: formData.phone,
        address: formData.address,
        paymentMethod: formData.paymentMethod,
        total,
        status: 'Pending',
        items: cart.map(c => ({
            id: c.id,
            title: c.title,
            price: c.price,
            quantity: c.quantity
        }))
      };

      const docRef = await addDoc(collection(db, 'orders'), newOrder);

      // 2. Redirect to WhatsApp
      const adminPhone = "923XXXXXXXXX" // TODO: Replace with your real WhatsApp number; // Replace with actual admin number
      const message = `Hello, I just placed an order!\nOrder ID: ${docRef.id}\nName: ${formData.name}\nTotal: ${currency}${total.toFixed(2)}`;
      const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
      
      clearCart();
      window.open(whatsappUrl, '_blank');
      router.push('/shop');
    } catch(err) {
      handleFirestoreError(err, OperationType.CREATE, 'orders');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen relative overflow-x-hidden bg-[#fcfaf9]">
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-br from-[#7e22ce] via-[#581c87] to-[#3b0764] z-0"></div>
      <Navbar />

      <div className="pt-40 lg:pt-48 pb-20 px-6 lg:px-12 relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-[#581c87] font-heading mb-8 text-center">Checkout</h1>
        
        {cart.length === 0 ? (
           <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center">
              <p className="text-gray-500 mb-4">Your cart is empty.</p>
              <button onClick={() => router.push('/shop')} className="text-[#4c1d95] font-semibold underline hover:text-gold transition-colors">Go to Shop</button>
           </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-[#4c1d95] mb-6">Delivery Details</h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <label className="text-sm font-semibold text-gray-700">Full Name</label>
                  <input required value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-gold transition-colors mt-1" placeholder="John Doe" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                  <input required value={formData.phone} onChange={e=>setFormData({...formData, phone: e.target.value})} type="tel" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-gold transition-colors mt-1" placeholder="+1 234 567 8900" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">Delivery Address</label>
                  <textarea required value={formData.address} onChange={e=>setFormData({...formData, address: e.target.value})} rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-gold transition-colors mt-1 resize-none" placeholder="123 Main St, Appt 4B..."></textarea>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">Payment Method</label>
                  <select value={formData.paymentMethod} onChange={e=>setFormData({...formData, paymentMethod: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-gold transition-colors mt-1">
                    {paymentMethods.length > 0 ? paymentMethods.map(pm => (
                      <option key={pm} value={pm}>{pm}</option>
                    )) : (
                      <>
                        <option value="Cash on Delivery">Cash on Delivery</option>
                        <option value="Bank Transfer">Bank Transfer (Contact Admin)</option>
                      </>
                    )}
                  </select>
                </div>
                
                <button disabled={isSubmitting} type="submit" className="bg-[#581c87] hover:bg-gold text-white font-medium py-4 rounded-xl transition-colors mt-4 disabled:opacity-50">
                  {isSubmitting ? 'Placing Order...' : 'Place Order via WhatsApp'}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-3xl p-8 shadow-sm border border-gray-100 h-fit">
              <h2 className="text-2xl font-bold text-[#4c1d95] mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-gray-600">
                    <span className="flex-1 pr-4">{item.quantity}x {item.title}</span>
                    <span className="font-semibold">{currency}{((item.price || 0) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between items-center text-lg">
                <span className="font-bold text-gray-800">Total</span>
                <span className="font-bold text-[#4c1d95]">{currency}{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
