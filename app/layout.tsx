/* eslint-disable @next/next/next-script-for-ga */
import type { CommonProps } from '@/shared/types';
import { CookiesProvider } from 'next-client-cookies/server';
// import { Inter } from 'next/font/google';
import { Metadata } from 'next/types';
import { ToastContainer } from 'react-toastify';

import { COMMON_DOMAIN, COMMON_TITLE } from '@/shared';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

// const inter = Inter({ subsets: ['cyrillic'] });

export const metadata: Metadata = {
  title: `Каталог организаций: отзывы, фото, рейтинг — ${COMMON_TITLE}`,
  description: `Выбор лучших услуг: рестораны, салоны красоты, медицина и многое другое на ${COMMON_DOMAIN}. Фотографии, отзывы, акции, скидки, фильтры для поиска.`,
  metadataBase: new URL('https://топвыбор.рф'),
  applicationName: `Каталог организаций: отзывы, фото, рейтинг — ${COMMON_TITLE}`,
  icons: [
    { rel: 'shortcut icon', url: '/favicon.ico' },
    { rel: 'shortcut icon', url: '/favicon.svg', sizes: '57x57' },
    { rel: 'shortcut icon', url: '/favicon.svg', sizes: '72x72' },
    { rel: 'shortcut icon', url: '/favicon.svg', sizes: '114x114' },
    { rel: 'shortcut icon', url: '/favicon.svg', sizes: '144x144' },
    { rel: 'apple-touch-icon', url: '/favicon.svg', sizes: '57x57' },
    { rel: 'apple-touch-icon', url: '/favicon.svg', sizes: '72x72' },
    { rel: 'apple-touch-icon', url: '/favicon.svg', sizes: '114x114' },
    { rel: 'apple-touch-icon', url: '/favicon.svg', sizes: '144x144' },
  ],
  alternates: { canonical: 'https://топвыбор.рф' },
  keywords: ['отзывы', ' рестораны', ' салоны красоты', ' автосервисы', ' медицина', ' Москва', ' Санкт-петербург'],
  openGraph: {
    title: `Каталог организаций: отзывы, фото, рейтинг — ${COMMON_TITLE}`,
    description: `Выбор лучших услуг: рестораны, салоны красоты, медицина и многое другое на ${COMMON_DOMAIN}. Фотографии, отзывы, акции, скидки, фильтры для поиска.`,
    url: 'https://топвыбор.рф',
    siteName: `${COMMON_DOMAIN}`,
    locale: 'ru_RU',
    type: 'website',
  },
};

export default function RootLayout({ children }: CommonProps) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body>
        <CookiesProvider>{children}</CookiesProvider>
        <ToastContainer />

      </body>
    </html>
  );
}
