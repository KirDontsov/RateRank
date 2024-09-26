import {
  getCategories,
  getCategory,
  getCities,
  getCity,
  getFirm,
  getFirms,
  getImages,
  getOaiDescription,
  getOaiReviews,
  getPrices,
  getReviews,
  getSimilarFirmsImages,
} from '@/app/api';
import { COMMON_DOMAIN, COMMON_TITLE } from '@/shared';
import { notFound } from 'next/navigation';
import { Metadata } from 'next/types';
import { FirmIdPage } from './FirmIdPage';

type Props = {
  params: { city: string; category: string; firm: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export interface FirmPageProps {
  params: {
    city: string;
    category: string;
    firm: string;
  };
  searchParams: { [key: string]: string | undefined };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const firmUrl = params?.firm ?? '';
  const categoryId = params?.category ?? '';
  const cityId = params?.city ?? '';

  const city = await getCity(cityId);
  const cityName = city?.name || '';

  const category = await getCategory(categoryId);

  const categoryName = category?.name ?? '';

  const firm = await getFirm(firmUrl);

  const firmName = firm?.name ?? '';

  const categoriesWithMenu = ['3ebc7206-6fed-4ea7-a000-27a74e867c9a'];

  const categoryNameAndFirmName =
    firmName?.indexOf(category?.single_name ?? '') !== -1 ? firmName : `${category?.single_name} ${firmName}`;

  return {
    title: `${categoryNameAndFirmName} - отзывы, фото, ${categoriesWithMenu.indexOf(category?.category_id ?? '') !== -1 ? 'онлайн бронирование столиков, меню' : 'рейтинг'}, цены, телефон и адрес - ${cityName} ${COMMON_TITLE}`,
    description: `${categoryNameAndFirmName}: адрес ☎️ телефон, часы работы и отзывы посетителей ✉️ ✔️ все фотографии${categoriesWithMenu.indexOf(category?.category_id ?? '') !== -1 ? ', онлайн бронирование столиков' : ''}. Рейтинг ${(category?.vin_name ?? '').toLowerCase()} города ${cityName}, соседние и похожие ${categoryName.toLowerCase()} на ${COMMON_DOMAIN}`,
    alternates: {
      canonical: `https://топвыбор.рф/${params.city}/${category?.abbreviation}/${firmUrl}`,
    },
    keywords: [`${firmName}`, ` ${categoryName}`, ` ${cityName}`, ' отзывы', ' рейтинг'],
    openGraph: {
      title: `${categoryNameAndFirmName} - отзывы, фото, ${categoriesWithMenu.indexOf(category?.category_id ?? '') !== -1 ? 'онлайн бронирование столиков, меню' : 'рейтинг'}, цены, телефон и адрес - ${cityName} ${COMMON_TITLE}`,
      description: `${categoryNameAndFirmName}: адрес ☎️ телефон, часы работы и отзывы посетителей ✉️ ✔️ все фотографии${categoriesWithMenu.indexOf(category?.category_id ?? '') !== -1 ? ', онлайн бронирование столиков' : ''}. Рейтинг ${(category?.vin_name ?? '').toLowerCase()} города ${cityName}, соседние и похожие ${categoryName.toLowerCase()} на ${COMMON_DOMAIN}`,
      url: `https://топвыбор.рф/${params.city}/${category?.abbreviation}/${firmUrl}`,
      siteName: `${COMMON_DOMAIN}`,
      locale: 'ru_RU',
      type: 'website',
    },
  };
}

/** Страница фирмы с отзывами */
export default async function Page({ params, searchParams }: FirmPageProps) {
  const cityAbbr = params.city ?? '';
  const categoryAbbr = params.category ?? '';
  const firmUrl = params.firm ?? '';
  const firmsPage = searchParams?.firmsPage ?? '1';
  const reviewsPage = searchParams?.reviewsPage ?? '1';

  const firm = await getFirm(firmUrl);
  if (!firm) {
    notFound();
  }
  const city = await getCity(cityAbbr);
  const cities = await getCities();
  const category = await getCategory(categoryAbbr);
  const categories = await getCategories(1, 10);
  const images = await getImages(firmUrl);
  const reviews = await getReviews(firmUrl, reviewsPage, 10);
  const oai_description = await getOaiDescription(firmUrl);
  const oai_reviews = await getOaiReviews(firmUrl);
  const prices = await getPrices(firmUrl);
  const firms = await getFirms(cityAbbr, categoryAbbr, firmsPage, 10);
  const similarFirmsImages = await getSimilarFirmsImages(firms?.map(({ url }) => url) ?? []);

  return (
    <FirmIdPage
      cityId={cityAbbr}
      categoryAbbr={categoryAbbr}
      firmUrl={firmUrl}
      city={city}
      cities={cities}
      category={category}
      categories={categories}
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
