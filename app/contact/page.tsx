'use client';
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import FooterFeatures from '@/components/FooterFeatures';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setStatus('submitting');
    try {
      await addDoc(collection(db, 'messages'), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Contact form error:', err);
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen relative overflow-x-hidden bg-[#fcfaf9]">
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-br from-[#7e22ce] via-[#581c87] to-[#3b0764] z-0"></div>
      <Navbar />

      <div className="pt-40 lg:pt-48 pb-20 px-6 lg:px-12 relative z-10 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-[#581c87] font-heading mb-4 text-center">Contact Us</h1>
        <p className="text-center text-gray-500 mb-12">We&apos;d love to hear from you. Please fill out the form below.</p>

        {status === 'success' ? (
          <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-[#581c87] mb-2">Message Sent!</h2>
            <p className="text-gray-500 mb-6">Thank you for reaching out. We&apos;ll get back to you soon.</p>
            <button
              onClick={() => setStatus('idle')}
              className="bg-[#581c87] hover:bg-[#7e22ce] text-white font-medium py-3 px-8 rounded-xl transition-colors"
            >
              Send Another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#581c87] transition-colors"
                placeholder="Your name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#581c87] transition-colors"
                placeholder="your@email.com"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Message</label>
              <textarea
                rows={5}
                required
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#581c87] transition-colors resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            {status === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                Something went wrong. Please try again.
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="bg-[#581c87] hover:bg-[#7e22ce] text-white font-medium py-3.5 rounded-xl transition-colors mt-2 disabled:opacity-60"
            >
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>

      <FooterFeatures />
    </main>
  );
}
