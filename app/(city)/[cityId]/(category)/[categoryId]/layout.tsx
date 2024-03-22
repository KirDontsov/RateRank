import { CommonProps } from '@/shared/types';
import { Metadata, ResolvingMetadata } from 'next/types';

import { CategoriesQueryResult } from '@/api';

export type CategoryIdProps = {
  params: { cityId: string; categoryId: string };
};

export async function generateMetadata({ params }: CategoryIdProps, parent: ResolvingMetadata): Promise<Metadata> {
  const prevPage = await parent;
  const cityId = prevPage?.other?.cityId;
  const cityName = prevPage?.other?.city;
  const categoryId = params.categoryId;

  const categories: CategoriesQueryResult = await fetch(
    `https://xn--90ab9accji9e.xn--p1ai/api/categories?page=${1}&limit=${10}`,
    {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    },
  ).then((res) => res.json());

  const category = categories?.data?.categories?.find((category) => category?.abbreviation === categoryId);
  const categoryName = category?.name;

  return {
    title: `Лучшие ${categoryName} города ${cityName} - рейтинг кафе, баров, фастфудов, цены, фото, телефоны, адреса, отзывы - Топ выбор`,
    description:
      'Выбор лучших услуг: рестораны, салоны красоты, медицина и многое другое на Топвыбор.рф. Фотографии, отзывы, акции, скидки, фильтры для поиска.',
    other: {
      cityId: cityId ?? '',
      city: cityName ?? '',
      categoryId: category?.category_id ?? '',
      category: categoryName ?? '',
    },
  };
}

export default function CategoryLayout({ children }: CommonProps) {
  return <>{children}</>;
}
