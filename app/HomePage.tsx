'use client';
import { AuthPageGateProvider, PageGateProvider } from '@/context';
import { Curve, YandexMetric } from '@/features';
import { CitiesList } from '@/features/Cities/CitiesList/CitiesList';
import { COMMON_TITLE, CommonNavProps } from '@/shared';
import { Footer, HeroSection, Nav, Section, SectionHeader, ThemeProvider } from '@/widgets';
import { FC, Suspense } from 'react';

export const HomePage: FC<CommonNavProps> = ({ cities, categories }) => {
  return (
    <ThemeProvider>
      <AuthPageGateProvider>
        <PageGateProvider>
          <Curve>
            <HeroSection>
              <Nav cities={cities} categories={categories} />
              <Section>
                <div className="container flex flex-col py-8">
                  <div className="h-[50svh] py-12 flex flex-col justify-center w-fit">
                    <h1 className="mb-4 font-extrabold tracking-tight leading-none text-2xl lg:text-3xl xl:text-8xl dark:text-white">
                      {COMMON_TITLE.toUpperCase()}
                    </h1>
                    <p className="max-w-2xl mb-6 font-light lg:mb-8 md:text-lg lg:text-xl dark:text-gray">
                      Анализ и краткое содержание реальных отзывов пользователей
                    </p>
                    <div>
                      <a
                        href="/login"
                        className="inline-flex items-center justify-center px-5 py-3 mr-3 font-medium text-center dark:text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                      >
                        Войти
                        <svg
                          className="w-5 h-5 ml-2 -mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </a>
                      <a
                        href="/register"
                        className="inline-flex items-center justify-center px-5 py-3 font-medium text-center text-gray border border-zinc-300 rounded-lg hover:bg-eboni-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-zinc-700 dark:hover:bg-eboni-700 dark:focus:ring-gray-800"
                      >
                        Зарегестрироваться
                      </a>
                    </div>
                  </div>
                  <SectionHeader title="Выберите город" />
                  <div className="py-8 flex gap-4 mb-auto flex-wrap">
                    <CitiesList cities={cities} />
                  </div>
                </div>

                <Footer />
              </Section>
            </HeroSection>
          </Curve>
          <Suspense fallback={<></>}>
            <YandexMetric />
          </Suspense>
        </PageGateProvider>
      </AuthPageGateProvider>
    </ThemeProvider>
  );
};
