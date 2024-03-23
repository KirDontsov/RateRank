import { Metadata, ResolvingMetadata } from 'next/types';
import { FirmIdPage } from './FirmIdPage';
import { CategoryQueryResult, FirmQueryResult } from '@/api';

type Props = {
  params: { cityId: string; categoryId: string; firmId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const prevPage = await parent;
  const cityName = `${prevPage?.other?.city || ''}`;
  const firmId = searchParams?.firmId ?? '';

  const category: CategoryQueryResult = await fetch(
    `https://xn--90ab9accji9e.xn--p1ai/api/category/3ebc7206-6fed-4ea7-a000-27a74e867c9a`,
    {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    },
  )
    .then((res) => res.json())
    .catch(() => {
      console.warn('error');
    });

  const categoryName = category?.data?.category?.name ?? '';

  const firm: FirmQueryResult = await fetch(`https://xn--90ab9accji9e.xn--p1ai/api/firm/${firmId}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  })
    .then((res) => res.json())
    .catch(() => {
      console.warn('error');
    });

  const firmName = firm?.data?.firm?.name ?? '';

  return {
    title: `${categoryName?.slice(0, -1)} ${firmName} - отзывы, фото, онлайн бронирование столиков, цены, меню, телефон и адрес - Рестораны, бары и кафе - ${cityName} - Топ выбор`,
    description: `${categoryName?.slice(0, -1)} ${firmName}: ✔ все фотографии, адрес ☎️ телефон, часы работы и отзывы посетителей ✉ на Топвыборюрф. Онлайн бронирование столиков. Рейтинг ресторанов и кафе города ${cityName}, соседние и похожие рестораны.`,
  };
}

/** Страница фирмы с отзывами */
export default function Page() {
  return <FirmIdPage />;
}
