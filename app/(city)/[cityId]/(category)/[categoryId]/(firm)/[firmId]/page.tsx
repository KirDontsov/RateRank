import { Metadata, ResolvingMetadata } from 'next/types';
import { FirmsPage } from './FirmsPage';
import { transliterate } from '@/shared';
import { FirmsQueryResult } from '@/api';

type Props = {
  params: { cityId: string; categoryId: string; firmId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const prevPage = await parent;
  const cityId = `${prevPage?.other?.cityId || ''}`;
  const cityName = `${prevPage?.other?.city || ''}`;
  const categoryId = `${prevPage?.other?.categoryId || ''}`;
  const categoryName = `${prevPage?.other?.category || ''}`;
  const firmId = params.firmId;

  const firms: FirmsQueryResult = await fetch(
    `https://xn--90ab9accji9e.xn--p1ai/api/firms?city_id=${cityId}&category_id=${categoryId}&page=${searchParams?.page || 1}&limit=${10}`,
    {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    },
  ).then((res) => res.json());

  const firmName = firms?.data?.firms?.find((firm) => transliterate(firm?.name) === decodeURI(firmId))?.name ?? '';

  return {
    title: `${categoryName?.slice(0, -1)} ${firmName} - отзывы, фото, онлайн бронирование столиков, цены, меню, телефон и адрес - Рестораны, бары и кафе - ${cityName} - Топ выбор`,
    description: `${categoryName?.slice(0, -1)} ${firmName}: ✔ все фотографии, адрес ☎️ телефон, часы работы и отзывы посетителей ✉ на Топвыборюрф. Онлайн бронирование столиков. Рейтинг ресторанов и кафе города ${cityName}, соседние и похожие рестораны.`,
  };
}

export default function Page() {
  return (
    <>
      <FirmsPage />
    </>
  );
}
