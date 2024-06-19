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

  const cities = await getCities();
  const categories = await getCategories(1, 10);

  return <CategoriesPage cityId={cityId} cities={cities} categories={categories} />;
}
