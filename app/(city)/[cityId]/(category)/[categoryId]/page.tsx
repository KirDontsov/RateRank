import { Metadata, ResolvingMetadata } from 'next/types';

import { CategoryQueryResult } from '@/api';
import { BACKEND_PORT, COMMON_DOMAIN, COMMON_TITLE } from '@/shared';
import { FirmsPage } from './FirmsPage';

export interface CategoryPageProps {
  params: { cityId: string; categoryId: string };
}

export type CategoryIdProps = {
  params: { cityId: string; categoryId: string };
};

export async function generateMetadata({ params }: CategoryIdProps, parent: ResolvingMetadata): Promise<Metadata> {
  const prevPage = await parent;
  const cityName = prevPage?.other?.city;
  const categoryId = params.categoryId ?? '';

  const category: CategoryQueryResult = await fetch(`${BACKEND_PORT}/api/category_abbr/${categoryId}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  })
    .then((res) => res.json())
    .catch(() => {
      console.warn('error');
    });

  const categoryName = category?.data?.category?.name;

  return {
    title: `Лучшие ${categoryName} города ${cityName} - рейтинг кафе, баров, фастфудов, цены, фото, телефоны, адреса, отзывы - ${COMMON_TITLE}`,
    description: `Выбор лучших услуг: рестораны, салоны красоты, медицина и многое другое на ${COMMON_DOMAIN}. Фотографии, отзывы, акции, скидки, фильтры для поиска.`,
  };
}

/** Список фирм внутри категории */
export default function Page({ params }: CategoryPageProps) {
  const categoryAbbr = params?.categoryId ?? '';
  const cityAbbr = params?.cityId ?? '';

  return <FirmsPage cityAbbr={cityAbbr} categoryAbbr={categoryAbbr} />;
}
