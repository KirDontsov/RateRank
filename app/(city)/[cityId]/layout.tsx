import { HeroSection } from '@/widgets';
import { CommonProps } from '@/shared/types';
import { Metadata } from 'next/types';

import { CitiesQueryResult } from '@/api';
import { BACKEND_PORT } from '@/shared';

type CityIdProps = {
  params: { cityId: string };
};

export async function generateMetadata({ params }: CityIdProps): Promise<Metadata> {
  const cityId = params.cityId;

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
    title: `Лучшие компании города ${cityName} - рейтинг кафе, баров, фастфудов, цены, фото, телефоны, адреса, отзывы - Zoon.ru — Топ выбор`,
    description:
      'Выбор лучших услуг: рестораны, салоны красоты, медицина и многое другое на Топвыбор.рф. Фотографии, отзывы, акции, скидки, фильтры для поиска.',
    other: {
      cityId: city?.city_id ?? '',
      city: cityName ?? '',
    },
  };
}

export default function CityLayout({ children }: CommonProps) {
  return <HeroSection>{children}</HeroSection>;
}
