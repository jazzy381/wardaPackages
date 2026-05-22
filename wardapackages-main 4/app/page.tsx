import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductCards from '@/components/ProductCards';
import BenefitsBar from '@/components/BenefitsBar';
import FooterFeatures from '@/components/FooterFeatures';

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-x-hidden pb-12">
      <Navbar />
      <Hero />
      <ProductCards />
      <BenefitsBar />
      <FooterFeatures />
    </main>
  );
}
