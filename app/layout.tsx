import { ToastProvider } from '@/providers/toast-provider';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ModalProvider } from '@/providers/modal-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ShopKart - Your Shopping Destination',
  description: 'Modern e-commerce platform for all your shopping needs',
  keywords: ['e-commerce', 'shopping', 'online store', 'modern design'],
  authors: [{ name: 'Muhammed Safwan', url: '' }],
  creator: 'Muhammed Safwan',
  publisher: 'Muhammed Safwan',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider />
        <ModalProvider />
        {children}
      </body>
    </html>
  );
}