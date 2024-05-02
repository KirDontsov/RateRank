import { CommonProps } from '@/shared/types';
import { HeroSection } from '@/widgets';
import { Metadata } from 'next/types';

import { CitiesQueryResult } from '@/api';
import { BACKEND_PORT, COMMON_DOMAIN, COMMON_TITLE } from '@/shared';

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
    other: {
      cityId: city?.city_id ?? '',
      city: cityName ?? '',
    },
  };
}

export default function CityLayout({ children }: CommonProps) {
  return <HeroSection>{children}</HeroSection>;
}
