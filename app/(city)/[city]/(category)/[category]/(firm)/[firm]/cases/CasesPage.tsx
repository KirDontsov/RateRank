'use client';
import { AnimatedText, Footer, ImageWithFallback, Nav, Section } from '@/widgets';
import { HeroBackground, transliterate } from '@/shared';
import { ElementType, FC } from 'react';
import type { Category, City, Firm, PageItem } from '@/api';

export interface CasesPageProps {
  firm: Firm | null;
  cities: City[] | null;
  city: City | null;
  categories: Category[] | null;
  category: Category | null;
  pagesByFirm: PageItem[] | null;
}

export const CasesPage: FC<CasesPageProps> = ({ cities, city, categories, category, firm, pagesByFirm }) => {
  return (
    <>
      <Nav cities={cities} categories={categories} />
      <Section pt={0}>
        <div className="w-full flex flex-col gap-4 relative">
          <header>
            <div className="w-full bg-center bg-cover h-[calc(100svh)] relative">
              <ImageWithFallback
                className="w-full h-[38rem] absolute z-[-1]"
                src={
                  pagesByFirm?.[0]?.page_photo ??
                  HeroBackground[(firm?.category_id ?? '') as keyof typeof HeroBackground]
                }
                fallbackSrc={HeroBackground[(firm?.category_id ?? '') as keyof typeof HeroBackground]}
                fill
                alt={`bestlight`}
                style={{ objectFit: 'cover' }}
                placeholder="blur"
                blurDataURL={`data:image/jpeg;base64,${HeroBackground['565ad1cb-b891-4185-ac75-24ab3898cf22' as keyof typeof HeroBackground]}`}
                priority={true}
              />
              <div className="flex items-center justify-center w-full h-full bg-eboni-900/40">
                <div className="text-center">
                  <AnimatedText
                    el={'h1' as unknown as ElementType}
                    text={[`Кейсы ${firm?.name ?? ''}`.toUpperCase()]}
                    className="font-semibold text-white text-2xl lg:text-3xl xl:text-8xl 2xl:text-12xl leading-none tracking-tighter"
                    once
                  />
                  <button className="w-full px-5 py-2 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-negroni-600 rounded-md lg:w-auto hover:bg-negroni-400 focus:outline-none focus:bg-negroni-400">
                    Позвонить
                  </button>
                </div>
              </div>
            </div>
          </header>
          <div className="w-full flex flex-col items-center gap-4 min-h-[500px] mt-[-120px] z-[1] text-sm xl:text-base">
            <div className="container w-full flex flex-col gap-8 items-center px-8 py-10 overflow-hidden bg-white shadow-2xl rounded-xl dark:bg-eboni-800">
              <div className="w-full flex flex-col gap-8">
                {pagesByFirm?.map((item, index) => (
                  <div key={index}>
                    <a
                      key={item?.page_id}
                      href={`/${city?.abbreviation}/${category?.abbreviation}/${firm?.url ?? transliterate(firm?.name ?? '')}/cases/${item?.url ?? ''}`}
                      // onClick={handleClick}
                      className="bg-white rounded-lg shadow hover:shadow-md dark:bg-eboni-800 relative cursor-pointer min-w-80 max-w-sm md:min-w-[40rem] md:max-w-lg"
                    >
                      <div className="relative w-full h-[15rem] md:h-[30rem] overflow-hidden">
                        <ImageWithFallback
                          key={item?.page_id}
                          className="w-full h-[15rem] md:h-[30rem] hover:scale-[1.1] duration-300"
                          src={
                            item?.page_photo ?? HeroBackground[(firm?.category_id ?? '') as keyof typeof HeroBackground]
                          }
                          fallbackSrc={HeroBackground[(firm?.category_id ?? '') as keyof typeof HeroBackground]}
                          fill
                          alt={`bestlight`}
                          style={{ objectFit: 'cover' }}
                          priority={false}
                          loading="lazy"
                        />
                      </div>
                      <div className="p-5 flex flex-col gap-8">
                        <h3 className="font-bold tracking-tight whitespace-pre text-base xl:text-2xl flex flex-col">
                          <span className="text-eboni-400 dark:text-white truncate">{`${item?.oai_value} `}</span>{' '}
                          <span className="font-normal text-sm xl:text-base">Кейс</span>
                        </h3>
                        <p className="mb-3 font-normal text-sm xl:text-base">ремонт фар</p>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </Section>
    </>
  );
};
