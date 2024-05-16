import { CategoryQueryResult, FirmQueryResult } from '@/api';
import { BACKEND_PORT, COMMON_DOMAIN, COMMON_TITLE } from '@/shared';
import { Metadata, ResolvingMetadata } from 'next/types';
import { FirmIdPage } from './FirmIdPage';

type Props = {
  params: { cityId: string; categoryId: string; firmId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export interface FirmPageProps {
  params: {
    cityId: string;
    categoryId: string;
    firmId: string;
  };
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const prevPage = await parent;
  const cityName = `${prevPage?.other?.city || ''}`;
  const firmUrl = params?.firmId ?? '';
  const categoryId = params?.categoryId ?? '';

  const category: CategoryQueryResult = await fetch(`${BACKEND_PORT}/api/category_abbr/${categoryId}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  })
    .then((res) => res.json())
    .catch(() => {
      console.warn('error');
    });

  const categoryName = category?.data?.category?.name ?? '';

  const firm: FirmQueryResult = await fetch(`${BACKEND_PORT}/api/firm_by_url/${firmUrl}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  })
    .then((res) => res.json())
    .catch(() => {
      console.warn('error');
    });

  const firmName = firm?.data?.firm?.name ?? '';

  return {
    title: `${categoryName?.slice(0, -1)} ${firmName} - отзывы, фото, онлайн бронирование столиков, цены, меню, телефон и адрес - ${cityName} ${COMMON_TITLE}`,
    description: `${categoryName?.slice(0, -1)} ${firmName}: адрес ☎️ телефон, часы работы и отзывы посетителей ✉️ ✔️ все фотографии, Онлайн бронирование столиков. Рейтинг ресторанов и кафе города ${cityName}, соседние и похожие рестораны на ${COMMON_DOMAIN}`,
    alternates: {
      canonical: `https://топвыбор.рф/${params.cityId}/${category?.data?.category?.abbreviation}/${firmUrl}`,
    },
    keywords: [`${firmName}`, ` ${categoryName}`, ` ${cityName}`, ' отзывы', ' рейтинг'],
    openGraph: {
      title: `${categoryName?.slice(0, -1)} ${firmName} - отзывы, фото, онлайн бронирование столиков, цены, меню, телефон и адрес - ${cityName} ${COMMON_TITLE}`,
      description: `${categoryName?.slice(0, -1)} ${firmName}: адрес ☎️ телефон, часы работы и отзывы посетителей ✉️ ✔️ все фотографии, Онлайн бронирование столиков. Рейтинг ресторанов и кафе города ${cityName}, соседние и похожие рестораны на ${COMMON_DOMAIN}`,
      url: `https://топвыбор.рф/${params.cityId}/${category?.data?.category?.abbreviation}/${firmUrl}`,
      siteName: `${COMMON_DOMAIN}`,
      locale: 'ru_RU',
      type: 'website',
    },
  };
}

/** Страница фирмы с отзывами */
export default function Page({ params }: FirmPageProps) {
  const cityAbbr = params.cityId ?? '';
  const categoryAbbr = params.categoryId ?? '';
  const firmUrl = params.firmId ?? '';

  return <FirmIdPage cityId={cityAbbr} categoryAbbr={categoryAbbr} firmUrl={firmUrl} />;
}
