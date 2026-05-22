import Navbar from '@/components/Navbar';
import FooterFeatures from '@/components/FooterFeatures';
import BenefitsBar from '@/components/BenefitsBar';

export default function WhyUs() {
  return (
    <main className="min-h-screen relative overflow-x-hidden bg-[#fcfaf9]">
      {/* Background for Navbar */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-br from-[#7e22ce] via-[#581c87] to-[#3b0764] z-0"></div>
      <Navbar />
      
      <div className="pt-40 lg:pt-48 pb-20 px-6 lg:px-12 relative z-10 max-w-4xl mx-auto text-gray-800 text-center">
         <h1 className="text-4xl md:text-5xl font-bold text-[#581c87] font-heading mb-8">Why Choose Us?</h1>
         <p className="text-lg text-gray-600 mb-16 max-w-2xl mx-auto">
            We prioritize your well-being through uncompromising quality, natural ingredients, and a commitment to excellence. 
         </p>
         
         <BenefitsBar />
      </div>
      
      <FooterFeatures />
    </main>
  );
}
