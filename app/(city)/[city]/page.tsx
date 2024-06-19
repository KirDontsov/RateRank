import { CategoriesPage } from './CategoriesPage';
import { getCategories, getCities } from './api';

export interface CityPageProps {
  params: {
    city: string;
  };
}

/** Список категорий внутри города */
export default async function Page({ params }: CityPageProps) {
  const cityId = params.city ?? '';

  const cities = await getCities();
  const categories = await getCategories(1, 10);

  return <CategoriesPage cityId={cityId} cities={cities} categories={categories} />;
}
