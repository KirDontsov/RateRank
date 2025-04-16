'use client';
import {
  AnimatedText,
  Button,
  Footer,
  ImageWithFallback,
  LoadingComponent,
  Nav,
  Rating,
  Section,
  SectionHeader,
} from '@/widgets';
import { HeroBackground } from '@/shared';
import { ElementType, FC, Suspense } from 'react';
import type { BlockItem, Category, City, Firm, Page, SectionItem } from '@/api';
import cn from 'classnames';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useMediaQuery } from '@/hooks';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('../../../../../../../../../features/FirmsMap/FirmMap'), { ssr: false });

export interface CasePageProps {
  page: Page | null;
  firm: Firm | null;
  cities: City[] | null;
  city: City | null;
  categories: Category[] | null;
  category: Category | null;
}

export const CasePage: FC<CasePageProps> = ({ cities, city, categories, category, firm, page }) => {
  const tablet = useMediaQuery('(max-width: 768px)');

  const rodName = (category?.rod_name ?? '').toLowerCase();

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
          <Link href={`/${city?.abbreviation ?? ''}/${category?.abbreviation ?? ''}/${firm?.url ?? ''}`}>
            <div className="fixed top-1/2 left-0 bg-negroni-400 text-eboni-900 text-wrap break-all z-[2] py-4 px-2 md:px-4 rounded-br-xl rounded-tr-xl w-[26px] md:w-[40px] leading-1 flex items-center">
              Компания
            </div>
          </Link>

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
                  {firm?.default_phone && (
                    <a href={`tel:${firm?.default_phone}`}>
                      <Button onClick={() => {}}>Позвонить</Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </header>
          <div className="w-full flex flex-col items-center gap-4 min-h-[500px] mt-[-120px] z-[1] text-sm xl:text-base">
            <div className="container w-full flex flex-col gap-8 px-8 py-10 overflow-hidden bg-white shadow-2xl rounded-xl dark:bg-eboni-700">
              <div className="w-full flex flex-col gap-8">
                <div className="flex flex-col gap-4 divide-y divide-gray-100 shadow dark:divide-white">
                  <p>Опубликовано: {dayjs(page?.page?.createdTs ?? new Date()).format('DD.MM.YY')}</p>
                  <span />
                </div>

                {Array.from(map).map(([block, sections], index) => (
                  <div key={block?.page_block_id} className="flex flex-col gap-8 rounded-xl" data-test-id="block">
                    {block?.page_block_title && (
                      <h2
                        className={cn('font-semibold text-eboni-400  text-lg lg:text-2xl', {
                          'dark:text-white': index % 2 === 0,
                          'dark:text-negroni-400': index % 2 !== 0,
                        })}
                      >
                        {block.page_block_title}
                      </h2>
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

              <div
                className={cn('w-full flex', {
                  'gap-8 flex-col-reverse': tablet,
                })}
              >
                <div
                  className={cn('flex flex-col gap-4', {
                    'w-full': tablet,
                    'w-2/3': !tablet,
                  })}
                >
                  <SectionHeader id="contacts" title={`Контакты ${rodName} ${firm?.name ?? ''}`} />
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-2 text-gray-500">
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Адрес:
                    </div>
                    <p>{firm?.address}</p>
                  </div>
                </div>

                <div
                  className={cn('flex h-fit', {
                    'w-full': tablet,
                    'w-1/3 justify-end': !tablet,
                  })}
                >
                  {Number(firm?.reviews_count) > 0 && (
                    <div className="flex items-center h-[60px]">
                      <div className="flex h-fit">
                        <Rating rating={firm?.rating} />
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <span>{firm?.rating}</span> /
                        <span>{`${firm?.reviews_count} ${Number(firm?.reviews_count) === 1 ? 'отзыв' : (Number(firm?.reviews_count) ?? 0) <= 4 ? 'отзывa' : 'отзывов'}`}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {firm?.default_phone && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-gray-500">
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z" />
                    </svg>
                    Телефон:
                  </div>
                  <a href={`tel:${firm?.default_phone}`} className="dark:text-negroni-400 text-negroni-400">
                    {firm?.default_phone}
                  </a>
                </div>
              )}

              {['Заказать онлайн', 'WhatsApp', '', null].indexOf(firm?.site ?? '') === -1 && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-gray-500">
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="2"
                        d="M4.37 7.657c2.063.528 2.396 2.806 3.202 3.87 1.07 1.413 2.075 1.228 3.192 2.644 1.805 2.289 1.312 5.705 1.312 6.705M20 15h-1a4 4 0 0 0-4 4v1M8.587 3.992c0 .822.112 1.886 1.515 2.58 1.402.693 2.918.351 2.918 2.334 0 .276 0 2.008 1.972 2.008 2.026.031 2.026-1.678 2.026-2.008 0-.65.527-.9 1.177-.9H20M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    Сайт:
                  </div>
                  <p>{firm?.site.indexOf('Показать телефон') !== -1 ? '' : firm?.site}</p>
                </div>
              )}
              <Suspense fallback={<LoadingComponent />}>{!!firm?.coords && <DynamicMap firm={firm} />}</Suspense>
            </div>
            <Footer />
          </div>
        </div>
      </Section>
    </>
  );
};
