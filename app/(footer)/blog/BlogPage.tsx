/** eslint-disable react/jsx-key */
'use client';
import { Category, City, PageItem } from '@/api';
import { Curve } from '@/features';
import { COMMON_TITLE, HeroBackground } from '@/shared';
import { Footer, ImageWithFallback, Nav, Section } from '@/widgets';
import dayjs from 'dayjs';
import Link from 'next/link';
import { FC } from 'react';

export interface BlogPageProps {
  pages: PageItem[] | null;
  cities: City[] | null;
  categories: Category[] | null;
}

export const BlogPage: FC<BlogPageProps> = ({ pages, cities, categories }) => {
  return (
    <div>
      <Curve>
        <Nav cities={cities} categories={categories} />
        <Section pt={0}>
          <div className="w-full flex flex-col gap-8">
            <header>
              <div className="w-full bg-center bg-cover h-[38rem] relative">
                <ImageWithFallback
                  className="w-full h-[38rem] absolute z-[-1] blur-sm"
                  src={HeroBackground['3ebc7206-6fed-4ea7-a000-27a74e867c9a']}
                  fallbackSrc={HeroBackground['3ebc7206-6fed-4ea7-a000-27a74e867c9a']}
                  fill
                  alt={`Блог - Подборки - ${COMMON_TITLE}`}
                  style={{ objectFit: 'cover' }}
                  placeholder="blur"
                  blurDataURL={`data:image/jpeg;base64,${HeroBackground['3ebc7206-6fed-4ea7-a000-27a74e867c9a']}`}
                  priority={true}
                />
                <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
                  <div className="text-center">
                    <h1 className="text-3xl font-semibold text-white lg:text-8xl">{`Блог - Подборки - ${COMMON_TITLE}`}</h1>
                  </div>
                </div>
              </div>
            </header>
          </div>

          <div className="w-full flex flex-col items-center gap-4 min-h-[500px] mt-[-120px] z-[1]">
            <div className="container min-h-[500px] w-full flex flex-col gap-8 px-8 py-10 overflow-hidden bg-white shadow-2xl rounded-xl dark:bg-gray-800">
              {pages?.map((page) => (
                <div
                  key={page.page_id}
                  className="flex flex-col gap-4 divide-y divide-gray-100 shadow dark:divide-gray-600"
                >
                  <Link href={`blog/${page.url}`} className="text-3xl font-semibold text-white lg:text-6xl">
                    {page.oai_value}
                  </Link>
                  <p className="py-2">Статья написана: {dayjs(page?.createdTs ?? new Date()).format('DD.MM.YY')}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-full">
            <Footer />
          </div>
        </Section>
      </Curve>
    </div>
  );
};
