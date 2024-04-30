import type { CommonProps } from '@/shared/types';
import { CookiesProvider } from 'next-client-cookies/server';
// import { Inter } from 'next/font/google';
import Script from 'next/script';
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
  alternates: { canonical: 'https://топвыбор.рф' },
  keywords: [
    'отзывы',
    ' выбор',
    ' рестораны',
    ' салоны красоты',
    ' автосервисы',
    ' медицина',
    ' Москва',
    ' Санкт-петербург',
  ],
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
  openGraph: {
    title: `${COMMON_TITLE}`,
    description: `Выбор лучших услуг: рестораны, салоны красоты, медицина и многое другое на ${COMMON_DOMAIN}. Фотографии, отзывы, акции, скидки, фильтры для поиска.`,
    url: 'https://топвыбор.рф',
    siteName: `${COMMON_DOMAIN}`,
    images: [
      {
        url: 'https://xn--90ab9accji9e.xn--p1ai/_next/image?url=https%3A%2F%2Fxn--n1aalg.xn--90ab9accji9e.xn--p1ai%2Fspb%2Frestaurants%2F7d6d0383-4f90-46ce-a601-4ad4779e812f%2Fc726b70a-ec8e-4cf3-a95a-7b384ce5a7a7.webp&w=3840&q=75', // Must be an absolute URL
        width: 720,
        height: 405,
        alt: 'Рестораны Санкт-Петербурга',
      },
      {
        url: 'https://xn--90ab9accji9e.xn--p1ai/_next/image?url=https%3A%2F%2Fxn--n1aalg.xn--90ab9accji9e.xn--p1ai%2Fspb%2Fcar_services%2Ff8d6543e-56da-4324-8393-79b6142f1440%2Fc1608b82-7b51-4b60-99aa-0fc5ee44ea4e.webp&w=3840&q=75', // Must be an absolute URL
        width: 720,
        height: 405,
        alt: 'Автосервисы Санкт-Петербурга',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
};

export default function RootLayout({ children }: CommonProps) {
  return (
    <html lang="en">
      <body>
        <CookiesProvider>{children}</CookiesProvider>
        <ToastContainer />
        <Script id="metrika-counter" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
		        m[i].l=1*new Date();
		        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
		        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
		        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

		        ym(97095336, "init", {
		             clickmap:true,
		             trackLinks:true,
		             accurateTrackBounce:true,
		             webvisor:true
		        });`}
        </Script>
      </body>
    </html>
  );
}
