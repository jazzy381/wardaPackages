import Navbar from '@/components/Navbar';
import FooterFeatures from '@/components/FooterFeatures';

export default function About() {
  return (
    <main className="min-h-screen relative overflow-x-hidden bg-[#fcfaf9]">
      {/* Background for Navbar */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-br from-[#7e22ce] via-[#581c87] to-[#3b0764] z-0"></div>
      <Navbar />
      
      <div className="pt-40 lg:pt-48 pb-20 px-6 lg:px-12 relative z-10 max-w-4xl mx-auto text-gray-800">
         <h1 className="text-4xl md:text-5xl font-bold text-[#581c87] font-heading mb-8 text-center">About Warda Packages</h1>
         <div className="space-y-6 text-lg leading-relaxed text-gray-600">
            <p>
               Welcome to Warda Packages, your premium destination for holistic wellness and natural mosquito protection. We believe that caring for your health should never come at the expense of your beauty or comfort.
            </p>
            <p>
               Born from a desire to create safe, organic alternatives to harsh chemical repellents, our products are meticulously crafted using ethical sourcing and botanical ingredients. Every formula is dermatologist-tested to ensure gentle, caring protection for your skin.
            </p>
            <p>
               Our mission is to empower you with personalized solutions that let you enjoy life&apos;s moments naturally. Explore our luxurious range and discover the harmony of nature and science.
            </p>
         </div>
      </div>
      
      <div className="mt-auto">
        <FooterFeatures />
      </div>
    </main>
  );
}
