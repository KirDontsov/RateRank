/* eslint-disable @next/next/next-script-for-ga */
import type { CommonProps } from '@/shared/types';
import { CookiesProvider } from 'next-client-cookies/server';
import { Metadata } from 'next/types';
import { ToastContainer } from 'react-toastify';

import { COMMON_DOMAIN, COMMON_TITLE } from '@/shared';
import Image from 'next/image';
import Script from 'next/script';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

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
    <html lang="en" className="overflow-x-hidden dark">
      <body>
        <CookiesProvider>{children}</CookiesProvider>
        <ToastContainer />
        {process.env.PRODUCTION && (
          <>
            <Script id="yandex-metrika" strategy="afterInteractive">
              {`
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }} k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              ym(97095336, "init", { defer: true, clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });
            `}
            </Script>
            <Script id="webmaster-waiter" strategy="beforeInteractive">
              {`window.YandexRotorSettings = {
                WaiterEnabled: true,
                FailOnTimeout: false,
                NoJsRedirectsToMain: true,
                IsLoaded: function() {
                    return document.body.querySelectorAll('div').length > 10;
                },
            }`}
            </Script>
            <Script id="google-tag" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-8N2W9TPW5X');`}
            </Script>
            <Image
              src="https://mc.yandex.ru/watch/97095336"
              width={100}
              height={100}
              style={{ position: 'absolute', left: '-9999px' }}
              alt="yandex-metric"
            />
          </>
        )}
      </body>
    </html>
  );
}
