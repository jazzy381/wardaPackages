import type {Metadata} from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/components/Providers';
import CartDrawer from '@/components/CartDrawer';
import SearchModal from '@/components/SearchModal';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' });

export const metadata: Metadata = {
  title: 'Warda Packages | Natural Mosquito Protection',
  description: 'Premium organic mosquito protection and wellness products. Keep your family safe without nasty chemicals.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="font-sans antialiased bg-white text-gray-900" suppressHydrationWarning>
        <AppProvider>
          {children}
          <CartDrawer />
          <SearchModal />
        </AppProvider>
      </body>
    </html>
  );
}
