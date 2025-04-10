'use client';
import { AnimatedText, Footer, ImageWithFallback, Nav, Section } from '@/widgets';
import { HeroBackground } from '@/shared';
import type { ElementType, FC } from 'react';
import type { BlockItem, Category, City, Firm, Page, SectionItem } from '@/api';
import cn from 'classnames';
import dayjs from 'dayjs';

export interface CasePageProps {
  page: Page | null;
  firm: Firm | null;
  cities: City[] | null;
  city: City | null;
  categories: Category[] | null;
  category: Category | null;
}

export const CasePage: FC<CasePageProps> = ({ cities, city, categories, category, firm, page }) => {
  const map = new Map<BlockItem, SectionItem[]>();

  const blocks = page?.blocks.sort((a, b) => Number(a?.page_block_order) - Number(b?.page_block_order)) ?? [];
  const sections =
    page?.sections.sort((a, b) => Number(a?.page_block_section_order) - Number(b?.page_block_section_order)) ?? [];

  blocks.forEach((block) => {
    map.set(
      block,
      sections.filter((sec) => sec.page_block_id === block.page_block_id),
    );
  });

  return (
    <>
      <Nav cities={cities} categories={categories} />
      <Section pt={0}>
        <div className="w-full flex flex-col gap-4 relative">
          <header>
            <div className="w-full bg-center bg-cover h-[calc(100svh)] relative">
              <ImageWithFallback
                className="w-full h-[38rem] absolute z-[-1]"
                src={page?.page?.page_photo ?? HeroBackground[(firm?.category_id ?? '') as keyof typeof HeroBackground]}
                fallbackSrc={HeroBackground[firm?.category_id as keyof typeof HeroBackground]}
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
                    text={[`Ремонт фар ${page?.page?.oai_value ?? ''}`.toUpperCase()]}
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
            <div className="container w-full flex flex-col gap-8 items-center px-8 py-10 overflow-hidden bg-white shadow-2xl rounded-xl dark:bg-eboni-700">
              <div className="w-full flex flex-col gap-8">
                <div className="flex flex-col gap-4 divide-y divide-gray-100 shadow dark:divide-white">
                  <p>Опубликовано: {dayjs(page?.page?.createdTs ?? new Date()).format('DD.MM.YY')}</p>
                  <span />
                </div>

                {Array.from(map).map(([block, sections]) => (
                  <div key={block?.page_block_id} className="flex flex-col gap-8 rounded-xl" data-test-id="block">
                    {block?.page_block_title && (
                      <h2 className="font-semibold dark:text-negroni-400">{block.page_block_title}</h2>
                    )}
                    {block?.page_block_subtitle && <p>{block.page_block_subtitle}</p>}
                    <div
                      className={cn('flex flex-wrap', {
                        'gap-8': Number(block?.page_block_type ?? 0) !== 2,
                        'gap-2': Number(block?.page_block_type ?? 0) === 2,
                      })}
                    >
                      {sections.map((section, index) => {
                        return (
                          <div
                            key={section.page_block_section_id}
                            className={cn('flex flex-col gap-4 rounded-xl', {
                              'w-full md:w-[calc(50%-17px)] bg-eboni-500 px-4 py-4':
                                Number(block?.page_block_type ?? 0) === 1,
                              'w-fit px-0 py-0': Number(block?.page_block_type ?? 0) === 2,
                            })}
                            data-test-id="section"
                          >
                            {section?.title && <h3 className="font-semibold dark:text-negroni-400">{section.title}</h3>}
                            {section?.subtitle && <h4>{section.subtitle}</h4>}
                            {section?.url && section?.text && (
                              <a
                                className="hover:text-negroni-400"
                                href={`/${city?.abbreviation}/${category?.abbreviation}/${firm?.url}/cases/${page?.page?.url}`}
                              >
                                {section.text}
                                {index !== sections?.length - 1 && ', '}
                              </a>
                            )}
                            {!section?.url && section?.text && <p>{section.text}</p>}
                          </div>
                        );
                      })}
                    </div>
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
