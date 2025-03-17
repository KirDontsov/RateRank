import { COMMON_DOMAIN, COMMON_TITLE } from '@/shared';
import Link from 'next/link';
import { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: `Каталог организаций: отзывы, фото, рейтинг — 404 ${COMMON_TITLE}`,
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

export default function NotFound() {
  return (
    <main className="flex h-screen flex-col bg-white dark:bg-eboni-900 w-full overflow-hidden">
      <div className="relative isolate w-full">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#09090b] to-[#52525b] dark:to-[#eecda1] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          ></div>
        </div>
        <div className="centered-container flex justify-center h-screen w-full items-center">
          <div className="container flex flex-col px-4 py-8">
            <p className="mb-8">Ошибка 404</p>
            <h1 className="w-full mb-4 font-extrabold tracking-tight leading-none text-2xl lg:text-3xl xl:text-8xl dark:text-white">
              Такой страницы нет 444
            </h1>
            <div className="mt-4">
              <Link href="/" className="text-negroni-400">
                Перейти на главную
              </Link>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#09090b] to-[#52525b] dark:to-[#eecda1] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          ></div>
        </div>
      </div>
    </main>
  );
}
