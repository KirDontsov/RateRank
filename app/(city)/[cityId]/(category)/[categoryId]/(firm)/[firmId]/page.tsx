import { COMMON_DOMAIN, COMMON_TITLE } from '@/shared';
import { Metadata, ResolvingMetadata } from 'next/types';
import { FirmIdPage } from './FirmIdPage';
import {
  getCategory,
  getCity,
  getFirm,
  getFirms,
  getImages,
  getOaiDescription,
  getOaiReviews,
  getPrices,
  getReviews,
  getSimilarFirmsImages,
} from './api';

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
  searchParams: { [key: string]: string | undefined };
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const prevPage = await parent;
  const cityName = `${prevPage?.other?.city || ''}`;
  const firmUrl = params?.firmId ?? '';
  const categoryId = params?.categoryId ?? '';

  const category = await getCategory(categoryId);

  const categoryName = category?.name ?? '';

  const firm = await getFirm(firmUrl);

  const firmName = firm?.name ?? '';

  return {
    title: `${categoryName?.slice(0, -1)} ${firmName} - отзывы, фото, онлайн бронирование столиков, цены, меню, телефон и адрес - ${cityName} ${COMMON_TITLE}`,
    description: `${categoryName?.slice(0, -1)} ${firmName}: адрес ☎️ телефон, часы работы и отзывы посетителей ✉️ ✔️ все фотографии, Онлайн бронирование столиков. Рейтинг ресторанов и кафе города ${cityName}, соседние и похожие рестораны на ${COMMON_DOMAIN}`,
    alternates: {
      canonical: `https://топвыбор.рф/${params.cityId}/${category?.abbreviation}/${firmUrl}`,
    },
    keywords: [`${firmName}`, ` ${categoryName}`, ` ${cityName}`, ' отзывы', ' рейтинг'],
    openGraph: {
      title: `${categoryName?.slice(0, -1)} ${firmName} - отзывы, фото, онлайн бронирование столиков, цены, меню, телефон и адрес - ${cityName} ${COMMON_TITLE}`,
      description: `${categoryName?.slice(0, -1)} ${firmName}: адрес ☎️ телефон, часы работы и отзывы посетителей ✉️ ✔️ все фотографии, Онлайн бронирование столиков. Рейтинг ресторанов и кафе города ${cityName}, соседние и похожие рестораны на ${COMMON_DOMAIN}`,
      url: `https://топвыбор.рф/${params.cityId}/${category?.abbreviation}/${firmUrl}`,
      siteName: `${COMMON_DOMAIN}`,
      locale: 'ru_RU',
      type: 'website',
    },
  };
}

/** Страница фирмы с отзывами */
export default async function Page({ params, searchParams }: FirmPageProps) {
  const cityAbbr = params.cityId ?? '';
  const categoryAbbr = params.categoryId ?? '';
  const firmUrl = params.firmId ?? '';
  const firmsPage = searchParams?.firmsPage ?? '1';
  const reviewsPage = searchParams?.reviewsPage ?? '1';

  const city = await getCity(cityAbbr);
  const category = await getCategory(categoryAbbr);
  const firm = await getFirm(firmUrl);
  const images = await getImages(firmUrl);
  const reviews = await getReviews(firmUrl, reviewsPage, 10);
  const oai_description = await getOaiDescription(firmUrl);
  const oai_reviews = await getOaiReviews(firmUrl, reviewsPage, 10);
  const prices = await getPrices(firmUrl);
  const firms = await getFirms(cityAbbr, categoryAbbr, firmsPage, 10);
  const similarFirmsImages = await getSimilarFirmsImages(firms?.map(({ url }) => url) ?? []);

  return (
    <FirmIdPage
      cityId={cityAbbr}
      categoryAbbr={categoryAbbr}
      firmUrl={firmUrl}
      city={city}
      category={category}
      firm={firm}
      firms={firms}
      images={images}
      reviews={reviews}
      oai_description={oai_description}
      oai_reviews={oai_reviews}
      prices={prices}
      similarFirmsImages={similarFirmsImages}
    />
  );
}
