import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function NotFound() {
  return (
    <main className="min-h-screen relative overflow-x-hidden bg-[#fcfaf9]">
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-br from-[#7e22ce] via-[#581c87] to-[#3b0764] z-0"></div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen relative z-10 px-6 text-center">
        <h1 className="text-9xl font-bold text-[#581c87] opacity-20 select-none leading-none">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-[#581c87] -mt-6 mb-4">Page Not Found</h2>
        <p className="text-gray-500 max-w-md mb-10 text-lg">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            href="/"
            className="bg-[#581c87] hover:bg-[#7e22ce] text-white font-semibold py-3.5 px-8 rounded-full transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/shop"
            className="border-2 border-[#581c87] text-[#581c87] hover:bg-[#581c87] hover:text-white font-semibold py-3.5 px-8 rounded-full transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </main>
  );
}
