import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { CommonProps } from '@/shared/types';
import { ToastContainer } from 'react-toastify';
import { CookiesProvider } from 'next-client-cookies/server';
import { EffectorNext } from '@effector/next';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ТОП ВЫБОР',
  description: 'Top 10',
};

export default function RootLayout({ children }: CommonProps) {
  return (
    <EffectorNext>
      <html lang="en">
        <body className={inter.className}>
          <CookiesProvider>{children}</CookiesProvider>
          <ToastContainer />
        </body>
      </html>
    </EffectorNext>
  );
}
