import { Metadata, ResolvingMetadata } from 'next/types';

import { CategoriesQueryResult, CategoryQueryResult } from '@/api';
import { FirmsPage } from './FirmsPage';
import { COMMON_DOMAIN, COMMON_TITLE } from '@/shared';

export interface CategoryPageProps {
  params: { categoryId: string };
}

export type CategoryIdProps = {
  params: { cityId: string; categoryId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: CategoryIdProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const prevPage = await parent;
  const cityName = prevPage?.other?.city;
  const categoryId = searchParams.categoryId;

  const category: CategoryQueryResult = await fetch(`https://xn--90ab9accji9e.xn--p1ai/api/category/${categoryId}`, {
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
export default function Page() {
  return <FirmsPage />;
}
