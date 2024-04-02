import { Metadata, ResolvingMetadata } from 'next/types';
import { FirmIdPage } from './FirmIdPage';
import { CategoryQueryResult, FirmQueryResult } from '@/api';
import { BACKEND_PORT, COMMON_DOMAIN, COMMON_TITLE } from '@/shared';

type Props = {
  params: { cityId: string; categoryId: string; firmId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export interface CityPageProps {
  params: {
    cityId: string;
  };
}

export async function generateMetadata({ searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const prevPage = await parent;
  const cityName = `${prevPage?.other?.city || ''}`;
  const firmId = searchParams?.firmId ?? '';
  const categoryId = searchParams?.categoryId ?? '';

  const category: CategoryQueryResult = await fetch(`${BACKEND_PORT}/api/category/${categoryId}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  })
    .then((res) => res.json())
    .catch(() => {
      console.warn('error');
    });

  const categoryName = category?.data?.category?.name ?? '';

  const firm: FirmQueryResult = await fetch(`${BACKEND_PORT}/api/firm/${firmId}`, {
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
  };
}

/** Страница фирмы с отзывами */
export default function Page({ params }: CityPageProps) {
  const cityId = params.cityId ?? '';

  return <FirmIdPage cityId={cityId} />;
}
