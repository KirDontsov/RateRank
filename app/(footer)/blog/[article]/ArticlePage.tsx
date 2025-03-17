'use client';
import { Category, City, Firm, ImageType, Page, SectionItem } from '@/api';
import { useMediaQuery } from '@/hooks';
import { DEFAULT_PHOTOS_ENDPOINT, DEFAULT_PHOTOS_EXT, HeroBackground } from '@/shared';
import { AnimatedText, Footer, ImageWithFallback, LoadingComponent, Nav, Rating, Section } from '@/widgets';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { ElementType, FC, Suspense } from 'react';

const DynamicImages = dynamic(() => import('../../../../features/Images'));

export interface ArticlePageProps {
  page: Page | null;
  firms: Firm[] | null;
  cities: City[] | null;
  categories: Category[] | null;
  images: Map<string, ImageType[] | null>;
}

export const ArticlePage: FC<ArticlePageProps> = ({ page, firms, cities, categories, images }) => {
  if (!page) {
    notFound();
  }
  const map = new Map<string, SectionItem[]>();
  const tablet = useMediaQuery('(max-width: 768px)');

  const blocks = page?.blocks.sort((a, b) => Number(a?.page_block_order) - Number(b?.page_block_order)) ?? [];
  const sections =
    page?.sections.sort((a, b) => Number(a?.page_block_section_order) - Number(b?.page_block_section_order)) ?? [];

  blocks.forEach((block) => {
    map.set(
      block?.page_block_id ?? '',
      sections.filter((sec) => sec.page_block_id === block.page_block_id),
    );
  });

  return (
    <div>
      <Nav cities={cities} categories={categories} />
      <Section pt={0}>
        <div className="w-full flex flex-col gap-8">
          <header>
            <div className="w-full bg-center bg-cover h-[100svh] relative">
              <ImageWithFallback
                className="w-full h-[38rem] absolute z-[-1] blur-sm"
                src={`${DEFAULT_PHOTOS_ENDPOINT}/${cities?.[0]?.abbreviation}/${categories?.[0]?.abbreviation}/${firms?.[0]?.firm_id}/${images.get(sections?.[0]?.page_block_section_id ?? '')?.[0]?.img_id}.${DEFAULT_PHOTOS_EXT}`}
                fallbackSrc={HeroBackground[(firms?.[0]?.category_id ?? '') as keyof typeof HeroBackground]}
                fill
                alt={`${categories?.[0]?.single_name ?? ''} ${firms?.[0]?.name ?? ''} - ${cities?.[0]?.name ?? ''}`}
                style={{ objectFit: 'cover' }}
                placeholder="blur"
                blurDataURL={`data:image/jpeg;base64,${HeroBackground[(firms?.[0]?.category_id ?? '') as keyof typeof HeroBackground]}`}
                priority={true}
              />
              <div className="flex items-center justify-center w-full h-full bg-eboni-900/40">
                <div className="text-center">
                  <AnimatedText
                    el={'h1' as unknown as ElementType}
                    text={[`${sections?.[0]?.title ?? ''}`.toUpperCase()]}
                    className="font-semibold text-white text-2xl lg:text-3xl xl:text-8xl 2xl:text-12xl leading-none tracking-tighter"
                    once
                  />
                </div>
              </div>
            </div>
          </header>
        </div>
        <div className="w-full flex flex-col items-center gap-4 mt-[-120px] z-[1] text-sm xl:text-base">
          <div className="container w-full flex flex-col gap-8 px-8 py-10 bg-white shadow-2xl rounded-xl dark:bg-eboni-800">
            <div className="flex flex-col gap-4 divide-y divide-gray-100 shadow dark:divide-white">
              <p>Опубликовано: {dayjs(page?.page?.createdTs ?? new Date()).format('DD.MM.YY')}</p>
              <span />
            </div>

            {Array.from(map).map(([key, value]) => (
              <div key={key} className="flex flex-col gap-8" data-test-id="block">
                {value.map((section) => {
                  const currentFirm = firms?.find((firm) => firm?.url === section?.url) || null;
                  const city = cities?.find((city) => city?.city_id === currentFirm?.city_id) || null;
                  const category =
                    categories?.find((category) => category?.category_id === currentFirm?.category_id) || null;

                  return (
                    <div key={section.page_block_section_id} className="flex flex-col gap-8" data-test-id="section">
                      <div className="flex items-center justify-between">
                        {Number(section.page_block_section_order) !== 0 && (
                          <h2 className="text-lg font-semibold text-negroni-400 dark:text-white lg:text-4xl">
                            {section.title}
                          </h2>
                        )}

                        {section?.url && Number(currentFirm?.reviews_count) > 0 && (
                          <div className="flex items-center h-[60px]">
                            <div className="flex h-fit">
                              <Rating rating={currentFirm?.rating} />
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              <span>{currentFirm?.rating}</span> /
                              <span>{`${currentFirm?.reviews_count} ${Number(currentFirm?.reviews_count) === 1 ? 'отзыв' : (Number(currentFirm?.reviews_count) ?? 0) <= 4 ? 'отзывa' : 'отзывов'}`}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {!!section.url && (
                        <a
                          href={`/${city?.abbreviation}/${category?.abbreviation}/${section.url}`}
                          className="text-negroni-400 hover:text-negroni-500 dark:hover:text-negroni-500"
                        >
                          Подробнее: {section.title}
                        </a>
                      )}
                      <p>{section.subtitle}</p>
                      {section?.url && <p>Адрес: {currentFirm?.address}</p>}
                      <p>{section.text}</p>

                      <Suspense fallback={<LoadingComponent />}>
                        {section.url && Number(section?.page_block_section_id) !== 0 && (
                          <DynamicImages
                            firm={currentFirm}
                            city={city}
                            category={category}
                            images={images.get(section?.page_block_section_id ?? '') || null}
                            tablet={tablet}
                          />
                        )}
                      </Suspense>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-full">
          <Footer />
        </div>
      </Section>
    </div>
  );
};
