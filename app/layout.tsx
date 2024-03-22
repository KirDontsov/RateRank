import { Metadata } from 'next/types';
import { Inter } from 'next/font/google';
import type { CommonProps } from '@/shared/types';
import { ToastContainer } from 'react-toastify';
import { CookiesProvider } from 'next-client-cookies/server';

import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

const inter = Inter({ subsets: ['cyrillic'] });

export const metadata: Metadata = {
  title: 'Каталог организаций: отзывы, фото, рейтинг — Топ выбор',
  description:
    'Выбор лучших услуг: рестораны, салоны красоты, медицина и многое другое на Топвыбор.рф. Фотографии, отзывы, акции, скидки, фильтры для поиска.',
};

export default function RootLayout({ children }: CommonProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CookiesProvider>{children}</CookiesProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
