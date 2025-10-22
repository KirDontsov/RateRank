import { HomePage } from './HomePage';
import { getCategories, getCities } from '@/app/api';
import { Suspense } from 'react';

export default async function Page() {
  const cities = await getCities();
  const categories = await getCategories(1, 10);

  return (
    <Suspense fallback={<></>}>
      <HomePage cities={cities} categories={categories} />
    </Suspense>
  );
}
