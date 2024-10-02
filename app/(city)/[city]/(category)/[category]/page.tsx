import {
  getCategories,
  getCategory,
  getCities,
  getCity,
  getFirms,
  getFirmsForMap,
  getOaiReviewsForFirms,
} from '@/app/api';
import { COMMON_DOMAIN, COMMON_TITLE, PageProps } from '@/shared';
import { notFound } from 'next/navigation';
import { Metadata } from 'next/types';
import { Suspense } from 'react';
import { FirmsPage } from './FirmsPage';
import Loading from './loading';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const paramsRes = await params;
  const cityId = `${paramsRes?.city ?? ''}`;
  const categoryId = `${paramsRes?.category ?? ''}`;

  const city = await getCity(cityId);
  const category = await getCategory(categoryId);

  const cityName = city?.name;
  const categoryName = category?.name;

  return {
    title: `Лучшие ${categoryName} города ${cityName} - рейтинг кафе, баров, фастфудов, цены, фото, телефоны, адреса, отзывы - ${COMMON_TITLE}`,
    description: `Выбор лучших услуг: рестораны, салоны красоты, медицина и многое другое на ${COMMON_DOMAIN}. Фотографии, отзывы, акции, скидки, фильтры для поиска.`,
    alternates: { canonical: `https://топвыбор.рф/${paramsRes?.city}/${category?.abbreviation}` },
    keywords: [`${categoryName}`, ` ${cityName}`, ' отзывы', ' рейтинг'],
    openGraph: {
      title: `Лучшие ${categoryName} города ${cityName} - рейтинг кафе, баров, фастфудов, цены, фото, телефоны, адреса, отзывы - ${COMMON_TITLE}`,
      description: `Выбор лучших услуг: рестораны, салоны красоты, медицина и многое другое на ${COMMON_DOMAIN}. Фотографии, отзывы, акции, скидки, фильтры для поиска.`,
      url: `https://топвыбор.рф/${paramsRes?.city}/${category?.abbreviation}`,
      siteName: `${COMMON_DOMAIN}`,
      locale: 'ru_RU',
      type: 'website',
    },
  };
}

/** Список фирм внутри категории */
export default async function Page({ params, searchParams }: PageProps) {
  const paramsRes = await params;
  const searchParamsRes = await searchParams;
  const categoryAbbr = `${paramsRes?.category ?? ''}`;
  const cityAbbr = `${paramsRes?.city ?? ''}`;
  const firmsPage = `${searchParamsRes?.firmsPage ?? '1'}`;

  const category = await getCategory(categoryAbbr);
  if (!category) {
    notFound();
  }
  const firms = await getFirms(cityAbbr, categoryAbbr, firmsPage, 10);
  const firmsForMap = await getFirmsForMap(cityAbbr, categoryAbbr);
  const cities = await getCities();
  const city = await getCity(cityAbbr);
  const categories = await getCategories(1, 10);
  const oai_reviews = await getOaiReviewsForFirms(firms);

  return (
    <Suspense fallback={<Loading />}>
      <FirmsPage
        cityAbbr={cityAbbr}
        categoryAbbr={categoryAbbr}
        city={city}
        category={category}
        firms={firms}
        firmsForMap={firmsForMap}
        cities={cities}
        categories={categories}
        oai_reviews={oai_reviews}
      />
    </Suspense>
  );
}
