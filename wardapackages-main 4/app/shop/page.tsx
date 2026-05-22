import Navbar from '@/components/Navbar';
import FooterFeatures from '@/components/FooterFeatures';
import ProductCards from '@/components/ProductCards';

export default function Shop() {
  return (
    <main className="min-h-screen relative overflow-x-hidden bg-[#fcfaf9]">
      {/* Background for Navbar */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-br from-[#7e22ce] via-[#581c87] to-[#3b0764] z-0"></div>
      <Navbar />
      
      <div className="pt-40 lg:pt-48 pb-20 px-6 lg:px-12 relative z-10">
         <div className="max-w-7xl mx-auto mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#581c87] font-heading mb-4">Our Products</h1>
            <p className="text-gray-500 max-w-xl mx-auto">Explore our range of premium organic mosquito protection and wellness products.</p>
         </div>
         {/* Reusing Product Cards component, adjusting negative margin since there's no hero */}
         <div className="[&>section]:!mt-0 [&>section]:!mb-0">
             <ProductCards />
         </div>
      </div>
      
      <FooterFeatures />
    </main>
  );
}
