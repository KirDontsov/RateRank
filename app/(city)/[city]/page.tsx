import { getCategories, getCities, getCity } from '@/app/api';
import { COMMON_DOMAIN, COMMON_TITLE, PageProps } from '@/shared';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { CategoriesPage } from './CategoriesPage';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const paramsRes = await params;
  const cityId = `${paramsRes?.city ?? ''}`;

  const city = await getCity(cityId);
  const cityName = city?.name;

  return {
    title: `Лучшие компании города ${cityName} - рейтинг кафе, баров, фастфудов, цены, фото, телефоны, адреса, отзывы — ${COMMON_TITLE}`,
    description: `Выбор лучших услуг: рестораны, салоны красоты, медицина и многое другое на ${COMMON_DOMAIN}. Фотографии, отзывы, акции, скидки, фильтры для поиска.`,
    alternates: { canonical: `https://топвыбор.рф${city?.abbreviation}` },
    keywords: ['отзывы', ' рейтинг', ' рестораны', ' салоны красоты', ' автосервисы', ' медицина', ` ${cityName}`],
    openGraph: {
      title: `Лучшие компании города ${cityName} - рейтинг кафе, баров, фастфудов, цены, фото, телефоны, адреса, отзывы — ${COMMON_TITLE}`,
      description: `Выбор лучших услуг: рестораны, салоны красоты, медицина и многое другое на ${COMMON_DOMAIN}. Фотографии, отзывы, акции, скидки, фильтры для поиска.`,
      url: `https://топвыбор.рф${city?.abbreviation}`,
      siteName: `${COMMON_DOMAIN}`,
      locale: 'ru_RU',
      type: 'website',
    },
  };
}

/** Список категорий внутри города */
export default async function Page({ params }: PageProps) {
  const paramsRes = await params;
  const cityId = `${paramsRes?.city ?? ''}`;

  const cities = await getCities();
  const categories = await getCategories(1, 10);
  const city = await getCity(cityId);

  if (!city) {
    notFound();
  }

  return (
    <Suspense fallback={<></>}>
      <CategoriesPage cityId={cityId} cities={cities} categories={categories} />
    </Suspense>
  );
}
