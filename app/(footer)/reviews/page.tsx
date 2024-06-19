import { COMMON_DOMAIN, COMMON_TITLE } from '@/shared';
import { Metadata } from 'next';
import { ReviewsPage } from './ReviewsPage';
import { getCategories, getCities } from './api';

export const metadata: Metadata = {
  title: `${COMMON_TITLE} — отзывы клиентов`,
  description: `Посмотрите отзывы клиентов о работе компании ${COMMON_DOMAIN}. ${COMMON_TITLE} — cервис, который помогает развиваться локальному бизнесу в России.`,
};

export default async function Page() {
  const cities = await getCities();
  const categories = await getCategories(1, 10);
  return <ReviewsPage cities={cities} categories={categories} />;
}
