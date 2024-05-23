import { CategoriesPage } from './CategoriesPage';
import { getCategories, getCities, getCity } from './api';

export interface CityPageProps {
  params: {
    cityId: string;
  };
}

/** Список категорий внутри города */
export default async function Page({ params }: CityPageProps) {
  const cityId = params.cityId ?? '';

  const city = await getCity(cityId);
  const categories = await getCategories(1, 10);

  return <CategoriesPage cityId={cityId} categories={categories} />;
}
