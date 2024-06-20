'use client';
import { COMMON_TITLE } from '@/shared';

import { AnimatedText, BreadCrumbs } from '..';
import { FOOTER_LINKS } from './constants';

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 w-full">
      <div className="container flex flex-col pt-12 p-8 mx-auto">
        <BreadCrumbs />
      </div>

      <div className="container px-6 py-12 mx-auto">
        <div className="text-center">
          <AnimatedText
            el="h2"
            text={[`Помогаем людям выбрать лучшие места`.toUpperCase()]}
            className="font-semibold text-white text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl"
            once
          />

          <p className="max-w-md mx-auto mt-2 text-gray-500 dark:text-gray-400 text-sm xl:text-base">
            На основе анализа реальных отзывов
          </p>
        </div>
        <div className="container grid grid-cols-2 gap-6 mt-12 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          {Array.from(FOOTER_LINKS).map(([key, value]: [a: string, b: { title: string; href: string }[]]) => {
            return (
              <div key={key}>
                <h3 className="text-sm xl:text-base font-medium text-gray-500 dark:text-gray-400">{key}</h3>

                <div className="flex flex-col items-start mt-4 space-y-4">
                  {value.map(({ title, href }) => (
                    <a
                      key={title}
                      href={href}
                      rel="nofollow"
                      className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600 text-sm xl:text-base"
                    >
                      {title}
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-500" />

        <div className="container flex items-center justify-between sm:flex-row">
          <a href="#" rel="nofollow" className="text-base xl:text-2xl">
            {COMMON_TITLE.toUpperCase()}
          </a>

          <p className="mt-4 text-sm xl:text-base text-gray-500 sm:mt-0 dark:text-gray-300">{`© Все права защищены 2023-${new Date().getFullYear()}`}</p>
        </div>
      </div>
    </footer>
  );
};
