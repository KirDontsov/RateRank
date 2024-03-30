'use client';
import { COMMON_TITLE } from '@/shared';
import { BreadCrumbs } from '..';
import { FOOTER_LINKS } from './constants';

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 w-full">
      <div className="container flex flex-col pt-12 p-8 mx-auto">
        <BreadCrumbs />
      </div>

      <div className="container px-6 py-12 mx-auto">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Помогаем людям выбрать лучшие места</h2>

          <p className="max-w-md mx-auto mt-2 text-gray-500 dark:text-gray-400">На основе анализа реальных отзывов</p>
        </div>
        <div className="grid grid-cols-2 gap-6 mt-12 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          {Array.from(FOOTER_LINKS).map(([key, value]: [a: string, b: { title: string; href: string }[]]) => {
            return (
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{key}</h3>

                <div className="flex flex-col items-start mt-4 space-y-4">
                  {value.map(({ title, href }) => (
                    <a
                      href={href}
                      rel="nofollow"
                      className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
                    >
                      {title}
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700" />

        <div className="flex flex-col items-center justify-between sm:flex-row">
          <a href="#" rel="nofollow">
            {COMMON_TITLE.toUpperCase()}
          </a>

          <p className="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-300">{`© Все права защищены 2023-${new Date().getFullYear()}`}</p>
        </div>
      </div>
    </footer>
  );
};
