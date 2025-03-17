import { CommonProps, SegmentParams } from '@/shared';
import { HeroSection } from '@/widgets';
import { Metadata } from 'next/types';

import { CitiesQueryResult } from '@/api';
import { BACKEND_PORT, COMMON_DOMAIN, COMMON_TITLE } from '@/shared';

export interface Props {
  params: Promise<SegmentParams>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const paramsRes = await params;
  const cityId = `${paramsRes?.cityId ?? ''}`;

  const cities: CitiesQueryResult = await fetch(`${BACKEND_PORT}/api/cities?page=${1}&limit=${10}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  })
    .then((res) => res.json())
    .catch(() => {
      console.warn('error');
    });

  const city = cities?.data?.cities?.find((city) => city?.abbreviation === cityId);
  const cityName = city?.name;

  return {
    title: `Лучшие компании города ${cityName} - рейтинг кафе, баров, фастфудов, цены, фото, телефоны, адреса, отзывы — ${COMMON_TITLE}`,
    description: `Выбор лучших услуг: рестораны, салоны красоты, медицина и многое другое на ${COMMON_DOMAIN}. Фотографии, отзывы, акции, скидки, фильтры для поиска.`,
  };
}

export default function CategoriesLayout({ children }: CommonProps) {
  return <HeroSection>{children}</HeroSection>;
}
