import { CategoriesPage } from './CategoriesPage';
import { getCategories, getCities, getCity } from './api';

export interface CityPageProps {
  params: {
    city: string;
  };
}

/** Список категорий внутри города */
export default async function Page({ params }: CityPageProps) {
  const cityId = params.city ?? '';

  const city = await getCity(cityId);
  const categories = await getCategories(1, 10);

  return <CategoriesPage cityId={cityId} categories={categories} />;
}
