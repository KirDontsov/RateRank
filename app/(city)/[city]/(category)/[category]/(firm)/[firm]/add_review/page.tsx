import { AddReviewPage } from './AddReviewPage';
import { getCategories, getCities } from './api';

type Props = {
  params: { city: string; category: string; firm: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({ params }: Props) {
  const cities = await getCities();
  const categories = await getCategories(1, 10);

  return <AddReviewPage cities={cities} categories={categories} params={params} />;
}
