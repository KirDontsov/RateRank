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
