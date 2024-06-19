import { COMMON_DOMAIN, COMMON_TITLE } from '@/shared';
import { Metadata, ResolvingMetadata } from 'next/types';
import { FirmsPage } from './FirmsPage';
import { getCategories, getCategory, getCities, getFirms } from './api';

export interface CategoryPageProps {
  params: { cityId: string; categoryId: string };
  searchParams: { [key: string]: string | undefined };
}

export type CategoryMetaProps = {
  params: { cityId: string; categoryId: string };
};

export async function generateMetadata({ params }: CategoryMetaProps, parent: ResolvingMetadata): Promise<Metadata> {
  const prevPage = await parent;
  const cityName = prevPage?.other?.city;
  const categoryId = params.categoryId ?? '';

  const category = await getCategory(categoryId);

  const categoryName = category?.name;

  return {
    title: `Лучшие ${categoryName} города ${cityName} - рейтинг кафе, баров, фастфудов, цены, фото, телефоны, адреса, отзывы - ${COMMON_TITLE}`,
    description: `Выбор лучших услуг: рестораны, салоны красоты, медицина и многое другое на ${COMMON_DOMAIN}. Фотографии, отзывы, акции, скидки, фильтры для поиска.`,
    alternates: { canonical: `https://топвыбор.рф/${params.cityId}/${category?.abbreviation}` },
    keywords: [`${categoryName}`, ` ${cityName}`, ' отзывы', ' рейтинг'],
    openGraph: {
      title: `Лучшие ${categoryName} города ${cityName} - рейтинг кафе, баров, фастфудов, цены, фото, телефоны, адреса, отзывы - ${COMMON_TITLE}`,
      description: `Выбор лучших услуг: рестораны, салоны красоты, медицина и многое другое на ${COMMON_DOMAIN}. Фотографии, отзывы, акции, скидки, фильтры для поиска.`,
      url: `https://топвыбор.рф/${params.cityId}/${category?.abbreviation}`,
      siteName: `${COMMON_DOMAIN}`,
      locale: 'ru_RU',
      type: 'website',
    },
  };
}

/** Список фирм внутри категории */
export default async function Page({ params, searchParams }: CategoryPageProps) {
  const categoryAbbr = params?.categoryId ?? '';
  const cityAbbr = params?.cityId ?? '';
  const firmsPage = searchParams?.firmsPage ?? '1';

  const firms = await getFirms(cityAbbr, categoryAbbr, firmsPage, 10);
  const cities = await getCities();
  const categories = await getCategories(1, 10);

  return (
    <FirmsPage cityAbbr={cityAbbr} categoryAbbr={categoryAbbr} firms={firms} cities={cities} categories={categories} />
  );
}
